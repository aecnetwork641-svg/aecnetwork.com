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
  // SVG viewBox is 86 x 55 (~1.56:1 ratio)
  const dimensions = {
    sm:  { w: 130, h: 83  },
    md:  { w: 190, h: 122 },
    lg:  { w: 260, h: 166 },
    xl:  { w: 340, h: 217 },
    xxl: { w: 440, h: 281 }
  };

  const d = dimensions[size] || dimensions.md;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/images/aec-logo.svg"
        alt="AEC Network"
        width={d.w}
        height={d.h}
        priority
        unoptimized
        className="transition-transform duration-300 hover:scale-105"
        style={{
          objectFit: "contain",
          maxHeight: variant === "compact" ? "68px" : undefined,
          width: "auto",
          filter: "contrast(1.12) saturate(1.1) drop-shadow(0 1px 2px rgba(0,0,0,0.12))"
        }}
      />
    </div>
  );
}
