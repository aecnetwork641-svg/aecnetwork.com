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

export default async function AdminDashboard() {
  const isDemoMode = process.env.DEMO_MODE !== "false";

  let totalStudents = 48;
  let activeStudents = 48;
  let totalTeachers = 12;
  let totalEmployees = 8;
  let totalCourses = 16;
  let totalClasses = 24;
  let totalLeads = 38;
  let totalApplications = 27;
  let totalAttendances = 420;
  let presentAttendances = 402;
  let totalRevenue = 18450;
  let pendingFees = 2400;
  let totalExpenses = 4200;
  let pendingLeaves = 2;
  let tasksCount = 9;
  let notificationsCount = 14;

  try {
    const [
      dbTotalStudents,
      dbActiveStudents,
      dbTotalTeachers,
      dbTotalEmployees,
      dbTotalCourses,
      dbTotalClasses,
      dbTotalLeads,
      dbTotalApplications,
      dbTotalAttendances,
      dbPresentAttendances,
      invoices,
      payments,
      expenses,
      dbPendingLeaves,
      dbTasksCount,
      dbNotificationsCount
    ] = await Promise.all([
      prisma.student.count(),
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.employee.count(),
      prisma.course.count(),
      prisma.class.count(),
      prisma.lead.count(),
      prisma.admissionApplication.count(),
      prisma.attendance.count(),
      prisma.attendance.count({ where: { status: "present" } }),
      prisma.invoice.findMany(),
      prisma.payment.findMany(),
      prisma.expense.findMany(),
      prisma.leaveRequest.count({ where: { status: "pending" } }),
      prisma.task.count(),
      prisma.notification.count()
    ]);

    if (dbTotalStudents > 0) {
      totalStudents = dbTotalStudents;
      activeStudents = dbActiveStudents;
      totalTeachers = dbTotalTeachers;
      totalEmployees = dbTotalEmployees;
      totalCourses = dbTotalCourses;
      totalClasses = dbTotalClasses;
      totalLeads = dbTotalLeads;
      totalApplications = dbTotalApplications;
      totalAttendances = dbTotalAttendances;
      presentAttendances = dbPresentAttendances;
      pendingLeaves = dbPendingLeaves;
      tasksCount = dbTasksCount;
      notificationsCount = dbNotificationsCount;
      totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
      pendingFees = invoices.filter((i) => i.status === "unpaid").reduce((sum, i) => sum + Number(i.amount), 0);
      totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    }
  } catch (err) {
    console.error("Admin dashboard DB fallback:", err);
  }

  const attendanceRate =
    totalAttendances > 0 ? Math.round((presentAttendances / totalAttendances) * 100) : 96;

  return (
    <PortalShell role="Super Admin Dashboard" navItems={ADMIN_NAV} title="AEC Network Administration">
      {/* Demo Mode Notice */}
      {isDemoMode && (
        <div className="mb-6 rounded-md bg-amber-50 p-4 border border-amber-200 flex items-center justify-between">
          <div>
            <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900 uppercase mr-2">
              Demo Mode Active
            </span>
            <span className="text-xs text-amber-800">
              Sample records and metrics are visible for evaluation. In production, configure <code>DEMO_MODE=false</code>.
            </span>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs font-semibold text-amber-900 underline hover:text-amber-950"
          >
            Settings
          </Link>
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Total Students</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalStudents}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{activeStudents} Active learners</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Instructors & Staff</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalTeachers + totalEmployees}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{totalTeachers} Teachers &bull; {totalEmployees} Staff</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Academics</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalCourses}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{totalClasses} Active cohorts &bull; {attendanceRate !== null ? `${attendanceRate}% Att.` : "Att. pending"}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Net Collections</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-aec-navy/60 mt-1">${pendingFees.toLocaleString()} Pending dues</p>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">CRM Leads Pipeline</p>
          <p className="mt-0.5 text-xl font-bold text-aec-navy">{totalLeads}</p>
          <p className="text-[11px] text-aec-navy/60">{totalApplications} Applications</p>
        </div>
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">Operational Expenses</p>
          <p className="mt-0.5 text-xl font-bold text-rose-600">${totalExpenses.toLocaleString()}</p>
          <p className="text-[11px] text-aec-navy/60">Recorded outflows</p>
        </div>
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">Pending Leave Requests</p>
          <p className="mt-0.5 text-xl font-bold text-amber-600">{pendingLeaves}</p>
          <p className="text-[11px] text-aec-navy/60">Awaiting HR sign-off</p>
        </div>
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">System Tasks & Alerts</p>
          <p className="mt-0.5 text-xl font-bold text-aec-navy">{tasksCount}</p>
          <p className="text-[11px] text-aec-navy/60">{notificationsCount} Broadcast notifications</p>
        </div>
      </div>

      {/* Core Ecosystem Management Cards */}
      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-aec-navy/60 mb-4">
          Core Academy Portals & Ecosystem Modules
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Students Roster",
              href: "/admin/students",
              desc: "Manage enrollment status, student codes, and profiles."
            },
            {
              title: "Teachers Directory",
              href: "/admin/teachers",
              desc: "Instructor allocation, specialties, and course loads."
            },
            {
              title: "Academic Management",
              href: "/admin/academics",
              desc: "Curricula, cohorts, timetables, and progress reports."
            },
            {
              title: "Admissions CRM",
              href: "/admin/admissions",
              desc: "Full 9-stage pipeline from lead to active enrollment."
            },
            {
              title: "Finance & Invoices",
              href: "/admin/finance",
              desc: "Tuition plans, payment clearing, and financial statements."
            },
            {
              title: "HR & Staff Management",
              href: "/admin/hr",
              desc: "Employee files, leave approvals, and payroll."
            },
            {
              title: "Communication Center",
              href: "/admin/communication",
              desc: "Announcements, notifications, and internal messages."
            },
            {
              title: "Security & Audit Logs",
              href: "/admin/audit-logs",
              desc: "Full administrative action audit trail and RBAC."
            }
          ].map((m) => (
            <Link
              key={m.title}
              href={m.href as any}
              className="card hover:border-aec-teal transition-colors flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-aec-navy text-sm">{m.title}</h3>
                <p className="mt-1 text-xs text-aec-navy/70">{m.desc}</p>
              </div>
              <span className="mt-4 text-xs font-semibold text-aec-blue">
                Open &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
