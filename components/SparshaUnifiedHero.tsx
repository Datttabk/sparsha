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
const SOURCE_WIDTH = 2544;
const SOURCE_HEIGHT = 1440;

// Programmatically generate zero-padded frame paths (001 -> 300)
const getFramePath = (index: number): string => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${frameNumber}.jpg`;
};

type DrawableFrame = ImageBitmap | HTMLImageElement;

interface FrameEntry {
  status: "idle" | "loading" | "loaded" | "failed";
  data: DrawableFrame | null;
  lastUsed: number;
  abortController?: AbortController;
  requestStartTime?: number;
  requestDuration?: number;
  decodeDuration?: number;
}

export default function SparshaUnifiedHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

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
  const displayedFrameRef = useRef<number>(-1);
  const lastValidFrameRef = useRef<number>(-1);
  const scrollProgressRef = useRef<number>(0);
  const scrollDirectionRef = useRef<number>(1); // 1 = down, -1 = up
  const latestScrollYRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const sectionTopRef = useRef<number>(0);
  const scrollableDistanceRef = useRef<number>(1);

  // Decoded image cache & concurrency management
  const framesRef = useRef<FrameEntry[]>(
    Array.from({ length: TOTAL_FRAMES }, () => ({
      status: "idle",
      data: null,
      lastUsed: 0,
    }))
  );
  const activeLoadsRef = useRef<number>(0);
  const idleCallbackIdRef = useRef<number | null>(null);

  // Function refs for queue scheduler to resolve mutual references cleanly
  const dispatchQueueRef = useRef<() => void>(() => {});

  // Lifecycle & performance tracking refs
  const animationFrameIdRef = useRef<number | null>(null);
  const isComponentMountedRef = useRef<boolean>(true);
  const isIntersectingRef = useRef<boolean>(true);

  const initialFrameTimeRef = useRef<number>(0);

  // Adaptive performance tiering
  const {
    dprCap,
    isLowTier,
    isMobile,
    maxCacheSize,
    maxConcurrency,
  } = useAdaptivePerformance();

  // High-performance canvas blitter with exact aspect-ratio-preserving cover math
  const paintToCanvas = useCallback(
    (frame: DrawableFrame, frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });
      if (!ctx) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const sourceWidth =
        "naturalWidth" in frame
          ? frame.naturalWidth || SOURCE_WIDTH
          : frame.width || SOURCE_WIDTH;
      const sourceHeight =
        "naturalHeight" in frame
          ? frame.naturalHeight || SOURCE_HEIGHT
          : frame.height || SOURCE_HEIGHT;

      if (sourceWidth === 0 || sourceHeight === 0) return;

      // 1:1 Physical Grid Mapping: maps source image directly to canvas buffer without double scaling
      const hRatio = canvasWidth / sourceWidth;
      const vRatio = canvasHeight / sourceHeight;
      const scale = Math.max(hRatio, vRatio);

      const drawWidth = Math.round(sourceWidth * scale);
      const drawHeight = Math.round(sourceHeight * scale);
      const drawX = Math.round((canvasWidth - drawWidth) / 2);
      const drawY = Math.round((canvasHeight - drawHeight) / 2);

      // Paint directly over previous frame (opaque draw, zero clearRect, zero blank/white flash)
      ctx.drawImage(frame, drawX, drawY, drawWidth, drawHeight);

      displayedFrameRef.current = frameIndex;
      lastValidFrameRef.current = frameIndex;

      // Update LRU timestamp
      if (framesRef.current[frameIndex]) {
        framesRef.current[frameIndex].lastUsed = performance.now();
      }

      // Seamlessly fade out critical poster once canvas has rendered
      if (posterRef.current && posterRef.current.style.opacity !== "0") {
        posterRef.current.style.opacity = "0";
      }

      // Update frame counter DOM (zero React re-render)
      if (counterTextRef.current) {
        counterTextRef.current.textContent = String(frameIndex + 1).padStart(
          3,
          "0"
        );
      }
    },
    []
  );

  // Evict excess frames beyond maxCacheSize to prevent memory explosion
  const evictExcessFrames = useCallback(() => {
    const frames = framesRef.current;
    let loadedCount = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (frames[i].status === "loaded" && frames[i].data) {
        loadedCount++;
      }
    }

    if (loadedCount <= maxCacheSize) return;

    const target = targetFrameRef.current;
    const displayed = displayedFrameRef.current;
    const excess = loadedCount - maxCacheSize;

    // Collect candidates for eviction (never evict frame 0, target, displayed, or near neighbors)
    const evictCandidates: { index: number; dist: number; lastUsed: number }[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const entry = frames[i];
      if (entry.status === "loaded" && entry.data) {
        if (i === 0 || i === target || i === displayed || Math.abs(i - target) <= 6) {
          continue;
        }
        evictCandidates.push({
          index: i,
          dist: Math.abs(i - target),
          lastUsed: entry.lastUsed,
        });
      }
    }

    // Sort farthest from target first, then oldest lastUsed
    evictCandidates.sort((a, b) => {
      if (b.dist !== a.dist) return b.dist - a.dist;
      return a.lastUsed - b.lastUsed;
    });

    const toEvict = Math.min(excess, evictCandidates.length);
    for (let i = 0; i < toEvict; i++) {
      const idx = evictCandidates[i].index;
      const entry = frames[idx];
      if (entry.data) {
        if ("close" in entry.data && typeof entry.data.close === "function") {
          entry.data.close();
        }
        entry.data = null;
      }
      entry.status = "idle";
    }
  }, [maxCacheSize]);

  // Load a single frame with deduplicated requests, AbortController, and off-thread decoding
  const loadFrame = useCallback(
    (index: number, isPriority: boolean = false) => {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      const entry = framesRef.current[index];
      if (entry.status === "loading" || entry.status === "loaded") {
        if (entry.status === "loaded") {
          entry.lastUsed = performance.now();
        }
        return;
      }

      const controller = new AbortController();
      entry.status = "loading";
      entry.abortController = controller;
      entry.requestStartTime = performance.now();
      activeLoadsRef.current++;

      const cleanup = () => {
        activeLoadsRef.current = Math.max(0, activeLoadsRef.current - 1);
        if (entry.abortController === controller) {
          entry.abortController = undefined;
        }
      };

      (async () => {
        try {
          const url = getFramePath(index);
          const res = await fetch(url, {
            signal: controller.signal,
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const blob = await res.blob();

          if (!isComponentMountedRef.current || controller.signal.aborted) {
            cleanup();
            return;
          }

          const decodeStart = performance.now();
          let frame: DrawableFrame;

          if (typeof window.createImageBitmap === "function") {
            frame = await createImageBitmap(blob);
          } else {
            frame = await new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new window.Image();
              const objectUrl = URL.createObjectURL(blob);
              img.onload = () => {
                URL.revokeObjectURL(objectUrl);
                resolve(img);
              };
              img.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Image decode failed"));
              };
              img.src = objectUrl;
              if (typeof img.decode === "function") {
                img.decode().catch(() => {});
              }
            });
          }

          if (!isComponentMountedRef.current || controller.signal.aborted) {
            if ("close" in frame && typeof frame.close === "function") {
              frame.close();
            }
            cleanup();
            return;
          }

          const decodeEnd = performance.now();
          entry.decodeDuration = decodeEnd - decodeStart;
          entry.requestDuration = decodeStart - (entry.requestStartTime || decodeStart);
          entry.status = "loaded";
          entry.data = frame;
          entry.lastUsed = performance.now();
          cleanup();

          if (index === 0 && initialFrameTimeRef.current === 0) {
            initialFrameTimeRef.current = Math.round(performance.now());
          }

          // Maintain adaptive memory limits
          evictExcessFrames();

          // Check if this frame should render immediately according to current scroll timeline:
          const currentTarget = targetFrameRef.current;
          const currentDisplayed = displayedFrameRef.current;
          const dir = scrollDirectionRef.current;

          if (index === currentTarget && currentDisplayed !== index) {
            paintToCanvas(frame, index);
          } else if (
            (dir >= 0 && index > currentDisplayed && index <= currentTarget) ||
            (dir < 0 && index < currentDisplayed && index >= currentTarget)
          ) {
            paintToCanvas(frame, index);
          }
        } catch (err: unknown) {
          if ((err as Error)?.name === "AbortError" || controller.signal.aborted) {
            entry.status = "idle";
          } else {
            entry.status = "failed";
          }
          cleanup();
        } finally {
          dispatchQueueRef.current();
        }
      })();
    },
    [evictExcessFrames, paintToCanvas]
  );

  // Background idle streaming: loads remaining frames during browser idle periods
  const scheduleIdlePreload = useCallback(() => {
    if (!isComponentMountedRef.current) return;
    if (activeLoadsRef.current >= 3) return;
    if (idleCallbackIdRef.current !== null) return;

    const runIdle = () => {
      idleCallbackIdRef.current = null;
      if (!isComponentMountedRef.current) return;
      if (activeLoadsRef.current >= 3) return;

      const target = targetFrameRef.current;
      const dir = scrollDirectionRef.current;
      const frames = framesRef.current;

      // Find next unqueued frame in scroll direction
      let candidate = -1;
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const forwardIdx = target + i * dir;
        if (
          forwardIdx >= 0 &&
          forwardIdx < TOTAL_FRAMES &&
          frames[forwardIdx].status === "idle"
        ) {
          candidate = forwardIdx;
          break;
        }
        const backwardIdx = target - i * dir;
        if (
          backwardIdx >= 0 &&
          backwardIdx < TOTAL_FRAMES &&
          frames[backwardIdx].status === "idle"
        ) {
          candidate = backwardIdx;
          break;
        }
      }

      if (candidate !== -1 && frames[candidate].status === "idle") {
        loadFrame(candidate, false);
      }
    };

    if (typeof window !== "undefined") {
      const win = window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      };
      if (typeof win.requestIdleCallback === "function") {
        idleCallbackIdRef.current = win.requestIdleCallback(runIdle, {
          timeout: 400,
        });
      } else {
        idleCallbackIdRef.current = setTimeout(runIdle, 50) as unknown as number;
      }
    }
  }, [loadFrame]);

  // High-Throughput Priority Queue with Dynamic Abort & Deep Lookahead Windowing
  const dispatchQueue = useCallback(() => {
    if (!isComponentMountedRef.current) return;

    const target = targetFrameRef.current;
    const dir = scrollDirectionRef.current; // 1 = down, -1 = up
    const frames = framesRef.current;

    // 1. DYNAMIC ABORT: cancel in-flight requests that are truly obsolete
    // Free slots immediately for the active scroll target
    for (let idx = 0; idx < TOTAL_FRAMES; idx++) {
      const entry = frames[idx];
      if (entry.status === "loading" && entry.abortController && idx !== 0) {
        const dist = Math.abs(idx - target);
        // Only abort if frame is far behind where we are (> 20 frames behind)
        // or way too far ahead (> 80 frames ahead)
        const isStaleBehind = dir === 1 ? idx < target - 20 : idx > target + 20;
        if (dist > 80 || isStaleBehind) {
          entry.abortController.abort();
          entry.status = "idle";
          activeLoadsRef.current = Math.max(0, activeLoadsRef.current - 1);
        }
      }
    }

    // 2. BUILD CANDIDATES IN STRICT PRIORITY ORDER
    const candidates: number[] = [];
    const added = new Set<number>();

    const addCandidate = (idx: number) => {
      if (
        idx >= 0 &&
        idx < TOTAL_FRAMES &&
        !added.has(idx) &&
        frames[idx].status === "idle"
      ) {
        added.add(idx);
        candidates.push(idx);
      }
    };

    // Tier 0: Target frame (Absolute Priority)
    addCandidate(target);

    // Tier 1: Immediate directional lookahead (1 to 12 frames ahead)
    for (let i = 1; i <= 12; i++) {
      addCandidate(target + i * dir);
    }

    // Tier 2: Near safety buffer behind (1 to 6 frames behind)
    for (let i = 1; i <= 6; i++) {
      addCandidate(target - i * dir);
    }

    // Tier 3: Medium forward streaming buffer (13 to 40 frames ahead)
    for (let i = 13; i <= 40; i++) {
      addCandidate(target + i * dir);
    }

    // Tier 4: Extended reverse buffer (7 to 15 frames behind)
    for (let i = 7; i <= 15; i++) {
      addCandidate(target - i * dir);
    }

    // Tier 5: Far predictive forward window (41 to 70 frames ahead)
    for (let i = 41; i <= 70; i++) {
      addCandidate(target + i * dir);
    }

    // 3. DISPATCH HIGH-PRIORITY REQUESTS
    while (activeLoadsRef.current < maxConcurrency && candidates.length > 0) {
      const nextIdx = candidates.shift();
      if (nextIdx !== undefined && frames[nextIdx].status === "idle") {
        loadFrame(nextIdx, nextIdx === target);
      }
    }

    // 4. SCHEDULE IDLE BACKGROUND STREAMING
    scheduleIdlePreload();
  }, [loadFrame, maxConcurrency, scheduleIdlePreload]);

  useEffect(() => {
    dispatchQueueRef.current = dispatchQueue;
  }, [dispatchQueue]);

  // Update geometry measurements and match canvas physical pixel grid
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    // Cache section layout coordinates without reflowing on scroll
    const rect = section.getBoundingClientRect();
    sectionTopRef.current = rect.top + window.scrollY;
    scrollableDistanceRef.current = Math.max(
      1,
      section.offsetHeight - window.innerHeight
    );

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    // Use physical screen DPR capped responsively by device tier (2.0 desktop, 1.5 mobile)
    const rawDpr = window.devicePixelRatio || 1;
    const effectiveDpr = Math.min(rawDpr, dprCap);

    const bufferWidth = Math.round(displayWidth * effectiveDpr);
    const bufferHeight = Math.round(displayHeight * effectiveDpr);

    if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
      canvas.width = bufferWidth;
      canvas.height = bufferHeight;
    }

    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Redraw active frame immediately on resize to maintain sharp output
    const activeIdx = displayedFrameRef.current;
    if (activeIdx >= 0 && framesRef.current[activeIdx]?.data) {
      paintToCanvas(framesRef.current[activeIdx].data!, activeIdx);
    } else {
      const target = targetFrameRef.current;
      if (framesRef.current[target]?.data) {
        paintToCanvas(framesRef.current[target].data!, target);
      }
    }
  }, [dprCap, paintToCanvas]);

  // Directly update DOM styles based on scroll progress (zero React re-renders)
  const updateScrollStyles = useCallback((progress: number) => {
    // 1. Hero UI Layer: 0% to 6% fully visible, 6% to 18% fades out & floats upward
    if (heroUiRef.current) {
      const heroUiOpacity = Math.max(
        0,
        Math.min(1, 1 - (progress - 0.06) / 0.12)
      );
      const heroUiTranslateY = Math.min(
        80,
        Math.max(0, (progress - 0.06) * 400)
      );
      heroUiRef.current.style.opacity = heroUiOpacity.toFixed(3);
      heroUiRef.current.style.transform = `translate3d(0, -${heroUiTranslateY.toFixed(1)}px, 0)`;
      heroUiRef.current.style.pointerEvents =
        heroUiOpacity > 0.08 ? "auto" : "none";
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
    latestScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = performance.now();
    handleResize();

    // --- STARTUP PIPELINE ---
    // 1. Priority load Frame 001 immediately (P0)
    loadFrame(0, true);

    // 2. Start initial queue dispatch with small delay so browser paints initial shell first
    const startupTimer = setTimeout(() => {
      if (isComponentMountedRef.current) {
        dispatchQueueRef.current();
      }
    }, 60);

    // --- LIGHTWEIGHT NATIVE SCROLL LISTENER WITH VELOCITY TRACKING ---
    const onScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      const dt = now - lastScrollTimeRef.current;
      if (dt > 8) {
        velocityRef.current = (y - latestScrollYRef.current) / dt;
        lastScrollTimeRef.current = now;
      }
      latestScrollYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // --- SINGLE AUTHORITATIVE REQUESTANIMATIONFRAME LOOP ---
    const renderLoop = () => {
      if (!isComponentMountedRef.current || !isIntersectingRef.current) return;

      // 1. Calculate scroll progress from cached geometry & latest scroll position (Zero reflow!)
      const scrollY = latestScrollYRef.current;
      const distance = scrollY - sectionTopRef.current;
      const maxDistance = scrollableDistanceRef.current;
      const progress =
        maxDistance > 0 ? Math.min(1, Math.max(0, distance / maxDistance)) : 0;
      scrollProgressRef.current = progress;

      // 2. Deterministic target frame: 0 to 299 (Master timeline driven strictly by scroll)
      const target = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
      );

      const prevTarget = targetFrameRef.current;
      if (target !== prevTarget) {
        scrollDirectionRef.current = target >= prevTarget ? 1 : -1;
        targetFrameRef.current = target;
        dispatchQueueRef.current();
      }

      // 3. Update DOM overlay styles
      updateScrollStyles(progress);

      // 4. AUTHORITATIVE RENDERING:
      const displayed = displayedFrameRef.current;
      if (target !== displayed) {
        const targetEntry = framesRef.current[target];
        if (targetEntry && targetEntry.status === "loaded" && targetEntry.data) {
          // Target is loaded: render immediately!
          paintToCanvas(targetEntry.data, target);
        } else {
          // Target is not loaded yet:
          // Check if an intermediate frame between displayed and target in the scroll direction is available
          let intermediate = -1;
          if (target > displayed) {
            // Scrolling down: find highest loaded frame <= target that is > displayed
            for (let f = target - 1; f > displayed; f--) {
              if (
                framesRef.current[f]?.status === "loaded" &&
                framesRef.current[f]?.data
              ) {
                intermediate = f;
                break;
              }
            }
          } else {
            // Scrolling up: find lowest loaded frame >= target that is < displayed
            for (let f = target + 1; f < displayed; f++) {
              if (
                framesRef.current[f]?.status === "loaded" &&
                framesRef.current[f]?.data
              ) {
                intermediate = f;
                break;
              }
            }
          }

          if (intermediate !== -1 && framesRef.current[intermediate]?.data) {
            paintToCanvas(framesRef.current[intermediate].data!, intermediate);
          }
          // If no intermediate loaded, KEEP LAST VALID FRAME (displayedFrameRef.current).
          // NEVER clear canvas, NEVER flash, NEVER jump to distant unrelated frame.

          if (targetEntry?.status === "idle") {
            dispatchQueueRef.current();
          }
        }
      }

      // Decay velocity when scrolling ceases
      velocityRef.current *= 0.85;

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    // Pause RAF loop when hero section is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasIntersecting = isIntersectingRef.current;
        isIntersectingRef.current = entry.isIntersecting;

        if (entry.isIntersecting && !wasIntersecting) {
          handleResize();
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

    // Tab visibility handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
      } else if (isIntersectingRef.current && isComponentMountedRef.current) {
        latestScrollYRef.current = window.scrollY;
        handleResize();
        if (!animationFrameIdRef.current) {
          animationFrameIdRef.current = requestAnimationFrame(renderLoop);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start single authoritative persistent RAF loop
    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isComponentMountedRef.current = false;
      clearTimeout(startupTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      observer.disconnect();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      if (idleCallbackIdRef.current !== null) {
        if (typeof window !== "undefined") {
          const win = window as unknown as { cancelIdleCallback?: (id: number) => void };
          if (typeof win.cancelIdleCallback === "function") {
            win.cancelIdleCallback(idleCallbackIdRef.current);
          } else {
            clearTimeout(idleCallbackIdRef.current);
          }
        } else {
          clearTimeout(idleCallbackIdRef.current);
        }
        idleCallbackIdRef.current = null;
      }
      // Abort all in-flight requests and close ImageBitmaps
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const entry = framesRef.current[i];
        if (entry.abortController) {
          entry.abortController.abort();
        }
        if (entry.data) {
          if ("close" in entry.data && typeof entry.data.close === "function") {
            entry.data.close();
          }
          entry.data = null;
        }
      }
    };
  }, [
    handleResize,
    loadFrame,
    paintToCanvas,
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
        {/* LAYER 0: Critical First-Frame Poster (Instant 1st Paint)  */}
        {/* ======================================================== */}
        <div
          ref={posterRef}
          className="absolute inset-0 block h-full w-full select-none pointer-events-none transition-opacity duration-300 z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/frames/ezgif-frame-001.jpg"
            alt="Sparsha Hero Product First Frame"
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* ======================================================== */}
        {/* LAYER 1: Full-Bleed Direct Canvas (100% Source Clarity)  */}
        {/* ======================================================== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full select-none pointer-events-none opacity-100 z-[1]"
          style={{ imageRendering: "auto" }}
        />

        {/* Subtle top & bottom edge blending (leaves center crystal clear) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fdf8f9]/70 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#faedf1]/70 to-transparent z-10" />

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

        {/* Milestone 1: Beginning (18% - 42%) */}
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

        {/* Initial Scroll Prompt Guidance (fades out as user begins scrolling) */}
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
