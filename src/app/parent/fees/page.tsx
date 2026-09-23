import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { DEMO_PARENT_INVOICES } from "@/lib/parent-demo-data";

export default function ParentFeesPage() {
  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Family Tuition & Invoices">
      {/* Account Balance */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase text-emerald-800">Family Account Billing</span>
          <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">Outstanding Balance: $0.00</h2>
          <p className="text-xs text-slate-600 mt-1">
            All child tuition fees for the active month are paid. Next cycle invoice generates on <strong>October 01, 2026</strong>.
          </p>
        </div>

        <a
          href="https://wa.me/923435999397"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-aec-navy text-white px-5 py-2.5 text-xs font-bold hover:bg-aec-navy/90 transition shadow-sm text-center"
        >
          Billing Support (WhatsApp)
        </a>
      </div>

      {/* Invoices */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Paid Invoices & Payment Slips</h3>
          <span className="text-xs text-slate-500">Official Receipts</span>
        </div>

        <div className="divide-y divide-slate-100">
          {DEMO_PARENT_INVOICES.map((inv) => (
            <div key={inv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-aec-navy">{inv.id}</span>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                    {inv.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{inv.childName} — {inv.month}</h4>
                <p className="text-[11px] text-slate-500">Paid on: {inv.paidDate} via {inv.method}</p>
              </div>

              <div className="sm:text-right">
                <span className="text-sm font-bold text-slate-900">{inv.tuitionFee}</span>
                <span className="text-xs text-slate-500 block">({inv.pkrAmount})</span>
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
