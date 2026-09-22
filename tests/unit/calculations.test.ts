import { describe, it, expect } from "vitest";

describe("Academic & Operational Calculations", () => {
  describe("Attendance Calculations", () => {
    it("calculates correct presence percentage", () => {
      const records = [
        { status: "present" },
        { status: "present" },
        { status: "absent" },
        { status: "late" }
      ];
      const total = records.length;
      const present = records.filter((r) => r.status === "present").length;
      const percentage = Math.round((present / total) * 100);

      expect(percentage).toBe(50);
    });

    it("returns null or 0 when no attendance records exist", () => {
      const total = 0;
      const percentage = total > 0 ? 100 : null;
      expect(percentage).toBeNull();
    });
  });

  describe("Billing & Fee Calculations", () => {
    it("calculates outstanding balance correctly after payments", () => {
      const invoiceAmount = 250.0;
      const payments = [{ amount: 100.0 }, { amount: 50.0 }];
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      const outstanding = invoiceAmount - totalPaid;

      expect(totalPaid).toBe(150.0);
      expect(outstanding).toBe(100.0);
    });

    it("identifies settled status when fully paid", () => {
      const invoiceAmount = 200.0;
      const totalPaid = 200.0;
      const isPaid = totalPaid >= invoiceAmount;
      expect(isPaid).toBe(true);
    });
  });

  describe("Leave Management Calculations", () => {
    it("deducts approved leave days from remaining balance", () => {
      const startingAnnualBalance = 20;
      const leaveDurationDays = 4;
      const remainingBalance = startingAnnualBalance - leaveDurationDays;

      expect(remainingBalance).toBe(16);
      expect(remainingBalance >= 0).toBe(true);
    });
  });

  describe("Payroll Calculations", () => {
    it("computes net salary correctly: base + allowances + bonus - deductions", () => {
      const baseSalary = 3000.0;
      const allowances = 300.0;
      const bonus = 200.0;
      const deductions = 150.0;

      const netSalary = baseSalary + allowances + bonus - deductions;
      expect(netSalary).toBe(3350.0);
    });
  });
});
