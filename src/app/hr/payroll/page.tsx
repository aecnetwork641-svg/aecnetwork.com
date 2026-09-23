"use client";

import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "../_nav";

export default function HRPayrollPage() {
  const payslips = [
    { id: "PAY-2026-SEP-09", employee: "Ustadh Muhammad Qasim", hoursTaught: "48 Hours", gross: "$960.00", net: "$960.00", status: "Settled", date: "Sept 01, 2026" },
    { id: "PAY-2026-SEP-12", employee: "Ustadh Tariq Al-Mansoor", hoursTaught: "36 Hours", gross: "$720.00", net: "$720.00", status: "Settled", date: "Sept 01, 2026" },
    { id: "PAY-2026-SEP-15", employee: "Ustaza Maryam Bint Bilal", hoursTaught: "32 Hours", gross: "$640.00", net: "$640.00", status: "Settled", date: "Sept 01, 2026" },
    { id: "PAY-2026-SEP-18", employee: "Sister Amina Siddiqui", hoursTaught: "28 Hours", gross: "$560.00", net: "$560.00", status: "Settled", date: "Sept 01, 2026" },
  ];

  return (
    <PortalShell role="HR & Payroll" navItems={HR_NAV} title="Faculty Compensation & Payroll Ledger">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">September 2026 Faculty Payroll Register</h3>
          <button onClick={() => {}} className="btn-primary text-xs px-3 py-1.5">
            + Run Payroll Cycle
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Payslip ID</th>
                <th className="p-3">Faculty Member</th>
                <th className="p-3">Teaching Hours</th>
                <th className="p-3">Net Compensation</th>
                <th className="p-3">Status</th>
                <th className="p-3">Disbursed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {payslips.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-aec-navy">{p.id}</td>
                  <td className="p-3 font-bold text-slate-900">{p.employee}</td>
                  <td className="p-3 text-slate-600">{p.hoursTaught}</td>
                  <td className="p-3 font-black text-emerald-600">{p.net}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
