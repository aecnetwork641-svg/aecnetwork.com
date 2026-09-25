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
  { label: "Admissions CRM", href: "/admin/admissions" },
  { label: "Supervisor Hub", href: "/supervisor" },
  { label: "Parent View", href: "/parent" },
  { label: "Academic Reports", href: "/admin/reports" },
  { label: "Communication", href: "/admin/communication" }
];

export default async function AdminDashboard() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "DIRECTOR", "STAFF", "ADMISSIONS", "ADMISSIONS_OFFICER", "ACADEMIC_ADMIN", "ACADEMIC_HEAD"])) {
    redirect("/login?error=AccessDenied");
  }

  let totalStudents = 0;
  let activeStudents = 0;
  let totalTeachers = 0;
  let totalCourses = 0;
  let totalClasses = 0;
  let totalLeads = 0;
  let totalApplications = 0;
  let totalAttendances = 0;
  let presentAttendances = 0;
  let tasksCount = 0;
  let notificationsCount = 0;

  try {
    const [
      tS, aS, tT, tC, tCl, tL, tA, tAtt, pAtt,
      tsk, notif
    ] = await Promise.all([
      prisma.student.count(),
      prisma.enrollment.count({ where: { status: "active" } }),
      prisma.teacher.count(),
      prisma.course.count(),
      prisma.class.count(),
      prisma.lead.count(),
      prisma.admissionApplication.count(),
      prisma.attendance.count(),
      prisma.attendance.count({ where: { status: "present" } }),
      prisma.task.count(),
      prisma.notification.count()
    ]);
    totalStudents = tS;
    activeStudents = aS;
    totalTeachers = tT;
    totalCourses = tC;
    totalClasses = tCl;
    totalLeads = tL;
    totalApplications = tA;
    totalAttendances = tAtt;
    presentAttendances = pAtt;
    tasksCount = tsk;
    notificationsCount = notif;
  } catch (err) {
    console.error("[ADMIN_DASHBOARD_QUERY_ERROR]", err);
  }

  const attendanceRate =
    totalAttendances > 0 ? Math.round((presentAttendances / totalAttendances) * 100) : 100;

  const adminModules = [
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
      title: "Supervisor Hub",
      href: "/supervisor",
      desc: "Live class observation, quality monitoring, and staff reviews."
    },
    {
      title: "Parent Portal View",
      href: "/parent",
      desc: "Parent accounts, linked student progress, and parent feedback."
    },
    {
      title: "Admissions CRM",
      href: "/admin/admissions",
      desc: "Full pipeline from lead to active enrollment."
    },
    {
      title: "Academic Reports",
      href: "/admin/reports",
      desc: "Attendance metrics, student evaluation sheets, and grade records."
    },
    {
      title: "Communication Center",
      href: "/admin/communication",
      desc: "Announcements, notifications, and internal messages."
    }
  ];

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="AEC Admin Operations Center">
      {/* Primary KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Total Students</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalStudents}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{activeStudents} Active enrollments</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Instructors & Faculty</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalTeachers}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{totalTeachers} Active Teaching Staff</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Academics & Cohorts</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalCourses}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{totalClasses} Active cohorts &bull; {attendanceRate}% Attendance</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase tracking-wider">Admissions & Leads</p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">{totalLeads}</p>
          <p className="text-xs text-aec-navy/60 mt-1">{totalApplications} Applications in pipeline</p>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">CRM Leads Pipeline</p>
          <p className="mt-0.5 text-xl font-bold text-aec-navy">{totalLeads}</p>
          <p className="text-[11px] text-aec-navy/60">{totalApplications} Inquiries</p>
        </div>
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">Class Attendance Rate</p>
          <p className="mt-0.5 text-xl font-bold text-emerald-600">{attendanceRate}%</p>
          <p className="text-[11px] text-aec-navy/60">{presentAttendances} of {totalAttendances} marked present</p>
        </div>
        <div className="card py-3">
          <p className="text-[11px] text-aec-navy/50 font-semibold uppercase">Tasks & Alerts</p>
          <p className="mt-0.5 text-xl font-bold text-aec-navy">{tasksCount}</p>
          <p className="text-[11px] text-aec-navy/60">{notificationsCount} Broadcast notifications</p>
        </div>
      </div>

      {/* Core Ecosystem Management Cards */}
      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-aec-navy/60 mb-4">
          Admin Operations & Accessible Portals
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adminModules.map((m) => (
            <Link
              key={m.title}
              href={m.href as any}
              className="card hover:border-aec-teal transition-all hover:shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-aec-navy text-sm">{m.title}</h3>
                <p className="mt-1 text-xs text-aec-navy/70 leading-relaxed">{m.desc}</p>
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
