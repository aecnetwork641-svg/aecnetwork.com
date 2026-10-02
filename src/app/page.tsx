import Link from "next/link";
import PricingSection from "@/components/PricingSection";
import HeroSlider from "@/components/HeroSlider";
import MentorCountsSection from "@/components/MentorCountsSection";
import MentorAboutSection from "@/components/MentorAboutSection";
import PopularCoursesSection from "@/components/PopularCoursesSection";
import ScholarTeamSection from "@/components/ScholarTeamSection";
import OneToOneShowcaseSection from "@/components/OneToOneShowcaseSection";
import WhatSetsUsApartSection from "@/components/WhatSetsUsApartSection";
import { getCourseImage } from "@/lib/course-images";

const PROGRAMS = [
  {
    title: "Quran & Tajweed Mastery",
    slug: "quran-islamic-studies",
    level: "Beginner to Advanced",
    image: getCourseImage("Islamic", "quran-islamic-studies"),
    blurb: "Structured, teacher-led learning of Noorani Qaida, Tajweed rules, fluent Nazra recitation, and Hifz memorization."
  },
  {
    title: "GCSE & A Levels Prep",
    slug: "gcse",
    level: "UK & International Boards",
    image: getCourseImage("School & Exam Prep", "gcse"),
    blurb: "Expert subject coaching in Math, Sciences, and Humanities with 10-year past paper walkthroughs and grade boosters."
  },
  {
    title: "Computer Programming & Coding",
    slug: "computer-programming",
    level: "Beginner to Advanced",
    image: getCourseImage("IT & Programming", "computer-programming"),
    blurb: "Practical hands-on coding in Python, C++, and JavaScript with real-world game development and logic building."
  },
  {
    title: "Mathematics & Analytical Thinking",
    slug: "mathematics",
    level: "Grades 1–12",
    image: getCourseImage("STEM & Languages", "mathematics"),
    blurb: "Curriculum-aligned mathematical instruction from fundamental numeracy and algebra to geometry, trigonometry, and calculus."
  },
  {
    title: "Web Designing & Development",
    slug: "web-development",
    level: "Full Stack Track",
    image: getCourseImage("IT & Programming", "web-development"),
    blurb: "Learn modern responsive UI/UX, HTML5, CSS3, Tailwind, React, Next.js, and backend database systems."
  },
  {
    title: "SAT & Digital SAT Tutoring",
    slug: "sat-tutoring",
    level: "College Prep (Target 1500+)",
    image: getCourseImage("School & Exam Prep", "sat-tutoring"),
    blurb: "Adaptive testing tactics, Desmos calculator shortcuts, and evidence-based reading/writing score boosters."
  },
  {
    title: "English Language Mastery",
    slug: "english",
    level: "All Levels",
    image: getCourseImage("STEM & Languages", "english"),
    blurb: "Spoken communication fluency, functional grammar, reading comprehension, and academic essay writing."
  },
  {
    title: "Islamic Studies & Quran Translation",
    slug: "translation-of-quran",
    level: "All Age Groups",
    image: getCourseImage("Islamic", "translation-of-quran"),
    blurb: "Word-by-word translation, contextual Tafseer, Hadith studies, Fiqh, and Prophetic Seerah values."
  },
  {
    title: "Science (Physics, Chemistry, Biology)",
    slug: "science",
    level: "Primary & Secondary",
    image: getCourseImage("STEM & Languages", "science"),
    blurb: "Concept-first scientific inquiry, visual experiments, diagrammatic explanations, and term exam prep."
  }
];

const FAQS = [
  {
    q: "How does the AEC Network Free Trial class work?",
    a: "You can request a free trial class by filling out our short booking form. An academic counselor will review your preferred subject, assess proficiency level, and coordinate a scheduled live session with an assigned qualified instructor with no financial commitment."
  },
  {
    q: "What is the difference between One-to-One and Group Classes?",
    a: "One-to-One tutoring pairs a student with a dedicated teacher for personalized pacing, customized curriculum focus, and flexible scheduling. Group Classes offer interactive peer discussions, collaborative learning, and a structured cohort timetable."
  },
  {
    q: "How do parents monitor attendance and academic progress?",
    a: "Parents receive access to the dedicated Parent Portal, which features a multi-child switcher, real-time class attendance logs, automated absence alerts, assignment grades, teacher evaluation notes, and fee payment invoices."
  },
  {
    q: "What meeting platforms are used for live classes?",
    a: "Classes are conducted over verified platforms such as Zoom, Google Meet, or Microsoft Teams. Join links are protected and accessible directly from the authenticated Student and Teacher portal dashboards."
  },
  {
    q: "What are the fee payment terms and schedule?",
    a: "Fees are billed according to your selected billing plan (typically monthly or per-term). Invoices are generated automatically and can be settled via digital bank transfer or card with itemized payment receipts."
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* HERO BANNER SLIDER */}
      <HeroSlider />

      {/* 2. MENTOR COUNTS SECTION (1232 Students | 64 Courses | 42 Events | 24 Trainers) */}
      <MentorCountsSection />

      {/* 3. MENTOR ABOUT US / WHAT AEC DELIVERS SECTION */}
      <MentorAboutSection />

      {/* 4. POPULAR COURSES (Mentor Template Design with Zoom-In Animation) */}
      <PopularCoursesSection />

      {/* ONE-TO-ONE LEARNING SHOWCASE (Medicloud Style with Animations) */}
      <OneToOneShowcaseSection />

      {/* 10B. PRICING & FEE STRUCTURE */}
      <PricingSection />

      {/* 11. WHAT SETS US APART */}
      <WhatSetsUsApartSection />

      {/* 12B. SCHOLAR TEAM SECTION (Our Expert Instructors) */}
      <ScholarTeamSection />

      {/* 13. FAQS */}
      <section className="container-aec max-w-3xl">
        <div className="text-center">
          <h2 className="font-display text-[11px] font-bold uppercase tracking-wider text-aec-teal">Clear Answers</h2>
          <p className="mt-1 font-display text-lg sm:text-xl lg:text-2xl font-bold text-aec-navy">Frequently Asked Questions</p>
        </div>

        <div className="mt-6 space-y-3">
          {FAQS.map((faq, idx) => (
            <details key={idx} className="rounded-xl border border-aec-navy/10 bg-white p-4 sm:p-4.5 shadow-sm hover:shadow transition group cursor-pointer">
              <summary className="font-display text-xs sm:text-sm font-semibold text-aec-navy flex items-center justify-between list-none gap-2">
                <span>{faq.q}</span>
                <span className="text-[10px] text-aec-teal group-open:rotate-180 transition-transform shrink-0">▼</span>
              </summary>
              <p className="mt-2.5 text-xs text-aec-navy/70 leading-relaxed border-t border-aec-navy/5 pt-2.5">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
