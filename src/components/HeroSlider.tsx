"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SLIDES = [
  {
    id: "s1",
    badge: "🌍 Global Online Education",
    title: "Where Knowledge",
    highlight: "Meets Excellence",
    sub: "Structured, accessible online education with vetted instructors, personalized 1-on-1 tutoring, and comprehensive academic support worldwide.",
    primaryBtn: { label: "Start Learning Today", href: "/admissions/apply" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accent: "#C9A24B",
    icon: "📖",
  },
  {
    id: "s2",
    badge: "🕌 Islamic & Quranic Studies",
    title: "Build Your Foundation",
    highlight: "in Faith & Wisdom",
    sub: "Qur'an, Tajweed, Hifz, Seerah & Hadith — guided by qualified scholars. Learn Islam the right way, at your own pace.",
    primaryBtn: { label: "Explore Islamic Studies", href: "/programs/quran-islamic-studies" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accent: "#22c55e",
    icon: "🕌",
  },
  {
    id: "s3",
    badge: "📚 Academic Excellence",
    title: "Master Every Subject,",
    highlight: "Achieve Every Goal",
    sub: "GCSE, O & A Levels, SAT, Math, Science, English — expert coaching with proven results and past paper mastery.",
    primaryBtn: { label: "View All Programs", href: "/programs" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accent: "#3b82f6",
    icon: "🎓",
  },
  {
    id: "s4",
    badge: "💻 Technology & Coding",
    title: "Learn Today,",
    highlight: "Build Tomorrow",
    sub: "Python, Web Dev, React, Next.js — hands-on coding skills that open doors to a successful digital career.",
    primaryBtn: { label: "Explore Tech Programs", href: "/programs/computer-programming" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accent: "#06b6d4",
    icon: "💻",
  },
];

const STATS = [
  { n: "5,000+", l: "Students Enrolled" },
  { n: "150+",   l: "Expert Instructors" },
  { n: "50+",    l: "Global Countries" },
  { n: "100%",   l: "Verified Faculty" },
];

const DURATION = 6000;

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

      {/* ══════════ DECORATIVE RIGHT SIDE ══════════ */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Large circle ring */}
        <div
          className="absolute w-[520px] h-[520px] rounded-full border aec-pulse-slow"
          style={{ borderColor: "rgba(201,162,75,0.15)" }}
        />
        <div
          className="absolute w-[380px] h-[380px] rounded-full border"
          style={{
            borderColor: "rgba(201,162,75,0.1)",
            animation: "aecSpin 30s linear infinite",
            borderStyle: "dashed",
          }}
        />
        <div
          className="absolute w-[240px] h-[240px] rounded-full border aec-pulse-slow"
          style={{ borderColor: "rgba(201,162,75,0.2)", animationDelay: "1.5s" }}
        />

        {/* Center floating icon box */}
        <div
          className="relative z-10 aec-float flex flex-col items-center gap-4"
          style={{ animationDelay: "0.5s" }}
        >
          <div
            className="w-40 h-40 rounded-3xl flex items-center justify-center text-7xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(201,162,75,0.2), rgba(201,162,75,0.05))",
              border: "1.5px solid rgba(201,162,75,0.4)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 60px rgba(201,162,75,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
              transition: "all 0.5s ease",
            }}
            key={slide.id}
          >
            {slide.icon}
          </div>

          {/* Floating mini badges */}
          {[
            { emoji: "📜", label: "Certificate", top: "-60px", left: "-90px", delay: "0s" },
            { emoji: "⭐", label: "5-Star",      top: "-40px", left: "100px",  delay: "0.8s" },
            { emoji: "🌐", label: "Online",      top: "100px", left: "-100px", delay: "1.2s" },
            { emoji: "🎯", label: "Personalized",top: "110px", left: "90px",   delay: "0.4s" },
          ].map((b) => (
            <div
              key={b.label}
              className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
              style={{
                top: b.top, left: b.left,
                background: "rgba(15,42,71,0.9)",
                border: "1px solid rgba(201,162,75,0.4)",
                backdropFilter: "blur(8px)",
                animation: `aecFloat ${4 + parseFloat(b.delay)}s ease-in-out infinite`,
                animationDelay: b.delay,
                whiteSpace: "nowrap",
              }}
            >
              <span>{b.emoji}</span> {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="relative z-10 container-aec grid lg:grid-cols-2 min-h-[88svh] py-20 md:py-28 items-center gap-12">
        <div className={`space-y-7 ${animate ? "" : "opacity-0"}`} style={{ transition: "opacity 0.08s" }}>

          {/* Badge */}
          <div className="aec-slide-r" style={{ animationDelay: "0s" }}>
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                color: slide.accent,
                background: `${slide.accent}18`,
                border: `1px solid ${slide.accent}50`,
                backdropFilter: "blur(4px)",
              }}
            >
              {slide.badge}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1
              className="aec-fade-up font-display font-extrabold text-aec-navy leading-[1.1]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", animationDelay: "0.1s" }}
            >
              {slide.title}
            </h1>
            <h1
              className="aec-fade-up font-display font-black leading-[1.1] aec-shimmer-text"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", animationDelay: "0.2s" }}
            >
              {slide.highlight}
            </h1>
          </div>

          {/* Sub text */}
          <p
            className="aec-fade-up text-slate-600 leading-relaxed max-w-lg"
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", animationDelay: "0.35s" }}
          >
            {slide.sub}
          </p>

          {/* CTA Buttons */}
          <div className="aec-fade-up flex flex-wrap gap-4" style={{ animationDelay: "0.5s" }}>
            <Link
              href={slide.primaryBtn.href as never}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-[#0F2A47] transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
              style={{
                background: `linear-gradient(135deg, #F3D17C, #C9A24B)`,
                boxShadow: "0 8px 32px rgba(201,162,75,0.35), 0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {slide.primaryBtn.label}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href={slide.secondaryBtn.href as never}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-aec-navy border border-aec-navy/30 bg-aec-navy/5 transition-all duration-200 hover:bg-aec-navy/10 hover:scale-[1.04] active:scale-[0.97]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {slide.secondaryBtn.label}
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="aec-fade-up grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            style={{ animationDelay: "0.7s" }}
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

        {/* Right column — spacer on desktop so decorative element shows */}
        <div className="hidden lg:block" />
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
