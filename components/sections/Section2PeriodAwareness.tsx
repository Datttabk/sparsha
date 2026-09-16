"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Heart, Sparkles } from "lucide-react";
import { useAdaptivePerformance } from "@/hooks/useAdaptivePerformance";

export default function Section2PeriodAwareness() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLowTier, parallaxScale } = useAdaptivePerformance();

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Ribbon and wave scroll transforms (GPU accelerated, adapted by device capability)
  const ribbonX1 = useTransform(scrollYProgress, [0, 1], [`-${12 * parallaxScale}%`, `${14 * parallaxScale}%`]);
  const ribbonX2 = useTransform(scrollYProgress, [0, 1], [`${8 * parallaxScale}%`, `-${10 * parallaxScale}%`]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], [-4 * parallaxScale, 6 * parallaxScale]);
  const ribbonScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 0.98]);

  // Petals parallax
  const petal1Y = useTransform(scrollYProgress, [0, 1], [-40 * parallaxScale, 90 * parallaxScale]);
  const petal2Y = useTransform(scrollYProgress, [0, 1], [80 * parallaxScale, -70 * parallaxScale]);
  const petal3Y = useTransform(scrollYProgress, [0, 1], [-20 * parallaxScale, 120 * parallaxScale]);

  // Supporting statement reveal
  const statementOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0.3, 1]);
  const statementScale = useTransform(scrollYProgress, [0.35, 0.6], [0.95, 1]);

  const checklistItems = [
    { title: "No fear", desc: "Of staining, displacement, or sudden leaks." },
    { title: "No shame", desc: "In carrying, asking for, or needing care." },
    { title: "No stigma", desc: "In our classrooms, homes, and boardrooms." },
    { title: "No silence", desc: "Because menstrual health is universal dignity." },
  ];

  return (
    <section
      id="period-awareness"
      ref={containerRef}
      className="scroll-mt-24 relative w-full min-h-[90vh] lg:min-h-screen bg-gradient-to-b from-[#fdf8f9] via-[#f9e5ec] to-[#fbf2f5] py-28 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center border-t border-[#f5e4e8]"
    >
      {/* Cinematic Atmospheric Lights (GPU Single-Pass Radial Gradients) */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(251,207,232,0.45) 0%, rgba(251,207,232,0.15) 45%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(253,164,175,0.35) 0%, rgba(253,164,175,0.1) 45%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -left-20 h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(219,234,254,0.4) 0%, rgba(219,234,254,0.1) 45%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_0%,transparent_75%)]" />

      {/* FULL-WIDTH SCROLL-REACTIVE FLOWING SILK RIBBON WAVES */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
        {/* Layer 1: Crimson / Rose flowing silk path */}
        <motion.div
          style={{ x: ribbonX1, rotate: ribbonRotate, scale: ribbonScale }}
          className="w-[140%] max-w-none opacity-40 mix-blend-multiply transition-transform duration-300 ease-out"
        >
          <svg
            viewBox="0 0 1440 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-2xl"
          >
            <path
              d="M-100 240 C 220 80, 480 390, 820 180 C 1140 -20, 1380 340, 1600 200 L 1600 460 L -100 460 Z"
              fill="url(#ribbonGradient1)"
            />
            <defs>
              <linearGradient id="ribbonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.45" />
                <stop offset="35%" stopColor="#e11d48" stopOpacity="0.65" />
                <stop offset="70%" stopColor="#d81b60" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#be123c" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Layer 2: Translucent Blush Secondary Ribbon Wave */}
        <motion.div
          style={{ x: ribbonX2, scale: ribbonScale }}
          className="absolute w-[135%] max-w-none opacity-30 mix-blend-screen transition-transform duration-300 ease-out"
        >
          <svg
            viewBox="0 0 1440 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M-80 160 C 260 320, 600 50, 940 280 C 1220 460, 1420 100, 1620 230"
              stroke="url(#ribbonStroke)"
              strokeWidth="68"
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <linearGradient id="ribbonStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fda4af" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Parallax Floating Petals */}
      <motion.div
        style={{ y: petal1Y }}
        className="pointer-events-none absolute top-1/4 left-[8%] w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400/40 to-pink-200/30 blur-[1px] rotate-12 shadow-sm"
      />
      <motion.div
        style={{ y: petal2Y }}
        className="pointer-events-none absolute bottom-1/3 right-[12%] w-12 h-12 rounded-full bg-gradient-to-br from-pink-400/35 to-rose-500/20 blur-[1.5px] -rotate-45"
      />
      <motion.div
        style={{ y: petal3Y }}
        className="pointer-events-none absolute top-2/3 left-[22%] w-7 h-7 rounded-full bg-gradient-to-bl from-rose-300/40 to-pink-100/30 blur-[0.5px] rotate-30"
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        {/* Top Tag */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-1.5 text-xs font-bold text-[#d81b60] shadow-sm backdrop-blur-md border border-rose-100"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#d81b60]" />
            <span className="tracking-widest uppercase">The Menstrual Movement</span>
          </motion.div>
        </div>

        {/* Main Editorial Awareness Headline */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#281920] leading-[1.12]"
          >
            Periods are natural. <br />
            <span className="text-[#d81b60] drop-shadow-sm">Discomfort shouldn&apos;t be.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-base sm:text-xl text-[#5a424f] max-w-2xl mx-auto font-light leading-relaxed"
          >
            Breaking generations of quiet compromise. We believe every woman deserves uncompromised comfort, honest conversations, and absolute confidence.
          </motion.p>
        </div>

        {/* Supporting Checklist Items Grid: Sequential Appearance */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {checklistItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.35 + idx * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-white/90 bg-white/80 p-5 shadow-sm backdrop-blur-md transition-all hover:shadow-md hover:border-rose-200 text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#faebee] text-[#d81b60] shrink-0">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#281920]">
                  {item.title}
                </h4>
              </div>
              <p className="mt-2 text-xs text-[#5a424f] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Supporting Message Climax */}
        <motion.div
          style={{ opacity: statementOpacity, scale: statementScale }}
          className="mt-16 text-center max-w-xl mx-auto"
        >
          <div className="inline-block rounded-3xl bg-white/85 p-8 sm:p-10 shadow-card-wellness border border-white/95 backdrop-blur-md">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#281920] leading-snug">
              Let&apos;s talk. <br />
              <span className="text-[#d81b60]">Let&apos;s support.</span> <br />
              Let&apos;s change.
            </h3>
            <div className="mt-5 flex items-center justify-center gap-3 text-[#d81b60]">
              <span className="h-0.5 w-12 bg-[#d81b60]/40 rounded-full" />
              <Heart className="h-5 w-5 fill-[#d81b60] text-[#d81b60] animate-pulse" />
              <span className="h-0.5 w-12 bg-[#d81b60]/40 rounded-full" />
            </div>
            <p className="mt-4 text-xs sm:text-sm text-[#5a424f] italic">
              “When women speak without hesitation, an entire generation moves forward with strength.”
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

