import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { SUPERVISOR_NAV } from "./_nav";
import { getCurrentSupervisorScope } from "@/lib/scoped-queries";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function SupervisorDashboardPage() {
  const scope = await getCurrentSupervisorScope();
  if (!scope?.supervisorId) {
    redirect("/login?error=AccessDenied");
  }

  const departmentId = scope.departmentId;
  const departmentName = scope.department?.name || "Supervised Department";

  const [teamEmployees, pendingLeaves, departmentClasses] = await Promise.all([
    prisma.employee.findMany({
      where: { departmentId },
      include: {
        user: true,
        staffAttendances: { take: 1, orderBy: { date: "desc" } }
      }
    }),
    prisma.leaveRequest.findMany({
      where: {
        employee: { departmentId },
        supervisorStatus: "pending"
      },
      include: {
        employee: { include: { user: true } },
        leaveType: true
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.class.findMany({
      where: {
        teacher: { user: { employee: { departmentId } } }
      },
      include: {
        teacher: { include: { user: true } },
        course: true,
        enrollments: true
      },
      take: 8
    })
  ]);

  return (
    <PortalShell role="Supervisor Portal" navItems={SUPERVISOR_NAV} title="Department Supervisor Dashboard">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Academic Quality & Faculty Supervision</h2>
          <p className="text-sm text-slate-600">
            Supervisory oversight for <span className="font-semibold text-aec-navy">{departmentName}</span>.
          </p>
        </div>
        <ScopedDataNote text="Departmental Scope: Real-time oversight of assigned faculty, classroom cohorts, and leave approvals." />
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card border-l-4 border-l-aec-navy">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Supervised Faculty</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{teamEmployees.length}</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Active departmental staff</p>
        </div>
        <div className="card border-l-4 border-l-amber-500">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pending Leave Approvals</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">{pendingLeaves.length}</p>
          <p className="mt-1 text-xs text-amber-600 font-medium">Awaiting supervisor endorsement</p>
        </div>
        <div className="card border-l-4 border-l-aec-gold">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Supervised Classes</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{departmentClasses.length}</p>
          <p className="mt-1 text-xs text-slate-500">Department class cohorts</p>
        </div>
        <div className="card border-l-4 border-l-emerald-500">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quality Status</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">Active</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Standards compliant</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Supervised Team Members */}
        <div id="team" className="card">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Department Faculty Members</h3>
            <span className="text-xs font-medium text-slate-500">{teamEmployees.length} Staff</span>
          </div>

          {teamEmployees.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No faculty members currently assigned to your department.</p>
          ) : (
            <div className="mt-3 divide-y divide-slate-100">
              {teamEmployees.map((emp) => (
                <div key={emp.id} className="py-3 flex items-center justify-between text-xs hover:bg-slate-50/50 px-2 rounded transition">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 text-sm">{emp.user.name}</p>
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 capitalize">
                        {emp.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">{emp.position}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Code: {emp.employeeCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-700">Leave Balance: {emp.annualLeaveBal}d</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team Leave Requests for Supervisor Approval */}
        <div id="leave" className="card">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Leave Requests Pending Review</h3>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
              {pendingLeaves.length} Action Needed
            </span>
          </div>

          {pendingLeaves.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No pending leave requests requiring endorsement.</p>
          ) : (
            <div className="mt-3 divide-y divide-slate-100">
              {pendingLeaves.map((l) => (
                <div key={l.id} className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{l.employee.user.name}</p>
                    <p className="text-slate-600 font-medium mt-0.5">
                      <span className="font-bold text-amber-700">{l.leaveType?.name ?? "Leave"}</span> &bull; {new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-[11px] text-slate-600 italic mt-1 bg-slate-50 p-2 rounded border border-slate-100">
                      &ldquo;{l.reason}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Classroom Observations & Department Sessions */}
      <div id="classes" className="mt-8 card">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Department Class Cohorts</h3>
            <p className="text-xs text-slate-500">Live classroom monitoring and curriculum pacing checks</p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-semibold">
            Department Scope
          </span>
        </div>

        {departmentClasses.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No active class cohorts in this department.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departmentClasses.map((c) => (
              <div key={c.id} className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                    {c.status}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-2">{c.name}</h4>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{c.course.title}</p>
                  <p className="text-xs text-slate-500 mt-1">Teacher: {c.teacher.user.name}</p>
                  <p className="text-xs text-slate-500">Enrolled: {c.enrollments.length} students</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
