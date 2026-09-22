import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: { examId?: string };
}

export default async function TeacherResultsPage({ searchParams }: Props) {
  const scope = await getCurrentTeacherScope();

  const classes = scope
    ? await prisma.class.findMany({
        where: { teacherId: scope.teacherId },
        select: { courseId: true }
      })
    : [];

  const courseIds = classes.map((c) => c.courseId);

  const results = scope
    ? await prisma.result.findMany({
        where: {
          exam: {
            courseId: { in: courseIds },
            ...(searchParams.examId ? { id: searchParams.examId } : {})
          }
        },
        include: {
          exam: { include: { course: true } },
          student: { include: { user: true } }
        },
        orderBy: { exam: { date: "desc" } }
      })
    : [];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Exam Results & Grades">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Official exam results, scores, letter grades, and academic remarks.
        </p>
        <ScopedDataNote text="Strict Scoped Access: Only results for courses you instruct are displayed." />
      </div>

      <div className="card mt-6">
        {results.length === 0 ? (
          <p className="py-8 text-center text-sm text-aec-navy/50">
            No exam results recorded for your courses.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Student</th>
                  <th className="py-3 px-2">Exam</th>
                  <th className="py-3 px-2">Course</th>
                  <th className="py-3 px-2">Score</th>
                  <th className="py-3 px-2">Grade</th>
                  <th className="py-3 px-2">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-aec-navy/[0.02]">
                    <td className="py-3 px-2 font-medium text-aec-navy">
                      {r.student.user.name}
                    </td>
                    <td className="py-3 px-2 text-xs font-semibold text-aec-navy">
                      {r.exam.title}
                    </td>
                    <td className="py-3 px-2 text-xs text-aec-navy/60">
                      {r.exam.course.title}
                    </td>
                    <td className="py-3 px-2 font-bold text-aec-navy">
                      {r.score} / {r.exam.maxScore}
                    </td>
                    <td className="py-3 px-2">
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                        {r.grade || "Pass"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-xs text-aec-navy/70 italic">
                      {r.remarks || "Satisfactory academic performance"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
