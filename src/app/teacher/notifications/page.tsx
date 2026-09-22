import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherNotificationsPage() {
  const scope = await getCurrentTeacherScope();

  const notifications = scope
    ? await prisma.notification.findMany({
        where: { userId: scope.userId },
        orderBy: { createdAt: "desc" },
        take: 50
      })
    : [];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Teacher Notifications">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Real-time system events, class assignments, schedule adjustments, and academic notices.
        </p>
        <ScopedDataNote text="Only notifications addressed to your user account are listed." />
      </div>

      <div className="card mt-6">
        {notifications.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No notifications at this time.
          </p>
        ) : (
          <div className="divide-y divide-aec-navy/5">
            {notifications.map((n) => (
              <div key={n.id} className="py-3 flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-xs text-aec-navy">{n.title}</p>
                    {n.type && (
                      <span className="rounded bg-aec-blue/10 px-2 py-0.5 text-[10px] font-medium text-aec-blue uppercase">
                        {n.type.replace("_", " ")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-aec-navy/80">{n.body}</p>
                </div>
                <span className="text-[11px] text-aec-navy/40 whitespace-nowrap ml-4">
                  {n.createdAt.toLocaleDateString()} {n.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
