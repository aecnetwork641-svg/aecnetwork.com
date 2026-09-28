"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SLIDES = [
  {
    id: "s1",
    badge: "🌍 Global Online Education",
    title: "Empowering Students",
    highlight: "Worldwide for Excellence",
    sub: "Structured online Quran, Islamic Studies, GCSE/SAT prep, and STEM tuition with Sanad-certified faculty and 1-on-1 personalized mentorship.",
    primaryBtn: { label: "Book a Free Trial", href: "/admissions/free-trial" },
    secondaryBtn: { label: "Explore Courses", href: "/courses" },
    accent: "#5fcf80",
    icon: "🎓",
  },
  {
    id: "s2",
    badge: "🕌 Quran & Tajweed Mastery",
    title: "Build Your Foundation",
    highlight: "in Faith & Recitation",
    sub: "Learn Noorani Qaida, Makharij phonetics, Tajweed rules, and Hifz memorization guided by Sanad-certified Huffaz and Qaris.",
    primaryBtn: { label: "Explore Islamic Studies", href: "/programs/quran-islamic-studies" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accent: "#5fcf80",
    icon: "🕌",
  },
  {
    id: "s3",
    badge: "📚 Academic STEM & Exam Prep",
    title: "Master Every Subject,",
    highlight: "Achieve Top Grades",
    sub: "GCSE, O & A Levels, SAT, NAPLAN, Mathematics & Science — expert 1-on-1 coaching with 10-year past paper strategies.",
    primaryBtn: { label: "View All Programs", href: "/programs" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accent: "#3b82f6",
    icon: "📖",
  },
  {
    id: "s4",
    badge: "💻 Technology & Digital Skills",
    title: "Learn Coding Today,",
    highlight: "Build the Future",
    sub: "Python, Web Development, Full-Stack React & Next.js, and Social Media Marketing — hands-on skills for tomorrow's digital leader.",
    primaryBtn: { label: "Explore Coding Programs", href: "/programs/computer-programming" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accent: "#06b6d4",
    icon: "💻",
  },
];

const STATS = [
  { n: "5,000+", l: "Students Enrolled" },
  { n: "150+",   l: "Sanad & Subject Faculty" },
  { n: "50+",    l: "Global Countries" },
  { n: "100%",   l: "1-on-1 & Group Cohorts" },
];

const DURATION = 6000;

function AnimatedLetters({
  text,
  className = "",
  baseDelay = 0,
  shimmer = false,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  shimmer?: boolean;
}) {
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => {
        const chars = Array.from(word);
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.22em] last:mr-0">
            {chars.map((char, cIdx) => {
              const delay = baseDelay + globalCharIndex * 0.035;
              globalCharIndex++;
              return (
                <span
                  key={cIdx}
                  className={`inline-block aec-char-anim ${shimmer ? "aec-shimmer-text" : ""}`}
                  style={{ animationDelay: `${delay}s` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused]   = useState(false);
  const [animate, setAnimate] = useState(true);

  const goTo = useCallback((i: number) => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent(i);
      setProgress(0);
      setAnimate(true);
    }, 80);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo(current === 0 ? SLIDES.length - 1 : current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { next(); return 0; }
        return p + 100 / (DURATION / 50);
      });
    }, 50);
    return () => clearInterval(tick);
  }, [paused, next]);

  const slide = SLIDES[current]!;

  return (
    <section
      className="relative overflow-hidden select-none bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style jsx global>{`
        @keyframes aecFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes aecFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes aecSlideRight {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes aecFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes aecSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes aecPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 0.8; transform: scale(1.08); }
        }
        @keyframes aecShimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes aecCharAnim {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.8);
            filter: blur(4px);
          }
          60% {
            opacity: 1;
            transform: translateY(-3px) scale(1.06);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        .aec-char-anim {
          opacity: 0;
          animation: aecCharAnim 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .aec-fade-up  { opacity:0; animation: aecFadeUp    0.7s cubic-bezier(.16,1,.3,1) forwards; }
        .aec-fade-in  { opacity:0; animation: aecFadeIn    0.6s ease forwards; }
        .aec-slide-r  { opacity:0; animation: aecSlideRight 0.65s cubic-bezier(.16,1,.3,1) forwards; }
        .aec-float    { animation: aecFloat 5s ease-in-out infinite; }
        .aec-pulse-slow{ animation: aecPulse 3s ease-in-out infinite; }
        .aec-shimmer-text {
          background: linear-gradient(90deg, #C9A24B 0%, #F3D17C 40%, #C9A24B 60%, #9B7524 100%);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: aecShimmer 3s linear infinite;
        }
        .aec-stat-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .aec-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(201,162,75,0.15);
        }
      `}</style>

      {/* Subtle geometric pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,162,75,0.04) 40px, rgba(201,162,75,0.04) 41px),
            repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(201,162,75,0.04) 40px, rgba(201,162,75,0.04) 41px)
          `,
        }}
      />
      {/* Soft gold glow left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 70% at 15% 50%, rgba(201,162,75,0.07) 0%, transparent 70%)" }}
      />
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #C9A24B, #F3D17C, #C9A24B)" }} />

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="relative z-10 container-aec min-h-[60svh] py-16 md:py-24 flex items-center">
        <div className={`max-w-3xl space-y-7 ${animate ? "" : "opacity-0"}`} style={{ transition: "opacity 0.08s" }}>

          {/* Heading with Letter-by-Letter Animation */}
          <div className="space-y-1">
            <h1
              className="font-display font-extrabold text-[#37423b] leading-[1.1]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
            >
              {animate && (
                <AnimatedLetters
                  key={`t-${slide.id}`}
                  text={slide.title}
                  baseDelay={0.05}
                />
              )}
            </h1>
            <h1
              className="font-display font-black leading-[1.1]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
            >
              {animate && (
                <AnimatedLetters
                  key={`h-${slide.id}`}
                  text={slide.highlight}
                  baseDelay={0.05 + slide.title.length * 0.035}
                  shimmer
                />
              )}
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="aec-fade-up flex flex-wrap gap-4" style={{ animationDelay: "0.3s" }}>
            <Link
              href={slide.primaryBtn.href as never}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97] bg-[#5fcf80] hover:bg-[#46b967] shadow-lg shadow-emerald-500/25"
            >
              {slide.primaryBtn.label}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href={slide.secondaryBtn.href as never}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-[#37423b] border-2 border-[#5fcf80] bg-white transition-all duration-200 hover:bg-[#5fcf80] hover:text-white hover:scale-[1.04] active:scale-[0.97]"
            >
              {slide.secondaryBtn.label}
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="aec-fade-up grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            style={{ animationDelay: "0.5s" }}
          >
            {STATS.map((s) => (
              <div
                key={s.l}
                className="aec-stat-card flex flex-col items-center text-center px-3 py-3 rounded-xl"
                style={{
                  background: "rgba(15,42,71,0.05)",
                  border: "1px solid rgba(201,162,75,0.25)",
                }}
              >
                <span className="text-xl font-black aec-shimmer-text">{s.n}</span>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ BOTTOM CONTROLS ══════════ */}
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-200">
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, #C9A24B, #F3D17C)`,
            boxShadow: "0 0 10px rgba(201,162,75,0.5)",
          }}
        />
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full cursor-pointer transition-all duration-300"
            style={{
              width:      i === current ? 32 : 8,
              height:     8,
              background: i === current
                ? "linear-gradient(90deg, #C9A24B, #F3D17C)"
                : "rgba(15,42,71,0.2)",
              boxShadow:  i === current ? "0 0 10px rgba(201,162,75,0.5)" : "none",
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      {[
        { label: "Prev", action: prev, pos: "left-4",  icon: "M15 19l-7-7 7-7" },
        { label: "Next", action: next, pos: "right-4", icon: "M9 5l7 7-7 7"   },
      ].map(({ label, action, pos, icon }) => (
        <button
          key={label}
          onClick={action}
          aria-label={label}
          className={`hidden md:flex absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110`}
          style={{
            background: "rgba(15,42,71,0.7)",
            border: "1px solid rgba(201,162,75,0.3)",
            backdropFilter: "blur(8px)",
            color: "#C9A24B",
          }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
          </svg>
        </button>
      ))}
    </section>
  );
}
