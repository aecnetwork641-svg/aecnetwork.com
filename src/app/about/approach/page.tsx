import Link from "next/link";

export default function ApproachPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <Link href="/about" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to About
        </Link>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Our Pedagogical Approach
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Structured, student-centric methodologies designed for retention, active participation, and conceptual mastery.
        </p>
      </div>

      <div className="space-y-6">
        <div className="card">
          <span className="badge badge-neutral">Phase 1</span>
          <h2 className="mt-2 font-display text-lg font-bold text-aec-navy">Diagnostic Assessment & Level Placement</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Prior to class assignment, our academic team conducts a diagnostic evaluation to ascertain the student&apos;s baseline proficiency in reading, pronunciation, vocabulary, or problem solving. This ensures learners are neither overwhelmed nor under-challenged.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-info">Phase 2</span>
          <h2 className="mt-2 font-display text-lg font-bold text-aec-navy">Interactive, Teacher-Guided Instruction</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Classes are conducted live with two-way audio-visual interaction. Instructors employ digital whiteboards, screen-shared texts, recitation correction drills, and interactive exercises rather than passive lecturing.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-warning">Phase 3</span>
          <h2 className="mt-2 font-display text-lg font-bold text-aec-navy">Formative Practice & Self-Paced Review</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Following live sessions, students access modular quizzes, downloadable worksheets, and lesson summaries through the Student Portal to reinforce retention between classes.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-success">Phase 4</span>
          <h2 className="mt-2 font-display text-lg font-bold text-aec-navy">Continuous Evaluation & Milestone Reporting</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Instructors submit weekly performance feedback and conduct periodic term exams. Guardians receive automated attendance notices and detailed progress reports.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-aec-navy/10 pt-6">
        <Link href="/about/teachers" className="btn-secondary">
          Meet Our Faculty →
        </Link>
        <Link href="/admissions/free-trial" className="btn-primary">
          Start with a Free Trial
        </Link>
      </div>
    </div>
  );
}
