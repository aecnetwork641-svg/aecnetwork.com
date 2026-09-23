"use client";

import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "./_nav";

export default function HRDashboard() {
  const stats = [
    { label: "Active Faculty & Staff", value: "28 Staff", desc: "24 Teachers • 4 Admin" },
    { label: "Staff Attendance (Today)", value: "100%", desc: "All checked in" },
    { label: "Pending Leave Requests", value: "1 Request", desc: "Awaiting approval" },
    { label: "Monthly Payroll Status", value: "Processed", desc: "September settled" },
  ];

  const recentLeaveRequests = [
    { id: "LR-101", employee: "Sister Amina Siddiqui", role: "English Faculty", type: "Casual Leave (1 Day)", date: "Sept 25, 2026", status: "Pending HR Approval" },
    { id: "LR-100", employee: "Sheikh Bilal", role: "Islamic Studies Faculty", type: "Emergency Leave", date: "Sept 12, 2026", status: "Approved" },
  ];

  return (
    <PortalShell role="HR & Payroll" navItems={HR_NAV} title="Human Resources & Faculty Management">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-aec-gold uppercase tracking-wider">Faculty Affairs & People Ops</span>
            <h2 className="font-display text-2xl font-bold mt-0.5">AEC Faculty HR & Compensation</h2>
            <p className="text-xs text-white/70 mt-1">
              Active Headcount: <strong className="text-white">28 Personnel</strong> • Certified Al-Azhar & Masters Faculty
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/hr/employees" className="rounded-xl bg-aec-gold text-aec-navy font-bold text-xs px-4 py-2 hover:bg-aec-gold/90 transition shadow">
              Faculty Directory
            </Link>
            <Link href="/hr/payroll" className="rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs px-4 py-2 hover:bg-white/20 transition">
              Payroll Register
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
            <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Leave Requests Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Faculty Leave Requests</h3>
          <Link href="/hr/leave" className="text-xs font-semibold text-aec-navy hover:underline">
            All Requests &rarr;
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recentLeaveRequests.map((lr) => (
            <div key={lr.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{lr.employee}</span>
                  <span className="text-[10px] text-slate-500 font-medium">({lr.role})</span>
                </div>
                <p className="text-xs text-aec-navy font-medium mt-0.5">{lr.type} • Date: {lr.date}</p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    lr.status.includes("Pending")
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {lr.status}
                </span>
                {lr.status.includes("Pending") && (
                  <button onClick={() => {}} className="btn-primary text-xs px-3 py-1">
                    Approve
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
