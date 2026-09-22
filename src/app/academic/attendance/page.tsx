import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function AcademicAttendanceRecordsPage() {
  const records = await prisma.attendance.findMany({
    take: 50,
    orderBy: { date: "desc" },
    include: {
      student: { include: { user: true } },
      class: { include: { teacher: { include: { user: true } }, course: true } }
    }
  });

  const total = records.length;
  const present = records.filter((r) => r.status === "present").length;
  const absent = records.filter((r) => r.status === "absent").length;
  const late = records.filter((r) => r.status === "late").length;
  const rate = total > 0 ? Math.round((present / total) * 100) : null;

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Attendance Records">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Overall Presence</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{rate !== null ? `${rate}%` : "—"}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Present Logs</p>
          <p className="mt-1 text-2xl font-bold text-aec-navy">{present}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Absences Logged</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">{absent}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase text-aec-navy/50">Late Arrivals</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{late}</p>
        </div>
      </div>

      <div className="card mt-6">
        <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
          Latest Attendance Events Across All Classes
        </h3>
        {records.length === 0 ? (
          <p className="py-8 text-center text-xs text-aec-navy/50">No attendance records logged.</p>
        ) : (
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-aec-navy/10 text-aec-navy/50 uppercase">
                  <th className="py-2.5 px-2">Date</th>
                  <th className="py-2.5 px-2">Student</th>
                  <th className="py-2.5 px-2">Class & Course</th>
                  <th className="py-2.5 px-2">Instructor</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-aec-navy/[0.02]">
                    <td className="py-2 px-2 text-aec-navy/70">{r.date.toDateString()}</td>
                    <td className="py-2 px-2 font-medium text-aec-navy">{r.student.user.name}</td>
                    <td className="py-2 px-2">
                      <span className="font-medium text-aec-navy">{r.class.name}</span>
                      <span className="block text-[10px] text-aec-navy/50">{r.class.course.title}</span>
                    </td>
                    <td className="py-2 px-2 text-aec-navy/70">{r.class.teacher.user.name}</td>
                    <td className="py-2 px-2">
                      <span
                        className={`rounded px-2 py-0.5 font-semibold capitalize text-[11px] ${
                          r.status === "present"
                            ? "bg-emerald-50 text-emerald-700"
                            : r.status === "absent"
                            ? "bg-rose-50 text-rose-700"
                            : r.status === "late"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-aec-navy/60 italic">{r.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
