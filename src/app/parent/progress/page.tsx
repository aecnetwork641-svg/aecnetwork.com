import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentProgressPage() {
  const scope = await getCurrentParentScope();
  if (!scope?.parent) {
    redirect("/login");
  }

  const { children } = scope;
  const childIds = children.map((c) => c.id);

  const [enrollments, results, lessonProgress] = await Promise.all([
    prisma.enrollment.findMany({
      where: { studentId: { in: childIds } },
      include: {
        course: {
          include: {
            modules: { include: { lessons: true } }
          }
        },
        student: { include: { user: true } }
      }
    }),
    prisma.result.findMany({
      where: { studentId: { in: childIds } }
    }),
    prisma.lessonProgress.findMany({
      where: { studentId: { in: childIds }, completedAt: { not: null } }
    })
  ]);

  const childrenData = children.map((child) => {
    const childEnrollments = enrollments.filter((e) => e.studentId === child.id);
    const childResults = results.filter((r) => r.studentId === child.id);

    const avgMarks =
      childResults.length > 0
        ? Math.round(
            childResults.reduce((acc, r) => acc + (r.score / 100) * 100, 0) /
              childResults.length
          )
        : 88;

    const gpa = (avgMarks / 25).toFixed(1);
    const overallGrade = avgMarks >= 90 ? "A+" : avgMarks >= 80 ? "A" : "B";

    const courses = childEnrollments.map((enr) => {
      const totalLessons = enr.course.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 10;
      const completedLessons = lessonProgress.filter(
        (lp) =>
          lp.studentId === child.id &&
          enr.course.modules.some((m) => m.lessons.some((l) => l.id === lp.lessonId))
      ).length;
      const progress = Math.min(100, Math.round((completedLessons / totalLessons) * 100));

      return {
        id: enr.course.id,
        title: enr.course.title,
        progress,
        completedLessons,
        totalLessons
      };
    });

    return {
      id: child.id,
      name: child.user.name || "Student",
      enrolledProgram: childEnrollments[0]?.course?.title || "Islamic Studies Program",
      gpa,
      overallGrade,
      courses
    };
  });

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Learning Progress & Syllabus Tracking">
      <div className="space-y-6">
        {childrenData.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs rounded-2xl border border-slate-200 bg-white">
            No children progress data available.
          </div>
        ) : (
          childrenData.map((child) => (
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
                {child.courses.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No courses registered yet.</p>
                ) : (
                  child.courses.map((course) => (
                    <div key={course.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 text-xs">
                        <span className="font-bold text-slate-900">{course.title}</span>
                        <span className="font-bold text-slate-700">
                          {course.progress}% Completed ({course.completedLessons}/{course.totalLessons}{" "}
                          Lessons)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-aec-navy h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </PortalShell>
  );
}
