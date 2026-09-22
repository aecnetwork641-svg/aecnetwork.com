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

export default async function AdminHRPage() {
  const [empCount, deptCount, pendingLeaves] = await Promise.all([
    prisma.employee.count(),
    prisma.department.count(),
    prisma.leaveRequest.count({ where: { status: "pending" } })
  ]);

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Human Resources Hub">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Total Employees</p>
          <p className="mt-1 text-2xl font-bold text-aec-navy">{empCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Departments</p>
          <p className="mt-1 text-2xl font-bold text-aec-navy">{deptCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Pending Leave Requests</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{pendingLeaves}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Employee Directory", href: "/hr/employees", desc: "Staff profiles, job titles, and leave records." },
          { title: "Staff Attendance", href: "/hr/attendance", desc: "Daily staff check-ins, tardiness, and absences." },
          { title: "Leave Approvals", href: "/hr/leave", desc: "Review and approve staff leave requests." },
          { title: "Payroll & Salaries", href: "/hr/payroll", desc: "Monthly salary statements and components." }
        ].map((item) => (
          <Link key={item.title} href={item.href as any} className="card hover:border-aec-teal transition-colors">
            <h3 className="font-bold text-aec-navy text-sm">{item.title}</h3>
            <p className="mt-1 text-xs text-aec-navy/70">{item.desc}</p>
            <span className="mt-3 inline-block text-xs font-semibold text-aec-blue">
              Manage HR &rarr;
            </span>
          </Link>
        ))}
      </div>
    </PortalShell>
  );
}
