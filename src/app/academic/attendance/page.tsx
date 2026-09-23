import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";

export default function AcademicAttendancePage() {
  const departmentStats = [
    { department: "Quran & Islamic Studies", rate: "97.8%", activeClasses: 48, faculty: 8 },
    { department: "Arabic Language & Literature", rate: "95.4%", activeClasses: 24, faculty: 4 },
    { department: "English & Composition", rate: "96.1%", activeClasses: 32, faculty: 5 },
    { department: "Mathematics & STEM Support", rate: "94.9%", activeClasses: 20, faculty: 4 },
  ];

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Institutional Attendance Analytics">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {departmentStats.map((d, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">{d.department.split(" ")[0]} Dept</span>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{d.rate}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{d.activeClasses} Sessions • {d.faculty} Faculty</p>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
