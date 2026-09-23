import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";
import { DEMO_TIMETABLE } from "@/lib/student-demo-data";

export default function ParentTimetablePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Family Academic Timetable">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="font-display text-base font-bold text-slate-900 mb-1">Weekly Household Class Schedule</h2>
        <p className="text-xs text-slate-500">
          Consolidated timetable for Abdullah and Fatima (PKT / UTC+5).
        </p>

        <div className="mt-6 space-y-4">
          {days.map((day) => {
            const slots = DEMO_TIMETABLE.filter((t) => t.day === day);
            return (
              <div key={day} className="rounded-xl border border-slate-200/80 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-aec-navy">{day}</span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {slots.length > 0 ? `${slots.length} Session${slots.length > 1 ? "s" : ""}` : "Free Day"}
                  </span>
                </div>

                <div className="p-4 bg-white">
                  {slots.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {slots.map((s, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900">{s.course}</span>
                            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                              {s.platform}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">Teacher: {s.teacher}</p>
                          <p className="text-xs font-semibold text-aec-navy mt-1.5">⏰ {s.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No classes scheduled</p>
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
