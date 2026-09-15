"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Wand2,
  Cpu,
  Layers,
  Zap,
  SlidersHorizontal,
  Maximize2,
  CheckCircle2,
  Compass,
} from "lucide-react";

interface PresetSample {
  id: string;
  label: string;
  prompt: string;
  aspect: string;
  model: string;
  image: string;
  renderTime: string;
  seed: string;
}

const PRESETS: PresetSample[] = [
  {
    id: "cyberpunk",
    label: "Cyberpunk Android",
    prompt:
      "Celestial android with glowing iridescent violet & orange circuits, crystalline skin, volumetric lighting, 8k octane render",
    aspect: "16:9",
    model: "DreamFrame Ultra v4.2",
    image: "/showcase/hero1.jpg",
    renderTime: "0.38s",
    seed: "982341",
  },
  {
    id: "cosmic",
    label: "Cosmic Dreamscape",
    prompt:
      "Surrealistic cosmic floating crystal citadel, luminescent purple islands, neon orange nebula skies, unreal engine 5, 8k",
    aspect: "16:9",
    model: "DreamFrame XL Photoreal",
    image: "/showcase/hero2.jpg",
    renderTime: "0.45s",
    seed: "774910",
  },
];

export default function HeroSection() {
  const [activePreset, setActivePreset] = useState<PresetSample>(PRESETS[0]);
  const [promptInput, setPromptInput] = useState(PRESETS[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState("16:9");

  const handleSelectPreset = (preset: PresetSample) => {
    setActivePreset(preset);
    setPromptInput(preset.prompt);
  };

  const handleSimulateGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 600);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#06050a] pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Ambient background glows and gradients */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top violet atmospheric glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[800px] rounded-full bg-gradient-to-b from-purple-600/25 via-violet-900/15 to-transparent blur-[140px] animate-glow" />

      {/* Subtle secondary orange rim glow */}
      <div className="pointer-events-none absolute top-1/4 -right-32 h-[450px] w-[450px] rounded-full bg-orange-600/10 blur-[130px]" />

      {/* Subtle bottom magenta/purple glow */}
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-[350px] w-[500px] rounded-full bg-indigo-700/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Availability-Style Pill Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-500/25 bg-purple-950/40 px-3.5 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all hover:border-purple-400/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-200">
              AI IMAGE GENERATOR
            </span>
            <span className="h-1 w-1 rounded-full bg-purple-400/50" />
            <span className="text-[10px] font-medium tracking-wider text-orange-400">
              v4.2 ULTRA LIVE
            </span>
          </div>
        </div>

        {/* Hero Typography: Headline & Supporting Description */}
        <div className="mt-7 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Synthesize Imagination Into{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(249,115,22,0.3)]">
              Hyper-Realistic Art
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg lg:text-xl font-normal leading-relaxed">
            Generate cinematic 8K artwork, photorealistic scenes, and creative
            concepts in milliseconds with our breakthrough neural synthesis engine.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary Orange/Purple CTA */}
            <a
              href="#generate"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Start Creating</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#showcase"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-950/30 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <Compass className="h-4 w-4 text-purple-400" />
              <span>Explore Showcase</span>
            </a>
          </div>
        </div>

        {/* Oversized Editorial Brand Text: DREAMFRAME */}
        <div className="relative mt-12 sm:mt-16 w-full flex justify-center pointer-events-none select-none overflow-hidden">
          <div className="text-center font-black tracking-[-0.04em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.14] via-purple-300/[0.07] to-transparent text-[13vw] leading-none whitespace-nowrap drop-shadow-[0_2px_40px_rgba(168,85,247,0.15)] font-sans">
            DREAMFRAME
          </div>
        </div>

        {/* Central Product Visual: AI Image Generation Studio */}
        <div
          id="generate"
          className="relative -mt-10 sm:-mt-20 md:-mt-24 mx-auto max-w-5xl"
        >
          {/* Outer glow ring around product showcase */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-500/20 via-purple-600/30 to-violet-500/20 blur-xl opacity-75" />

          <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0e0c18]/90 p-3 sm:p-5 shadow-2xl backdrop-blur-2xl">
            {/* Studio Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-white/15 mx-1" />
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                  <Cpu className="h-3.5 w-3.5 text-purple-400" />
                  <span>Model:</span>
                  <span className="font-semibold text-zinc-200">
                    {activePreset.model}
                  </span>
                </div>
              </div>

              {/* Aspect Ratio & Settings */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg border border-white/10 bg-black/40 p-0.5 text-xs">
                  {["16:9", "1:1", "9:16"].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setSelectedRatio(ratio)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                        selectedRatio === ratio
                          ? "bg-purple-600 text-white font-semibold shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>

                <div className="hidden sm:flex items-center gap-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-zinc-400 font-mono">
                  <Zap className="h-3.5 w-3.5 text-orange-400" />
                  <span>Speed: {activePreset.renderTime}</span>
                </div>
              </div>
            </div>

            {/* Interactive Prompt Input Bar */}
            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-xl border border-white/10 bg-black/60 p-2 shadow-inner">
              <div className="flex items-center gap-2 pl-2 text-purple-400">
                <Wand2 className="h-4 w-4 shrink-0 text-orange-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 hidden sm:inline">
                  PROMPT:
                </span>
              </div>

              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="flex-1 bg-transparent px-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:text-white"
                placeholder="Describe anything to synthesize with AI..."
              />

              <button
                onClick={handleSimulateGenerate}
                disabled={isGenerating}
                className="relative flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-purple-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all hover:brightness-110 active:scale-95 disabled:opacity-75"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-3.5 w-3.5 animate-spin text-white" />
                    <span>Rendering...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-orange-200" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>

            {/* Preset Style Selectors */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-mono uppercase text-zinc-500 shrink-0">
                Presets:
              </span>
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`flex items-center gap-1.5 shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
                    activePreset.id === preset.id
                      ? "border border-purple-500 bg-purple-900/50 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                      : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      activePreset.id === preset.id
                        ? "bg-orange-400"
                        : "bg-zinc-500"
                    }`}
                  />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>

            {/* Main AI Generated Artwork Preview Area */}
            <div className="relative mt-4 overflow-hidden rounded-xl border border-white/15 bg-black">
              <div
                className={`relative w-full aspect-[16/9] transition-opacity duration-300 ${
                  isGenerating ? "opacity-30 blur-sm" : "opacity-100"
                }`}
              >
                <Image
                  src={activePreset.image}
                  alt={activePreset.prompt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Subtle vignette gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Top Overlay Badge: Live Render Specs */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-mono text-zinc-300 backdrop-blur-md">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>8K Photoreal</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-mono text-zinc-300 backdrop-blur-md">
                    <span className="text-zinc-400">Seed:</span>
                    <span className="text-orange-300">{activePreset.seed}</span>
                  </div>
                </div>

                {/* Bottom Overlay: Generation Meta & Action */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between gap-4">
                  <div className="max-w-xl rounded-xl border border-white/15 bg-black/60 p-3 backdrop-blur-md">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-orange-400">
                      Active Neural Output
                    </div>
                    <p className="mt-0.5 text-xs sm:text-sm text-zinc-200 line-clamp-2">
                      &ldquo;{activePreset.prompt}&rdquo;
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/15 bg-black/60 p-2 backdrop-blur-md">
                    <button
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                      title="Adjust Parameters"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                      title="Fullscreen Preview"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Generating Loader Animation Overlay */}
              {isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                  <div className="relative flex h-14 w-14 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 border-t-orange-500 animate-spin" />
                    <Sparkles className="h-6 w-6 text-purple-300" />
                  </div>
                  <span className="mt-3 text-xs font-mono uppercase tracking-widest text-zinc-300">
                    Synthesizing Latent Vectors...
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Showcase Footer Information */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 font-mono pt-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Cluster: 2,048 H100 Tensor Nodes
                </span>
                <span className="hidden sm:inline text-zinc-600">•</span>
                <span className="hidden sm:inline">CFG Scale: 7.5</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Layers className="h-3.5 w-3.5" />
                <span>Zero Latent Degradation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Capability Highlights Bar Below Product Visual */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-purple-500/30 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 mb-2.5">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-base font-bold text-white">0.38s Ultra-Fast</span>
              <span className="text-xs text-zinc-400 mt-1">
                Real-time sub-second generation
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-purple-500/30 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mb-2.5">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-base font-bold text-white">8K Cinema Quality</span>
              <span className="text-xs text-zinc-400 mt-1">
                Octane-grade lighting & detail
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-purple-500/30 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 mb-2.5">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-base font-bold text-white">Neural Fidelity</span>
              <span className="text-xs text-zinc-400 mt-1">
                Exact prompt & style adherence
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-purple-500/30 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 mb-2.5">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-base font-bold text-white">Infinite Aspect</span>
              <span className="text-xs text-zinc-400 mt-1">
                Custom canvas resolutions & ratios
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
