import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";

export default function StudentExamsPage() {
  const upcomingExams = [
    {
      id: "ex-1",
      course: "Quran & Applied Tajweed",
      title: "Term 3 Oral Recitation & Theoretical Evaluation",
      date: "October 15, 2026",
      time: "5:00 PM (PKT)",
      platform: "Live 1-on-1 Session with Academic Head",
      format: "Oral recitation (Surah Al-Mulk) & Tajweed rules viva",
      maxMarks: 100,
    },
    {
      id: "ex-2",
      course: "Spoken Arabic Foundations",
      title: "Mid-Term Spoken Conversation & Vocabulary Test",
      date: "October 22, 2026",
      time: "6:30 PM (PKT)",
      platform: "Live Video Session",
      format: "Interactive Dialogue & Reading Comprehension",
      maxMarks: 100,
    },
  ];

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Exams & Formal Assessments">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Upcoming Assessment Schedule</h2>
        <p className="text-xs text-slate-500">
          Formal oral and written evaluations are conducted by certified academic supervisors.
        </p>

        <div className="mt-6 space-y-4">
          {upcomingExams.map((ex) => (
            <div key={ex.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2.5 py-0.5 rounded-full">
                  {ex.course}
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 mt-2">{ex.title}</h3>
                <p className="text-xs text-slate-600 mt-1"><strong>Format:</strong> {ex.format}</p>
                <p className="text-xs text-slate-500 mt-1">Platform: {ex.platform}</p>
              </div>

              <div className="md:text-right shrink-0">
                <span className="text-xs font-bold text-aec-navy block">📅 {ex.date}</span>
                <span className="text-xs text-slate-600 block mt-0.5">⏰ {ex.time}</span>
                <span className="inline-block mt-2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5">
                  100 Marks
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
