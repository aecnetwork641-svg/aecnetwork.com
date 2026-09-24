import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentFeesPage() {
  const scope = await getCurrentStudentScope();
  if (!scope?.studentId) {
    redirect("/login?error=AccessDenied");
  }

  const invoices = await prisma.invoice.findMany({
    where: { studentId: scope.studentId },
    include: { payments: true },
    orderBy: { issuedAt: "desc" }
  });

  const unpaidInvoices = invoices.filter((i) => i.status === "unpaid");
  const totalOutstanding = unpaidInvoices.reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Tuition Fees & Invoices">
      {/* Current Balance Banner */}
      <div className={`rounded-2xl border p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        totalOutstanding === 0 ? "border-emerald-200 bg-emerald-50/70" : "border-amber-200 bg-amber-50/70"
      }`}>
        <div>
          <span className={`text-xs font-semibold uppercase tracking-wider ${
            totalOutstanding === 0 ? "text-emerald-800" : "text-amber-800"
          }`}>
            Account Balance
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
            Outstanding: ${totalOutstanding.toFixed(2)} USD
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            {totalOutstanding === 0
              ? "All issued tuition fees are settled."
              : `You have ${unpaidInvoices.length} pending tuition invoice(s).`}
          </p>
        </div>

        <Link
          href="/student/payments"
          className="rounded-xl bg-aec-navy text-white px-5 py-2.5 text-xs font-bold hover:bg-aec-navy/90 transition shadow-sm text-center"
        >
          View Payment History
        </Link>
      </div>

      {/* Invoices List */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Billing & Invoice Records</h3>
          <span className="text-xs text-slate-500">{invoices.length} Total</span>
        </div>

        {invoices.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No invoices generated yet for this student account.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-aec-navy">INV-{inv.id.slice(-6)}</span>
                    <span className={`rounded-full text-[10px] font-bold px-2.5 py-0.5 uppercase ${
                      inv.status === "paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {inv.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">Tuition Fee</h4>
                  <p className="text-[11px] text-slate-500">
                    Issued: {new Date(inv.issuedAt).toLocaleDateString()} &bull; Due: {new Date(inv.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between">
                  <div>
                    <span className="text-sm font-black text-slate-900">${Number(inv.amount).toFixed(2)} {inv.currency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
