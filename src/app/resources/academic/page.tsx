import Link from "next/link";

export default function AcademicResourcesPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <Link href="/resources" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to Resources Hub
        </Link>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Academic & STEM Study Resources
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Subject summaries, mathematical formulas, and language practice materials.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card">
          <span className="badge badge-warning">Mathematics</span>
          <h2 className="mt-2 font-display text-base font-bold text-aec-navy">Essential Algebra & Geometry Formulas</h2>
          <ul className="mt-3 space-y-1.5 text-xs text-aec-navy/75">
            <li>• Quadratic Formula: <code>x = (-b ± √(b² - 4ac)) / (2a)</code></li>
            <li>• Pythagorean Theorem: <code>a² + b² = c²</code></li>
            <li>• Area Formulas: Circle (<code>πr²</code>), Triangle (<code>½bh</code>), Trapezoid (<code>½(a+b)h</code>)</li>
            <li>• Trigonometric Ratios: <code>sin = O/H</code>, <code>cos = A/H</code>, <code>tan = O/A</code></li>
          </ul>
        </div>

        <div className="card">
          <span className="badge badge-info">English Language</span>
          <h2 className="mt-2 font-display text-base font-bold text-aec-navy">Essay Structure & Argumentation Guide</h2>
          <ul className="mt-3 space-y-1.5 text-xs text-aec-navy/75">
            <li>• <strong>Introduction:</strong> Hook sentence, background context, clear thesis statement.</li>
            <li>• <strong>Body Paragraphs:</strong> Topic sentence, evidence/example, explanation, concluding link.</li>
            <li>• <strong>Conclusion:</strong> Restate thesis in new words, summarize main arguments, broader insight.</li>
            <li>• <strong>Transition Words:</strong> Furthermore, consequently, whereas, nonetheless.</li>
          </ul>
        </div>

        <div className="card">
          <span className="badge badge-success">Science & Problem Solving</span>
          <h2 className="mt-2 font-display text-base font-bold text-aec-navy">Scientific Method & Hypothesis Framework</h2>
          <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
            Observation $\rightarrow$ Research Question $\rightarrow$ Testable Hypothesis $\rightarrow$ Controlled Experiment $\rightarrow$ Data Analysis $\rightarrow$ Verified Conclusion.
          </p>
        </div>

        <div className="card">
          <span className="badge badge-neutral">Study Skills</span>
          <h2 className="mt-2 font-display text-base font-bold text-aec-navy">Active Recall & Spaced Repetition Techniques</h2>
          <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
            Practical methods for improving long-term retention using self-quizzing, summary sheets, and progressive revision intervals (Day 1, Day 3, Day 7, Day 21).
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-aec-navy/10 pt-6">
        <Link href="/programs/mathematics" className="btn-secondary">
          Explore Mathematics Program →
        </Link>
        <Link href="/admissions/free-trial" className="btn-primary">
          Join Academic Tutoring
        </Link>
      </div>
    </div>
  );
}
