import { prisma } from "@/lib/prisma";
import { notify } from "@/lib/notifications";

/**
 * AEC Network Event Hub
 *
 * Implements Section 33 event-driven architecture:
 * Actions throughout the system trigger real chained events, notifications,
 * and status updates across portals.
 */

/**
 * Event: Student enrolled and assigned to a class (Section 15)
 */
export async function emitStudentClassAssigned(params: {
  studentId: string;
  classId: string;
  courseId: string;
}) {
  const klass = await prisma.class.findUnique({
    where: { id: params.classId },
    include: {
      teacher: { include: { user: true } },
      course: true,
      timetableSlots: true
    }
  });

  const student = await prisma.student.findUnique({
    where: { id: params.studentId },
    include: {
      user: true,
      guardian: { include: { user: true } }
    }
  });

  if (!klass || !student) return;

  const scheduleSummary = klass.timetableSlots
    .map((s) => `Day ${s.dayOfWeek}: ${s.startTime}-${s.endTime} (${s.timezone})`)
    .join(", ") || "Schedule pending";

  const startDateStr = klass.startDate ? klass.startDate.toDateString() : "Immediate";

  // 1. Notify Teacher (Section 15)
  await notify({
    userId: klass.teacher.user.id,
    type: "class_assigned",
    title: "New student assigned to your class",
    body: `Student: ${student.user.name} | Course: ${klass.course.title} | Class: ${klass.name} | Schedule: ${scheduleSummary} | Start date: ${startDateStr}`,
    entityType: "class",
    entityId: klass.id
  });

  // 2. Notify Student
  await notify({
    userId: student.user.id,
    type: "class_assigned",
    title: "Class Schedule Assigned",
    body: `You have been scheduled in "${klass.name}" for ${klass.course.title}. Sessions: ${scheduleSummary}.`,
    entityType: "class",
    entityId: klass.id
  });

  // 3. Notify Parent
  if (student.guardian?.user) {
    await notify({
      userId: student.guardian.user.id,
      type: "class_assigned",
      title: `Schedule Assigned: ${student.user.name}`,
      body: `Your child ${student.user.name} has been placed in "${klass.name}". Schedule: ${scheduleSummary}.`,
      entityType: "class",
      entityId: klass.id
    });
  }
}

/**
 * Event: Attendance marked (Section 14)
 * If absent, trigger automated parent alert.
 */
export async function emitAttendanceMarked(params: {
  studentId: string;
  classId: string;
  status: string;
  date: Date;
  note?: string;
}) {
  if (params.status.toLowerCase() !== "absent") return;

  const student = await prisma.student.findUnique({
    where: { id: params.studentId },
    include: {
      user: true,
      guardian: { include: { user: true } }
    }
  });

  const klass = await prisma.class.findUnique({
    where: { id: params.classId }
  });

  if (student?.guardian?.user) {
    await notify({
      userId: student.guardian.user.id,
      type: "attendance",
      title: "Attendance Notice: Student Absent",
      body: `Your child ${student.user.name} was marked absent for ${klass?.name ?? "Class"} on ${params.date.toDateString()}.${
        params.note ? ` Note: ${params.note}` : ""
      }`,
      entityType: "attendance",
      entityId: student.id,
      channels: ["in_app", "email"]
    });
  }
}

/**
 * Event: Monthly payment due notification (Section 17)
 */
export async function emitMonthlyPaymentDue(invoiceId: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      student: {
        include: {
          user: true,
          guardian: { include: { user: true } }
        }
      }
    }
  });

  if (!invoice) return;

  const dueStr = invoice.dueDate.toDateString();
  const amountStr = `${invoice.amount} ${invoice.currency}`;

  // Student notice
  await notify({
    userId: invoice.student.user.id,
    type: "fee_due",
    title: "Monthly Fee Due",
    body: `Your monthly AEC Network fee of ${amountStr} is due on ${dueStr}.`,
    entityType: "invoice",
    entityId: invoice.id
  });

  // Parent notice
  if (invoice.student.guardian?.user) {
    await notify({
      userId: invoice.student.guardian.user.id,
      type: "fee_due",
      title: `Monthly Fee Due for ${invoice.student.user.name}`,
      body: `The monthly AEC Network fee for ${invoice.student.user.name} (${amountStr}) is due on ${dueStr}.`,
      entityType: "invoice",
      entityId: invoice.id
    });
  }
}

/**
 * Event: Leave requested by employee (Section 20)
 */
export async function emitLeaveRequested(leaveRequestId: string) {
  const request = await prisma.leaveRequest.findUnique({
    where: { id: leaveRequestId },
    include: {
      employee: {
        include: { user: true, department: true }
      },
      leaveType: true
    }
  });

  if (!request) return;

  // Find HR Managers / Super Admin to notify
  const hrUsers = await prisma.user.findMany({
    where: { role: { in: ["HR_MANAGER", "ADMIN", "SUPER_ADMIN"] } }
  });

  for (const hr of hrUsers) {
    await notify({
      userId: hr.id,
      type: "leave_request",
      title: "New Leave Request",
      body: `${request.employee.user.name} has requested ${request.leaveType?.name ?? "leave"} from ${request.startDate.toDateString()} to ${request.endDate.toDateString()}.`,
      entityType: "leave",
      entityId: request.id
    });
  }
}
