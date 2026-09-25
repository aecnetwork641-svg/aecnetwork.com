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
  const { session, userId, role } = await getCurrentUserSession();
  if (!userId) return null;

  try {
    let student = await prisma.student.findUnique({
      where: { userId },
      include: {
        user: true,
        guardian: { include: { user: true } }
      }
    });

    if (!student && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      student = await prisma.student.findFirst({
        include: {
          user: true,
          guardian: { include: { user: true } }
        }
      });
    }

    if (!student && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      return {
        studentId: "preview-student-id",
        userId,
        student: {
          id: "preview-student-id",
          userId,
          studentCode: "AEC-SUPERADMIN",
          dateOfBirth: null,
          country: "Global",
          guardianId: null,
          enrolledAt: new Date(),
          user: {
            id: userId,
            email: session?.user?.email || "admin@aecnetwork.com",
            name: session?.user?.name || "Super Admin",
            role: "SUPER_ADMIN",
            avatarUrl: null,
            isActive: true,
            emailVerified: null,
            hashedPassword: null,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          guardian: null
        } as any
      };
    }

    if (!student) return null;

    return { studentId: student.id, userId, student };
  } catch (err) {
    console.error("[STUDENT_SCOPE_ERROR]", err);
    if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR") {
      return {
        studentId: "preview-student-id",
        userId,
        student: {
          id: "preview-student-id",
          userId,
          studentCode: "AEC-SUPERADMIN",
          dateOfBirth: null,
          country: "Global",
          guardianId: null,
          enrolledAt: new Date(),
          user: {
            id: userId,
            email: session?.user?.email || "admin@aecnetwork.com",
            name: session?.user?.name || "Super Admin",
            role: "SUPER_ADMIN",
            avatarUrl: null,
            isActive: true,
            emailVerified: null,
            hashedPassword: null,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          guardian: null
        } as any
      };
    }
    return null;
  }
}

