import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentDocumentsPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Documents">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Your uploaded or received documents (StudentDocument) - IDs, admission paperwork, report cards.</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
