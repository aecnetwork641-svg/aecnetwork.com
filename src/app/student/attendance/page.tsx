import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentAttendancePage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.studentId) {
    redirect("/login?error=AccessDenied");
  }

  const attendances = await prisma.attendance.findMany({
    where: { studentId: scope.studentId },
    include: {
      class: { include: { course: true, teacher: { include: { user: true } } } }
    },
    orderBy: { date: "desc" },
    take: 50
  });

  const totalSessions = attendances.length;
  const presentCount = attendances.filter((a) => a.status === "present").length;
  const lateCount = attendances.filter((a) => a.status === "late").length;
  const excusedCount = attendances.filter((a) => a.status === "excused").length;
  const attendanceRate = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 100;

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Attendance Records & Logs">
      {/* Attendance Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Overall Attendance</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{attendanceRate}%</p>
          <p className="text-xs text-slate-500 mt-1">{presentCount} present of {totalSessions} logged</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Late Arrivals</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{lateCount} Sessions</p>
          <p className="text-xs text-slate-500 mt-1">Punctuality monitored</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Excused Sessions</p>
          <p className="text-2xl font-bold text-sky-600 mt-1">{excusedCount} Sessions</p>
          <p className="text-xs text-slate-500 mt-1">Notified & acknowledged</p>
        </div>
      </div>

      {/* Attendance Log Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Attendance Log</h3>
          <span className="text-xs text-slate-500">Real-time Verified</span>
        </div>

        {attendances.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No attendance records logged yet. Records will populate as you participate in class sessions.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Course / Subject</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Instructor</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {attendances.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">{new Date(row.date).toLocaleDateString()}</td>
                    <td className="p-3 font-semibold text-aec-navy">{row.class.course.title}</td>
                    <td className="p-3 text-slate-600">{row.class.name}</td>
                    <td className="p-3 text-slate-600">{row.class.teacher.user.name}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          row.status === "present"
                            ? "bg-emerald-100 text-emerald-800"
                            : row.status === "late"
                            ? "bg-amber-100 text-amber-800"
                            : row.status === "excused"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 italic">{row.note || "—"}</td>
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
