import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: { studentId?: string };
}

export default async function TeacherProgressPage({ searchParams }: Props) {
  const scope = await getCurrentTeacherScope();

  // Find classes assigned to this teacher
  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        include: {
          enrollments: {
            include: {
              student: {
                include: {
                  user: true,
                  lessonProgress: true,
                  attendances: true,
                  submissions: true,
                  results: true
                }
              },
              course: {
                include: {
                  modules: { include: { lessons: true } }
                }
              }
            }
          }
        }
      })
    : [];

  const allEnrollments = classes.flatMap((c) => c.enrollments);

  const selectedEnrollment =
    (searchParams.studentId &&
      allEnrollments.find((e) => e.studentId === searchParams.studentId)) ||
    allEnrollments[0] ||
    null;

  const totalLessons =
    selectedEnrollment?.course.modules.flatMap((m) => m.lessons).length || 1;
  const completedLessons =
    selectedEnrollment?.student.lessonProgress.filter((p) => p.completedAt).length || 0;
  const progressPct = Math.round((completedLessons / totalLessons) * 100);

  const totalAtt = selectedEnrollment?.student.attendances.length || 0;
  const presentAtt =
    selectedEnrollment?.student.attendances.filter((a) => a.status === "present").length || 0;
  const attPct = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : null;

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Student Progress">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Track syllabus progress, lesson completion, and academic engagement.
        </p>
        <ScopedDataNote text="Strict Scoped Access: Only students in your assigned cohorts are visible." />
      </div>

      {allEnrollments.length === 0 ? (
        <div className="card mt-6 py-12 text-center text-sm text-aec-navy/50">
          No students currently enrolled in your classes.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Student selection list */}
          <div className="card lg:col-span-1">
            <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
              Assigned Students ({allEnrollments.length})
            </h3>
            <div className="mt-3 divide-y divide-aec-navy/5 max-h-[500px] overflow-y-auto">
              {allEnrollments.map((e) => (
                <a
                  key={e.id}
                  href={`/teacher/progress?studentId=${e.studentId}`}
                  className={`block p-2 rounded text-xs transition-colors ${
                    selectedEnrollment?.studentId === e.studentId
                      ? "bg-aec-navy text-white"
                      : "hover:bg-aec-navy/5 text-aec-navy"
                  }`}
                >
                  <p className="font-semibold">{e.student.user.name}</p>
                  <p className={`text-[11px] ${selectedEnrollment?.studentId === e.studentId ? "text-white/70" : "text-aec-navy/50"}`}>
                    {e.course.title}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Student Detailed Progress Card */}
          {selectedEnrollment && (
            <div className="card lg:col-span-2 space-y-6">
              <div className="flex items-start justify-between border-b border-aec-navy/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-aec-navy">
                    {selectedEnrollment.student.user.name}
                  </h3>
                  <p className="text-xs text-aec-navy/60 font-mono">
                    ID: {selectedEnrollment.student.studentCode} &bull; Course: {selectedEnrollment.course.title}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {selectedEnrollment.status}
                </span>
              </div>

              {/* Progress metrics */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded bg-aec-navy/5 p-3">
                  <p className="text-xs text-aec-navy/50 font-semibold uppercase">Course Completion</p>
                  <p className="mt-1 text-2xl font-bold text-aec-navy">{progressPct}%</p>
                  <p className="text-[11px] text-aec-navy/60">{completedLessons} of {totalLessons} Lessons</p>
                </div>
                <div className="rounded bg-aec-navy/5 p-3">
                  <p className="text-xs text-aec-navy/50 font-semibold uppercase">Attendance Rate</p>
                  <p className="mt-1 text-2xl font-bold text-emerald-600">{attPct !== null ? `${attPct}%` : "—"}</p>
                  <p className="text-[11px] text-aec-navy/60">{presentAtt} of {totalAtt} Sessions</p>
                </div>
                <div className="rounded bg-aec-navy/5 p-3">
                  <p className="text-xs text-aec-navy/50 font-semibold uppercase">Submissions</p>
                  <p className="mt-1 text-2xl font-bold text-aec-navy">
                    {selectedEnrollment.student.submissions.length}
                  </p>
                  <p className="text-[11px] text-aec-navy/60">Assignments submitted</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-aec-navy/70 mb-1">
                  <span>Curriculum Pace</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-aec-navy/10 overflow-hidden">
                  <div
                    className="h-full bg-aec-blue transition-all"
                    style={{ width: `${Math.min(100, Math.max(5, progressPct))}%` }}
                  />
                </div>
              </div>

              {/* Curriculum Modules */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-aec-navy/50 mb-3">
                  Course Modules & Lessons
                </h4>
                <div className="space-y-3">
                  {selectedEnrollment.course.modules.map((m) => (
                    <div key={m.id} className="rounded border border-aec-navy/10 p-3">
                      <p className="text-xs font-semibold text-aec-navy">{m.title}</p>
                      <div className="mt-2 divide-y divide-aec-navy/5 text-xs text-aec-navy/70">
                        {m.lessons.map((lesson) => (
                          <div key={lesson.id} className="py-1 flex items-center justify-between">
                            <span>{lesson.title}</span>
                            <span className="text-[10px] text-aec-navy/50 uppercase">{lesson.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </PortalShell>
  );
}
