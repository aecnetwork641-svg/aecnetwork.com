import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TeacherExamsPage() {
  const scope = await getCurrentTeacherScope();

  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        select: { courseId: true }
      })
    : [];

  const courseIds = classes.map((c) => c.courseId);

  const exams = scope
    ? await prisma.exam.findMany({
        where: { courseId: { in: courseIds } },
        include: {
          course: true,
          results: { include: { student: { include: { user: true } } } }
        },
        orderBy: { date: "asc" }
      })
    : [];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Exams Management">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Midterm and final course examinations for your teaching cohorts.
        </p>
        <ScopedDataNote text="Only exams for your assigned courses are accessible." />
      </div>

      <div className="mt-6 space-y-6">
        {exams.length === 0 ? (
          <div className="card py-12 text-center text-sm text-aec-navy/50">
            No examinations currently scheduled for your courses.
          </div>
        ) : (
          exams.map((exam) => (
            <div key={exam.id} className="card">
              <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
                <div>
                  <h3 className="font-bold text-aec-navy text-base">{exam.title}</h3>
                  <p className="text-xs text-aec-blue font-medium">{exam.course.title}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-semibold text-aec-navy">{exam.date.toDateString()}</p>
                  <p className="text-aec-navy/50">Max: {exam.maxScore} marks</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-aec-navy/70">
                  Recorded student results: <span className="font-semibold text-aec-navy">{exam.results.length}</span>
                </span>
                <Link
                  href={`/teacher/results?examId=${exam.id}`}
                  className="rounded bg-aec-blue px-3 py-1.5 text-xs font-medium text-white hover:bg-aec-blue/90"
                >
                  Enter / View Results
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </PortalShell>
  );
}
