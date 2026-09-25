"use client";

import Link from "next/link";
import { useState } from "react";

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
    label: "Learning",
    href: "/courses",
    children: [
      { label: "All LMS Courses", href: "/courses", desc: "Browse full 19+ course catalog" },
      { label: "Tajweed & Quran Courses", href: "/courses/tajweed-course", desc: "Qaida, Tajweed, Qirat & Hifz" },
      { label: "GCSE, A-Levels & SAT Prep", href: "/courses/gcse", desc: "Board exams & international tests" },
      { label: "Coding & IT Skills", href: "/courses/computer-programming", desc: "Programming, Web Dev & SMM" },
      { label: "STEM & Languages", href: "/courses/science", desc: "Science, Math, English & Arabic" },
      { label: "Learning Paths", href: "/learning/paths", desc: "Structured progression routes" },
      { label: "Free Resources", href: "/resources/free-resources", desc: "Guides, worksheets & tools" },
      { label: "Placement Assessment", href: "/learning/assessment", desc: "Evaluate your level" }
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
      { label: "Islamic Resources", href: "/resources/islamic", desc: "Quran & Tajweed supplements" },
      { label: "Academic Resources", href: "/resources/academic", desc: "Math & language worksheets" }
    ]
  },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-aec-navy/10 bg-white/95 backdrop-blur-md">
      <div className="container-aec flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-aec-navy">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-aec-navy text-white text-sm font-black shadow-inner">
            AEC
          </span>
          <span>
            AEC <span className="text-aec-teal">Network</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 xl:flex">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href as never}
                className="inline-flex items-center gap-1 text-sm font-medium text-aec-navy/80 transition hover:text-aec-navy py-2"
              >
                {item.label}
                {(item.children || item.categories) && (
                  <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>

              {/* Categorized Mega Dropdown (for Programs) */}
              {item.categories && activeDropdown === item.label && (
                <div className="absolute -left-28 top-full z-50 w-[820px] rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {item.categories.map((cat) => (
                      <div key={cat.categoryName} className="space-y-2.5">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <span className="text-sm">{cat.badge}</span>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-aec-navy">
                            {cat.categoryName}
                          </h4>
                        </div>
                        <div className="space-y-1">
                          {cat.items.map((sub) => (
                            <Link
                              key={sub.href + sub.label}
                              href={sub.href as never}
                              className="group block rounded-lg px-2.5 py-1.5 transition hover:bg-slate-50"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <p className="text-xs font-semibold text-slate-800 group-hover:text-aec-teal transition">
                                {sub.label}
                              </p>
                              {sub.desc && (
                                <p className="text-[11px] text-slate-500 line-clamp-1 group-hover:text-slate-600">
                                  {sub.desc}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mega Menu Footer Bar */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className="text-slate-500">
                      ✨ 1-on-1 personalized tutoring with qualified global faculty
                    </span>
                    <Link
                      href="/programs"
                      className="font-semibold text-aec-teal hover:text-aec-navy transition flex items-center gap-1"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span>View All Programs Catalog</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Standard Dropdown (for About, Learning, Admissions, Portals, Resources) */}
              {item.children && !item.categories && activeDropdown === item.label && (
                <div className="absolute left-0 top-full z-50 w-72 rounded-xl2 border border-aec-navy/10 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href as never}
                      className="block rounded-lg px-3 py-2 transition hover:bg-aec-cream"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <p className="text-sm font-semibold text-aec-navy">{child.label}</p>
                      {child.desc && <p className="text-xs text-aec-navy/60 line-clamp-1">{child.desc}</p>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/courses" className="btn-secondary text-xs px-4 py-2">
            Explore Courses
          </Link>
          <Link href="/admissions/free-trial" className="btn-primary text-xs px-4 py-2">
            Book a Free Trial
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="rounded-lg p-2 text-aec-navy hover:bg-aec-cream xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {open && (
        <div className="border-t border-aec-navy/10 bg-white max-h-[80vh] overflow-y-auto xl:hidden">
          <div className="container-aec flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-aec-navy/5 pb-2">
                <Link
                  href={item.href as never}
                  className="block font-semibold text-aec-navy py-1.5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>

                {/* Mobile Categorized Programs */}
                {item.categories && (
                  <div className="ml-2 mt-2 space-y-3 border-l-2 border-aec-teal/30 pl-3">
                    {item.categories.map((cat) => (
                      <div key={cat.categoryName} className="space-y-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-aec-teal pt-1 flex items-center gap-1.5">
                          <span>{cat.badge}</span>
                          <span>{cat.categoryName}</span>
                        </p>
                        {cat.items.map((sub) => (
                          <Link
                            key={sub.href + sub.label}
                            href={sub.href as never}
                            className="block py-1 text-sm text-aec-navy/80 hover:text-aec-navy"
                            onClick={() => setOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Mobile Standard Children */}
                {item.children && !item.categories && (
                  <div className="ml-3 mt-1 space-y-1 border-l-2 border-aec-teal/30 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href as never}
                        className="block py-1 text-sm text-aec-navy/70 hover:text-aec-navy"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2 pt-2">
              <Link
                href="/admissions/free-trial"
                className="btn-primary w-full text-center"
                onClick={() => setOpen(false)}
              >
                Book a Free Trial
              </Link>
              <Link
                href="/login"
                className="btn-secondary w-full text-center"
                onClick={() => setOpen(false)}
              >
                Student / Staff Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
