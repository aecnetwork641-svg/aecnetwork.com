import PortalShell from "@/components/PortalShell";
import { prisma } from "@/lib/prisma";

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
  const logs = await prisma.auditLog.findMany({
    include: { actor: true },
    orderBy: { timestamp: "desc" },
    take: 50
  });

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="System Security & Audit Trail">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Immutable logs of critical staff actions: profile updates, grade entries, fee modifications, and role grants.
        </p>
        <span className="rounded bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
          Security Audited
        </span>
      </div>

      <div className="card mt-6">
        {logs.length === 0 ? (
          <div className="py-12 text-center text-sm text-aec-navy/50">
            No administrative audit events recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-aec-navy/10 text-aec-navy/50 uppercase">
                  <th className="py-2.5 px-2">Timestamp</th>
                  <th className="py-2.5 px-2">Actor</th>
                  <th className="py-2.5 px-2">Action</th>
                  <th className="py-2.5 px-2">Entity</th>
                  <th className="py-2.5 px-2">Entity ID</th>
                  <th className="py-2.5 px-2">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-aec-navy/[0.02]">
                    <td className="py-2 px-2 text-aec-navy/70">
                      {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString()}
                    </td>
                    <td className="py-2 px-2 font-medium text-aec-navy">{log.actor.name}</td>
                    <td className="py-2 px-2">
                      <span className="rounded bg-aec-navy/10 px-2 py-0.5 font-bold uppercase text-[10px] text-aec-navy">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2 px-2 font-semibold text-aec-navy">{log.entity}</td>
                    <td className="py-2 px-2 font-mono text-[11px] text-aec-navy/60">{log.entityId}</td>
                    <td className="py-2 px-2 font-mono text-[11px] text-aec-navy/50">{log.ipAddress || "127.0.0.1"}</td>
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
