import Link from "next/link";

const PROGRAM_DETAILS: Record<
  string,
  {
    title: string;
    category: string;
    level: string;
    delivery: string;
    description: string;
    outcomes: string[];
    curriculum: { module: string; topics: string[] }[];
    prerequisites: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  "quran-islamic-studies": {
    title: "Quran & Islamic Studies",
    category: "Islamic Disciplines",
    level: "Foundational to Advanced",
    delivery: "1-on-1 Mentorship or Small Cohorts",
    description:
      "A structured, teacher-guided program designed to establish accurate Quranic recitation from foundational letters through advanced Tajweed rules, fluent Nazra reading, and memorization (Hifz), accompanied by age-appropriate Islamic Studies concepts.",
    outcomes: [
      "Mastery of Arabic letter articulation (Makharij) and phonetics via Noorani Qaida",
      "Application of core Tajweed rules: Noon Sakinah, Meem Sakinah, Madd, and Waqf",
      "Fluent and confident recitation of selected Juz and Surahs with proper rhythm",
      "Memorization of daily Adhkar, Masnoon Duas, and foundational Islamic etiquette",
      "Understanding of basic Fiqh of Taharah and Salah"
    ],
    curriculum: [
      {
        module: "Module 1: Arabic Phonetics & Noorani Qaida",
        topics: [
          "Individual letters and sound points (Makharij)",
          "Compound letters (Murakkabat) and short vowels (Harakat)",
          "Long vowels (Maddah) and Tanween rules"
        ]
      },
      {
        module: "Module 2: Essential Tajweed Rules",
        topics: [
          "Noon Sakinah & Tanween: Izhar, Idgham, Iqlab, Ikhfa",
          "Meem Sakinah rules and Ghunnah practice",
          "Rules of Raa (Tafkheem and Tarqeeq) and Lam in Lafz-ul-Jalalah"
        ]
      },
      {
        module: "Module 3: Fluent Nazra Recitation",
        topics: [
          "Guided recitation of Juz 30 (Juz Amma)",
          "Stopping signs (Rumuz al-Awqaf) and breathing discipline",
          "Fluency building and pronunciation corrections"
        ]
      },
      {
        module: "Module 4: Islamic Foundations & Practical Fiqh",
        topics: [
          "Articles of Faith (Aqeedah) and Five Pillars",
          "Practical Salah demonstration and step-by-step Wudu",
          "Prophetic manners (Akhlaq) and daily morning/evening Duas"
        ]
      }
    ],
    prerequisites: ["No prior knowledge required for beginners; diagnostic test for intermediate students."],
    faqs: [
      {
        q: "Are the teachers certified in Tajweed?",
        a: "Yes. Our Quran faculty members hold recognized certifications (Sanad / Ijazah) and have demonstrated extensive experience in child and adult recitation pedagogy."
      },
      {
        q: "Can my child learn at their own pace?",
        a: "Yes, our one-to-one tutoring track allows the instructor to adjust pacing specifically to your child's learning speed."
      }
    ]
  },
  english: {
    title: "English Language Mastery",
    category: "Linguistics & Communication",
    level: "Primary, Secondary & Adult",
    delivery: "1-on-1 & Interactive Cohorts",
    description:
      "Comprehensive English instruction designed to cultivate spoken fluency, grammatical precision, active reading comprehension, and structured writing for academic and everyday success.",
    outcomes: [
      "Confident oral communication and pronunciation accuracy",
      "Strong grammatical foundation in sentence structures, tenses, and punctuation",
      "Enhanced reading comprehension of informational and literary passages",
      "Structured essay and paragraph writing competence"
    ],
    curriculum: [
      {
        module: "Module 1: Grammar Foundations & Mechanics",
        topics: ["Parts of speech and sentence architecture", "Verb tenses, modals, and subject-verb agreement", "Punctuation and clause construction"]
      },
      {
        module: "Module 2: Conversational & Spoken Fluency",
        topics: ["Daily dialogues and situational roleplay", "Pronunciation clarity, stress, and intonation", "Public speaking and structured presentation skills"]
      },
      {
        module: "Module 3: Reading Comprehension & Vocabulary",
        topics: ["Contextual vocabulary acquisition", "Active reading strategies (skimming, scanning, inferring)", "Critical text analysis"]
      },
      {
        module: "Module 4: Academic & Structured Writing",
        topics: ["Paragraph unity and topic sentences", "Descriptive, narrative, and persuasive essays", "Formal emails, reports, and summary writing"]
      }
    ],
    prerequisites: ["Placement evaluation to determine student proficiency level."],
    faqs: [
      {
        q: "Is this program suitable for school exam support?",
        a: "Yes, our instructors can align lesson modules with specific school curricula (such as Cambridge, Oxford, or national boards)."
      }
    ]
  },
  arabic: {
    title: "Arabic Studies (Classical & Modern)",
    category: "Linguistics & Islamic Studies",
    level: "Beginner to Advanced",
    delivery: "1-on-1 & Group Cohorts",
    description:
      "A systematic Arabic program bridging classical Quranic grammar (Nahw & Sarf) with Modern Standard Arabic (MSA) for both reading comprehension and conversational fluency.",
    outcomes: [
      "Arabic script mastery and accurate reading",
      "Core vocabulary of high-frequency Quranic and daily terms",
      "Understanding of nominal and verbal sentence syntax",
      "Ability to hold basic conversations and comprehend classical texts"
    ],
    curriculum: [
      {
        module: "Module 1: Arabic Reading & Core Vocabulary",
        topics: ["Alphabet, vowelization, and word connection", "High-frequency Quranic nouns and verbs", "Greetings and basic conversational phrases"]
      },
      {
        module: "Module 2: Applied Grammar (Nahw Foundations)",
        topics: ["Noun types, definiteness, and gender", "Idafa (possessive constructs) and prepositions", "Nominal sentences (Mubtada and Khabar)"]
      },
      {
        module: "Module 3: Morphology (Sarf Foundations)",
        topics: ["Three-letter root systems (Thulathi Mujarrad)", "Past, present, and imperative verb conjugations", "Pronoun attachments and variations"]
      },
      {
        module: "Module 4: Text Comprehension & Dialogue",
        topics: ["Reading short classical stories and Quranic passages", "Situational Arabic conversation drills", "Written sentence composition"]
      }
    ],
    prerequisites: ["Open to absolute beginners; placement test for students with prior reading ability."],
    faqs: [
      {
        q: "Does this program focus on Quranic Arabic or Spoken Arabic?",
        a: "The curriculum balances Quranic vocabulary and classical grammar foundations with modern standard spoken fluency."
      }
    ]
  },
  mathematics: {
    title: "Mathematics & Analytical Thinking",
    category: "STEM",
    level: "Grades 1 through 12",
    delivery: "1-on-1 & Small Groups",
    description:
      "Concept-first mathematics instruction designed to eliminate math anxiety, develop problem-solving reasoning, and ensure mastery across school grade levels.",
    outcomes: [
      "Deep conceptual clarity in number sense, operations, and arithmetic",
      "Proficiency in algebraic manipulation, linear equations, and polynomials",
      "Geometric reasoning, spatial geometry, and coordinate proofs",
      "Confidence in solving multi-step word problems and applied mathematical challenges"
    ],
    curriculum: [
      {
        module: "Module 1: Number Sense & Foundational Operations",
        topics: ["Integers, fractions, decimals, and percentages", "Order of operations (PEMDAS/BODMAS)", "Ratios, proportions, and unit rates"]
      },
      {
        module: "Module 2: Algebraic Concepts & Equations",
        topics: ["Linear equations and inequalities in one variable", "Simultaneous equations and graphical solutions", "Quadratic equations and factoring techniques"]
      },
      {
        module: "Module 3: Geometry & Trigonometry",
        topics: ["Angles, parallel lines, and triangle properties", "Perimeter, area, surface area, and volume formulas", "Right-triangle trigonometry (SOH CAH TOA)"]
      },
      {
        module: "Module 4: Data Analysis & Advanced Topics",
        topics: ["Probability, mean, median, mode, and charts", "Functions, graphs, and transformations", "Calculus foundations (for senior grade levels)"]
      }
    ],
    prerequisites: ["Diagnostic assessment to match the student with their appropriate grade-level module."],
    faqs: [
      {
        q: "Can the teacher help with my child's daily school homework?",
        a: "Yes. In the one-to-one track, teachers regularly dedicate portion of each session to homework concepts and exam preparation."
      }
    ]
  }
};

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const details = PROGRAM_DETAILS[params.slug] || {
    title: params.slug
      .split("-")
      .map((w) => w[0]?.toUpperCase() + w.slice(1))
      .join(" "),
    category: "Academic Program",
    level: "Structured Pacing",
    delivery: "1-on-1 & Group Options",
    description:
      "AEC Network provides structured online education led by qualified, vetted instructors with personalized timetables, modular curricula, and regular parental progress reporting.",
    outcomes: [
      "Comprehensive syllabus coverage aligned with academic goals",
      "Regular assessments, quizzes, and constructive teacher feedback",
      "Flexible schedule tailored to your family's time zone",
      "Official certificate upon successful completion"
    ],
    curriculum: [
      {
        module: "Module 1: Fundamentals & Baseline Concepts",
        topics: ["Intake evaluation and diagnostic review", "Core principles and foundational methodology", "Guided practice exercises"]
      },
      {
        module: "Module 2: Applied Skills & Practice",
        topics: ["Interactive problem solving and practical drills", "Peer review and teacher-guided corrections", "Formative quiz evaluations"]
      },
      {
        module: "Module 3: Advanced Application & Mastery",
        topics: ["Complex topic reinforcement", "Capstone milestone assessment", "Final term progress review"]
      }
    ],
    prerequisites: ["Diagnostic evaluation with our academic advisory team."],
    faqs: [
      {
        q: "How do I enroll in this program?",
        a: "You can begin by booking a free trial class. Our team will evaluate student level and set up an initial schedule with an assigned teacher."
      }
    ]
  };

  return (
    <div className="container-aec py-14 max-w-4xl space-y-12">
      {/* Breadcrumbs & Header */}
      <div>
        <Link href="/programs" className="text-xs font-semibold text-aec-teal hover:underline">
          ← Back to All Programs
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="badge badge-info">{details.category}</span>
          <span className="badge badge-neutral">{details.level}</span>
          <span className="badge badge-warning">{details.delivery}</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          {details.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-aec-navy/75 leading-relaxed">
          {details.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/admissions/free-trial" className="btn-primary">
            Book a Free Trial Class
          </Link>
          <Link href="/admissions/apply" className="btn-secondary">
            Submit Admission Form
          </Link>
          <Link href="/courses" className="btn-secondary">
            View LMS Modules
          </Link>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="card bg-white space-y-4">
        <h2 className="font-display text-xl font-bold text-aec-navy">What Students Will Learn</h2>
        <ul className="grid gap-3 sm:grid-cols-2 pt-2">
          {details.outcomes.map((outcome, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-aec-navy/80">
              <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Curriculum Outline */}
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-aec-navy">Structured Curriculum Outline</h2>
        <div className="space-y-4">
          {details.curriculum.map((mod, idx) => (
            <div key={idx} className="card border-l-4 border-l-aec-teal">
              <h3 className="font-display text-base font-bold text-aec-navy">{mod.module}</h3>
              <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-aec-navy/70">
                {mod.topics.map((topic, tIdx) => (
                  <li key={tIdx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-aec-teal shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Format & Prerequisites */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card">
          <h3 className="font-display text-base font-bold text-aec-navy">Prerequisites & Admission</h3>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-aec-navy/70">
            {details.prerequisites.map((p, idx) => (
              <li key={idx}>• {p}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="font-display text-base font-bold text-aec-navy">Parent & Student Support</h3>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-aec-navy/70">
            <li>• Live attendance & absence notifications</li>
            <li>• Downloadable worksheets & lesson summaries</li>
            <li>• Dedicated Parent Portal access</li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-aec-navy">Program FAQs</h2>
        <div className="space-y-3">
          {details.faqs.map((faq, idx) => (
            <details key={idx} className="card group cursor-pointer">
              <summary className="font-semibold text-aec-navy flex items-center justify-between list-none">
                <span>{faq.q}</span>
                <span className="text-aec-teal group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-sm text-aec-navy/70 pt-2 border-t border-aec-navy/5">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-2xl border border-aec-teal/30 bg-gradient-to-r from-aec-navy to-slate-900 text-white p-8 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold">Start Learning {details.title}</h2>
        <p className="text-sm text-white/75 max-w-lg mx-auto">
          Book a free trial class today to meet an assigned instructor and experience our pedagogical approach.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link href="/admissions/free-trial" className="btn-primary">
            Book a Free Trial Class
          </Link>
          <Link href="/contact" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
            Speak with an Advisor
          </Link>
        </div>
      </div>
    </div>
  );
}
