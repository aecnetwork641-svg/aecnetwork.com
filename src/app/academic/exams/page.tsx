import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";

export default function AcademicExamsPage() {
  const exams = [
    { title: "Fall 2026 Mid-Term Comprehensive Evaluation", dateRange: "Oct 15 - Oct 25, 2026", programs: "All Enrolled Programs", status: "Panel Appointed" },
    { title: "Annual Quran Memorization & Tajweed Viva", dateRange: "Dec 10 - Dec 20, 2026", programs: "Quran & Hifz Programs", status: "Drafting Rubric" },
  ];

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Institutional Examination Boards">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Academic Exam Schedules & Boards</h2>
        <p className="text-xs text-slate-500 mb-4">Official evaluation calendars, external viva panels, and rubric criteria.</p>

        <div className="space-y-3">
          {exams.map((ex, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900">{ex.title}</h4>
                <p className="text-[11px] text-slate-500">📅 {ex.dateRange} • Scope: {ex.programs}</p>
              </div>

              <span className="text-xs font-semibold text-aec-navy bg-aec-navy/10 px-3 py-1 rounded-full self-start sm:self-auto">
                {ex.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
