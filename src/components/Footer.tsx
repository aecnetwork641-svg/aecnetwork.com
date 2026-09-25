import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-aec-navy/10 bg-aec-navy text-white">
      <div className="container-aec grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand & Mission */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-aec-teal text-white text-xs font-black">
              AEC
            </span>
            <span>AEC Network</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            Akbar Education Communication Network provides structured, accessible online education,
            vetted qualified instructors, personalized tutoring, and comprehensive academic support
            for students globally.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="badge bg-white/10 text-white/90 border-white/20">Structured LMS</span>
            <span className="badge bg-white/10 text-white/90 border-white/20">Live Classes</span>
            <span className="badge bg-white/10 text-white/90 border-white/20">Parent Portal</span>
            <span className="badge bg-white/10 text-white/90 border-white/20">Certified Faculty</span>
          </div>
          <p className="mt-6 text-xs text-white/40 leading-normal">
            Note: Contact details, verified accreditation, and organizational certificates are maintained in accordance with AEC regulatory standards.
          </p>
        </div>

        {/* Programs */}
        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-white uppercase">Programs</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/programs/quran-islamic-studies" className="hover:text-white transition">Quran & Islamic Studies</Link></li>
            <li><Link href="/programs/english" className="hover:text-white transition">English Language</Link></li>
            <li><Link href="/programs/arabic" className="hover:text-white transition">Arabic Studies</Link></li>
            <li><Link href="/programs/mathematics" className="hover:text-white transition">Mathematics</Link></li>
            <li><Link href="/programs/academic-support" className="hover:text-white transition">Academic Support</Link></li>
            <li><Link href="/programs/one-to-one" className="hover:text-white transition">One-to-One Tutoring</Link></li>
            <li><Link href="/programs/group-classes" className="hover:text-white transition">Group Cohorts</Link></li>
          </ul>
        </div>

        {/* Portals & Academics */}
        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-white uppercase">Portals</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/admin" className="hover:text-white transition">Admin Portal</Link></li>
            <li><Link href="/student" className="hover:text-white transition">Student Portal</Link></li>
            <li><Link href="/parent" className="hover:text-white transition">Parent Portal</Link></li>
            <li><Link href="/teacher" className="hover:text-white transition">Teacher Portal</Link></li>
            <li><Link href="/academic" className="hover:text-white transition">Academic Administration</Link></li>
            <li><Link href="/supervisor" className="hover:text-white transition">Supervisor Dashboard</Link></li>
            <li><Link href="/finance" className="hover:text-white transition">Finance & Billing</Link></li>
            <li><Link href="/hr" className="hover:text-white transition">HR & Staff Portal</Link></li>
            <li><Link href="/super-admin" className="hover:text-white transition">Super Admin Portal</Link></li>
          </ul>
        </div>

        {/* Admissions & Support */}
        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-white uppercase">Admissions & Info</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/admissions/how-to-enroll" className="hover:text-white transition">How to Enroll</Link></li>
            <li><Link href="/admissions/free-trial" className="hover:text-white transition">Book a Free Trial</Link></li>
            <li><Link href="/admissions/apply" className="hover:text-white transition">Online Admission Form</Link></li>
            <li><Link href="/admissions/fees" className="hover:text-white transition">Fee Structure</Link></li>
            <li><Link href="/admissions/faqs" className="hover:text-white transition">Admissions FAQs</Link></li>
            <li><Link href="/resources" className="hover:text-white transition">Learning Resources</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact & Support</Link></li>
            <li><Link href="/verify-certificate/DEMO-VERIFY" className="hover:text-white transition">Verify Certificate</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 py-6">
        <div className="container-aec flex flex-col items-center justify-between gap-4 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} AEC Network — Akbar Education Communication Network. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/admissions/faqs" className="hover:text-white transition">FAQs</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
