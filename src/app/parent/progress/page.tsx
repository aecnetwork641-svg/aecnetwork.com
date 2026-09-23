import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { DEMO_PARENT } from "@/lib/parent-demo-data";
import { DEMO_ENROLLED_COURSES } from "@/lib/student-demo-data";

export default function ParentProgressPage() {
  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Learning Progress & Syllabus Tracking">
      <div className="space-y-6">
        {DEMO_PARENT.children.map((child) => (
          <div key={child.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">{child.name}</h3>
                <p className="text-xs text-slate-500">{child.enrolledProgram}</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Overall: {child.overallGrade} (GPA {child.gpa})
              </span>
            </div>

            <div className="space-y-4">
              {DEMO_ENROLLED_COURSES.map((course) => (
                <div key={course.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 text-xs">
                    <span className="font-bold text-slate-900">{course.title}</span>
                    <span className="font-bold text-slate-700">{course.progress}% Completed ({course.completedLessons}/{course.totalLessons} Lessons)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-aec-navy h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
