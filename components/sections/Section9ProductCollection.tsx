"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, HelpCircle, X, Check } from "lucide-react";

export default function Section9ProductCollection() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [selectedFlow, setSelectedFlow] = useState<string>("");
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Authoritative real Sparsha product photography supplied by user
  const products = [
    {
      id: "ultra-soft-xl",
      name: "Sparsha Ultra Soft XL",
      size: "280 mm • 15 Pads",
      desc: "Daytime leak protection with ultra-absorbent core and dermatologically certified cottony comfort.",
      image: "/assets/sparsha-blue-280-front.jpg",
      badge: "Flagship Pack",
      accent: "#d81b60",
    },
    {
      id: "premium-trifold",
      name: "Sparsha Premium Trifold",
      size: "Regular • 7 Trifold Pads",
      desc: "Ultra-thin cottony soft portability with protective dry ultra-safe technology for active days.",
      image: "/assets/sparsha-green-trifold-front.jpg",
      badge: "Active Mobility",
      accent: "#059669",
    },
    {
      id: "ultra-soft-contour",
      name: "Sparsha Ultra Soft Contour",
      size: "280 mm • 15 Pads",
      desc: "Ergonomically contoured pad with 3D side leak barriers for full movement confidence.",
      image: "/assets/sparsha-blue-280-perspective.jpg",
      badge: "Contour Fit",
      accent: "#2563eb",
    },
    {
      id: "trifold-compact",
      name: "Sparsha Trifold Ultra Thin",
      size: "Compact • 7 Pads",
      desc: "Feather-light absorption channels with discreet trifold convenience for bags and travel.",
      image: "/assets/sparsha-green-trifold-angled.jpg",
      badge: "Travel Ready",
      accent: "#0d9488",
    },
  ];

  const handleQuizAnswer = (flow: string) => {
    setSelectedFlow(flow);
    if (flow === "light") setQuizResult("Sparsha Premium Trifold (7 Pads)");
    else if (flow === "medium") setQuizResult("Sparsha Ultra Soft XL 280 mm (15 Pads)");
    else if (flow === "heavy") setQuizResult("Sparsha Ultra Soft Contour 280 mm");
    else setQuizResult("Sparsha Ultra Soft XL 280 mm Day & Night");
    setQuizStep(2);
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setSelectedFlow("");
    setQuizResult(null);
  };

  return (
    <section
      id="collection"
      className="relative w-full bg-[#fdf8f9] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#f5e4e8] overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-24 right-1/3 h-[500px] w-[500px] rounded-full bg-[#faedf1]/80 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-[450px] w-[450px] rounded-full bg-[#fce7ec]/70 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#d81b60]"
          >
            Tailored Comfort
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281920]"
          >
            Find Your <span className="text-[#d81b60]">Comfort.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#5a424f] leading-relaxed max-w-2xl mx-auto font-light"
          >
            From lightweight active, delight routine to 360° overnight leak protection, choose the fit created for your flow.
          </motion.p>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {products.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 35px -10px rgba(216, 27, 96, 0.15)",
                transition: { duration: 0.3 },
              }}
              className="group relative rounded-3xl border border-white/90 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 flex flex-col justify-between hover:border-rose-200"
            >
              {/* Variant Badge */}
              {item.badge && (
                <div className="absolute top-4 right-4 z-10 rounded-full bg-[#d81b60] px-3 py-1 text-[10px] font-bold text-white shadow-sm tracking-wide">
                  {item.badge}
                </div>
              )}

              <div>
                {/* Size Pill */}
                <span className="inline-block rounded-full bg-[#faebee] px-3 py-1 text-xs font-bold text-[#d81b60]">
                  {item.size}
                </span>

                {/* Actual Real Product Photography (object-contain, uncropped, authentic packaging) */}
                <div className="relative aspect-[4/3] sm:aspect-square w-full my-5 flex items-center justify-center rounded-2xl bg-[#faf4f6]/50 overflow-hidden p-3">
                  <motion.div
                    initial={{ scale: 0.96 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-md"
                    />
                  </motion.div>
                </div>

                {/* Name & Purpose */}
                <h3 className="font-serif text-xl font-bold text-[#281920] group-hover:text-[#d81b60] transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs text-[#5a424f] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Card Action CTA */}
              <div className="mt-6 pt-4 border-t border-[#f5e4e8]">
                <button
                  onClick={() => setQuizOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#faedf1] py-2.5 text-xs font-bold text-[#d81b60] transition-all duration-300 group-hover:bg-[#d81b60] group-hover:text-white shadow-sm"
                >
                  <span>Select Your Size</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 1-Minute Fit Quiz Trigger Banner */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => {
              resetQuiz();
              setQuizOpen(true);
            }}
            className="inline-flex items-center gap-3 rounded-full bg-white/90 border border-rose-200 px-6 py-3 text-xs sm:text-sm font-semibold text-[#4a3540] shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-[#d81b60] hover:text-[#d81b60]"
          >
            <HelpCircle className="h-4 w-4 text-[#d81b60]" />
            <span>Unsure about your flow size? Take the 1-Minute Fit Quiz</span>
            <ArrowRight className="h-4 w-4 text-[#d81b60]" />
          </button>
        </div>
      </div>

      {/* Fit Quiz Modal (Interactive & Accessible) */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-rose-100">
            <button
              onClick={() => setQuizOpen(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-rose-50 flex items-center justify-center text-[#5a424f] hover:bg-rose-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {quizStep === 1 ? (
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#d81b60]">
                  1-Minute Fit Finder
                </span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-[#281920]">
                  How would you describe your typical flow?
                </h3>
                <p className="mt-1 text-xs text-[#5a424f]">
                  We&apos;ll match you with the precise Sparsha pad size for zero leaks and full comfort.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    { id: "light", label: "Light Flow (Days 4–5 or spotty days)" },
                    { id: "medium", label: "Moderate Everyday Flow (Days 2–3)" },
                    { id: "heavy", label: "Heavy Flow / Intense Active Days" },
                    { id: "overnight", label: "Overnight & Restful Sleep" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleQuizAnswer(option.id)}
                      className="w-full text-left p-3.5 rounded-2xl border border-rose-100 bg-[#fdf8f9] hover:bg-[#faedf1] hover:border-rose-200 transition-colors text-xs sm:text-sm font-medium text-[#281920] flex items-center justify-between"
                    >
                      <span>{option.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#d81b60]" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <Check className="h-6 w-6 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#d81b60]">
                  Your Ideal Match
                </span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-[#281920]">
                  {quizResult}
                </h3>
                <p className="mt-2 text-xs text-[#5a424f] leading-relaxed">
                  Engineered with hypoallergenic micro-pores and superabsorbent gel core for effortless protection.
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  <button
                    onClick={() => setQuizOpen(false)}
                    className="w-full rounded-full bg-gradient-to-r from-[#d81b60] to-[#c2185b] py-3 text-xs font-bold text-white shadow-soft-pink"
                  >
                    View This Match
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="w-full py-2 text-xs font-semibold text-[#5a424f] hover:text-[#d81b60]"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

