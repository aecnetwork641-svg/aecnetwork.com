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
    sm:  { w: 110, h: 70  },
    md:  { w: 160, h: 102 },
    lg:  { w: 220, h: 140 },
    xl:  { w: 300, h: 191 },
    xxl: { w: 400, h: 255 }
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
          maxHeight: variant === "compact" ? "56px" : undefined,
          width: "auto"
        }}
      />
    </div>
  );
}
