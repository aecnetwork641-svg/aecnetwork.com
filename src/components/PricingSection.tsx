"use client";

import { useState } from "react";
import Link from "next/link";

type CurrencyKey = "GBP" | "USD" | "AUD" | "CAD";

interface PlanItem {
  id: string;
  name: string;
  tagline: string;
  classesPerWeek: string;
  monthlyClasses: string;
  duration: string;
  popular?: boolean;
  prices: Record<CurrencyKey, string>;
  features: string[];
}

const CURRENCIES: { key: CurrencyKey; label: string; symbol: string; flag: string }[] = [
  { key: "GBP", label: "United Kingdom", symbol: "£", flag: "🇬🇧" },
  { key: "USD", label: "United States", symbol: "$", flag: "🇺🇸" },
  { key: "AUD", label: "Australia", symbol: "A$", flag: "🇦🇺" },
  { key: "CAD", label: "Canada", symbol: "C$", flag: "🇨🇦" }
];

const STANDARD_PLANS: PlanItem[] = [
  {
    id: "5-days",
    name: "5 Classes / Week",
    tagline: "Intensive Daily Learning",
    classesPerWeek: "5 Days / Week",
    monthlyClasses: "20–22 Classes / Month",
    duration: "30–45 Mins / Session",
    popular: true,
    prices: {
      GBP: "£30",
      USD: "$40",
      AUD: "A$60",
      CAD: "C$55"
    },
    features: [
      "1-on-1 Dedicated Qualified Instructor",
      "5 Days a Week (Mon – Fri)",
      "Structured Tajweed & Academic Curriculum",
      "Weekly Progress & Attendance Tracking",
      "Recorded Class Notes & Study Materials",
      "Verifiable Course Completion Certificate",
      "Free 3-Day Trial (No Upfront Payment)"
    ]
  },
  {
    id: "4-days",
    name: "4 Classes / Week",
    tagline: "Balanced Pacing",
    classesPerWeek: "4 Days / Week",
    monthlyClasses: "16–18 Classes / Month",
    duration: "30–45 Mins / Session",
    prices: {
      GBP: "£25",
      USD: "$35",
      AUD: "A$50",
      CAD: "C$45"
    },
    features: [
      "1-on-1 Personal Instructor Guidance",
      "4 Flexible Days (Your Chosen Schedule)",
      "Comprehensive Syllabus & Quran Studies",
      "Monthly Assessment & Progress Reports",
      "Digital Worksheets & Learning Resources",
      "Free 3-Day Trial Included"
    ]
  },
  {
    id: "3-days",
    name: "3 Classes / Week",
    tagline: "Flexible Regular Plan",
    classesPerWeek: "3 Days / Week",
    monthlyClasses: "12–14 Classes / Month",
    duration: "30–45 Mins / Session",
    prices: {
      GBP: "£25",
      USD: "$35",
      AUD: "A$50",
      CAD: "C$45"
    },
    features: [
      "1-on-1 Live Interactive Tutoring",
      "3 Days / Week (Alternate or Custom Days)",
      "Ideal for School-Going Students",
      "Regular Homework Check & Revision",
      "Parent Portal Real-Time Progress View",
      "Free 3-Day Trial Included"
    ]
  },
  {
    id: "2-days",
    name: "2 Classes / Week",
    tagline: "Weekend / Starter Plan",
    classesPerWeek: "2 Days / Week",
    monthlyClasses: "8–10 Classes / Month",
    duration: "30–45 Mins / Session",
    prices: {
      GBP: "£20",
      USD: "$25",
      AUD: "A$40",
      CAD: "C$35"
    },
    features: [
      "1-on-1 Live Dedicated Tutor",
      "Weekend (Sat & Sun) or Weekday Slots",
      "Step-by-Step Individual Guidance",
      "Monthly Evaluation Reports",
      "Parent Dashboard Access",
      "Free 3-Day Trial Included"
    ]
  }
];

