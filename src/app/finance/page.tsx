import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "./_nav";

export default function FinanceDashboard() {
  const stats = [
    { label: "Total Revenue (MTD)", value: "$9,620.00", desc: "+12.4% vs last month" },
    { label: "Collected Tuition", value: "$9,490.00", desc: "98.6% Collection Rate" },
    { label: "Pending Invoices", value: "$130.00", desc: "2 Invoices Pending" },
    { label: "Operating Expenses", value: "$3,450.00", desc: "Faculty Payroll & Tech" },
  ];

  const recentTransactions = [
    { id: "TXN-8891", student: "Muhammad Akbar (for Abdullah & Fatima)", amount: "$110.00", method: "Bank Transfer", status: "Settled", date: "Sept 05, 2026" },
    { id: "TXN-8890", student: "Tariq Mehmood (for Zaid)", amount: "$65.00", method: "Card Online", status: "Settled", date: "Sept 05, 2026" },
    { id: "TXN-8889", student: "Farooq Ahmed (for Hamza)", amount: "$75.00", method: "Bank Transfer", status: "Settled", date: "Sept 04, 2026" },
    { id: "TXN-8888", student: "Malik Family (UK)", amount: "$95.00", method: "Stripe International", status: "Settled", date: "Sept 03, 2026" },
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
              Billing Cycle: <strong className="text-white">September 2026</strong> • Net Margin: <span className="text-emerald-400 font-bold">+64.1%</span>
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/finance/invoices" className="rounded-xl bg-aec-gold text-aec-navy font-bold text-xs px-4 py-2 hover:bg-aec-gold/90 transition shadow">
              Create Invoice
            </Link>
            <Link href="/finance/reports" className="rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs px-4 py-2 hover:bg-white/20 transition">
              Financial Reports
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

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Receipt / Txn ID</th>
                <th className="p-3">Parent / Student</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-aec-navy">{t.id}</td>
                  <td className="p-3 font-semibold text-slate-900">{t.student}</td>
                  <td className="p-3 font-black text-slate-900">{t.amount}</td>
                  <td className="p-3 text-slate-600">{t.method}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
