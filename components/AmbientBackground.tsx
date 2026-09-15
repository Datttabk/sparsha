"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

export default function AmbientBackground() {
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 22,
    restDelta: 0.001,
  });

  // Subtle vertical parallax movement for atmospheric lighting orbs
  const orb1Y = useTransform(smoothProgress, [0, 1], [0, 180]);
  const orb2Y = useTransform(smoothProgress, [0, 1], [0, -140]);
  const orb3Y = useTransform(smoothProgress, [0, 1], [0, 220]);

  // Subtle movement for botanical petals
  const petal1Y = useTransform(smoothProgress, [0, 1], [0, -110]);
  const petal2Y = useTransform(smoothProgress, [0, 1], [0, 130]);
  const petal3Y = useTransform(smoothProgress, [0, 1], [0, -90]);

  if (shouldReduceMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-[#faedf1]/40 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-[#fce7ec]/35 blur-3xl" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Dynamic Ambient Gradient Glows (Parallax Scroll Linked) */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-24 -left-24 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[#fce7ec]/50 via-[#faedf1]/30 to-transparent blur-[110px]"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-1/2 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-[#fbdce5]/40 via-[#fcf0f4]/25 to-transparent blur-[120px]"
      />
      <motion.div
        style={{ y: orb3Y }}
        className="absolute -bottom-32 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#faebee]/45 via-[#fdf2f5]/20 to-transparent blur-[100px]"
      />

      {/* Floating Botanical Rose Petal 1 (Top Right) */}
      <motion.div
        style={{ y: petal1Y }}
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
        style={{ y: petal2Y }}
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

      {/* Floating Botanical Rose Petal 3 (Lower Right) */}
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
    </div>
  );
}
