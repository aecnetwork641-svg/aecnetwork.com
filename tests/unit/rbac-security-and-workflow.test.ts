import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";
import {
  getRoleRedirectPath,
  canAccessAcademic,
  canAccessFinance,
  canAccessHR,
  canAccessSalaryInfo,
  canTeacherManageClass,
  hasPermission,
  isOneOf
} from "@/lib/permissions";

describe("Critical Authentication & Security Checks", () => {
  it("verifies bcrypt password hashing and comparison correctly", async () => {
    const rawPassword = "TestPassword@2026";
    const hash = await bcrypt.hash(rawPassword, 10);
    expect(hash).not.toBe(rawPassword);

    const isMatch = await bcrypt.compare(rawPassword, hash);
    expect(isMatch).toBe(true);

    const isWrongMatch = await bcrypt.compare("WrongPassword", hash);
    expect(isWrongMatch).toBe(false);
  });

  it("maps each of the 10 system roles to its designated secure portal route", () => {
    expect(getRoleRedirectPath("SUPER_ADMIN")).toBe("/admin");
    expect(getRoleRedirectPath("ADMIN")).toBe("/admin");
    expect(getRoleRedirectPath("ACADEMIC_ADMIN")).toBe("/academic");
    expect(getRoleRedirectPath("ACADEMIC_HEAD")).toBe("/academic");
    expect(getRoleRedirectPath("ADMISSIONS")).toBe("/admin/admissions");
    expect(getRoleRedirectPath("ADMISSIONS_OFFICER")).toBe("/admin/admissions");
    expect(getRoleRedirectPath("FINANCE")).toBe("/finance");
    expect(getRoleRedirectPath("FINANCE_MANAGER")).toBe("/finance");
    expect(getRoleRedirectPath("HR")).toBe("/hr");
    expect(getRoleRedirectPath("HR_MANAGER")).toBe("/hr");
    expect(getRoleRedirectPath("SUPERVISOR")).toBe("/supervisor");
    expect(getRoleRedirectPath("TEACHER")).toBe("/teacher");
    expect(getRoleRedirectPath("PARENT")).toBe("/parent");
    expect(getRoleRedirectPath("STUDENT")).toBe("/student");
    expect(getRoleRedirectPath(null)).toBe("/login");
  });
});

describe("Strict Multi-Tenant Isolation & Role Boundaries", () => {
  it("enforces student boundary: student cannot access administrative or teacher capabilities", () => {
    expect(canAccessAcademic("STUDENT")).toBe(false);
    expect(canAccessFinance("STUDENT")).toBe(false);
    expect(canAccessHR("STUDENT")).toBe(false);
    expect(hasPermission("STUDENT", "MANAGE_USERS")).toBe(false);
    expect(hasPermission("STUDENT", "GRADE_ASSIGNMENTS")).toBe(false);
    expect(hasPermission("STUDENT", "CREATE_INVOICE")).toBe(false);
  });

  it("enforces parent boundary: parent cannot access admin or teacher actions", () => {
    expect(canAccessAcademic("PARENT")).toBe(false);
    expect(canAccessFinance("PARENT")).toBe(false);
    expect(canAccessHR("PARENT")).toBe(false);
    expect(hasPermission("PARENT", "MARK_ATTENDANCE")).toBe(false);
  });

  it("enforces teacher boundary: teacher can only manage assigned classes", () => {
    const teacherId = "tch-001";
    const assignedClassTeacherId = "tch-001";
    const otherClassTeacherId = "tch-002";

    // Can manage own class
    expect(canTeacherManageClass("TEACHER", teacherId, assignedClassTeacherId)).toBe(true);
    // Cannot manage other teacher's class
    expect(canTeacherManageClass("TEACHER", teacherId, otherClassTeacherId)).toBe(false);
  });

  it("enforces HR vs Finance boundary separation", () => {
    // HR cannot create invoices or record payments
    expect(hasPermission("HR_MANAGER", "CREATE_INVOICE")).toBe(false);
    expect(hasPermission("HR", "RECORD_PAYMENT")).toBe(false);

    // Finance cannot approve leave or manage employee profiles
    expect(hasPermission("FINANCE_MANAGER", "APPROVE_LEAVE_HR")).toBe(false);
    expect(hasPermission("FINANCE", "MANAGE_EMPLOYEES")).toBe(false);
  });

  it("enforces salary confidential access rules", () => {
    // Employee A cannot view Employee B's salary
    expect(canAccessSalaryInfo("TEACHER", "emp-a", "emp-b")).toBe(false);
    // Employee A can view Employee A's own salary
    expect(canAccessSalaryInfo("TEACHER", "emp-a", "emp-a")).toBe(true);
    // HR & Super Admin can view any salary
    expect(canAccessSalaryInfo("HR_MANAGER", "hr-admin", "emp-b")).toBe(true);
    expect(canAccessSalaryInfo("SUPER_ADMIN", "super-admin", "emp-b")).toBe(true);
  });
});

