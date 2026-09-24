import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";
import { DEMO_TEACHER_CLASSES } from "@/lib/teacher-demo-data";

export default function TeacherClassesPage() {
  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Teacher Live Classes & Launch Deck">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Scheduled Teaching Sessions</h2>
        <p className="text-xs text-slate-500">
          Click &ldquo;Start Session&rdquo; to launch Google Meet / Zoom with student audio-video.
        </p>

        <div className="mt-6 space-y-4">
          {DEMO_TEACHER_CLASSES.map((cls) => (
            <div
              key={cls.id}
              className={`p-5 rounded-xl border transition ${
                cls.status === "live_now"
                  ? "border-emerald-500/50 bg-emerald-50/40"
                  : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{cls.studentName}</span>
                    <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      {cls.studentCode}
                    </span>
                    <span className="text-xs text-slate-500">({cls.meetingPlatform})</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-aec-navy mt-1">{cls.subject}</h3>
                  <p className="text-xs text-slate-600 mt-0.5"><strong>Today&apos;s Topic:</strong> {cls.lessonTopic}</p>
                  <p className="text-xs font-semibold text-emerald-800 mt-1">⏰ Scheduled: {cls.time}</p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={cls.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-primary text-xs px-5 py-2.5 ${
                      cls.status === "live_now" ? "bg-emerald-600 hover:bg-emerald-700" : ""
                    }`}
                  >
                    Start Session
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
