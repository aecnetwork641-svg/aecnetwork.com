import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function AcademicExamsPage() {
  const exams = await prisma.exam.findMany({
    include: {
      course: true,
      results: { include: { student: { include: { user: true } } } }
    },
    orderBy: { date: "desc" }
  });

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Exams & Grading">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Institution-wide examination schedules, grading policies, and published grade distributions.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {exams.length === 0 ? (
          <div className="card py-12 text-center text-sm text-aec-navy/50">
            No exams scheduled.
          </div>
        ) : (
          exams.map((ex) => (
            <div key={ex.id} className="card">
              <div className="flex items-start justify-between border-b border-aec-navy/10 pb-3">
                <div>
                  <h3 className="font-bold text-aec-navy text-base">{ex.title}</h3>
                  <p className="text-xs text-aec-navy/60">{ex.course.title}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-semibold text-aec-navy">{ex.date.toDateString()}</p>
                  <p className="text-aec-navy/50">Max: {ex.maxScore} marks</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-aec-navy mb-2">
                  Graded Students ({ex.results.length})
                </p>
                {ex.results.length === 0 ? (
                  <p className="text-xs text-aec-navy/40 italic">Results pending entry from course instructor.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-aec-navy/10 text-aec-navy/50 uppercase">
                          <th className="py-2 px-2">Student</th>
                          <th className="py-2 px-2">Score</th>
                          <th className="py-2 px-2">Grade</th>
                          <th className="py-2 px-2">Instructor Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-aec-navy/5">
                        {ex.results.map((r) => (
                          <tr key={r.id}>
                            <td className="py-2 px-2 font-medium text-aec-navy">{r.student.user.name}</td>
                            <td className="py-2 px-2 font-bold text-aec-navy">{r.score} / {ex.maxScore}</td>
                            <td className="py-2 px-2">
                              <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">
                                {r.grade || "Pass"}
                              </span>
                            </td>
                            <td className="py-2 px-2 text-aec-navy/60 italic">{r.remarks || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
