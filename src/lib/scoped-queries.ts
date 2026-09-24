import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Data isolation and server-side authorization helpers for all portals.
 *
 * Enforces strict multi-tenant isolation:
 * - Student only sees their own rows
 * - Parent only sees their validated children
 * - Teacher only sees classes & students assigned to them
 * - Employee only sees their own HR/leave/payslip records
 * - Supervisor only sees their designated department
 * - Admin/Super Admin has global operational visibility
 */

export async function getCurrentUserSession() {
  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as { id?: string }).id : undefined;
  const role = session?.user ? (session.user as { role?: string }).role : undefined;
  return { session, userId, role };
}

export async function getCurrentStudentScope() {
  const { userId } = await getCurrentUserSession();
  if (!userId) return null;

  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      user: true,
      guardian: { include: { user: true } }
    }
  });
  if (!student) return null;

  return { studentId: student.id, userId, student };
}

export async function getCurrentParentScope(requestedChildId?: string) {
  const { userId } = await getCurrentUserSession();
  if (!userId) return null;

  const parent = await prisma.parentProfile.findUnique({
    where: { userId },
    include: {
      user: true,
      children: {
        include: {
          user: true,
          enrollments: { include: { course: true, class: { include: { teacher: { include: { user: true } }, timetableSlots: true } } } },
          invoices: true
        }
      }
    }
  });
  if (!parent) return null;

  const children = parent.children;
  const selected =
    (requestedChildId ? children.find((c) => c.id === requestedChildId) : undefined) ??
    children[0] ??
    null;

  return { parentId: parent.id, userId, parent, children, selectedChild: selected };
}

export async function getCurrentTeacherScope() {
  const { userId } = await getCurrentUserSession();
  if (!userId) return null;

  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    include: {
      user: true,
      classes: {
        include: {
          course: true,
          enrollments: { include: { student: { include: { user: true } } } },
          timetableSlots: true
        }
      }
    }
  });
  if (!teacher) return null;

  return { teacherId: teacher.id, userId, teacher };
}

export async function getCurrentEmployeeScope() {
  const { userId } = await getCurrentUserSession();
  if (!userId) return null;

  const employee = await prisma.employee.findUnique({
    where: { userId },
    include: { department: true, user: true, payslips: true, leaveRequests: true }
  });
  if (!employee) return null;

  return { employeeId: employee.id, userId, employee };
}

export async function getCurrentSupervisorScope() {
  const { userId } = await getCurrentUserSession();
  if (!userId) return null;

  const employee = await prisma.employee.findUnique({
    where: { userId },
    include: { department: true, user: true }
  });
  if (!employee || !employee.departmentId) return null;

  return {
    supervisorId: employee.id,
    userId,
    departmentId: employee.departmentId,
    department: employee.department
  };
}

/**
 * Creates an immutable audit log record for critical administrative actions
 */
export async function createAuditLog(data: {
  actorId: string;
  action: string;
  entity: string;
  entityId: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
}) {
  try {
    return await prisma.auditLog.create({
      data: {
        actorId: data.actorId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        metadata: data.metadata ?? undefined,
        ipAddress: data.ipAddress ?? undefined
      }
    });
  } catch (err) {
    console.error("[AUDIT_LOG_ERROR]", err);
    return null;
  }
}
