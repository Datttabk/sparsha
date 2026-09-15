"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 300;
const SMOOTHING_FACTOR = 0.12;

// Programmatically generate zero-padded frame filenames (001 -> 300)
const getFramePath = (index: number): string => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${frameNumber}.jpg`;
};

export default function SparshaScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation & Frame tracking refs (avoid triggering React re-renders in render loop)
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const imagesCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedFlagsRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const animationFrameIdRef = useRef<number | null>(null);
  const isComponentMountedRef = useRef<boolean>(true);

  // Subtle story overlay milestones state
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState<boolean>(false);
  const [loadPercent, setLoadPercent] = useState<number>(0);

  // Draw a specific image to the canvas using "cover" aspect ratio and high-DPI scaling
  const renderFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;

    // Object-fit: cover mathematics
    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const drawWidth = imgWidth * ratio;
    const drawHeight = imgHeight * ratio;
    const drawX = (canvasWidth - drawWidth) / 2;
    const drawY = (canvasHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Find and render the closest loaded frame so there is NEVER an empty canvas or black flash
  const renderClosestLoadedFrame = useCallback(
    (targetIndex: number) => {
      const cache = imagesCacheRef.current;
      const flags = loadedFlagsRef.current;

      // Exact match
      if (flags[targetIndex] && cache[targetIndex]?.complete) {
        renderFrame(cache[targetIndex]!);
        return;
      }

      // Search outward for nearest neighbor
      let left = targetIndex - 1;
      let right = targetIndex + 1;

      while (left >= 0 || right < TOTAL_FRAMES) {
        if (left >= 0 && flags[left] && cache[left]?.complete) {
          renderFrame(cache[left]!);
          return;
        }
        if (right < TOTAL_FRAMES && flags[right] && cache[right]?.complete) {
          renderFrame(cache[right]!);
          return;
        }
        left--;
        right++;
      }
    },
    [renderFrame]
  );

  // Resize canvas with DPR support capped at 2 for optimal sharpness and memory
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = Math.floor(displayWidth * dpr);
    canvas.height = Math.floor(displayHeight * dpr);
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Redraw current active frame immediately after resizing
    const activeFrameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentFrameRef.current))
    );
    renderClosestLoadedFrame(activeFrameIndex);
  }, [renderClosestLoadedFrame]);

  // Load an individual frame with caching
  const loadSingleFrame = useCallback((index: number): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      if (imagesCacheRef.current[index]) {
        resolve(imagesCacheRef.current[index]!);
        return;
      }

      const img = new window.Image();
      img.src = getFramePath(index);
      img.onload = () => {
        if (!isComponentMountedRef.current) return;
        imagesCacheRef.current[index] = img;
        loadedFlagsRef.current[index] = true;
        resolve(img);
      };
      img.onerror = () => {
        // In case of error, mark not loaded and resolve
        resolve(img);
      };
      imagesCacheRef.current[index] = img;
    });
  }, []);

  // Initial setup, progressive preloader, and render loop
  useEffect(() => {
    isComponentMountedRef.current = true;
    handleResize();

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- PHASE 1: Load frame 001 immediately and render it ---
    loadSingleFrame(0).then((firstImg) => {
      if (isComponentMountedRef.current) {
        setInitialFrameLoaded(true);
        renderFrame(firstImg);
      }
    });

    // --- PHASE 2: Load initial burst of nearby frames (0 to 12) ---
    for (let i = 1; i <= 12; i++) {
      loadSingleFrame(i);
    }

    // --- PHASE 3: Progressive background preloader queue ---
    let preloadedCount = 0;
    const preloadRestOfFrames = () => {
      let currentIndex = 13;
      const batchSize = 6;

      const loadNextBatch = () => {
        if (!isComponentMountedRef.current || currentIndex >= TOTAL_FRAMES) return;

        const promises: Promise<HTMLImageElement>[] = [];
        for (let i = 0; i < batchSize && currentIndex < TOTAL_FRAMES; i++, currentIndex++) {
          promises.push(loadSingleFrame(currentIndex));
        }

        Promise.all(promises).then(() => {
          if (!isComponentMountedRef.current) return;
          preloadedCount += batchSize;
          setLoadPercent(Math.min(100, Math.round((preloadedCount / TOTAL_FRAMES) * 100)));

          // Use requestIdleCallback or setTimeout for gentle non-blocking loading
          if (typeof window.requestIdleCallback !== "undefined") {
            window.requestIdleCallback(loadNextBatch, { timeout: 80 });
          } else {
            setTimeout(loadNextBatch, 35);
          }
        });
      };

      loadNextBatch();
    };

    // Begin background preloading after brief delay so hero rendering takes priority
    const bgPreloadTimeout = setTimeout(preloadRestOfFrames, 250);

    // --- SCROLL PROGRESS LISTENER ---
    const updateScrollState = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - viewportHeight;

      if (totalScrollableDistance <= 0) return;

      // Calculate progress from 0 (section enters top) to 1 (section finishes)
      const scrolledPastTop = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolledPastTop / totalScrollableDistance));

      setScrollProgress(progress);
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

      // Prioritize loading frames near current scroll position (±15 frames)
      const currentTarget = Math.round(targetFrameRef.current);
      const start = Math.max(0, currentTarget - 12);
      const end = Math.min(TOTAL_FRAMES - 1, currentTarget + 12);
      for (let f = start; f <= end; f++) {
        if (!loadedFlagsRef.current[f]) {
          loadSingleFrame(f);
        }
      }
    };

    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Initial check
    updateScrollState();

    // --- PERSISTENT ANIMATION RENDER LOOP ---
    let lastRenderedIndex = -1;

    const renderLoop = () => {
      if (!isComponentMountedRef.current) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (prefersReducedMotion) {
        // In reduced motion, snap directly to target frame
        currentFrameRef.current = target;
      } else {
        // Silky smooth lerp interpolation
        const diff = target - current;
        if (Math.abs(diff) > 0.001) {
          currentFrameRef.current += diff * SMOOTHING_FACTOR;
        } else {
          currentFrameRef.current = target;
        }
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      // Only redraw if frame index changed or needs refreshing
      if (frameIndex !== lastRenderedIndex) {
        renderClosestLoadedFrame(frameIndex);
        lastRenderedIndex = frameIndex;
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isComponentMountedRef.current = false;
      clearTimeout(bgPreloadTimeout);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [handleResize, loadSingleFrame, renderClosestLoadedFrame, renderFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#faedf1] text-[#281920]"
      style={{ height: "500vh" }}
      aria-label="Sparsha Cinematic Story Scroll Sequence"
    >
      {/* Sticky Fullscreen Viewport Container */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden bg-gradient-to-b from-[#fbf2f5] via-[#f9e5ec] to-[#faedf1]">
        {/* HTML5 High-DPI Canvas */}
        <canvas
          ref={canvasRef}
          className="block h-full w-full object-cover select-none pointer-events-none"
        />

        {/* Soft edge ambient light vignette blending with the rest of the Sparsha theme */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#faedf1]/40 via-transparent to-[#fdf8f9]/30" />

        {/* Minimal Subtle Story Milestones at Key Scroll Progress Points */}
        {/* Milestone 1: Beginning (0% - 20%) */}
        <div
          className={`pointer-events-none absolute top-28 left-6 sm:left-12 max-w-sm transition-all duration-700 ${
            scrollProgress > 0.03 && scrollProgress < 0.28
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-card-wellness backdrop-blur-md">
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

        {/* Milestone 2: Middle (35% - 65%) */}
        <div
          className={`pointer-events-none absolute bottom-24 right-6 sm:right-12 max-w-sm transition-all duration-700 ${
            scrollProgress > 0.38 && scrollProgress < 0.65
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-card-wellness backdrop-blur-md text-right">
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

        {/* Milestone 3: Finale (75% - 98%) */}
        <div
          className={`pointer-events-none absolute bottom-24 left-6 sm:left-12 max-w-sm transition-all duration-700 ${
            scrollProgress > 0.75 && scrollProgress < 0.98
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-card-wellness backdrop-blur-md">
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

        {/* Initial Scroll Prompt Guidance Indicator (fades out after user starts scrolling) */}
        <div
          className={`pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
            scrollProgress < 0.04 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-1.5 rounded-full border border-white/80 bg-white/70 px-4 py-2 backdrop-blur-md shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d81b60]">
              Scroll to explore the journey
            </span>
            <ChevronDown className="h-4 w-4 animate-bounce text-[#d81b60]" />
          </div>
        </div>

        {/* Minimal Frame / Timeline Counter (bottom right) */}
        <div className="pointer-events-none absolute bottom-5 right-5 hidden sm:flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-[10px] font-mono text-[#5a424f] backdrop-blur-md border border-white/70">
          <span className="text-[#d81b60] font-semibold">
            {String(Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current) + 1))).padStart(3, "0")}
          </span>
          <span>/</span>
          <span>{TOTAL_FRAMES}</span>
        </div>
      </div>
    </section>
  );
}
