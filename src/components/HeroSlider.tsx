"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface BannerSlide {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn: { label: string; href: string };
  accentColor: string;
  glowColor: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: "s1",
    tag: "🌍 Global Education",
    title: "Leading Online Educational",
    highlight: "Institution in the World",
    description:
      "Structured, accessible online education with vetted instructors, personalized 1-on-1 tutoring, and comprehensive academic support worldwide.",
    primaryBtn: { label: "Start Learning Today", href: "/admissions/apply" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#C9A24B",
    glowColor: "rgba(201,162,75,0.4)",
  },
  {
    id: "s2",
    tag: "🕌 Islamic Education",
    title: "Build a Strong Foundation in",
    highlight: "Faith & Knowledge",
    description:
      "Qur'an recitation, Tajweed, Hifz, Islamic studies, Seerah, Hadith — guided by qualified and experienced scholars worldwide.",
    primaryBtn: { label: "Explore Islamic Studies", href: "/programs/quran-islamic-studies" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#22c55e",
    glowColor: "rgba(34,197,94,0.4)",
  },
  {
    id: "s3",
    tag: "📚 Academic Excellence",
    title: "Master Core Subjects and",
    highlight: "Achieve Your Goals",
    description:
      "Mathematics, Science, English, GCSE, O & A Levels and more — with structured lessons, expert guidance and personalized support.",
    primaryBtn: { label: "Explore Academics", href: "/programs/mathematics" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.4)",
  },
  {
    id: "s4",
    tag: "💻 Technology & Coding",
    title: "Learn Today, Build Tomorrow",
    highlight: "with Modern Digital Skills",
    description:
      "Programming, web development, digital marketing and more — develop in-demand skills for a successful and prosperous future.",
    primaryBtn: { label: "Explore Tech Programs", href: "/programs/computer-programming" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#06b6d4",
    glowColor: "rgba(6,182,212,0.4)",
  },
];

const DURATION = 7000;

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ animationDelay: `${delay + i * 0.03}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p === 0 ? SLIDES.length - 1 : p - 1));
    setProgress(0);
  }, []);

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
      className="relative overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ minHeight: "60svh" }}
    >

      {/* ───── Floating Decorative Orbs ───── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${slide.glowColor} 0%, transparent 70%)`,
          transition: "background 1s ease",
          zIndex: 1,
          opacity: 0.5,
        }}
      />

      {/* ───── Pulse Rings ───── */}
      <div className="absolute right-[12%] top-[20%] z-[1] hidden lg:block">
        {[0, 0.5, 1].map((d) => (
          <div
            key={d}
            className="absolute w-32 h-32 rounded-full border border-white/10"
            style={{
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              animation: `heroPulseRing 3s ease-out ${d}s infinite`,
            }}
          />
        ))}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          style={{ background: `${slide.accentColor}22`, border: `1.5px solid ${slide.accentColor}55` }}
        >
          🎓
        </div>
      </div>

      {/* ───── Main Content ───── */}
      <div className="relative z-10 container-aec flex flex-col justify-center min-h-[100svh] py-28 md:py-36">
        <div key={slide.id} className="max-w-[720px] space-y-6">

          {/* Title line 1 — character split */}
          <h1 className="font-display font-extrabold leading-[1.1] tracking-tight text-aec-navy drop-shadow-sm"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            <SplitText text={slide.title} delay={0.1} />
          </h1>

          {/* Title line 2 — highlighted */}
          <h1 className="font-display font-black leading-[1.1] tracking-tight drop-shadow-sm"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: slide.accentColor,
              textShadow: `0 0 40px ${slide.glowColor}`,
            }}>
            <SplitText text={slide.highlight} delay={0.25} />
          </h1>

          {/* CTA Buttons */}
          <div className="hero-fade-up flex flex-wrap gap-4 pt-2" style={{ animationDelay: "0.8s" }}>
            <Link
              href={slide.primaryBtn.href as never}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-black shadow-2xl transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
              style={{
                background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.accentColor}cc)`,
                boxShadow: `0 8px 30px ${slide.glowColor}`,
              }}
            >
              {slide.primaryBtn.label}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href={slide.secondaryBtn.href as never}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-aec-navy border border-aec-navy/30 bg-aec-navy/5 transition-all duration-200 hover:bg-aec-navy/10 hover:scale-[1.04] active:scale-[0.97] shadow-sm"
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
            className="hero-fade-up flex flex-wrap gap-6 pt-4 border-t border-slate-200"
            style={{ animationDelay: "1s" }}
          >
            {[
              { n: "5,000+", l: "Students Enrolled" },
              { n: "150+", l: "Expert Instructors" },
              { n: "50+", l: "Global Countries" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="text-xl font-black" style={{ color: slide.accentColor }}>{s.n}</span>
                <span className="text-xs text-slate-500 font-medium">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───── Progress Bar ───── */}
      <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-slate-200">
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${slide.accentColor}, #ffffff88)`,
            boxShadow: `0 0 10px ${slide.glowColor}`,
          }}
        />
      </div>

      {/* ───── Slide Dots ───── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setCurrent(i); setProgress(0); }}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-400 cursor-pointer"
            style={{
              width: i === current ? 36 : 10,
              height: 10,
              background: i === current ? slide.accentColor : "rgba(255,255,255,0.3)",
              boxShadow: i === current ? `0 0 12px ${slide.glowColor}` : "none",
            }}
          />
        ))}
      </div>

      {/* ───── Arrows ───── */}
      {[
        { label: "Prev", action: prev, dir: "left", icon: "M15 19l-7-7 7-7" },
        { label: "Next", action: next, dir: "right", icon: "M9 5l7 7-7 7" },
      ].map(({ label, action, dir, icon }) => (
        <button
          key={label}
          onClick={action}
          aria-label={label}
          className={`hidden md:flex absolute ${dir}-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white transition-all duration-200 hover:scale-110 hover:bg-black/70 cursor-pointer shadow-xl`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
          </svg>
        </button>
      ))}
    </section>
  );
}
