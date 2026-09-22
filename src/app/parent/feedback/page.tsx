import PortalShell from "@/components/PortalShell";
import ChildSwitcher from "@/components/ChildSwitcher";
import ScopedDataNote from "@/components/ScopedDataNote";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";

export default async function ParentFeedbackPage({
  searchParams
}: {
  searchParams: { child?: string };
}) {
  const scope = await getCurrentParentScope(searchParams.child);

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Teacher Feedback">
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
          <div className="card">
            <p className="text-sm text-aec-navy/60">Feedback notes from teachers about your selected child (TeacherFeedback model).</p>
            <ScopedDataNote text="Only data for children linked to your account is ever shown." />
          </div>
        </>
      )}
    </PortalShell>
  );
}
