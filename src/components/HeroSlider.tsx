"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface BannerSlide {
  id: string;
  badge?: string;
  title: string;
  subtitle: string;
  image: string;
  imageExt: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn: { label: string; href: string };
  accentColor: string;
  glowColor: string;
  theme: "light" | "dark";
  bgGradient: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: "s1",
    badge: "Official Islamic & Academic Network",
    title: "Welcome to AEC Network",
    subtitle:
      "Where Learning Inspires Growth, Knowledge Builds Confidence, and Every Student Matters.",
    image: "/images/banner-1",
    imageExt: "png",
    primaryBtn: { label: "Start Learning Today", href: "/admissions/apply" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#0F766E",
    glowColor: "rgba(15,118,110,0.35)",
    theme: "light",
    bgGradient: "from-[#e7f5f3] via-[#f1faf8] to-[#ffffff]",
  },
  {
    id: "s2",
    badge: "Interactive Online Education",
    title: "Education for Every Mind,",
    subtitle: "Opportunity for Every Future.",
    image: "/images/banner-2",
    imageExt: "jpg",
    primaryBtn: { label: "Explore All Courses", href: "/courses" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#0F766E",
    glowColor: "rgba(15,118,110,0.35)",
    theme: "dark",
    bgGradient: "from-[#040a18] via-[#091830] to-[#040a18]",
  },
  {
    id: "s3",
    badge: "Structured Pathways to Excellence",
    title: "Unlock Your Potential",
    subtitle: "Through Quality Education.",
    image: "/images/banner-3",
    imageExt: "png",
    primaryBtn: { label: "View All Courses", href: "/courses" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#0F766E",
    glowColor: "rgba(15,118,110,0.35)",
    theme: "light",
    bgGradient: "from-[#f8fafc] via-[#f1f5f9] to-[#ffffff]",
  },
];

const DURATION = 7000;

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
        if (p >= 100) {
          next();
          return 0;
        }
        return p + 100 / (DURATION / 50);
      });
    }, 50);
    return () => clearInterval(tick);
  }, [paused, next]);

  const slide = SLIDES[current]!;
  const isLightCurrent = slide.theme === "light";

  return (
    <section
      className="relative overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style jsx global>{`
        @keyframes heroSmoothFadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-title-anim {
          animation: heroSmoothFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-sub-anim {
          animation: heroSmoothFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          opacity: 0;
        }
        .hero-btn-anim {
          animation: heroSmoothFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-slate-200/60">
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${slide.accentColor}, #14b8a6)`,
            boxShadow: `0 0 10px ${slide.glowColor}`,
          }}
        />
      </div>

      {/* Slides Deck */}
      <div className="relative w-full">
        {SLIDES.map((s, i) => {
          const isCurrent = i === current;
          const isLight = s.theme === "light";

          return (
            <div
              key={s.id}
              className={`transition-opacity duration-700 ${
                isCurrent
                  ? "relative opacity-100 z-10"
                  : "absolute inset-0 opacity-0 pointer-events-none z-0"
              }`}
            >
              {/* Slide Background Gradient */}
              <div className={`w-full bg-gradient-to-r ${s.bgGradient} overflow-hidden`}>
                <div className="container-aec flex flex-col-reverse lg:flex-row items-center justify-between min-h-[500px] lg:h-[calc(100vh-76px)] lg:max-h-[680px] py-8 lg:py-0 gap-6 lg:gap-8">
                  
                  {/* Left Column: Text & CTAs */}
                  <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col justify-center space-y-5 z-20">
                    {s.badge && (
                      <div
                        className={`inline-flex items-center self-start gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border shadow-xs ${
                          isLight
                            ? "bg-teal-50 border-teal-200 text-[#0F766E]"
                            : "bg-white/10 border-white/20 text-teal-300"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
                        <span>{s.badge}</span>
                      </div>
                    )}

                    <h1
                      className={`hero-title-anim font-display font-extrabold tracking-tight leading-[1.14] ${
                        isLight ? "text-[#0B1F3A]" : "text-white"
                      }`}
                      style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
                    >
                      {s.title}
                    </h1>

                    <p
                      className={`hero-sub-anim font-medium leading-relaxed ${
                        isLight ? "text-slate-700" : "text-slate-200"
                      }`}
                      style={{ fontSize: "clamp(1rem, 1.35vw, 1.25rem)" }}
                    >
                      {s.subtitle}
                    </p>

                    {/* Action Buttons */}
                    <div className="hero-btn-anim flex flex-wrap items-center gap-3.5 pt-2">
                      <Link
                        href={s.primaryBtn.href as never}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] bg-[#0F766E] hover:bg-[#0c5c56]"
                        style={{
                          boxShadow: `0 8px 24px ${s.glowColor}`,
                        }}
                      >
                        <span>{s.primaryBtn.label}</span>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>

                      <Link
                        href={s.secondaryBtn.href as never}
                        className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-sm ${
                          isLight
                            ? "text-[#0B1F3A] border-2 border-slate-300 bg-white hover:bg-slate-50 hover:border-[#0F766E]"
                            : "text-white border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md"
                        }`}
                      >
                        {s.secondaryBtn.label}
                      </Link>
                    </div>

                    {/* Clean minimal stats */}
                    <div
                      className={`hero-btn-anim flex flex-wrap gap-6 sm:gap-8 pt-4 border-t ${
                        isLight ? "border-slate-200" : "border-white/15"
                      }`}
                    >
                      {[
                        { n: "5,000+", l: "Students Enrolled" },
                        { n: "150+", l: "Expert Instructors" },
                        { n: "50+", l: "Global Countries" },
                      ].map((st) => (
                        <div key={st.l} className="flex flex-col">
                          <span
                            className="text-xl font-black"
                            style={{ color: s.accentColor }}
                          >
                            {st.n}
                          </span>
                          <span
                            className={`text-xs font-medium ${
                              isLight ? "text-slate-600" : "text-slate-300"
                            }`}
                          >
                            {st.l}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Full Banner Artwork (100% visible, no crop, no dark overlay) */}
                  <div className="w-full lg:w-[52%] xl:w-[55%] flex items-center justify-center relative">
                    <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[560px] xl:h-[620px]">
                      <Image
                        src={`${s.image}.${s.imageExt}`}
                        alt={s.title}
                        fill
                        priority={i === 0}
                        className="object-contain object-center lg:object-right"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
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
              width: i === current ? 32 : 10,
              height: 9,
              background:
                i === current
                  ? slide.accentColor
                  : isLightCurrent
                  ? "rgba(11,31,58,0.25)"
                  : "rgba(255,255,255,0.35)",
              boxShadow: i === current ? `0 0 10px ${slide.glowColor}` : "none",
            }}
          />
        ))}
      </div>

      {/* Slide Navigation Arrows */}
      {[
        { label: "Prev", action: prev, pos: "left-3 md:left-5", icon: "M15 19l-7-7 7-7" },
        { label: "Next", action: next, pos: "right-3 md:right-5", icon: "M9 5l7 7-7 7" },
      ].map(({ label, action, pos, icon }) => (
        <button
          key={label}
          onClick={action}
          aria-label={label}
          className={`hidden md:flex absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border transition-all duration-200 hover:scale-110 cursor-pointer shadow-lg ${
            isLightCurrent
              ? "border-slate-300 bg-white/90 hover:bg-white text-[#0B1F3A]"
              : "border-white/20 bg-black/40 hover:bg-black/70 text-white backdrop-blur-md"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
          </svg>
        </button>
      ))}
    </section>
  );
}
