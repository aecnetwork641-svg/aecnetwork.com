"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface MentorAboutSectionProps {
  title?: string;
  subtitle?: string;
}

export default function MentorAboutSection({}: MentorAboutSectionProps) {
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
      { threshold: 0.1 }
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
      className="bg-white border-y border-slate-100 py-14 lg:py-20 overflow-hidden"
    >
      <div className="container-aec">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 items-start">
          {/* Left: Globallink-style vertical student photo with rounded corners */}
          <div
            className="lg:col-span-5 transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border border-slate-100 group">
              <img
                src="/images/about-student.jpg"
                alt="AEC Network Student"
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right: Content & Sections */}
          <div
            className="lg:col-span-7 space-y-6 transition-all duration-700 delay-150 ease-out text-slate-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
            }}
          >
            {/* Header & Intro */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                Welcome to AEC Network
              </h2>
              <div className="h-1 w-16 bg-[#4DA3D9] rounded-full mt-2 mb-4" />
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Welcome to AEC Network! We provide professional, Islamic, and academic education to students worldwide through flexible and accessible online learning. Our qualified and dedicated teachers are committed to supporting students in their educational journey, developing their skills, and helping them achieve their academic and personal goals.
              </p>
            </div>

            {/* What We Do */}
            <div className="space-y-3 pt-1">
              <h3 className="font-bold text-[#0B1F3A] text-base sm:text-lg">
                What We Do:
              </h3>
              <ul className="list-disc pl-5 space-y-2.5 text-sm sm:text-base text-slate-600 leading-relaxed marker:text-[#4DA3D9]">
                <li>
                  <strong className="text-slate-900 font-semibold">
                    Islamic Education:
                  </strong>{" "}
                  We provide Quran Reading, Quran Memorization with Tajweed, Quran Translation, Hadith, Islamic Studies, and other essential Islamic subjects.
                </li>
                <li>
                  <strong className="text-slate-900 font-semibold">
                    Academic Education:
                  </strong>{" "}
                  We offer quality academic support in subjects including English, Mathematics, Arabic, and basic education for students from different grade levels.
                </li>
                <li>
                  <strong className="text-slate-900 font-semibold">
                    Professional Learning:
                  </strong>{" "}
                  AEC Network also promotes professional and skill-based learning opportunities designed to help students develop useful knowledge and abilities for their future.
                </li>
                <li>
                  <strong className="text-slate-900 font-semibold">
                    Qualified Teachers:
                  </strong>{" "}
                  Our experienced and trained teachers provide personalized online classes according to each student&apos;s learning needs, level, and schedule.
                </li>
                <li>
                  <strong className="text-slate-900 font-semibold">
                    Online Learning Worldwide:
                  </strong>{" "}
                  We provide flexible online education for students around the world, making quality Islamic, academic, and professional education accessible from anywhere.
                </li>
              </ul>
            </div>

            {/* Our Mission */}
            <div className="space-y-2 pt-1">
              <h3 className="font-bold text-[#0B1F3A] text-base sm:text-lg">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our mission is to provide accessible, quality, and values-based education that combines Islamic teachings, academic knowledge, and professional development. We aim to help students learn with confidence, develop strong character, and prepare for a successful future.
              </p>
            </div>

            {/* Our Values */}
            <div className="space-y-2 pt-1 bg-slate-50/80 rounded-xl p-4 border border-slate-100">
              <h3 className="font-bold text-[#0B1F3A] text-base sm:text-lg">
                Our Values
              </h3>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                Quality Education <span className="text-[#4DA3D9] mx-1.5">•</span> 
                Islamic Values <span className="text-[#4DA3D9] mx-1.5">•</span> 
                Professionalism <span className="text-[#4DA3D9] mx-1.5">•</span> 
                Personal Attention <span className="text-[#4DA3D9] mx-1.5">•</span> 
                Integrity <span className="text-[#4DA3D9] mx-1.5">•</span> 
                Continuous Learning <span className="text-[#4DA3D9] mx-1.5">•</span> 
                Student Success
              </p>
            </div>

            {/* Join AEC Network */}
            <div className="space-y-2 pt-1">
              <h3 className="font-bold text-[#0B1F3A] text-base sm:text-lg">
                Join AEC Network
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Join AEC Network and become part of a growing global learning community. Whether you are looking for Quranic education, academic support, Arabic and English learning, or professional development, our dedicated teachers are here to guide you.
              </p>
              <p className="text-sm sm:text-base text-[#0B1F3A] font-medium leading-relaxed pt-1">
                Start your learning journey with AEC Network today and take a step toward a brighter and better future.
              </p>
            </div>

            {/* Read More / Enroll Buttons */}
            <div className="pt-3 flex flex-wrap gap-4">
              <Link
                href="/admissions/how-to-enroll"
                className="inline-flex items-center gap-2 rounded-full bg-[#4DA3D9] hover:bg-[#0B1F3A] text-white px-7 py-3 text-sm font-semibold tracking-wide shadow-sm transition-all duration-300 group hover:shadow-md active:scale-95"
              >
                <span>Enroll Now</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-base">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 hover:border-[#4DA3D9] text-slate-700 hover:text-[#4DA3D9] px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-300 active:scale-95"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
