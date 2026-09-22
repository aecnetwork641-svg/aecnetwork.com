import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "./_nav";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function FinanceDashboardPage() {
  const [invoices, payments, expenses] = await Promise.all([
    prisma.invoice.findMany({
      include: {
        student: { include: { user: true } },
        payments: true
      }
    }),
    prisma.payment.findMany({
      include: {
        invoice: { include: { student: { include: { user: true } } } }
      },
      orderBy: { paidAt: "desc" },
      take: 8
    }),
    prisma.expense.findMany({
      take: 5,
      orderBy: { date: "desc" }
    })
  ]);

  // Aggregate totals
  const totalCollected = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const totalInvoiced = invoices.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalPending = invoices
    .filter((i) => i.status === "unpaid")
    .reduce((sum, i) => sum + Number(i.amount), 0);
  const totalOverdue = invoices
    .filter((i) => i.status === "overdue" || (i.status === "unpaid" && new Date(i.dueDate) < new Date()))
    .reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const netBalance = totalCollected - totalExpenses;

  return (
    <PortalShell role="Finance Portal" navItems={FINANCE_NAV} title="Financial Overview">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Total Collected</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">${totalCollected.toLocaleString()}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Cleared tuition & course payments</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Pending Fees</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">${totalPending.toLocaleString()}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Outstanding active invoices</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Overdue Fees</p>
          <p className="mt-1 text-3xl font-bold text-rose-600">${totalOverdue.toLocaleString()}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Past scheduled due date</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Net Cashflow</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">${netBalance.toLocaleString()}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Revenue minus recorded expenses</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent Payments */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
            <h3 className="font-bold text-aec-navy text-base">Recent Fee Payments</h3>
            <Link href="/finance/payments" className="text-xs font-medium text-aec-blue hover:underline">
              View All Payments &rarr;
            </Link>
          </div>

          {payments.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">No payments recorded yet.</p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {payments.map((p) => (
                <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-aec-navy">{p.invoice.student.user.name}</p>
                    <p className="text-aec-navy/50">
                      Method: <span className="uppercase">{p.method}</span> &bull; {p.paidAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600">+${Number(p.amount).toFixed(2)}</span>
                    <p className="text-[10px] text-aec-navy/40">{p.reference || "Invoice Settled"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Student Balances & Quick Links */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
              Billing Modules
            </h3>
            <div className="mt-3 space-y-2">
              <Link
                href="/finance/invoices"
                className="block rounded bg-aec-navy/5 p-2.5 hover:bg-aec-navy/10 transition-colors"
              >
                <p className="text-xs font-semibold text-aec-navy">Student Invoices</p>
                <p className="text-[11px] text-aec-navy/60">Generate monthly & course tuition bills</p>
              </Link>
              <Link
                href="/finance/payments"
                className="block rounded bg-aec-navy/5 p-2.5 hover:bg-aec-navy/10 transition-colors"
              >
                <p className="text-xs font-semibold text-aec-navy">Receipts & Refunds</p>
                <p className="text-[11px] text-aec-navy/60">Log offline payments & process refunds</p>
              </Link>
              <Link
                href="/finance/reports"
                className="block rounded bg-aec-navy/5 p-2.5 hover:bg-aec-navy/10 transition-colors"
              >
                <p className="text-xs font-semibold text-aec-navy">Financial Statements</p>
                <p className="text-[11px] text-aec-navy/60">Daily, monthly & annual collection reports</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
