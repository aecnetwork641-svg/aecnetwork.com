"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";
import { useState } from "react";

import NotificationBell from "@/components/NotificationBell";

const SUPER_ADMIN_PORTALS = [
  { label: "👑 Super Admin", href: "/super-admin" },
  { label: "🎨 Homepage Builder", href: "/super-admin/homepage-builder" },
  { label: "🛡️ Admin Portal", href: "/admin" },
  { label: "🎓 Student Portal", href: "/student" },
  { label: "👨‍🏫 Teacher Portal", href: "/teacher" },
  { label: "👨‍👩‍👧 Parent Portal", href: "/parent" },
  { label: "📚 Academics", href: "/academic" },
  { label: "👁️ Supervisor", href: "/supervisor" },
  { label: "💰 Finance", href: "/finance" },
  { label: "👥 HR & Staff", href: "/hr" }
];

const ADMIN_ALLOWED_PORTALS = [
  { label: "🛡️ Admin Portal", href: "/admin" },
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-sky-50/60 to-slate-200/80 pb-20 overflow-hidden">
      {/* Ambient background crystal luminous orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#4DA3D9]/20 blur-[100px]" />
        <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-aec-navy/10 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/4 w-[480px] h-[480px] rounded-full bg-sky-200/25 blur-[110px]" />
      </div>

      {/* Top Portal Bar - Crystal Glass */}
      <div className="relative z-30 border-b border-white/80 bg-white/75 backdrop-blur-2xl sticky top-16 shadow-[0_4px_25px_-5px_rgba(11,31,58,0.06),0_0_0_1px_rgba(255,255,255,0.8)_inset]">
        <div className="container-aec flex h-15 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-white/80 rounded-xl border border-white/60 transition"
              aria-label="Toggle portal menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Official Horizontal Logo */}
            <Link href="/" className="flex items-center mr-1 hover:opacity-90 transition">
              <Image
                src="/images/aec-network-logo-horizontal.svg"
                alt="AEC Network"
                width={150}
                height={42}
                className="h-7 sm:h-8 w-auto object-contain"
                priority
              />
            </Link>

            <span className="hidden sm:inline-flex rounded-lg bg-aec-navy/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-aec-gold shadow-sm border border-white/10">
              {displayRoleBadge}
            </span>

            {/* Master Portal Switcher for Super Admin / Admin */}
            {isSuperAdminOrAdmin && currentPortals.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPortalSwitcherOpen(!portalSwitcherOpen)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/80 bg-white/80 backdrop-blur-md hover:bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-xs transition"
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
                    <div className="absolute left-0 mt-2 w-60 rounded-2xl border border-white/80 bg-white/90 backdrop-blur-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
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
                                ? "bg-aec-navy text-white shadow-sm"
                                : "text-slate-700 hover:bg-white/80 hover:text-slate-900"
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
              <div className="hidden md:flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-slate-700 truncate max-w-[150px]">{session.user.name || session.user.email}</span>
              </div>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-xl border border-white/80 bg-white/70 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white hover:text-slate-900 transition flex items-center gap-1.5 shadow-xs"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container-aec relative z-10 grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden rounded-2xl border border-white/80 bg-white/85 backdrop-blur-2xl p-4 shadow-xl mb-4 space-y-1">
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
                      : "text-slate-700 hover:bg-white/80 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Desktop Sidebar - Crystal Glass Panel */}
        <aside className="hidden lg:block lg:sticky lg:top-36 lg:self-start">
          <div className="rounded-3xl border border-white/80 bg-white/65 backdrop-blur-2xl p-4 shadow-[0_20px_50px_-15px_rgba(11,31,58,0.08),0_0_0_1px_rgba(255,255,255,0.7)_inset] relative overflow-hidden">
            {/* Top Crystal Highlight */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

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
                        : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
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
