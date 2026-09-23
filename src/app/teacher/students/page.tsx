import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { DEMO_TEACHER_STUDENTS } from "@/lib/teacher-demo-data";

export default function TeacherStudentsPage() {
  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Assigned Students Roster">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Active 1-on-1 Students ({DEMO_TEACHER_STUDENTS.length})</h3>
          <span className="text-xs text-slate-500">Term Fall 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Program / Subject</th>
                <th className="p-3">Level</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">Current Grade</th>
                <th className="p-3">Last Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DEMO_TEACHER_STUDENTS.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">
                    <div>{st.name}</div>
                    <span className="font-mono text-[10px] text-slate-400 font-normal">{st.code}</span>
                  </td>
                  <td className="p-3 font-medium text-aec-navy">{st.program}</td>
                  <td className="p-3">{st.level}</td>
                  <td className="p-3 text-emerald-600 font-bold">{st.attendance}</td>
                  <td className="p-3 font-bold text-slate-900">{st.grade}</td>
                  <td className="p-3 text-slate-500">{st.lastSession}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
