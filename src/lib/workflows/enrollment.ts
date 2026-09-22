/**
 * Student Enrollment Workflow (section 9).
 *
 * Steps 1-13 below map directly to the spec. Each exported function is a
 * discrete, callable stage so admissions/finance staff actions (reviewing
 * a lead, assigning a teacher, generating an invoice) can each be
 * triggered independently from the Admin portal, while still being part
 * of one traceable, database-connected pipeline.
 *
 * Wire these into Route Handlers (app/api/**) as each portal screen is
 * built — the functions here contain the actual persistence logic so the
 * API layer stays thin.
 */
import { prisma } from "@/lib/prisma";
import { notifyUser } from "@/lib/notifications";

// ---- Step 1 + 2: Student/Parent submits form -> System creates a Lead ----
export async function createLeadFromEnrollmentForm(input: {
  fullName: string;
  email: string;
  phone?: string;
  interest?: string;
  source?: string;
}) {
  return prisma.lead.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      subjectInterest: input.interest,
      source: input.source ?? "website",
      status: "new"
    }
  });
}

// ---- Step 3: Admissions staff reviews the lead ----
export async function reviewLead(leadId: string, params: { reviewedById: string; status: "contacted" | "trial_booked" | "enrolled" | "lost"; notes?: string }) {
  return prisma.lead.update({
    where: { id: leadId },
    data: { status: params.status, reviewedById: params.reviewedById, notes: params.notes }
  });
}

// ---- Step 4 + 5: Student profile is created and assigned a program/course ----
export async function createStudentProfileFromLead(
  leadId: string,
  params: { userId: string; studentCode: string; courseId: string; country?: string }
) {
  return prisma.$transaction(async (tx) => {
    const student = await tx.student.create({
      data: {
        userId: params.userId,
        studentCode: params.studentCode,
        country: params.country
      }
    });

    // Step 5: assign program/course (creates the Enrollment record; class
    // assignment happens in the next step once a Class is chosen).
    const enrollment = await tx.enrollment.create({
      data: {
        studentId: student.id,
        courseId: params.courseId,
        status: "active"
      }
    });

    await tx.lead.update({
      where: { id: leadId },
      data: { status: "enrolled", convertedStudentId: student.id }
    });

    return { student, enrollment };
  });
}

// ---- Step 6 + 7: Student is enrolled into a class, teacher is assigned ----
// (Teacher assignment happens implicitly — every Class already has a
// teacherId — this step links the student's Enrollment to that Class.)
export async function assignStudentToClass(enrollmentId: string, classId: string) {
  const klass = await prisma.class.findUniqueOrThrow({
    where: { id: classId },
    include: { teacher: { include: { user: true } } }
  });

  const enrollment = await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { classId },
    include: { student: { include: { user: true } } }
  });

  // ---- Step 9: Teacher receives notification ----
  await notifyUser(klass.teacher.user.id, {
    title: "New student assigned",
    body: `${enrollment.student.user.name} has been enrolled in your class "${klass.name}".`
  });

  return enrollment;
}

// ---- Step 8: Timetable is generated ----
export async function generateTimetableSlot(
  classId: string,
  slots: { dayOfWeek: number; startTime: string; endTime: string; timezone?: string }[]
) {
  return prisma.$transaction(
    slots.map((s) =>
      prisma.timetableSlot.create({
        data: {
          classId,
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime,
          timezone: s.timezone ?? "UTC"
        }
      })
    )
  );
}

// ---- Step 10: Student/Parent receives class schedule notification ----
export async function notifyStudentAndParentOfSchedule(studentId: string, classId: string) {
  const student = await prisma.student.findUniqueOrThrow({
    where: { id: studentId },
    include: { user: true, guardian: { include: { user: true } } }
  });
  const klass = await prisma.class.findUniqueOrThrow({ where: { id: classId } });

  await notifyUser(student.user.id, {
    title: "Your class schedule is ready",
    body: `You've been scheduled into "${klass.name}". Check Timetable in your Student Portal.`
  });

  if (student.guardian) {
    await notifyUser(student.guardian.user.id, {
      title: "Your child's class schedule is ready",
      body: `${student.user.name} has been scheduled into "${klass.name}".`
    });
  }
}

// ---- Step 11: Finance creates fee plan/invoice ----
export async function createInvoiceForStudent(studentId: string, params: { amount: number; currency?: string; dueDate: Date }) {
  return prisma.invoice.create({
    data: {
      studentId,
      amount: params.amount,
      currency: params.currency ?? "USD",
      dueDate: params.dueDate,
      status: "unpaid"
    }
  });
}

// ---- Step 12: Student/Parent receives fee notification ----
export async function notifyStudentAndParentOfInvoice(invoiceId: string) {
  const invoice = await prisma.invoice.findUniqueOrThrow({
    where: { id: invoiceId },
    include: { student: { include: { user: true, guardian: { include: { user: true } } } } }
  });

  await notifyUser(invoice.student.user.id, {
    title: "New invoice issued",
    body: `An invoice for ${invoice.amount} ${invoice.currency} is due ${invoice.dueDate.toDateString()}.`
  });

  if (invoice.student.guardian) {
    await notifyUser(invoice.student.guardian.user.id, {
      title: "New invoice issued for your child",
      body: `An invoice for ${invoice.amount} ${invoice.currency} is due ${invoice.dueDate.toDateString()}.`
    });
  }
}

// ---- Step 13: Student begins learning ----
// No separate persistence step — once Enrollment.status === "active" and a
// Class + TimetableSlot exist, the Student Portal (src/app/student) already
// surfaces "Current Courses", "Today's Classes" and "Upcoming Classes" for
// this student. This function is a convenience readiness check.
export async function isStudentReadyToLearn(studentId: string) {
  const enrollment = await prisma.enrollment.findFirst({
    where: { studentId, status: "active", classId: { not: null } },
    include: { class: { include: { timetableSlots: true } } }
  });
  return Boolean(enrollment?.class?.timetableSlots.length);
}
