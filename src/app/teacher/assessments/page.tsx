import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherAssessmentsPage() {
  const scope = await getCurrentTeacherScope();

  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        select: { id: true, courseId: true }
      })
    : [];

  const classIds = classes.map((c) => c.id);
  const courseIds = classes.map((c) => c.courseId);

  const assessments = scope
    ? await prisma.assessment.findMany({
        where: {
          OR: [
            { classId: { in: classIds } },
            { courseId: { in: courseIds } }
          ]
        },
        include: {
          course: true,
          class: true,
          submissions: { include: { student: { include: { user: true } } } }
        },
        orderBy: { createdAt: "desc" }
      })
    : [];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Continuous Assessments">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Quizzes, oral recitations, and periodic cohort assessments.
        </p>
        <ScopedDataNote text="Only assessments for your assigned classes are displayed." />
      </div>

      <div className="mt-6 space-y-6">
        {assessments.length === 0 ? (
          <div className="card py-12 text-center text-sm text-aec-navy/50">
            No continuous assessments scheduled.
          </div>
        ) : (
          assessments.map((ass) => (
            <div key={ass.id} className="card">
              <div className="flex items-start justify-between border-b border-aec-navy/10 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-aec-navy text-base">{ass.title}</h3>
                    <span className="rounded bg-aec-blue/10 px-2 py-0.5 text-xs font-semibold uppercase text-aec-blue">
                      {ass.type}
                    </span>
                  </div>
                  <p className="text-xs text-aec-navy/60">
                    {ass.course.title} {ass.class ? `• ${ass.class.name}` : ""}
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-semibold text-aec-navy">Max: {ass.maxScore} pts</p>
                  {ass.date && <p className="text-aec-navy/50">{ass.date.toDateString()}</p>}
                </div>
              </div>

              {ass.description && (
                <p className="mt-3 text-xs text-aec-navy/80">{ass.description}</p>
              )}

              <div className="mt-4 border-t border-aec-navy/5 pt-3">
                <p className="text-xs font-semibold text-aec-navy">
                  Submissions & Grades ({ass.submissions.length})
                </p>
                {ass.submissions.length === 0 ? (
                  <p className="mt-1 text-xs text-aec-navy/40 italic">No evaluated student submissions yet.</p>
                ) : (
                  <div className="mt-2 divide-y divide-aec-navy/5">
                    {ass.submissions.map((sub) => (
                      <div key={sub.id} className="py-1.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-aec-navy">{sub.student.user.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-emerald-600">
                            {sub.score !== null ? `${sub.score}/${ass.maxScore}` : "—"}
                          </span>
                          {sub.grade && (
                            <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                              Grade {sub.grade}
                            </span>
                          )}
                          {sub.feedback && (
                            <span className="text-aec-navy/60 italic text-[11px]">&quot;{sub.feedback}&quot;</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </PortalShell>
  );
}
