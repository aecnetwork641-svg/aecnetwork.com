import PortalShell from "@/components/PortalShell";
import ChildSwitcher from "@/components/ChildSwitcher";
import ScopedDataNote from "@/components/ScopedDataNote";
import { PARENT_NAV } from "./_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";

export default async function ParentDashboard({
  searchParams
}: {
  searchParams: { child?: string };
}) {
  const scope = await getCurrentParentScope(searchParams.child);

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Family Overview">
      {!scope && (
        <div className="card">
          <p className="text-sm text-aec-navy/50">Sign in as a parent to view this page.</p>
        </div>
      )}

      {scope && (
        <>
          <ChildSwitcher
            items={scope.children.map((c) => ({ id: c.id, name: c.user.name }))}
            selectedId={scope.selectedChild?.id ?? ""}
          />

          {!scope.selectedChild && (
            <div className="card">
              <p className="text-sm text-aec-navy/50">No children linked to this account yet.</p>
            </div>
          )}

          {scope.selectedChild && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Attendance", value: "—" },
                  { label: "Outstanding Balance", value: "—" },
                  { label: "Latest Result", value: "—" },
                  { label: "Unread Messages", value: "—" }
                ].map((s) => (
                  <div key={s.label} className="card">
                    <p className="text-xs text-aec-navy/50">{s.label}</p>
                    <p className="mt-1 text-2xl font-bold text-aec-navy">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="card mt-6">
                <p className="font-semibold text-aec-navy">
                  {scope.selectedChild.user.name}'s Overview
                </p>
                <p className="mt-2 text-sm text-aec-navy/50">
                  Classes, timetable, progress and fees for this child appear
                  across the portal pages in the sidebar.
                </p>
                <ScopedDataNote text="Only children linked to your ParentProfile can ever be selected." />
              </div>
            </>
          )}
        </>
      )}
    </PortalShell>
  );
}
