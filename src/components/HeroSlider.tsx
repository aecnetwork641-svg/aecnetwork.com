"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface BannerSlide {
  id: string;
  category: string;
  badge: string;
  badgeColor: string;
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
    badge: "🕌",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
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
    badge: "📚",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
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
    badge: "🎓",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-400/30",
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
    badge: "💻",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
    titleLight: "Learn Today,",
    titleHighlight: "Build Tomorrow",
    description:
      "Programming, web development, digital marketing, social media and more — develop in-demand skills for a successful future.",
    image: "/images/banner-tech.jpg",
    exploreHref: "/programs/computer-programming",
    buttonColor: "bg-cyan-400 hover:bg-cyan-300 text-slate-950",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const activeSlide = SLIDES[current] || SLIDES[0]!;

  return (
    <div
      className="relative overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transition: "opacity 1s ease-in-out, transform 6s ease-out" }}
          >
            <Image
              src={slide.image}
              alt={slide.category}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Gradient Overlays for optimal text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container-aec relative z-10 min-h-[580px] md:min-h-[640px] flex flex-col justify-between py-12 md:py-20">
        {/* Top Floating Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white/90 shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-aec-teal animate-pulse" />
            <span>Akbar Education Communication Network</span>
          </div>

          {/* Slide Indicator Numbers */}
          <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/10">
            <span className="text-aec-teal font-bold">0{current + 1}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">0{SLIDES.length}</span>
          </div>
        </div>

        {/* Center Hero Text Content */}
        <div className="max-w-2xl my-auto pt-6 pb-8 space-y-5">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm transition-all duration-300">
            <span>{activeSlide.badge}</span>
            <span>{activeSlide.category}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] drop-shadow-md">
            {activeSlide.titleLight}{" "}
            <span className="block mt-1 bg-gradient-to-r from-white via-aec-teal to-emerald-300 bg-clip-text text-transparent">
              {activeSlide.titleHighlight}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-xl drop-shadow">
            {activeSlide.description}
          </p>

          {/* CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3.5">
            <Link
              href={activeSlide.exploreHref as never}
              className={`rounded-xl px-6 py-3.5 text-sm font-bold shadow-lg transition-all duration-200 flex items-center gap-2 hover:scale-[1.02] cursor-pointer ${activeSlide.buttonColor}`}
            >
              <span>Explore Programs</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/admissions/free-trial"
              className="rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02]"
            >
              Book a Free Trial
            </Link>
          </div>
        </div>

        {/* Bottom Minimal Slide Indicators */}
        <div className="pt-4 flex items-center justify-center gap-2.5">
          {SLIDES.map((slide, index) => {
            const isActive = index === current;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.category}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-8 h-2 bg-aec-teal shadow-md shadow-aec-teal/50"
                    : "w-2.5 h-2 bg-white/30 hover:bg-white/60"
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
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md transition hover:scale-110 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md transition hover:scale-110 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
