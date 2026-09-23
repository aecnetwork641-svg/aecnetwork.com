"use client";

import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";

export default function TeacherAssessmentsPage() {
  const assessments = [
    {
      id: "ass-1",
      title: "Weekly Oral Makharij Evaluation",
      subject: "Quran Recitation & Applied Tajweed",
      type: "Oral Viva",
      targetStudents: "18 Students",
      status: "Active (Ongoing)",
    },
    {
      id: "ass-2",
      title: "Noon Saakin & Tanween Diagnostic Quiz",
      subject: "Tajweed Theory",
      type: "Online Quiz",
      targetStudents: "18 Students",
      status: "Graded",
    },
  ];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Diagnostic Assessments & Quizzes">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">Formative Assessments</h2>
            <p className="text-xs text-slate-500">Track student phonics, pronunciation accuracy, and memorization retention.</p>
          </div>
          <button onClick={() => {}} className="btn-primary text-xs px-4 py-2 self-start sm:self-auto">
            + Create New Assessment
          </button>
        </div>

        <div className="space-y-3">
          {assessments.map((a) => (
            <div key={a.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase bg-aec-navy/10 text-aec-navy px-2 py-0.5 rounded">
                  {a.type}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{a.title}</h4>
                <p className="text-[11px] text-slate-500">{a.subject} • {a.targetStudents}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {a.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
