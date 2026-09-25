import Link from "next/link";

const PROGRAM_CATEGORIES = [
  {
    category: "Islamic & Quranic Disciplines",
    description: "Authentic, teacher-led Quranic and Islamic curricula with certified instructors (Ijazah holders).",
    programs: [
      {
        title: "Quran & Tajweed Mastery",
        slug: "quran-islamic-studies",
        level: "Beginner to Advanced (Kids & Adults)",
        delivery: "1-on-1 & Group",
        desc: "Foundational Noorani Qaida, articulation points (Makharij), comprehensive Tajweed rules, and fluent Nazra recitation."
      },
      {
        title: "Qirat & Melodic Recitation",
        slug: "qirat-course",
        level: "Intermediate to Advanced",
        delivery: "1-on-1 Mentorship",
        desc: "Vocal control, Maqamat modulation, melodic rhythm, and mastery of classical Qirat recitation traditions."
      },
      {
        title: "Translation & Islamic Studies",
        slug: "translation-of-quran",
        level: "All Age Groups",
        delivery: "1-on-1 & Group Cohorts",
        desc: "Word-by-word Quran translation, Tafseer comprehension, Hadith studies, Islamic history, and daily Akhlaq & Duas."
      },
      {
        title: "Hifz-ul-Quran (Memorization)",
        slug: "hifz-quran",
        level: "Dedicated Memorization Track",
        delivery: "1-on-1 Daily Coaching",
        desc: "Systematic memorization schedules, daily lesson recitation (Sabaq), recent revision (Sabqi), and retention cycles (Manzil/Daur)."
      }
    ]
  },
  {
    category: "School & International Board Prep",
    description: "Curriculum-aligned tutoring for national and international board examinations.",
    programs: [
      {
        title: "GCSE & IGCSE Tutoring",
        slug: "gcse",
        level: "UK Curriculum (Years 10–11)",
        delivery: "1-on-1 & Small Cohorts",
        desc: "Targeted subject coaching in Math, English, Biology, Chemistry, and Physics with past paper analysis and grade acceleration."
      },
      {
        title: "O & A Levels (Cambridge / Edexcel)",
        slug: "o-a-levels",
        level: "Secondary & College",
        delivery: "1-on-1 Mentorship",
        desc: "In-depth concept mastery, marking scheme techniques, structured revision, and mock exam simulations for AS/A Level success."
      },
      {
        title: "Naplan Preparation",
        slug: "naplan",
        level: "Years 3, 5, 7 & 9 (Australia)",
        delivery: "1-on-1 & Small Group",
        desc: "Australian National Assessment coaching focusing on Reading, Writing, Language Conventions, and Numeracy proficiency."
      },
      {
        title: "SAT & Digital SAT Tutoring",
        slug: "sat-tutoring",
        level: "High School / College Prep",
        delivery: "1-on-1 Strategy Coaching",
        desc: "Comprehensive preparation covering Math shortcuts, Evidence-Based Reading & Writing, time management, and test-taking strategies."
      },
      {
        title: "GRE Tutoring",
        slug: "gre-tutoring",
        level: "Graduate School Candidates",
        delivery: "1-on-1 Coaching",
        desc: "Quantitative reasoning, Verbal reasoning, Analytical Writing, and targeted drills to achieve 320+ scores."
      }
    ]
  },
  {
    category: "Academic STEM & Languages",
    description: "Foundational and advanced academic coaching in core school subjects.",
    programs: [
      {
        title: "English Language Mastery",
        slug: "english",
        level: "Beginner to Advanced",
        delivery: "1-on-1 & Group",
        desc: "Conversational fluency, grammar fundamentals, reading comprehension, vocabulary building, and structured academic writing."
      },
      {
        title: "Arabic Studies (Classical & Modern)",
        slug: "arabic",
        level: "Foundational to Fluent",
        delivery: "1-on-1 & Group",
        desc: "Arabic alphabet, vocabulary building, grammar (Nahw & Sarf foundations), and spoken conversation for Quranic understanding."
      },
      {
        title: "Mathematics & Analytical Thinking",
        slug: "mathematics",
        level: "Grades 1 through 12",
        delivery: "1-on-1 & Small Group",
        desc: "Concept-driven math instruction from elementary arithmetic and numeracy to algebra, geometry, trigonometry, and calculus."
      },
      {
        title: "Science (Physics, Chemistry & Biology)",
        slug: "science",
        level: "Primary & Secondary",
        delivery: "1-on-1 & Cohort",
        desc: "Inquiry-based scientific principles, conceptual experiments, diagrammatic explanations, and school exam readiness."
      }
    ]
  },
  {
    category: "IT, Programming & Digital Skills",
    description: "Career-ready technology training and hands-on computer skills.",
    programs: [
      {
        title: "Computer Science Foundations",
        slug: "computer-science",
        level: "Beginner to Intermediate",
        delivery: "Cohort & 1-on-1",
        desc: "Computational thinking, computer hardware/software architecture, algorithms, data structures, and logic."
      },
      {
        title: "Computer Programming (Coding)",
        slug: "computer-programming",
        level: "Beginner to Advanced",
        delivery: "Hands-on Project Based",
        desc: "Learn Python, C++, and JavaScript through practical coding exercises, logic building, and mini-project developments."
      },
      {
        title: "Web Designing & UI/UX",
        slug: "web-designing",
        level: "Beginner to Intermediate",
        delivery: "Interactive Cohort",
        desc: "Modern responsive web design with HTML5, CSS3, Tailwind CSS, Bootstrap, Figma UI/UX, and creative web layouts."
      },
      {
        title: "Web Development (Full Stack)",
        slug: "web-development",
        level: "Intermediate to Pro",
        delivery: "Project Cohort & Mentorship",
        desc: "Full-stack development with Next.js, React, Node.js, databases (PostgreSQL/MongoDB), REST APIs, and production deployment."
      },
      {
        title: "Social Media Marketing (SMM)",
        slug: "social-media-marketing-smm",
        level: "All Levels",
        delivery: "Practical Workshop",
        desc: "Digital marketing strategies, Meta & Google Ads, content creation, social media growth, analytics, and branding."
      }
    ]
  }
];

export default function ProgramsPage() {
  return (
    <div className="container-aec py-14 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="badge badge-info mb-2">Curriculum Catalog</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Academic Programs & Disciplines
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Explore our complete academic offerings across Islamic disciplines, school & international board prep, STEM subjects, and cutting-edge IT & digital skills.
        </p>
      </div>

      {/* Category Sections */}
      {PROGRAM_CATEGORIES.map((cat) => (
        <div key={cat.category} className="space-y-6">
          <div className="border-b border-aec-navy/10 pb-3">
            <h2 className="font-display text-2xl font-bold text-aec-navy">{cat.category}</h2>
            <p className="text-sm text-aec-navy/60 mt-1">{cat.description}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cat.programs.map((p) => (
              <div key={p.slug} className="card group flex flex-col justify-between hover:border-aec-teal/50 hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge badge-neutral text-[11px]">{p.delivery}</span>
                    <span className="text-[11px] font-semibold text-aec-gold uppercase tracking-wider">{p.level}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-aec-navy group-hover:text-aec-teal transition">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-aec-navy/70 leading-relaxed">{p.desc}</p>
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
        </div>
      ))}

      {/* Advisory Banner */}
      <div className="rounded-2xl border border-aec-navy/10 bg-aec-navy text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
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
