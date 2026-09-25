"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: string;
  entityType?: string | null;
  entityId?: string | null;
  read: boolean;
  createdAt: string;
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSecs = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSecs < 60) return "Just now";
  const diffInMins = Math.floor(diffInSecs / 60);
  if (diffInMins < 60) return `${diffInMins}m ago`;
  const diffInHours = Math.floor(diffInMins / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "trial":
    case "enrollment":
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
      );
    case "admission":
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      );
    case "fee":
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-aec-navy/10 text-aec-navy border border-aec-navy/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      );
  }
}

function parseContactDetails(text: string) {
  const phoneMatch = text.match(/Phone:\s*([^\s,]+)/i);
  const emailMatch = text.match(/Email:\s*([^\s,]+)/i);
  const phone = phoneMatch && phoneMatch[1] ? phoneMatch[1].replace(/[^0-9+]/g, "") : null;
  const email = emailMatch && emailMatch[1] ? emailMatch[1].trim() : null;
  return { phone, email };
}

function getNotificationDestination(n: NotificationItem): string {
  if (n.title.includes("Trial") || n.type === "trial") return "/admin/admissions";
  if (n.title.includes("Admission") || n.type === "admission") return "/admin/admissions";
  if (n.title.includes("Fee") || n.type === "fee") return "/admin/finance";
  if (n.title.includes("Class") || n.type === "class") return "/admin/academics";
  return "/admin/communication";
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [loading, setLoading] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error("[NOTIFICATION_FETCH_ERROR]", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 25000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const markAllAsRead = async () => {
    setLoading(true);
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true })
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("[MARK_ALL_READ_ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  const openNotificationDetail = (n: NotificationItem) => {
    // Mark single as read
    if (!n.read) {
      fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: n.id })
      });
      setNotifications((prev) =>
        prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
    setSelectedNotification(n);
    setOpen(false);
  };

  const deleteNotification = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      setNotifications((prev) => prev.filter((item) => item.id !== id));
      setSelectedNotification(null);
    } catch (err) {
      console.error("[DELETE_NOTIFICATION_ERROR]", err);
    }
  };

  const displayedNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Bell Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Notifications"
          className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition duration-200 ${
            open
              ? "border-aec-navy bg-aec-navy text-white shadow-sm"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              unreadCount > 0 ? "animate-[swing_2s_ease-in-out_infinite]" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>

          {/* Unread Pill Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white shadow-sm ring-2 ring-white animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Popover Dropdown Panel */}
        {open && (
          <div className="absolute right-0 mt-2.5 w-80 sm:w-96 rounded-2xl border border-slate-200/90 bg-white shadow-2xl z-50 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-slate-900">Notifications & Alerts</h3>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  disabled={loading}
                  className="text-[11px] font-semibold text-aec-navy hover:underline transition"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-2 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  filter === "all"
                    ? "bg-aec-navy text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  filter === "unread"
                    ? "bg-aec-navy text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
              {displayedNotifications.length === 0 ? (
                <div className="py-10 text-center px-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-slate-800">No alerts found</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    You are all caught up! New free trial bookings and admission leads will appear here.
                  </p>
                </div>
              ) : (
                displayedNotifications.map((n) => {
                  return (
                    <div
                      key={n.id}
                      onClick={() => openNotificationDetail(n)}
                      className={`flex items-start gap-3 p-3.5 transition cursor-pointer hover:bg-slate-100/80 ${
                        !n.read ? "bg-amber-50/40" : "bg-white"
                      }`}
                    >
                      {getNotificationIcon(n.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p
                            className={`text-xs font-bold truncate ${
                              !n.read ? "text-slate-900" : "text-slate-700"
                            }`}
                          >
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {timeAgo(n.createdAt)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                          {n.body}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-aec-navy mt-1.5 hover:underline">
                          <span>View Details &rarr;</span>
                        </span>
                      </div>

                      {!n.read && (
                        <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2.5 text-center">
              <Link
                href="/admin/communication"
                onClick={() => setOpen(false)}
                className="text-xs font-bold text-aec-navy hover:text-aec-blue transition"
              >
                Open Communication Center &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* FULL NOTIFICATION DETAIL MODAL */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                {getNotificationIcon(selectedNotification.type)}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {selectedNotification.type.toUpperCase()} ALERT
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {selectedNotification.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2">
                <p className="font-medium text-slate-800 leading-relaxed text-sm">
                  {selectedNotification.body}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <span>Received: {new Date(selectedNotification.createdAt).toLocaleString()}</span>
                  <span>Status: <strong className="text-emerald-600">Active</strong></span>
                </div>
              </div>

              {/* Quick Actions Grid */}
              {(() => {
                const { phone, email } = parseContactDetails(selectedNotification.body);
                const destination = getNotificationDestination(selectedNotification);

                return (
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Direct Actions
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phone && (
                        <a
                          href={`https://wa.me/${phone.replace("+", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 text-xs font-bold transition shadow-xs"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                          </svg>
                          <span>WhatsApp Student</span>
                        </a>
                      )}

                      {email && (
                        <a
                          href={`mailto:${email}`}
                          className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-4 text-xs font-bold transition"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Send Email</span>
                        </a>
                      )}

                      <button
                        onClick={() => {
                          setSelectedNotification(null);
                          router.push(destination as any);
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl bg-aec-navy hover:bg-aec-navy/90 text-white py-2.5 px-4 text-xs font-bold transition"
                      >
                        <span>Open in Admissions CRM &rarr;</span>
                      </button>

                      <button
                        onClick={() => deleteNotification(selectedNotification.id)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 py-2.5 px-4 text-xs font-bold transition"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Dismiss Alert</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSelectedNotification(null)}
                className="rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
