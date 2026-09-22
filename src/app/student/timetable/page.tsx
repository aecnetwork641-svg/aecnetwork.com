import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentTimetablePage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Timetable">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Weekly schedule built from TimetableSlot rows for your classes.</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
