import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { SUPERVISOR_NAV } from "./_nav";
import { getCurrentSupervisorScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function SupervisorDashboardPage() {
  const scope = await getCurrentSupervisorScope();

  // Scoped to supervisor's department
  const departmentId = scope?.departmentId;

  const teamEmployees = departmentId
    ? await prisma.employee.findMany({
        where: { departmentId },
        include: {
          user: true,
          staffAttendances: { take: 1, orderBy: { date: "desc" } },
          leaveRequests: { where: { supervisorStatus: "pending" } }
        }
      })
    : [];

  const teamEmployeeIds = teamEmployees.map((e) => e.id);

  // Leave requests from team members
  const pendingLeaves = await prisma.leaveRequest.findMany({
    where: {
      employeeId: { in: teamEmployeeIds },
      supervisorStatus: "pending"
    },
    include: {
      employee: { include: { user: true } },
      leaveType: true
    }
  });

  // Department classes
  const classes = await prisma.class.findMany({
    take: 6,
    include: {
      teacher: { include: { user: true } },
      course: true,
      enrollments: true
    }
  });

  return (
    <PortalShell role="Supervisor Portal" navItems={SUPERVISOR_NAV} title="Department Supervisor Dashboard">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-aec-navy/70">
            Supervisory oversight for <span className="font-semibold text-aec-navy">{scope?.department?.name || "Assigned Department"}</span>.
          </p>
        </div>
        <ScopedDataNote text="Strict scoping: You can only view team members and classes under your supervision." />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Supervised Team</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{teamEmployees.length}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Active department staff</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Pending Leaves</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">{pendingLeaves.length}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Awaiting your sign-off</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Active Cohorts</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{classes.length}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Department class sections</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Team Status</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">Operational</p>
          <p className="mt-1 text-xs text-aec-navy/60">No open escalations</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Supervised Team Members */}
        <div id="team" className="card">
          <h3 className="font-bold text-aec-navy text-base border-b border-aec-navy/10 pb-3">
            Department Team Members
          </h3>
          {teamEmployees.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">
              No staff members registered in your department.
            </p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {teamEmployees.map((emp) => (
                <div key={emp.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-aec-navy">{emp.user.name}</p>
                    <p className="text-aec-navy/50">{emp.position}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                      {emp.status}
                    </span>
                    <p className="text-[10px] text-aec-navy/50 mt-0.5">
                      Bal: {emp.annualLeaveBal}d AL
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team Leave Requests for Supervisor Approval */}
        <div id="leave" className="card">
          <h3 className="font-bold text-aec-navy text-base border-b border-aec-navy/10 pb-3">
            Leave Requests Requiring Supervisor Review
          </h3>
          {pendingLeaves.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">
              No pending leave requests from your team.
            </p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {pendingLeaves.map((l) => (
                <div key={l.id} className="py-3 flex items-start justify-between text-xs">
                  <div>
                    <p className="font-semibold text-aec-navy">{l.employee.user.name}</p>
                    <p className="text-aec-navy/60">
                      {l.leaveType?.name ?? "Leave"}: {l.startDate.toLocaleDateString()} &mdash; {l.endDate.toLocaleDateString()}
                    </p>
                    <p className="text-[11px] text-aec-navy/50 italic mt-0.5 max-w-xs truncate">
                      &quot;{l.reason}&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2">
                    <button
                      type="button"
                      className="rounded bg-emerald-600 px-2.5 py-1 font-semibold text-white hover:bg-emerald-700"
                    >
                      Endorse
                    </button>
                    <button
                      type="button"
                      className="rounded bg-rose-50 px-2.5 py-1 font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  );
}
