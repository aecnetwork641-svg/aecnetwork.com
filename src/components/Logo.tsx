"use client";

import React from "react";

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
  // 300x204 is the native video ratio → keep aspect ratio
  const dimensions = {
    sm:  { w: 90,  h: 61  },
    md:  { w: 150, h: 102 },
    lg:  { w: 210, h: 143 },
    xl:  { w: 270, h: 184 },
    xxl: { w: 300, h: 204 }
  };

  const d = dimensions[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Video Logo */}
      <video
        src="/images/logo-intro.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        width={d.w}
        height={d.h}
        className="transition-transform duration-300 hover:scale-105"
        style={{ display: "block", borderRadius: "8px" }}
      />
    </div>
  );
}
