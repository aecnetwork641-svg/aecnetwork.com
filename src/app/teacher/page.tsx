import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "./_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherDashboard() {
  const scope = await getCurrentTeacherScope();
  if (!scope?.teacher) {
    redirect("/login?error=AccessDenied");
  }

  const { teacher } = scope;

  let classes: any[] = [];
  let courses: any[] = [];
  let submissions: any[] = [];
  let feedbacks: any[] = [];

  try {
    if (teacher.id && teacher.id !== "preview-teacher-id") {
      [classes, courses, submissions, feedbacks] = await Promise.all([
        prisma.class.findMany({
          where: { teacherId: teacher.id },
          include: {
            course: true,
            timetableSlots: true,
            enrollments: { include: { student: { include: { user: true } } } },
            attendances: { where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }
          }
        }),
        prisma.course.findMany({
          where: { primaryInstructorId: teacher.id }
        }),
        prisma.submission.findMany({
          where: {
            assignment: { course: { primaryInstructorId: teacher.id } },
            score: null
          },
          include: { student: { include: { user: true } }, assignment: true }
        }),
        prisma.teacherFeedback.findMany({
          where: { teacherId: teacher.id },
          include: { student: { include: { user: true } } },
          orderBy: { createdAt: "desc" },
          take: 4
        })
      ]);
    }
  } catch (err) {
    console.error("[TEACHER_DASHBOARD_QUERY_ERROR]", err);
  }

  // Aggregate assigned students across classes
  const assignedStudentIds = new Set<string>();
  classes.forEach((c: any) => (c.enrollments || []).forEach((e: any) => {
    if (e?.studentId) assignedStudentIds.add(e.studentId);
  }));
  const totalAssignedStudents = assignedStudentIds.size;

  const teacherName = teacher.user?.name || "Faculty Member";
  const teacherInitial = teacherName.charAt(0).toUpperCase() || "T";
  const specialtiesList = Array.isArray(teacher.specialties) && teacher.specialties.length > 0 
    ? teacher.specialties.join(", ") 
    : "General Faculty";

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title={`Instructor Dashboard`}>
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-aec-gold/20 border border-aec-gold/40 text-aec-gold text-2xl font-black">
              {teacherInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold">{teacherName}</h2>
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2.5 py-0.5">
                  Faculty Member
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1">
                Faculty Code: <span className="font-mono text-aec-gold font-bold">{teacher.teacherCode || "AEC-FACULTY"}</span> • Specialties: <strong>{specialtiesList}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/teacher/attendance"
              className="rounded-xl bg-aec-gold px-4 py-2 text-xs font-bold text-aec-navy hover:bg-aec-gold/90 transition shadow-md"
            >
              Mark Attendance
            </Link>
            <Link
              href="/teacher/assignments"
              className="rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition"
            >
              Grade Submissions ({submissions.length})
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Quick KPI Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Cohorts / Classes</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{classes.length}</p>
          <p className="mt-1 text-[11px] text-slate-500">Assigned live teaching groups</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Assigned Students</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{totalAssignedStudents}</p>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">Enrolled in your classes</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Submissions to Grade</p>
          <p className={`mt-2 text-2xl font-bold ${submissions.length > 0 ? "text-amber-600" : "text-emerald-600"}`}>
            {submissions.length}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">{submissions.length === 0 ? "All caught up" : "Awaiting your evaluation"}</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Courses Led</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{courses.length}</p>
          <p className="mt-1 text-[11px] text-slate-500">Primary instructor curricula</p>
        </div>
      </div>

      {/* 3. Assigned Classes and Timetable */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-slate-900">Your Teaching Classes</h3>
              <Link href="/teacher/classes" className="text-xs font-semibold text-aec-navy hover:underline">
                View All &rarr;
              </Link>
            </div>

            {classes.length === 0 ? (
              <p className="text-xs text-slate-500 py-4">No active classes assigned yet. The academic head will assign cohorts to your schedule.</p>
            ) : (
              <div className="space-y-4">
                {classes.map((cls) => (
                  <div key={cls.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-aec-navy/10 text-aec-navy px-2 py-0.5 rounded-md">
                          {cls.course.title}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">{cls.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {cls.enrollments.length} Students Enrolled • Platform: <strong className="text-slate-700">{cls.meetingPlatform}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {cls.meetingLink && (
                          <a
                            href={cls.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition"
                          >
                            Start Session
                          </a>
                        )}
                        <Link
                          href={`/teacher/attendance`}
                          className="rounded-lg bg-aec-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-aec-navy/90 transition"
                        >
                          Attendance
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Pending Homework to Grade */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-slate-900">Pending Grading</h3>
              <Link href="/teacher/assignments" className="text-xs font-semibold text-aec-navy hover:underline">
                View All
              </Link>
            </div>

            {submissions.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">No pending submissions awaiting grading.</p>
            ) : (
              <div className="space-y-3">
                {submissions.slice(0, 4).map((sub) => (
                  <div key={sub.id} className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/40 text-xs">
                    <p className="font-bold text-slate-900">{sub.student?.user?.name || "Student"}</p>
                    <p className="text-slate-600 mt-0.5 line-clamp-1">{sub.assignment?.title || "Assignment"}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : ""}</span>
                      <Link href="/teacher/assignments" className="font-bold text-aec-navy hover:underline">
                        Review & Grade &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-slate-900 mb-3">Recent Feedback Sent</h3>
            {feedbacks.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">No feedback notes recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {feedbacks.map((f) => (
                  <div key={f.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>To: {f.student?.user?.name || "Student"}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{f.createdAt ? new Date(f.createdAt).toLocaleDateString() : ""}</span>
                    </div>
                    <p className="text-slate-600 mt-1 italic">&ldquo;{f.body}&rdquo;</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
