import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentPaymentsPage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.studentId) {
    redirect("/login?error=AccessDenied");
  }

  const payments = await prisma.payment.findMany({
    where: { invoice: { studentId: scope.studentId } },
    include: { invoice: true },
    orderBy: { paidAt: "desc" }
  });

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Payment Records & Gateway Logs">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-2">Verified Payment Transactions</h2>
        <p className="text-xs text-slate-500">
          All transactions are processed securely through bank transfer and digital payment gateways with official confirmation.
        </p>

        {payments.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No completed payments recorded yet.
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {payments.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-800">TXN-{item.id.slice(-8)}</span>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5">Tuition Settlement</p>
                  <p className="text-[11px] text-slate-500">
                    Paid: {new Date(item.paidAt).toLocaleDateString()} &bull; Method: {item.method.replace("_", " ")} &bull; Ref: {item.reference || "Direct"}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-sm font-bold text-emerald-600 block">${Number(item.amount).toFixed(2)} USD</span>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                    Settled Successfully
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
