"use client";

import { useEffect, useRef, useState } from "react";

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
      className="bg-white py-10 sm:py-14 lg:py-16 font-['Source_Sans_3',_'Roboto',_sans-serif]"
    >
      <div className="container-aec">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Student Image (Globallink Style) */}
          <div
            className="lg:col-span-5 transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="relative mx-auto max-w-[420px] lg:max-w-none overflow-hidden rounded-2xl shadow-sm">
              <img
                src="/images/about-aec.jpg"
                alt="AEC Network Students Online Learning"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right Column: AEC Network Information (Globallink Font & Size Style) */}
          <div
            className="lg:col-span-7 transition-all duration-700 delay-100 ease-out text-[#555555] text-[13.5px] sm:text-[14px] leading-[1.75]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {/* Title & Introduction */}
            <p className="font-bold text-[#2a2a2a] text-[15px] sm:text-[16px] mb-2">
              Welcome to AEC Network
            </p>
            <p className="mb-4">
              Welcome to AEC Network! We provide professional, Islamic, and academic education to students worldwide through flexible and accessible online learning. Our qualified and dedicated teachers are committed to supporting students in their educational journey, developing their skills, and helping them achieve their academic and personal goals.
            </p>

            {/* What We Do */}
            <p className="font-bold text-[#2a2a2a] text-[14px] sm:text-[14.5px] mt-4 mb-2">
              What We Do:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-slate-400">
              <li>
                <strong className="font-bold text-[#2a2a2a]">
                  Islamic Education:
                </strong>{" "}
                We provide Quran Reading, Quran Memorization with Tajweed, Quran Translation, Hadith, Islamic Studies, and other essential Islamic subjects.
              </li>
              <li>
                <strong className="font-bold text-[#2a2a2a]">
                  Academic Education:
                </strong>{" "}
                We offer quality academic support in subjects including English, Mathematics, Arabic, and basic education for students from different grade levels.
              </li>
              <li>
                <strong className="font-bold text-[#2a2a2a]">
                  Professional Learning:
                </strong>{" "}
                AEC Network also promotes professional and skill-based learning opportunities designed to help students develop useful knowledge and abilities for their future.
              </li>
              <li>
                <strong className="font-bold text-[#2a2a2a]">
                  Qualified Teachers:
                </strong>{" "}
                Our experienced and trained teachers provide personalized online classes according to each student&apos;s learning needs, level, and schedule.
              </li>
              <li>
                <strong className="font-bold text-[#2a2a2a]">
                  Online Learning Worldwide:
                </strong>{" "}
                We provide flexible online education for students around the world, making quality Islamic, academic, and professional education accessible from anywhere.
              </li>
            </ul>

            {/* Our Mission */}
            <p className="font-bold text-[#2a2a2a] text-[14px] sm:text-[14.5px] mt-4 mb-2">
              Our Mission
            </p>
            <p className="mb-4">
              Our mission is to provide accessible, quality, and values-based education that combines Islamic teachings, academic knowledge, and professional development. We aim to help students learn with confidence, develop strong character, and prepare for a successful future.
            </p>

            {/* Our Values */}
            <p className="mt-4 mb-4">
              <strong className="font-bold text-[#2a2a2a]">Our Values:</strong>{" "}
              Quality Education • Islamic Values • Professionalism • Personal Attention • Integrity • Continuous Learning • Student Success
            </p>

            {/* Join AEC Network */}
            <p className="font-bold text-[#2a2a2a] text-[14px] sm:text-[14.5px] mt-4 mb-2">
              Join AEC Network
            </p>
            <p className="mb-3">
              Join AEC Network and become part of a growing global learning community. Whether you are looking for Quranic education, academic support, Arabic and English learning, or professional development, our dedicated teachers are here to guide you.
            </p>
            <p className="text-[#333333] font-medium">
              Start your learning journey with AEC Network today and take a step toward a brighter and better future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
