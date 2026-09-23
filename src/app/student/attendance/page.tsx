import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_ATTENDANCE, DEMO_STUDENT } from "@/lib/student-demo-data";

export default function StudentAttendancePage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Attendance Records & Logs">
      {/* Attendance Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Overall Attendance</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{DEMO_STUDENT.attendanceRate}%</p>
          <p className="text-xs text-slate-500 mt-1">24 attended / 25 scheduled</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Late / Rescheduled</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">1 Session</p>
          <p className="text-xs text-slate-500 mt-1">Within permissible window</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Excused Leaves</p>
          <p className="text-2xl font-bold text-sky-600 mt-1">1 Session</p>
          <p className="text-xs text-slate-500 mt-1">Pre-approved by parent</p>
        </div>
      </div>

      {/* Attendance Log Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Recent Class Attendance Log</h3>
          <span className="text-xs text-slate-500">September 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Course / Subject</th>
                <th className="p-3">Class Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DEMO_ATTENDANCE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">{row.date}</td>
                  <td className="p-3 font-semibold text-aec-navy">{row.course}</td>
                  <td className="p-3 text-slate-500">{row.time}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        row.status === "Present"
                          ? "bg-emerald-100 text-emerald-800"
                          : row.status.includes("Late")
                          ? "bg-amber-100 text-amber-800"
                          : "bg-sky-100 text-sky-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
