import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";

export default function AcademicReportsPage() {
  const metrics = [
    { title: "Average Term GPA", value: "3.84 / 4.0", trend: "+0.12 vs last term" },
    { title: "Course Completion Velocity", value: "84.2%", trend: "9.2% ahead of schedule" },
    { title: "Student Retention Rate", value: "98.5%", trend: "High satisfaction" },
    { title: "Instructor Quality Score", value: "4.9 / 5.0", trend: "Based on 112 parent reviews" },
  ];

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Academic Performance Analytics">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {metrics.map((m, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">{m.title}</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{m.value}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">{m.trend}</p>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
