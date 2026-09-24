import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentCoursesPage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.studentId) {
    redirect("/login?error=AccessDenied");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: scope.studentId },
    include: {
      course: {
        include: {
          primaryInstructor: { include: { user: true } },
          modules: { include: { lessons: true } }
        }
      },
      class: true
    },
    orderBy: { enrolledAt: "desc" }
  });

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Enrolled Courses & LMS Modules">
      {enrollments.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="font-bold text-slate-800 text-sm">No courses currently enrolled</p>
          <p className="text-xs text-slate-500 mt-1">Browse the academy course catalog to select your learning path.</p>
          <Link href="/courses" className="btn-primary mt-4 inline-block text-xs px-4 py-2">
            Explore Course Catalog
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enr) => {
            const course = enr.course;
            const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

            return (
              <div key={enr.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider capitalize">
                      {enr.status}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {course.deliveryMode}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900 leading-snug">{course.title}</h3>
                  <p className="text-xs text-slate-500 mt-2">
                    Instructor: <span className="font-semibold text-slate-800">{course.primaryInstructor?.user.name || "Assigned Faculty"}</span>
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Curriculum Modules:</span>
                      <span className="font-semibold text-slate-900">{course.modules.length} Modules</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Lessons:</span>
                      <span className="font-semibold text-slate-900">{totalLessons} Lessons</span>
                    </div>
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
            );
          })}
        </div>
      )}
    </PortalShell>
  );
}
