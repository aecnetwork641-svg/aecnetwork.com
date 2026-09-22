import PortalShell from "@/components/PortalShell";
import { FINANCE_NAV } from "../_nav";
import { prisma } from "@/lib/prisma";

export default async function FinancePaymentsPage() {
  const payments = await prisma.payment.findMany({
    include: {
      invoice: {
        include: { student: { include: { user: true } } }
      },
      refunds: true
    },
    orderBy: { paidAt: "desc" }
  });

  return (
    <PortalShell role="Finance Portal" navItems={FINANCE_NAV} title="Payments & Receipts">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Payment transaction log across cards, bank transfers, and cash collections.
        </p>
      </div>

      <div className="card mt-6">
        {payments.length === 0 ? (
          <p className="py-12 text-center text-sm text-aec-navy/50">
            No payments recorded in the system.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Student</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Payment Method</th>
                  <th className="py-3 px-2">Reference</th>
                  <th className="py-3 px-2">Invoice</th>
                  <th className="py-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aec-navy/5">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-aec-navy/[0.02]">
                    <td className="py-3 px-2 text-xs text-aec-navy/70">
                      {p.paidAt.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 font-medium text-aec-navy">
                      {p.invoice.student.user.name}
                    </td>
                    <td className="py-3 px-2 font-bold text-emerald-600">
                      +${Number(p.amount).toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-xs font-semibold capitalize text-aec-navy">
                      {p.method.replace("_", " ")}
                    </td>
                    <td className="py-3 px-2 text-xs font-mono text-aec-navy/60">
                      {p.reference || "Auto Receipt"}
                    </td>
                    <td className="py-3 px-2 text-xs font-mono text-aec-blue">
                      INV-{p.invoiceId.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-3 px-2 text-right text-xs">
                      <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">
                        Cleared
                      </span>
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
