import Link from "next/link";
import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "./_nav";
import {
  DEMO_TEACHER,
  DEMO_TEACHER_CLASSES,
  DEMO_PENDING_GRADING,
} from "@/lib/teacher-demo-data";

export default function TeacherDashboard() {
  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title={`Instructor Dashboard`}>
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-aec-navy via-[#143d63] to-aec-navy p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-aec-gold/20 border border-aec-gold/40 text-aec-gold text-2xl font-bold">
              {DEMO_TEACHER.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold">{DEMO_TEACHER.name}</h2>
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2.5 py-0.5">
                  Verified Faculty
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1">
                Faculty Code: <span className="font-mono text-aec-gold">{DEMO_TEACHER.code}</span> • {DEMO_TEACHER.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/teacher/attendance"
              className="rounded-xl bg-aec-gold text-aec-navy px-4 py-2 text-xs font-bold hover:bg-aec-gold/90 transition shadow-md"
            >
              Mark Attendance
            </Link>
            <Link
              href="/teacher/assignments"
              className="rounded-xl bg-white/10 border border-white/20 text-white px-4 py-2 text-xs font-bold hover:bg-white/20 transition"
            >
              Grading Queue ({DEMO_PENDING_GRADING.length})
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Stat Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase text-slate-500">Assigned Students</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{DEMO_TEACHER.totalStudents}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">1-on-1 Personalized Tutoring</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase text-slate-500">Sessions Today</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{DEMO_TEACHER.classesToday} Classes</p>
          <p className="text-[11px] text-emerald-700 font-medium mt-0.5">1 Live Now</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase text-slate-500">Homework to Grade</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{DEMO_TEACHER.pendingGrading}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Audio & Worksheets</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase text-slate-500">Cohort Attendance</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{DEMO_TEACHER.averageAttendanceRate}%</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Monthly Average</p>
        </div>
      </div>

      {/* 3. Today's Teaching Schedule & Grading Queue */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Today's Classes */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-bold text-slate-900">Today's Class Schedule</h3>
            <Link href="/teacher/classes" className="text-xs font-semibold text-aec-navy hover:underline">
              All Sessions &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {DEMO_TEACHER_CLASSES.map((cls) => (
              <div
                key={cls.id}
                className={`p-4 rounded-xl border transition ${
                  cls.status === "live_now"
                    ? "border-emerald-500/50 bg-emerald-50/40"
                    : "border-slate-200 bg-slate-50/50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {cls.status === "live_now" ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                          LIVE NOW
                        </span>
                      ) : (
                        <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          UPCOMING
                        </span>
                      )}
                      <span className="text-xs font-bold text-slate-900">{cls.studentName}</span>
                    </div>
                    <p className="text-xs text-aec-navy font-semibold mt-1">{cls.subject}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{cls.lessonTopic}</p>
                    <p className="text-xs font-semibold text-emerald-800 mt-1">⏰ {cls.time}</p>
                  </div>

                  <a
                    href={cls.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-primary text-xs px-4 py-2 self-start sm:self-center ${
                      cls.status === "live_now" ? "bg-emerald-600 hover:bg-emerald-700" : ""
                    }`}
                  >
                    Start Class
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grading Queue */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-slate-900">Grading Queue</h3>
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                3 Pending
              </span>
            </div>

            <div className="space-y-3">
              {DEMO_PENDING_GRADING.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.student}</span>
                    <span className="text-[10px] text-slate-400">{item.submittedDate}</span>
                  </div>
                  <p className="text-slate-700 font-medium mt-1">{item.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.course} • {item.type}</p>
                  <Link
                    href="/teacher/assignments"
                    className="inline-block mt-2 font-bold text-aec-navy hover:underline text-[11px]"
                  >
                    Evaluate & Give Marks &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/teacher/attendance"
              className="block w-full text-center py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition"
            >
              Open Daily Attendance Marker
            </Link>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
