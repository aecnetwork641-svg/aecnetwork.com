import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { DEMO_TEACHER_STUDENTS } from "@/lib/teacher-demo-data";

export default function TeacherProgressPage() {
  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Curriculum & Student Milestone Tracking">
      <div className="space-y-4">
        {DEMO_TEACHER_STUDENTS.map((st) => (
          <div key={st.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{st.name}</h4>
                <p className="text-xs text-slate-500">{st.program} • {st.level}</p>
              </div>
              <span className="text-xs font-bold text-slate-700">Attendance: {st.attendance}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Syllabus Completion:</span>
                <span className="font-bold text-slate-900">78%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-aec-navy h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
