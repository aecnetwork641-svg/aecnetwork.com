import Link from "next/link";

export default function AssessmentPlacementPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <span className="badge badge-warning mb-2">Level Evaluation</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Placement & Diagnostic Assessment
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          How AEC Network accurately evaluates student capability to place learners in optimal curriculum modules.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card">
          <h2 className="font-display text-lg font-bold text-aec-navy">1. Live Diagnostic Evaluation</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            During your complimentary trial class, an assigned educator evaluates pronunciation, reading speed, grammar recognition, or math reasoning in a supportive, low-pressure environment.
          </p>
        </div>

        <div className="card">
          <h2 className="font-display text-lg font-bold text-aec-navy">2. Custom Learning Plan</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Following the diagnostic session, the teacher prepares an intake note outlining recommended weekly frequency, starting module, and target milestones.
          </p>
        </div>

        <div className="card">
          <h2 className="font-display text-lg font-bold text-aec-navy">3. Continuous Formative Quizzes</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Throughout enrollment, modular LMS quizzes and oral drills monitor comprehension so pacing can be adjusted dynamically.
          </p>
        </div>

        <div className="card">
          <h2 className="font-display text-lg font-bold text-aec-navy">4. Term Progress Certification</h2>
          <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">
            Upon completing all modules and passing final term reviews, students receive an official, verifiable AEC Network Certificate of Completion.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-aec-navy/10 bg-aec-cream/50 p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-aec-navy">Schedule Your Assessment Today</h2>
        <p className="mt-2 text-sm text-aec-navy/70 max-w-md mx-auto">
          Diagnostic evaluations are integrated seamlessly into our free trial session.
        </p>
        <div className="mt-6">
          <Link href="/admissions/free-trial" className="btn-primary">
            Schedule Free Diagnostic Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
