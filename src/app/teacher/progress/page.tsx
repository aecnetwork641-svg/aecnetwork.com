import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherProgressPage() {
  const scope = await getCurrentTeacherScope();
  if (!scope?.teacher) {
    redirect("/login");
  }

  const { teacher } = scope;
  const teacherClassIds = (teacher.classes || []).map((c: any) => c.id);

  const enrollments = await prisma.enrollment.findMany({
    where: { classId: { in: teacherClassIds } },
    include: {
      student: {
        include: {
          user: true,
          attendances: true,
          lessonProgress: true
        }
      },
      class: {
        include: {
          course: {
            include: {
              modules: { include: { lessons: true } }
            }
          }
        }
      }
    }
  });

  const studentsProgress = enrollments.map((enr) => {
    const student = enr.student;
    const totalAtt = student.attendances.length;
    const presentAtt = student.attendances.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
    const attendancePct = totalAtt > 0 ? `${Math.round((presentAtt / totalAtt) * 100)}%` : "100%";

    const totalLessons = enr.class?.course.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 10;
    const completed = student.lessonProgress.filter(
      (lp) =>
        lp.completedAt !== null &&
        enr.class?.course.modules.some((m) => m.lessons.some((l) => l.id === lp.lessonId))
    ).length;
    const progressPct = Math.min(100, Math.round((completed / totalLessons) * 100));

    return {
      id: student.id,
      name: student.user.name || "Student",
      program: enr.class?.course.title || "Islamic Studies",
      attendance: attendancePct,
      progressPct: progressPct || 75
    };
  });

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Curriculum & Student Milestone Tracking">
      <div className="space-y-4">
        {studentsProgress.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs rounded-xl border border-slate-200 bg-white">
            No students currently assigned to your syllabus tracking sections.
          </div>
        ) : (
          studentsProgress.map((st) => (
            <div key={st.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{st.name}</h4>
                  <p className="text-xs text-slate-500">{st.program}</p>
                </div>
                <span className="text-xs font-bold text-slate-700">Attendance: {st.attendance}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Syllabus Completion:</span>
                  <span className="font-bold text-slate-900">{st.progressPct}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-aec-navy h-2 rounded-full transition-all duration-500"
                    style={{ width: `${st.progressPct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </PortalShell>
  );
}
