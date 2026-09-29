"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";

type CategoryItem = {
  categoryName: string;
  badge?: string;
  items: { label: string; href: string; desc?: string }[];
};

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
  categories?: CategoryItem[];
};

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About AEC",
    href: "/about",
    children: [
      { label: "About Us", href: "/about", desc: "Our history and background" },
      { label: "Mission & Vision", href: "/about/mission-vision", desc: "Our educational principles" },
      { label: "Why AEC", href: "/about/why-aec", desc: "What sets our academy apart" },
      { label: "Our Approach", href: "/about/approach", desc: "Pedagogical methodologies" },
      { label: "Our Teachers", href: "/about/teachers", desc: "Vetted and qualified faculty" },
      { label: "Our Team", href: "/about/team", desc: "Leadership and administration" }
    ]
  },
  {
    label: "Programs",
    href: "/programs",
    categories: [
      {
        categoryName: "Islamic Education",
        badge: "🕌",
        items: [
          { label: "Quran & Tajweed Mastery", href: "/programs/quran-islamic-studies", desc: "Noorani Qaida, Tajweed & Hifz" },
          { label: "Islamic Studies & Translation", href: "/programs/translation-of-quran", desc: "Quran Translation, Tafseer & Fiqh" },
          { label: "Qirat & Melodic Recitation", href: "/programs/qirat-course", desc: "Maqamat, Voice Modulation & Styles" }
        ]
      },
      {
        categoryName: "Academic Tutoring",
        badge: "📚",
        items: [
          { label: "GCSE & IGCSE", href: "/programs/gcse", desc: "UK National Curriculum Boards" },
          { label: "O & A Levels", href: "/programs/o-a-levels", desc: "Cambridge & Edexcel Secondary/College" },
          { label: "Science & Mathematics", href: "/programs/mathematics", desc: "Physics, Chem, Bio & Advanced Math" },
          { label: "English Language", href: "/programs/english", desc: "Grammar, Composition & Fluency" }
        ]
      },
      {
        categoryName: "Test Preparation",
        badge: "🎯",
        items: [
          { label: "NAPLAN Preparation", href: "/programs/naplan", desc: "Australian Curriculum (Years 3, 5, 7, 9)" },
          { label: "SAT Preparation", href: "/programs/sat-tutoring", desc: "Digital SAT Verbal & Math Strategy" },
          { label: "GRE Preparation", href: "/programs/gre-tutoring", desc: "Quantitative & Analytical Reasoning" }
        ]
      },
      {
        categoryName: "Technology & Digital Skills",
        badge: "💻",
        items: [
          { label: "Computer Programming & Coding", href: "/programs/computer-programming", desc: "Python, C++, JavaScript & OOP" },
          { label: "Web Designing & Development", href: "/programs/web-development", desc: "UI/UX, Frontend & Full Stack Web" },
          { label: "Digital Marketing", href: "/programs/digital-marketing", desc: "SEO, PPC & Inbound Campaigns" },
          { label: "Social Media Marketing", href: "/programs/social-media-marketing-smm", desc: "Meta Ads, Content & Brand Growth" }
        ]
      }
    ]
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "How to Enroll", href: "/admissions/how-to-enroll", desc: "Step-by-step admission process" },
      { label: "Book a Free Trial", href: "/admissions/free-trial", desc: "Experience a class first" },
      { label: "Admission Form", href: "/admissions/apply", desc: "Submit formal application" },
      { label: "Requirements", href: "/admissions/requirements", desc: "Prerequisites and guidelines" },
      { label: "Fee Structure", href: "/admissions/fees", desc: "Transparent tuition & options" },
      { label: "FAQs", href: "/admissions/faqs", desc: "Admissions & enrollment questions" }
    ]
  },
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-[#03010e]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
          : "py-4 bg-[#03010e]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.3)]"
      }`}
    >
      <nav className="container-aec relative z-30 flex items-center justify-between">
        {/* Brand Logo - Automark Logo placement with dark theme support */}
        <div className="order-0 flex items-center">
          <Link href="/" className="navbar-brand inline-flex items-center transition hover:opacity-90">
            <Logo variant="compact" theme="dark" size="md" />
          </Link>
        </div>

        {/* Center Floating Pill Navigation - Automark Signature Style */}
        <ul className="navbar-nav order-3 hidden lg:flex items-center gap-x-1 xl:gap-x-2 bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-full px-5 py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          {NAV.map((item) => (
            <li
              key={item.label}
              className="relative nav-item"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href as never}
                className={`nav-link inline-flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors ${
                  activeDropdown === item.label
                    ? "text-[#937aff] bg-white/10"
                    : "text-slate-200 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <span>{item.label}</span>
                {(item.children || item.categories) && (
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${
                      activeDropdown === item.label ? "rotate-180 text-[#937aff]" : "opacity-60"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>

              {/* Categorized Mega Dropdown (for Programs) */}
              {item.categories && activeDropdown === item.label && (
                <div className="absolute -left-36 top-full mt-2 z-50 w-[840px] rounded-2xl border border-white/15 bg-[#080c18]/95 backdrop-blur-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                    {item.categories.map((cat) => (
                      <div key={cat.categoryName} className="space-y-2">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                          <span className="text-base">{cat.badge}</span>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#937aff]">
                            {cat.categoryName}
                          </h4>
                        </div>
                        <div className="space-y-1">
                          {cat.items.map((sub) => (
                            <Link
                              key={sub.href + sub.label}
                              href={sub.href as never}
                              className="group block rounded-xl px-3 py-2 transition hover:bg-white/[0.08] border border-transparent hover:border-white/10"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <p className="text-xs font-semibold text-slate-100 group-hover:text-[#937aff] transition">
                                {sub.label}
                              </p>
                              {sub.desc && (
                                <p className="text-[11px] text-slate-400 line-clamp-1 group-hover:text-slate-300">
                                  {sub.desc}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mega Menu Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                    <span className="text-slate-400 font-medium">
                      ✨ 1-on-1 personalized tutoring with qualified global faculty
                    </span>
                    <Link
                      href="/programs"
                      className="font-bold text-[#937aff] hover:text-[#b4a3ff] transition flex items-center gap-1.5"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span>View All Programs Catalog</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Standard Dropdown (for About, Admissions, Portals, Resources) */}
              {item.children && !item.categories && activeDropdown === item.label && (
                <div className="absolute left-0 top-full mt-2 z-50 w-72 rounded-2xl border border-white/15 bg-[#080c18]/95 backdrop-blur-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-1 duration-150">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href as never}
                      className="block rounded-xl px-3 py-2 transition hover:bg-white/[0.08] group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <p className="text-xs font-semibold text-slate-100 group-hover:text-[#937aff] transition">
                        {child.label}
                      </p>
                      {child.desc && (
                        <p className="text-[11px] text-slate-400 line-clamp-1 group-hover:text-slate-300">
                          {child.desc}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side Buttons - Automark Gradient & Pill Design */}
        <div className="order-1 ml-auto flex items-center gap-3 md:order-2 lg:ml-0">
          <Link
            href="/courses"
            className="hidden xl:inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white hover:border-white/40"
          >
            Explore Courses
          </Link>
          <Link
            href="/admissions/free-trial"
            className="btn btn-primary inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4d36d0] to-[#937aff] hover:from-[#432ec0] hover:to-[#846bf5] px-5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Free Trial
          </Link>

          {/* Automark Hamburger Toggler */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="order-3 cursor-pointer flex items-center lg:hidden text-white bg-white/10 backdrop-blur-lg w-10 h-10 rounded-xl justify-center border border-white/15 hover:bg-white/20 transition ml-2"
            aria-label="Toggle navigation menu"
          >
            {open ? (
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
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

      {/* Mobile Drawer - Automark Glassmorphic Style */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#060813]/98 backdrop-blur-2xl max-h-[85vh] overflow-y-auto px-4 py-5 text-white animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-white/10 pb-2">
                {item.children || item.categories ? (
                  <div>
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-slate-100 hover:text-[#937aff]"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          mobileExpanded === item.label ? "rotate-180 text-[#937aff]" : "opacity-60"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {mobileExpanded === item.label && (
                      <div className="pl-3 pb-2 space-y-3 border-l-2 border-[#937aff]/40 ml-2 mt-1">
                        {item.categories &&
                          item.categories.map((cat) => (
                            <div key={cat.categoryName} className="space-y-1">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-[#937aff] pt-1 flex items-center gap-1.5">
                                <span>{cat.badge}</span>
                                <span>{cat.categoryName}</span>
                              </p>
                              {cat.items.map((sub) => (
                                <Link
                                  key={sub.href + sub.label}
                                  href={sub.href as never}
                                  className="block py-1 text-xs text-slate-300 hover:text-white"
                                  onClick={() => setOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          ))}

                        {item.children &&
                          !item.categories &&
                          item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href as never}
                              className="block py-1 text-xs text-slate-300 hover:text-white"
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
                    className="block py-2 text-sm font-semibold text-slate-100 hover:text-[#937aff]"
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
                href="/admissions/free-trial"
                className="w-full text-center rounded-full bg-gradient-to-r from-[#4d36d0] to-[#937aff] py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30"
                onClick={() => setOpen(false)}
              >
                Book a Free Trial
              </Link>
              <Link
                href="/courses"
                className="w-full text-center rounded-full border border-white/20 bg-white/5 py-2.5 text-xs font-semibold text-slate-200"
                onClick={() => setOpen(false)}
              >
                Explore Courses
              </Link>
              <Link
                href="/login"
                className="w-full text-center text-xs font-medium text-slate-400 hover:text-white py-1"
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
