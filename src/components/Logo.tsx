"use client";

import React from "react";

interface LogoProps {
  /**
   * 'full': Icon + "AEC NETWORK" + "A Project by AEC Network"
   * 'compact': Icon + "AEC NETWORK"
   * 'icon-only': Just the animated Book emblem
   */
  variant?: "full" | "compact" | "icon-only";
  /**
   * 'light': Dark text for white/light backgrounds (default)
   * 'dark': White & gold text for navy/dark backgrounds (e.g. Footer)
   */
  theme?: "light" | "dark";
  /**
   * Preset sizes or custom styling
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

  // Sizing definitions
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20"
  };

  const titleSizes = {
    sm: "text-base tracking-wider",
    md: "text-lg tracking-wider",
    lg: "text-2xl tracking-widest",
    xl: "text-3xl tracking-widest"
  };

  const taglineSizes = {
    sm: "text-[9px] tracking-wider",
    md: "text-[10px] tracking-widest",
    lg: "text-xs tracking-widest",
    xl: "text-sm tracking-widest"
  };

  const animPrefix = animated ? "" : "paused";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className} ${animPrefix}`}>
      {/* SVG Icon Emblem */}
      <div className={`shrink-0 ${iconSizes[size]} relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 200 180"
          className="w-full h-full overflow-visible drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3D17C" />
              <stop offset="60%" stopColor="#C9A24B" />
              <stop offset="100%" stopColor="#9B7524" />
            </linearGradient>

            <linearGradient id="logoNavy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#2B6CB0" : "#1E446E"} />
              <stop offset="100%" stopColor={isDark ? "#1A365D" : "#0F2A47"} />
            </linearGradient>

            <filter id="beaconGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {animated && (
              <style>{`
                @keyframes logoFloat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-3px); }
                }
                @keyframes pageLift1 {
                  0%, 100% { transform: scale(1) translateY(0px); }
                  50% { transform: scale(1.025) translateY(-3px); }
                }
                @keyframes pageLift2 {
                  0%, 100% { transform: scale(1) translateY(0px); }
                  50% { transform: scale(1.04) translateY(-5px); }
                }
                @keyframes beaconGlowPulse {
                  0%, 100% { transform: scale(1); opacity: 0.85; }
                  50% { transform: scale(1.35); opacity: 1; }
                }
                .logo-floating-book {
                  animation: logoFloat 4.2s ease-in-out infinite;
                  transform-origin: center bottom;
                }
                .logo-page-back {
                  animation: pageLift1 3.8s ease-in-out infinite;
                  transform-origin: center bottom;
                }
                .logo-page-mid {
                  animation: pageLift2 3.2s ease-in-out infinite 0.2s;
                  transform-origin: center bottom;
                }
                .logo-beacon-anim {
                  animation: beaconGlowPulse 2.2s ease-in-out infinite;
                  transform-origin: 100px 18px;
                }
              `}</style>
            )}
          </defs>

          <g className={animated ? "logo-floating-book" : ""}>
            {/* Book Spine */}
            <path
              d="M35,145 Q100,132 165,145 L160,154 Q100,141 40,154 Z"
              fill={isDark ? "#FAF7F0" : "#0F2A47"}
              opacity={isDark ? "0.9" : "1"}
            />

            {/* Back Pages (Navy) */}
            <path
              className={animated ? "logo-page-back" : ""}
              d="M100,135 C68,124 32,124 14,136 C23,109 45,78 82,51 C91,44 100,40 100,40 C100,40 109,44 118,51 C155,78 177,109 186,136 C168,124 132,124 100,135 Z"
              fill="url(#logoNavy)"
            />

            {/* Mid Tier Pages (Gold Rising Up) */}
            <path
              className={animated ? "logo-page-mid" : ""}
              d="M100,130 C75,118 46,118 31,127 C38,104 59,77 86,52 C93,46 100,41 100,41 C100,41 107,46 114,52 C141,77 162,104 169,127 C154,118 125,118 100,130 Z"
              fill="url(#logoGold)"
            />

            {/* Top Tier Inner Page */}
            <path
              d="M100,126 C82,113 62,113 50,120 C56,100 72,79 91,59 C96,54 100,50 100,50 C100,50 104,54 109,59 C128,79 144,100 150,120 C138,113 118,113 100,126 Z"
              fill={isDark ? "#102A45" : "#0F2A47"}
            />

            {/* Center Spire (Gold) */}
            <path
              d="M100,22 C97,40 97,63 100,120 C103,63 103,40 100,22 Z"
              fill="url(#logoGold)"
            />

            {/* Glowing Beacon */}
            <circle
              className={animated ? "logo-beacon-anim" : ""}
              cx="100"
              cy="18"
              r="4.5"
              fill="#F3D17C"
              filter="url(#beaconGlow)"
            />
          </g>
        </svg>
      </div>

      {/* Typography */}
      {variant !== "icon-only" && (
        <div className="flex flex-col justify-center leading-none">
          <div
            className={`font-display font-extrabold tracking-tight flex items-center gap-1.5 ${titleSizes[size]} ${
              isDark ? "text-white" : "text-aec-navy"
            }`}
          >
            <span>AEC</span>
            <span className="text-aec-gold font-black">NETWORK</span>
          </div>

          {variant === "full" && (
            <span
              className={`mt-1 font-semibold uppercase tracking-wider ${taglineSizes[size]} ${
                isDark ? "text-slate-300" : "text-aec-navy/70"
              }`}
            >
              A Project by <span className="text-aec-gold font-bold">AEC Network</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
