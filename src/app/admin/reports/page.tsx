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

export default async function AdminReportsPage() {
  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Executive Analytics & Reporting">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Cross-departmental reports covering Academics, Finance, HR, and Admissions pipelines.
        </p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            category: "Academics",
            title: "Academic Performance",
            desc: "Class attendance percentages, exam grades, and progress card completions.",
            href: "/academic/reports"
          },
          {
            category: "Finance",
            title: "Financial Collections",
            desc: "Daily receipts, outstanding tuition balances, and operational cashflow.",
            href: "/finance/reports"
          },
          {
            category: "Human Resources",
            title: "Staff & Payroll Summary",
            desc: "Department headcounts, leave utilization, and monthly salary disbursement.",
            href: "/hr/payroll"
          },
          {
            category: "Admissions",
            title: "CRM Conversion Funnel",
            desc: "Lead acquisition sources, trial booking completions, and active conversions.",
            href: "/admin/admissions"
          }
        ].map((rep) => (
          <div key={rep.title} className="card flex flex-col justify-between">
            <div>
              <span className="rounded bg-aec-navy/5 px-2 py-0.5 text-[10px] font-bold uppercase text-aec-navy">
                {rep.category}
              </span>
              <h3 className="mt-2 font-bold text-aec-navy text-sm">{rep.title}</h3>
              <p className="mt-1 text-xs text-aec-navy/70 leading-relaxed">{rep.desc}</p>
            </div>
            <Link
              href={rep.href}
              className="mt-4 inline-block text-xs font-semibold text-aec-blue hover:underline"
            >
              View Statement &rarr;
            </Link>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
