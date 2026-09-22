import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherAssignmentsPage() {
  const scope = await getCurrentTeacherScope();

  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        select: { courseId: true }
      })
    : [];

  const courseIds = classes.map((c) => c.courseId);

  const assignments = scope
    ? await prisma.assignment.findMany({
        where: { courseId: { in: courseIds } },
        include: {
          course: true,
          submissions: { include: { student: { include: { user: true } } } }
        },
        orderBy: { dueDate: "asc" }
      })
    : [];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Course Assignments">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Assignments, due dates, and student submissions for your assigned courses.
        </p>
        <ScopedDataNote text="Only assignments for courses you teach are accessible." />
      </div>

      <div className="mt-6 space-y-6">
        {assignments.length === 0 ? (
          <div className="card py-12 text-center text-sm text-aec-navy/50">
            No active assignments created for your courses.
          </div>
        ) : (
          assignments.map((a) => (
            <div key={a.id} className="card">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-aec-navy/10 pb-3">
                <div>
                  <h3 className="font-bold text-aec-navy text-base">{a.title}</h3>
                  <p className="text-xs text-aec-blue font-medium">{a.course.title}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-semibold text-aec-navy">Due: {a.dueDate.toDateString()}</p>
                  <p className="text-aec-navy/50">Max Score: {a.maxScore} pts</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-aec-navy/80">{a.description}</p>

              {/* Submissions breakdown */}
              <div className="mt-4 border-t border-aec-navy/5 pt-3">
                <p className="text-xs font-semibold text-aec-navy">
                  Submissions ({a.submissions.length})
                </p>
                {a.submissions.length === 0 ? (
                  <p className="mt-2 text-xs text-aec-navy/40 italic">No submissions submitted yet.</p>
                ) : (
                  <div className="mt-2 divide-y divide-aec-navy/5">
                    {a.submissions.map((sub) => (
                      <div key={sub.id} className="py-2 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-medium text-aec-navy">{sub.student.user.name}</span>
                          <span className="ml-2 text-aec-navy/50">
                            Turned in {sub.submittedAt.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-aec-navy">
                            {sub.score !== null ? `${sub.score}/${a.maxScore}` : "Ungraded"}
                          </span>
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
