import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "./_nav";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export default async function HRDashboard() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "HR", "HR_MANAGER", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

  let employees: any[] = [];
  let departments: any[] = [];
  let leaveRequests: any[] = [];
  let payslips: any[] = [];
  let todayStaffAtt: any[] = [];

  try {
    const [emp, dep, lReq, pSl, tAtt] = await Promise.all([
      prisma.employee.findMany({
        include: { user: true, department: true },
        orderBy: { hiredAt: "desc" }
      }),
      prisma.department.findMany(),
      prisma.leaveRequest.findMany({
        include: { employee: { include: { user: true } }, leaveType: true },
        orderBy: { createdAt: "desc" },
        take: 10
      }),
      prisma.payslip.findMany({
        orderBy: { issuedAt: "desc" }
      }),
      prisma.staffAttendance.findMany({
        where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }
      })
    ]);
    employees = emp;
    departments = dep;
    leaveRequests = lReq;
    payslips = pSl;
    todayStaffAtt = tAtt;
  } catch (err) {
    console.error("[HR_DASHBOARD_QUERY_ERROR]", err);
  }

  const pendingLeaves = leaveRequests.filter((l) => l.status === "pending");
  const presentStaffCount = todayStaffAtt.filter((a) => a.status === "present").length;

  const stats = [
    { label: "Active Faculty & Staff", value: `${employees.length} Personnel`, desc: `${departments.length} Departments` },
    { label: "Staff Attendance (Today)", value: todayStaffAtt.length > 0 ? `${presentStaffCount} Present` : "Logged On Check-in", desc: "Faculty attendance" },
    { label: "Pending Leave Requests", value: `${pendingLeaves.length} Requests`, desc: "Awaiting HR sign-off" },
    { label: "Payroll Records", value: `${payslips.length} Payslips`, desc: "Compensation registers" },
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
              Active Headcount: <strong className="text-white">{employees.length} Personnel</strong> • Departmental Oversight & Leave Governance
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/hr/employees" className="rounded-xl bg-aec-gold text-aec-navy font-bold text-xs px-4 py-2 hover:bg-aec-gold/90 transition shadow">
              Faculty Directory
            </Link>
            <Link href="/hr/leave" className="rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs px-4 py-2 hover:bg-white/20 transition">
              Leave Requests ({pendingLeaves.length})
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
          <h3 className="font-display text-sm font-bold text-slate-900">Faculty & Staff Leave Requests</h3>
          <Link href="/hr/leave" className="text-xs font-semibold text-aec-navy hover:underline">
            All Requests &rarr;
          </Link>
        </div>

        {leaveRequests.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No leave requests submitted yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {leaveRequests.map((lr) => (
              <div key={lr.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{lr.employee.user.name}</span>
                    <span className="text-[10px] text-slate-500 font-medium">({lr.employee.position})</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {lr.leaveType?.name ?? "Leave"} • {new Date(lr.startDate).toLocaleDateString()} to {new Date(lr.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-[11px] text-slate-400 italic mt-0.5">Reason: &ldquo;{lr.reason}&rdquo;</p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                      lr.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : lr.status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {lr.status}
                  </span>
                  <Link href="/hr/leave" className="btn-secondary text-xs px-3 py-1">
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
