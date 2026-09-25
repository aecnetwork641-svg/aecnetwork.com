"use client";

import { useState } from "react";
import Link from "next/link";

interface CourseItem {
  slug: string;
  title: string;
  category: "Islamic" | "School & Exam Prep" | "STEM & Languages" | "IT & Programming";
  level: string;
  deliveryMode: string;
  durationWeeks: number;
  modulesCount: number;
  lessonsCount: number;
  desc: string;
}

const ALL_COURSES: CourseItem[] = [
  // Islamic & Quran
  {
    slug: "tajweed-course",
    title: "Tajweed Course",
    category: "Islamic",
    level: "All Levels",
    deliveryMode: "1-on-1 & Group",
    durationWeeks: 12,
    modulesCount: 5,
    lessonsCount: 30,
    desc: "Detailed rules of Tajweed, Makharij articulation points, Noon and Meem Sakinah, Madd, and correct phonetic Quranic recitation."
  },
  {
    slug: "translation-of-quran",
    title: "Islamic Studies & Translation of Quran",
    category: "Islamic",
    level: "Beginner to Advanced",
    deliveryMode: "1-on-1 & Cohort",
    durationWeeks: 16,
    modulesCount: 6,
    lessonsCount: 40,
    desc: "Word-by-word translation, Tafseer understanding, fundamental Islamic beliefs (Aqeedah), practical Fiqh, and Prophetic Seerah."
  },
  {
    slug: "qirat-course",
    title: "Qirat Course",
    category: "Islamic",
    level: "Intermediate & Advanced",
    deliveryMode: "1-on-1 Mentorship",
    durationWeeks: 14,
    modulesCount: 4,
    lessonsCount: 28,
    desc: "Learn melodic tones (Maqamat), voice modulation, breath control, and classical Quran recitation styles with certified Qaris."
  },
  {
    slug: "noorani-qaida",
    title: "Noorani Qaida & Quran Reading",
    category: "Islamic",
    level: "Beginner",
    deliveryMode: "1-on-1 Live",
    durationWeeks: 10,
    modulesCount: 4,
    lessonsCount: 24,
    desc: "Step-by-step Arabic letter recognition, joining forms, short/long vowels, Sukoon, Tanween, and Tashdeed for fluent Quran reading."
  },
  {
    slug: "hifz-quran",
    title: "Hifz-ul-Quran (Quran Memorization)",
    category: "Islamic",
    level: "Dedicated Memorization",
    deliveryMode: "1-on-1 Daily",
    durationWeeks: 52,
    modulesCount: 30,
    lessonsCount: 200,
    desc: "Structured daily memorization (Sabaq), new revision (Sabqi), and cumulative retention (Manzil) under Sanad-certified Huffaz."
  },

  // School & Exam Prep
  {
    slug: "gcse",
    title: "GCSE & IGCSE Tutoring",
    category: "School & Exam Prep",
    level: "Years 10–11 (UK)",
    deliveryMode: "1-on-1 & Small Group",
    durationWeeks: 16,
    modulesCount: 6,
    lessonsCount: 36,
    desc: "Targeted subject tuition for UK GCSE/IGCSE examinations with past paper drills, examiner insights, and syllabus mastery."
  },
  {
    slug: "o-a-levels",
    title: "O / A Levels (Cambridge & Edexcel)",
    category: "School & Exam Prep",
    level: "Secondary & College",
    deliveryMode: "1-on-1 Specialist",
    durationWeeks: 20,
    modulesCount: 8,
    lessonsCount: 48,
    desc: "Comprehensive coaching in Physics, Chemistry, Biology, Mathematics, and Economics with mark scheme strategy."
  },
  {
    slug: "naplan",
    title: "Naplan Preparation",
    category: "School & Exam Prep",
    level: "Years 3, 5, 7, 9 (Australia)",
    deliveryMode: "1-on-1 & Small Group",
    durationWeeks: 12,
    modulesCount: 4,
    lessonsCount: 24,
    desc: "Australian National Assessment preparation covering Numeracy, Reading comprehension, Writing formats, and Language Conventions."
  },
  {
    slug: "sat-tutoring",
    title: "SAT Tutoring (Digital SAT)",
    category: "School & Exam Prep",
    level: "High School / College Prep",
    deliveryMode: "1-on-1 Strategy",
    durationWeeks: 12,
    modulesCount: 5,
    lessonsCount: 30,
    desc: "Complete prep for Digital SAT Math and Evidence-Based Reading & Writing, featuring adaptive testing drills and score boosters."
  },
  {
    slug: "gre-tutoring",
    title: "GRE Tutoring",
    category: "School & Exam Prep",
    level: "Graduates / Post-Grad",
    deliveryMode: "1-on-1 Specialist",
    durationWeeks: 10,
    modulesCount: 4,
    lessonsCount: 24,
    desc: "Intensive coaching for GRE Quantitative, Verbal Reasoning, and Analytical Writing with high-yield practice problem sets."
  },

  // STEM & Languages
  {
    slug: "science",
    title: "Science (Physics, Chemistry & Biology)",
    category: "STEM & Languages",
    level: "Grades 4 through 10",
    deliveryMode: "1-on-1 & Cohort",
    durationWeeks: 14,
    modulesCount: 5,
    lessonsCount: 32,
    desc: "Conceptual science education with real-world examples, animated illustrations, experiments, and test preparation."
  },
  {
    slug: "mathematics-foundations",
    title: "Mathematics & Analytical Thinking",
    category: "STEM & Languages",
    level: "Grades 1 through 12",
    deliveryMode: "1-on-1 & Group",
    durationWeeks: 16,
    modulesCount: 6,
    lessonsCount: 36,
    desc: "Mental math, arithmetic, algebra, plane geometry, trigonometry, and calculus tailored to each learner's school board."
  },
  {
    slug: "english-foundations",
    title: "English Language Foundations & Fluency",
    category: "STEM & Languages",
    level: "Beginner to Advanced",
    deliveryMode: "Group / 1-on-1",
    durationWeeks: 12,
    modulesCount: 4,
    lessonsCount: 28,
    desc: "Conversational English, grammar rules, vocabulary expansion, reading comprehension, and structured essay writing."
  },
  {
    slug: "arabic-conversation",
    title: "Arabic Grammar & Spoken Conversation",
    category: "STEM & Languages",
    level: "Beginner to Intermediate",
    deliveryMode: "1-on-1 & Cohort",
    durationWeeks: 14,
    modulesCount: 5,
    lessonsCount: 30,
    desc: "Classical Nahw & Sarf grammar basics combined with Modern Standard Arabic communicative dialogue and Quranic vocabulary."
  },

  // IT & Programming
  {
    slug: "computer-science",
    title: "Computer Science",
    category: "IT & Programming",
    level: "Beginner to Intermediate",
    deliveryMode: "1-on-1 & Cohort",
    durationWeeks: 14,
    modulesCount: 5,
    lessonsCount: 30,
    desc: "Fundamentals of computing, hardware/software systems, binary mathematics, logic gates, algorithms, and data structures."
  },
  {
    slug: "computer-programming",
    title: "Computer Programming (Coding)",
    category: "IT & Programming",
    level: "Beginner to Advanced",
    deliveryMode: "Hands-on Project Based",
    durationWeeks: 16,
    modulesCount: 6,
    lessonsCount: 36,
    desc: "Learn Python, C++, and JavaScript fundamentals, object-oriented concepts, algorithm solving, and real-world coding projects."
  },
  {
    slug: "web-designing",
    title: "Web Designing",
    category: "IT & Programming",
    level: "Beginner to Intermediate",
    deliveryMode: "Interactive Cohort",
    durationWeeks: 12,
    modulesCount: 4,
    lessonsCount: 26,
    desc: "HTML5, CSS3, Flexbox/Grid, Tailwind CSS, Bootstrap, Figma UI/UX prototyping, and modern mobile-first responsive web design."
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "IT & Programming",
    level: "Intermediate to Pro",
    deliveryMode: "Project Cohort",
    durationWeeks: 18,
    modulesCount: 7,
    lessonsCount: 45,
    desc: "Full-stack web application engineering: React, Next.js, Node.js, Express, databases, REST APIs, authentication, and cloud deployment."
  },
  {
    slug: "social-media-marketing-smm",
    title: "Social Media Marketing (SMM)",
    category: "IT & Programming",
    level: "All Levels",
    deliveryMode: "Practical Workshop",
    durationWeeks: 8,
    modulesCount: 4,
    lessonsCount: 20,
    desc: "Master digital marketing campaigns, Meta Ads Manager, Google Ads, content strategy, brand storytelling, SEO, and analytics."
  }
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["ALL", "Islamic", "School & Exam Prep", "STEM & Languages", "IT & Programming"];

  const filteredCourses = ALL_COURSES.filter((c) => {
    const matchesCat = selectedCategory === "ALL" || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="container-aec py-14 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="badge badge-info mb-2">LMS Catalog</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-aec-navy">
          Online Learning Course Catalog
        </h1>
        <p className="mt-3 text-lg text-aec-navy/70 leading-relaxed">
          Structured modular LMS courses featuring live interactive sessions, video/text lessons, quizzes, assignments, and verifiable certifications.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search courses by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-aec-navy focus:outline-none"
            />
          </div>
          <div className="w-full sm:w-2/3 flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-aec-navy text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "ALL" ? "All Courses" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            No courses found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredCourses.map((c) => (
            <div key={c.slug} className="card group flex flex-col justify-between hover:border-aec-teal/50 hover:shadow-md transition">
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
          ))
        )}
      </div>

      {/* LMS Architecture Features */}
      <div className="rounded-2xl border border-aec-navy/10 bg-aec-cream/40 p-8">
        <h2 className="font-display text-lg font-bold text-aec-navy">AEC Learning Management System Features</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3 text-xs text-aec-navy/80">
          <div className="rounded-xl border border-aec-navy/10 bg-white p-4">
            <span className="font-bold text-aec-teal block mb-1">Live Interactive Classrooms</span>
            Direct integration with protected video meeting platforms (Zoom, Google Meet, Teams) and calendar schedules.
          </div>
          <div className="rounded-xl border border-aec-navy/10 bg-white p-4">
            <span className="font-bold text-aec-teal block mb-1">Interactive Quizzes & Scoring</span>
            Automated quiz evaluations with instant pass/fail feedback, gradebooks, and progress reporting.
          </div>
          <div className="rounded-xl border border-aec-navy/10 bg-white p-4">
            <span className="font-bold text-aec-teal block mb-1">Verifiable Certificates</span>
            Official digital certificates issued upon course completion with unique public verification credentials.
          </div>
        </div>
      </div>
    </div>
  );
}
