import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function FinanceExpensesPage() {
  const expenses = await prisma.expense.findMany({
    orderBy: { date: "desc" }
  });

  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <PortalShell role="Finance Portal" navItems={FINANCE_NAV} title="Expenses & Operational Outflows">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-aec-navy/70">
            Institutional expenses, utility costs, software subscriptions, and administrative outlays.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Total Outflows</p>
          <p className="text-xl font-bold text-rose-600">${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      <div className="card mt-6">
        {expenses.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No institutional expenses recorded yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Title</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-aec-navy/[0.02]">
                    <td className="py-3 px-2 text-xs text-aec-navy/70">
                      {e.date.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 font-medium text-aec-navy">{e.title}</td>
                    <td className="py-3 px-2">
                      <span className="rounded bg-aec-navy/5 px-2 py-0.5 text-xs font-semibold uppercase text-aec-navy">
                        {e.category}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-bold text-rose-600">
                      -${Number(e.amount).toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-xs text-aec-navy/60 italic">
                      {e.note || "—"}
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
