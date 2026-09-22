import PortalShell from "@/components/PortalShell";
import ChildSwitcher from "@/components/ChildSwitcher";
import ScopedDataNote from "@/components/ScopedDataNote";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentFeesPage({
  searchParams
}: {
  searchParams: { child?: string };
}) {
  const scope = await getCurrentParentScope(searchParams.child);

  const invoices =
    scope?.selectedChild
      ? await prisma.invoice.findMany({
          where: { studentId: scope.selectedChild.id },
          include: { payments: true },
          orderBy: { dueDate: "desc" }
        })
      : [];

  const outstanding = invoices
    .filter((i) => i.status !== "paid" && i.status !== "cancelled")
    .reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Fees & Payments">
      {!scope && <div className="card"><p className="text-sm text-aec-navy/50">Sign in as a parent to view this page.</p></div>}
      {scope && (
        <>
          <ChildSwitcher
            items={scope.children.map((c) => ({ id: c.id, name: c.user.name }))}
            selectedId={scope.selectedChild?.id ?? ""}
          />

          <div className="card">
            <p className="text-xs text-aec-navy/50">Outstanding Balance</p>
            <p className="mt-1 text-2xl font-bold text-aec-navy">{outstanding.toFixed(2)}</p>
            <ScopedDataNote text="Sum of only this child's unpaid/overdue invoices." />
          </div>

          <div className="card mt-6">
            <p className="font-semibold text-aec-navy">Invoices & Payments</p>
            {invoices.length === 0 && <p className="mt-2 text-sm text-aec-navy/50">No invoices yet.</p>}
            {invoices.length > 0 && (
              <table className="mt-4 w-full text-left text-sm">
                <thead>
                  <tr className="text-aec-navy/50">
                    <th className="py-2">Due Date</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Payments</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((i) => (
                    <tr key={i.id} className="border-t border-aec-navy/5">
                      <td className="py-2">{i.dueDate.toDateString()}</td>
                      <td className="py-2">{Number(i.amount).toFixed(2)} {i.currency}</td>
                      <td className="py-2 capitalize">{i.status}</td>
                      <td className="py-2">{i.payments.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </PortalShell>
  );
}
