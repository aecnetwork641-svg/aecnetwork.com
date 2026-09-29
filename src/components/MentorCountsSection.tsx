"use client";

import { useEffect, useState, useRef } from "react";

interface CountItem {
  end: number;
  label: string;
}

const STATS: CountItem[] = [
  { end: 1232, label: "Students" },
  { end: 64, label: "Courses" },
  { end: 42, label: "Events" },
  { end: 24, label: "Trainers" },
];

export default function MentorCountsSection() {
  const [hasStarted, setHasStarted] = useState(false);
  const [counts, setCounts] = useState<number[]>([1232, 64, 42, 24]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setCounts([0, 0, 0, 0]);

          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS.map((stat) => Math.floor(stat.end * easeProgress))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(STATS.map((stat) => stat.end));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  return (
    <section
      id="counts"
      ref={sectionRef}
      className="section counts bg-[#f9fafb] py-14 border-y border-slate-200/70"
    >
      <div className="container-aec">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((item, idx) => (
            <div key={item.label} className="stats-item flex flex-col items-center justify-center p-4">
              <span className="purecounter block text-4xl sm:text-5xl font-extrabold text-[#0F766E] tracking-tight">
                {counts[idx]}
              </span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
