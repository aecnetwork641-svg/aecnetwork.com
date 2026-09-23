import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "./_nav";
import {
  DEMO_STUDENT,
  DEMO_TODAYS_CLASSES,
  DEMO_ENROLLED_COURSES,
  DEMO_ASSIGNMENTS,
  DEMO_RESULTS,
} from "@/lib/student-demo-data";

export default function StudentDashboard() {
  const pendingAssignments = DEMO_ASSIGNMENTS.filter((a) => a.status === "pending");

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title={`Welcome back, ${DEMO_STUDENT.fullName}`}>
      {/* 1. Student Identity Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-aec-gold/20 border border-aec-gold/40 text-aec-gold text-2xl font-black">
              {DEMO_STUDENT.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold">{DEMO_STUDENT.fullName}</h2>
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2.5 py-0.5">
                  Active Student
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1">
                Student ID: <span className="font-mono text-aec-gold">{DEMO_STUDENT.studentCode}</span> • Enrolled Program: <strong className="text-white/90">{DEMO_STUDENT.primaryProgram}</strong>
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
              96%
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{DEMO_STUDENT.attendanceRate}%</p>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${DEMO_STUDENT.attendanceRate}%` }}></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Lesson Progress</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 text-xs font-bold">
              {DEMO_STUDENT.completedLessons}/{DEMO_STUDENT.totalLessons}
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {Math.round((DEMO_STUDENT.completedLessons / DEMO_STUDENT.totalLessons) * 100)}%
          </p>
          <p className="mt-1 text-[11px] text-slate-500">{DEMO_STUDENT.completedLessons} of {DEMO_STUDENT.totalLessons} lessons completed</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Academic Standing</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 text-xs font-bold">
              {DEMO_STUDENT.overallGrade}
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">GPA {DEMO_STUDENT.gpa}</p>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">Top 5% in cohort</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fee Invoices</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 text-xs font-bold">
              Paid
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">Up to Date</p>
          <p className="mt-1 text-[11px] text-slate-500">Next billing: Oct 05, 2026</p>
        </div>
      </div>

      {/* 3. Live Class Join Banner + Today's Schedule */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left: Next Live Class & Enrolled Courses */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live class card */}
          {DEMO_TODAYS_CLASSES.length > 0 && (
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 to-white p-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Next Live Session (1-on-1)
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mt-1">
                    {DEMO_TODAYS_CLASSES[0]?.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Instructor: <strong className="text-slate-800">{DEMO_TODAYS_CLASSES[0]?.instructor}</strong> • Time: <span className="font-semibold text-emerald-700">{DEMO_TODAYS_CLASSES[0]?.time}</span>
                  </p>
                </div>

                <a
                  href={DEMO_TODAYS_CLASSES[0]?.joinUrl || "https://zoom.us"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 text-sm font-bold shadow-md hover:shadow-lg transition duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Join Live Class</span>
                </a>
              </div>
            </div>
          )}

          {/* Enrolled Courses Overview */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-slate-900">Enrolled Courses & LMS</h3>
              <Link href="/student/courses" className="text-xs font-semibold text-aec-navy hover:underline">
                View All Courses &rarr;
              </Link>
            </div>

            <div className="space-y-4">
              {DEMO_ENROLLED_COURSES.map((c) => (
                <div key={c.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {c.instructor} • Next: <span className="text-slate-700 font-medium">{c.nextLesson}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xs font-bold text-slate-700">{c.progress}%</span>
                      <Link
                        href={`/courses/${c.slug}`}
                        className="rounded-lg bg-aec-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-aec-navy/90 transition"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-aec-gold h-1.5 rounded-full" style={{ width: `${c.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pending Tasks & Recent Feedback */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pending assignments */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-slate-900">Pending Homework</h3>
              <Link href="/student/assignments" className="text-xs font-semibold text-aec-navy hover:underline">
                All ({DEMO_ASSIGNMENTS.length})
              </Link>
            </div>

            <div className="space-y-3">
              {pendingAssignments.map((a) => (
                <div key={a.id} className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/40">
                  <p className="text-xs font-bold text-slate-900 line-clamp-1">{a.title}</p>
                  <p className="text-[11px] text-slate-600 mt-1">{a.course}</p>
                  <div className="flex items-center justify-between mt-2 text-[11px]">
                    <span className="font-semibold text-amber-700">Due: {a.dueDate}</span>
                    <Link href="/student/assignments" className="font-bold text-aec-navy hover:underline">
                      Submit &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Ustadh Remarks */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-slate-900 mb-3">Ustadh / Teacher Feedback</h3>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Ustadh Muhammad Qasim</span>
                <span className="text-[10px] text-slate-400">2 days ago</span>
              </div>
              <p className="text-slate-600 italic">
                &ldquo;MashaAllah Abdullah has shown notable improvement in Makharij pronunciation. Keep practicing Surah Al-Mulk ayat 1-10 for the upcoming oral test.&rdquo;
              </p>
            </div>
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
