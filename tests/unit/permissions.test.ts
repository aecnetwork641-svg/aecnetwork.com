import { describe, it, expect } from "vitest";
import {
  canAccessAcademic,
  canAccessFinance,
  canAccessHR,
  canAccessSalaryInfo,
  canTeacherManageClass,
  hasPermission
} from "@/lib/permissions";

describe("RBAC Permissions Matrix", () => {
  it("allows Academic Head, Admin, and Super Admin to access Academic administration", () => {
    expect(canAccessAcademic("ACADEMIC_HEAD")).toBe(true);
    expect(canAccessAcademic("ADMIN")).toBe(true);
    expect(canAccessAcademic("SUPER_ADMIN")).toBe(true);
    expect(canAccessAcademic("TEACHER")).toBe(false);
    expect(canAccessAcademic("STUDENT")).toBe(false);
  });

  it("restricts Finance access to Finance Manager and Admins", () => {
    expect(canAccessFinance("FINANCE_MANAGER")).toBe(true);
    expect(canAccessFinance("ADMIN")).toBe(true);
    expect(canAccessFinance("TEACHER")).toBe(false);
    expect(canAccessFinance("STUDENT")).toBe(false);
  });

  it("restricts HR access strictly to HR Manager and Admins", () => {
    expect(canAccessHR("HR_MANAGER")).toBe(true);
    expect(canAccessHR("ADMIN")).toBe(true);
    expect(canAccessHR("TEACHER")).toBe(false);
  });

  it("protects salary information from ordinary employees", () => {
    // Ordinary employee cannot see someone else's salary
    expect(canAccessSalaryInfo("TEACHER", "user-1", "user-2")).toBe(false);
    // Employee can view their own payslip
    expect(canAccessSalaryInfo("TEACHER", "user-1", "user-1")).toBe(true);
    // HR and Finance can view any salary
    expect(canAccessSalaryInfo("HR_MANAGER", "user-hr", "user-2")).toBe(true);
    expect(canAccessSalaryInfo("FINANCE_MANAGER", "user-fin", "user-2")).toBe(true);
  });

  it("strictly scopes teacher access to assigned classes only", () => {
    // Teacher assigned to class
    expect(canTeacherManageClass("TEACHER", "teacher-1", "teacher-1")).toBe(true);
    // Teacher NOT assigned to class
    expect(canTeacherManageClass("TEACHER", "teacher-1", "teacher-2")).toBe(false);
    // Academic Head or Admin has override access
    expect(canTeacherManageClass("ACADEMIC_HEAD", "teacher-1", "teacher-2")).toBe(true);
  });

  it("validates specific granular permissions", () => {
    expect(hasPermission("TEACHER", "MARK_ATTENDANCE")).toBe(true);
    expect(hasPermission("STUDENT", "MARK_ATTENDANCE")).toBe(false);
    expect(hasPermission("FINANCE_MANAGER", "CREATE_INVOICE")).toBe(true);
    expect(hasPermission("ADMISSIONS_OFFICER", "MANAGE_LEADS")).toBe(true);
  });
});
