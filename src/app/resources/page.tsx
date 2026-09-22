import Link from "next/link";

export default function ResourcesHubPage() {
  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      <div>
        <span className="badge badge-info mb-2">Study Materials</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          AEC Learning & Study Resources
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Curated worksheets, phonetics guides, Tajweed charts, and academic reference materials.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Link href="/resources/islamic" className="card group hover:border-aec-teal">
          <span className="badge badge-info">Islamic Studies</span>
          <h2 className="mt-3 font-display text-lg font-bold text-aec-navy group-hover:text-aec-teal transition">
            Quran & Tajweed Guides
          </h2>
          <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
            Noorani Qaida charts, Makharij diagrams, Waqf stopping rule references, and daily Dua sheets.
          </p>
          <span className="mt-4 inline-block text-xs font-semibold text-aec-teal">Explore resources →</span>
        </Link>

        <Link href="/resources/academic" className="card group hover:border-aec-teal">
          <span className="badge badge-warning">Academic</span>
          <h2 className="mt-3 font-display text-lg font-bold text-aec-navy group-hover:text-aec-teal transition">
            English & Math Worksheets
          </h2>
          <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
            Grammar quick-references, reading comprehension passages, arithmetic drills, and algebra cheat sheets.
          </p>
          <span className="mt-4 inline-block text-xs font-semibold text-aec-teal">Explore resources →</span>
        </Link>

        <Link href="/resources/free-resources" className="card group hover:border-aec-teal">
          <span className="badge badge-success">Open Access</span>
          <h2 className="mt-3 font-display text-lg font-bold text-aec-navy group-hover:text-aec-teal transition">
            Free Study Tools
          </h2>
          <p className="mt-2 text-xs text-aec-navy/70 leading-relaxed">
            Self-study audio pronunciation files, digital flashcards, and student timetable planners.
          </p>
          <span className="mt-4 inline-block text-xs font-semibold text-aec-teal">Explore resources →</span>
        </Link>
      </div>

      {/* Blog & Articles link */}
      <div className="card bg-aec-navy text-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-xl font-bold">AEC Educational Blog & Articles</h2>
          <p className="mt-1 text-sm text-white/70">Read articles on online learning strategies, parenting tips, and Quranic pedagogy.</p>
        </div>
        <Link href="/blog" className="btn-primary whitespace-nowrap">
          Read Blog Articles
        </Link>
      </div>
    </div>
  );
}
