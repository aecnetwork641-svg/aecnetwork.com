"use client";

import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "../_nav";

export default function FinanceInvoicesPage() {
  const invoices = [
    { id: "INV-2026-SEP-01", student: "Abdullah Akbar & Fatima Akbar", amount: "$110.00", dueDate: "Sept 10, 2026", status: "Paid", paidAt: "Sept 05, 2026" },
    { id: "INV-2026-SEP-02", student: "Zaid Bin Tariq", amount: "$65.00", dueDate: "Sept 10, 2026", status: "Paid", paidAt: "Sept 05, 2026" },
    { id: "INV-2026-SEP-03", student: "Hamza Farooq", amount: "$75.00", dueDate: "Sept 10, 2026", status: "Paid", paidAt: "Sept 04, 2026" },
    { id: "INV-2026-SEP-04", student: "Ibrahim Malik (UK)", amount: "$95.00", dueDate: "Sept 10, 2026", status: "Paid", paidAt: "Sept 03, 2026" },
    { id: "INV-2026-SEP-05", student: "Sarah Al-Ghamdi (UAE)", amount: "$65.00", dueDate: "Sept 10, 2026", status: "Pending", paidAt: "—" },
  ];

  return (
    <PortalShell role="Finance & Billing" navItems={FINANCE_NAV} title="Tuition Invoices Management">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">September 2026 Tuition Billing Register</h3>
          <button onClick={() => {}} className="btn-primary text-xs px-3 py-1.5">
            + Generate Monthly Invoices
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Invoice Number</th>
                <th className="p-3">Family / Student</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Payment Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-aec-navy">{inv.id}</td>
                  <td className="p-3 font-semibold text-slate-900">{inv.student}</td>
                  <td className="p-3 font-black text-slate-900">{inv.amount}</td>
                  <td className="p-3 text-slate-500">{inv.dueDate}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => {}} className="text-aec-navy font-bold hover:underline">
                      View PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
