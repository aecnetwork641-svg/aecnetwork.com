import Link from "next/link";
import { redirect } from "next/navigation";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "./_nav";
import { getCurrentStudentScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function StudentDashboard() {
  const scope = await getCurrentStudentScope();
  if (!scope?.student) {
    redirect("/login?error=AccessDenied");
  }

  const { student } = scope;

  // Real Database Queries for this authenticated student
  const [enrollments, attendances, submissions, assignments, results, invoices, feedbacks] = await Promise.all([
    prisma.enrollment.findMany({
      where: { studentId: student.id },
      include: {
        course: {
          include: {
            primaryInstructor: { include: { user: true } },
            modules: { include: { lessons: true } }
          }
        },
        class: {
          include: {
            teacher: { include: { user: true } },
            timetableSlots: true
          }
        }
      }
    }),
    prisma.attendance.findMany({
      where: { studentId: student.id },
      orderBy: { date: "desc" },
      take: 20
    }),
    prisma.submission.findMany({
      where: { studentId: student.id },
      include: { assignment: true }
    }),
    prisma.assignment.findMany({
      where: {
        course: {
          enrollments: { some: { studentId: student.id, status: "active" } }
        }
      },
      orderBy: { dueDate: "asc" }
    }),
    prisma.result.findMany({
      where: { studentId: student.id },
      include: { exam: { include: { course: true } } },
      orderBy: { exam: { date: "desc" } }
    }),
    prisma.invoice.findMany({
      where: { studentId: student.id },
      orderBy: { issuedAt: "desc" }
    }),
    prisma.teacherFeedback.findMany({
      where: { studentId: student.id },
      include: { teacher: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
      take: 3
    })
  ]);

  // Attendance metrics
  const totalAttendances = attendances.length;
  const presentCount = attendances.filter((a) => a.status === "present").length;
  const attendanceRate = totalAttendances > 0 ? Math.round((presentCount / totalAttendances) * 100) : 100;

  // Pending assignments calculation
  const submittedAssignmentIds = new Set(submissions.map((s) => s.assignmentId));
  const pendingAssignments = assignments.filter((a) => !submittedAssignmentIds.has(a.id));

  // Fee dues
  const unpaidInvoices = invoices.filter((i) => i.status === "unpaid");
  const feeStatus = unpaidInvoices.length === 0 ? "Paid & Cleared" : `${unpaidInvoices.length} Dues Pending`;

  // GPA / Average score
  const avgScore = results.length > 0 ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length) : null;
  const letterGrade = avgScore ? (avgScore >= 90 ? "A+" : avgScore >= 80 ? "A" : avgScore >= 70 ? "B" : "C") : "N/A";

  const primaryProgram = enrollments[0]?.course?.title || "Enrolled in Academy";
  const activeClass = enrollments.find((e) => e.class)?.class;

  const studentName = student.user?.name || "Student";
  const studentInitial = studentName.charAt(0).toUpperCase() || "S";

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title={`Welcome back, ${studentName}`}>
      {/* 1. Student Identity Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-aec-gold/20 border border-aec-gold/40 text-aec-gold text-2xl font-black">
              {studentInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold">{studentName}</h2>
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2.5 py-0.5">
                  Active Student
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1">
                Student ID: <span className="font-mono text-aec-gold font-bold">{student.studentCode || "AEC-STUDENT"}</span> • Program: <strong className="text-white/90">{primaryProgram}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/student/classes"
              className="rounded-xl bg-aec-gold px-4 py-2 text-xs font-bold text-aec-navy hover:bg-aec-gold/90 transition shadow-md"
            >
              My Classes
            </Link>
            <Link
              href="/student/assignments"
              className="rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition"
            >
              Assignments ({pendingAssignments.length})
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Performance Metric Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Attendance Rate</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 text-xs font-bold">
              {attendanceRate}%
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{attendanceRate}%</p>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${attendanceRate}%` }}></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Enrolled Courses</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 text-xs font-bold">
              {enrollments.length}
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{enrollments.length} Active</p>
          <p className="mt-1 text-[11px] text-slate-500">Structured LMS curriculum</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Academic Standing</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 text-xs font-bold">
              {letterGrade}
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{avgScore ? `${avgScore}% Average` : "Graded on Evaluation"}</p>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">{results.length} Exam(s) Recorded</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fee Status</p>
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
              unpaidInvoices.length === 0 ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-700"
            }`}>
              {unpaidInvoices.length === 0 ? "✓" : "!"}
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{unpaidInvoices.length === 0 ? "Up to Date" : "Pending"}</p>
          <p className="mt-1 text-[11px] text-slate-500">{feeStatus}</p>
        </div>
      </div>

      {/* 3. Live Class Join Banner + Enrolled Courses */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left: Next Live Class & Enrolled Courses */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live class card */}
          {activeClass ? (
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 to-white p-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Scheduled Cohort Session
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mt-1">
                    {activeClass.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Instructor: <strong className="text-slate-800">{activeClass.teacher?.user?.name || "Assigned Faculty"}</strong> • Platform: <span className="font-semibold text-emerald-700">{activeClass.meetingPlatform || "Online"}</span>
                  </p>
                </div>

                {activeClass.meetingLink ? (
                  <a
                    href={activeClass.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 text-sm font-bold shadow-md hover:shadow-lg transition duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Join Class</span>
                  </a>
                ) : (
                  <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-500">Meeting Link Pending</span>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-sm font-bold text-slate-800">No active class scheduled yet</p>
              <p className="text-xs text-slate-500 mt-1">You will receive an automated alert when your tutor assigns your class timetable.</p>
            </div>
          )}

          {/* Enrolled Courses Overview */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-slate-900">Enrolled Courses & LMS</h3>
              <Link href="/courses" className="text-xs font-semibold text-aec-navy hover:underline">
                Explore All Courses &rarr;
              </Link>
            </div>

            {enrollments.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500">
                You are not enrolled in any courses currently.{" "}
                <Link href="/courses" className="text-aec-navy font-bold underline">
                  Browse catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.map((e) => (
                  <div key={e.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{e.course.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Instructor: {e.course.primaryInstructor?.user?.name || "Assigned Faculty"} • Status: <span className="text-emerald-700 font-medium capitalize">{e.status}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/courses/${e.course.slug}`}
                          className="rounded-lg bg-aec-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-aec-navy/90 transition"
                        >
                          View Curriculum
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pending Homework & Teacher Remarks */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pending assignments */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-slate-900">Pending Homework</h3>
              <Link href="/student/assignments" className="text-xs font-semibold text-aec-navy hover:underline">
                All ({assignments.length})
              </Link>
            </div>

            {pendingAssignments.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">No pending homework assignments. All caught up!</p>
            ) : (
              <div className="space-y-3">
                {pendingAssignments.slice(0, 3).map((a) => (
                  <div key={a.id} className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/40">
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{a.title}</p>
                    <div className="flex items-center justify-between mt-2 text-[11px]">
                      <span className="font-semibold text-amber-700">Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "Flexible"}</span>
                      <Link href="/student/assignments" className="font-bold text-aec-navy hover:underline">
                        Submit &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Ustadh Remarks */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-slate-900 mb-3">Teacher Observations</h3>
            {feedbacks.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">No observations recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {feedbacks.map((f) => (
                  <div key={f.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{f.teacher?.user?.name || "Instructor"}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{f.createdAt ? new Date(f.createdAt).toLocaleDateString() : ""}</span>
                    </div>
                    <p className="text-slate-600 italic">&ldquo;{f.body}&rdquo;</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Help Link */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-center">
            <p className="text-xs font-bold text-emerald-900">Need academic support or schedule change?</p>
            <a
              href="https://wa.me/923435999397"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#20bd5a] transition"
            >
              <span>Chat with Academic Counselor</span>
            </a>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
