import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentCoursesPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="My Courses">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Courses you are enrolled in, sourced from Enrollment (scoped to this student only).</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
