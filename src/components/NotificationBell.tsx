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
    // Live polling every 25 seconds for instant updates
    const interval = setInterval(fetchNotifications, 25000);
    return () => clearInterval(interval);
  }, []);

  // Close when clicking outside
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

  const markSingleAsRead = async (id: string, destination: string) => {
    try {
      fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setOpen(false);
      router.push(destination as any);
    } catch (err) {
      console.error("[MARK_SINGLE_READ_ERROR]", err);
    }
  };

  const displayedNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
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
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white shadow-sm ring-2 ring-white">
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
                const destination = getNotificationDestination(n);
                return (
                  <div
                    key={n.id}
                    onClick={() => markSingleAsRead(n.id, destination)}
                    className={`flex items-start gap-3 p-3.5 transition cursor-pointer hover:bg-slate-50/80 ${
                      !n.read ? "bg-amber-50/30" : "bg-white"
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
  );
}
