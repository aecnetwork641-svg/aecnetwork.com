import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_TODAYS_CLASSES, DEMO_ENROLLED_COURSES } from "@/lib/student-demo-data";

export default function StudentClassesPage() {
  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="My Live Classes & Sessions">
      {/* Overview Notice */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">Today&apos;s Live Sessions</h2>
            <p className="text-xs text-slate-600 mt-1">
              Join your 1-on-1 personalized sessions at the scheduled time. Ensure your microphone and webcam are working.
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1">
            2 Sessions Today
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {DEMO_TODAYS_CLASSES.map((cls) => (
            <div
              key={cls.id}
              className={`rounded-xl border p-5 transition ${
                cls.isLiveNow
                  ? "border-emerald-500/50 bg-emerald-50/40 shadow-md"
                  : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    {cls.isLiveNow ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-0.5">
                        SCHEDULED
                      </span>
                    )}
                    <span className="text-xs text-slate-500 font-medium">{cls.meetingPlatform}</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900 mt-1.5">{cls.courseTitle}</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Instructor: <strong className="text-slate-800">{cls.instructor}</strong> • Room: <span className="font-mono text-slate-700">{cls.room}</span>
                  </p>
                  <p className="text-xs font-semibold text-emerald-800 mt-1">
                    Time: {cls.time}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <a
                    href={cls.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition ${
                      cls.isLiveNow
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-aec-navy hover:bg-aec-navy/90"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{cls.isLiveNow ? "Join Session Now" : "Launch Meeting Link"}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Guidelines & Recorded Sessions */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-display text-sm font-bold text-slate-900 mb-2">Class Attendance Policy</h3>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>Join the virtual classroom 2-3 minutes before the scheduled time.</li>
            <li>In case of emergency absence, inform your instructor at least 3 hours prior.</li>
            <li>Maintain an attendance rate above 85% for certificate eligibility.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-display text-sm font-bold text-slate-900 mb-2">Technical Assistance</h3>
          <p className="text-xs text-slate-600">
            If you face connection issues or audio/video trouble during your class, contact the technical coordinator on WhatsApp:
          </p>
          <a
            href="https://wa.me/923435999397"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-semibold text-xs text-emerald-700 hover:underline"
          >
            💬 WhatsApp Live Support (+92 343 5999397)
          </a>
        </div>
      </div>
    </PortalShell>
  );
}
