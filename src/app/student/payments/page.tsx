import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentPaymentsPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Payments">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Your payment history against issued invoices (Payment linked to Invoice).</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
