import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentAttendancePage() {
  const scope = await getCurrentStudentScope();

  // Real scoped query: the WHERE clause always includes this student's own
  // id, resolved server-side from the session — never from a URL/query param.
  const records = scope
    ? await prisma.attendance.findMany({
        where: { studentId: scope.studentId },
        orderBy: { date: "desc" },
        take: 20,
        include: { class: true }
      })
    : [];

  const total = records.length;
  const present = records.filter((r) => r.status === "present").length;
  const rate = total > 0 ? Math.round((present / total) * 100) : null;

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Attendance">
      <div className="card">
        <p className="text-xs text-aec-navy/50">Attendance Rate</p>
        <p className="mt-1 text-2xl font-bold text-aec-navy">{rate !== null ? `${rate}%` : "—"}</p>
        <ScopedDataNote text="Computed only from your own Attendance rows." />
      </div>

      <div className="card mt-6">
        <p className="font-semibold text-aec-navy">Recent Records</p>
        {!scope && (
          <p className="mt-2 text-sm text-aec-navy/50">Sign in as a student to view this page.</p>
        )}
        {scope && records.length === 0 && (
          <p className="mt-2 text-sm text-aec-navy/50">No attendance records yet.</p>
        )}
        {records.length > 0 && (
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-aec-navy/50">
                <th className="py-2">Date</th>
                <th className="py-2">Class</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-t border-aec-navy/5">
                  <td className="py-2">{r.date.toDateString()}</td>
                  <td className="py-2">{r.class.name}</td>
                  <td className="py-2 capitalize">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PortalShell>
  );
}