const ACADEMIC_SUBJECT_RATES: {
  plan: string;
  days: string;
  classes: string;
  prices: Record<CurrencyKey, string>;
}[] = [
  {
    plan: "Academic / STEM / GCSE (5 Days)",
    days: "5 Days / Week",
    classes: "20–22 Classes/mo",
    prices: { AUD: "A$120", GBP: "£65", CAD: "C$120", USD: "$85" }
  },
  {
    plan: "Academic / STEM / GCSE (3 Days)",
    days: "3 Days / Week",
    classes: "12–14 Classes/mo",
    prices: { AUD: "A$80", GBP: "£45", CAD: "C$80", USD: "$55" }
  },
  {
    plan: "Academic / STEM / GCSE (2 Days)",
    days: "2 Days / Week",
    classes: "8–10 Classes/mo",
    prices: { AUD: "A$60", GBP: "£35", CAD: "C$60", USD: "$45" }
  }
];

export default function PricingSection({ isStandalonePage = false }: { isStandalonePage?: boolean }) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyKey>("GBP");
  const [activeCategory, setActiveCategory] = useState<"quran" | "academic">("quran");

  const currentCurrencyObj = CURRENCIES.find((c) => c.key === selectedCurrency) || CURRENCIES[0];

  return (
    <section id="pricing" className={isStandalonePage ? "py-4" : "container-aec"}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge bg-aec-teal/10 text-aec-teal border-aec-teal/30 text-[11px] font-semibold px-2.5 py-0.5">
          Affordable & Transparent Pricing
        </span>
        <h2 className="mt-2.5 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-aec-navy">
          Fee Structure & Monthly Packages
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-aec-navy/70 leading-relaxed">
          High-quality online education tailored to your schedule. Select your country currency below to view our affordable monthly rates. Every plan comes with a <span className="font-semibold text-aec-navy">100% Free 3-Day Trial</span> with no credit card required.
        </p>

        {/* Currency Selector Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-aec-cream rounded-2xl border border-aec-navy/10 inline-flex">
          {CURRENCIES.map((c) => {
            const isActive = selectedCurrency === c.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCurrency(c.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-aec-navy text-white shadow-sm"
                    : "text-aec-navy/70 hover:text-aec-navy hover:bg-white/60"
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.label}</span>
                <span className="opacity-80">({c.symbol})</span>
              </button>
            );
          })}
        </div>

        {/* Program Category Toggle */}
        <div className="mt-3.5 flex justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveCategory("quran")}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all border ${
              activeCategory === "quran"
                ? "bg-aec-teal text-white border-aec-teal shadow-sm"
                : "bg-white text-aec-navy/70 border-aec-navy/15 hover:bg-aec-cream"
            }`}
          >
            📖 Quran, Tajweed & Islamic Studies
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("academic")}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all border ${
              activeCategory === "academic"
                ? "bg-aec-teal text-white border-aec-teal shadow-sm"
                : "bg-white text-aec-navy/70 border-aec-navy/15 hover:bg-aec-cream"
            }`}
          >
            🎓 Academic Tutoring, STEM & GCSE
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      {activeCategory === "quran" ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STANDARD_PLANS.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "bg-white border-2 border-aec-teal shadow-xl ring-2 ring-aec-teal/20 scale-[1.01] sm:-translate-y-1 z-10"
                    : "bg-white border border-aec-navy/10 shadow-sm hover:shadow-md hover:border-aec-navy/20"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-aec-teal to-aec-navy text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-aec-navy">{plan.name}</h3>
                      <p className="text-[11px] text-aec-navy/60 mt-0.5">{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-4 pb-4 border-b border-aec-navy/10">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-aec-navy tracking-tight">
                        {plan.prices[selectedCurrency]}
                      </span>
                      <span className="text-[11px] font-medium text-aec-navy/60">/ month</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1 text-[10px] text-aec-navy/70">
                      <span className="bg-aec-cream px-1.5 py-0.5 rounded font-medium">{plan.monthlyClasses}</span>
                      <span className="bg-aec-cream px-1.5 py-0.5 rounded font-medium">{plan.duration}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mt-4 space-y-2 text-[11px] text-aec-navy/80">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-aec-teal font-bold shrink-0">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-3.5 border-t border-aec-navy/10">
                  <Link
                    href={`/admissions/free-trial?plan=${encodeURIComponent(plan.name)}&currency=${selectedCurrency}`}
                    className={`w-full text-center py-2 px-3 rounded-xl text-xs font-semibold transition-all block ${
                      isPopular
                        ? "bg-aec-teal text-white hover:bg-aec-navy shadow-sm"
                        : "bg-aec-navy/5 text-aec-navy hover:bg-aec-navy hover:text-white"
                    }`}
                  >
                    Book 3-Day Free Trial
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Academic Tutoring Pricing View */
        <div className="mt-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {ACADEMIC_SUBJECT_RATES.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-aec-navy/15 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="badge bg-aec-gold/15 text-aec-navy border-aec-gold/30 text-[11px] font-semibold px-2 py-0.5">
                    {item.days}
                  </span>
                  <h3 className="mt-2.5 font-display text-base font-bold text-aec-navy">{item.plan}</h3>
                  <p className="text-[11px] text-aec-navy/60 mt-0.5">{item.classes}</p>

                  <div className="mt-4 pb-4 border-b border-aec-navy/10">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-aec-navy">
                        {item.prices[selectedCurrency]}
                      </span>
                      <span className="text-[11px] font-medium text-aec-navy/60">/ month</span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-[11px] text-aec-navy/80">
                    <li className="flex items-center gap-1.5">
                      <span className="text-aec-teal font-bold shrink-0">✓</span>
                      <span>1-on-1 Customized Academic Tutoring</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-aec-teal font-bold shrink-0">✓</span>
                      <span>Mathematics, Physics, Chemistry, Biology & English</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-aec-teal font-bold shrink-0">✓</span>
                      <span>Past Paper Solving & Exam Grade Boosters</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-aec-teal font-bold shrink-0">✓</span>
                      <span>Weekly Homework & Topic Assessments</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-aec-teal font-bold shrink-0">✓</span>
                      <span>Free Diagnostic & Trial Session</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-3.5 border-t border-aec-navy/10">
                  <Link
                    href={`/admissions/free-trial?plan=${encodeURIComponent(item.plan)}&currency=${selectedCurrency}`}
                    className="w-full text-center py-2 px-3 rounded-xl text-xs font-semibold bg-aec-navy text-white hover:bg-slate-800 transition-all block"
                  >
                    Start Academic Trial
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Weekend Plan, Sibling Discount & Trust Badges Section with Educational Background */}
      <div className="relative mt-12 overflow-hidden rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl">
        {/* Background Image with Slow Zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('/images/pricing-bg.jpg')" }}
        />
        {/* Deep atmospheric overlay so educational background blends harmoniously with AEC Brand Colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A]/90 via-[#0a2347]/85 to-[#061426]/92 backdrop-blur-[1px]" />

        {/* Content Container */}
        <div className="relative z-10 space-y-8">
          {/* Special Weekend Plan & Sibling Discount Banner */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Weekend Special - Transparent Dark Glass with Hover Animation */}
            <div className="group rounded-2xl border border-white/20 bg-[#0B1F3A]/85 hover:bg-[#0B1F3A] backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-[#4DA3D9]/50 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="badge bg-[#4DA3D9]/25 text-sky-100 border border-[#4DA3D9]/40 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                    ⭐ Weekend Special
                  </span>
                  <span className="font-display text-lg sm:text-xl font-bold text-white drop-shadow-sm">
                    {selectedCurrency === "GBP" ? "£25" : selectedCurrency === "USD" ? "$35" : selectedCurrency === "AUD" ? "A$50" : "C$45"} / mo
                  </span>
                </div>
                <h4 className="mt-3 font-display text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-sky-300 transition-colors drop-shadow-sm">
                  Saturday & Sunday Weekend Cohort
                </h4>
                <p className="mt-1.5 text-xs text-blue-100/80 leading-relaxed font-normal">
                  Perfect for students busy with regular school on weekdays. Intensive 2 weekend sessions (Saturday & Sunday) covering Tajweed, Quran, or core revision.
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href={`/admissions/free-trial?plan=Weekend-Cohort&currency=${selectedCurrency}`}
                  className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-[#4DA3D9] hover:text-white transition-colors"
                >
                  <span>Enroll in Weekend Cohort</span>
                  <span className="transition-transform group-hover/link:translate-x-1.5 font-bold">→</span>
                </Link>
              </div>
            </div>

            {/* Sibling & Family Discount - Transparent Dark Glass with Hover Animation */}
            <div className="group rounded-2xl border border-white/20 bg-[#0B1F3A]/85 hover:bg-[#0B1F3A] backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-[#4DA3D9]/50 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="badge bg-[#4DA3D9]/25 text-sky-100 border border-[#4DA3D9]/40 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                    👨‍👩‍👧‍👦 Family Discount
                  </span>
                  <span className="font-display text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-full drop-shadow-sm shadow-sm">
                    10% – 15% OFF
                  </span>
                </div>
                <h4 className="mt-3 font-display text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-sky-300 transition-colors drop-shadow-sm">
                  Multiple Children / Family Packages
                </h4>
                <p className="mt-1.5 text-xs text-blue-100/80 leading-relaxed font-normal">
                  Enrolling 2 or more siblings? Enjoy special discounted monthly tuition rates across all our Quran and Academic courses with synchronized family schedules.
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href="/contact?subject=Family-Discount-Inquiry"
                  className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-[#4DA3D9] hover:text-white transition-colors"
                >
                  <span>Inquire for Family Discount</span>
                  <span className="transition-transform group-hover/link:translate-x-1.5 font-bold">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Badges & Accepted Payment Gateways - Transparent Dark Glass with Animation */}
          <div className="rounded-2xl border border-white/20 bg-[#0B1F3A]/80 backdrop-blur-xl p-6 sm:p-7 shadow-2xl">
            <div className="grid gap-6 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
              {/* Badge 1 */}
              <div className="group/badge flex items-start gap-3.5 pr-4 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#4DA3D9]/20 text-[#4DA3D9] flex items-center justify-center text-xl shrink-0 border border-[#4DA3D9]/30 backdrop-blur-sm group-hover/badge:scale-110 group-hover/badge:text-white group-hover/badge:bg-[#4DA3D9] transition-all duration-300 shadow-sm">
                  🎁
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white tracking-wide group-hover/badge:text-sky-300 transition-colors">100% Free 3-Day Trial</p>
                  <p className="mt-1 text-xs text-blue-100/80 leading-relaxed font-normal">
                    Take 3 full trial classes with a dedicated tutor before paying anything. No credit card required.
                  </p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="group/badge flex items-start gap-3.5 pt-6 md:pt-0 md:px-4 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#4DA3D9]/20 text-[#4DA3D9] flex items-center justify-center text-xl shrink-0 border border-[#4DA3D9]/30 backdrop-blur-sm group-hover/badge:scale-110 group-hover/badge:text-white group-hover/badge:bg-[#4DA3D9] transition-all duration-300 shadow-sm">
                  🛡️
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white tracking-wide group-hover/badge:text-sky-300 transition-colors">Money-Back Guarantee</p>
                  <p className="mt-1 text-xs text-blue-100/80 leading-relaxed font-normal">
                    If you are not satisfied with your instructor or progress within the first month, we offer a refund or tutor reassignment.
                  </p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="group/badge flex items-start gap-3.5 pt-6 md:pt-0 md:pl-4 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#4DA3D9]/20 text-[#4DA3D9] flex items-center justify-center text-xl shrink-0 border border-[#4DA3D9]/30 backdrop-blur-sm group-hover/badge:scale-110 group-hover/badge:text-white group-hover/badge:bg-[#4DA3D9] transition-all duration-300 shadow-sm">
                  💳
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white tracking-wide group-hover/badge:text-sky-300 transition-colors">Secure Global Payments</p>
                  <p className="mt-1 text-xs text-blue-100/80 leading-relaxed font-normal">
                    Bank Transfer, Wise, Western Union, MoneyGram, Ria, and Debit/Credit Cards accepted worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods Badges */}
            <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-100/80">
              <span className="font-semibold text-white tracking-wide">Accepted Global Payment Methods:</span>
              <div className="flex flex-wrap items-center gap-2 font-medium">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/15 text-white/90 text-[11px] font-medium transition-all duration-200 shadow-sm backdrop-blur-sm">Direct Bank Wire</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/15 text-white/90 text-[11px] font-medium transition-all duration-200 shadow-sm backdrop-blur-sm">Wise (TransferWise)</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/15 text-white/90 text-[11px] font-medium transition-all duration-200 shadow-sm backdrop-blur-sm">Western Union</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/15 text-white/90 text-[11px] font-medium transition-all duration-200 shadow-sm backdrop-blur-sm">MoneyGram</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/15 text-white/90 text-[11px] font-medium transition-all duration-200 shadow-sm backdrop-blur-sm">Ria Money</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/15 text-white/90 text-[11px] font-medium transition-all duration-200 shadow-sm backdrop-blur-sm">Credit / Debit Cards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
