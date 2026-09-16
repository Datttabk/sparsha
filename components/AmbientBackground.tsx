"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useAdaptivePerformance } from "@/hooks/useAdaptivePerformance";

export default function AmbientBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { isLowTier, isMobile, parallaxScale } = useAdaptivePerformance();

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 22,
    restDelta: 0.001,
  });

  // Subtle vertical parallax movement for atmospheric lighting orbs (scaled for device tier)
  const orb1Y = useTransform(smoothProgress, [0, 1], [0, 180 * parallaxScale]);
  const orb2Y = useTransform(smoothProgress, [0, 1], [0, -140 * parallaxScale]);
  const orb3Y = useTransform(smoothProgress, [0, 1], [0, 220 * parallaxScale]);

  // Subtle movement for botanical petals
  const petal1Y = useTransform(smoothProgress, [0, 1], [0, -110 * parallaxScale]);
  const petal2Y = useTransform(smoothProgress, [0, 1], [0, 130 * parallaxScale]);
  const petal3Y = useTransform(smoothProgress, [0, 1], [0, -90 * parallaxScale]);

  if (shouldReduceMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(250,237,241,0.45) 0%, rgba(250,237,241,0.15) 50%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(252,231,236,0.4) 0%, rgba(252,231,236,0.1) 50%, transparent 70%)" }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Dynamic Ambient Gradient Glows (GPU Single-Pass Radial Gradients) */}
      <motion.div
        style={{
          y: isLowTier || isMobile ? 0 : orb1Y,
          background: "radial-gradient(circle, rgba(252,231,236,0.65) 0%, rgba(250,237,241,0.35) 45%, transparent 70%)",
        }}
        className="absolute -top-24 -left-24 h-[550px] w-[550px] rounded-full"
      />
      <motion.div
        style={{
          y: isLowTier || isMobile ? 0 : orb2Y,
          background: "radial-gradient(circle, rgba(251,220,229,0.55) 0%, rgba(252,240,244,0.3) 45%, transparent 70%)",
        }}
        className="absolute top-1/2 -right-32 h-[600px] w-[600px] rounded-full"
      />
      <motion.div
        style={{
          y: isLowTier || isMobile ? 0 : orb3Y,
          background: "radial-gradient(circle, rgba(250,235,238,0.6) 0%, rgba(253,242,245,0.25) 45%, transparent 70%)",
        }}
        className="absolute -bottom-32 left-1/4 h-[500px] w-[500px] rounded-full"
      />

      {/* Floating Botanical Rose Petal 1 (Top Right) */}
      <motion.div
        style={{ y: isLowTier || isMobile ? 0 : petal1Y }}
        className="absolute top-24 right-[12%] opacity-35"
      >
        <svg
          width="42"
          height="54"
          viewBox="0 0 42 54"
          fill="none"
          className="animate-[petal-drift_9s_ease-in-out_infinite]"
        >
          <path
            d="M 21 0 C 35 12, 42 30, 32 46 C 22 55, 6 50, 2 36 C -2 22, 7 8, 21 0 Z"
            fill="url(#petal-grad-1)"
          />
          <defs>
            <linearGradient id="petal-grad-1" x1="0" y1="0" x2="42" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" stopOpacity="0.45" />
              <stop offset="1" stopColor="#fda4af" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Botanical Rose Petal 2 (Mid Left) */}
      <motion.div
        style={{ y: isLowTier || isMobile ? 0 : petal2Y }}
        className="absolute top-[48%] left-[7%] opacity-30"
      >
        <svg
          width="36"
          height="48"
          viewBox="0 0 36 48"
          fill="none"
          className="animate-[petal-drift_11s_ease-in-out_infinite] [animation-delay:2s]"
        >
          <path
            d="M 18 0 C 30 10, 36 26, 28 40 C 20 48, 5 44, 2 32 C -1 20, 6 7, 18 0 Z"
            fill="url(#petal-grad-2)"
          />
          <defs>
            <linearGradient id="petal-grad-2" x1="0" y1="0" x2="36" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fb7185" stopOpacity="0.4" />
              <stop offset="1" stopColor="#fecdd3" stopOpacity="0.12" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Botanical Rose Petal 3 (Lower Right - skipped on low tier for CPU efficiency) */}
      {!isLowTier && (
        <motion.div
          style={{ y: petal3Y }}
          className="absolute top-[78%] right-[8%] opacity-35"
        >
          <svg
            width="48"
            height="60"
            viewBox="0 0 48 60"
            fill="none"
            className="animate-[petal-drift_13s_ease-in-out_infinite] [animation-delay:4s]"
          >
            <path
              d="M 24 0 C 40 14, 48 34, 37 51 C 25 61, 7 56, 3 40 C -2 24, 8 9, 24 0 Z"
              fill="url(#petal-grad-3)"
            />
            <defs>
              <linearGradient id="petal-grad-3" x1="0" y1="0" x2="48" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f43f5e" stopOpacity="0.3" />
                <stop offset="1" stopColor="#ffe4e6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </div>
  );
}
