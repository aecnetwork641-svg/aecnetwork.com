"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface CourseItem {
  title: string;
  slug: string;
  category: string;
  price: string;
  image: string;
  blurb: string;
  trainer: {
    name: string;
    avatar: string;
    students: number;
    likes: number;
  };
}

const POPULAR_COURSES: CourseItem[] = [
  {
    title: "Quran & Tajweed Mastery",
    slug: "tajweed-course",
    category: "Islamic Studies",
    price: "$45",
    image: "/images/courses/quran.jpg",
    blurb: "Structured, teacher-led learning of Noorani Qaida, Tajweed rules, fluent Nazra recitation, and articulation points.",
    trainer: {
      name: "Qari Ahmad",
      avatar: "/images/courses/qirat.jpg",
      students: 120,
      likes: 98,
    },
  },
  {
    title: "Islamic Studies & Translation of Quran",
    slug: "translation-of-quran",
    category: "Islamic Studies",
    price: "$50",
    image: "/images/courses/translation.jpg",
    blurb: "Word-by-word Quran translation, contextual Tafseer comprehension, foundational Aqeedah, and practical daily Fiqh.",
    trainer: {
      name: "Sheikh Bilal",
      avatar: "/images/team/member-01.jpg",
      students: 95,
      likes: 88,
    },
  },
  {
    title: "Hifz-ul-Quran (Quran Memorization)",
    slug: "hifz-quran",
    category: "Islamic Studies",
    price: "$55",
    image: "/images/courses/hifz.jpg",
    blurb: "Structured daily memorization (Sabaq), revision (Sabqi), and retention (Manzil) under Sanad-certified Huffaz.",
    trainer: {
      name: "Hafiz Usman",
      avatar: "/images/courses/qirat.jpg",
      students: 85,
      likes: 94,
    },
  },
  {
    title: "Computer Programming & Coding",
    slug: "computer-programming",
    category: "Coding & IT",
    price: "$65",
    image: "/images/courses/coding.png",
    blurb: "Practical hands-on coding in Python, C++, and JavaScript with real-world game development and logic building.",
    trainer: {
      name: "Engr. Salman",
      avatar: "/images/team/member-02.jpg",
      students: 145,
      likes: 92,
    },
  },
  {
    title: "Mathematics & Analytical Thinking",
    slug: "mathematics-foundations",
    category: "STEM Education",
    price: "$55",
    image: "/images/courses/math.jpg",
    blurb: "Curriculum-aligned mathematical instruction from fundamental numeracy and algebra to geometry, trigonometry, and calculus.",
    trainer: {
      name: "Dr. Rachel Evans",
      avatar: "/images/team/member-03.jpg",
      students: 180,
      likes: 89,
    },
  },
  {
    title: "GCSE & IGCSE Tutoring",
    slug: "gcse",
    category: "School & Exam Prep",
    price: "$60",
    image: "/images/courses/gcse.png",
    blurb: "Targeted subject tuition for UK GCSE/IGCSE examinations with past paper drills, examiner insights, and syllabus mastery.",
    trainer: {
      name: "Prof. Alistair Vance",
      avatar: "/images/team/member-04.jpg",
      students: 110,
      likes: 87,
    },
  },
];

export default function PopularCoursesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="courses" ref={sectionRef} className="container-aec py-14 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="mentor-section-title">
          <h2>Courses</h2>
          <p>Top Courses</p>
        </div>
        <Link
          href="/courses"
          className="text-xs font-bold text-[#4DA3D9] hover:text-[#0B1F3A] transition flex items-center gap-1.5 group mb-2"
        >
          <span>View all courses catalog</span>
          <span className="transition-transform group-hover:translate-x-1 font-bold">→</span>
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {POPULAR_COURSES.map((course, idx) => (
          <div
            key={course.slug}
            className="mentor-course-card group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1) translateY(0)" : "scale(0.65) translateY(30px)",
              transition: `opacity 0.65s ease ${idx * 120}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 120}ms`,
            }}
          >
            {/* Course Image with Mentor Zoom Animation */}
            <Link href={`/courses/${course.slug}` as never} className="course-img-wrap block">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-109"
              />
            </Link>

            {/* Course Content Body */}
            <div className="course-body">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="category-pill">{course.category}</span>
                <span className="price-tag">{course.price}</span>
              </div>

              <h3>
                <Link href={`/courses/${course.slug}` as never} className="line-clamp-1">
                  {course.title}
                </Link>
              </h3>

              <p className="course-description line-clamp-2">
                {course.blurb}
              </p>

              {/* Mentor Trainer Profile & Rank Row */}
              <div className="trainer-row">
                <div className="trainer-profile">
                  <img
                    src={course.trainer.avatar}
                    alt={course.trainer.name}
                  />
                  <Link
                    href={`/courses/${course.slug}` as never}
                    className="trainer-name"
                  >
                    {course.trainer.name}
                  </Link>
                </div>
                <div className="trainer-stats">
                  <span className="flex items-center gap-1" title="Enrolled Students">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {course.trainer.students}
                  </span>
                  <span className="flex items-center gap-1" title="Reviews / Likes">
                    <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    {course.trainer.likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
