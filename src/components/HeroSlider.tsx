"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface BannerSlide {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  description: string;
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
    tag: "🌍 AEC Network",
    title: "Welcome to AEC Network",
    highlight: "Where Learning Inspires Growth",
    description:
      "Knowledge Builds Confidence, and Every Student Matters. Join thousands of learners worldwide in a transformative educational journey.",
    image: "/images/banner-1",
    imageExt: "jpg",
    primaryBtn: { label: "Start Learning Today", href: "/admissions/apply" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#C9A24B",
    glowColor: "rgba(201,162,75,0.45)",
  },
  {
    id: "s2",
    tag: "📚 Quality Education",
    title: "Education for Every Mind,",
    highlight: "Opportunity for Every Future",
    description:
      "Structured, accessible online education with vetted instructors, personalized 1-on-1 tutoring, and comprehensive academic support worldwide.",
    image: "/images/banner-2",
    imageExt: "jpg",
    primaryBtn: { label: "Explore Programs", href: "/programs" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.45)",
  },
  {
    id: "s3",
    tag: "🎓 Your Potential",
    title: "Unlock Your Potential",
    highlight: "Through Quality Education",
    description:
      "From Islamic Studies to Academic Excellence and Digital Skills — AEC Network empowers every student to achieve their highest aspirations.",
    image: "/images/banner-3",
    imageExt: "png",
    primaryBtn: { label: "View All Courses", href: "/courses" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#22c55e",
    glowColor: "rgba(34,197,94,0.45)",
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
      className="relative overflow-hidden bg-[#040a18] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ minHeight: "100svh" }}
    >
      <style jsx global>{`
        @keyframes heroCharIn {
          from { opacity: 0; transform: translateY(60%) rotateX(-90deg) scale(0.8); filter: blur(8px); }
          to   { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); filter: blur(0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroPulseRing {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes heroKenBurns {
          from { transform: scale(1) translate(0, 0); }
          to   { transform: scale(1.1) translate(-1.5%, -1%); }
        }
        @keyframes heroTagSlide {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .hero-char {
          display: inline-block;
          opacity: 0;
          animation: heroCharIn 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
          transform-origin: 50% 100%;
          will-change: transform, opacity;
        }
        .hero-fade-up {
          opacity: 0;
          animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .hero-tag-slide {
          opacity: 0;
          animation: heroTagSlide 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .hero-ken-burns {
          animation: heroKenBurns 8s ease-out infinite alternate;
        }
      `}</style>

      {/* Background Images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <div className={i === current ? "hero-ken-burns w-full h-full" : "w-full h-full"}>
            <Image
              src={`${s.image}.${s.imageExt}`}
              alt={s.tag}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#040a18]/96 via-[#040a18]/75 to-[#040a18]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040a18]/90 via-transparent to-[#040a18]/40" />
        </div>
      ))}

      {/* Glow Orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${slide.glowColor} 0%, transparent 70%)`,
          transition: "background 1s ease",
          zIndex: 1,
          opacity: 0.5,
        }}
      />

      {/* Pulse Rings */}
      <div className="absolute right-[12%] top-[22%] z-[1] hidden lg:block">
        {[0, 0.6, 1.2].map((d) => (
          <div
            key={d}
            className="absolute w-28 h-28 rounded-full border border-white/10"
            style={{
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              animation: `heroPulseRing 3s ease-out ${d}s infinite`,
            }}
          />
        ))}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ background: `${slide.accentColor}22`, border: `1.5px solid ${slide.accentColor}55` }}
        >
          🎓
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-aec flex flex-col justify-center min-h-[100svh] py-28 md:py-36">
        <div key={slide.id} className="max-w-[720px] space-y-6">

          {/* Tag */}
          <div className="hero-tag-slide">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm border"
              style={{
                color: slide.accentColor,
                borderColor: `${slide.accentColor}55`,
                background: `${slide.accentColor}18`,
              }}
            >
              {slide.tag}
            </span>
          </div>

          {/* Title Line 1 */}
          <h1
            className="font-display font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-2xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            <SplitText text={slide.title} delay={0.08} />
          </h1>

          {/* Title Line 2 — Highlighted */}
          <h1
            className="font-display font-black leading-[1.1] tracking-tight drop-shadow-2xl"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
              color: slide.accentColor,
              textShadow: `0 0 40px ${slide.glowColor}`,
            }}
          >
            <SplitText text={slide.highlight} delay={0.22} />
          </h1>

          {/* Description */}
          <p
            className="hero-fade-up text-slate-300 leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", animationDelay: "0.6s" }}
          >
            {slide.description}
          </p>

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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white border border-white/25 bg-white/8 backdrop-blur-md transition-all duration-200 hover:bg-white/15 hover:scale-[1.04] active:scale-[0.97] shadow-lg"
            >
              {slide.secondaryBtn.label}
            </Link>
          </div>

          {/* Stats */}
          <div
            className="hero-fade-up flex flex-wrap gap-6 pt-4 border-t border-white/10"
            style={{ animationDelay: "1s" }}
          >
            {[
              { n: "5,000+", l: "Students Enrolled" },
              { n: "150+", l: "Expert Instructors" },
              { n: "50+", l: "Global Countries" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="text-xl font-black" style={{ color: slide.accentColor }}>{s.n}</span>
                <span className="text-xs text-slate-400 font-medium">{s.l}</span>
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

      {/* Slide Dots */}
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

      {/* Arrows */}
      {[
        { label: "Prev", action: prev, pos: "left-5", icon: "M15 19l-7-7 7-7" },
        { label: "Next", action: next, pos: "right-5", icon: "M9 5l7 7-7 7" },
      ].map(({ label, action, pos, icon }) => (
        <button
          key={label}
          onClick={action}
          aria-label={label}
          className={`hidden md:flex absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white transition-all duration-200 hover:scale-110 hover:bg-black/70 cursor-pointer shadow-xl`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
          </svg>
        </button>
      ))}
    </section>
  );
}
