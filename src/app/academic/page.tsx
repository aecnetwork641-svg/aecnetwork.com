import PortalShell from "@/components/PortalShell";
import { ACADEMIC_NAV } from "./_nav";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AcademicDashboardPage() {
  const [
    totalStudents,
    totalTeachers,
    totalCourses,
    totalClasses,
    totalExams,
    totalAttendances,
    recentClasses,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.course.count(),
    prisma.class.count(),
    prisma.exam.count(),
    prisma.attendance.count(),
    prisma.class.findMany({
      take: 6,
      include: {
        teacher: { include: { user: true } },
        course: true,
        enrollments: true,
        timetableSlots: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const presentCount = await prisma.attendance.count({
    where: { status: "present" },
  });

  const overallAttendanceRate =
    totalAttendances > 0
      ? Math.round((presentCount / totalAttendances) * 100)
      : null;

  return (
    <PortalShell
      role="Academic Administration"
      navItems={ACADEMIC_NAV}
      title="Academic Overview"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">
            Students Enrolled
          </p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">
            {totalStudents}
          </p>
          <p className="mt-1 text-xs text-aec-navy/60">
            Active learners across courses
          </p>
        </div>

        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">
            Faculty Teachers
          </p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">
            {totalTeachers}
          </p>
          <p className="mt-1 text-xs text-aec-navy/60">
            Instructors on staff
          </p>
        </div>

        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">
            Curriculum Courses
          </p>
          <p className="mt-1 text-3xl font-bold text-aec-navy">
            {totalCourses}
          </p>
          <p className="mt-1 text-xs text-aec-navy/60">
            {totalClasses} Active class cohorts
          </p>
        </div>

        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wider text-aec-navy/50">
            Academy Attendance
          </p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">
            {overallAttendanceRate !== null
              ? `${overallAttendanceRate}%`
              : "—"}
          </p>
          <p className="mt-1 text-xs text-aec-navy/60">
            All-cohort presence average
          </p>
        </div>
      </div>

      {/* Academic Workflow Visualization */}
      <div className="card mt-8">
        <h2 className="border-b border-aec-navy/10 pb-3 text-sm font-bold uppercase tracking-wider text-aec-navy/60">
          AEC Academic Management Lifecycle
        </h2>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          {[
            "Student",
            "Program",
            "Course",
            "Class",
            "Teacher",
            "Timetable",
            "Attendance",
            "Assessment",
            "Result",
            "Progress Report",
          ].map((step, idx) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded bg-aec-navy/5 px-2.5 py-1 font-semibold text-aec-navy">
                {idx + 1}. {step}
              </span>

              {idx < 9 && (
                <span className="font-bold text-aec-navy/40">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Cohorts & Timetable Workload */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between border-b border-aec-navy/10 pb-3">
            <h3 className="text-base font-bold text-aec-navy">
              Active Class Cohorts
            </h3>

            <Link
              href="/academic/classes"
              className="text-xs font-medium text-aec-blue hover:underline"
            >
              Manage Classes &rarr;
            </Link>
          </div>

          {recentClasses.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">
              No classes scheduled.
            </p>
          ) : (
            <div className="mt-3 divide-y divide-aec-navy/5">
              {recentClasses.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between py-2.5 text-xs"
                >
                  <div>
                    <p className="font-semibold text-aec-navy">{c.name}</p>

                    <p className="text-aec-navy/50">
                      Course: {c.course.title} &bull; Teacher:{" "}
                      {c.teacher.user.name}
                    </p>
                  </div>

                  <span className="rounded bg-aec-blue/10 px-2 py-0.5 font-medium text-aec-blue">
                    {c.enrollments.length} Students
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Academic Head Quick Links */}
        <div className="card">
          <h3 className="border-b border-aec-navy/10 pb-3 text-base font-bold text-aec-navy">
            Administration Modules
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Programs & Courses",
                desc: "Catalog, syllabi, learning outcomes",
                href: "/academic/programs",
              },
              {
                title: "Class Allocation",
                desc: "Sections, teacher assignments, platforms",
                href: "/academic/classes",
              },
              {
                title: "Master Timetable",
                desc: "Weekly calendar and clash prevention",
                href: "/academic/timetable",
              },
              {
                title: "Progress Reports",
                desc: "Term evaluations and report cards",
                href: "/academic/reports",
              },
            ].map((m) => (
              <Link
                key={m.title}
                href={m.href as any}
                className="card hover:border-aec-teal transition-colors"
              >
                <p className="text-xs font-semibold text-aec-navy">
                  {m.title}
                </p>

                <p className="mt-1 text-[11px] text-aec-navy/60">
                  {m.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}