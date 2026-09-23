"use client";

import { useState } from "react";
import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "../_nav";

export default function HRLeavePage() {
  const [leaves, setLeaves] = useState([
    { id: "LR-101", employee: "Sister Amina Siddiqui", role: "English Faculty", type: "Casual Leave (1 Day)", date: "Sept 25, 2026", reason: "Personal family commitment", status: "Pending" },
    { id: "LR-100", employee: "Sheikh Bilal", role: "Islamic Studies Lead", type: "Emergency Leave", date: "Sept 12, 2026", reason: "Medical appointment", status: "Approved" },
    { id: "LR-099", employee: "Ustadh Tariq Al-Mansoor", role: "Arabic Faculty", type: "Annual Leave (3 Days)", date: "Aug 15 - Aug 18, 2026", reason: "Summer vacation", status: "Approved" },
  ]);

  const handleApprove = (id: string) => {
    setLeaves(leaves.map((l) => (l.id === id ? { ...l, status: "Approved" } : l)));
  };

  return (
    <PortalShell role="HR & Payroll" navItems={HR_NAV} title="Leave Applications & Approvals">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Faculty Leave Applications</h3>
          <span className="text-xs text-slate-500">Tier-2 HR Governance</span>
        </div>

        <div className="divide-y divide-slate-100">
          {leaves.map((item) => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-aec-navy">{item.id}</span>
                  <h4 className="text-xs font-bold text-slate-900">{item.employee}</h4>
                  <span className="text-[10px] text-slate-400">({item.role})</span>
                </div>
                <p className="text-xs text-slate-700 mt-1"><strong>{item.type}</strong> • Date: {item.date}</p>
                <p className="text-[11px] text-slate-500 italic mt-0.5">Reason: &ldquo;{item.reason}&rdquo;</p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.status === "Pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {item.status}
                </span>
                {item.status === "Pending" && (
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="btn-primary text-xs px-3 py-1"
                  >
                    Approve Leave
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
