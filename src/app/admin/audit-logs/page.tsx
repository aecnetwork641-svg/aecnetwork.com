import PortalShell from "@/components/PortalShell";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { redirect } from "next/navigation";
import { isOneOf } from "@/lib/permissions";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Students", href: "/admin/students" },
  { label: "Teachers", href: "/admin/teachers" },
  { label: "Academics", href: "/admin/academics" },
  { label: "Admissions", href: "/admin/admissions" },
  { label: "Finance", href: "/admin/finance" },
  { label: "HR", href: "/admin/hr" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Communication", href: "/admin/communication" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Audit Logs", href: "/admin/audit-logs" }
];

export default async function AdminAuditLogsPage() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

  const logs = await prisma.auditLog.findMany({
    include: { actor: true },
    orderBy: { timestamp: "desc" },
    take: 100
  });

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="System Security & Audit Trail">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Immutable logs of critical staff actions: profile creation, grade entries, fee clearing, and role management.
        </p>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          {logs.length} Audited Events
        </span>
      </div>

      <div className="card mt-6">
        {logs.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm font-bold text-slate-700">No audit logs recorded yet</p>
            <p className="text-xs text-slate-500 mt-1">Actions taken by staff across portals will automatically appear in this immutable trail.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase">
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Actor</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Entity</th>
                  <th className="py-3 px-3">Entity ID</th>
                  <th className="py-3 px-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-3 text-slate-600">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{log.actor?.name || "System"}</td>
                    <td className="py-2.5 px-3">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-bold uppercase text-[10px] text-slate-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{log.entity}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{log.entityId}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">{log.ipAddress || "Internal"}</td>
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
