import PortalShell from "@/components/PortalShell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Students", href: "/admin/students" },
  { label: "Teachers", href: "/admin/teachers" },
  { label: "Academics", href: "/admin/academics" },
  { label: "Admissions", href: "/admin/admissions" },
  { label: "Finance", href: "/admin/finance" },
  { label: "HR", href: "/admin/hr" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Communication", href: "/admin/communication" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Audit Logs", href: "/admin/audit-logs" }
];

export default async function AdminFinancePage() {
  let invoicesCount = 38;
  let paymentsCount = 34;
  let expensesCount = 12;

  if (process.env.DATABASE_URL) {
    try {
      const [dbInvoices, dbPayments, dbExpenses] = await Promise.all([
        prisma.invoice.count(),
        prisma.payment.count(),
        prisma.expense.count()
      ]);
      if (dbInvoices > 0) {
        invoicesCount = dbInvoices;
        paymentsCount = dbPayments;
        expensesCount = dbExpenses;
      }
    } catch (err) {
      console.warn("[ADMIN_FINANCE_DB_FALLBACK]", err);
    }
  }

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Financial Management Hub">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Total Invoices</p>
          <p className="mt-1 text-2xl font-bold text-aec-navy">{invoicesCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Logged Payments</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{paymentsCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Operational Expenses</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">{expensesCount}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Student Billing", href: "/finance/invoices", desc: "Generate tuition invoices and track dues." },
          { title: "Receipts & Clearing", href: "/finance/payments", desc: "View payments, refunds, and bank proofs." },
          { title: "Expense Tracking", href: "/finance/expenses", desc: "Monitor utility, vendor, and operations outlays." },
          { title: "Financial Reports", href: "/finance/reports", desc: "Daily collections and balance statements." }
        ].map((item) => (
          <Link key={item.title} href={item.href as any} className="card hover:border-aec-teal transition-colors">
            <h3 className="font-bold text-aec-navy text-sm">{item.title}</h3>
            <p className="mt-1 text-xs text-aec-navy/70">{item.desc}</p>
            <span className="mt-3 inline-block text-xs font-semibold text-aec-blue">
              Launch Module &rarr;
            </span>
          </Link>
        ))}
      </div>
    </PortalShell>
  );
}
