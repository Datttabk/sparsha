"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Eye, ChevronDown } from "lucide-react";

export default function Section12MissionVision() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | null>(null);

  const toggleTab = (tab: "mission" | "vision") => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <section className="relative w-full bg-[#fbf0f3] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#f5e4e8] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[#faedf1]/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#d81b60]"
          >
            Purpose & Horizon
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281920]"
          >
            Mission & <span className="text-[#d81b60]">Vision</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-[#5a424f] font-light max-w-lg mx-auto"
          >
            The guiding pillars behind every Sparsha innovation and initiative across India.
          </motion.p>
        </div>

        {/* 2 Large Interactive Cards Centered in Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-start">
          
          {/* Card 1: MISSION */}
          <motion.div
            layout
            onClick={() => toggleTab("mission")}
            role="button"
            tabIndex={0}
            aria-expanded={activeTab === "mission"}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleTab("mission");
              }
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              y: -4,
              scale: 1.015,
              transition: { duration: 0.25 },
            }}
            className={`group cursor-pointer rounded-3xl border transition-all duration-400 p-8 sm:p-10 flex flex-col items-center text-center select-none backdrop-blur-md ${
              activeTab === "mission"
                ? "bg-white border-[#d81b60] shadow-[0_20px_45px_-12px_rgba(216,27,96,0.18)] scale-[1.02] ring-2 ring-[#d81b60]/20"
                : "bg-white/80 border-white/95 hover:border-rose-200 hover:bg-white/95 shadow-card-wellness"
            }`}
          >
            {/* Mission Icon */}
            <motion.div
              layout
              animate={{
                scale: activeTab === "mission" ? 1.12 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl mb-5 sm:mb-6 transition-colors duration-300 ${
                activeTab === "mission"
                  ? "bg-[#d81b60] text-white shadow-md shadow-[#d81b60]/25"
                  : "bg-[#faebee] text-[#d81b60] group-hover:scale-105"
              }`}
            >
              <Target className="h-8 w-8 sm:h-10 sm:w-10" />
            </motion.div>

            {/* Title Badge & Name */}
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d81b60]">
              Our Foundation
            </span>
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#281920]">
              Our Mission
            </h3>

            {/* Subtle Affordance Indicator */}
            <div className="mt-4 flex items-center gap-1.5 text-xs text-[#8e7081] group-hover:text-[#d81b60] transition-colors">
              <span className="font-medium">
                {activeTab === "mission" ? "Click to close" : "Click to view mission"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeTab === "mission" ? "rotate-180 text-[#d81b60]" : ""
                }`}
              />
            </div>

            {/* Detailed Content — REVEALED ONLY ON CLICK */}
            <AnimatePresence>
              {activeTab === "mission" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 15, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden w-full pt-6 mt-6 border-t border-rose-100"
                >
                  <span className="inline-block rounded-full bg-[#faebee] px-3.5 py-1 text-xs font-bold text-[#d81b60] mb-3">
                    Accessible Hygiene for All
                  </span>
                  <p className="text-base sm:text-lg text-[#3d2734] leading-relaxed italic font-serif px-2">
                    “To make high-quality menstrual care accessible to every woman while breaking the stigma around periods through awareness, education, and care.”
                  </p>
                  <p className="mt-4 text-xs sm:text-sm text-[#5a424f] leading-relaxed font-sans">
                    Ensuring safe, rash-free, and skin-respectful period protection reaches colleges, offices, and communities across India.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Card 2: VISION */}
          <motion.div
            layout
            onClick={() => toggleTab("vision")}
            role="button"
            tabIndex={0}
            aria-expanded={activeTab === "vision"}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleTab("vision");
              }
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{
              y: -4,
              scale: 1.015,
              transition: { duration: 0.25 },
            }}
            className={`group cursor-pointer rounded-3xl border transition-all duration-400 p-8 sm:p-10 flex flex-col items-center text-center select-none backdrop-blur-md ${
              activeTab === "vision"
                ? "bg-white border-[#d81b60] shadow-[0_20px_45px_-12px_rgba(216,27,96,0.18)] scale-[1.02] ring-2 ring-[#d81b60]/20"
                : "bg-white/80 border-white/95 hover:border-rose-200 hover:bg-white/95 shadow-card-wellness"
            }`}
          >
            {/* Vision Icon */}
            <motion.div
              layout
              animate={{
                scale: activeTab === "vision" ? 1.12 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl mb-5 sm:mb-6 transition-colors duration-300 ${
                activeTab === "vision"
                  ? "bg-[#d81b60] text-white shadow-md shadow-[#d81b60]/25"
                  : "bg-[#faebee] text-[#d81b60] group-hover:scale-105"
              }`}
            >
              <Eye className="h-8 w-8 sm:h-10 sm:w-10" />
            </motion.div>

            {/* Title Badge & Name */}
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d81b60]">
              Our Horizon
            </span>
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#281920]">
              Our Vision
            </h3>

            {/* Subtle Affordance Indicator */}
            <div className="mt-4 flex items-center gap-1.5 text-xs text-[#8e7081] group-hover:text-[#d81b60] transition-colors">
              <span className="font-medium">
                {activeTab === "vision" ? "Click to close" : "Click to view vision"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeTab === "vision" ? "rotate-180 text-[#d81b60]" : ""
                }`}
              />
            </div>

            {/* Detailed Content — REVEALED ONLY ON CLICK */}
            <AnimatePresence>
              {activeTab === "vision" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 15, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden w-full pt-6 mt-6 border-t border-rose-100"
                >
                  <span className="inline-block rounded-full bg-[#faebee] px-3.5 py-1 text-xs font-bold text-[#d81b60] mb-3">
                    Dignity & Health for Every Woman
                  </span>
                  <p className="text-base sm:text-lg text-[#3d2734] leading-relaxed italic font-serif px-2">
                    “To build a future where every woman experiences her period with dignity, confidence, and comfort, leading to a healthier and stronger India.”
                  </p>
                  <p className="mt-4 text-xs sm:text-sm text-[#5a424f] leading-relaxed font-sans">
                    Transforming feminine wellness into a movement of vitality, open dialogue, and uninhibited female potential.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
