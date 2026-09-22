import Link from "next/link";

export default function AdmissionRequirementsPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <Link href="/admissions" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to Admissions
        </Link>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Admission Requirements & Guidelines
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Technical requirements, baseline guidelines, and prerequisites for joining AEC Network online classes.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Technical Requirements */}
        <div className="card">
          <span className="badge badge-info">Hardware & Software</span>
          <h2 className="mt-3 font-display text-lg font-bold text-aec-navy">Technical Setup</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-aec-navy/75">
            <li className="flex items-start gap-2">
              <span className="text-aec-teal font-bold">•</span>
              <span><strong>Device:</strong> Laptop, desktop computer, or tablet with updated web browser (Chrome, Firefox, Safari, Edge).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-aec-teal font-bold">•</span>
              <span><strong>Internet Connection:</strong> Stable broadband connection (minimum 2 Mbps recommended for high-definition two-way video).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-aec-teal font-bold">•</span>
              <span><strong>Audio & Video:</strong> Functional webcam and headset/microphone for clear voice pronunciation drills.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-aec-teal font-bold">•</span>
              <span><strong>Quiet Study Space:</strong> Distraction-free environment during live class sessions.</span>
            </li>
          </ul>
        </div>

        {/* Academic Prerequisites */}
        <div className="card">
          <span className="badge badge-warning">Prerequisites</span>
          <h2 className="mt-3 font-display text-lg font-bold text-aec-navy">Academic Placement</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-aec-navy/75">
            <li className="flex items-start gap-2">
              <span className="text-aec-teal font-bold">•</span>
              <span><strong>Quranic Foundations:</strong> No prior Arabic knowledge required for beginners starting Noorani Qaida.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-aec-teal font-bold">•</span>
              <span><strong>Intermediate Quran/Tajweed:</strong> Short recitation assessment during the trial class to determine baseline placement.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-aec-teal font-bold">•</span>
              <span><strong>Languages (English & Arabic):</strong> Placement evaluation determining conversational or grammatical cohort tier.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-aec-teal font-bold">•</span>
              <span><strong>Mathematics & STEM:</strong> Matching with student&apos;s current school grade level syllabus.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Code of Conduct */}
      <div className="card bg-white space-y-4">
        <h2 className="font-display text-xl font-bold text-aec-navy">Student & Parent Commitments</h2>
        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          <div className="rounded-xl border border-aec-navy/10 p-4 bg-aec-cream/30">
            <p className="font-semibold text-aec-navy text-sm">Punctuality</p>
            <p className="mt-1 text-xs text-aec-navy/70">Logging in 5 minutes prior to scheduled session time to verify audio and video connection.</p>
          </div>
          <div className="rounded-xl border border-aec-navy/10 p-4 bg-aec-cream/30">
            <p className="font-semibold text-aec-navy text-sm">Active Participation</p>
            <p className="mt-1 text-xs text-aec-navy/70">Completing weekly assigned drills, exercises, and interactive reviews.</p>
          </div>
          <div className="rounded-xl border border-aec-navy/10 p-4 bg-aec-cream/30">
            <p className="font-semibold text-aec-navy text-sm">Parent Partnership</p>
            <p className="mt-1 text-xs text-aec-navy/70">Regularly reviewing portal feedback notes and communicating rescheduling needs in advance.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-aec-navy/10 pt-6">
        <Link href="/admissions/how-to-enroll" className="btn-secondary">
          How to Enroll Guide →
        </Link>
        <Link href="/admissions/free-trial" className="btn-primary">
          Start with a Free Trial
        </Link>
      </div>
    </div>
  );
}
