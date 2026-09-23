import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";

export default function TeacherNotificationsPage() {
  const notifications = [
    {
      id: "tnotif-1",
      title: "New Student Assigned: Ibrahim Malik (UK)",
      body: "Academic Administration has scheduled 1-on-1 Spoken Arabic sessions starting this week.",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: "tnotif-2",
      title: "New Homework Submitted by Abdullah Akbar",
      body: "Surah Al-Mulk audio recording is ready in your grading queue.",
      time: "3 hours ago",
      isRead: false,
    },
    {
      id: "tnotif-3",
      title: "Monthly Faculty Payroll Generated",
      body: "September 2026 faculty compensation statement is available in HR portal.",
      time: "Sept 01, 2026",
      isRead: true,
    },
  ];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Faculty Notifications & Notices">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Faculty Updates & Alerts</h3>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            2 New
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex items-start gap-3.5 transition ${
                !n.isRead ? "bg-amber-50/30" : "bg-white"
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-aec-navy/10 text-aec-navy text-xs font-bold mt-0.5">
                🔔
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
