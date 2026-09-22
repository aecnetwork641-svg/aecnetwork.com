import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Data isolation helpers for all portals (Student, Parent, Teacher, Employee, Supervisor).
 *
 * Enforces server-side authorization and strict tenant scoping:
 * - Student only sees their own rows
 * - Parent only sees their validated children
 * - Teacher only sees classes & students assigned to them
 * - Employee only sees their own HR/leave/payslip records
 * - Supervisor only sees their designated department
 */

export async function getCurrentStudentScope() {
  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as { id?: string }).id : undefined;
  if (!userId) return null;

  const student = await prisma.student.findUnique({ where: { userId } });
  if (!student) return null;

  return { studentId: student.id, userId };
}

export async function getCurrentParentScope(requestedChildId?: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as { id?: string }).id : undefined;
  if (!userId) return null;

  const parent = await prisma.parentProfile.findUnique({
    where: { userId },
    include: { children: { include: { user: true } } }
  });
  if (!parent) return null;

  const children = parent.children;
  const selected =
    (requestedChildId ? children.find((c) => c.id === requestedChildId) : undefined) ??
    children[0] ??
    null;

  return { parentId: parent.id, children, selectedChild: selected };
}

export async function getCurrentTeacherScope() {
  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as { id?: string }).id : undefined;
  if (!userId) return null;

  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    include: { user: true }
  });
  if (!teacher) return null;

  return { teacherId: teacher.id, userId, teacher };
}

export async function getCurrentEmployeeScope() {
  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as { id?: string }).id : undefined;
  if (!userId) return null;

  const employee = await prisma.employee.findUnique({
    where: { userId },
    include: { department: true, user: true }
  });
  if (!employee) return null;

  return { employeeId: employee.id, userId, employee };
}

export async function getCurrentSupervisorScope() {
  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as { id?: string }).id : undefined;
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
