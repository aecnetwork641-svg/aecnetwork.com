import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentClassesPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="My Classes">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Your assigned Class records, including the meeting link (resolved via src/lib/meeting.ts, only for authorized viewers).</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
