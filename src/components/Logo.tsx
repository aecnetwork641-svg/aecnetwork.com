"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  /**
   * 'full': Complete Logo with Text & Subtitle
   * 'compact': Logo + AEC NETWORK branding
   * 'icon-only': Just the antique book stack emblem
   */
  variant?: "full" | "compact" | "icon-only";
  /**
   * 'light': Default for white/light backgrounds
   * 'dark': For dark backgrounds like the Footer
   */
  theme?: "light" | "dark";
  /**
   * Preset sizes: sm (navbar), md (cards/headers), lg (auth/hero), xl
   */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
}

export default function Logo({
  variant = "compact",
  theme = "light",
  size = "md",
  className = "",
  animated = true
}: LogoProps) {
  const isDark = theme === "dark";

  // Dimensions for the vintage logo image
  const dimensions = {
    sm: { width: 38, height: 38, textClass: "text-base", subClass: "text-[10px]" },
    md: { width: 50, height: 50, textClass: "text-lg", subClass: "text-xs" },
    lg: { width: 80, height: 80, textClass: "text-2xl", subClass: "text-sm" },
    xl: { width: 120, height: 120, textClass: "text-3xl", subClass: "text-base" }
  };

  const currentDim = dimensions[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Vintage Books & Scroll Emblem */}
      <div
        className={`relative shrink-0 flex items-center justify-center transition-transform duration-300 ${
          animated ? "hover:scale-105" : ""
        }`}
        style={{ width: currentDim.width, height: currentDim.height }}
      >
        <Image
          src="/images/aec-vintage-logo.png"
          alt="AEC Network Official Logo"
          width={currentDim.width}
          height={currentDim.height}
          priority
          className="object-contain w-full h-full drop-shadow-sm"
        />
      </div>

      {/* Typography Branding */}
      {variant !== "icon-only" && (
        <div className="flex flex-col justify-center leading-tight">
          <div
            className={`font-display font-extrabold tracking-tight flex items-center gap-1.5 ${currentDim.textClass} ${
              isDark ? "text-white" : "text-aec-navy"
            }`}
          >
            <span>AEC</span>
            <span className="text-aec-gold font-black">NETWORK</span>
          </div>

          {variant === "full" ? (
            <span
              className={`mt-0.5 font-medium ${currentDim.subClass} ${
                isDark ? "text-slate-300" : "text-aec-navy/70"
              }`}
            >
              Islamic & Professional Education Institute
            </span>
          ) : (
            <span
              className={`font-semibold uppercase tracking-wider text-[10px] ${
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
