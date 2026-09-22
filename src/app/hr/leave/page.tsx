import PortalShell from "@/components/PortalShell";
import { HR_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function HRLeavePage() {
  const requests = await prisma.leaveRequest.findMany({
    include: {
      employee: { include: { user: true, department: true } },
      leaveType: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <PortalShell role="HR Management Portal" navItems={HR_NAV} title="Leave Management Pipeline">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Process staff leave applications: Employee &rarr; Supervisor Review &rarr; HR Final Approval.
        </p>
      </div>

      <div className="card mt-6">
        {requests.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No leave requests currently on file.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Employee</th>
                  <th className="py-3 px-2">Leave Type</th>
                  <th className="py-3 px-2">Duration</th>
                  <th className="py-3 px-2">Reason</th>
                  <th className="py-3 px-2">Supervisor</th>
                  <th className="py-3 px-2">HR Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-aec-navy/[0.02]">
                    <td className="py-3 px-2">
                      <p className="font-semibold text-aec-navy">{req.employee.user.name}</p>
                      <p className="text-xs text-aec-navy/50">{req.employee.department?.name || "Faculty"}</p>
                    </td>
                    <td className="py-3 px-2 text-xs font-medium text-aec-navy">
                      {req.leaveType?.name ?? "Annual Leave"}
                    </td>
                    <td className="py-3 px-2 text-xs text-aec-navy/70">
                      {req.startDate.toLocaleDateString()} &mdash; {req.endDate.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 text-xs text-aec-navy/80 max-w-xs truncate">
                      {req.reason}
                    </td>
                    <td className="py-3 px-2 text-xs">
                      <span
                        className={`rounded px-2 py-0.5 capitalize font-semibold ${
                          req.supervisorStatus === "approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : req.supervisorStatus === "rejected"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {req.supervisorStatus}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-xs">
                      <span
                        className={`rounded px-2 py-0.5 capitalize font-semibold ${
                          req.status === "approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : req.status === "rejected"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          className="rounded bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="rounded bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
