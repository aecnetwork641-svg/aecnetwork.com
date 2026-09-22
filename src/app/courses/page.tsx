import Link from "next/link";

const COURSES = [
  {
    slug: "quran-reading-foundations",
    title: "Quran Reading Foundations (Noorani Qaida)",
    category: "Quran & Islamic Studies",
    level: "Beginner",
    deliveryMode: "One-to-One / Group",
    durationWeeks: 12,
    modulesCount: 4,
    lessonsCount: 24,
    desc: "Arabic letter phonetics, Makharij articulation points, short/long vowels, and word connectivity for complete beginners."
  },
  {
    slug: "tajweed-and-recitation",
    title: "Applied Tajweed & Nazra Recitation",
    category: "Quran & Islamic Studies",
    level: "Intermediate",
    deliveryMode: "One-to-One",
    durationWeeks: 16,
    modulesCount: 5,
    lessonsCount: 32,
    desc: "Systematic mastery of Noon/Meem Sakinah, Madd rules, Waqf stopping signs, and guided recitation of Juz Amma."
  },
  {
    slug: "english-foundations",
    title: "English Language Foundations & Fluency",
    category: "English",
    level: "Beginner to Intermediate",
    deliveryMode: "Group / One-to-One",
    durationWeeks: 12,
    modulesCount: 4,
    lessonsCount: 28,
    desc: "Functional grammar, pronunciation, daily conversation dialogues, vocabulary building, and sentence construction."
  },
  {
    slug: "arabic-conversation",
    title: "Arabic Grammar & Spoken Conversation",
    category: "Arabic",
    level: "Intermediate",
    deliveryMode: "Group Cohort",
    durationWeeks: 14,
    modulesCount: 4,
    lessonsCount: 28,
    desc: "Classical Arabic sentence syntax (Nahw & Sarf foundations) blended with Modern Standard Arabic communicative dialogues."
  },
  {
    slug: "mathematics-foundations",
    title: "Mathematics Foundations & Pre-Algebra",
    category: "Mathematics",
    level: "Grades 4 through 8",
    deliveryMode: "One-to-One / Small Cohort",
    durationWeeks: 16,
    modulesCount: 6,
    lessonsCount: 36,
    desc: "Number sense, fractions, decimals, ratios, linear equations, geometry essentials, and word problem strategies."
  },
  {
    slug: "school-academic-coaching",
    title: "Comprehensive School Academic Coaching",
    category: "Academic Support",
    level: "All Grades",
    deliveryMode: "One-to-One Mentorship",
    durationWeeks: 12,
    modulesCount: 4,
    lessonsCount: 24,
    desc: "Personalized subject tutoring, homework support, concept reinforcement, and test-taking strategies aligned with school boards."
  }
];

export default function CoursesPage() {
  return (
    <div className="container-aec py-14 space-y-12">
      <div className="max-w-3xl">
        <span className="badge badge-info mb-2">LMS Catalog</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Online Learning Course Catalog
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Structured modular LMS courses featuring live interactive sessions, video/text lessons, quizzes, assignments, and verifiable certifications.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c) => (
          <div key={c.slug} className="card group flex flex-col justify-between hover:border-aec-teal/50">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="badge badge-neutral text-xs">{c.category}</span>
                <span className="badge badge-warning text-xs">{c.level}</span>
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-aec-navy group-hover:text-aec-teal transition">
                {c.title}
              </h2>
              <p className="mt-2 text-xs text-aec-navy/60 font-medium">
                {c.durationWeeks} Weeks • {c.modulesCount} Modules • {c.lessonsCount} Lessons
              </p>
              <p className="mt-3 text-sm text-aec-navy/70 leading-relaxed">{c.desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-aec-navy/10 flex items-center justify-between">
              <Link
                href={`/courses/${c.slug}` as never}
                className="text-xs font-semibold text-aec-teal hover:text-aec-navy transition"
              >
                View Syllabus & LMS →
              </Link>
              <Link
                href="/admissions/free-trial"
                className="btn-primary text-xs px-3.5 py-1.5"
              >
                Enroll
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* LMS Architecture info */}
      <div className="rounded-2xl border border-aec-navy/10 bg-aec-cream/40 p-8">
        <h2 className="font-display text-lg font-bold text-aec-navy">AEC Learning Management System Features</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3 text-xs text-aec-navy/80">
          <div className="rounded-xl border border-aec-navy/10 bg-white p-4">
            <span className="font-bold text-aec-teal block mb-1">Live Interactive Classrooms</span>
            Direct integration with protected video meeting platforms and calendar schedules.
          </div>
          <div className="rounded-xl border border-aec-navy/10 bg-white p-4">
            <span className="font-bold text-aec-teal block mb-1">Interactive Quizzes & Scoring</span>
            Automated quiz evaluations with instant pass/fail feedback and progress reporting.
          </div>
          <div className="rounded-xl border border-aec-navy/10 bg-white p-4">
            <span className="font-bold text-aec-teal block mb-1">Verifiable Certificates</span>
            Official digital certificates issued upon completion with unique public verification IDs.
          </div>
        </div>
      </div>
    </div>
  );
}
