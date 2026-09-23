"use client";

import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "../_nav";

export default function FinanceExpensesPage() {
  const expenses = [
    { title: "September Faculty Payroll & Instructor Payouts", category: "Faculty Payroll", amount: "$2,650.00", date: "Sept 01, 2026", status: "Processed" },
    { title: "Video Infrastructure & Cloud Server Hosting (Vercel/Supabase)", category: "Technology", amount: "$380.00", date: "Sept 03, 2026", status: "Paid" },
    { title: "Curriculum Material Printing & Digital Licenses", category: "Academics", amount: "$240.00", date: "Sept 08, 2026", status: "Paid" },
    { title: "Global Student Admissions Marketing & Outreach", category: "Admissions", amount: "$180.00", date: "Sept 12, 2026", status: "Paid" },
  ];

  return (
    <PortalShell role="Finance & Billing" navItems={FINANCE_NAV} title="Operational Expenses & Outflows">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Institutional Operational Outflows (September 2026)</h3>
          <button onClick={() => {}} className="btn-primary text-xs px-3 py-1.5">
            + Log Expense
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {expenses.map((exp, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {exp.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{exp.title}</h4>
                <p className="text-[11px] text-slate-400">Date: {exp.date}</p>
              </div>

              <div className="sm:text-right">
                <span className="text-sm font-black text-rose-600">{exp.amount}</span>
                <span className="block text-[10px] text-slate-500 font-semibold uppercase">{exp.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
