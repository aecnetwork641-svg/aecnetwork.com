import Link from "next/link";

export default function LearningPathsPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <span className="badge badge-info mb-2">Structured Progression</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          AEC Learning Paths
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Step-by-step pathways designed to guide students from foundational literacy to subject fluency.
        </p>
      </div>

      <div className="space-y-6">
        {/* Quran Track */}
        <div className="card border-l-4 border-l-aec-teal">
          <span className="badge badge-info">Track 01</span>
          <h2 className="mt-2 font-display text-xl font-bold text-aec-navy">Quranic Recitation & Memorization Track</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs">
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-teal block mb-1">Stage 1: Qaida</span>
              Letter phonetics, vowels, and word connectivity.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-teal block mb-1">Stage 2: Tajweed</span>
              Rules of Noon/Meem Sakinah, Madd, and Makharij.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-teal block mb-1">Stage 3: Nazra</span>
              Fluent full-text recitation of the Holy Quran.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-teal block mb-1">Stage 4: Hifz</span>
              Systematic memorization with daily revision (Sabaq/Manzil).
            </div>
          </div>
        </div>

        {/* English Track */}
        <div className="card border-l-4 border-l-aec-gold">
          <span className="badge badge-warning">Track 02</span>
          <h2 className="mt-2 font-display text-xl font-bold text-aec-navy">English Language & Academic Communication</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs">
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-gold block mb-1">Stage 1: Basics</span>
              Phonics, vocabulary, basic grammar mechanics.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-gold block mb-1">Stage 2: Fluency</span>
              Conversational dialogues and pronunciation drills.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-gold block mb-1">Stage 3: Reading</span>
              Comprehension, inference, and text analysis.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-gold block mb-1">Stage 4: Writing</span>
              Formal essays, argumentation, and exam responses.
            </div>
          </div>
        </div>

        {/* Mathematics Track */}
        <div className="card border-l-4 border-l-aec-navy">
          <span className="badge badge-neutral">Track 03</span>
          <h2 className="mt-2 font-display text-xl font-bold text-aec-navy">Mathematics & Problem Solving Track</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs">
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-navy block mb-1">Stage 1: Numeracy</span>
              Operations, fractions, decimals, mental math.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-navy block mb-1">Stage 2: Pre-Algebra</span>
              Variables, ratios, proportions, basic geometry.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-navy block mb-1">Stage 3: Algebra</span>
              Linear/quadratic equations, graphing, functions.
            </div>
            <div className="rounded-lg border border-aec-navy/10 p-3 bg-aec-cream/30">
              <span className="font-bold text-aec-navy block mb-1">Stage 4: Advanced</span>
              Trigonometry, proofs, calculus foundations.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-aec-navy/10 pt-6">
        <Link href="/learning/assessment" className="btn-secondary">
          Take Diagnostic Assessment →
        </Link>
        <Link href="/admissions/free-trial" className="btn-primary">
          Book Free Trial Class
        </Link>
      </div>
    </div>
  );
}
