"use client";

import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";

export default function AcademicProgramsPage() {
  const programs = [
    { title: "Quran Recitation & Applied Tajweed", slug: "quran-islamic-studies", facultyCount: 8, enrolledStudents: 62, level: "Beginner to Advanced" },
    { title: "Spoken Arabic & Quranic Vocabulary", slug: "arabic", facultyCount: 4, enrolledStudents: 34, level: "Conversational" },
    { title: "English Language, Grammar & Writing", slug: "english", facultyCount: 5, enrolledStudents: 41, level: "Intensive" },
    { title: "Mathematics & Academic Tutoring", slug: "mathematics", facultyCount: 4, enrolledStudents: 28, level: "School Support" },
    { title: "Quran Memorization (Hifz)", slug: "quran-hifz", facultyCount: 3, enrolledStudents: 15, level: "Intensive Hifz" },
  ];

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Programs & Curriculum Management">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Institutional Curriculum Offerings ({programs.length})</h3>
          <button onClick={() => {}} className="btn-primary text-xs px-3 py-1.5">
            + New Program
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {programs.map((p, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">Slug: <span className="font-mono text-slate-700">{p.slug}</span> • Level: {p.level}</p>
              </div>

              <div className="sm:text-right text-xs">
                <span className="font-bold text-slate-900">{p.enrolledStudents} Enrolled Students</span>
                <span className="block text-slate-500">{p.facultyCount} Assigned Instructors</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
