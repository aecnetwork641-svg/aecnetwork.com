import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";

export default function StudentProgressPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Progress Reports">
      <div className="card">
        <p className="text-sm text-aec-navy/60">Lesson completion (LessonProgress) and quiz performance (QuizAttempt) summarized per course.</p>
        <ScopedDataNote text="Only your own records are ever shown here." />
      </div>
    </PortalShell>
  );
}
