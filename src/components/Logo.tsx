"use client";

import React from "react";

interface LogoProps {
  variant?: "full" | "compact" | "icon-only";
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Logo({
  size = "md",
  className = ""
}: LogoProps) {
  const dimensions = {
    sm: { w: 44, h: 44 },
    md: { w: 56, h: 56 },
    lg: { w: 88, h: 88 },
    xl: { w: 130, h: 130 }
  };

  const d = dimensions[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Video Logo Only — No Text */}
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
    </div>
  );
}
