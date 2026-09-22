import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentAssignmentsPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Assignments">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Assignments for your enrolled courses and your Submission status and scores.</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
