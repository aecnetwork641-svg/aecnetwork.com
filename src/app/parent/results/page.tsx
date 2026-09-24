import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentResultsPage() {
  const scope = await getCurrentParentScope();
  if (!scope?.parent) {
    redirect("/login");
  }

  const { children } = scope;
  const childIds = children.map((c) => c.id);

  const results = await prisma.result.findMany({
    where: { studentId: { in: childIds } },
    include: {
      student: { include: { user: true } },
      exam: { include: { course: true } }
    },
    orderBy: { exam: { date: "desc" } }
  });

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Exam Results & Marksheets">
      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-400 text-xs">
            No formal examination results posted yet for your children.
          </div>
        ) : (
          results.map((res) => {
            const percentage = Math.round((res.score / (res.exam?.maxScore || 100)) * 100);
            return (
              <div key={res.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                      {res.student.user.name}
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 mt-1">
                      {res.exam.course.title}
                    </h3>
                    <p className="text-xs text-slate-500">{res.exam.title}</p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-2xl font-black text-emerald-600">{percentage}%</span>
                    <span className="block text-xs font-bold text-slate-700">
                      Score: {res.score} / {res.exam?.maxScore || 100}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs text-slate-700">
                  <span className="font-bold text-slate-900">Evaluation Date: </span>
                  <span>
                    {new Date(res.exam.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </PortalShell>
  );
}
