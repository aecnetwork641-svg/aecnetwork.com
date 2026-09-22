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

export default async function AdminAcademicsPage() {
  const [coursesCount, classesCount, programsCount, examsCount] = await Promise.all([
    prisma.course.count(),
    prisma.class.count(),
    prisma.program.count(),
    prisma.exam.count()
  ]);

  return (
    <PortalShell role="Admin Dashboard" navItems={ADMIN_NAV} title="Academic Management Hub">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Programs</p>
          <p className="mt-1 text-2xl font-bold text-aec-navy">{programsCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Courses</p>
          <p className="mt-1 text-2xl font-bold text-aec-navy">{coursesCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Class Cohorts</p>
          <p className="mt-1 text-2xl font-bold text-aec-navy">{classesCount}</p>
        </div>
        <div className="card">
          <p className="text-xs text-aec-navy/50 font-semibold uppercase">Exams</p>
          <p className="mt-1 text-2xl font-bold text-aec-navy">{examsCount}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Programs & Curriculum", href: "/academic/programs", desc: "Catalog of academic programs and course syllabi." },
          { title: "Classes & Cohorts", href: "/academic/classes", desc: "Rosters, caps, teacher allocations, platforms." },
          { title: "Master Timetable", href: "/academic/timetable", desc: "Institution-wide weekly schedule grid." },
          { title: "Attendance Oversight", href: "/academic/attendance", desc: "Institution-wide student attendance tracking." },
          { title: "Exams & Results", href: "/academic/exams", desc: "Exam scheduling, grades, and remarks." },
          { title: "Progress Reports", href: "/academic/reports", desc: "Term evaluation cards and teacher workloads." }
        ].map((item) => (
          <Link key={item.title} href={item.href as any} className="card hover:border-aec-teal transition-colors">
            <h3 className="font-bold text-aec-navy text-sm">{item.title}</h3>
            <p className="mt-1 text-xs text-aec-navy/70">{item.desc}</p>
            <span className="mt-3 inline-block text-xs font-semibold text-aec-blue">
              Open Module &rarr;
            </span>
          </Link>
        ))}
      </div>
    </PortalShell>
  );
}
