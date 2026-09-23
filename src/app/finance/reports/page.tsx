import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "../_nav";

export default function FinanceReportsPage() {
  const statements = [
    { title: "Profit & Loss Summary (Q3 2026)", revenue: "$28,450.00", expenses: "$10,240.00", netIncome: "$18,210.00", margin: "64.0%" },
    { title: "Monthly Performance (September 2026)", revenue: "$9,620.00", expenses: "$3,450.00", netIncome: "$6,170.00", margin: "64.1%" },
  ];

  return (
    <PortalShell role="Finance & Billing" navItems={FINANCE_NAV} title="Financial Statements & Revenue Reports">
      <div className="space-y-6">
        {statements.map((st, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-slate-900 mb-4">{st.title}</h3>
            <div className="grid gap-4 sm:grid-cols-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Gross Inflow:</span>
                <span className="font-bold text-slate-900 block text-sm mt-0.5">{st.revenue}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Expenses:</span>
                <span className="font-bold text-rose-600 block text-sm mt-0.5">{st.expenses}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Net Operating Income:</span>
                <span className="font-bold text-emerald-600 block text-sm mt-0.5">{st.netIncome}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Profit Margin:</span>
                <span className="font-bold text-aec-navy block text-sm mt-0.5">{st.margin}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
