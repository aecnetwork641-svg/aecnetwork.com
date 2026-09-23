import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";

export default function TeacherExamsPage() {
  const exams = [
    {
      id: "tex-1",
      title: "Term 3 Comprehensive Oral Recitation Exam",
      date: "October 15, 2026",
      course: "Quran Recitation & Applied Tajweed",
      assignedStudents: 18,
      status: "Scheduled",
    },
    {
      id: "tex-2",
      title: "Spoken Arabic Mid-Term Oral Dialogue",
      date: "October 22, 2026",
      course: "Spoken Arabic Foundations",
      assignedStudents: 12,
      status: "Scheduled",
    },
  ];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Formal Examinations & Scheduling">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Assigned Exam Panels</h2>
        <p className="text-xs text-slate-500">Conduct mid-term and final term vivas with digital rubric scoring.</p>

        <div className="mt-6 space-y-3">
          {exams.map((ex) => (
            <div key={ex.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                  {ex.course}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{ex.title}</h4>
                <p className="text-[11px] text-slate-500">📅 Date: {ex.date} • {ex.assignedStudents} Students Enrolled</p>
              </div>

              <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full self-start sm:self-auto">
                {ex.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
