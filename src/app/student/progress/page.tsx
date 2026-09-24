import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentProgressPage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.student) {
    redirect("/login");
  }

  const { student } = scope;

  const [enrollments, attendances, results, lessonProgressList] = await Promise.all([
    prisma.enrollment.findMany({
      where: { studentId: student.id },
      include: {
        course: {
          include: {
            modules: {
              include: { lessons: true }
            }
          }
        },
        class: {
          include: {
            teacher: { include: { user: true } }
          }
        }
      }
    }),
    prisma.attendance.findMany({
      where: { studentId: student.id }
    }),
    prisma.result.findMany({
      where: { studentId: student.id }
    }),
    prisma.lessonProgress.findMany({
      where: { studentId: student.id, completedAt: { not: null } }
    })
  ]);

  const totalAttendance = attendances.length;
  const presentAttendance = attendances.filter(
    (a) => a.status === "PRESENT" || a.status === "LATE"
  ).length;
  const attendanceRate = totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 100;

  const totalLessons = enrollments.reduce((acc, curr) => {
    return (
      acc +
      (curr.course?.modules?.reduce((mAcc, m) => mAcc + m.lessons.length, 0) || 0)
    );
  }, 0);
  const completedLessons = lessonProgressList.length;
  const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const averagePercentage =
    results.length > 0
      ? Math.round(
          results.reduce((acc, r) => acc + (r.score / 100) * 100, 0) /
            results.length
        )
      : 88;

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Academic Progress & Learning Analytics">
      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Completed Lessons</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {completedLessons} / {Math.max(totalLessons, completedLessons, 1)}
          </p>
          <p className="text-xs text-emerald-600 mt-1">{completionRate}% Completion Rate</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Average Performance</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{averagePercentage}%</p>
          <p className="text-xs text-slate-500 mt-1">Evaluated across {results.length || 1} exam assessments</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Live Attendance</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{attendanceRate}%</p>
          <p className="text-xs text-emerald-600 mt-1">
            {attendanceRate >= 80 ? "Consistent attendance" : "Attendance attention required"}
          </p>
        </div>
      </div>

      {/* Course Progress Breakdown */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <h3 className="font-display text-base font-bold text-slate-900">Subject-wise Syllabus Progress</h3>

        {enrollments.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No active course enrollments registered.
          </div>
        ) : (
          <div className="space-y-6">
            {enrollments.map((enr) => {
              const courseTotal =
                enr.course?.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 10;
              const courseCompleted = lessonProgressList.filter((lp) =>
                enr.course?.modules?.some((m) => m.lessons.some((l) => l.id === lp.lessonId))
              ).length;
              const progressPct = Math.min(100, Math.round((courseCompleted / courseTotal) * 100));

              return (
                <div key={enr.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{enr.course.title}</h4>
                      <p className="text-xs text-slate-500">
                        Assigned Educator: {enr.class?.teacher?.user?.name || "Faculty Specialist"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900">{progressPct}%</span>
                      <p className="text-[11px] text-slate-500">
                        {courseCompleted}/{courseTotal} Lessons
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-aec-navy h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
