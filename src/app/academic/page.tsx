import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "./_nav";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export default async function AcademicDashboard() {
  const { userId, role } = await getCurrentUserSession();
  if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "ACADEMIC_ADMIN", "ACADEMIC_HEAD", "DIRECTOR"])) {
    redirect("/login?error=AccessDenied");
  }

  const [programsCount, coursesCount, classesCount, studentsCount, teachersCount, totalAtt, presentAtt] = await Promise.all([
    prisma.program.count(),
    prisma.course.count(),
    prisma.class.count(),
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.attendance.count(),
    prisma.attendance.count({ where: { status: "present" } })
  ]);

  const avgAttendance = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100;

  const stats = [
    { label: "Active Programs", value: `${programsCount} Programs`, desc: `${coursesCount} structured courses` },
    { label: "Enrolled Learners", value: `${studentsCount} Students`, desc: "In active cohorts" },
    { label: "Faculty Members", value: `${teachersCount} Teachers`, desc: "Assigned instructors" },
    { label: "Class Attendance", value: `${avgAttendance}%`, desc: "Academy-wide rate" }
  ];

  const recentClasses = await prisma.class.findMany({
    include: { course: true, teacher: { include: { user: true } }, enrollments: true },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  return (
    <PortalShell role="Academic Administration" navItems={ACADEMIC_NAV} title="Academic Management Overview">
      {/* 1. Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-aec-gold uppercase tracking-wider">Academic Head</span>
            <h2 className="font-display text-2xl font-bold mt-0.5">AEC Academic Governance & Curriculum</h2>
            <p className="text-xs text-white/70 mt-1">
              Active Cohorts: <strong className="text-white">{classesCount} Classes</strong> • Connected Curriculum & Faculty Oversight
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/academic/programs" className="rounded-xl bg-aec-gold text-aec-navy font-bold text-xs px-4 py-2 hover:bg-aec-gold/90 transition shadow">
              Manage Programs
            </Link>
            <Link href="/academic/classes" className="rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs px-4 py-2 hover:bg-white/20 transition">
              Allocate Classes
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((s, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">{s.label}</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{s.value}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Recent Academic Classes */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-display text-base font-bold text-slate-900 mb-4">Active Academic Cohorts</h3>
        {recentClasses.length === 0 ? (
          <p className="text-xs text-slate-500 py-3">No cohorts configured yet. Create a class and assign a teacher to start.</p>
        ) : (
          <div className="space-y-3">
            {recentClasses.map((cls) => (
              <div key={cls.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-slate-900">{cls.name}</span>
                  <span className="text-slate-500 block mt-0.5">
                    Course: <strong>{cls.course.title}</strong> &bull; Teacher: {cls.teacher.user.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-0.5">
                    {cls.enrollments.length} Learners
                  </span>
                  <span className="rounded-full bg-aec-navy/10 text-aec-navy font-bold text-[10px] px-2.5 py-0.5">
                    {cls.meetingPlatform}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}