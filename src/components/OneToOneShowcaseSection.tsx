"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Dedicated individual instructor",
    desc: "Single-student focus ensuring 100% attention without classroom distractions."
  },
  {
    title: "Pacing customized to student capability",
    desc: "Accelerate through strengths or spend extra sessions mastering difficult concepts."
  },
  {
    title: "Flexible rescheduling options",
    desc: "Coordinate class timings that comfortably fit around school, work, and family schedules."
  },
  {
    title: "Interactive instruction & immediate feedback",
    desc: "Live digital whiteboard, screen sharing, practical drills, and instant teacher corrections."
  }
];

export default function OneToOneShowcaseSection() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20 bg-white">
      {/* Subtle ambient background glow */}
      <div className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-aec-teal/10 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -right-40 top-1/3 w-96 h-96 rounded-full bg-aec-gold/10 blur-3xl opacity-50" />

      <div className="container-aec">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Image with floating animation */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex justify-center"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-2xl"
            >
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900/5 p-2 shadow-[0_20px_60px_-15px_rgba(11,31,58,0.18)] transition-all duration-500 hover:shadow-[0_25px_70px_-12px_rgba(11,31,58,0.25)]">
                <Image
                  src="/images/about-one-on-one.png"
                  alt="AEC Network Live One-to-One Interactive Consultation and Learning Session"
                  width={720}
                  height={480}
                  className="w-full h-auto rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority
                />

                {/* Live Session Badge Overlay */}
                <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Live 1-on-1 Class</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: One-to-One details with animations */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            {/* Top pill badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-200/70">
                Personalized Tutoring
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                Flexible Timetable
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-aec-navy leading-tight">
              One-to-One Learning Mode
            </h2>

            {/* Lead Description */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Ideal for students who thrive with individual attention, customized pacing, and targeted support in specific subjects like Quran Tajweed or advanced Mathematics.
            </p>

            {/* Feature List with hover shift & animated checks */}
            <ul className="mt-6 space-y-4">
              {FEATURES.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-3.5 rounded-xl p-2 transition-colors duration-200 hover:bg-slate-50/80 cursor-default"
                >
                  {/* Pulsing Green Circle Checkmark icon matching medicloud */}
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.25
                    }}
                    className="flex-shrink-0 mt-0.5 text-emerald-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="drop-shadow-sm"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                    </svg>
                  </motion.span>

                  <div>
                    <h3 className="text-sm font-semibold text-aec-navy group-hover:text-aec-teal transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/admissions/free-trial"
                className="inline-flex items-center justify-center rounded-xl bg-aec-teal px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-aec-navy hover:shadow-lg hover:-translate-y-0.5"
              >
                Explore 1-on-1 Tutoring
              </Link>
              <Link
                href="/admissions/free-trial"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:border-aec-teal hover:text-aec-teal hover:-translate-y-0.5"
              >
                Book a Free Trial
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
