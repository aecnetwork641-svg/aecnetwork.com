import PortalShell from "@/components/PortalShell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { redirect } from "next/navigation";
import { isOneOf } from "@/lib/permissions";

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
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "HR", "HR_MANAGER", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

  let empCount = 8;
  let deptCount = 4;
  let pendingLeaves = 2;

  if (process.env.DATABASE_URL) {
    try {
      const [dbEmp, dbDept, dbLeaves] = await Promise.all([
        prisma.employee.count(),
        prisma.department.count(),
        prisma.leaveRequest.count({ where: { status: "pending" } })
      ]);
      if (dbEmp > 0) {
        empCount = dbEmp;
        deptCount = dbDept;
        pendingLeaves = dbLeaves;
      }
    } catch (err) {
      console.warn("[ADMIN_HR_DB_FALLBACK]", err);
    }
  }

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
