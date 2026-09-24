import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentFeedbackPage() {
  const scope = await getCurrentParentScope();
  if (!scope?.parent) {
    redirect("/login");
  }

  const { children } = scope;
  const childIds = children.map((c) => c.id);

  const feedbackList = await prisma.teacherFeedback.findMany({
    where: { studentId: { in: childIds } },
    include: {
      student: { include: { user: true } },
      teacher: { include: { user: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Teacher Feedback & Instructor Notes">
      <div className="space-y-4">
        {feedbackList.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-400 text-xs">
            No teacher remarks or feedback notes recorded yet for your children.
          </div>
        ) : (
          feedbackList.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2 py-0.5 rounded-full">
                    {item.student.user.name}
                  </span>
                  <h3 className="font-display text-sm font-bold text-slate-900 mt-1">
                    Instructor: {item.teacher.user.name}
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
                &ldquo;{item.body}&rdquo;
              </p>
            </div>
          ))
        )}
      </div>
    </PortalShell>
  );
}
