import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "../_nav";

export default function FinancePaymentsPage() {
  const methods = [
    { method: "Direct Bank Transfer (PKR & USD Accounts)", volume: "$5,420.00", share: "56.3%", status: "Reconciled" },
    { method: "Online Credit / Debit Card (Stripe)", volume: "$3,250.00", share: "33.8%", status: "Instant Settlement" },
    { method: "JazzCash / EasyPaisa (Direct Portal)", volume: "$950.00", share: "9.9%", status: "Auto-Verified" },
  ];

  return (
    <PortalShell role="Finance & Billing" navItems={FINANCE_NAV} title="Payment Reconciliation & Gateways">
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {methods.map((m, idx) => (
          <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <span className="text-xs font-semibold uppercase text-slate-500">{m.method}</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{m.volume}</p>
            <p className="text-xs text-emerald-600 font-semibold mt-0.5">{m.share} of total • {m.status}</p>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
