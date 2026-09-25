"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = { label: string; href: string; children?: { label: string; href: string; desc?: string }[] };

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
    children: [
      { label: "Quran & Islamic Studies", href: "/programs/quran-islamic-studies", desc: "Tajweed, Recitation, Foundations" },
      { label: "English", href: "/programs/english", desc: "Speaking, Grammar, Writing" },
      { label: "Arabic", href: "/programs/arabic", desc: "Modern Standard & Classical" },
      { label: "Mathematics", href: "/programs/mathematics", desc: "Primary to Advanced Math" },
      { label: "Academic Support", href: "/programs/academic-support", desc: "Curriculum tutoring & homework help" },
      { label: "Professional / Skill Courses", href: "/programs/professional-skills", desc: "Digital & practical skills" },
      { label: "School Support", href: "/programs/school-support", desc: "Board exams & test preparation" },
      { label: "One-to-One Tutoring", href: "/programs/one-to-one", desc: "Dedicated private mentorship" },
      { label: "Group Classes", href: "/programs/group-classes", desc: "Interactive cohort learning" }
    ]
  },
  {
    label: "Learning",
    href: "/courses",
    children: [
      { label: "Courses", href: "/courses", desc: "Browse full course catalog" },
      { label: "Learning Paths", href: "/learning/paths", desc: "Structured progression routes" },
      { label: "Free Resources", href: "/resources/free-resources", desc: "Guides, worksheets & tools" },
      { label: "Placement / Assessment", href: "/learning/assessment", desc: "Evaluate your level" },
      { label: "Online Classes", href: "/student/classes", desc: "Join scheduled sessions" },
      { label: "Student Login", href: "/login", desc: "Access learning portal" }
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
      { label: "Super Admin Portal", href: "/admin", desc: "Master settings & audit logs" }
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
                {item.children && (
                  <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
              {item.children && activeDropdown === item.label && (
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
          <Link href="/login" className="text-sm font-medium text-aec-navy/80 hover:text-aec-navy px-3 py-2">
            Student Login
          </Link>
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
                {item.children && (
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
