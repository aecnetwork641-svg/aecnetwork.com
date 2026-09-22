import Link from "next/link";

const PROGRAMS = [
  {
    title: "Quran & Islamic Studies",
    slug: "quran-islamic-studies",
    category: "Islamic Disciplines",
    level: "All Levels (Kids & Adults)",
    delivery: "1-on-1 & Group",
    desc: "Comprehensive curriculum covering Noorani Qaida, articulation points (Makharij), Tajweed rules, fluent Nazra recitation, and Hifz memorization alongside Islamic morals and Dua foundations."
  },
  {
    title: "English Language Mastery",
    slug: "english",
    category: "Linguistics & Communication",
    level: "Beginner to Advanced",
    delivery: "1-on-1 & Group",
    desc: "Systematic language acquisition covering conversational English, grammar fundamentals, reading comprehension, vocabulary expansion, and formal writing for school and professional needs."
  },
  {
    title: "Arabic Studies (Classical & Modern)",
    slug: "arabic",
    category: "Linguistics & Islamic Studies",
    level: "Foundational to Fluent",
    delivery: "1-on-1 & Group",
    desc: "Arabic alphabet reading, vocabulary building, grammar (Nahw & Sarf foundations), and conversational skills designed for Quranic comprehension and communicative proficiency."
  },
  {
    title: "Mathematics & Analytical Thinking",
    slug: "mathematics",
    category: "STEM",
    level: "Grades 1 through 12",
    delivery: "1-on-1 & Small Group",
    desc: "Concept-driven mathematical instruction ranging from elementary numeracy and arithmetic to algebra, geometry, trigonometry, and calculus aligned with international curricula."
  },
  {
    title: "Academic Support & Homework Tutoring",
    slug: "academic-support",
    category: "Academic Coaching",
    level: "Primary & Secondary",
    delivery: "1-on-1 Mentorship",
    desc: "Personalized subject tutoring, homework guidance, exam revision techniques, and concept reinforcement tailored to each student's school curriculum."
  },
  {
    title: "Professional & Digital Skills",
    slug: "professional-skills",
    category: "Practical Skills",
    level: "Foundational",
    delivery: "Self-Paced & Cohort",
    desc: "Practical digital literacy, educational tools, productivity workflows, and communication fundamentals for older learners and working professionals."
  },
  {
    title: "School Support & Board Exam Prep",
    slug: "school-support",
    category: "Exam Readiness",
    level: "Secondary & High School",
    delivery: "1-on-1 & Cohort",
    desc: "Focused revision, past paper analysis, time management strategies, and test-taking methodology for national and international board examinations."
  },
  {
    title: "One-to-One Dedicated Tutoring",
    slug: "one-to-one",
    category: "Customized Delivery",
    level: "All Subjects",
    delivery: "1-on-1",
    desc: "Private 1-on-1 mentorship with a dedicated instructor. Enjoy flexible scheduling, customized pacing, and targeted support in your subject of choice."
  },
  {
    title: "Group Interactive Classes",
    slug: "group-classes",
    category: "Cohort Delivery",
    level: "All Subjects",
    delivery: "Small Cohort (4-8 students)",
    desc: "Structured group learning fostering peer interaction, collaborative discussions, and consistent weekly timetables at cost-effective tuition rates."
  }
];

export default function ProgramsPage() {
  return (
    <div className="container-aec py-14 space-y-12">
      <div className="max-w-3xl">
        <span className="badge badge-info mb-2">Curriculum Catalog</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Academic Programs & Disciplines
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Structured online curricula delivered by qualified educators. Choose between personalized one-to-one instruction and collaborative group cohorts.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map((p) => (
          <div key={p.slug} className="card group flex flex-col justify-between hover:border-aec-teal/50">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="badge badge-neutral text-xs">{p.category}</span>
                <span className="text-[11px] font-semibold text-aec-navy/60">{p.delivery}</span>
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-aec-navy group-hover:text-aec-teal transition">
                {p.title}
              </h2>
              <p className="mt-2 text-xs font-semibold text-aec-gold uppercase tracking-wider">{p.level}</p>
              <p className="mt-2 text-sm text-aec-navy/70 leading-relaxed">{p.desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-aec-navy/10 flex items-center justify-between">
              <Link
                href={`/programs/${p.slug}` as never}
                className="text-xs font-semibold text-aec-teal hover:text-aec-navy transition"
              >
                View Syllabus Outline →
              </Link>
              <Link
                href="/admissions/free-trial"
                className="btn-primary text-xs px-3.5 py-1.5"
              >
                Free Trial
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Advisory Banner */}
      <div className="rounded-2xl border border-aec-navy/10 bg-aec-navy text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-xl font-bold">Unsure which program suits your learner?</h2>
          <p className="mt-1 text-sm text-white/70 max-w-xl">
            Our academic counseling team provides personalized level evaluations and curriculum advice.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admissions/free-trial" className="btn-primary whitespace-nowrap">
            Book a Free Trial
          </Link>
          <Link href="/contact" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 whitespace-nowrap">
            Talk to an Advisor
          </Link>
        </div>
      </div>
    </div>
  );
}
