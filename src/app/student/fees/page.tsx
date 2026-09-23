import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_INVOICES } from "@/lib/student-demo-data";

export default function StudentFeesPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Tuition Fees & Invoices">
      {/* Current Balance Banner */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Account Status</span>
          <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">Outstanding Balance: $0.00</h2>
          <p className="text-xs text-slate-600 mt-1">
            All current term tuition invoices are paid. Next invoice cycle will generate on <strong>October 01, 2026</strong>.
          </p>
        </div>

        <Link
          href="/student/payments"
          className="rounded-xl bg-aec-navy text-white px-5 py-2.5 text-xs font-bold hover:bg-aec-navy/90 transition shadow-sm text-center"
        >
          View Payment History
        </Link>
      </div>

      {/* Invoices List */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Billing & Invoice Records</h3>
          <span className="text-xs text-slate-500">Auto-generated monthly</span>
        </div>

        <div className="divide-y divide-slate-100">
          {DEMO_INVOICES.map((inv) => (
            <div key={inv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-aec-navy">{inv.id}</span>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                    {inv.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{inv.title}</h4>
                <p className="text-[11px] text-slate-500">Paid on: {inv.paidDate} via {inv.method}</p>
              </div>

              <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900">{inv.amount}</span>
                  <span className="text-xs text-slate-500 block">({inv.pkrAmount})</span>
                </div>
                <button
                  onClick={() => {}}
                  className="mt-1 text-xs font-semibold text-aec-navy hover:underline"
                >
                  Download Receipt PDF &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
