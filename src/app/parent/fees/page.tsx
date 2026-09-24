import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { getCurrentParentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function ParentFeesPage() {
  const scope = await getCurrentParentScope();
  if (!scope?.parent) {
    redirect("/login");
  }

  const { children } = scope;
  const childIds = children.map((c) => c.id);

  const invoices = await prisma.invoice.findMany({
    where: { studentId: { in: childIds } },
    include: {
      student: { include: { user: true } },
      payments: true
    },
    orderBy: { dueDate: "desc" }
  });

  const unpaidInvoices = invoices.filter((i) => i.status !== "PAID");
  const outstandingTotal = unpaidInvoices.reduce((acc, i) => acc + Number(i.amount), 0);

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Family Tuition & Invoices">
      {/* Account Balance */}
      <div
        className={`rounded-2xl border p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          outstandingTotal > 0
            ? "border-amber-200 bg-amber-50/70"
            : "border-emerald-200 bg-emerald-50/70"
        }`}
      >
        <div>
          <span
            className={`text-xs font-semibold uppercase ${
              outstandingTotal > 0 ? "text-amber-800" : "text-emerald-800"
            }`}
          >
            Family Account Billing
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
            Outstanding Balance: ${outstandingTotal.toFixed(2)}
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            {outstandingTotal === 0
              ? "All child tuition fees for active terms are currently settled."
              : `You have ${unpaidInvoices.length} pending invoice(s) awaiting payment.`}
          </p>
        </div>

        <a
          href="https://wa.me/923435999397"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-aec-navy text-white px-5 py-2.5 text-xs font-bold hover:bg-aec-navy/90 transition shadow-sm text-center"
        >
          Billing Support (WhatsApp)
        </a>
      </div>

      {/* Invoices */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Official Invoices & Payment Slips</h3>
          <span className="text-xs text-slate-500">Prisma Ledger Verified</span>
        </div>

        {invoices.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No invoice records found for your family account.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-aec-navy">{inv.id}</span>
                    <span
                      className={`rounded-full text-[10px] font-bold px-2 py-0.5 ${
                        inv.status.toLowerCase() === "paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : inv.status.toLowerCase() === "unpaid"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">
                    {inv.student.user.name} — Due{" "}
                    {new Date(inv.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {inv.payments.length > 0 && inv.payments[0]
                      ? `Paid via ${inv.payments[0].method} (${inv.payments[0].reference || "Verified"})`
                      : "Awaiting payment transfer"}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-sm font-bold text-slate-900">
                    ${Number(inv.amount).toFixed(2)} {inv.currency}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Tuition / Academic Fee</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
