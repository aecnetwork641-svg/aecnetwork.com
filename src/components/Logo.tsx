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
  theme = "light",
  className = ""
}: LogoProps) {
  const dimensions = {
    sm: { w: 56, h: 56 },
    md: { w: 72, h: 72 },
    lg: { w: 110, h: 110 },
    xl: { w: 160, h: 160 }
  };

  const d = dimensions[size];
  const isDark = theme === "dark";

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Video Logo — Large & Highlighted */}
      <div
        className="shrink-0 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105"
        style={{
          width: d.w,
          height: d.h,
          boxShadow: isDark
            ? "0 0 0 2.5px #C9A24B, 0 4px 24px rgba(201,162,75,0.35), 0 2px 8px rgba(0,0,0,0.5)"
            : "0 0 0 2.5px #C9A24B, 0 4px 20px rgba(15,42,71,0.18), 0 2px 8px rgba(201,162,75,0.2)"
        }}
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
