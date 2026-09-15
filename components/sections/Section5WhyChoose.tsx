"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Feather,
  Droplets,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Wind,
} from "lucide-react";

export default function Section5WhyChoose() {
  const cards = [
    {
      icon: <Feather className="h-6 w-6 text-[#d81b60]" />,
      title: "Ultra Soft",
      subtitle: "Cotton Feel",
      desc: "Ultra-fine micro-woven fibers create a feather-light cushion that feels completely natural against intimate skin.",
    },
    {
      icon: <Droplets className="h-6 w-6 text-[#1e40af]" />,
      title: "Up to 100%",
      subtitle: "Leak Protection",
      desc: "Dual-action side barriers and extra-long adhesive wings stay anchored securely to prevent displacement.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#d81b60]" />,
      title: "Rash-Free",
      subtitle: "Comfort",
      desc: "Dermatologically proven to safeguard delicate tissue against heat rashes, itchiness, and damp irritation.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-[#7c3aed]" />,
      title: "Toxin-Free",
      subtitle: "Materials",
      desc: "Free of harmful bleaching agents, artificial fragrances, chlorine, parabens, and toxic chemical fillers.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-[#d81b60]" />,
      title: "Gentle on",
      subtitle: "Sensitive Skin",
      desc: "pH-balanced surfaces minimize bacterial colonization and maintain vaginal flora harmony throughout the day.",
    },
    {
      icon: <Wind className="h-6 w-6 text-[#0284c7]" />,
      title: "Breathable",
      subtitle: "Design",
      desc: "Allows heat dissipation to keep you cool and odor-free even through 12-hour high humidity conditions.",
    },
  ];

  return (
    <section
      id="why-sparsha"
      className="relative w-full bg-[#fdf8f9] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#d81b60]"
          >
            Unrivaled Quality
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281920]"
          >
            Why Choose <span className="text-[#d81b60]">Sparsha?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#5a424f] leading-relaxed"
          >
            Crafted with thoughtful attention to women’s real-life needs throughout high activity, calm rest, and hectic schedules.
          </motion.p>
        </div>

        {/* 6 Feature Cards Grid (3x2 on desktop) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-3xl border border-white/90 bg-white/70 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-card-wellness hover:-translate-y-1.5 hover:border-[#fce7ec]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faebee] shadow-sm transition-transform duration-300 group-hover:scale-110 mb-5">
                {card.icon}
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-[#281920]">
                  {card.title}
                </h3>
                <span className="text-xs font-semibold text-[#d81b60] bg-[#faebee] px-2.5 py-0.5 rounded-full">
                  {card.subtitle}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#5a424f] leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
