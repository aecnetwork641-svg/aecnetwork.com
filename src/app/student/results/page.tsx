import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentResultsPage() {
  const scope = await getCurrentStudentScope();

  const results = scope
    ? await prisma.result.findMany({
        where: { studentId: scope.studentId },
        include: { exam: { include: { course: true } } },
        orderBy: { id: "desc" }
      })
    : [];

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Results">
      <div className="card">
        <p className="font-semibold text-aec-navy">Your Exam Results</p>
        {!scope && <p className="mt-2 text-sm text-aec-navy/50">Sign in as a student to view this page.</p>}
        {scope && results.length === 0 && (
          <p className="mt-2 text-sm text-aec-navy/50">No results recorded yet.</p>
        )}
        {results.length > 0 && (
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-aec-navy/50">
                <th className="py-2">Course</th>
                <th className="py-2">Exam</th>
                <th className="py-2">Score</th>
                <th className="py-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-t border-aec-navy/5">
                  <td className="py-2">{r.exam.course.title}</td>
                  <td className="py-2">{r.exam.title}</td>
                  <td className="py-2">{r.score}/{r.exam.maxScore}</td>
                  <td className="py-2">{r.grade ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <ScopedDataNote text="Only results tied to your own Student.id are queried." />
      </div>
    </PortalShell>
  );
}
