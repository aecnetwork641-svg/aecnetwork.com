import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "./_nav";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HRDashboardPage() {
  const [
    totalEmployees,
    departments,
    pendingLeaves,
    recentLeaves,
    todayAttendance
  ] = await Promise.all([
    prisma.employee.count(),
    prisma.department.findMany({ include: { employees: true } }),
    prisma.leaveRequest.count({ where: { status: "pending" } }),
    prisma.leaveRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        employee: { include: { user: true, department: true } },
        leaveType: true
      }
    }),
    prisma.staffAttendance.findMany({
      take: 10,
      orderBy: { date: "desc" },
      include: { employee: { include: { user: true } } }
    })
  ]);

  return (
    <PortalShell role="HR Management Portal" navItems={HR_NAV} title="Human Resources Overview">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Total Staff</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalEmployees}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Registered faculty & operations</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Departments</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{departments.length}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Operational business units</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Pending Leaves</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">{pendingLeaves}</p>
          <p className="mt-1 text-xs text-aec-navy/60">Awaiting supervisor / HR action</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">Staff Attendance</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">Active</p>
          <p className="mt-1 text-xs text-aec-navy/60">Real-time daily logging</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Pending Leave Approvals */}
        <div className="card">
          <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
            <h3 className="font-bold text-aec-navy text-base">Recent Leave Requests</h3>
            <Link href="/hr/leave" className="text-xs font-medium text-aec-blue hover:underline">
              Process Leaves &rarr;
            </Link>
          </div>

          {recentLeaves.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">No leave requests logged.</p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {recentLeaves.map((l) => (
                <div key={l.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-aec-navy">{l.employee.user.name}</p>
                    <p className="text-aec-navy/50">
                      {l.leaveType?.name ?? "Leave"} &bull; {l.startDate.toLocaleDateString()} to {l.endDate.toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`rounded px-2 py-0.5 capitalize font-semibold ${
                      l.status === "approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : l.status === "rejected"
                        ? "bg-rose-50 text-rose-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {l.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Department Headcounts */}
        <div className="card">
          <h3 className="font-bold text-aec-navy text-base border-b border-aec-navy/10 pb-3">
            Department Allocation
          </h3>
          {departments.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">No departments configured.</p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {departments.map((d) => (
                <div key={d.id} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-aec-navy">{d.name}</span>
                  <span className="rounded bg-aec-navy/5 px-2.5 py-0.5 font-medium text-aec-navy">
                    {d.employees.length} Staff
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  );
}
