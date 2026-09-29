"use client";

import AECNetworkLogo from "@/components/AECNetworkLogo";

interface LogoProps {
  variant?: "full" | "compact" | "icon-only";
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Logo({
  variant = "compact",
  theme = "light",
  size = "md",
  className = "",
}: LogoProps) {
  const widths = { sm: 120, md: 180, lg: 260, xl: 340 };
  const w = widths[size];

  const isIconOnly = variant === "icon-only";
  const isHorizontal = variant === "compact";
  const showTagline = variant === "full";

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <AECNetworkLogo
        theme={theme}
        iconOnly={isIconOnly}
        horizontal={isHorizontal}
        showTagline={showTagline}
        variant="b"
        width={w}
      />
    </div>
  );
}
