import React from "react";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

const FEATURES: FeatureItem[] = [
  {
    id: "personalized-plan",
    title: "Personalized learning plan",
    description:
      "Do you want personalized learning plans? Personalized learning plans help you in more concentration and focus on your learning.",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 5a1 1 0 10-2 0v5a1 1 0 00.4.8l3 2.2a1 1 0 101.2-1.6L13 11.6V7z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "communication",
    title: "24/7 Communication",
    description:
      "Have a query or feedback? Do not wait for the office hours. Contact us any time; we go after the “Follow-the-sun” methodology.",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 4h12a2 2 0 012 2v7a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z" />
        <path
          d="M18 9h1a2 2 0 012 2v8l-3-3h-4a2 2 0 01-1.8-1.1A3.5 3.5 0 0018 13V9z"
          opacity="0.8"
        />
      </svg>
    ),
  },
  {
    id: "affordability",
    title: "Affordability",
    description:
      "Do not worry about money to get quality services. We are the providers of quality services within your range.",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2a4 4 0 00-4 4v1H6a2 2 0 00-2 2v10a3 3 0 003 3h10a3 3 0 003-3V9a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 5V6a2 2 0 114 0v1h-4zm2 5a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
  },
  {
    id: "advance-technology",
    title: "Advance Technology",
    description:
      "Unlock the future technology with AEC Network. Our services are available through advanced interactive classrooms and digital tools.",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" opacity="0.6" />
        <path d="M7 14h10a2 2 0 012 2v4H5v-4a2 2 0 012-2zm-3 7h16a1 1 0 110 2H4a1 1 0 110-2z" />
      </svg>
    ),
  },
  {
    id: "trained-teachers",
    title: "Trained Teachers",
    description:
      "We believe in building career paths for our employees and students through professional training and mentorship sessions.",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM5 19c0-3.3 3.1-6 7-6s7 2.7 7 6v1H5v-1zm7-4.5l1.5 3h-3l1.5-3z" />
      </svg>
    ),
  },
  {
    id: "interactive-classes",
    title: "Interactive classes",
    description:
      "You are our priority. We aim to satisfy your needs and demands through our most experienced and trained teams.",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
];

export default function WhatSetsUsApartSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 text-white">
      {/* Background Image with Dark Tinted Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/images/what-sets-us-apart-bg.jpg')" }}
      />
      {/* Dark moody overlay to ensure crisp readability */}
      <div className="absolute inset-0 bg-slate-950/75 sm:bg-slate-950/70 backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-white/80 uppercase mb-2">
            Why Choose Us
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.14em] text-white uppercase drop-shadow-md">
            What Sets Us Apart
          </h2>
          <div className="mt-3 mx-auto w-12 h-[2px] bg-sky-400/60" />
        </div>

        {/* 3x2 Features Grid with Crisp Grid Cell Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/15 rounded-2xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm">
          {FEATURES.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/65 p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:bg-slate-900/70 group"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:text-sky-300 transition-transform">
                <item.icon className="w-9 h-9" />
              </div>
              <h3 className="mt-3 text-sm sm:text-[15px] font-bold text-white tracking-wide">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-white/80 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
