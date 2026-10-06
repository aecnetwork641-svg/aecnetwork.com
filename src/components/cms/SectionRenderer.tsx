"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import MentorCountsSection from "@/components/MentorCountsSection";
import MentorAboutSection from "@/components/MentorAboutSection";
import PopularCoursesSection from "@/components/PopularCoursesSection";
import OneToOneShowcaseSection from "@/components/OneToOneShowcaseSection";
import PricingSection from "@/components/PricingSection";
import WhatSetsUsApartSection from "@/components/WhatSetsUsApartSection";
import ScholarTeamSection from "@/components/ScholarTeamSection";
import { SectionConfig } from "@/lib/cms-types";

export interface SectionRendererProps {
  section: SectionConfig;
  isEditor?: boolean;
}

export default function SectionRenderer({ section, isEditor = false }: SectionRendererProps) {
  if (!section.isVisible && !isEditor) {
    return null;
  }

  const { type, data = {}, design = {} } = section;

  // Custom inline styles from section design
  const style: React.CSSProperties = {
    backgroundColor: design.bgColor || undefined,
    backgroundImage: design.bgGradient || (design.bgImage ? `url(${design.bgImage})` : undefined),
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: design.textColor || undefined,
    textAlign: design.textAlign as any || undefined,
  };

  const paddingClass = `${design.paddingTop || "py-12"} ${design.paddingBottom || ""}`.trim();

  // Render based on section type
  switch (type) {
    // 1. HERO SLIDER
    case "hero-slider":
      return (
        <div style={style} className={paddingClass}>
          <HeroSlider />
        </div>
      );

    // 2. HERO SPLIT / FULLSCREEN / VIDEO / CTA HERO
    case "hero-split":
    case "hero-fullscreen":
    case "hero-video":
      return (
        <section
          style={style}
          className={`relative overflow-hidden ${paddingClass} ${
            type === "hero-fullscreen" ? "min-h-[85vh] flex items-center" : ""
          }`}
        >
          {design.bgOverlay && (
            <div
              className="absolute inset-0 bg-black pointer-events-none"
              style={{ opacity: (design.bgOverlayOpacity ?? 50) / 100 }}
            />
          )}
          <div className="container-aec relative z-10">
            <div className={`grid gap-8 items-center ${type === "hero-split" ? "lg:grid-cols-2" : "max-w-4xl mx-auto text-center"}`}>
              <div>
                {data.badge && (
                  <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-wider bg-aec-teal/15 text-aec-teal">
                    {data.badge}
                  </span>
                )}
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  {data.heading || "Empowering Minds, Shaping Futures"}
                </h1>
                {data.subheading && (
                  <p className="mt-4 text-base sm:text-lg opacity-80 leading-relaxed max-w-2xl">
                    {data.subheading}
                  </p>
                )}
                <div className={`mt-8 flex flex-wrap gap-4 ${type === "hero-fullscreen" ? "justify-center" : ""}`}>
                  {data.primaryBtn && (
                    <Link
                      href={data.primaryBtn.href || "/admissions/apply"}
                      className="px-6 py-3 rounded-xl bg-aec-teal text-white font-bold hover:bg-aec-teal/90 shadow-md transition"
                    >
                      {data.primaryBtn.label || "Get Started"}
                    </Link>
                  )}
                  {data.secondaryBtn && (
                    <Link
                      href={data.secondaryBtn.href || "/courses"}
                      className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-bold hover:bg-white/20 transition"
                    >
                      {data.secondaryBtn.label || "Explore Courses"}
                    </Link>
                  )}
                </div>
              </div>

              {type === "hero-split" && data.imageUrl && (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src={data.imageUrl}
                    alt={data.heading || "Hero Image"}
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                </div>
              )}

              {type === "hero-video" && data.videoUrl && (
                <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-3xl mx-auto">
                  <video
                    src={data.videoUrl}
                    controls
                    className="w-full h-auto rounded-2xl"
                    poster={data.posterUrl}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      );

    // 3. MENTOR COUNTS
    case "mentor-counts":
      return (
        <div style={style} className={paddingClass}>
          <MentorCountsSection />
        </div>
      );

    // 4. MENTOR ABOUT
    case "mentor-about":
      return (
        <div style={style} className={paddingClass}>
          <MentorAboutSection />
        </div>
      );

    // 5. POPULAR COURSES
    case "popular-courses":
      return (
        <div style={style} className={paddingClass}>
          <PopularCoursesSection />
        </div>
      );

    // 6. ONE-TO-ONE SHOWCASE
    case "one-to-one":
      return (
        <div style={style} className={paddingClass}>
          <OneToOneShowcaseSection />
        </div>
      );

    // 7. PRICING SECTION
    case "pricing":
      return (
        <div style={style} className={paddingClass}>
          <PricingSection />
        </div>
      );

    // 8. WHAT SETS US APART
    case "what-sets-us-apart":
      return (
        <div style={style} className={paddingClass}>
          <WhatSetsUsApartSection />
        </div>
      );

    // 9. SCHOLAR TEAM
    case "scholar-team":
      return (
        <div style={style} className={paddingClass}>
          <ScholarTeamSection />
        </div>
      );

    // 10. FAQS ACCORDION
    case "faqs": {
      const items = (data.items as Array<{ q: string; a: string }>) || [];
      return (
        <section style={style} className={`container-aec max-w-3xl ${paddingClass}`}>
          <div className="text-center">
            {data.badge && (
              <h2 className="font-display text-[11px] font-bold uppercase tracking-wider text-aec-teal">
                {data.badge}
              </h2>
            )}
            <p className="mt-1 font-display text-lg sm:text-xl lg:text-2xl font-bold text-aec-navy">
              {data.title || "Frequently Asked Questions"}
            </p>
          </div>
          <div className="mt-6 space-y-3">
            {items.map((faq, idx) => (
              <details
                key={idx}
                className="rounded-xl border border-aec-navy/10 bg-white p-4 sm:p-4.5 shadow-sm hover:shadow transition group cursor-pointer"
              >
                <summary className="font-display text-xs sm:text-sm font-semibold text-aec-navy flex items-center justify-between list-none gap-2">
                  <span>{faq.q}</span>
                  <span className="text-[10px] text-aec-teal group-open:rotate-180 transition-transform shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-2.5 text-xs text-aec-navy/70 leading-relaxed border-t border-aec-navy/5 pt-2.5">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      );
    }

    // 11. CTA BANNER
    case "cta-banner":
      return (
        <section style={style} className={`relative overflow-hidden ${paddingClass}`}>
          <div className="container-aec relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {data.heading || "Ready to Accelerate Your Learning?"}
            </h2>
            {data.subheading && (
              <p className="mt-4 text-sm sm:text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
                {data.subheading}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {data.primaryBtn && (
                <Link
                  href={data.primaryBtn.href || "/admissions/free-trial"}
                  className="px-6 py-3 rounded-xl bg-aec-teal text-white font-bold hover:bg-aec-teal/90 shadow-md transition"
                >
                  {data.primaryBtn.label || "Book Free Trial"}
                </Link>
              )}
              {data.secondaryBtn && (
                <Link
                  href={data.secondaryBtn.href || "/courses"}
                  className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-bold hover:bg-white/20 transition"
                >
                  {data.secondaryBtn.label || "View Courses"}
                </Link>
              )}
            </div>
          </div>
        </section>
      );

    // 12. RICH TEXT
    case "rich-text":
      return (
        <section style={style} className={`container-aec max-w-4xl ${paddingClass}`}>
          {data.title && (
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-aec-navy mb-2">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-sm font-semibold text-aec-teal mb-6 uppercase tracking-wider">
              {data.subtitle}
            </p>
          )}
          <div
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
            dangerouslySetInnerHTML={{ __html: data.contentHtml || "" }}
          />
        </section>
      );

    // 13. IMAGE GALLERY
    case "image-gallery": {
      const images = (data.images as Array<{ url: string; title?: string }>) || [];
      return (
        <section style={style} className={`container-aec ${paddingClass}`}>
          <div className="text-center mb-8">
            {data.badge && (
              <span className="text-xs font-bold uppercase tracking-wider text-aec-teal">{data.badge}</span>
            )}
            <h2 className="text-2xl font-bold text-aec-navy mt-1">{data.title || "Gallery"}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-sm border border-slate-200">
                <img
                  src={img.url}
                  alt={img.title || `Gallery ${i}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {img.title && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-xs font-semibold">
                    {img.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    }

    // 14. TESTIMONIALS
    case "testimonials": {
      const items = (data.testimonials as Array<{ quote: string; author: string; role: string; rating?: number }>) || [];
      return (
        <section style={style} className={`container-aec ${paddingClass}`}>
          <div className="text-center mb-10 max-w-2xl mx-auto">
            {data.badge && <span className="text-xs font-bold uppercase tracking-wider text-aec-teal">{data.badge}</span>}
            <h2 className="text-2xl sm:text-3xl font-bold text-aec-navy mt-1">{data.title || "What Families Say"}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((t, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-3 text-sm">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-aec-navy">{t.author}</p>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // 15. NEWSLETTER
    case "newsletter":
      return (
        <section style={style} className={`container-aec max-w-4xl ${paddingClass}`}>
          <div className="rounded-3xl bg-aec-navy text-white p-8 sm:p-12 text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold">{data.title || "Stay Informed with AEC Network"}</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">{data.description || "Get class updates and resources."}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={data.placeholder || "Enter your email"}
                className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-aec-teal"
              />
              <button className="rounded-xl bg-aec-teal px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-aec-teal/90 transition shadow-sm">
                {data.buttonLabel || "Subscribe"}
              </button>
            </div>
          </div>
        </section>
      );

    // 16. CONTACT BOX
    case "contact-box":
      return (
        <section style={style} className={`container-aec max-w-4xl ${paddingClass}`}>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm grid md:grid-cols-2 gap-8 items-center">
            <div>
              {data.badge && <span className="text-xs font-bold uppercase tracking-wider text-aec-teal">{data.badge}</span>}
              <h2 className="text-2xl font-bold text-aec-navy mt-1">{data.title || "Contact Us"}</h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">{data.description}</p>
              <div className="mt-6 space-y-2 text-xs sm:text-sm text-slate-700">
                {data.email && <p><strong>Email:</strong> {data.email}</p>}
                {data.phone && <p><strong>Phone:</strong> {data.phone}</p>}
                {data.address && <p><strong>Campus:</strong> {data.address}</p>}
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <input type="text" placeholder="Your Name" className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-white" />
              <input type="email" placeholder="Your Email" className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-white" />
              <textarea placeholder="Your Message" rows={3} className="w-full text-xs rounded-xl border border-slate-200 p-3 bg-white" />
              <button className="w-full py-3 rounded-xl bg-aec-navy text-white text-xs font-bold hover:bg-aec-navy/90 transition">
                {data.buttonLabel || "Send Inquiry"}
              </button>
            </div>
          </div>
        </section>
      );

    // 17. CUSTOM SECTION BUILDER (Rows & Columns)
    case "custom": {
      const rows = (data.rows as Array<{ id: string; columns: Array<{ id: string; width: string; elements: any[] }> }>) || [];
      return (
        <section style={style} className={`container-aec ${paddingClass}`}>
          {(data.badge || data.title) && (
            <div className="text-center mb-8">
              {data.badge && (
                <span className="text-xs font-bold uppercase tracking-wider text-aec-teal">{data.badge}</span>
              )}
              {data.title && (
                <h2 className="text-2xl sm:text-3xl font-bold text-aec-navy mt-1">{data.title}</h2>
              )}
              {data.subtitle && (
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">{data.subtitle}</p>
              )}
            </div>
          )}

          <div className="space-y-8">
            {rows.map((row) => (
              <div key={row.id} className="grid grid-cols-12 gap-6 items-center">
                {row.columns.map((col) => (
                  <div key={col.id} className={col.width || "col-span-12"}>
                    <div className="space-y-4">
                      {col.elements?.map((el, elIdx) => {
                        if (el.type === "heading") {
                          const Tag = (`h${el.level || 2}`) as keyof JSX.IntrinsicElements;
                          return (
                            <Tag key={el.id || elIdx} className="font-display font-bold text-aec-navy" style={el.style}>
                              {el.content}
                            </Tag>
                          );
                        }
                        if (el.type === "paragraph") {
                          return (
                            <p key={el.id || elIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed" style={el.style}>
                              {el.content}
                            </p>
                          );
                        }
                        if (el.type === "image" && el.url) {
                          return (
                            <div key={el.id || elIdx} className="rounded-2xl overflow-hidden shadow-sm">
                              <img src={el.url} alt={el.alt || "Custom Image"} className="w-full h-auto object-cover" />
                            </div>
                          );
                        }
                        if (el.type === "video" && el.url) {
                          return (
                            <div key={el.id || elIdx} className="rounded-2xl overflow-hidden shadow-sm">
                              <video src={el.url} controls className="w-full h-auto" />
                            </div>
                          );
                        }
                        if (el.type === "button") {
                          return (
                            <div key={el.id || elIdx} className="flex flex-wrap gap-3">
                              {el.buttons?.map((btn: any, bIdx: number) => (
                                <Link
                                  key={bIdx}
                                  href={btn.href || "#"}
                                  className="px-5 py-2.5 rounded-xl bg-aec-teal text-white text-xs font-bold shadow-sm hover:bg-aec-teal/90 transition"
                                >
                                  {btn.label}
                                </Link>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      );
    }

    default:
      return (
        <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl m-4">
          <p className="text-xs font-bold uppercase text-slate-400">Section Type: {type}</p>
          <p className="text-sm font-semibold text-slate-700">{section.name}</p>
        </div>
      );
  }
}
