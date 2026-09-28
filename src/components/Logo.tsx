"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "full" | "compact" | "icon-only";
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
}

export default function Logo({
  variant = "full",
  theme = "light",
  size = "md",
  className = ""
}: LogoProps) {
  // SVG viewBox is 224.88 x 153 (approx 1.47:1)
  const dimensions = {
    sm:  { w: 100, h: 68  },
    md:  { w: 160, h: 109 },
    lg:  { w: 220, h: 150 },
    xl:  { w: 300, h: 204 },
    xxl: { w: 400, h: 272 }
  };

  const d = dimensions[size] || dimensions.md;
  const isDark = theme === "dark";

  return (
    <div
      className={`inline-flex items-center select-none ${
        isDark ? "bg-white rounded-xl p-1 shadow-sm" : ""
      } ${className}`}
    >
      <Image
        src="/images/aec-logo.svg"
        alt="AEC Network"
        width={d.w}
        height={d.h}
        priority
        unoptimized
        className={`transition-transform duration-300 hover:scale-105 ${
          isDark ? "rounded-lg" : ""
        }`}
        style={{
          objectFit: "contain",
          maxHeight: variant === "compact" ? "64px" : undefined,
          width: "auto"
        }}
      />
    </div>
  );
}
