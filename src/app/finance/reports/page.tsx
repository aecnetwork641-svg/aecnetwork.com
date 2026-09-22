import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function FinanceReportsPage() {
  const [payments, invoices, expenses, payslips] = await Promise.all([
    prisma.payment.findMany(),
    prisma.invoice.findMany({ include: { student: { include: { user: true } } } }),
    prisma.expense.findMany(),
    prisma.payslip.findMany()
  ]);

  const totalCollected = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const totalOutstanding = invoices
    .filter((i) => i.status === "unpaid" || i.status === "overdue")
    .reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalPayroll = payslips.reduce((sum, ps) => sum + Number(ps.netAmount), 0);
  const netSurplus = totalCollected - (totalExpenses + totalPayroll);

  return (
    <PortalShell role="Finance Portal" navItems={FINANCE_NAV} title="Financial Statements & Reports">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Executive financial summaries: fee collection, outstanding balances, payroll outlays, and net cashflow.
        </p>
      </div>

      {/* Net Summary Metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Tuition Revenue</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">${totalCollected.toFixed(2)}</p>
          <p className="text-[11px] text-aec-navy/60">Cleared fee receipts</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Outstanding Fees</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">${totalOutstanding.toFixed(2)}</p>
          <p className="text-[11px] text-aec-navy/60">Unpaid tuition receivable</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Payroll & Expenses</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">${(totalExpenses + totalPayroll).toFixed(2)}</p>
          <p className="text-[11px] text-aec-navy/60">Salaries + operations</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Net Institutional Margin</p>
          <p className={`mt-1 text-2xl font-bold ${netSurplus >= 0 ? "text-aec-navy" : "text-rose-600"}`}>
            ${netSurplus.toFixed(2)}
          </p>
          <p className="text-[11px] text-aec-navy/60">Net position after expenses</p>
        </div>
      </div>

      {/* Student Fee Account Balances */}
      <div className="card mt-8">
        <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
          Student Fee Account Balances
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-aec-navy/10 text-aec-navy/50 uppercase">
                <th className="py-2.5 px-2">Student</th>
                <th className="py-2.5 px-2">Student Code</th>
                <th className="py-2.5 px-2">Invoice Amount</th>
                <th className="py-2.5 px-2">Status</th>
                <th className="py-2.5 px-2">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aec-navy/5">
              {invoices.slice(0, 15).map((inv) => (
                <tr key={inv.id}>
                  <td className="py-2.5 px-2 font-semibold text-aec-navy">{inv.student.user.name}</td>
                  <td className="py-2.5 px-2 font-mono text-aec-navy/60">{inv.student.studentCode}</td>
                  <td className="py-2.5 px-2 font-bold text-aec-navy">${Number(inv.amount).toFixed(2)}</td>
                  <td className="py-2.5 px-2">
                    <span
                      className={`rounded px-2 py-0.5 capitalize font-medium ${
                        inv.status === "paid"
                          ? "bg-emerald-50 text-emerald-700"
                          : inv.status === "overdue"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-aec-navy/70">{inv.dueDate.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
