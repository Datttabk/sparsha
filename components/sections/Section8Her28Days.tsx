"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart, Activity, ShieldCheck, MessageCircle } from "lucide-react";

export default function Section8Her28Days() {
  const [activePhase, setActivePhase] = useState<number>(0);

  const categories = [
    { name: "Period Health", left: "97%", top: "50%", icon: <Heart className="h-3 w-3 text-[#d81b60]" /> },
    { name: "Awareness", left: "64.52%", top: "94.7%", icon: <Sparkles className="h-3 w-3 text-[#d81b60]" /> },
    { name: "Conversations", left: "11.98%", top: "77.63%", icon: <MessageCircle className="h-3 w-3 text-[#d81b60]" /> },
    { name: "Hygiene", left: "11.98%", top: "22.37%", icon: <ShieldCheck className="h-3 w-3 text-[#d81b60]" /> },
    { name: "Hormonal Wellness", left: "64.52%", top: "5.3%", icon: <Activity className="h-3 w-3 text-[#d81b60]" /> },
  ];

  const phases = [
    {
      id: "menstrual",
      name: "1. Menstrual Phase",
      days: "Days 1–5",
      title: "Rest & Renewal",
      desc: "Hormone levels drop as the uterine lining sheds. Your body calls for gentle pacing, warm hydration, and Sparsha XL 280mm maximum leak-lock security.",
      recommendation: "Sparsha XL 280mm (15 Pads) or XXL for heavy flow days.",
      color: "#d81b60",
      transform: "translate(92px, -92px)",
    },
    {
      id: "follicular",
      name: "2. Follicular Phase",
      days: "Days 6–13",
      title: "Rising Vitality",
      desc: "Estrogen levels climb, restoring high physical energy, focus, and skin clarity. An ideal time for ambitious projects, strength workouts, and outdoor agility.",
      recommendation: "Sparsha Regular Trifold for ultra-slim everyday protection.",
      color: "#f43f5e",
      transform: "translate(92px, 92px)",
    },
    {
      id: "ovulation",
      name: "3. Ovulation Phase",
      days: "Days 14–16",
      title: "Peak Confidence",
      desc: "Luteinizing hormone spikes as an egg is released. Peak communication skills, vibrant social energy, and luminous mood define these mid-cycle days.",
      recommendation: "Light breathable daily protection & continuous hydration.",
      color: "#e11d48",
      transform: "translate(-92px, 92px)",
    },
    {
      id: "luteal",
      name: "4. Luteal Phase",
      days: "Days 17–28",
      title: "Reflective Self-Care",
      desc: "Progesterone rises then eases. Focus on nutrient-rich meals, magnesium intake, and gentle rest as your body completes its 28-day rhythm.",
      recommendation: "Sparsha Ultra Soft Night comfort for uninterrupted sleep.",
      color: "#be185d",
      transform: "translate(-92px, -92px)",
    },
  ];

  return (
    <section
      id="her28days"
      className="scroll-mt-24 relative w-full bg-gradient-to-b from-[#fcf4f6] via-[#fcebf0] to-[#fdf8f9] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#f5e4e8] overflow-hidden"
    >
      {/* Soft ambient background lights (GPU single-pass radial gradients) */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(252,231,236,0.75) 0%, rgba(252,231,236,0.2) 45%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-10 right-1/4 h-[480px] w-[480px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250,237,241,0.7) 0%, rgba(250,237,241,0.15) 45%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Continuously Rotating 28-Day Cycle Visualization */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Main Wheel Container with Scroll Entry Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[450px] lg:h-[450px] flex items-center justify-center"
            >
              {/* Outer Decorative Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-200/40 via-white to-rose-200/30 blur-xl pointer-events-none" />

              {/* OUTER CYCLE RING — ROTATES CONTINUOUSLY CLOCKWISE (Slow, Elegant 65s) */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#e8b5c4] pointer-events-none animate-[spin_65s_linear_infinite] motion-reduce:animate-none">
                {/* 5 Orbiting Wellness Category Markers (Positioned along the perimeter) */}
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: cat.left, top: cat.top }}
                  >
                    {/* Counter-rotate inside to keep label upright and readable */}
                    <div className="animate-[spin_65s_linear_infinite_reverse] motion-reduce:animate-none flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[9px] sm:text-[10px] font-bold text-[#6b4759] shadow-sm border border-rose-100 backdrop-blur-sm whitespace-nowrap">
                      {cat.icon}
                      <span>{cat.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* INNER CYCLE RING — ROTATES SUBTLY COUNTER-CLOCKWISE (90s) */}
              <div className="absolute inset-8 sm:inset-10 rounded-full border border-rose-200/80 pointer-events-none animate-[spin_90s_linear_infinite_reverse] motion-reduce:animate-none opacity-80">
                {/* Day 1, Day 15, Day 28 Milestone Dots on Inner Ring */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#d81b60] shadow-sm ring-2 ring-white" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-3 w-3 rounded-full bg-[#f43f5e] shadow-sm ring-2 ring-white" />
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#be185d] shadow-sm ring-2 ring-white" />
              </div>

              {/* 4 INTERACTIVE CYCLE PHASE BUTTONS (Positioned along inner orbit) */}
              {phases.map((phase, idx) => (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(idx)}
                  className={`absolute z-30 flex items-center justify-center rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-bold transition-all duration-300 shadow-sm ${
                    activePhase === idx
                      ? "bg-[#d81b60] text-white scale-110 shadow-lg ring-4 ring-[#faebee]"
                      : "bg-white/95 text-[#4a3540] hover:bg-white hover:scale-105 border border-[#f5e4e8]"
                  }`}
                  style={{
                    transform: phase.transform,
                  }}
                >
                  <span>{phase.days}</span>
                </button>
              ))}

              {/* VISUALLY STABLE CENTER HUB — OFFICIAL HER28DAYS LOGO */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center rounded-full bg-white p-6 shadow-card-wellness border-2 border-white/95 h-44 w-44 sm:h-52 sm:w-52 overflow-hidden">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-1 rounded-2xl overflow-hidden shadow-xs">
                  <Image
                    src="/assets/sparsha-logo.png"
                    alt="Sparsha Official Logo"
                    fill
                    priority
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-contain"
                  />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d81b60] mt-0.5">
                  28 Day Cycle
                </span>
              </div>

            </motion.div>

            {/* Quick Interactive Phase Selector Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-sm">
              {phases.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePhase(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activePhase === idx
                      ? "bg-[#d81b60] text-white shadow-sm"
                      : "bg-white/80 text-[#5a424f] hover:bg-white border border-[#f5e4e8]"
                  }`}
                >
                  {p.name.split(". ")[1]}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#7a606e] mt-3 text-center">
              ✦ Click any phase or day to explore cycle-informed comfort
            </p>
          </div>

          {/* Right Column: Her28Days Narrative & Active Phase Details */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d81b60]">
              The Movement
            </span>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281920] leading-[1.12]">
              Her28Days. <br />
              <span className="text-[#d81b60]">More Than a Product.</span> <br />
              A Movement.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#5a424f] leading-relaxed font-light">
              Through <strong>HER28DAYS</strong>, we create conversations around menstrual health, hygiene, hormonal wellness and self-care.
            </p>

            {/* Dynamic Phase Information Card */}
            <motion.div
              key={phases[activePhase].id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-3xl border border-white/90 bg-white/85 p-6 sm:p-7 shadow-sm backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d81b60]">
                    {phases[activePhase].days}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#281920]">
                    {phases[activePhase].title}
                  </h3>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: phases[activePhase].color }}
                >
                  {phases[activePhase].name.split(". ")[1]}
                </span>
              </div>

              <p className="text-sm text-[#5a424f] leading-relaxed">
                {phases[activePhase].desc}
              </p>

              <div className="mt-5 rounded-2xl bg-[#faedf1] p-4 border border-rose-100 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[#d81b60] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#d81b60] block">
                    Sparsha Recommended Fit:
                  </span>
                  <p className="text-xs text-[#281920] mt-0.5 font-medium">
                    {phases[activePhase].recommendation}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action CTA */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#collection"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d81b60] to-[#c2185b] px-7 py-3 text-sm font-semibold text-white shadow-soft-pink transition-all duration-300 hover:shadow-lg hover:brightness-105"
              >
                <span>Find Your Flow Fit</span>
                <Heart className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
