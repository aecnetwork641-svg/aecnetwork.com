import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";

export default function StudentNotificationsPage() {
  const notifications = [
    {
      id: "notif-1",
      title: "Homework Graded: Noon Saakinah Quiz",
      body: "Ustadh Muhammad Qasim has graded your submission with 48/50 (Distinction).",
      time: "2 hours ago",
      type: "assignment",
      isRead: false,
    },
    {
      id: "notif-2",
      title: "Upcoming Class Reminder",
      body: "Your 1-on-1 Quran Recitation session starts today at 5:00 PM PKT.",
      time: "5 hours ago",
      type: "class",
      isRead: false,
    },
    {
      id: "notif-3",
      title: "Monthly Tuition Fee Paid",
      body: "Payment of USD $65.00 for September 2026 tuition has been settled successfully.",
      time: "Sept 05, 2026",
      type: "fee",
      isRead: true,
    },
  ];

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="System Notifications & Alerts">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Recent Alerts & Updates</h3>
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
