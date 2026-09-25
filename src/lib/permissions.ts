/**
 * AEC Network — Role-Based Access Control (RBAC) System
 *
 * Implements strict server-side authorization checks for all 15 system roles.
 * Never trust client-side claims or hidden UI elements.
 */

export type RoleName =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "DIRECTOR"
  | "ACADEMIC_ADMIN"
  | "ACADEMIC_HEAD"
  | "ADMISSIONS"
  | "ADMISSIONS_OFFICER"
  | "COUNSELOR"
  | "TEACHER"
  | "SUPERVISOR"
  | "HR"
  | "HR_MANAGER"
  | "FINANCE"
  | "FINANCE_MANAGER"
  | "CONTENT_EDITOR"
  | "STUDENT"
  | "PARENT"
  | "STAFF"
  | "INSTITUTION";

export const ALL_ROLES: RoleName[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "DIRECTOR",
  "ACADEMIC_ADMIN",
  "ACADEMIC_HEAD",
  "ADMISSIONS",
  "ADMISSIONS_OFFICER",
  "COUNSELOR",
  "TEACHER",
  "SUPERVISOR",
  "HR",
  "HR_MANAGER",
  "FINANCE",
  "FINANCE_MANAGER",
  "CONTENT_EDITOR",
  "STUDENT",
  "PARENT",
  "STAFF",
  "INSTITUTION"
];

// Role Capabilities
export const PERMISSIONS = {
  // Administration (Restricted to SUPER_ADMIN)
  MANAGE_USERS: ["SUPER_ADMIN"],
  MANAGE_SETTINGS: ["SUPER_ADMIN"],
  VIEW_AUDIT_LOGS: ["SUPER_ADMIN", "DIRECTOR"],

  // Academics & Student/Teacher Operations (ADMIN has access)
  MANAGE_ACADEMICS: ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "DIRECTOR"],
  MANAGE_CLASSES: ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"],
  MANAGE_TIMETABLE: ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"],
  VIEW_ACADEMIC_REPORTS: ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "DIRECTOR", "SUPERVISOR"],

  // Teacher specific
  MARK_ATTENDANCE: ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "TEACHER"],
  GRADE_ASSIGNMENTS: ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "TEACHER"],
  ENTER_RESULTS: ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "TEACHER"],

  // Admissions & Leads (ADMIN has access)
  MANAGE_LEADS: ["SUPER_ADMIN", "ADMIN", "ADMISSIONS", "ADMISSIONS_OFFICER", "COUNSELOR"],
  SCHEDULE_TRIALS: ["SUPER_ADMIN", "ADMIN", "ADMISSIONS", "ADMISSIONS_OFFICER", "COUNSELOR"],
  ENROLL_STUDENTS: ["SUPER_ADMIN", "ADMIN", "ADMISSIONS", "ADMISSIONS_OFFICER", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"],

  // Finance (Restricted from regular ADMIN)
  ACCESS_FINANCE: ["SUPER_ADMIN", "FINANCE", "FINANCE_MANAGER", "DIRECTOR"],
  CREATE_INVOICE: ["SUPER_ADMIN", "FINANCE", "FINANCE_MANAGER"],
  RECORD_PAYMENT: ["SUPER_ADMIN", "FINANCE", "FINANCE_MANAGER"],
  VIEW_FINANCIAL_REPORTS: ["SUPER_ADMIN", "FINANCE", "FINANCE_MANAGER", "DIRECTOR"],

  // HR & Payroll (Restricted from regular ADMIN)
  ACCESS_HR: ["SUPER_ADMIN", "HR", "HR_MANAGER", "DIRECTOR"],
  MANAGE_EMPLOYEES: ["SUPER_ADMIN", "HR", "HR_MANAGER"],
  APPROVE_LEAVE_HR: ["SUPER_ADMIN", "HR", "HR_MANAGER"],
  APPROVE_LEAVE_SUPERVISOR: ["SUPER_ADMIN", "ADMIN", "SUPERVISOR", "HR", "HR_MANAGER"],
  VIEW_PAYROLL: ["SUPER_ADMIN", "HR", "HR_MANAGER", "FINANCE", "FINANCE_MANAGER", "DIRECTOR"],
  EDIT_SALARY: ["SUPER_ADMIN", "HR", "HR_MANAGER", "DIRECTOR"],

  // Content
  MANAGE_CONTENT: ["SUPER_ADMIN", "ADMIN", "CONTENT_EDITOR"]
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;

export function hasPermission(role?: string | null, permission?: PermissionKey): boolean {
  if (!role || !permission) return false;
  const allowed = PERMISSIONS[permission];
  return (allowed as readonly string[]).includes(role);
}

export function isOneOf(role?: string | null, allowedRoles: RoleName[] = []): boolean {
  if (!role) return false;
  return allowedRoles.includes(role as RoleName);
}

/**
 * Maps system role to its designated default portal path
 */
export function getRoleRedirectPath(role?: string | null): string {
  switch (role) {
    case "SUPER_ADMIN":
      return "/super-admin";
    case "ADMIN":
    case "DIRECTOR":
    case "STAFF":
      return "/admin";
    case "ACADEMIC_ADMIN":
    case "ACADEMIC_HEAD":
      return "/academic";
    case "ADMISSIONS":
    case "ADMISSIONS_OFFICER":
    case "COUNSELOR":
      return "/admin/admissions";
    case "FINANCE":
    case "FINANCE_MANAGER":
      return "/finance";
    case "HR":
    case "HR_MANAGER":
      return "/hr";
    case "SUPERVISOR":
      return "/supervisor";
    case "TEACHER":
      return "/teacher";
    case "PARENT":
      return "/parent";
    case "STUDENT":
      return "/student";
    default:
      return "/login";
  }
}

/**
 * Checks if user is authorized for academic administrative duties
 */
export function canAccessAcademic(role?: string | null): boolean {
  return isOneOf(role, ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "DIRECTOR"]);
}

/**
 * Checks if user can access the finance portal and billing workflows
 */
export function canAccessFinance(role?: string | null): boolean {
  return isOneOf(role, ["SUPER_ADMIN", "ADMIN", "FINANCE", "FINANCE_MANAGER", "DIRECTOR"]);
}

/**
 * Checks if user can access HR portal
 */
export function canAccessHR(role?: string | null): boolean {
  return isOneOf(role, ["SUPER_ADMIN", "ADMIN", "HR", "HR_MANAGER", "DIRECTOR"]);
}

/**
 * Ensures ordinary staff and employees can never view salary details.
 */
export function canAccessSalaryInfo(role?: string | null, currentUserId?: string, targetUserId?: string): boolean {
  if (isOneOf(role, ["SUPER_ADMIN", "ADMIN", "HR", "HR_MANAGER", "FINANCE", "FINANCE_MANAGER", "DIRECTOR"])) {
    return true;
  }
  // Employee can only see their own payslip
  if (currentUserId && targetUserId && currentUserId === targetUserId) {
    return true;
  }
  return false;
}

/**
 * Scoped check: Verifies a teacher is assigned to a particular class
 */
export function canTeacherManageClass(
  role: string | null | undefined,
  currentTeacherId: string | null | undefined,
  classTeacherId: string | null | undefined
): boolean {
  if (isOneOf(role, ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"])) return true;
  if (!currentTeacherId || !classTeacherId) return false;
  return currentTeacherId === classTeacherId;
}

/**
 * Throws an error or returns a clean response if unauthorized
 */
export function assertAuthorized(condition: boolean, message = "Access Denied"): void {
  if (!condition) {
    const error = new Error(message);
    (error as unknown as { status: number }).status = 403;
    throw error;
  }
}
