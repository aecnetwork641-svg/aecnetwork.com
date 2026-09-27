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
  size = "md",
  className = ""
}: LogoProps) {
  // Original image ratio is ~740x460 (approx 1.6:1)
  const dimensions = {
    sm:  { w: 130, h: 80  },
    md:  { w: 200, h: 124 },
    lg:  { w: 280, h: 174 },
    xl:  { w: 360, h: 224 },
    xxl: { w: 460, h: 286 }
  };

  const d = dimensions[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/images/aec-logo.png"
        alt="AEC Network"
        width={d.w}
        height={d.h}
        priority
        className="transition-transform duration-300 hover:scale-105"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
