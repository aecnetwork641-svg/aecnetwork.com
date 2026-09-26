"use client";

import React, { useState, useEffect } from "react";

interface AnimatedBookStackProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  autoReplay?: boolean;
  replayIntervalMs?: number;
}

export default function AnimatedBookStack({
  className = "",
  size = "md",
  autoReplay = false,
  replayIntervalMs = 12000,
}: AnimatedBookStackProps) {
  const [key, setKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoReplay) return;
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, replayIntervalMs);
    return () => clearInterval(interval);
  }, [autoReplay, replayIntervalMs]);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  const scaleClasses = {
    sm: "max-w-[340px] h-[340px]",
    md: "max-w-[460px] h-[460px]",
    lg: "max-w-[600px] h-[600px]",
  };

  return (
    <div
      className={`relative w-full ${scaleClasses[size]} mx-auto flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx>{`
        @keyframes flyInBottomBook {
          0% {
            opacity: 0;
            transform: translate3d(-380px, 320px, -200px) rotate(-35deg) scale(0.6);
          }
          70% {
            opacity: 1;
            transform: translate3d(8px, -6px, 10px) rotate(2deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes flyInMiddleBook {
          0% {
            opacity: 0;
            transform: translate3d(400px, 260px, -150px) rotate(32deg) scale(0.6);
          }
          70% {
            opacity: 1;
            transform: translate3d(-10px, -6px, 10px) rotate(-2.5deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes flyInTopBook {
          0% {
            opacity: 0;
            transform: translate3d(-350px, -320px, 100px) rotate(-28deg) scale(0.65);
          }
          70% {
            opacity: 1;
            transform: translate3d(6px, 8px, 0px) rotate(1.5deg) scale(1.03);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes floatInScroll {
          0% {
            opacity: 0;
            transform: translate3d(250px, -360px, 200px) rotate(48deg) scale(0.4);
          }
          65% {
            opacity: 1;
            transform: translate3d(-4px, 6px, 0px) rotate(-3deg) scale(1.04);
          }
          85% {
            transform: translate3d(2px, -3px, 0px) rotate(1deg) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes textRevealEngrave {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
            filter: blur(8px) brightness(2);
          }
          50% {
            opacity: 1;
            filter: blur(0px) brightness(1.6);
            text-shadow: 0 0 20px rgba(255, 140, 50, 0.9), 0 0 35px rgba(212, 175, 55, 0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px) brightness(1);
          }
        }

        @keyframes glintSlide {
          0% { left: -100%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { left: 160%; opacity: 0; }
        }

        @keyframes gentleHover {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.4deg);
          }
        }

        .anim-bottom {
          animation: flyInBottomBook 1.1s cubic-bezier(0.18, 0.9, 0.32, 1.15) 0.15s forwards;
          opacity: 0;
        }

        .anim-middle {
          animation: flyInMiddleBook 1.1s cubic-bezier(0.18, 0.9, 0.32, 1.15) 0.7s forwards;
          opacity: 0;
        }

        .anim-top {
          animation: flyInTopBook 1.1s cubic-bezier(0.18, 0.9, 0.32, 1.15) 1.25s forwards;
          opacity: 0;
        }

        .anim-scroll {
          animation: floatInScroll 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.8s forwards;
          opacity: 0;
        }

        .anim-text {
          animation: textRevealEngrave 1.2s cubic-bezier(0.16, 1, 0.3, 1) 2.5s forwards;
          opacity: 0;
        }

        .anim-glint {
          animation: glintSlide 2.5s ease-in-out 3.4s infinite;
        }

        .hover-ambient {
          animation: gentleHover 5s ease-in-out infinite;
        }
      `}</style>

      {/* Assembly Container with Reset Key */}
      <div
        key={key}
        className="relative w-full h-full transform-gpu"
        style={{ perspective: "1200px" }}
      >
        <div className="absolute inset-0 hover-ambient transform-gpu">
          {/* Layer 1: Bottom Ornate Book */}
          <div
            className="anim-bottom absolute inset-0 w-full h-full bg-no-repeat bg-contain bg-center"
            style={{
              backgroundImage: "url('/images/aec-book-stack.png')",
              clipPath: "polygon(21% 60%, 82% 60%, 82% 70%, 21% 70%)",
              filter: "drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5))",
            }}
          />

          {/* Layer 2: Middle Leather Book */}
          <div
            className="anim-middle absolute inset-0 w-full h-full bg-no-repeat bg-contain bg-center"
            style={{
              backgroundImage: "url('/images/aec-book-stack.png')",
              clipPath: "polygon(15% 50%, 83% 50%, 83% 63.5%, 15% 63.5%)",
              filter: "drop-shadow(0 12px 20px rgba(0, 0, 0, 0.45))",
            }}
          />

          {/* Layer 3: Top Thick Book */}
          <div
            className="anim-top absolute inset-0 w-full h-full bg-no-repeat bg-contain bg-center"
            style={{
              backgroundImage: "url('/images/aec-book-stack.png')",
              clipPath: "polygon(20% 32%, 79% 32%, 79% 53.5%, 20% 53.5%)",
              filter: "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.4))",
            }}
          />

          {/* Layer 4: Rolled Ancient Parchment Scroll */}
          <div
            className="anim-scroll absolute inset-0 w-full h-full bg-no-repeat bg-contain bg-center"
            style={{
              backgroundImage: "url('/images/aec-book-stack.png')",
              clipPath: "polygon(22% 21%, 55% 21%, 55% 38%, 22% 38%)",
              filter: "drop-shadow(0 8px 14px rgba(0, 0, 0, 0.35))",
            }}
          />

          {/* Layer 5: Glowing Typography Overlay */}
          <div
            className="anim-text absolute top-[36.5%] left-[31%] w-[44%] text-center pointer-events-none z-10"
          >
            <div className="anim-glint absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-25deg] opacity-0" />
            <div
              className="font-serif font-black tracking-[3px] text-lg sm:text-xl leading-tight drop-shadow-md bg-gradient-to-b from-[#FFE89C] via-[#FF9E43] to-[#D44212] bg-clip-text text-transparent"
              style={{
                fontFamily: "'Cinzel', serif, system-ui",
                filter: "drop-shadow(0 2px 4px rgba(40, 10, 0, 0.9))",
              }}
            >
              AEC NETWORK
            </div>
            <div
              className="mt-0.5 text-[8px] sm:text-[9.5px] italic font-bold tracking-wide leading-tight text-[#FFF2CC] drop-shadow"
              style={{
                fontFamily: "'Playfair Display', serif, Georgia",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.95), 0 0 8px rgba(255, 170, 70, 0.5)",
              }}
            >
              Islamic and Professional Education
              <br />
              through Online Institute
            </div>
          </div>
        </div>
      </div>

      {/* Floating Replay Button */}
      {isHovered && (
        <button
          onClick={handleReplay}
          className="absolute bottom-2 right-2 z-20 rounded-full bg-black/60 hover:bg-aec-gold text-white hover:text-slate-950 p-2 text-xs font-bold backdrop-blur-md border border-white/20 transition-all transform hover:scale-110 shadow-lg cursor-pointer"
          title="Replay Animation"
        >
          🔄 Replay
        </button>
      )}
    </div>
  );
}
