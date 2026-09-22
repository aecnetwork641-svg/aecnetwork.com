import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function FinanceInvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      student: { include: { user: true } },
      payments: true,
      discounts: true
    },
    orderBy: { issuedAt: "desc" }
  });

  return (
    <PortalShell role="Finance Portal" navItems={FINANCE_NAV} title="Student Fee Invoices">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Tuition bills, monthly fees, one-time charges, and payment tracking.
        </p>
      </div>

      <div className="card mt-6">
        {invoices.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No fee invoices currently issued.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Invoice #</th>
                  <th className="py-3 px-2">Student</th>
                  <th className="py-3 px-2">Total Amount</th>
                  <th className="py-3 px-2">Paid Amount</th>
                  <th className="py-3 px-2">Due Date</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {invoices.map((inv) => {
                  const paidTotal = inv.payments.reduce((sum, p) => sum + Number(p.amount), 0);
                  const isOverdue =
                    inv.status === "unpaid" && new Date(inv.dueDate) < new Date();

                  return (
                    <tr key={inv.id} className="hover:bg-aec-navy/[0.02]">
                      <td className="py-3 px-2 font-mono text-xs text-aec-navy/70">
                        INV-{inv.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="py-3 px-2 font-medium text-aec-navy">
                        {inv.student.user.name}
                      </td>
                      <td className="py-3 px-2 font-bold text-aec-navy">
                        ${Number(inv.amount).toFixed(2)}
                      </td>
                      <td className="py-3 px-2 text-xs font-semibold text-emerald-600">
                        ${paidTotal.toFixed(2)}
                      </td>
                      <td className="py-3 px-2 text-xs text-aec-navy/70">
                        {inv.dueDate.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2 text-xs">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-semibold capitalize ${
                            inv.status === "paid" || paidTotal >= Number(inv.amount)
                              ? "bg-emerald-50 text-emerald-700"
                              : isOverdue
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {paidTotal >= Number(inv.amount) ? "paid" : isOverdue ? "overdue" : inv.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          type="button"
                          className="rounded bg-aec-navy/5 px-2.5 py-1 text-xs font-medium text-aec-navy hover:bg-aec-navy/10"
                        >
                          Print / Receipt
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