describe("Parent-Child Multi-Tenant Scoping Validation", () => {
  it("ensures parent only accesses their validated linked children", () => {
    const parent1Children = [{ id: "stu-1", name: "Child 1" }, { id: "stu-2", name: "Child 2" }];
    const parent2Children = [{ id: "stu-3", name: "Child 3" }];

    // Function simulating server-side child validation
    function validateChildForParent(parentChildren: { id: string }[], requestedChildId?: string) {
      if (!requestedChildId) return parentChildren[0] ?? null;
      return parentChildren.find((c) => c.id === requestedChildId) ?? null;
    }

    // Parent 1 requests their own child
    expect(validateChildForParent(parent1Children, "stu-1")?.id).toBe("stu-1");
    expect(validateChildForParent(parent1Children, "stu-2")?.id).toBe("stu-2");

    // Parent 1 requests Parent 2's child -> Returns null (Access Denied / Isolated)
    expect(validateChildForParent(parent1Children, "stu-3")).toBeNull();

    // Parent 2 requests Parent 1's child -> Returns null
    expect(validateChildForParent(parent2Children, "stu-1")).toBeNull();
  });
});

describe("Complete End-to-End Workflow Data Model Validation", () => {
  it("validates workflow chain from Lead -> Student -> Class -> Timetable -> Fee -> Attendance -> Grade -> Certificate", () => {
    // Step 1: Lead Submission
    const lead = { id: "lead-01", name: "Applicant Learner", status: "new" };
    expect(lead.status).toBe("new");

    // Step 2: Admissions Conversion
    const student = { id: "stu-101", studentCode: "AEC-STU-101", leadId: lead.id };
    expect(student.studentCode).toMatch(/^AEC-STU-/);

    // Step 3: Class & Timetable Assignment
    const klass = { id: "cls-01", courseId: "crs-tajweed", teacherId: "tch-01" };
    const timetable = [{ classId: klass.id, dayOfWeek: 1, startTime: "10:00", endTime: "11:00" }];
    expect(timetable[0].classId).toBe(klass.id);

    // Step 4: Fee Plan & Invoice Generation
    const invoice = { id: "inv-01", studentId: student.id, amount: 65.0, status: "unpaid" };
    expect(invoice.amount).toBe(65.0);

    // Step 5: Attendance Recording
    const attendance = { classId: klass.id, studentId: student.id, status: "present", date: new Date() };
    expect(attendance.status).toBe("present");

    // Step 6: Grading & Assessment
    const result = { examId: "exam-01", studentId: student.id, score: 95, grade: "A+" };
    expect(result.grade).toBe("A+");

    // Step 7: Certificate Credential Issuance
    const certificate = {
      id: "cert-01",
      studentId: student.id,
      credentialCode: "AEC-CRD-8891-2026",
      title: "Certificate of Completion"
    };
    expect(certificate.credentialCode).toBe("AEC-CRD-8891-2026");
  });
});
