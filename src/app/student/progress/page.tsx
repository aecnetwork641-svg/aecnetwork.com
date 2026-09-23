import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_ENROLLED_COURSES, DEMO_STUDENT } from "@/lib/student-demo-data";

export default function StudentProgressPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Academic Progress & Learning Analytics">
      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Completed Lessons</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{DEMO_STUDENT.completedLessons} / {DEMO_STUDENT.totalLessons}</p>
          <p className="text-xs text-emerald-600 mt-1">77.7% Completion Rate</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Current GPA / Grade</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{DEMO_STUDENT.gpa} ({DEMO_STUDENT.overallGrade})</p>
          <p className="text-xs text-slate-500 mt-1">Evaluated across 3 terms</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Live Attendance</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{DEMO_STUDENT.attendanceRate}%</p>
          <p className="text-xs text-emerald-600 mt-1">Consistent attendance</p>
        </div>
      </div>

      {/* Course Progress Breakdown */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <h3 className="font-display text-base font-bold text-slate-900">Subject-wise Syllabus Progress</h3>

        <div className="space-y-6">
          {DEMO_ENROLLED_COURSES.map((course) => (
            <div key={course.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{course.title}</h4>
                  <p className="text-xs text-slate-500">Assigned Educator: {course.instructor}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900">{course.progress}%</span>
                  <p className="text-[11px] text-slate-500">{course.completedLessons}/{course.totalLessons} Lessons</p>
                </div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  className="bg-aec-navy h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
