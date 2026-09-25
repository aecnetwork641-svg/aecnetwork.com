import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "./_nav";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export default async function FinanceDashboard() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "FINANCE", "FINANCE_MANAGER", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

  let invoices: any[] = [];
  let payments: any[] = [];
  let expenses: any[] = [];

  try {
    const [inv, pay, exp] = await Promise.all([
      prisma.invoice.findMany({
        include: { student: { include: { user: true } } },
        orderBy: { issuedAt: "desc" }
      }),
      prisma.payment.findMany({
        include: { invoice: { include: { student: { include: { user: true } } } } },
        orderBy: { paidAt: "desc" },
        take: 10
      }),
      prisma.expense.findMany({
        orderBy: { date: "desc" }
      })
    ]);
    invoices = inv;
    payments = pay;
    expenses = exp;
  } catch (err) {
    console.error("[FINANCE_DASHBOARD_QUERY_ERROR]", err);
  }

  const totalCollected = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const totalPending = invoices.filter((i) => i.status === "unpaid").reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const netOperating = totalCollected - totalExpenses;

  const stats = [
    { label: "Total Revenue Collected", value: `$${totalCollected.toLocaleString()}`, desc: `${payments.length} Payments recorded` },
    { label: "Pending Dues", value: `$${totalPending.toLocaleString()}`, desc: `${invoices.filter((i) => i.status === "unpaid").length} Invoices pending` },
    { label: "Operating Expenses", value: `$${totalExpenses.toLocaleString()}`, desc: `${expenses.length} Recorded outflows` },
    { label: "Net Operating Margin", value: `$${netOperating.toLocaleString()}`, desc: "Collections minus expenses" },
  ];

  return (
    <PortalShell role="Finance & Billing" navItems={FINANCE_NAV} title="Financial Overview & Tuition Accounts">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-aec-gold uppercase tracking-wider">Treasury & Accounts</span>
            <h2 className="font-display text-2xl font-bold mt-0.5">AEC Tuition & Financial Ledger</h2>
            <p className="text-xs text-white/70 mt-1">
              Active Invoices: <strong className="text-white">{invoices.length} Total</strong> • Real-time Billing & Payment Tracking
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/finance/invoices" className="rounded-xl bg-aec-gold text-aec-navy font-bold text-xs px-4 py-2 hover:bg-aec-gold/90 transition shadow">
              Manage Invoices
            </Link>
            <Link href="/finance/payments" className="rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs px-4 py-2 hover:bg-white/20 transition">
              Record Payment
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((s, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">{s.label}</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{s.value}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Recent Transactions Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Recent Settled Tuition Payments</h3>
          <Link href="/finance/payments" className="text-xs font-semibold text-aec-navy hover:underline">
            View All &rarr;
          </Link>
        </div>

        {payments.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No payments recorded yet. Record incoming tuition transactions from the billing portal.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Payment ID</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-aec-navy">{p.id.slice(-8)}</td>
                    <td className="p-3 font-semibold text-slate-900">{p.invoice?.student?.user?.name || "Student"}</td>
                    <td className="p-3 font-black text-slate-900">${Number(p.amount).toFixed(2)}</td>
                    <td className="p-3 text-slate-600 capitalize">{p.method.replace("_", " ")}</td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">{p.reference || "Direct"}</td>
                    <td className="p-3 text-slate-500">{new Date(p.paidAt).toLocaleDateString()}</td>
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
