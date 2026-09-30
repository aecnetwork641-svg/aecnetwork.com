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
    title: "Education for Every Mind,",
    subtitle: "Opportunity for Every Future.",
    image: "/images/banner-2",
    imageExt: "jpg",
    primaryBtn: { label: "Explore All Courses", href: "/courses" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#4DA3D9",
    glowColor: "#EAF5FC",
  },
  {
    id: "s3",
    title: "Unlock Your Potential",
    subtitle: "Through Quality Education.",
    image: "/images/banner-3",
    imageExt: "png",
    primaryBtn: { label: "View All Courses", href: "/courses" },
    secondaryBtn: { label: "Book Free Trial", href: "/admissions/free-trial" },
    accentColor: "#4DA3D9",
    glowColor: "#EAF5FC",
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

  return (
    <section
      className="relative overflow-hidden bg-[#0B1F3A] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ minHeight: "100svh" }}
    >
      <style jsx global>{`
        @keyframes heroSmoothFadeUp {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroKenBurns {
          from {
            transform: scale(1) translate(0, 0);
          }
          to {
            transform: scale(1.08) translate(-1%, -1%);
          }
        }
        .hero-title-anim {
          animation: heroSmoothFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-sub-anim {
          animation: heroSmoothFadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }
        .hero-btn-anim {
          animation: heroSmoothFadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          opacity: 0;
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
              alt={s.title}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          {/* Balanced overlay in pure Navy #0B1F3A so background image is clearly visible while text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/85 via-[#0B1F3A]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-[#0B1F3A]/30" />
        </div>
      ))}

      {/* Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${slide.glowColor} 0%, transparent 70%)`,
          transition: "background 1s ease",
          zIndex: 1,
          opacity: 0.2,
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 container-aec flex flex-col justify-center min-h-[100svh] py-28 md:py-36">
        <div key={slide.id} className="max-w-2xl lg:max-w-3xl space-y-6">

          {/* Heading - Clean whole text, no scattered jumping alphabets */}
          <h1
            className="hero-title-anim font-display font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-2xl"
            style={{ fontSize: "clamp(2.3rem, 5vw, 3.8rem)" }}
          >
            {slide.title}
          </h1>

          {/* Subtitle / Description - Clean 2-3 lines with perfect readability */}
          <p
            className="hero-sub-anim font-medium text-slate-100 leading-snug drop-shadow-lg"
            style={{
              fontSize: "clamp(1.2rem, 2.3vw, 1.85rem)",
              color: slide.accentColor,
              textShadow: `0 0 30px ${slide.glowColor}`,
            }}
          >
            {slide.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="hero-btn-anim flex flex-wrap items-center gap-4 pt-4">
            <Link
              href={slide.primaryBtn.href as never}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white shadow-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white border border-white/25 bg-white/10 backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-[1.03] active:scale-[0.98] shadow-lg"
            >
              {slide.secondaryBtn.label}
            </Link>
          </div>

          {/* Clean minimal stats */}
          <div
            className="hero-btn-anim flex flex-wrap gap-8 pt-6 border-t border-white/10"
          >
            {[
              { n: "5,000+", l: "Students Enrolled" },
              { n: "150+", l: "Expert Instructors" },
              { n: "50+", l: "Global Countries" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="text-xl font-black text-white" style={{ color: slide.accentColor }}>{s.n}</span>
                <span className="text-xs text-[#EAF5FC] font-medium">{s.l}</span>
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
