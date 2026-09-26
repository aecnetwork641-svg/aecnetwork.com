"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface BannerSlide {
  id: string;
  category: string;
  titleLight: string;
  titleHighlight: string;
  description: string;
  image: string;
  exploreHref: string;
  buttonColor: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: "islamic",
    category: "Islamic Education",
    titleLight: "Build a Strong Foundation in",
    titleHighlight: "Faith and Knowledge",
    description:
      "Qur'an recitation, Tajweed, Hifz, Islamic studies, Seerah, Hadith and more — guided by qualified and experienced teachers.",
    image: "/images/banner-islamic.jpg",
    exploreHref: "/programs/quran-islamic-studies",
    buttonColor: "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
  },
  {
    id: "academic",
    category: "Academic Education",
    titleLight: "Master Core Subjects and Achieve",
    titleHighlight: "Your Goals",
    description:
      "Mathematics, Science, English, Arabic and more — with structured lessons, expert guidance and personalized support.",
    image: "/images/banner-academic.jpg",
    exploreHref: "/programs/mathematics",
    buttonColor: "bg-blue-600 hover:bg-blue-500 text-white",
  },
  {
    id: "exams",
    category: "Examination Preparation",
    titleLight: "Prepare Today for a",
    titleHighlight: "Brighter Tomorrow",
    description:
      "GCSE, IGCSE, O & A Levels, SAT and more — with expert-led programs and proven strategies for exam success.",
    image: "/images/banner-exams.jpg",
    exploreHref: "/programs/gcse",
    buttonColor: "bg-purple-600 hover:bg-purple-500 text-white",
  },
  {
    id: "tech",
    category: "Technology & Digital Skills",
    titleLight: "Learn Today,",
    titleHighlight: "Build Tomorrow",
    description:
      "Programming, web development, digital marketing, social media and more — develop in-demand skills for a successful future.",
    image: "/images/banner-tech.jpg",
    exploreHref: "/programs/computer-programming",
    buttonColor: "bg-cyan-400 hover:bg-cyan-300 text-slate-950",
  },
];

const SLIDE_DURATION = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, current]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const activeSlide = SLIDES[current] || SLIDES[0]!;

  return (
    <div
      className="relative overflow-hidden bg-slate-950 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style jsx>{`
        @keyframes heroSlideUp {
          0% {
            opacity: 0;
            transform: translateY(36px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroFadeIn {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes kenBurnsEffect {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.09);
          }
        }

        @keyframes slideProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .anim-title {
          animation: heroSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .anim-desc {
          animation: heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }

        .anim-cta {
          animation: heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.38s forwards;
          opacity: 0;
        }

        .ken-burns {
          animation: kenBurnsEffect 6.5s ease-out infinite alternate;
        }

        .progress-bar-anim {
          animation: slideProgress 6s linear infinite;
        }
      `}</style>

      {/* Top Slider Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/10">
        <div
          key={current}
          className={`h-full bg-gradient-to-r from-aec-teal via-aec-gold to-emerald-400 ${
            !isPaused ? "progress-bar-anim" : "w-full opacity-60"
          }`}
        />
      </div>

      {/* Background Images with Crossfade & Ken Burns Zoom */}
      <div className="absolute inset-0 pointer-events-none">
        {SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-1" : "opacity-0 z-0"
              }`}
            >
              <div className={`w-full h-full relative ${isActive ? "ken-burns" : ""}`}>
                <Image
                  src={slide.image}
                  alt={slide.category}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>

              {/* Multi-layered cinematic gradient overlays for high text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30 md:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/50" />
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="container-aec relative z-10 min-h-[540px] md:min-h-[620px] flex flex-col justify-center py-16 md:py-24">
        {/* Animated Slide Text Content */}
        <div key={activeSlide.id} className="max-w-2xl space-y-6">
          {/* Main Title */}
          <h1 className="anim-title font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.14] text-white drop-shadow-lg">
            {activeSlide.titleLight}{" "}
            <span className="block mt-2 bg-gradient-to-r from-white via-aec-teal to-emerald-300 bg-clip-text text-transparent">
              {activeSlide.titleHighlight}
            </span>
          </h1>

          {/* Description */}
          <p className="anim-desc text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl drop-shadow-md">
            {activeSlide.description}
          </p>

          {/* CTAs */}
          <div className="anim-cta pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={activeSlide.exploreHref as never}
              className={`rounded-xl px-7 py-4 text-sm font-bold shadow-xl transition-all duration-200 flex items-center gap-2.5 hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${activeSlide.buttonColor}`}
            >
              <span>Explore Programs</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/admissions/free-trial"
              className="rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg"
            >
              Book a Free Trial
            </Link>
          </div>
        </div>

        {/* Bottom Minimal Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-2.5">
          {SLIDES.map((slide, index) => {
            const isActive = index === current;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.category}`}
                className={`transition-all duration-400 rounded-full cursor-pointer h-2 ${
                  isActive
                    ? "w-9 bg-aec-teal shadow-md shadow-aec-teal/60"
                    : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer shadow-xl"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 cursor-pointer shadow-xl"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
