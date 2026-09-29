"use client";

import { useState } from "react";
import Link from "next/link";
import { getCourseImage } from "@/lib/course-images";

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
      {/* Header - Mentor Theme Title */}
      <div className="max-w-3xl space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0F766E]">LMS Course Catalog</p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3A]">
          Online Courses & Learning Catalog
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Explore our comprehensive modular courses featuring live interactive sessions, certified instructors, digital materials, quizzes, and verifiable certificates.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search courses by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
            />
          </div>
          <div className="w-full sm:w-2/3 flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-[#0F766E] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "ALL" ? "All Courses" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid - Mentor Course Item Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            No courses found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredCourses.map((c) => {
            const isWeb = c.slug === "web-development";
            const trainer = isWeb
              ? { name: "Antonio", avatar: "/images/courses/mentor-trainer-1.jpg", students: 50, likes: 65, price: "$169" }
              : c.category === "Islamic"
              ? { name: "Qari Ahmad Al-Azhari", avatar: "/images/courses/qirat.jpg", students: 120, likes: 98, price: "$45" }
              : c.category === "School & Exam Prep"
              ? { name: "Dr. Rachel Evans", avatar: "/images/courses/gcse.png", students: 95, likes: 82, price: "$75" }
              : c.category === "IT & Programming"
              ? { name: "Engr. Salman Farooq", avatar: "/images/courses/coding.png", students: 140, likes: 95, price: "$65" }
              : { name: "Sarah Jenkins", avatar: "/images/courses/english.jpg", students: 110, likes: 78, price: "$55" };

            return (
              <div key={c.slug} className="mentor-course-card group">
                {/* Course Cover Image with Mentor Zoom Effect */}
                <Link href={`/courses/${c.slug}` as never} className="course-img-wrap block">
                  <img 
                    src={getCourseImage(c.category, c.slug)} 
                    alt={c.title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-109"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/courses/13.jpg";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-[#0B1F3A]/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border border-white/20">
                    {c.level}
                  </div>
                </Link>

                <div className="course-body">
                  {/* Category Badge & Price Row */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="category-pill">
                      {c.category}
                    </span>
                    <span className="price-tag">
                      {trainer.price}
                    </span>
                  </div>

                  {/* Course Title Link */}
                  <h3>
                    <Link href={`/courses/${c.slug}` as never} className="line-clamp-1">
                      {c.title}
                    </Link>
                  </h3>

                  <p className="mt-1 text-[11px] font-medium text-slate-400">
                    ⏱️ {c.durationWeeks} Weeks • {c.modulesCount} Modules • {c.deliveryMode}
                  </p>

                  <p className="course-description line-clamp-2">
                    {c.desc}
                  </p>

                  {/* Trainer Profile & Stats Row */}
                  <div className="trainer-row">
                    <div className="trainer-profile">
                      <img
                        src={trainer.avatar}
                        alt={trainer.name}
                      />
                      <Link
                        href={`/courses/${c.slug}` as never}
                        className="trainer-name"
                      >
                        {trainer.name}
                      </Link>
                    </div>
                    <div className="trainer-stats">
                      <span className="flex items-center gap-1" title="Students">
                        <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {trainer.students}
                      </span>
                      <span className="flex items-center gap-1" title="Likes">
                        <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {trainer.likes}
                      </span>
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <Link
                      href={`/courses/${c.slug}` as never}
                      className="font-bold text-[#0B1F3A] hover:text-[#0F766E] transition flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                    <Link
                      href="/admissions/free-trial"
                      className="mentor-btn-primary text-xs px-3.5 py-1 shadow-xs hover:shadow-md transition"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* LMS Architecture Features */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0F766E] mb-1">Interactive Learning</p>
        <h2 className="font-display text-xl font-extrabold text-[#0B1F3A]">AEC Learning Management System Features</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3 text-xs text-slate-600">
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
            <span className="font-bold text-[#0F766E] text-sm block mb-1">Live Classrooms</span>
            Protected integration with video meeting platforms (Zoom, Google Meet, Teams) and automated class schedules.
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
            <span className="font-bold text-[#0F766E] text-sm block mb-1">Quizzes & Progress</span>
            Automated quiz evaluations with instant feedback, gradebooks, attendance logs, and progress reporting.
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
            <span className="font-bold text-[#0F766E] text-sm block mb-1">Verifiable Certificates</span>
            Official digital certificates issued upon completion with unique public verification credentials.
          </div>
        </div>
      </div>
    </div>
  );
}
