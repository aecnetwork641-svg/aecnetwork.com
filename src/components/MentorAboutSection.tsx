"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface MentorAboutSectionProps {
  title?: string;
  subtitle?: string;
}

export default function MentorAboutSection({
  title = "Voluptatem dignissimos provident quasi corporis",
  subtitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Whether you seek foundational Quranic recitation, linguistic proficiency in English or Arabic, or core school academic mastery, our platform combines personalized tutoring with an enterprise LMS.",
}: MentorAboutSectionProps) {
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
    <section
      id="about"
      ref={sectionRef}
      className="bg-white border-y border-slate-200/80 py-16 lg:py-20 overflow-hidden"
    >
      <div className="container-aec">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left: Content & Bullet Details */}
          <div
            className="lg:col-span-6 space-y-6 transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(36px)",
            }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F766E] mb-2">
                Comprehensive Academy • What AEC Network Delivers
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#0B1F3A] leading-tight">
                {title}
              </h2>
            </div>

            <p className="text-sm italic text-slate-600 leading-relaxed">
              {subtitle}
            </p>

            <ul className="space-y-4 pt-1">
              <li
                className="flex items-start gap-3 transition-all duration-500 delay-150"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-[#0F766E]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-[#0B1F3A] font-semibold">
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </strong>{" "}
                  Interactive live class rooms with verified meeting security.
                </span>
              </li>

              <li
                className="flex items-start gap-3 transition-all duration-500 delay-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-[#0F766E]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-[#0B1F3A] font-semibold">
                    Duis aute irure dolor in reprehenderit in voluptate velit.
                  </strong>{" "}
                  Modular digital curriculum with video lessons and quizzes, accompanied by automated attendance records with immediate parent notices.
                </span>
              </li>

              <li
                className="flex items-start gap-3 transition-all duration-500 delay-450"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-[#0F766E]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-[#0B1F3A] font-semibold">
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </strong>{" "}
                  Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur. Official verifiable completion certificates and structured tracks across Quran & Islamic Studies, Languages, STEM Tutoring, and One-on-One Mentorship.
                </span>
              </li>
            </ul>

            {/* Read More Pill Button */}
            <div className="pt-2">
              <Link
                href="/admissions/how-to-enroll"
                className="inline-flex items-center gap-2 rounded-full bg-[#0F766E] hover:bg-[#0B1F3A] text-white px-7 py-3 text-sm font-semibold tracking-wide shadow-sm transition-all duration-300 group hover:shadow-md active:scale-95"
              >
                <span>Read More</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-base">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Mentor About Image with Smooth Zoom / Floating Badge */}
          <div
            className="lg:col-span-6 transition-all duration-700 delay-200 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "scale(1) translateX(0)"
                : "scale(0.92) translateX(30px)",
            }}
          >
            <div className="relative group overflow-hidden rounded-2xl border border-slate-200/90 shadow-xl bg-slate-100">
              <img
                src="/images/mentor-about.jpg"
                alt="Students learning and collaborating"
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Floating Animated Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-slate-100/90 flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative flex items-center justify-center h-9 w-9 rounded-full bg-[#0F766E]/10 text-[#0F766E] flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F766E]/30 opacity-75"></span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0B1F3A]">
                    Verified Academic Programs
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Quran • Languages • STEM • Mentorship
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
