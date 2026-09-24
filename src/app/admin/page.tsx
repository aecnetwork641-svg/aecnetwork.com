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

export default async function AdminDashboard() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "DIRECTOR", "STAFF", "ADMISSIONS", "ADMISSIONS_OFFICER"])) {
    redirect("/login?error=AccessDenied");
  }

  const [
    totalStudents,
    activeStudents,
    totalTeachers,
    totalEmployees,
    totalCourses,
    totalClasses,
    totalLeads,
    totalApplications,
    totalAttendances,
    presentAttendances,
    invoices,
    payments,
    expenses,
    pendingLeaves,
    tasksCount,
    notificationsCount
  ] = await Promise.all([
    prisma.student.count(),
    prisma.enrollment.count({ where: { status: "active" } }),
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

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingFees = invoices.filter((i) => i.status === "unpaid").reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const attendanceRate =
    totalAttendances > 0 ? Math.round((presentAttendances / totalAttendances) * 100) : 100;

  return (
    <PortalShell role="Super Admin Dashboard" navItems={ADMIN_NAV} title="AEC Network Administration">
      {/* Primary KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Total Students</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalStudents}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{activeStudents} Active enrollments</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Instructors & Staff</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalTeachers + totalEmployees}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{totalTeachers} Teachers &bull; {totalEmployees} Staff</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Academics</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalCourses}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{totalClasses} Active cohorts &bull; {attendanceRate}% Attendance</p>
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
              desc: "Full pipeline from lead to active enrollment."
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
