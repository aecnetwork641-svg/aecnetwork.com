import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="relative text-white">
      {/* Animated Liquid Wave Divider */}
      <div className="wave-divider w-full overflow-hidden leading-none pointer-events-none -mb-[1px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          style={{ color: "#0B1F3A" }}
        >
          <defs>
            <path
              id="wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
              style={{ color: "#0B1F3A" }}
            />
          </defs>
          <g>
            <use href="#wave" x="50" y="3" fill="currentColor" style={{ color: "#0B1F3A" }} />
            <use href="#wave" x="50" y="0" fill="currentColor" style={{ color: "#0B1F3A" }} />
            <use href="#wave" x="50" y="9" fill="currentColor" style={{ color: "#0B1F3A" }} />
            <use href="#wave" x="50" y="6" fill="currentColor" style={{ color: "#0B1F3A" }} />
          </g>
        </svg>
      </div>

      <div className="bg-[#0B1F3A]">
        <div className="container-aec grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block transition hover:opacity-95">
            <Logo variant="full" theme="dark" size="md" />
          </Link>

          <p className="max-w-sm text-sm leading-relaxed text-slate-300">
            <strong>Akbar Education Communication (AEC) Network</strong> provides structured, accessible online education, vetted qualified instructors, personalized 1-on-1 tutoring, and comprehensive academic support for students worldwide.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">🕌 Islamic Disciplines</span>
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">📚 Academic STEM</span>
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">🎓 GCSE / SAT / GRE</span>
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">💻 Coding & Web Dev</span>
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">👨‍🏫 1-on-1 & Cohorts</span>
          </div>

          <div className="space-y-1.5 pt-2 text-xs text-slate-300">
            <p className="flex items-center gap-2">
              <span className="text-[#4DA3D9] font-bold">💬 WhatsApp:</span>
              <a href="https://wa.me/923435999397" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#4DA3D9] transition">
                +92 343 5999397
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#4DA3D9] font-bold">✉️ Admissions:</span>
              <a href="mailto:info@aecnetwork.com" className="text-white hover:text-[#4DA3D9] transition">
                info@aecnetwork.com
              </a>
            </p>
            <p className="flex items-center gap-2 text-slate-400">
              <span>🌐 Coverage:</span>
              <span>Pakistan, UK, USA, Australia, UAE & Global</span>
            </p>
          </div>
        </div>

        {/* All Courses */}
        <div>
          <p className="font-display text-xs font-bold tracking-widest text-[#4DA3D9] uppercase">
            All Courses
          </p>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
            <li>
              <Link href="/programs/quran-islamic-studies" className="hover:text-[#4DA3D9] transition">
                Quran & Tajweed Mastery
              </Link>
            </li>
            <li>
              <Link href="/programs/translation-of-quran" className="hover:text-[#4DA3D9] transition">
                Islamic Studies & Translation
              </Link>
            </li>
            <li>
              <Link href="/programs/qirat-course" className="hover:text-[#4DA3D9] transition">
                Qirat & Melodic Recitation
              </Link>
            </li>
            <li>
              <Link href="/programs/gcse" className="hover:text-[#4DA3D9] transition">
                GCSE & IGCSE Tutoring
              </Link>
            </li>
            <li>
              <Link href="/programs/o-a-levels" className="hover:text-[#4DA3D9] transition">
                O & A Levels (Cambridge/Edexcel)
              </Link>
            </li>
            <li>
              <Link href="/programs/naplan" className="hover:text-[#4DA3D9] transition">
                NAPLAN Preparation (Australia)
              </Link>
            </li>
            <li>
              <Link href="/programs/sat-tutoring" className="hover:text-[#4DA3D9] transition">
                SAT & GRE Test Prep
              </Link>
            </li>
            <li>
              <Link href="/programs/computer-programming" className="hover:text-[#4DA3D9] transition">
                Computer Programming & Coding
              </Link>
            </li>
            <li>
              <Link href="/programs/web-development" className="hover:text-[#4DA3D9] transition">
                Web Designing & Development
              </Link>
            </li>
            <li>
              <Link href="/programs/social-media-marketing-smm" className="hover:text-[#4DA3D9] transition">
                Social Media Marketing (SMM)
              </Link>
            </li>
            <li className="pt-1">
              <Link href="/courses" className="font-bold text-[#4DA3D9] hover:underline flex items-center gap-1">
                <span>View All Courses</span>
                <span>→</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Portals */}
        <div>
          <p className="font-display text-xs font-bold tracking-widest text-[#4DA3D9] uppercase">
            Portals & Systems
          </p>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
            <li>
              <Link href="/admin" className="hover:text-[#4DA3D9] transition">
                Admin Portal
              </Link>
            </li>
            <li>
              <Link href="/student" className="hover:text-[#4DA3D9] transition">
                Student Portal
              </Link>
            </li>
            <li>
              <Link href="/parent" className="hover:text-[#4DA3D9] transition">
                Parent Portal
              </Link>
            </li>
            <li>
              <Link href="/teacher" className="hover:text-[#4DA3D9] transition">
                Teacher Portal
              </Link>
            </li>
            <li>
              <Link href="/academic" className="hover:text-[#4DA3D9] transition">
                Academic Portal
              </Link>
            </li>
            <li>
              <Link href="/supervisor" className="hover:text-[#4DA3D9] transition">
                Supervisor Portal
              </Link>
            </li>
            <li>
              <Link href="/finance" className="hover:text-[#4DA3D9] transition">
                Finance & Invoices
              </Link>
            </li>
            <li>
              <Link href="/hr" className="hover:text-[#4DA3D9] transition">
                HR & Payroll Portal
              </Link>
            </li>
            <li>
              <Link href="/super-admin" className="hover:text-[#4DA3D9] transition">
                Super Admin Portal
              </Link>
            </li>
            <li className="pt-1">
              <Link href="/login" className="font-bold text-[#4DA3D9] hover:underline">
                Portal Login Gateway →
              </Link>
            </li>
          </ul>
        </div>

        {/* Admissions & Info */}
        <div>
          <p className="font-display text-xs font-bold tracking-widest text-[#4DA3D9] uppercase">
            Admissions & Info
          </p>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
            <li>
              <Link href="/about" className="hover:text-[#4DA3D9] transition font-medium">
                About AEC Network
              </Link>
            </li>
            <li>
              <Link href="/about/mission-vision" className="hover:text-[#4DA3D9] transition">
                Mission & Vision
              </Link>
            </li>
            <li>
              <Link href="/admissions/how-to-enroll" className="hover:text-[#4DA3D9] transition">
                How to Enroll
              </Link>
            </li>
            <li>
              <Link href="/admissions/free-trial" className="text-[#4DA3D9] font-semibold hover:underline">
                Book a Free Trial Class
              </Link>
            </li>
            <li>
              <Link href="/admissions/apply" className="hover:text-[#4DA3D9] transition">
                Online Admission Form
              </Link>
            </li>
            <li>
              <Link href="/admissions/fees" className="hover:text-[#4DA3D9] transition">
                Fee Structure
              </Link>
            </li>
            <li>
              <Link href="/admissions/faqs" className="hover:text-[#4DA3D9] transition">
                Admissions FAQs
              </Link>
            </li>
            <li>
              <Link href="/resources/free-resources" className="hover:text-[#4DA3D9] transition">
                Free Study Worksheets
              </Link>
            </li>
            <li>
              <Link href="/learning/assessment" className="hover:text-[#4DA3D9] transition">
                Placement Assessment
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#4DA3D9] transition">
                Contact & Support
              </Link>
            </li>
            <li>
              <Link href="/verify-certificate" className="hover:text-[#4DA3D9] transition">
                Verify Certificate
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 py-6">
        <div className="container-aec flex flex-col items-center justify-between gap-4 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} AEC Network — Akbar Education Communication Network. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-white transition">
              About Us
            </Link>
            <Link href="/courses" className="hover:text-white transition">
              All Courses
            </Link>
            <Link href="/admissions/faqs" className="hover:text-white transition">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
            <a
              href="https://wa.me/923435999397"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4DA3D9] hover:text-white font-semibold transition"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
