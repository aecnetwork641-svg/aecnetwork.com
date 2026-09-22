import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentProfilePage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="My Profile">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Your account and student profile details (name, email, student code, guardian link) from the Student and User models.</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
