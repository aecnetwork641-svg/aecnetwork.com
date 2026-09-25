"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";
import { useState } from "react";

import NotificationBell from "@/components/NotificationBell";

const SUPER_ADMIN_PORTALS = [
  { label: "👑 Super Admin", href: "/admin" },
  { label: "🎓 Student Portal", href: "/student" },
  { label: "👨‍🏫 Teacher Portal", href: "/teacher" },
  { label: "👨‍👩‍👧 Parent Portal", href: "/parent" },
  { label: "📚 Academics", href: "/academic" },
  { label: "💰 Finance", href: "/finance" },
  { label: "👥 HR & Staff", href: "/hr" },
  { label: "👁️ Supervisor", href: "/supervisor" }
];

const ADMIN_ALLOWED_PORTALS = [
  { label: "🛡️ Operations Admin", href: "/admin" },
  { label: "🎓 Student Portal", href: "/student" },
  { label: "👨‍🏫 Teacher Portal", href: "/teacher" },
  { label: "👨‍👩‍👧 Parent Portal", href: "/parent" },
  { label: "📚 Academics", href: "/academic" },
  { label: "👁️ Supervisor", href: "/supervisor" }
];

const ADMIN_RESTRICTED_NAV_HREFS = [
  "/admin/finance",
  "/admin/hr",
  "/admin/users",
  "/admin/settings",
  "/admin/audit-logs"
];

export default function PortalShell({
  role,
  navItems,
  title,
  children
}: {
  role: string;
  navItems: { label: string; href: string }[];
  title: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalSwitcherOpen, setPortalSwitcherOpen] = useState(false);

  const userRole = (session?.user as { role?: string } | undefined)?.role;
  const isSuperAdmin = userRole === "SUPER_ADMIN";
  const isAdmin = userRole === "ADMIN";
  const isSuperAdminOrAdmin = isSuperAdmin || isAdmin;

  const currentPortals = isSuperAdmin ? SUPER_ADMIN_PORTALS : isAdmin ? ADMIN_ALLOWED_PORTALS : [];

  // Filter out restricted sections for regular ADMIN
  let effectiveNavItems = navItems;
  if (isAdmin) {
    effectiveNavItems = navItems.filter(item => !ADMIN_RESTRICTED_NAV_HREFS.includes(item.href));
    // Ensure quick links to Parent & Supervisor are available if not in navItems
    if (!effectiveNavItems.some(i => i.href === "/parent")) {
      effectiveNavItems = [
        ...effectiveNavItems.slice(0, 4),
        { label: "Supervisor", href: "/supervisor" },
        { label: "Parent View", href: "/parent" },
        ...effectiveNavItems.slice(4)
      ];
    }
  }

  const displayRoleBadge = isAdmin && role.toLowerCase().includes("super admin")
    ? "School Admin"
    : role;

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Portal Bar */}
      <div className="border-b border-slate-200/80 bg-white sticky top-16 z-30 shadow-xs">
        <div className="container-aec flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle portal menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="rounded-md bg-aec-navy px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-aec-gold shadow-xs">
              {displayRoleBadge}
            </span>

            {/* Master Portal Switcher for Super Admin / Admin */}
            {isSuperAdminOrAdmin && currentPortals.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPortalSwitcherOpen(!portalSwitcherOpen)}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 transition"
                >
                  <span>⚡ Switch Portal</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {portalSwitcherOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setPortalSwitcherOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                        {isSuperAdmin ? "Master Access Portals" : "Admin Accessible Portals"}
                      </p>
                      <div className="space-y-0.5 mt-1">
                        {currentPortals.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href as any}
                            onClick={() => setPortalSwitcherOpen(false)}
                            className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                              pathname.startsWith(p.href)
                                ? "bg-aec-navy text-white"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span>{p.label}</span>
                            {pathname.startsWith(p.href) && (
                              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Real-time Notifications Bell */}
            <NotificationBell />

            {session?.user && (
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-slate-700">{session.user.name || session.user.email}</span>
              </div>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-1.5 shadow-xs"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container-aec grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-lg mb-4 space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Navigation Menu
            </p>
            {effectiveNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href as never}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-aec-navy text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-36 lg:self-start">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
              Portal Menu
            </p>
            <nav className="mt-1 space-y-1">
              {effectiveNavItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && item.href !== "/student" && item.href !== "/parent" && item.href !== "/teacher" && item.href !== "/academic" && item.href !== "/finance" && item.href !== "/hr" && item.href !== "/supervisor" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href as never}
                    className={`block rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
                      isActive
                        ? "bg-aec-navy text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Portal Content */}
        <main className="min-w-0">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-slate-900">{title}</h1>
          </div>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