export async function getCurrentParentScope(requestedChildId?: string) {
  const { session, userId, role } = await getCurrentUserSession();
  if (!userId) return null;

  try {
    let parent = await prisma.parentProfile.findUnique({
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

    if (!parent && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      parent = await prisma.parentProfile.findFirst({
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
    }

    if (!parent && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      const fallbackUser = {
        id: userId,
        email: session?.user?.email || "admin@aecnetwork.com",
        name: session?.user?.name || "Super Admin",
        role: "SUPER_ADMIN",
        avatarUrl: null,
        isActive: true,
        emailVerified: null,
        hashedPassword: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return {
        parentId: "preview-parent-id",
        userId,
        parent: {
          id: "preview-parent-id",
          userId,
          user: fallbackUser,
          children: []
        } as any,
        children: [],
        selectedChild: null
      };
    }

    if (!parent) return null;

    const children = parent.children || [];
    const selected =
      (requestedChildId ? children.find((c) => c.id === requestedChildId) : undefined) ??
      children[0] ??
      null;

    return { parentId: parent.id, userId, parent, children, selectedChild: selected };
  } catch (err) {
    console.error("[PARENT_SCOPE_ERROR]", err);
    if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR") {
      return {
        parentId: "preview-parent-id",
        userId,
        parent: {
          id: "preview-parent-id",
          userId,
          user: {
            id: userId,
            email: session?.user?.email || "admin@aecnetwork.com",
            name: session?.user?.name || "Super Admin",
            role: "SUPER_ADMIN"
          },
          children: []
        } as any,
        children: [],
        selectedChild: null
      };
    }
    return null;
  }
}

export async function getCurrentTeacherScope() {
  const { session, userId, role } = await getCurrentUserSession();
  if (!userId) return null;

  try {
    let teacher = await prisma.teacher.findUnique({
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

    if (!teacher && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      teacher = await prisma.teacher.findFirst({
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
    }

    if (!teacher && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      return {
        teacherId: "preview-teacher-id",
        userId,
        teacher: {
          id: "preview-teacher-id",
          userId,
          teacherCode: "AEC-FACULTY-PREVIEW",
          specialties: ["General Faculty", "Quran Studies"],
          bio: "Super Administrator Faculty View",
          hiredAt: new Date(),
          user: {
            id: userId,
            email: session?.user?.email || "admin@aecnetwork.com",
            name: session?.user?.name || "Super Admin",
            role: "SUPER_ADMIN"
          },
          classes: [],
          coursesTaught: []
        } as any
      };
    }

    if (!teacher) return null;

    return { teacherId: teacher.id, userId, teacher };
  } catch (err) {
    console.error("[TEACHER_SCOPE_ERROR]", err);
    if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR") {
      return {
        teacherId: "preview-teacher-id",
        userId,
        teacher: {
          id: "preview-teacher-id",
          userId,
          teacherCode: "AEC-FACULTY-PREVIEW",
          specialties: ["General Faculty"],
          bio: null,
          hiredAt: new Date(),
          user: {
            id: userId,
            email: session?.user?.email || "admin@aecnetwork.com",
            name: session?.user?.name || "Super Admin",
            role: "SUPER_ADMIN"
          },
          classes: [],
          coursesTaught: []
        } as any
      };
    }
    return null;
  }
}

export async function getCurrentEmployeeScope() {
  const { session, userId, role } = await getCurrentUserSession();
  if (!userId) return null;

  try {
    let employee = await prisma.employee.findUnique({
      where: { userId },
      include: { department: true, user: true, payslips: true, leaveRequests: true }
    });

    if (!employee && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      employee = await prisma.employee.findFirst({
        include: { department: true, user: true, payslips: true, leaveRequests: true }
      });
    }

    if (!employee && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      return {
        employeeId: "preview-emp-id",
        userId,
        employee: {
          id: "preview-emp-id",
          userId,
          employeeCode: "AEC-EMP-PREVIEW",
          position: "System Administrator",
          status: "active",
          annualLeaveBal: 20,
          sickLeaveBal: 10,
          user: {
            id: userId,
            email: session?.user?.email || "admin@aecnetwork.com",
            name: session?.user?.name || "Super Admin",
            role: "SUPER_ADMIN"
          },
          department: null,
          payslips: [],
          leaveRequests: []
        } as any
      };
    }

    if (!employee) return null;

    return { employeeId: employee.id, userId, employee };
  } catch (err) {
    console.error("[EMPLOYEE_SCOPE_ERROR]", err);
    return null;
  }
}

export async function getCurrentSupervisorScope() {
  const { session, userId, role } = await getCurrentUserSession();
  if (!userId) return null;

  try {
    let employee = await prisma.employee.findUnique({
      where: { userId },
      include: { department: true, user: true }
    });

    if (!employee && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      employee = await prisma.employee.findFirst({
        where: { departmentId: { not: null as any } },
        include: { department: true, user: true }
      });
    }

    if (!employee && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR")) {
      return {
        supervisorId: "preview-supervisor-id",
        userId,
        departmentId: "preview-dept-id",
        department: {
          id: "preview-dept-id",
          name: "Academic Quality & Administration",
          code: "AQA",
          createdAt: new Date()
        } as any
      };
    }

    if (!employee || !employee.departmentId) {
      if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR") {
        return {
          supervisorId: employee?.id || "preview-supervisor-id",
          userId,
          departmentId: "preview-dept-id",
          department: {
            id: "preview-dept-id",
            name: "Academic Quality & Administration",
            code: "AQA",
            createdAt: new Date()
          } as any
        };
      }
      return null;
    }

    return {
      supervisorId: employee.id,
      userId,
      departmentId: employee.departmentId,
      department: employee.department
    };
  } catch (err) {
    console.error("[SUPERVISOR_SCOPE_ERROR]", err);
    if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DIRECTOR") {
      return {
        supervisorId: "preview-supervisor-id",
        userId,
        departmentId: "preview-dept-id",
        department: {
          id: "preview-dept-id",
          name: "Academic Quality & Administration",
          code: "AQA",
          createdAt: new Date()
        } as any
      };
    }
    return null;
  }
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
