import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentSettingsPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Settings">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Account settings - password, contact preferences, notification preferences.</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
