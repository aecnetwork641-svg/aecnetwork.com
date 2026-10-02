"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageExt: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn: { label: string; href: string };
  accentColor: string;
  glowColor: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: "s1",
    title: "Welcome to AEC Network",
    subtitle:
      "Where Learning Inspires Growth, Knowledge Builds Confidence, and Every Student Matters.",
    image: "/images/banner-1",
    imageExt: "png",
    primaryBtn: { label: "Start Learning Today", href: "/admissions/apply" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#4DA3D9",
    glowColor: "#EAF5FC",
  },
  {
    id: "s2",
    title: "Where Knowledge Meets Opportunity",
    subtitle:
      "A modern learning experience designed to inspire growth, excellence, and lifelong success.",
    image: "/images/banner-2",
    imageExt: "png",
    primaryBtn: { label: "Explore All Courses", href: "/courses" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#4DA3D9",
    glowColor: "#EAF5FC",
  },
  {
    id: "s3",
    title: "Empowering Minds, Shaping Futures",
    subtitle:
      "Where Knowledge Inspires Growth, Skills Build Confidence, and Learning Creates New Opportunities.",
    image: "/images/banner-3",
    imageExt: "png",
    primaryBtn: { label: "View All Courses", href: "/courses" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#4DA3D9",
    glowColor: "#EAF5FC",
  },
];

const DURATION = 7500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p === 0 ? SLIDES.length - 1 : p - 1));
    setProgress(0);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + 100 / (DURATION / 50);
      });
    }, 50);
    return () => clearInterval(tick);
  }, [next]);

  const slide = SLIDES[current]!;

  return (
    <section
      className="relative overflow-hidden bg-[#0B1F3A] select-none"
      style={{ minHeight: "100svh" }}
    >
      <style jsx global>{`
        @keyframes heroSmoothFadeUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes sr7CharAssemble {
          0% {
            opacity: 0;
            transform: translate3d(0, var(--sr7-y, 45px), -35px) rotateX(65deg) rotateZ(var(--sr7-rz, 0deg));
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg);
          }
        }
        .sr7-perspective-box {
          perspective: 800px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
        }
        .sr7-word-wrap {
          display: inline-block;
          white-space: nowrap;
          transform-style: preserve-3d;
          margin-right: 0.28em;
        }
        .sr7-char {
          display: inline-block;
          opacity: 0;
          transform-origin: 50% 50% -35px;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform, opacity;
          animation: sr7CharAssemble 1.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-btn-anim {
          animation: heroSmoothFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
          opacity: 0;
        }
        .hero-img-sharp {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
          filter: contrast(1.03) saturate(1.02);
        }
      `}</style>

      {/* Background Images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <div className="w-full h-full relative">
            <Image
              src={`${s.image}.${s.imageExt}`}
              alt={s.title}
              fill
              priority
              unoptimized
              quality={100}
              className="object-cover object-right hero-img-sharp"
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* Main Content Area */}
      <div className="relative z-10 container-aec flex flex-col justify-center min-h-[100svh] py-28 md:py-36">
        <div key={slide.id} className="max-w-2xl lg:max-w-3xl space-y-6">

          {/* Heading - Exact Slider Revolution 7 Letter-by-Letter 3D Animation */}
          <h1
            key={`title-${slide.id}`}
            className="font-display font-extrabold text-white tracking-tight leading-[1.18] drop-shadow-2xl sr7-perspective-box"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.65rem)" }}
          >
            {(() => {
              let charIndex = 0;
              const yOffsets = [-42, 38, -32, 44, -36, 32, -45, 40, -30, 36];
              const rzOffsets = [-8, 7, -6, 9, -7, 6, -9, 8, -5, 7];
              return slide.title.split(" ").map((word, wIdx) => {
                const chars = Array.from(word);
                return (
                  <span key={wIdx} className="sr7-word-wrap">
                    {chars.map((char, cIdx) => {
                      const y = yOffsets[charIndex % yOffsets.length];
                      const rz = rzOffsets[charIndex % rzOffsets.length];
                      const delay = charIndex * 0.045;
                      charIndex++;
                      return (
                        <span
                          key={cIdx}
                          className="sr7-char"
                          style={{
                            ["--sr7-y" as any]: `${y}px`,
                            ["--sr7-rz" as any]: `${rz}deg`,
                            animationDelay: `${delay}s`,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                );
              });
            })()}
          </h1>

          {/* Subtitle - Letter-by-letter 3D cascade matching globallinkeducation */}
          <p
            key={`sub-${slide.id}`}
            className="font-medium leading-snug drop-shadow-lg sr7-perspective-box"
            style={{
              fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)",
              color: slide.accentColor,
              textShadow: `0 0 30px ${slide.glowColor}`,
            }}
          >
            {(() => {
              let charIndex = 0;
              const yOffsets = [-22, 20, -18, 24, -20, 16, -24, 22];
              const rzOffsets = [-5, 4, -4, 6, -4, 4, -6, 5];
              return slide.subtitle.split(" ").map((word, wIdx) => {
                const chars = Array.from(word);
                return (
                  <span key={wIdx} className="sr7-word-wrap">
                    {chars.map((char, cIdx) => {
                      const y = yOffsets[charIndex % yOffsets.length];
                      const rz = rzOffsets[charIndex % rzOffsets.length];
                      const delay = 0.5 + charIndex * 0.018;
                      charIndex++;
                      return (
                        <span
                          key={cIdx}
                          className="sr7-char"
                          style={{
                            ["--sr7-y" as any]: `${y}px`,
                            ["--sr7-rz" as any]: `${rz}deg`,
                            animationDelay: `${delay}s`,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                );
              });
            })()}
          </p>

          {/* Action CTAs */}
          <div className="hero-btn-anim flex flex-wrap items-center gap-3.5 pt-3">
            <Link
              href={slide.primaryBtn.href as never}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${slide.accentColor}, #0B1F3A)`,
                boxShadow: `0 8px 30px ${slide.glowColor}`,
              }}
            >
              <span>{slide.primaryBtn.label}</span>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href={slide.secondaryBtn.href as never}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white border border-white/25 bg-white/10 backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-[1.03] active:scale-[0.98] shadow-lg"
            >
              {slide.secondaryBtn.label}
            </Link>
          </div>

          {/* Clean minimal stats */}
          <div
            className="hero-btn-anim flex flex-wrap gap-7 pt-5 border-t border-white/10"
          >
            {[
              { n: "1232+", l: "Students Enrolled" },
              { n: "60+", l: "Expert Instructors" },
              { n: "50+", l: "Global Countries" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold text-white" style={{ color: slide.accentColor }}>{s.n}</span>
                <span className="text-[11px] sm:text-xs text-[#EAF5FC] font-medium">{s.l}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/10">
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${slide.accentColor}, #ffffff88)`,
            boxShadow: `0 0 10px ${slide.glowColor}`,
          }}
        />
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setCurrent(i);
              setProgress(0);
            }}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === current ? 36 : 10,
              height: 10,
              background: i === current ? slide.accentColor : "rgba(234,245,252,0.35)",
              boxShadow: i === current ? `0 0 12px ${slide.glowColor}` : "none",
            }}
          />
        ))}
      </div>

      {/* Slide Navigation Arrows */}
      {[
        { label: "Prev", action: prev, pos: "left-5", icon: "M15 19l-7-7 7-7" },
        { label: "Next", action: next, pos: "right-5", icon: "M9 5l7 7-7 7" },
      ].map(({ label, action, pos, icon }) => (
        <button
          key={label}
          onClick={action}
          aria-label={label}
          className={`hidden md:flex absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-[#4DA3D9]/40 bg-[#0B1F3A]/85 backdrop-blur-md text-white transition-all duration-200 hover:scale-110 hover:bg-[#4DA3D9] cursor-pointer shadow-xl`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
          </svg>
        </button>
      ))}
    </section>
  );
}
