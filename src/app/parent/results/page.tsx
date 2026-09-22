import PortalShell from "@/components/PortalShell";
import ChildSwitcher from "@/components/ChildSwitcher";
import ScopedDataNote from "@/components/ScopedDataNote";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentResultsPage({
  searchParams
}: {
  searchParams: { child?: string };
}) {
  const scope = await getCurrentParentScope(searchParams.child);

  const results =
    scope?.selectedChild
      ? await prisma.result.findMany({
          where: { studentId: scope.selectedChild.id },
          include: { exam: { include: { course: true } } },
          orderBy: { id: "desc" }
        })
      : [];

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Results">
      {!scope && <div className="card"><p className="text-sm text-aec-navy/50">Sign in as a parent to view this page.</p></div>}
      {scope && (
        <>
          <ChildSwitcher
            items={scope.children.map((c) => ({ id: c.id, name: c.user.name }))}
            selectedId={scope.selectedChild?.id ?? ""}
          />
          <div className="card">
            <p className="font-semibold text-aec-navy">
              {scope.selectedChild?.user.name ?? "No child selected"}'s Results
            </p>
            {results.length === 0 && <p className="mt-2 text-sm text-aec-navy/50">No results yet.</p>}
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
            <ScopedDataNote text="Only results for a child linked to your account are queried." />
          </div>
        </>
      )}
    </PortalShell>
  );
}
