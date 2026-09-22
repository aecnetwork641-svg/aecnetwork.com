import Link from "next/link";

export default function FreeResourcesPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <Link href="/resources" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to Resources Hub
        </Link>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Free Learning & Study Resources
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Open-access learning tools, printable study sheets, and guides for students and parents.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card">
          <span className="badge badge-info">PDF Download</span>
          <h2 className="mt-2 font-display text-base font-bold text-aec-navy">Noorani Qaida Letters & Makharij Chart</h2>
          <p className="mt-1 text-xs text-aec-navy/70 leading-relaxed">
            Visual reference chart illustrating Arabic letter throat and tongue points (Makharij al-Huroof).
          </p>
          <div className="mt-4">
            <span className="badge badge-neutral text-xs">Included in Curriculum</span>
          </div>
        </div>

        <div className="card">
          <span className="badge badge-info">PDF Download</span>
          <h2 className="mt-2 font-display text-base font-bold text-aec-navy">Daily Essential Masnoon Duas Sheet</h2>
          <p className="mt-1 text-xs text-aec-navy/70 leading-relaxed">
            Arabic text, transliteration, and English translation for waking, eating, leaving home, and sleeping.
          </p>
          <div className="mt-4">
            <span className="badge badge-neutral text-xs">Included in Curriculum</span>
          </div>
        </div>

        <div className="card">
          <span className="badge badge-warning">Interactive</span>
          <h2 className="mt-2 font-display text-base font-bold text-aec-navy">English Grammar Quick Reference</h2>
          <p className="mt-1 text-xs text-aec-navy/70 leading-relaxed">
            Summary tables of 12 English tenses, irregular verbs, and active/passive voice constructions.
          </p>
          <div className="mt-4">
            <span className="badge badge-neutral text-xs">Open Access</span>
          </div>
        </div>

        <div className="card">
          <span className="badge badge-warning">Printable</span>
          <h2 className="mt-2 font-display text-base font-bold text-aec-navy">Weekly Student Study Timetable Planner</h2>
          <p className="mt-1 text-xs text-aec-navy/70 leading-relaxed">
            Printable schedule grid to organize class timings, homework review slots, and revision targets.
          </p>
          <div className="mt-4">
            <span className="badge badge-neutral text-xs">Printable PDF</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-aec-navy/10 pt-6">
        <Link href="/resources/islamic" className="btn-secondary">
          Islamic Resources →
        </Link>
        <Link href="/admissions/free-trial" className="btn-primary">
          Join Live Classes
        </Link>
      </div>
    </div>
  );
}
