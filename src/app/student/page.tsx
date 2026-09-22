import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "./_nav";

const STAT_WIDGETS = [
  { label: "Attendance %", value: "—" },
  { label: "Pending Assignments", value: "—" },
  { label: "Upcoming Exams", value: "—" },
  { label: "Outstanding Fees", value: "—" }
];

export default function StudentDashboard() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Welcome back">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_WIDGETS.map((s) => (
          <div key={s.label} className="card">
            <p className="text-xs text-aec-navy/50">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-aec-navy">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <p className="font-semibold text-aec-navy">Today's Classes</p>
          <p className="mt-2 text-sm text-aec-navy/50">
            From <code>Class</code> + <code>TimetableSlot</code> for today,
            scoped to this student's active <code>Enrollment</code>s.
          </p>
          <ScopedDataNote text="Only this student's own classes are ever queried." />
        </div>
        <div className="card">
          <p className="font-semibold text-aec-navy">Upcoming Classes</p>
          <p className="mt-2 text-sm text-aec-navy/50">Next 7 days, same source as above.</p>
        </div>
        <div className="card">
          <p className="font-semibold text-aec-navy">Recent Results</p>
          <p className="mt-2 text-sm text-aec-navy/50">Latest <code>Result</code> rows for this student.</p>
        </div>
        <div className="card">
          <p className="font-semibold text-aec-navy">Progress</p>
          <p className="mt-2 text-sm text-aec-navy/50">
            Course completion from <code>LessonProgress</code>.
          </p>
        </div>
        <div className="card">
          <p className="font-semibold text-aec-navy">Tasks</p>
          <p className="mt-2 text-sm text-aec-navy/50">Open items from the <code>Task</code> model.</p>
        </div>
        <div className="card">
          <p className="font-semibold text-aec-navy">Notifications & Messages</p>
          <p className="mt-2 text-sm text-aec-navy/50">
            Unread <code>Notification</code> and <code>Message</code> counts.
          </p>
        </div>
      </div>
    </PortalShell>
  );
}
