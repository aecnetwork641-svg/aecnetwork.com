import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-aec-navy/10 bg-aec-navy text-white">
      <div className="container-aec grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block transition hover:opacity-95">
            <Logo variant="full" theme="dark" size="md" />
          </Link>

          <p className="max-w-sm text-sm leading-relaxed text-white/80">
            <strong>Akbar Education Communication (AEC) Network</strong> provides structured, accessible online education, vetted qualified instructors, personalized 1-on-1 tutoring, and comprehensive academic support for students worldwide.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">🕌 Islamic Disciplines</span>
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">📚 Academic STEM</span>
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">🎓 GCSE / SAT / GRE</span>
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">💻 Coding & Web Dev</span>
            <span className="badge bg-white/10 text-white/90 border-white/20 text-[11px]">👨‍🏫 1-on-1 & Cohorts</span>
          </div>

          <div className="space-y-1.5 pt-2 text-xs text-white/70">
            <p className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">💬 WhatsApp:</span>
              <a href="https://wa.me/923435999397" target="_blank" rel="noopener noreferrer" className="text-white hover:text-aec-teal transition">
                +92 343 5999397
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-aec-teal font-bold">✉️ Admissions:</span>
              <a href="mailto:info@aecnetwork.com" className="text-white hover:text-aec-teal transition">
                info@aecnetwork.com
              </a>
            </p>
            <p className="flex items-center gap-2 text-white/60">
              <span>🌐 Coverage:</span>
              <span>Pakistan, UK, USA, Australia, UAE & Global</span>
            </p>
          </div>
        </div>

        {/* Academic Programs */}
        <div>
          <p className="font-display text-xs font-bold tracking-wider text-aec-teal uppercase">
            Academic Programs
          </p>
          <ul className="mt-4 space-y-2.5 text-xs text-white/75">
            <li>
              <Link href="/programs/quran-islamic-studies" className="hover:text-white transition">
                Quran & Tajweed Mastery
              </Link>
            </li>
            <li>
              <Link href="/programs/translation-of-quran" className="hover:text-white transition">
                Islamic Studies & Translation
              </Link>
            </li>
            <li>
              <Link href="/programs/qirat-course" className="hover:text-white transition">
                Qirat & Melodic Recitation
              </Link>
            </li>
            <li>
              <Link href="/programs/gcse" className="hover:text-white transition">
                GCSE & IGCSE Tutoring
              </Link>
            </li>
            <li>
              <Link href="/programs/o-a-levels" className="hover:text-white transition">
                O & A Levels (Cambridge/Edexcel)
              </Link>
            </li>
            <li>
              <Link href="/programs/naplan" className="hover:text-white transition">
                NAPLAN Preparation (Australia)
              </Link>
            </li>
            <li>
              <Link href="/programs/sat-tutoring" className="hover:text-white transition">
                SAT & GRE Test Prep
              </Link>
            </li>
            <li>
              <Link href="/programs/computer-programming" className="hover:text-white transition">
                Computer Programming & Coding
              </Link>
            </li>
            <li>
              <Link href="/programs/web-development" className="hover:text-white transition">
                Web Designing & Development
              </Link>
            </li>
            <li>
              <Link href="/programs/social-media-marketing-smm" className="hover:text-white transition">
                Social Media Marketing (SMM)
              </Link>
            </li>
            <li className="pt-1">
              <Link href="/programs" className="font-semibold text-aec-teal hover:underline flex items-center gap-1">
                <span>View All 20+ Programs</span>
                <span>→</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Portals */}
        <div>
          <p className="font-display text-xs font-bold tracking-wider text-aec-teal uppercase">
            Portals & Systems
          </p>
          <ul className="mt-4 space-y-2.5 text-xs text-white/75">
            <li>
              <Link href="/admin" className="hover:text-white transition">
                Admin Portal
              </Link>
            </li>
            <li>
              <Link href="/student" className="hover:text-white transition">
                Student Portal
              </Link>
            </li>
            <li>
              <Link href="/parent" className="hover:text-white transition">
                Parent Portal
              </Link>
            </li>
            <li>
              <Link href="/teacher" className="hover:text-white transition">
                Teacher Portal
              </Link>
            </li>
            <li>
              <Link href="/academic" className="hover:text-white transition">
                Academic Portal
              </Link>
            </li>
            <li>
              <Link href="/supervisor" className="hover:text-white transition">
                Supervisor Portal
              </Link>
            </li>
            <li>
              <Link href="/finance" className="hover:text-white transition">
                Finance & Invoices
              </Link>
            </li>
            <li>
              <Link href="/hr" className="hover:text-white transition">
                HR & Payroll Portal
              </Link>
            </li>
            <li>
              <Link href="/super-admin" className="hover:text-white transition">
                Super Admin Portal
              </Link>
            </li>
            <li className="pt-1">
              <Link href="/login" className="font-semibold text-aec-gold hover:underline">
                Portal Login Gateway →
              </Link>
            </li>
          </ul>
        </div>

        {/* Admissions & Info */}
        <div>
          <p className="font-display text-xs font-bold tracking-wider text-aec-teal uppercase">
            Admissions & Info
          </p>
          <ul className="mt-4 space-y-2.5 text-xs text-white/75">
            <li>
              <Link href="/about" className="hover:text-white transition font-medium">
                About AEC Network
              </Link>
            </li>
            <li>
              <Link href="/about/mission-vision" className="hover:text-white transition">
                Mission & Vision
              </Link>
            </li>
            <li>
              <Link href="/admissions/how-to-enroll" className="hover:text-white transition">
                How to Enroll
              </Link>
            </li>
            <li>
              <Link href="/admissions/free-trial" className="text-emerald-400 font-semibold hover:underline">
                Book a Free Trial Class
              </Link>
            </li>
            <li>
              <Link href="/admissions/apply" className="hover:text-white transition">
                Online Admission Form
              </Link>
            </li>
            <li>
              <Link href="/admissions/fees" className="hover:text-white transition">
                Fee Structure
              </Link>
            </li>
            <li>
              <Link href="/admissions/faqs" className="hover:text-white transition">
                Admissions FAQs
              </Link>
            </li>
            <li>
              <Link href="/resources/free-resources" className="hover:text-white transition">
                Free Study Worksheets
              </Link>
            </li>
            <li>
              <Link href="/learning/assessment" className="hover:text-white transition">
                Placement Assessment
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact & Support
              </Link>
            </li>
            <li>
              <Link href="/verify-certificate" className="hover:text-white transition">
                Verify Certificate
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/25 py-6">
        <div className="container-aec flex flex-col items-center justify-between gap-4 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} AEC Network — Akbar Education Communication Network. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-white transition">
              About Us
            </Link>
            <Link href="/programs" className="hover:text-white transition">
              Programs
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
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
