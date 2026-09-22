import Link from "next/link";

export default function AboutTeachersPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <Link href="/about" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to About
        </Link>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Our Faculty & Educators
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          The qualified instructors, scholars, and curriculum specialists behind AEC Network.
        </p>
      </div>

      <div className="card bg-white space-y-4">
        <h2 className="font-display text-xl font-bold text-aec-navy">Faculty Vetting & Standards</h2>
        <p className="text-sm text-aec-navy/75 leading-relaxed">
          At AEC Network, every educator is selected through a rigorous multi-stage vetting process:
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 text-sm text-aec-navy/80 pt-2">
          <li className="rounded-xl border border-aec-navy/10 p-3.5 bg-aec-cream/30">
            <span className="font-semibold text-aec-navy block mb-1">Academic & Quranic Credentials</span>
            Verification of degrees, Tajweed Ijazah certifications, and teaching diplomas.
          </li>
          <li className="rounded-xl border border-aec-navy/10 p-3.5 bg-aec-cream/30">
            <span className="font-semibold text-aec-navy block mb-1">Pedagogical Demo Assessment</span>
            Live mock teaching evaluations assessing patience, clarity, and pronunciation accuracy.
          </li>
          <li className="rounded-xl border border-aec-navy/10 p-3.5 bg-aec-cream/30">
            <span className="font-semibold text-aec-navy block mb-1">Background Checks</span>
            Comprehensive identity and background verification to ensure student safety.
          </li>
          <li className="rounded-xl border border-aec-navy/10 p-3.5 bg-aec-cream/30">
            <span className="font-semibold text-aec-navy block mb-1">Continuous Professional Training</span>
            Ongoing workshops on online educational technology, student engagement, and classroom management.
          </li>
        </ul>
      </div>

      {/* Verified faculty listing notice */}
      <div className="rounded-2xl border border-aec-navy/10 bg-white p-8 space-y-4">
        <h2 className="font-display text-lg font-bold text-aec-navy">Faculty Departments</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border-l-2 border-aec-teal pl-3">
            <p className="font-semibold text-aec-navy text-sm">Department of Quranic Studies</p>
            <p className="text-xs text-aec-navy/60 mt-1">Specializing in Noorani Qaida, Tajweed rules, Nazra, and Hifz memorization.</p>
          </div>
          <div className="border-l-2 border-aec-teal pl-3">
            <p className="font-semibold text-aec-navy text-sm">Department of Languages</p>
            <p className="text-xs text-aec-navy/60 mt-1">Focusing on English language communicative competence and Arabic linguistics.</p>
          </div>
          <div className="border-l-2 border-aec-teal pl-3">
            <p className="font-semibold text-aec-navy text-sm">Department of Mathematics & STEM</p>
            <p className="text-xs text-aec-navy/60 mt-1">Dedicated to foundational math, analytical problem solving, and science tutoring.</p>
          </div>
          <div className="border-l-2 border-aec-teal pl-3">
            <p className="font-semibold text-aec-navy text-sm">Academic Support & Tutoring</p>
            <p className="text-xs text-aec-navy/60 mt-1">School curriculum alignment, homework assistance, and board exam preparation.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-aec-navy/10 pt-6">
        <Link href="/about/team" className="btn-secondary">
          AEC Leadership Team →
        </Link>
        <Link href="/admissions/free-trial" className="btn-primary">
          Meet a Teacher in a Free Trial
        </Link>
      </div>
    </div>
  );
}
