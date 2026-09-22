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

export default async function AdminCommunicationPage() {
  const [announcements, recentNotifications] = await Promise.all([
    prisma.announcement.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.notification.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 20
    })
  ]);

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Communication & Broadcast Center">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Academy announcements, role-targeted circulars, and system event notifications.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Academy Announcements */}
        <div className="card">
          <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
            <h3 className="font-bold text-aec-navy text-base">Institution Announcements</h3>
            <span className="rounded bg-aec-navy/10 px-2 py-0.5 text-xs font-semibold text-aec-navy">
              {announcements.length} Published
            </span>
          </div>

          {announcements.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">No announcements published.</p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {announcements.map((a) => (
                <div key={a.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-xs text-aec-navy">{a.title}</p>
                    <span className="text-[10px] text-aec-navy/40">{a.createdAt.toLocaleDateString()}</span>
                  </div>
                  <p className="mt-1 text-xs text-aec-navy/70">{a.content}</p>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-[10px] text-aec-navy/50">Target Roles:</span>
                    {a.targetRoles.length === 0 ? (
                      <span className="rounded bg-aec-navy/5 px-1.5 py-0.5 text-[9px] font-bold text-aec-navy">
                        All Users
                      </span>
                    ) : (
                      a.targetRoles.map((r) => (
                        <span key={r} className="rounded bg-aec-blue/10 px-1.5 py-0.5 text-[9px] font-bold text-aec-blue">
                          {r}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System Event Notifications Dispatch Log */}
        <div className="card">
          <h3 className="font-bold text-aec-navy text-base border-b border-aec-navy/10 pb-3">
            Event Notification Dispatches
          </h3>
          {recentNotifications.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">No notification logs recorded.</p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {recentNotifications.map((n) => (
                <div key={n.id} className="py-2.5 flex items-start justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-aec-navy">{n.title}</p>
                      <span className="rounded bg-aec-navy/5 px-1.5 py-0.2 text-[9px] font-mono text-aec-navy/70">
                        {n.channel}
                      </span>
                    </div>
                    <p className="text-aec-navy/70 text-[11px] mt-0.5">{n.body}</p>
                    <p className="text-[10px] text-aec-navy/40 mt-0.5">Recipient: {n.user.name}</p>
                  </div>
                  <span className="text-[10px] text-aec-navy/40 whitespace-nowrap ml-2">
                    {n.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
