"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Leaf,
  ShieldCheck,
  Flower2,
  ArrowRight,
  Heart,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useAdaptivePerformance } from "@/hooks/useAdaptivePerformance";

const TOTAL_FRAMES = 300;
const BASE_SMOOTHING_FACTOR = 0.14;

// Programmatically generate zero-padded frame paths (001 -> 300)
const getFramePath = (index: number): string => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${frameNumber}.jpg`;
};

export default function SparshaUnifiedHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Direct DOM refs for zero-re-render scroll transitions
  const heroUiRef = useRef<HTMLDivElement>(null);
  const milestone1Ref = useRef<HTMLDivElement>(null);
  const milestone2Ref = useRef<HTMLDivElement>(null);
  const milestone3Ref = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const counterContainerRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLSpanElement>(null);

  // Animation & Frame tracking refs (zero React re-renders on scroll)
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const bitmapCacheRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const loadedFlagsRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const animationFrameIdRef = useRef<number | null>(null);
  const isComponentMountedRef = useRef<boolean>(true);
  const isIntersectingRef = useRef<boolean>(true);

  // Adaptive performance tiering
  const { tier, dprCap, isLowTier, isMobile } = useAdaptivePerformance();

  // Draw an image or ImageBitmap using high-quality cover math and high-DPI scaling
  const renderFrame = useCallback((img: ImageBitmap | HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High quality rendering settings to prevent pixelation, jaggies, and compression artifacts
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isLowTier ? "medium" : "high";

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width || 1920;
    const imgHeight = img.height || 1080;

    // Object-fit: cover mathematics with rounded physical coordinates
    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const drawWidth = Math.round(imgWidth * ratio);
    const drawHeight = Math.round(imgHeight * ratio);
    const drawX = Math.round((canvasWidth - drawWidth) / 2);
    const drawY = Math.round((canvasHeight - drawHeight) / 2);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, [isLowTier]);

  // Nearest-neighbor fallback: find and render the closest fully decoded frame
  const renderClosestLoadedFrame = useCallback(
    (targetIndex: number) => {
      const cache = bitmapCacheRef.current;
      const flags = loadedFlagsRef.current;

      // Exact match
      if (flags[targetIndex] && cache[targetIndex]) {
        renderFrame(cache[targetIndex]!);
        return;
      }

      // Search outward for nearest neighbor
      let left = targetIndex - 1;
      let right = targetIndex + 1;

      while (left >= 0 || right < TOTAL_FRAMES) {
        if (left >= 0 && flags[left] && cache[left]) {
          renderFrame(cache[left]!);
          return;
        }
        if (right < TOTAL_FRAMES && flags[right] && cache[right]) {
          renderFrame(cache[right]!);
          return;
        }
        left--;
        right++;
      }
    },
    [renderFrame]
  );

  // Resize canvas with devicePixelRatio scaling capped dynamically for GPU efficiency
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = Math.round(displayWidth * dpr);
    canvas.height = Math.round(displayHeight * dpr);
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Redraw current active frame immediately after resizing
    const activeFrameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentFrameRef.current))
    );
    renderClosestLoadedFrame(activeFrameIndex);
  }, [dprCap, renderClosestLoadedFrame]);

  // Load an individual frame with hardware-accelerated GPU decoding via createImageBitmap
  const loadSingleFrame = useCallback(
    (index: number): Promise<ImageBitmap | HTMLImageElement> => {
      return new Promise((resolve) => {
        if (index < 0 || index >= TOTAL_FRAMES) return;
        if (bitmapCacheRef.current[index]) {
          resolve(bitmapCacheRef.current[index]!);
          return;
        }

        const img = new window.Image();
        img.src = getFramePath(index);

        img.onload = async () => {
          if (!isComponentMountedRef.current) return;
          try {
            if (typeof window.createImageBitmap === "function") {
              const bitmap = await window.createImageBitmap(img);
              if (!isComponentMountedRef.current) return;
              bitmapCacheRef.current[index] = bitmap;
              loadedFlagsRef.current[index] = true;
              resolve(bitmap);
            } else if (typeof img.decode === "function") {
              await img.decode();
              if (!isComponentMountedRef.current) return;
              bitmapCacheRef.current[index] = img;
              loadedFlagsRef.current[index] = true;
              resolve(img);
            } else {
              bitmapCacheRef.current[index] = img;
              loadedFlagsRef.current[index] = true;
              resolve(img);
            }
          } catch {
            bitmapCacheRef.current[index] = img;
            loadedFlagsRef.current[index] = true;
            resolve(img);
          }
        };

        img.onerror = () => {
          resolve(img);
        };
      });
    },
    []
  );

  // Directly update DOM styles based on scroll progress (avoids all React component re-renders)
  const updateScrollStyles = useCallback((progress: number) => {
    // 1. Hero UI Layer: 0% to 6% fully visible, 6% to 18% fades out & floats upward
    if (heroUiRef.current) {
      const heroUiOpacity = Math.max(0, Math.min(1, 1 - (progress - 0.06) / 0.12));
      const heroUiTranslateY = Math.min(80, Math.max(0, (progress - 0.06) * 400));
      heroUiRef.current.style.opacity = heroUiOpacity.toFixed(3);
      heroUiRef.current.style.transform = `translate3d(0, -${heroUiTranslateY.toFixed(1)}px, 0)`;
      heroUiRef.current.style.pointerEvents = heroUiOpacity > 0.08 ? "auto" : "none";
    }

    // 2. Canvas visibility: soft fade-in as user starts scrolling
    if (canvasRef.current) {
      const canvasOpacity = Math.min(1, Math.max(0.7, 0.7 + progress * 2));
      canvasRef.current.style.opacity = canvasOpacity.toFixed(2);
    }

    // 3. Milestone 1: (18% - 42%)
    if (milestone1Ref.current) {
      const isVisible = progress > 0.18 && progress < 0.42;
      milestone1Ref.current.style.opacity = isVisible ? "1" : "0";
      milestone1Ref.current.style.transform = isVisible
        ? "translate3d(0, 0, 0)"
        : "translate3d(0, -16px, 0)";
    }

    // 4. Milestone 2: (48% - 72%)
    if (milestone2Ref.current) {
      const isVisible = progress > 0.48 && progress < 0.72;
      milestone2Ref.current.style.opacity = isVisible ? "1" : "0";
      milestone2Ref.current.style.transform = isVisible
        ? "translate3d(0, 0, 0)"
        : "translate3d(0, 16px, 0)";
    }

    // 5. Milestone 3: (76% - 94%)
    if (milestone3Ref.current) {
      const isVisible = progress > 0.76 && progress < 0.94;
      milestone3Ref.current.style.opacity = isVisible ? "1" : "0";
      milestone3Ref.current.style.transform = isVisible
        ? "translate3d(0, 0, 0)"
        : "translate3d(0, 16px, 0)";
    }

    // 6. Scroll prompt guidance (< 5%)
    if (scrollPromptRef.current) {
      const isVisible = progress < 0.05;
      scrollPromptRef.current.style.opacity = isVisible ? "1" : "0";
    }

    // 7. Timeline / frame counter visibility (12% - 96%)
    if (counterContainerRef.current) {
      const isVisible = progress > 0.12 && progress < 0.96;
      counterContainerRef.current.style.opacity = isVisible ? "1" : "0";
    }
  }, []);

  useEffect(() => {
    isComponentMountedRef.current = true;
    handleResize();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- PHASE 1: Load frame 001 immediately and paint it ---
    loadSingleFrame(0).then((firstImg) => {
      if (isComponentMountedRef.current && firstImg) {
        renderFrame(firstImg);
      }
    });

    // --- PHASE 2: Load initial burst of nearby frames (1 to 12) ---
    const initialBurst = isLowTier ? 6 : 12;
    for (let i = 1; i <= initialBurst; i++) {
      loadSingleFrame(i);
    }

    // --- PHASE 3: Progressive non-blocking background preloader queue ---
    const preloadRestOfFrames = () => {
      let currentIndex = initialBurst + 1;
      const batchSize = isLowTier ? 4 : 6;

      const loadNextBatch = () => {
        if (!isComponentMountedRef.current || currentIndex >= TOTAL_FRAMES) return;

        const promises: Promise<ImageBitmap | HTMLImageElement>[] = [];
        for (
          let i = 0;
          i < batchSize && currentIndex < TOTAL_FRAMES;
          i++, currentIndex++
        ) {
          promises.push(loadSingleFrame(currentIndex));
        }

        Promise.all(promises).then(() => {
          if (!isComponentMountedRef.current) return;
          if (typeof window.requestIdleCallback !== "undefined") {
            window.requestIdleCallback(loadNextBatch, { timeout: isLowTier ? 120 : 80 });
          } else {
            setTimeout(loadNextBatch, isLowTier ? 50 : 35);
          }
        });
      };

      loadNextBatch();
    };

    const bgPreloadTimeout = setTimeout(preloadRestOfFrames, 250);

    // --- HIGH-PERFORMANCE SCROLL PROGRESS LISTENER (RAF THROTTLED) ---
    let scrollTicking = false;
    const calculateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - viewportHeight;

      if (totalScrollableDistance <= 0) return;

      const scrolledPastTop = -rect.top;
      const progress = Math.min(
        1,
        Math.max(0, scrolledPastTop / totalScrollableDistance)
      );

      scrollProgressRef.current = progress;
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
      updateScrollStyles(progress);

      // Prioritize nearby frames around active user scroll position
      const currentTarget = Math.round(targetFrameRef.current);
      const prefetchRadius = isLowTier ? 8 : 15;
      const start = Math.max(0, currentTarget - prefetchRadius);
      const end = Math.min(TOTAL_FRAMES - 1, currentTarget + prefetchRadius);
      for (let f = start; f <= end; f++) {
        if (!loadedFlagsRef.current[f]) {
          loadSingleFrame(f);
        }
      }
    };

    const updateScrollState = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Initial position calculation
    calculateProgress();

    // --- INTERSECTION OBSERVER: PAUSE OFF-SCREEN ANIMATIONS ---
    const smoothingFactor = isLowTier ? 0.25 : isMobile ? 0.20 : BASE_SMOOTHING_FACTOR;
    let lastRenderedIndex = -1;

    const renderLoop = () => {
      if (!isComponentMountedRef.current || !isIntersectingRef.current) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (prefersReducedMotion) {
        currentFrameRef.current = target;
      } else {
        const diff = target - current;
        if (Math.abs(diff) > 0.001) {
          currentFrameRef.current += diff * smoothingFactor;
        } else {
          currentFrameRef.current = target;
        }
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameIndex !== lastRenderedIndex) {
        renderClosestLoadedFrame(frameIndex);
        lastRenderedIndex = frameIndex;

        if (counterTextRef.current) {
          counterTextRef.current.textContent = String(frameIndex + 1).padStart(3, "0");
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    // Observer to pause canvas loop when hero section is not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasIntersecting = isIntersectingRef.current;
        isIntersectingRef.current = entry.isIntersecting;

        if (entry.isIntersecting && !wasIntersecting) {
          if (!animationFrameIdRef.current) {
            animationFrameIdRef.current = requestAnimationFrame(renderLoop);
          }
        } else if (!entry.isIntersecting && wasIntersecting) {
          if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
          }
        }
      },
      { rootMargin: "150px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Start initial render loop
    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isComponentMountedRef.current = false;
      clearTimeout(bgPreloadTimeout);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      observer.disconnect();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [
    handleResize,
    isLowTier,
    isMobile,
    loadSingleFrame,
    renderClosestLoadedFrame,
    renderFrame,
    updateScrollStyles,
  ]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="scroll-mt-24 relative w-full bg-[#fdf8f9] text-[#281920]"
      style={{ height: "550vh" }}
      aria-label="Sparsha Hero & Cinematic Story Experience"
    >
      {/* Sticky Fullscreen Viewport Container */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden bg-gradient-to-b from-[#fdf8f9] via-[#faedf1] to-[#fbf2f5]">
        
        {/* ======================================================== */}
        {/* LAYER 1: Full-Bleed High-DPI Canvas                      */}
        {/* ======================================================== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full object-cover select-none pointer-events-none transition-opacity duration-300 opacity-70"
        />

        {/* Soft edge ambient light vignette blending with the rest of the Sparsha theme */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#faedf1]/40 via-transparent to-[#fdf8f9]/30" />

        {/* ======================================================== */}
        {/* LAYER 2: Existing Approved Sparsha Hero UI Layer         */}
        {/* Smoothly transitions out as user scrolls into the story  */}
        {/* ======================================================== */}
        <div
          ref={heroUiRef}
          className="absolute inset-0 z-20 flex flex-col justify-between overflow-y-auto lg:overflow-visible pt-24 sm:pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-opacity duration-300 pointer-events-auto opacity-100"
          style={{
            transform: "translate3d(0, 0px, 0)",
            willChange: "opacity, transform",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
            
            {/* Left Column: 42-45% width */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Eyebrow Brand Tag */}
              <div className="inline-flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d81b60]">
                  Care Today, A Healthier Tomorrow
                </span>
              </div>

              {/* Main Editorial Headline */}
              <div className="mt-4">
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-[#281920]">
                  Move Freely.
                  <br />
                  <span className="text-[#d81b60] drop-shadow-[0_2px_15px_rgba(216,27,96,0.12)]">
                    Live Fully.
                  </span>
                </h1>
              </div>

              {/* Decorative Divider with Center Lotus Flower Icon */}
              <div className="mt-5 flex items-center gap-3 max-w-md">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e5b6c5] to-[#d81b60]/40" />
                <div className="relative flex items-center justify-center text-[#d81b60]">
                  <svg
                    width="22"
                    height="16"
                    viewBox="0 0 24 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#d81b60]"
                  >
                    <path
                      d="M12 2C13.5 6 15 11 12 16C9 11 10.5 6 12 2Z"
                      fill="rgba(216,27,96,0.15)"
                    />
                    <path d="M12 16C15 11 19 9 22 13C18 16 14 16 12 16Z" />
                    <path d="M12 16C9 11 5 9 2 13C6 16 10 16 12 16Z" />
                  </svg>
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#e5b6c5] to-[#d81b60]/40" />
              </div>

              {/* Supporting Text */}
              <p className="mt-4 text-lg sm:text-xl font-normal text-[#4f3844] max-w-md leading-relaxed">
                Comfort that keeps up with every move.
              </p>

              {/* Feature Icons Strip */}
              <div className="mt-6 flex items-center gap-6 sm:gap-8 max-w-md">
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e89db4] bg-white/90 backdrop-blur-sm text-[#d81b60] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#d81b60]">
                    <Leaf className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <span className="mt-1.5 text-xs font-semibold text-[#4a3540] leading-tight">
                    Super Soft
                    <br />
                    Comfort
                  </span>
                </div>

                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e89db4] bg-white/90 backdrop-blur-sm text-[#d81b60] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#d81b60]">
                    <ShieldCheck className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <span className="mt-1.5 text-xs font-semibold text-[#4a3540] leading-tight">
                    Reliable
                    <br />
                    Protection
                  </span>
                </div>

                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e89db4] bg-white/90 backdrop-blur-sm text-[#d81b60] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#d81b60]">
                    <Flower2 className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <span className="mt-1.5 text-xs font-semibold text-[#4a3540] leading-tight">
                    Gentle on
                    <br />
                    Skin
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                <a
                  href="#explore"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d81b60] via-[#c2185b] to-[#ad1457] px-6 py-3 text-sm font-semibold text-white shadow-soft-pink transition-all duration-300 hover:shadow-lg hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Sparsha</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d81b60]/30 bg-white/80 px-5 py-3 text-sm font-medium text-[#4a3540] backdrop-blur-sm transition-all duration-300 hover:bg-[#faebee] hover:border-[#d81b60] hover:text-[#d81b60]"
                >
                  <span>Discover Our Products</span>
                </a>
              </div>

              {/* Product Display: Pedestal with Blue Sparsha Box & Pad */}
              <div className="mt-8 relative max-w-sm">
                <div className="relative rounded-2xl overflow-hidden shadow-card-wellness border border-white/90 bg-white/60 backdrop-blur-sm">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/sparsha/product-pedestal.jpg"
                      alt="Official Sparsha Ultra Soft Sanitary Napkin on Marble Pedestal"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold text-[#1e40af] shadow-sm backdrop-blur-md flex items-center gap-1 border border-blue-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <span>Official Blue Edition</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 55-58% width */}
            <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xl">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#fbcfe8]/40 via-[#fde047]/10 to-[#fed7aa]/30 blur-2xl opacity-70 -z-10" />

                {/* Main Lifestyle Photo Frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-card-wellness border-2 border-white/95 bg-white/60">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/sparsha/woman-stretching.jpg"
                      alt="Confident woman stretching comfortably in a sunlit wellness studio"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>

                  {/* Floating Empowering Brand Quote Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:left-5 sm:right-5 rounded-2xl bg-white/90 backdrop-blur-md p-3 sm:p-3.5 border border-white/80 shadow-md flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#faebee] text-[#d81b60]">
                        <Heart className="h-4 w-4 fill-[#d81b60]/20 text-[#d81b60]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#d81b60]">
                          Empowered Comfort
                        </div>
                        <p className="text-xs font-medium text-[#4a3540]">
                          Designed for unrestricted freedom and gentle skin protection.
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-[#6b7280] shrink-0 border-l border-gray-200 pl-2.5">
                      <span>100% Rash-Free</span>
                    </div>
                  </div>
                </div>

                {/* Her28Days Movement Badge */}
                <div className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-white p-1 shadow-md border border-[#f5e4e8]">
                  <div className="relative h-full w-full rounded-full overflow-hidden">
                    <Image
                      src="/assets/her28days-emblem.png"
                      alt="Her28Days Movement"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* LAYER 3: Cinematic Narrative Milestones                  */}
        {/* Appear smoothly during the cinematic middle scroll phase */}
        {/* ======================================================== */}
        
        {/* Milestone 1: Beginning (20% - 42%) */}
        <div
          ref={milestone1Ref}
          className="pointer-events-none absolute top-28 left-6 sm:left-12 max-w-sm transition-all duration-700 opacity-0 -translate-y-4"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-card-wellness backdrop-blur-md">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d81b60]">
              <Sparkles className="h-3.5 w-3.5 text-[#d81b60]" />
              <span>Unrestricted Freedom</span>
            </div>
            <h3 className="mt-2 font-serif text-2xl font-bold text-[#281920] leading-snug">
              Designed for every stride, leap, and dream.
            </h3>
            <p className="mt-1.5 text-xs text-[#5a424f] leading-relaxed">
              Experience feather-light comfort that breathes and moves with your body.
            </p>
          </div>
        </div>

        {/* Milestone 2: Middle (48% - 72%) */}
        <div
          ref={milestone2Ref}
          className="pointer-events-none absolute bottom-24 right-6 sm:right-12 max-w-sm transition-all duration-700 opacity-0 translate-y-4"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-card-wellness backdrop-blur-md text-right">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d81b60]">
              <span>Pure Cloud Softness</span>
              <span className="h-2 w-2 rounded-full bg-[#d81b60] animate-ping" />
            </div>
            <h3 className="mt-2 font-serif text-2xl font-bold text-[#281920] leading-snug">
              Gentle like petals against your skin.
            </h3>
            <p className="mt-1.5 text-xs text-[#5a424f] leading-relaxed">
              100% rash-free cottony top sheet engineered for all-day confidence.
            </p>
          </div>
        </div>

        {/* Milestone 3: Finale (76% - 94%) */}
        <div
          ref={milestone3Ref}
          className="pointer-events-none absolute bottom-24 left-6 sm:left-12 max-w-sm transition-all duration-700 opacity-0 translate-y-4"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="rounded-2xl border border-white/80 bg-white/85 p-5 shadow-card-wellness backdrop-blur-md">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d81b60]">
              Swasth Mahila, Swasth Bharat
            </div>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#281920] leading-snug">
              Move Freely. Live Fully.
            </h3>
            <p className="mt-1.5 text-xs text-[#5a424f] leading-relaxed">
              Empowering women with uncompromising period care and dignity.
            </p>
          </div>
        </div>

        {/* Initial Scroll Prompt Guidance (fades out as soon as user begins scrolling) */}
        <div
          ref={scrollPromptRef}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-500 opacity-100"
        >
          <div className="flex flex-col items-center gap-1.5 rounded-full border border-white/80 bg-white/75 px-4 py-2 backdrop-blur-md shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d81b60]">
              Scroll to explore the journey
            </span>
            <ChevronDown className="h-4 w-4 animate-bounce text-[#d81b60]" />
          </div>
        </div>

        {/* Minimal Frame / Timeline Counter (visible during cinematic phase) */}
        <div
          ref={counterContainerRef}
          className="pointer-events-none absolute bottom-5 right-5 hidden sm:flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[10px] font-mono text-[#5a424f] backdrop-blur-md border border-white/80 transition-opacity duration-500 opacity-0"
        >
          <span ref={counterTextRef} className="text-[#d81b60] font-semibold">
            001
          </span>
          <span>/</span>
          <span>{TOTAL_FRAMES}</span>
        </div>
      </div>
    </section>
  );
}
