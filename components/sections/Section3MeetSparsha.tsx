"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Feather,
  Droplets,
  ShieldCheck,
  Sparkles,
  Wind,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export default function Section3MeetSparsha() {
  const leftBenefits = [
    {
      title: "ULTRA SOFT",
      subtitle: "Cotton Feel",
      desc: "Micro-woven hypoallergenic surface prevents friction and irritation.",
      icon: <Feather className="h-4 w-4" />,
    },
    {
      title: "UP TO 100%",
      subtitle: "Leak Protection",
      desc: "Advanced super-absorbent micro-core locks fluid instantly.",
      icon: <Droplets className="h-4 w-4" />,
    },
    {
      title: "RASH-FREE",
      subtitle: "Comfort",
      desc: "Dermatologically tested breathable barrier eliminates chafing.",
      icon: <ShieldCheck className="h-4 w-4" />,
    },
  ];

  const rightBenefits = [
    {
      title: "TOXIN-FREE",
      subtitle: "Materials",
      desc: "0% elemental chlorine, harsh parabens, or synthetic perfumes.",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      title: "BREATHABLE",
      subtitle: "All-Day Freshness",
      desc: "Micro-porous back sheet circulates air while blocking moisture.",
      icon: <Wind className="h-4 w-4" />,
    },
    {
      title: "GENTLE",
      subtitle: "On Sensitive Skin",
      desc: "Formulated specifically for intimate care and pH harmony.",
      icon: <HeartHandshake className="h-4 w-4" />,
    },
  ];

  return (
    <section
      id="products"
      className="relative w-full bg-[#fdf8f9] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#f5e4e8]"
    >
      {/* Soft background ambient glow */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-[#faedf1]/80 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-[400px] w-[400px] rounded-full bg-[#fce7ec]/60 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#d81b60]"
          >
            Thoughtful Innovation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281920]"
          >
            Meet <span className="text-[#d81b60]">Sparsha</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#5a424f] leading-relaxed max-w-2xl mx-auto font-light"
          >
            More than just a sanitary pad. Designed to bring together softness, protection and thoughtful care.
          </motion.p>
        </div>

        {/* Desktop Balanced Tri-Column / Mobile Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Mobile Product Visual (order-1 on mobile, hidden on desktop to place in center) */}
          <div className="block lg:hidden order-1 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-xs mx-auto aspect-square rounded-3xl p-4 bg-white/70 border border-white/90 shadow-card-wellness overflow-hidden"
            >
              <Image
                src="/assets/sparsha-blue-pack-front.jpg"
                alt="Sparsha Sanitary Pad Package"
                fill
                className="object-contain p-2"
              />
            </motion.div>
          </div>

          {/* LEFT 3 BENEFITS */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-4 sm:gap-5">
            {leftBenefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/90 bg-white/80 p-4 sm:p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-rose-100 flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faebee] text-[#d81b60] shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {b.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-sm font-bold tracking-wide text-[#281920]">
                      {b.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-[#d81b60] bg-[#faebee] px-2 py-0.5 rounded-full">
                      {b.subtitle}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#5a424f] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CENTER PRODUCT VISUAL (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 order-2 flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              animate={{ y: [0, -8, 0] }}
              style={{ transition: "transform 4s ease-in-out infinite" }}
              className="relative w-full max-w-sm aspect-square rounded-3xl p-6 bg-white/80 border-2 border-white/95 shadow-card-wellness flex items-center justify-center overflow-hidden"
            >
              {/* Soft glow behind package */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#fbcfe8]/40 via-white to-[#bae6fd]/30 rounded-3xl" />
              
              <div className="relative w-full h-full">
                <Image
                  src="/assets/sparsha-blue-pack-front.jpg"
                  alt="Sparsha Flagship Sanitary Napkin Packaging"
                  fill
                  priority
                  className="object-contain drop-shadow-xl"
                />
              </div>

              {/* Floating Pill Tag */}
              <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#1e40af] shadow-sm backdrop-blur-md border border-blue-100 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Original Sparsha</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6"
            >
              <a
                href="#collection"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d81b60] to-[#c2185b] px-7 py-3 text-sm font-semibold text-white shadow-soft-pink transition-all duration-300 hover:shadow-lg hover:brightness-105 hover:gap-3"
              >
                <span>Discover Our Products</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT 3 BENEFITS */}
          <div className="lg:col-span-4 order-3 flex flex-col gap-4 sm:gap-5">
            {rightBenefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/90 bg-white/80 p-4 sm:p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-rose-100 flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faebee] text-[#d81b60] shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {b.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-sm font-bold tracking-wide text-[#281920]">
                      {b.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-[#d81b60] bg-[#faebee] px-2 py-0.5 rounded-full">
                      {b.subtitle}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#5a424f] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile CTA (order-4 on mobile) */}
          <div className="block lg:hidden order-4 text-center mt-4">
            <a
              href="#collection"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d81b60] to-[#c2185b] px-7 py-3 text-sm font-semibold text-white shadow-soft-pink"
            >
              <span>Discover Our Products</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

