import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";

export default function ParentNotificationsPage() {
  const notifications = [
    {
      id: "pnotif-1",
      title: "Class Attendance Confirmation: Abdullah Akbar",
      body: "Abdullah was marked Present in Quran & Applied Tajweed class today at 5:00 PM.",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: "pnotif-2",
      title: "Homework Graded: Fatima Akbar",
      body: "Ustaza Maryam graded Fatima's Noorani Qaida reading test with Distinction (100%).",
      time: "1 day ago",
      isRead: false,
    },
    {
      id: "pnotif-3",
      title: "Tuition Payment Cleared",
      body: "Receipt #INV-2026-SEP-01 for $110.00 has been verified and settled.",
      time: "Sept 05, 2026",
      isRead: true,
    },
  ];

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="Parent Alerts & Notices">
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Guardian Alerts & Absence Notifications</h3>
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
