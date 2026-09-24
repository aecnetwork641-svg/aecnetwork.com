import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentResultsPage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.studentId) {
    redirect("/login?error=AccessDenied");
  }

  const results = await prisma.result.findMany({
    where: { studentId: scope.studentId },
    include: {
      exam: { include: { course: true } }
    },
    orderBy: { exam: { date: "desc" } }
  });

  const avgScore = results.length > 0 ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length) : null;
  const overallGrade = avgScore ? (avgScore >= 90 ? "A+" : avgScore >= 80 ? "A" : avgScore >= 70 ? "B" : "C") : "N/A";

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Academic Results & Marksheets">
      {/* GPA Summary Card */}
      <div className="rounded-2xl bg-aec-navy p-6 text-white shadow-md mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-aec-gold uppercase tracking-wider">Overall Academic Record</span>
          <h2 className="font-display text-2xl font-bold mt-1">Average Score: {avgScore ? `${avgScore}%` : "Pending Evaluation"}</h2>
          <p className="text-xs text-white/70 mt-1">
            Standing: <strong className="text-white">Grade {overallGrade}</strong> • Total Exams Recorded: <span className="text-emerald-400 font-semibold">{results.length}</span>
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="font-bold text-slate-800 text-sm">No exam or assessment results published yet</p>
          <p className="text-xs text-slate-500 mt-1">Results will appear here once your instructor finalizes term evaluations.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((res) => (
            <div key={res.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                    {res.exam.course.title}
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900 mt-1">{res.exam.title}</h3>
                  <p className="text-xs text-slate-500">Exam Date: {new Date(res.exam.date).toLocaleDateString()}</p>
                </div>

                <div className="sm:text-right">
                  <span className="text-2xl font-black text-emerald-600">{res.score} / {res.exam.maxScore}</span>
                  <span className="block text-xs font-bold text-slate-700">Grade {res.grade}</span>
                </div>
              </div>

              {res.remarks && (
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs text-slate-700">
                  <span className="font-bold text-slate-900">Evaluator Remarks: </span>
                  <span className="italic">{res.remarks}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
