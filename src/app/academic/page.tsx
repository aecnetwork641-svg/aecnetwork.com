import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "./_nav";

export default function AcademicDashboard() {
  const stats = [
    { label: "Active Programs", value: "8 Programs", desc: "Quran, Arabic, English, STEM" },
    { label: "Enrolled Students", value: "148 Students", desc: "Across 12 Countries" },
    { label: "Faculty Members", value: "24 Instructors", desc: "Certified Educators" },
    { label: "Average Attendance", value: "96.2%", desc: "Institution-wide rate" },
  ];

  const recentActivities = [
    { title: "Term 3 Curriculum syllabus published for Quran Recitation", time: "2 hours ago", type: "Curriculum" },
    { title: "New 1-on-1 teacher allocation for student Ibrahim Malik (UK)", time: "4 hours ago", type: "Allocation" },
    { title: "Mid-Term Examination schedule finalized for all cohorts", time: "Yesterday", type: "Exams" },
  ];

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Academic Management Overview">
      {/* 1. Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-aec-gold uppercase tracking-wider">Dean of Academics</span>
            <h2 className="font-display text-2xl font-bold mt-0.5">AEC Academic Governance & Curriculum</h2>
            <p className="text-xs text-white/70 mt-1">
              Term: <strong className="text-white">Fall 2026</strong> • Active 1-on-1 & Group Learning Management
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/academic/programs" className="rounded-xl bg-aec-gold text-aec-navy font-bold text-xs px-4 py-2 hover:bg-aec-gold/90 transition shadow">
              Manage Programs
            </Link>
            <Link href="/academic/classes" className="rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs px-4 py-2 hover:bg-white/20 transition">
              Allocate Classes
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((s, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">{s.label}</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{s.value}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Recent Academic Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-display text-base font-bold text-slate-900 mb-4">Recent Academic Operations</h3>
        <div className="space-y-3">
          {recentActivities.map((act, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{act.title}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{act.time}</span>
              </div>
              <span className="rounded-full bg-aec-navy/10 text-aec-navy font-bold text-[10px] px-2.5 py-0.5">
                {act.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}