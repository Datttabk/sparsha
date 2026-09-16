"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { useAdaptivePerformance } from "@/hooks/useAdaptivePerformance";

export default function Section4InsideProtection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { isLowTier, parallaxScale } = useAdaptivePerformance();

  // Scroll tracking for subtle parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth subtle parallax offset adapted by performance tier
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-25 * parallaxScale, 25 * parallaxScale]);

  return (
    <section
      id="protection"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#fdf8f9] via-[#faedf1] to-[#fbf0f4] py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#f5e4e8] overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Soft atmospheric ambient background light (GPU single-pass radial gradients) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="h-[550px] w-[550px] sm:h-[700px] sm:w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(252,231,236,0.75) 0%, rgba(250,237,241,0.25) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(250,229,237,0.6) 0%, rgba(250,229,237,0.15) 45%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.25em] text-[#d81b60] shadow-sm border border-rose-100 backdrop-blur-md mb-3">
            <Sparkles className="h-3 w-3 text-[#d81b60]" />
            <span>Precision Engineering</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281920]">
            Inside the <span className="text-[#d81b60]">Protection</span>
          </h2>
          
          <p className="mt-3 font-serif text-xl sm:text-2xl text-[#d81b60] italic font-normal">
            Thoughtful Layers for Your Comfort.
          </p>
        </motion.div>

        {/* Hero Product Visualization — DEAD CENTER IN THE VIEWPORT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: shouldReduceMotion || isLowTier ? 0 : parallaxY }}
          className="relative w-full max-w-5xl flex justify-center items-center"
        >
          {/* Subtle Floating, Breathing & Parallax Motion Wrapper */}
          <motion.div
            animate={
              shouldReduceMotion || isLowTier
                ? {}
                : {
                    y: [0, -8, 0],
                    scale: [1, 1.012, 1],
                    rotate: [0, 0.3, -0.3, 0],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="group relative w-full aspect-[1024/409] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/95 bg-white/70 backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(216,27,96,0.22)]"
          >
            {/* The Official High-Resolution Inside Protection Visual Asset */}
            <Image
              src="/assets/inside-protection-visual.png"
              alt="Inside the Protection — Thoughtful Layers for Your Comfort, Sparsha Sanitary Pad Engineering"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1200px"
              className="object-contain w-full h-full select-none pointer-events-none"
            />

            {/* Subtle premium glass sheen border overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/60" />
          </motion.div>
        </motion.div>

        {/* Centered Reassuring Brand Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-10 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-xs sm:text-sm font-medium text-[#5a424f] shadow-sm border border-rose-100 backdrop-blur-sm"
        >
          <Heart className="h-3.5 w-3.5 fill-[#d81b60] text-[#d81b60]" />
          <span>Thoughtful protection. Designed around your comfort.</span>
        </motion.div>

      </div>
    </section>
  );
}
