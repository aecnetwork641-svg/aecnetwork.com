import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_INVOICES } from "@/lib/student-demo-data";

export default function StudentPaymentsPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Payment Records & Gateway Logs">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-2">Verified Payment Transactions</h2>
        <p className="text-xs text-slate-500">
          All transactions are processed securely through bank transfer and digital gateways with official confirmation slips.
        </p>

        <div className="mt-6 space-y-3">
          {DEMO_INVOICES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-slate-800">{item.id}</span>
                <p className="text-xs font-semibold text-slate-900 mt-0.5">{item.title}</p>
                <p className="text-[11px] text-slate-500">Processed: {item.paidDate} • Method: {item.method}</p>
              </div>

              <div className="sm:text-right">
                <span className="text-sm font-bold text-emerald-600 block">{item.amount}</span>
                <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                  Settled Successfully
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
