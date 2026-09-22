import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentNotificationsPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Notifications">
      <div className="card">
        <p className="text-sm text-aec-navy/60">System notifications addressed to you (Notification model).</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
