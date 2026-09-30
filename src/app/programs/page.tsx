import Link from "next/link";
import { getCourseImage } from "@/lib/course-images";
import PageHeaderBanner from "@/components/PageHeaderBanner";

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
    <div className="space-y-14 pb-16">
      {/* Mentor Style Page Head Banner */}
      <PageHeaderBanner
        title="Academic Programs & Disciplines"
        subtitle="Explore our complete academic offerings across Islamic disciplines, school & international board prep, STEM subjects, and cutting-edge IT & digital skills."
        badge="Curriculum Catalog"
        breadcrumbCurrent="Programs"
        bgImage="/images/banner-1.jpg"
      />

      <div className="container-aec space-y-16">
        {/* Category Sections */}
      {PROGRAM_CATEGORIES.map((cat) => (
        <div key={cat.category} className="space-y-6">
          <div className="border-b border-slate-200/80 pb-3">
            <h2 className="font-display text-2xl font-extrabold text-[#0B1F3A]">{cat.category}</h2>
            <p className="text-sm text-slate-500 mt-1">{cat.description}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cat.programs.map((p, idx) => (
              <div
                key={p.slug}
                className="mentor-card group flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-aec-teal/50"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div>
                  {/* Program Cover Image with Zoom */}
                  <div className="w-full h-52 overflow-hidden bg-slate-100 relative">
                    <img 
                      src={getCourseImage(cat.category, p.slug)}
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 bg-[#4DA3D9] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      {p.level}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="bg-[#EAF5FC] text-[#4DA3D9] text-xs font-bold px-3 py-1 rounded-md border border-[#4DA3D9]/30">
                        {p.delivery}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-extrabold text-[#0B1F3A] group-hover:text-[#4DA3D9] transition line-clamp-2">
                      {p.title}
                    </h3>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <Link
                    href={`/programs/${p.slug}` as never}
                    className="text-xs font-bold text-[#0B1F3A] group-hover:text-[#4DA3D9] transition flex items-center gap-1"
                  >
                    <span>View Curriculum</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/admissions/free-trial"
                    className="mentor-btn-primary text-xs px-4 py-1.5 shadow-sm hover:shadow-md transition"
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
      <div className="rounded-2xl border border-slate-200/90 bg-[#0B1F3A] text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3D9] mb-1">Academic Guidance</p>
          <h2 className="font-display text-2xl font-extrabold">Unsure which program suits your learner?</h2>
          <p className="mt-1 text-sm text-slate-300 max-w-xl">
            Our academic counseling team provides personalized level evaluations and curriculum advice.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admissions/free-trial" className="mentor-btn-primary whitespace-nowrap">
            Book a Free Trial
          </Link>
          <Link href="/contact" className="mentor-btn-outline border-white text-white hover:bg-white hover:text-[#0B1F3A] whitespace-nowrap">
            Talk to an Advisor
          </Link>
        </div>
      </div>
    </div>
  </div>
);
}
