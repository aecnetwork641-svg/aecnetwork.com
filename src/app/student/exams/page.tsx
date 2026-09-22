import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentExamsPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Exams">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Upcoming and past Exam entries for your enrolled courses.</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
