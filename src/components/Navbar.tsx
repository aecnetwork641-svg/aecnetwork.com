"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Logo from "@/components/Logo";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
};

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About AEC", href: "/about" },
  {
    label: "All Courses",
    href: "/courses",
    children: [
      { label: "🕌 Islamic Education", href: "/courses?category=Islamic" },
      { label: "📚 Academic Tutoring", href: "/courses?category=Academic+Tutoring" },
      { label: "🎯 Test Preparation", href: "/courses?category=Test+Preparation" },
      { label: "💻 Technology & Digital Skills", href: "/courses?category=Technology" },
    ]
  },
  { label: "New Registration", href: "/admissions/apply" },
  {
    label: "Portals",
    href: "/login",
    children: [
      { label: "Admin Portal", href: "/admin", desc: "Students, teachers, parents & operations" },
      { label: "Student Portal", href: "/student", desc: "Classes, assignments & results" },
      { label: "Parent Portal", href: "/parent", desc: "Children tracking & progress" },
      { label: "Teacher Portal", href: "/teacher", desc: "Attendance, grading & schedule" },
      { label: "Academic Portal", href: "/academic", desc: "Curriculum & faculty oversight" },
      { label: "Supervisor Portal", href: "/supervisor", desc: "Team & class quality monitoring" },
      { label: "Finance Portal", href: "/finance", desc: "Invoices, payroll & expenses" },
      { label: "HR Portal", href: "/hr", desc: "Staff directory, leave & attendance" },
      { label: "Super Admin Portal", href: "/super-admin", desc: "Master settings & audit logs" }
    ]
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog & Articles", href: "/blog", desc: "Educational articles & updates" },
      { label: "Study Resources", href: "/resources", desc: "General academic materials" },
      { label: "Free Resources", href: "/resources/free-resources", desc: "Downloadable guides & worksheets" },
      { label: "Islamic Resources", href: "/resources/islamic", desc: "Quran & Tajweed supplements" },
      { label: "Academic Resources", href: "/resources/academic", desc: "Math & language worksheets" },
      { label: "Placement Assessment", href: "/learning/assessment", desc: "Evaluate your learning level" }
    ]
  },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header
      className={`header sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1F3A]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-2.5"
          : "bg-transparent border-b border-transparent py-3 -mb-[76px]"
      }`}
    >
      <nav className="container-aec relative z-30 flex items-center justify-between">
        {/* Brand Logo (Left) */}
        <div className="flex items-center">
          <Link href="/" className="navbar-brand inline-flex items-center transition hover:opacity-90">
            <Logo variant="compact" theme="dark" size="md" />
          </Link>
        </div>

        {/* Center Floating Pill Navigation - Solid white pill over transparent navbar */}
        <ul
          ref={navRef}
          className="navbar-nav hidden lg:flex items-center gap-x-1 xl:gap-x-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full px-4 py-1.5 shadow-md shadow-slate-900/5"
        >
          {NAV.map((item) => (
            <li
              key={item.label}
              className="relative nav-item"
              onMouseEnter={() => item.children ? handleMouseEnter(item.label) : setActiveDropdown(null)}
              onMouseLeave={() => item.children ? handleMouseLeave() : undefined}
            >
              {item.children ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === item.label ? null : item.label)
                  }
                  className={`nav-link inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                    activeDropdown === item.label
                      ? "text-[#4DA3D9] bg-slate-100 shadow-xs"
                      : "text-[#0B1F3A] hover:text-[#4DA3D9] hover:bg-slate-50"
                  }`}
                >
                  <span>{item.label}</span>
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${
                      activeDropdown === item.label ? "rotate-180 text-[#4DA3D9]" : "opacity-60 text-slate-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.href as never}
                  className="nav-link inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 text-[#0B1F3A] hover:text-[#4DA3D9] hover:bg-slate-50"
                >
                  <span>{item.label}</span>
                </Link>
              )}

              {/* Standard Dropdown (for All Courses, Portals, Resources) - Solid 100% White Background */}
              {item.children && activeDropdown === item.label && (
                <div
                  className="absolute left-0 top-full pt-2 z-[100]"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    style={{ backgroundColor: "#ffffff" }}
                    className="w-72 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xl shadow-slate-900/20 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href as never}
                        className="block rounded-xl px-3.5 py-2.5 transition hover:bg-slate-50 group cursor-pointer"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <p className="text-xs font-bold text-[#0B1F3A] group-hover:text-[#4DA3D9] transition">
                          {child.label}
                        </p>
                        {child.desc && (
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 group-hover:text-slate-600">
                            {child.desc}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side Buttons (Right) */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/courses"
            className="hidden xl:inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md shadow-sm transition hover:bg-white hover:text-[#0B1F3A]"
          >
            Explore Courses
          </Link>
          <Link
            href="/admissions/apply"
            className="inline-flex items-center justify-center rounded-full bg-[#4DA3D9] hover:bg-white hover:text-[#0B1F3A] px-5 py-2 text-xs font-bold text-white shadow-md shadow-sky-500/20 transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            New Registration
          </Link>

          {/* Mobile Hamburger Toggler */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer flex items-center lg:hidden text-white bg-white/10 backdrop-blur-md w-10 h-10 rounded-xl justify-center border border-white/20 hover:bg-white/20 transition ml-2 shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {open ? (
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <polygon
                  points="11 9 22 9 22 11 11 11 11 11 22 9 22 9 11 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer - Solid White Background */}
      {open && (
        <div
          style={{ backgroundColor: "#ffffff" }}
          className="lg:hidden border-t border-slate-200 bg-white max-h-[85vh] overflow-y-auto px-4 py-5 text-[#0B1F3A] animate-in fade-in duration-200 shadow-2xl"
        >
          <div className="flex flex-col gap-2">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-slate-100 pb-2">
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#4DA3D9]"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          mobileExpanded === item.label ? "rotate-180 text-[#4DA3D9]" : "opacity-60 text-slate-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {mobileExpanded === item.label && (
                      <div className="pl-3 pb-2 space-y-3 border-l-2 border-[#4DA3D9]/40 ml-2 mt-1">
                        {item.children &&
                          item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href as never}
                              className="block py-1 text-xs text-slate-600 hover:text-[#4DA3D9]"
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href as never}
                    className="block py-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#4DA3D9]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="mt-4 flex flex-col gap-2.5 pt-2">
              <Link
                href="/admissions/apply"
                className="w-full text-center rounded-full bg-[#4DA3D9] hover:bg-[#0B1F3A] py-2.5 text-xs font-bold text-white shadow-md shadow-sky-500/20"
                onClick={() => setOpen(false)}
              >
                New Registration
              </Link>
              <Link
                href="/courses"
                className="w-full text-center rounded-full border-2 border-[#4DA3D9] bg-white py-2 text-xs font-bold text-[#4DA3D9]"
                onClick={() => setOpen(false)}
              >
                Explore Courses
              </Link>
              <Link
                href="/login"
                className="w-full text-center text-xs font-medium text-slate-500 hover:text-[#0B1F3A] py-1"
                onClick={() => setOpen(false)}
              >
                Student / Staff Portal Login →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
