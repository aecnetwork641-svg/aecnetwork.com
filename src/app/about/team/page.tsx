import Link from "next/link";

export default function AboutTeamPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <Link href="/about" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to About
        </Link>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Our Leadership & Administration
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          The academic leadership, admissions counselors, and operations team driving AEC Network.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card">
          <span className="badge badge-info">Academic Leadership</span>
          <h2 className="mt-3 font-display text-lg font-bold text-aec-navy">Academic Directorate</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Overseeing curriculum design, syllabus standards, teacher training, and continuous assessment quality assurance across all academic departments.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-warning">Admissions & Counseling</span>
          <h2 className="mt-3 font-display text-lg font-bold text-aec-navy">Admissions & Student Advisory</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Conducting diagnostic intake evaluations, free trial coordination, student placement, and ongoing family communication.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-success">Operations & Scheduling</span>
          <h2 className="mt-3 font-display text-lg font-bold text-aec-navy">Academic Operations</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Managing timetable generation, class room allocation, platform integrations, and real-time attendance tracking.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-neutral">Student Support</span>
          <h2 className="mt-3 font-display text-lg font-bold text-aec-navy">Technical & Parent Support</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Providing portal support, digital learning materials assistance, and billing invoice guidance for parents.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-aec-navy/10 pt-6">
        <Link href="/about" className="btn-secondary">
          Overview of AEC →
        </Link>
        <Link href="/contact" className="btn-primary">
          Contact the Team
        </Link>
      </div>
    </div>
  );
}
