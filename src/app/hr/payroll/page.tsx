import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function HRPayrollPage() {
  const payslips = await prisma.payslip.findMany({
    include: {
      employee: {
        include: { user: true, department: true, salaryComponents: true }
      }
    },
    orderBy: { issuedAt: "desc" }
  });

  const totalDisbursed = payslips.reduce((sum, p) => sum + Number(p.netAmount), 0);
  const totalDeductions = payslips.reduce((sum, p) => sum + Number(p.deductions), 0);
  const totalAllowances = payslips.reduce((sum, p) => sum + Number(p.allowances), 0);

  return (
    <PortalShell role="HR Management Portal" navItems={HR_NAV} title="Payroll & Compensation">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Salary structures, allowances, tax & leave deductions, and net disbursed payroll.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Total Net Disbursed</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">${totalDisbursed.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Allowances & Bonuses</p>
          <p className="mt-1 text-2xl font-bold text-aec-blue">${totalAllowances.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Applied Deductions</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">${totalDeductions.toLocaleString()}</p>
        </div>
      </div>

      <div className="card mt-6">
        <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
          <h3 className="font-bold text-aec-navy text-sm">Monthly Payroll Registers</h3>
          <span className="rounded bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700">
            Confidential — HR/Finance Only
          </span>
        </div>

        {payslips.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No payroll registers processed for the active cycle.
          </p>
        ) : (
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Employee</th>
                  <th className="py-3 px-2">Department</th>
                  <th className="py-3 px-2">Period</th>
                  <th className="py-3 px-2">Gross Base</th>
                  <th className="py-3 px-2">Allowances</th>
                  <th className="py-3 px-2">Deductions</th>
                  <th className="py-3 px-2">Net Salary</th>
                  <th className="py-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {payslips.map((p) => (
                  <tr key={p.id} className="hover:bg-aec-navy/[0.02]">
                    <td className="py-3 px-2 font-medium text-aec-navy">{p.employee.user.name}</td>
                    <td className="py-3 px-2 text-xs text-aec-navy/60">
                      {p.employee.department?.name || "General"}
                    </td>
                    <td className="py-3 px-2 text-xs text-aec-navy/70">
                      {p.periodStart.toLocaleDateString()} &mdash; {p.periodEnd.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 font-mono text-xs text-aec-navy">
                      ${Number(p.grossAmount).toFixed(2)}
                    </td>
                    <td className="py-3 px-2 font-mono text-xs text-emerald-600">
                      +${Number(p.allowances).toFixed(2)}
                    </td>
                    <td className="py-3 px-2 font-mono text-xs text-rose-600">
                      -${Number(p.deductions).toFixed(2)}
                    </td>
                    <td className="py-3 px-2 font-mono text-xs font-bold text-aec-navy">
                      ${Number(p.netAmount).toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-right text-xs">
                      <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold uppercase text-emerald-700">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
