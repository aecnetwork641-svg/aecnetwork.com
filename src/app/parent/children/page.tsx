import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { DEMO_PARENT } from "@/lib/parent-demo-data";

export default function ParentChildrenPage() {
  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Enrolled Children Profiles">
      <div className="grid gap-6 md:grid-cols-2">
        {DEMO_PARENT.children.map((child) => (
          <div key={child.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-aec-navy text-aec-gold text-2xl font-bold">
                  {child.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">{child.name}</h3>
                  <p className="text-xs text-slate-500">Student Code: <span className="font-mono font-bold text-slate-800">{child.code}</span></p>
                  <p className="text-xs text-slate-600 mt-0.5">Age: {child.age} yrs • {child.grade}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Enrolled Program:</span>
                  <span className="font-semibold text-slate-900 text-right">{child.enrolledProgram}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Educator:</span>
                  <span className="font-semibold text-slate-900">{child.primaryTeacher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Attendance Rate:</span>
                  <span className="font-semibold text-emerald-600">{child.attendanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic Standing:</span>
                  <span className="font-semibold text-slate-900">GPA {child.gpa} ({child.overallGrade})</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              <Link
                href="/parent/progress"
                className="btn-primary flex-1 py-2 text-xs font-semibold text-center"
              >
                Track Learning Progress
              </Link>
              <Link
                href="/parent/reports"
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Report Card
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
