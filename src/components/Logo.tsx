"use client";

import React from "react";

interface LogoProps {
  /**
   * 'full': Video Logo + AEC NETWORK + Subtitle
   * 'compact': Video Logo + AEC NETWORK
   * 'icon-only': Just the video logo
   */
  variant?: "full" | "compact" | "icon-only";
  /**
   * 'light': For white/light backgrounds (default)
   * 'dark': For navy/dark backgrounds (e.g. Footer)
   */
  theme?: "light" | "dark";
  /**
   * Preset sizes
   */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Logo({
  variant = "compact",
  theme = "light",
  size = "md",
  className = ""
}: LogoProps) {
  const isDark = theme === "dark";

  const dimensions = {
    sm: { w: 40, h: 40, textClass: "text-base", subClass: "text-[9px]" },
    md: { w: 52, h: 52, textClass: "text-lg", subClass: "text-[10px]" },
    lg: { w: 80, h: 80, textClass: "text-2xl", subClass: "text-xs" },
    xl: { w: 120, h: 120, textClass: "text-3xl", subClass: "text-sm" }
  };

  const d = dimensions[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Video Logo Emblem */}
      <div
        className="shrink-0 overflow-hidden rounded-sm"
        style={{ width: d.w, height: d.h }}
      >
        <video
          src="/images/logo-intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* Typography */}
      {variant !== "icon-only" && (
        <div className="flex flex-col justify-center leading-tight">
          <div
            className={`font-display font-extrabold tracking-tight flex items-center gap-1 ${d.textClass} ${
              isDark ? "text-white" : "text-aec-navy"
            }`}
          >
            <span>AEC</span>
            <span className="text-aec-gold font-black">NETWORK</span>
          </div>

          {variant === "full" ? (
            <span
              className={`mt-0.5 font-medium leading-tight ${d.subClass} ${
                isDark ? "text-slate-300" : "text-aec-navy/65"
              }`}
            >
              Islamic & Professional Education
            </span>
          ) : (
            <span
              className={`font-semibold uppercase tracking-wider text-[9px] ${
                isDark ? "text-aec-gold/90" : "text-aec-teal"
              }`}
            >
              Online Institute
            </span>
          )}
        </div>
      )}
    </div>
  );
}
