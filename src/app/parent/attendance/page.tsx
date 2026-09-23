import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { DEMO_PARENT } from "@/lib/parent-demo-data";
import { DEMO_ATTENDANCE } from "@/lib/student-demo-data";

export default function ParentAttendancePage() {
  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Child Attendance & Absence Reports">
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {DEMO_PARENT.children.map((child) => (
          <div key={child.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">{child.name}</h3>
              <p className="text-xs text-slate-500">{child.enrolledProgram}</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Attendance: {child.attendanceRate}% (Regular)</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-emerald-500 flex items-center justify-center text-xs font-bold text-slate-900">
              {child.attendanceRate}%
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Detailed Attendance Log (September 2026)</h3>
          <span className="text-xs text-slate-500">Live Synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Student</th>
                <th className="p-3">Course / Subject</th>
                <th className="p-3">Class Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DEMO_ATTENDANCE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">{row.date}</td>
                  <td className="p-3 font-semibold text-slate-800">Abdullah Akbar</td>
                  <td className="p-3 text-aec-navy font-medium">{row.course}</td>
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
