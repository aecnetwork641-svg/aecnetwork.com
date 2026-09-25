import PortalShell from "@/components/PortalShell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { redirect } from "next/navigation";
import { isOneOf } from "@/lib/permissions";

const SUPER_ADMIN_NAV = [
  { label: "Master Dashboard", href: "/super-admin" },
  { label: "Users & Logins", href: "/admin/users" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Security Logs", href: "/admin/audit-logs" },
  { label: "Finance & Accounts", href: "/finance" },
  { label: "HR & Payroll", href: "/hr" },
  { label: "Students", href: "/admin/students" },
  { label: "Teachers", href: "/admin/teachers" },
  { label: "Academics", href: "/admin/academics" },
  { label: "Admissions CRM", href: "/admin/admissions" },
  { label: "Supervisor Hub", href: "/supervisor" },
  { label: "Communication", href: "/admin/communication" }
];

export default async function SuperAdminDashboardPage() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

  let totalStudents = 0;
  let activeStudents = 0;
  let totalTeachers = 0;
  let totalEmployees = 0;
  let totalCourses = 0;
  let totalClasses = 0;
  let totalLeads = 0;
  let totalApplications = 0;
  let totalUsers = 0;
  let totalAttendances = 0;
  let presentAttendances = 0;
  let invoices: any[] = [];
  let payments: any[] = [];
  let expenses: any[] = [];
  let pendingLeaves = 0;
  let auditLogsCount = 0;
  let tasksCount = 0;
  let notificationsCount = 0;

  try {
    const [
      tS, aS, tT, tE, tC, tCl, tL, tA, tU, tAtt, pAtt,
      inv, pay, exp, pL, aLogs, tsk, notif
    ] = await Promise.all([
      prisma.student.count(),
      prisma.enrollment.count({ where: { status: "active" } }),
      prisma.teacher.count(),
      prisma.employee.count(),
      prisma.course.count(),
      prisma.class.count(),
      prisma.lead.count(),
      prisma.admissionApplication.count(),
      prisma.user.count(),
      prisma.attendance.count(),
      prisma.attendance.count({ where: { status: "present" } }),
      prisma.invoice.findMany(),
      prisma.payment.findMany(),
      prisma.expense.findMany(),
      prisma.leaveRequest.count({ where: { status: "pending" } }),
      prisma.auditLog.count(),
      prisma.task.count(),
      prisma.notification.count()
    ]);
    totalStudents = tS;
    activeStudents = aS;
    totalTeachers = tT;
    totalEmployees = tE;
    totalCourses = tC;
    totalClasses = tCl;
    totalLeads = tL;
    totalApplications = tA;
    totalUsers = tU;
    totalAttendances = tAtt;
    presentAttendances = pAtt;
    invoices = inv;
    payments = pay;
    expenses = exp;
    pendingLeaves = pL;
    auditLogsCount = aLogs;
    tasksCount = tsk;
    notificationsCount = notif;
  } catch (err) {
    console.error("[SUPER_ADMIN_DASHBOARD_QUERY_ERROR]", err);
  }

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingFees = invoices.filter((i) => i.status === "unpaid").reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const superModules = [
    {
      title: "Users & Portal Logins",
      href: "/admin/users",
      badge: `${totalUsers} Users`,
      desc: "Create accounts, reset passwords, manage system roles and user access."
    },
    {
      title: "Financial Management",
      href: "/finance",
      badge: `$${totalRevenue.toLocaleString()} Revenue`,
      desc: "Tuition plans, invoice dispatching, payment clearing & ledger accounting."
    },
    {
      title: "HR & Employee Payroll",
      href: "/hr",
      badge: `${totalEmployees} Staff`,
      desc: "Employee profiles, attendance, leave sign-offs, and monthly salary payroll."
    },
    {
      title: "System Settings & Demo",
      href: "/admin/settings",
      badge: "Master Config",
      desc: "System operational parameters, environment toggle, and institution profile."
    },
    {
      title: "Security & Audit Trail",
      href: "/admin/audit-logs",
      badge: `${auditLogsCount} Events`,
      desc: "Immutable activity logs for every critical admin and financial operation."
    },
    {
      title: "Admin Operations Portal",
      href: "/admin",
      badge: "School Operations",
      desc: "Student, teacher, parent, academics, supervisor & admissions hub."
    },
    {
      title: "Supervisor Quality Hub",
      href: "/supervisor",
      badge: "Quality Control",
      desc: "Live class observation, teacher quality assessment, and departmental oversight."
    },
    {
      title: "Academic Management",
      href: "/academic",
      badge: `${totalCourses} Courses`,
      desc: "Curricula, term cohorts, timetable scheduling, and grade reporting."
    }
  ];

  return (
    <PortalShell role="Super Admin Dashboard" navItems={SUPER_ADMIN_NAV} title="AEC Network Root Command Center">
      {/* Master KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card border-l-4 border-l-emerald-500">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Total Net Revenue</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-aec-navy/60 mt-1">${pendingFees.toLocaleString()} Pending dues</p>
        </div>
        <div className="card border-l-4 border-l-rose-500">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Operational Expenses</p>
          <p className="mt-1 text-3xl font-bold text-rose-600">${totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-aec-navy/60 mt-1">Total recorded disbursements</p>
        </div>
        <div className="card border-l-4 border-l-aec-navy">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">System Users & Logins</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalUsers}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{totalStudents} Students &bull; {totalTeachers} Teachers</p>
        </div>
        <div className="card border-l-4 border-l-amber-500">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Pending HR Requests</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">{pendingLeaves}</p>
          <p className="text-xs text-aec-navy/60 mt-1">Leaves awaiting executive approval</p>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">CRM Leads Pipeline</p>
          <p className="mt-0.5 text-xl font-bold text-aec-navy">{totalLeads}</p>
          <p className="text-[11px] text-aec-navy/60">{totalApplications} Formal applications</p>
        </div>
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">Active Enrollments</p>
          <p className="mt-0.5 text-xl font-bold text-aec-navy">{activeStudents}</p>
          <p className="text-[11px] text-aec-navy/60">{totalClasses} Active class cohorts</p>
        </div>
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">Security Audit Events</p>
          <p className="mt-0.5 text-xl font-bold text-aec-navy">{auditLogsCount}</p>
          <p className="text-[11px] text-aec-navy/60">Immutable logs recorded</p>
        </div>
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">Tasks & Alerts</p>
          <p className="mt-0.5 text-xl font-bold text-aec-navy">{tasksCount}</p>
          <p className="text-[11px] text-aec-navy/60">{notificationsCount} Broadcast notifications</p>
        </div>
      </div>

      {/* Super Admin Modules */}
      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-aec-navy/60 mb-4">
          Master Command & Executive Portals
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {superModules.map((m) => (
            <Link
              key={m.title}
              href={m.href as any}
              className="card hover:border-aec-teal transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-aec-navy text-sm">{m.title}</h3>
                  <span className="rounded bg-aec-navy/5 px-2 py-0.5 text-[10px] font-bold text-aec-navy">
                    {m.badge}
                  </span>
                </div>
                <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">{m.desc}</p>
              </div>
              <span className="mt-4 text-xs font-semibold text-aec-blue">
                Open Portal &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
