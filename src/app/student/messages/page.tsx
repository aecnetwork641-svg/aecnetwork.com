import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentMessagesPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Messages">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Direct messages with your teachers (Message model).</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
