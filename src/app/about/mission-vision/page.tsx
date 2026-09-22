import Link from "next/link";

export default function MissionVisionPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <Link href="/about" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to About
        </Link>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Mission & Vision
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          The foundational educational principles guiding AEC Network across international borders.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="card border-t-4 border-t-aec-teal">
          <span className="badge badge-info">Our Core Mission</span>
          <h2 className="mt-3 font-display text-xl font-bold text-aec-navy">Accessible, High-Caliber Education</h2>
          <p className="mt-3 text-sm text-aec-navy/75 leading-relaxed">
            To provide structured, accountable, and spiritually grounded online learning that empowers students of all backgrounds with Quranic recitation mastery, linguistic fluency, and critical STEM foundations.
          </p>
        </div>

        <div className="card border-t-4 border-t-aec-gold">
          <span className="badge badge-warning">Our Vision</span>
          <h2 className="mt-3 font-display text-xl font-bold text-aec-navy">A Trusted Global Academy</h2>
          <p className="mt-3 text-sm text-aec-navy/75 leading-relaxed">
            To establish AEC Network as a globally recognized digital academy known for pedagogical integrity, verified educator qualifications, and transparent parent-teacher partnership.
          </p>
        </div>
      </div>

      <div className="card bg-white space-y-4">
        <h2 className="font-display text-xl font-bold text-aec-navy">Our Guiding Values</h2>
        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          <div className="rounded-xl border border-aec-navy/10 p-4 bg-aec-cream/30">
            <p className="font-display text-sm font-bold text-aec-navy">Academic Rigor</p>
            <p className="mt-1 text-xs text-aec-navy/70">Systematic syllabi, regular assessments, and clear competency benchmarks.</p>
          </div>
          <div className="rounded-xl border border-aec-navy/10 p-4 bg-aec-cream/30">
            <p className="font-display text-sm font-bold text-aec-navy">Moral & Spiritual Growth</p>
            <p className="mt-1 text-xs text-aec-navy/70">Nurturing ethical character alongside subject knowledge in Islamic disciplines.</p>
          </div>
          <div className="rounded-xl border border-aec-navy/10 p-4 bg-aec-cream/30">
            <p className="font-display text-sm font-bold text-aec-navy">Integrity & Transparency</p>
            <p className="mt-1 text-xs text-aec-navy/70">Honest student evaluations, real-time parent reports, and zero unverified claims.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-aec-navy/10 pt-6">
        <Link href="/about/why-aec" className="btn-secondary">
          Discover Why Choose AEC →
        </Link>
        <Link href="/admissions/free-trial" className="btn-primary">
          Book a Free Trial Class
        </Link>
      </div>
    </div>
  );
}
