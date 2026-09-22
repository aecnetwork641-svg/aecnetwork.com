import PortalShell from "@/components/PortalShell";
import ChildSwitcher from "@/components/ChildSwitcher";
import ScopedDataNote from "@/components/ScopedDataNote";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentAttendancePage({
  searchParams
}: {
  searchParams: { child?: string };
}) {
  const scope = await getCurrentParentScope(searchParams.child);

  // The child id used below always comes from scope.selectedChild, which
  // getCurrentParentScope() has already validated against this parent's
  // own children — never taken directly from searchParams.child.
  const records =
    scope?.selectedChild
      ? await prisma.attendance.findMany({
          where: { studentId: scope.selectedChild.id },
          orderBy: { date: "desc" },
          take: 20,
          include: { class: true }
        })
      : [];

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Attendance">
      {!scope && <div className="card"><p className="text-sm text-aec-navy/50">Sign in as a parent to view this page.</p></div>}
      {scope && (
        <>
          <ChildSwitcher
            items={scope.children.map((c) => ({ id: c.id, name: c.user.name }))}
            selectedId={scope.selectedChild?.id ?? ""}
          />
          <div className="card">
            <p className="font-semibold text-aec-navy">
              {scope.selectedChild?.user.name ?? "No child selected"}'s Attendance
            </p>
            {records.length === 0 && <p className="mt-2 text-sm text-aec-navy/50">No records yet.</p>}
            {records.length > 0 && (
              <table className="mt-4 w-full text-left text-sm">
                <thead>
                  <tr className="text-aec-navy/50">
                    <th className="py-2">Date</th>
                    <th className="py-2">Class</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id} className="border-t border-aec-navy/5">
                      <td className="py-2">{r.date.toDateString()}</td>
                      <td className="py-2">{r.class.name}</td>
                      <td className="py-2 capitalize">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <ScopedDataNote text="Only attendance for a child linked to your account is queried." />
          </div>
        </>
      )}
    </PortalShell>
  );
}
