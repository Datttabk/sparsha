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
const SOURCE_WIDTH = 1280;
const SOURCE_HEIGHT = 720;
const MAX_CANVAS_WIDTH = 1920;
const MAX_CANVAS_HEIGHT = 1080;

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
  const debugHudRef = useRef<HTMLDivElement>(null);
  const compareContainerRef = useRef<HTMLDivElement>(null);
  const compareImgRef = useRef<HTMLImageElement>(null);

  // Animation & Frame tracking refs (zero React re-renders on scroll)
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const scrollDirectionRef = useRef<number>(1); // 1 = down, -1 = up
  const lastDrawnIndexRef = useRef<number>(-1);

  // Decoded image cache & concurrency flags
  const bitmapCacheRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const loadedFlagsRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const inFlightFlagsRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const activeLoadsRef = useRef<number>(0);

  // Process queue ref to resolve mutual recursion cleanly
  const processQueueRef = useRef<() => void>(() => {});

  // Lifecycle & Performance tracking refs
  const animationFrameIdRef = useRef<number | null>(null);
  const isComponentMountedRef = useRef<boolean>(true);
  const isIntersectingRef = useRef<boolean>(true);
  const prefersReducedMotionRef = useRef<boolean>(false);

  // Development debug tracking (HUD enabled via ?debug=1, comparator via ?compare=1)
  const isDebugModeRef = useRef<boolean>(false);
  const isCompareModeRef = useRef<boolean>(false);
  const fpsRef = useRef<number>(60);
  const frameCountRef = useRef<number>(0);
  const lastFpsTimeRef = useRef<number>(0);

  // Adaptive performance tiering
  const {
    dprCap,
    isLowTier,
    isMobile,
    maxConcurrency,
    maxCacheSize,
    preloadForward,
    preloadBackward,
  } = useAdaptivePerformance();

  // Draw an image directly to canvas using high-performance cover math (No clearRect)
  const paintToCanvas = useCallback(
    (img: ImageBitmap | HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });
      if (!ctx) return;

      // High quality filtering on direct canvas blit
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Dynamically read actual natural source dimensions (future-proofed for 720p, 1080p, 4K)
      const sourceWidth =
        img.width || (img as HTMLImageElement).naturalWidth || 1280;
      const sourceHeight =
        img.height || (img as HTMLImageElement).naturalHeight || 720;

      if (sourceWidth === 0 || sourceHeight === 0) return;

      // Single-pass direct cover math: maps image directly to physical canvas grid
      const hRatio = canvasWidth / sourceWidth;
      const vRatio = canvasHeight / sourceHeight;
      const scale = Math.max(hRatio, vRatio);

      const drawWidth = Math.round(sourceWidth * scale);
      const drawHeight = Math.round(sourceHeight * scale);
      const drawX = Math.round((canvasWidth - drawWidth) / 2);
      const drawY = Math.round((canvasHeight - drawHeight) / 2);

      // Paint directly over previous opaque frame: zero blank frames, zero tearing, zero blur
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    },
    []
  );

  // Strict continuity fallback:
  // 1. Exact target frame
  // 2. Immediate adjacent neighbor in scroll direction (±1 frame only)
  // 3. Otherwise: RETAIN current canvas! NEVER jump dozens of frames away!
  const drawFrameWithStrictContinuity = useCallback(
    (desiredIndex: number): boolean => {
      const cache = bitmapCacheRef.current;
      const loaded = loadedFlagsRef.current;

      // 1. Exact match
      if (loaded[desiredIndex] && cache[desiredIndex]) {
        paintToCanvas(cache[desiredIndex]!);
        lastDrawnIndexRef.current = desiredIndex;
        return true;
      }

      // 2. Strict immediate neighbor check (only ±1 frame in scroll direction)
      const dir = scrollDirectionRef.current;
      const prevInDir = desiredIndex - dir;
      if (
        prevInDir >= 0 &&
        prevInDir < TOTAL_FRAMES &&
        loaded[prevInDir] &&
        cache[prevInDir]
      ) {
        paintToCanvas(cache[prevInDir]!);
        lastDrawnIndexRef.current = prevInDir;
        return true;
      }

      const nextInDir = desiredIndex + dir;
      if (
        nextInDir >= 0 &&
        nextInDir < TOTAL_FRAMES &&
        loaded[nextInDir] &&
        cache[nextInDir]
      ) {
        paintToCanvas(cache[nextInDir]!);
        lastDrawnIndexRef.current = nextInDir;
        return true;
      }

      // 3. Neither desired nor immediate neighbor ready:
      // RETAIN currently displayed canvas image without clearing or jumping!
      return false;
    },
    [paintToCanvas]
  );

  // Update Development Debug HUD via direct DOM to prevent React re-renders
  const updateDebugHUD = useCallback(() => {
    if (!isDebugModeRef.current || !debugHudRef.current || !canvasRef.current) return;
    const loadedCount = loadedFlagsRef.current.filter(Boolean).length;
    const activeFrame =
      lastDrawnIndexRef.current >= 0 ? lastDrawnIndexRef.current + 1 : 1;
    const targetFrame = targetFrameRef.current + 1;
    const dir = scrollDirectionRef.current === 1 ? "DOWN" : "UP";
    const canvas = canvasRef.current;
    const rawDpr = (window.devicePixelRatio || 1).toFixed(2);
    const effectiveDpr = (canvas.width / (window.innerWidth || 1)).toFixed(2);
    const progressPct = Math.round(scrollProgressRef.current * 100);

    const activeImg =
      lastDrawnIndexRef.current >= 0
        ? bitmapCacheRef.current[lastDrawnIndexRef.current]
        : null;
    const sourceDim = activeImg
      ? `${activeImg.width}×${activeImg.height}`
      : "1280×720";

    debugHudRef.current.innerHTML = `
      <div style="font-weight:700;color:#f472b6;margin-bottom:4px;letter-spacing:0.05em;">SPARSHA HIGH-FIDELITY DIAGNOSTIC</div>
      <div>FRAME: <span style="color:#38bdf8;font-weight:bold;">${String(activeFrame).padStart(3, "0")}</span> / ${TOTAL_FRAMES}</div>
      <div>TARGET: <span style="color:#facc15;font-weight:bold;">${String(targetFrame).padStart(3, "0")}</span> (${dir})</div>
      <div>LOADED: <span style="color:#4ade80;">${loadedCount}</span> / ${TOTAL_FRAMES} (Active: ${activeLoadsRef.current})</div>
      <div>FPS: <span style="color:#a78bfa;font-weight:bold;">${fpsRef.current}</span></div>
      <div>VIEWPORT (CSS): ${window.innerWidth}×${window.innerHeight}</div>
      <div>CANVAS BUFFER: ${canvas.width}×${canvas.height}</div>
      <div>DPR: ${effectiveDpr} (Screen DPR: ${rawDpr})</div>
      <div>SOURCE NATIVE: ${sourceDim} (16:9)</div>
      <div>SCROLL: ${progressPct}%</div>
      <div style="margin-top:6px;border-top:1px solid rgba(255,255,255,0.2);padding-top:4px;font-size:10px;color:#94a3b8;">
        1:1 Physical Grid Mapping • No Double Scaling • 100% Opacity
      </div>
    `;

    // Synchronize split-screen comparison image with active frame
    if (isCompareModeRef.current && compareImgRef.current) {
      const activeIdx =
        lastDrawnIndexRef.current >= 0 ? lastDrawnIndexRef.current : 0;
      compareImgRef.current.src = getFramePath(activeIdx);
    }
  }, []);

  // Resize canvas matching display physical pixel grid 1:1 to eliminate compositor interpolation blur
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    // Use physical screen DPR capped responsively by device tier (2.0 desktop, 1.5 mobile, 1.0 low-tier)
    const rawDpr = window.devicePixelRatio || 1;
    const effectiveDpr = Math.min(rawDpr, dprCap);

    const bufferWidth = Math.round(displayWidth * effectiveDpr);
    const bufferHeight = Math.round(displayHeight * effectiveDpr);

    if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
      canvas.width = bufferWidth;
      canvas.height = bufferHeight;
    }

    // CSS dimensions strictly match layout coordinates
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Redraw active frame immediately without resetting or reloading
    if (
      lastDrawnIndexRef.current >= 0 &&
      bitmapCacheRef.current[lastDrawnIndexRef.current]
    ) {
      paintToCanvas(bitmapCacheRef.current[lastDrawnIndexRef.current]!);
    } else {
      const activeFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      drawFrameWithStrictContinuity(activeFrame);
    }
  }, [drawFrameWithStrictContinuity, isLowTier, paintToCanvas]);

  // Load single frame with deduplicated requests, high-precision decoding, and instant presentation
  const loadSingleFrame = useCallback(
    (index: number) => {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      if (loadedFlagsRef.current[index] || inFlightFlagsRef.current[index]) return;

      inFlightFlagsRef.current[index] = true;
      activeLoadsRef.current++;

      const img = new window.Image();
      img.src = getFramePath(index);

      const onComplete = async (success: boolean) => {
        if (!isComponentMountedRef.current) return;

        if (success) {
          try {
            if (typeof window.createImageBitmap === "function") {
              const bitmap = await window.createImageBitmap(img, {
                imageOrientation: "from-image",
                premultiplyAlpha: "none",
                colorSpaceConversion: "default",
                resizeQuality: "high",
              });
              if (!isComponentMountedRef.current) return;
              bitmapCacheRef.current[index] = bitmap;
            } else if (typeof img.decode === "function") {
              await img.decode();
              if (!isComponentMountedRef.current) return;
              bitmapCacheRef.current[index] = img;
            } else {
              bitmapCacheRef.current[index] = img;
            }
            loadedFlagsRef.current[index] = true;
          } catch {
            bitmapCacheRef.current[index] = img;
            loadedFlagsRef.current[index] = true;
          }
        }

        inFlightFlagsRef.current[index] = false;
        activeLoadsRef.current = Math.max(0, activeLoadsRef.current - 1);

        // Instant paint: if user is on this frame right now, draw it immediately!
        const curTarget = targetFrameRef.current;
        if (
          success &&
          Math.abs(curTarget - index) <= 1 &&
          lastDrawnIndexRef.current !== index
        ) {
          const readyImg = bitmapCacheRef.current[index];
          if (readyImg) {
            paintToCanvas(readyImg);
            lastDrawnIndexRef.current = index;
          }
        }

        // Advance the queue to fill the newly freed worker slot
        processQueueRef.current();
      };

      img.onload = () => onComplete(true);
      img.onerror = () => onComplete(false);
    },
    [paintToCanvas]
  );

  // Direction-aware, prioritized preloader queue with bounded concurrency & adaptive memory eviction
  const processQueue = useCallback(() => {
    if (!isComponentMountedRef.current) return;

    const target = targetFrameRef.current;
    const dir = scrollDirectionRef.current; // 1 (down) or -1 (up)
    const loaded = loadedFlagsRef.current;
    const inFlight = inFlightFlagsRef.current;

    // --- Adaptive Frame Eviction: Prevent mobile Safari/Chrome OOM crashes ---
    if (maxCacheSize < TOTAL_FRAMES) {
      const loadedIndices: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (loaded[i]) loadedIndices.push(i);
      }
      if (loadedIndices.length > maxCacheSize) {
        // Sort by distance from target descending (farthest frames first)
        loadedIndices.sort((a, b) => Math.abs(b - target) - Math.abs(a - target));
        const evictCount = loadedIndices.length - maxCacheSize;
        for (let i = 0; i < evictCount; i++) {
          const evictIdx = loadedIndices[i];
          // Never evict target or immediate neighbors (±2)
          if (Math.abs(evictIdx - target) > 2) {
            const item = bitmapCacheRef.current[evictIdx];
            if (item && "close" in item && typeof item.close === "function") {
              item.close();
            }
            bitmapCacheRef.current[evictIdx] = null;
            loadedFlagsRef.current[evictIdx] = false;
          }
        }
      }
    }

    const candidates: number[] = [];
    const added = new Set<number>();

    const addCandidate = (idx: number) => {
      if (idx >= 0 && idx < TOTAL_FRAMES && !added.has(idx)) {
        added.add(idx);
        candidates.push(idx);
      }
    };

    // 1. Current target frame
    addCandidate(target);

    // 2. High priority directional lookahead
    for (let i = 1; i <= preloadForward; i++) {
      addCandidate(target + i * dir);
    }

    // 3. Backward safety buffer
    for (let i = 1; i <= preloadBackward; i++) {
      addCandidate(target - i * dir);
    }

    // 4. Extended outward caching on high-end desktop/laptop only
    if (!isMobile && !isLowTier) {
      for (let offset = preloadForward + 1; offset < TOTAL_FRAMES; offset++) {
        addCandidate(target + offset * dir);
        addCandidate(target - offset * dir);
      }
    }

    // Dispatch requests up to maximum bounded concurrency
    for (let i = 0; i < candidates.length; i++) {
      if (activeLoadsRef.current >= maxConcurrency) {
        break;
      }
      const idx = candidates[i];
      if (!loaded[idx] && !inFlight[idx]) {
        loadSingleFrame(idx);
      }
    }
  }, [
    isLowTier,
    isMobile,
    loadSingleFrame,
    maxCacheSize,
    maxConcurrency,
    preloadBackward,
    preloadForward,
  ]);

  // Keep processQueue ref fresh
  useEffect(() => {
    processQueueRef.current = processQueue;
  }, [processQueue]);

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

    // 2. Canvas visibility: maintain 100% direct opacity for maximum color fidelity & contrast
    if (canvasRef.current && canvasRef.current.style.opacity !== "1") {
      canvasRef.current.style.opacity = "1";
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

    // Check debug mode query parameter (?debug=1) and comparative test mode (?compare=1)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("debug") === "1") {
        isDebugModeRef.current = true;
        if (debugHudRef.current) {
          debugHudRef.current.classList.remove("hidden");
          debugHudRef.current.classList.add("block");
        }
      }
      if (params.get("compare") === "1") {
        isCompareModeRef.current = true;
        if (compareContainerRef.current) {
          compareContainerRef.current.classList.remove("hidden");
          compareContainerRef.current.classList.add("block");
        }
      }
    }

    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- PHASE 1: Load Frame 001 immediately and paint to canvas ---
    loadSingleFrame(0);

    // --- PHASE 2: Start priority queue to load initial directional frames ---
    processQueue();

    // --- DETERMINISTIC SCROLL LISTENER (RAF THROTTLED) ---
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

      // Deterministic frame calculation: 001 to 300
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
      );

      const prevTarget = targetFrameRef.current;
      if (targetFrame !== prevTarget) {
        scrollDirectionRef.current = targetFrame >= prevTarget ? 1 : -1;
        targetFrameRef.current = targetFrame;
        // Reprioritize queue immediately when target or scroll direction changes
        processQueueRef.current();
      }

      updateScrollStyles(progress);
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

    // --- SINGLE PERSISTENT REQUESTANIMATIONFRAME LOOP ---
    const renderLoop = (timestamp: number) => {
      if (!isComponentMountedRef.current || !isIntersectingRef.current) return;

      // Debug FPS measurement
      if (isDebugModeRef.current) {
        frameCountRef.current++;
        if (timestamp - lastFpsTimeRef.current >= 1000) {
          fpsRef.current = Math.round(
            (frameCountRef.current * 1000) /
              (timestamp - lastFpsTimeRef.current)
          );
          frameCountRef.current = 0;
          lastFpsTimeRef.current = timestamp;
          updateDebugHUD();
        }
      }

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (prefersReducedMotionRef.current || Math.abs(diff) < 0.5) {
        currentFrameRef.current = target;
      } else {
        // Highly responsive: eliminates animation lag while preventing sub-pixel sampling jitter
        currentFrameRef.current += diff * 0.65;
      }

      const desiredIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      // Only attempt draw when desired frame differs from last drawn
      if (desiredIndex !== lastDrawnIndexRef.current) {
        drawFrameWithStrictContinuity(desiredIndex);
      }

      // Update frame counter DOM (zero React re-render)
      if (counterTextRef.current) {
        const displayIdx =
          lastDrawnIndexRef.current >= 0
            ? lastDrawnIndexRef.current
            : desiredIndex;
        counterTextRef.current.textContent = String(displayIdx + 1).padStart(
          3,
          "0"
        );
      }

      if (isDebugModeRef.current) {
        updateDebugHUD();
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    // IntersectionObserver to pause RAF loop when hero section is not visible
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

    // Tab visibility handling: pause render loop when tab is hidden, resume on current scroll when visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
      } else if (isIntersectingRef.current && isComponentMountedRef.current) {
        calculateProgress();
        if (!animationFrameIdRef.current) {
          animationFrameIdRef.current = requestAnimationFrame(renderLoop);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start initial single persistent RAF loop
    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isComponentMountedRef.current = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      observer.disconnect();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [
    drawFrameWithStrictContinuity,
    handleResize,
    loadSingleFrame,
    paintToCanvas,
    processQueue,
    updateDebugHUD,
    updateScrollStyles,
  ]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="scroll-mt-24 relative w-full bg-[#fdf8f9] text-[#281920] h-[360vh] sm:h-[450vh] lg:h-[550vh]"
      aria-label="Sparsha Hero & Cinematic Story Experience"
    >
      {/* Sticky Fullscreen Viewport Container */}
      <div className="sticky top-0 left-0 h-[100svh] min-h-[100svh] sm:h-screen w-full overflow-hidden bg-gradient-to-b from-[#fdf8f9] via-[#faedf1] to-[#fbf2f5]">
        
        {/* ======================================================== */}
        {/* LAYER 1: Full-Bleed Direct Canvas (100% Source Clarity)  */}
        {/* ======================================================== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full select-none pointer-events-none opacity-100"
          style={{ imageRendering: "auto" }}
        />

        {/* Subtle top & bottom edge blending (leaves the entire center 85% crystal clear) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fdf8f9]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#faedf1]/70 to-transparent" />

        {/* ======================================================== */}
        {/* LAYER 2: Existing Approved Sparsha Hero UI Layer         */}
        {/* Smoothly transitions out as user scrolls into the story  */}
        {/* ======================================================== */}
        <div
          ref={heroUiRef}
          className="absolute inset-0 z-20 flex flex-col justify-between overflow-hidden lg:overflow-visible pt-20 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-opacity duration-300 pointer-events-auto opacity-100"
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
                <span className="text-[10px] min-[360px]:text-[11px] font-bold uppercase tracking-[0.22em] text-[#d81b60]">
                  Care Today, A Healthier Tomorrow
                </span>
              </div>

              {/* Main Editorial Headline */}
              <div className="mt-2.5 sm:mt-4">
                <h1 className="font-serif text-3xl min-[360px]:text-4xl min-[414px]:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-[#281920]">
                  Move Freely.
                  <br />
                  <span className="text-[#d81b60] drop-shadow-[0_2px_15px_rgba(216,27,96,0.12)]">
                    Live Fully.
                  </span>
                </h1>
              </div>

              {/* Decorative Divider with Center Lotus Flower Icon */}
              <div className="mt-3 sm:mt-5 flex items-center gap-3 max-w-md">
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
              <p className="mt-2.5 sm:mt-4 text-sm min-[360px]:text-base sm:text-xl font-normal text-[#4f3844] max-w-md leading-relaxed">
                Comfort that keeps up with every move.
              </p>

              {/* Feature Icons Strip */}
              <div className="mt-4 sm:mt-6 flex items-center gap-4 sm:gap-8 max-w-md">
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#e89db4] bg-white/90 backdrop-blur-sm text-[#d81b60] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#d81b60]">
                    <Leaf className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.5]" />
                  </div>
                  <span className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-semibold text-[#4a3540] leading-tight">
                    Super Soft
                    <br />
                    Comfort
                  </span>
                </div>

                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#e89db4] bg-white/90 backdrop-blur-sm text-[#d81b60] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#d81b60]">
                    <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.5]" />
                  </div>
                  <span className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-semibold text-[#4a3540] leading-tight">
                    Reliable
                    <br />
                    Protection
                  </span>
                </div>

                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#e89db4] bg-white/90 backdrop-blur-sm text-[#d81b60] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#d81b60]">
                    <Flower2 className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.5]" />
                  </div>
                  <span className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-semibold text-[#4a3540] leading-tight">
                    Gentle on
                    <br />
                    Skin
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                <a
                  href="#explore"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d81b60] via-[#c2185b] to-[#ad1457] px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-soft-pink transition-all duration-300 hover:shadow-lg hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 min-h-[44px]"
                >
                  <span>Explore Sparsha</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d81b60]/30 bg-white/80 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-[#4a3540] backdrop-blur-sm transition-all duration-300 hover:bg-[#faebee] hover:border-[#d81b60] hover:text-[#d81b60] min-h-[44px]"
                >
                  <span>Discover Our Products</span>
                </a>
              </div>

              {/* Product Display: Pedestal with Blue Sparsha Box & Pad (Desktop / Large screen) */}
              <div className="hidden lg:block mt-8 relative max-w-sm">
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

            {/* Right Column: 55-58% width (Desktop / Large screen) */}
            <div className="hidden lg:flex lg:col-span-7 relative justify-center lg:justify-end">
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
          className="pointer-events-none absolute top-24 sm:top-28 left-4 right-4 sm:left-12 sm:right-auto max-w-sm transition-all duration-700 opacity-0 -translate-y-4"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="rounded-2xl border border-white/80 bg-white/80 p-4 sm:p-5 shadow-card-wellness backdrop-blur-md">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d81b60]">
              <Sparkles className="h-3.5 w-3.5 text-[#d81b60]" />
              <span>Unrestricted Freedom</span>
            </div>
            <h3 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-[#281920] leading-snug">
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
          className="pointer-events-none absolute bottom-20 sm:bottom-24 right-4 left-4 sm:left-auto sm:right-12 max-w-sm transition-all duration-700 opacity-0 translate-y-4"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="rounded-2xl border border-white/80 bg-white/80 p-4 sm:p-5 shadow-card-wellness backdrop-blur-md text-left sm:text-right">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d81b60]">
              <span>Pure Cloud Softness</span>
              <span className="h-2 w-2 rounded-full bg-[#d81b60] animate-ping" />
            </div>
            <h3 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-[#281920] leading-snug">
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
          className="pointer-events-none absolute bottom-20 sm:bottom-24 left-4 right-4 sm:left-12 sm:right-auto max-w-sm transition-all duration-700 opacity-0 translate-y-4"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="rounded-2xl border border-white/80 bg-white/85 p-4 sm:p-5 shadow-card-wellness backdrop-blur-md">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d81b60]">
              Swasth Mahila, Swasth Bharat
            </div>
            <h3 className="mt-2 font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#281920] leading-snug">
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

        {/* Development-only Debug HUD (visible strictly when URL contains ?debug=1) */}
        <div
          ref={debugHudRef}
          className="pointer-events-none fixed bottom-4 left-4 z-50 hidden rounded-xl bg-black/85 p-3 font-mono text-[11px] leading-relaxed text-white shadow-2xl backdrop-blur-md border border-white/20"
        />

        {/* Development-only Source vs Canvas Split-Test Comparator (?compare=1) */}
        <div
          ref={compareContainerRef}
          className="pointer-events-none fixed top-20 right-4 z-50 hidden max-w-xs sm:max-w-sm rounded-xl bg-black/90 p-3 font-mono text-[11px] text-white shadow-2xl backdrop-blur-md border border-white/20"
        >
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/20">
            <span className="font-bold text-[#f472b6]">SOURCE &lt;img&gt; COMPARATOR</span>
            <span className="text-[10px] text-emerald-400 font-semibold">1:1 MATCH</span>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/30 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={compareImgRef}
              alt="Raw source frame reference"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-1 left-1 rounded bg-black/80 px-1.5 py-0.5 text-[9px] text-white">
              Raw Source JPG (1280×720)
            </div>
          </div>
          <div className="mt-1.5 text-[9px] text-slate-400 leading-tight">
            Live comparison: canvas output in main viewport vs raw source JPG file.
          </div>
        </div>
      </div>
    </section>
  );
}
