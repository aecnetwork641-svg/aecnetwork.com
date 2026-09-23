import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";
import { DEMO_TIMETABLE } from "@/lib/student-demo-data";

export default function StudentTimetablePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Weekly Academic Timetable">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">Current Term Schedule (Fall 2026)</h2>
            <p className="text-xs text-slate-500">All times are displayed in Pakistan Standard Time (PKT / UTC+5).</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-aec-navy/10 text-aec-navy">
            1-on-1 Personalized Slots
          </span>
        </div>

        {/* Timetable Days Accordion/Grid */}
        <div className="space-y-4">
          {days.map((day) => {
            const slots = DEMO_TIMETABLE.filter((t) => t.day === day);
            return (
              <div key={day} className="rounded-xl border border-slate-200/80 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-aec-navy">{day}</span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {slots.length > 0 ? `${slots.length} Class${slots.length > 1 ? "es" : ""}` : "No classes scheduled"}
                  </span>
                </div>

                <div className="p-4 bg-white">
                  {slots.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {slots.map((s, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-900">{s.course}</span>
                              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                                {s.platform}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1">Instructor: {s.teacher}</p>
                          </div>
                          <p className="text-xs font-semibold text-aec-navy mt-2 flex items-center gap-1.5">
                            <span>⏰ {s.time}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Rest / Self-study day</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalShell>
  );
}
