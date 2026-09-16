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
}

export function useAdaptivePerformance(): AdaptivePerformance {
  const [perf, setPerf] = useState<AdaptivePerformance>({
    tier: "high",
    isLowTier: false,
    isMobile: false,
    dprCap: 2,
    parallaxScale: 1,
    reduceBlur: false,
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
    const dprCap = tier === "low" ? 1.25 : tier === "medium" ? 1.5 : 2.0;
    const parallaxScale = tier === "low" ? 0.25 : tier === "medium" ? 0.6 : 1.0;
    const reduceBlur = tier !== "high";

    setPerf({
      tier,
      isLowTier,
      isMobile,
      dprCap,
      parallaxScale,
      reduceBlur,
    });
  }, []);

  return perf;
}
