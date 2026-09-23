import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_ENROLLED_COURSES } from "@/lib/student-demo-data";

export default function StudentCoursesPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Enrolled Courses & LMS Modules">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_ENROLLED_COURSES.map((course) => (
          <div key={course.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="rounded-full bg-aec-navy/10 text-aec-navy text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider">
                  {course.status}
                </span>
                <span className="text-xs font-bold text-slate-700">{course.progress}%</span>
              </div>

              <h3 className="font-display text-base font-bold text-slate-900 leading-snug">{course.title}</h3>
              <p className="text-xs text-slate-500 mt-2">
                Instructor: <span className="font-semibold text-slate-800">{course.instructor}</span>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="font-semibold text-slate-900">{course.completedLessons} / {course.totalLessons} Lessons</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Lesson:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[140px]">{course.nextLesson}</span>
                </div>
              </div>

              <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
                <div className="bg-aec-gold h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                href={`/courses/${course.slug}`}
                className="btn-primary w-full py-2 text-xs font-semibold text-center"
              >
                Access Course LMS
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
