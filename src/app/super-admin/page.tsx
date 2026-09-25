import PortalShell from "@/components/PortalShell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { redirect } from "next/navigation";
import { isOneOf } from "@/lib/permissions";

const SUPER_ADMIN_NAV = [
  { label: "👑 Super Admin", href: "/super-admin" },
  { label: "🛡️ Admin Portal", href: "/admin" },
  { label: "🎓 Student Portal", href: "/student" },
  { label: "👨‍🏫 Teacher Portal", href: "/teacher" },
  { label: "👨‍👩‍👧 Parent Portal", href: "/parent" },
  { label: "📚 Academic Portal", href: "/academic" },
  { label: "👁️ Supervisor Hub", href: "/supervisor" },
  { label: "💰 Finance Portal", href: "/finance" },
  { label: "👥 HR & Staff", href: "/hr" },
  { label: "🔑 Users & Logins", href: "/admin/users" },
  { label: "⚙️ System Settings", href: "/admin/settings" },
  { label: "🔒 Security Logs", href: "/admin/audit-logs" }
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

  // All 9 Core Ecosystem Portals with direct links
  const allNinePortals = [
    {
      id: 1,
      title: "👑 Super Admin Master",
      href: "/super-admin",
      badge: "Root Control",
      desc: "System configuration, user accounts, audit trails, and master overview."
    },
    {
      id: 2,
      title: "🛡️ Admin Operations Portal",
      href: "/admin",
      badge: "School Ops",
      desc: "Student rosters, teacher directory, class cohorts, and admissions pipeline."
    },
    {
      id: 3,
      title: "🎓 Student Learning Portal",
      href: "/student",
      badge: `${totalStudents} Students`,
      desc: "Class schedules, homework assignments, submissions, exams, and grades."
    },
    {
      id: 4,
      title: "👨‍👩‍👧 Parent Portal",
      href: "/parent",
      badge: "Family Oversight",
      desc: "Children tracking, attendance records, progress report cards, and fee status."
    },
    {
      id: 5,
      title: "👨‍🏫 Teacher Portal",
      href: "/teacher",
      badge: `${totalTeachers} Faculty`,
      desc: "Mark attendance, grading homework, submit results, and classroom logs."
    },
    {
      id: 6,
      title: "📚 Academic Management",
      href: "/academic",
      badge: `${totalCourses} Curricula`,
      desc: "Curricula schemes, cohorts, timetable scheduling, and term grade sheets."
    },
    {
      id: 7,
      title: "👁️ Supervisor Quality Hub",
      href: "/supervisor",
      badge: "Quality Control",
      desc: "Live class observation, quality compliance, and instructor performance reviews."
    },
    {
      id: 8,
      title: "💰 Finance & Invoices",
      href: "/finance",
      badge: `$${totalRevenue.toLocaleString()} Revenue`,
      desc: "Fee collection, invoice generation, payment clearing, and expense ledgers."
    },
    {
      id: 9,
      title: "👥 HR & Staff Management",
      href: "/hr",
      badge: `${totalEmployees} Employees`,
      desc: "Staff files, attendance tracking, leave sign-offs, and monthly payroll."
    }
  ];

  return (
    <PortalShell role="Super Admin Dashboard" navItems={SUPER_ADMIN_NAV} title="AEC Network Root Command Center">
      {/* Master KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card border-l-4 border-l-emerald-500">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Total Net Collections</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-aec-navy/60 mt-1">${pendingFees.toLocaleString()} Pending dues</p>
        </div>
        <div className="card border-l-4 border-l-rose-500">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Operational Expenses</p>
          <p className="mt-1 text-3xl font-bold text-rose-600">${totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-aec-navy/60 mt-1">Total disbursements</p>
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

      {/* Secondary Metrics Row */}
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

      {/* Complete 9 Portals Direct Access Matrix */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-aec-navy">
              All 9 System Portals & Ecosystem Modules
            </h2>
            <p className="text-xs text-slate-500">
              Super Admin has direct root authority and unrestricted access to every portal in the system.
            </p>
          </div>
          <span className="rounded-full bg-aec-navy px-3 py-1 text-[11px] font-black uppercase tracking-wider text-aec-gold self-start sm:self-auto">
            9/9 Portals Active
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allNinePortals.map((p) => (
            <Link
              key={p.id}
              href={p.href as any}
              className="card hover:border-aec-teal hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-aec-navy text-sm group-hover:text-aec-teal transition">
                    {p.title}
                  </h3>
                  <span className="rounded bg-slate-100 group-hover:bg-aec-teal/10 px-2 py-0.5 text-[10px] font-bold text-slate-700 group-hover:text-aec-teal transition">
                    {p.badge}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-aec-blue">
                <span>Enter Portal</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
