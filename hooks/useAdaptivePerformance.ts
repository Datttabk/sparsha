"use client";

import { useState, useEffect } from "react";

export type PerformanceTier = "high" | "medium" | "low";

export interface AdaptivePerformance {
  tier: PerformanceTier;
  isLowTier: boolean;
  isMobile: boolean;
  dprCap: number;
  parallaxScale: number;
  reduceBlur: boolean;
  maxCacheSize: number;
  preloadForward: number;
  preloadBackward: number;
  maxConcurrency: number;
}

export function useAdaptivePerformance(): AdaptivePerformance {
  const [perf, setPerf] = useState<AdaptivePerformance>({
    tier: "high",
    isLowTier: false,
    isMobile: false,
    dprCap: 2,
    parallaxScale: 1,
    reduceBlur: false,
    maxCacheSize: 300,
    preloadForward: 28,
    preloadBackward: 8,
    maxConcurrency: 5,
  });

  useEffect(() => {
    // 1. Mobile & Touch detection
    const isMobile =
      typeof window !== "undefined" &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
        window.innerWidth < 768);

    // 2. Hardware Concurrency & Memory detection
    const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
    // @ts-expect-error deviceMemory is available in Chrome/Edge
    const memory = typeof navigator !== "undefined" && navigator.deviceMemory ? navigator.deviceMemory : 8;

    // 3. Prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Determine tier
    let tier: PerformanceTier = "high";
    if (prefersReducedMotion || cores <= 2 || memory <= 2) {
      tier = "low";
    } else if (isMobile || cores <= 4 || memory <= 4) {
      tier = "medium";
    }

    const isLowTier = tier === "low";
    const dprCap = isLowTier ? 1.25 : isMobile ? 1.5 : 2.0;
    const parallaxScale = isLowTier ? 0.2 : isMobile ? 0.4 : 1.0;
    const reduceBlur = isLowTier || isMobile;

    // Adaptive memory limits:
    // Low tier / small mobile: 45 frames (prevents OOM / GC pauses, RAM < 150MB)
    // Medium tier / tablet: 80 frames
    // High tier / desktop: 300 frames (entire sequence)
    const maxCacheSize = isLowTier ? 45 : isMobile ? 55 : tier === "medium" ? 90 : 300;
    const preloadForward = isLowTier ? 12 : isMobile ? 18 : 28;
    const preloadBackward = isLowTier ? 4 : isMobile ? 6 : 8;
    const maxConcurrency = isLowTier ? 3 : isMobile ? 4 : 5;

    setPerf({
      tier,
      isLowTier,
      isMobile,
      dprCap,
      parallaxScale,
      reduceBlur,
      maxCacheSize,
      preloadForward,
      preloadBackward,
      maxConcurrency,
    });
  }, []);

  return perf;
}
