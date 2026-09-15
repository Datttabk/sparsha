"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

export default function Section13FinalCta() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#fdf8f9] via-[#faedf1] to-[#fce7ec] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-[#f5e4e8] overflow-hidden">
      {/* Soft atmospheric ambient glow with subtle parallax */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0.4, scale: 0.95 }}
          whileInView={{ opacity: 0.75, scale: 1.05 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-[#fbcfe8]/40 via-[#fde047]/10 to-transparent blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subtext & Dual CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 self-start rounded-full bg-white/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#d81b60] shadow-sm border border-[#fce7ec]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#d81b60]" />
              <span>A Healthier Tomorrow</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#281920] leading-[1.08]"
            >
              Your Comfort. <br />
              Your Confidence. <br />
              <span className="text-[#d81b60]">Your Power. ♥</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-base sm:text-xl text-[#5a424f] leading-relaxed max-w-xl"
            >
              Sparsha is more than protection. It’s a reminder that you deserve to feel confident, comfortable, and powerful every single day of your cycle.
            </motion.p>

            {/* Dual CTAs with stagger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#collection"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#d81b60] via-[#c2185b] to-[#ad1457] px-8 py-4 text-sm font-semibold text-white shadow-soft-pink transition-all duration-300 hover:shadow-lg hover:brightness-105 hover:-translate-y-0.5"
              >
                <span>Explore Sparsha</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#her28days"
                className="inline-flex items-center gap-2 rounded-full border border-[#d81b60]/30 bg-white/80 px-7 py-4 text-sm font-medium text-[#4a3540] backdrop-blur-sm transition-all duration-300 hover:bg-[#faebee] hover:border-[#d81b60] hover:text-[#d81b60]"
              >
                <Heart className="h-4 w-4 text-[#d81b60]" />
                <span>Join the Movement</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Blue Product Packaging Visual with gentle scale-in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-50px" }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-card-wellness border-2 border-white/95 bg-white/70 p-6 flex items-center justify-center">
              <Image
                src="/assets/sparsha-blue-pack-perspective.jpg"
                alt="Sparsha Official Blue Packaging Edition"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
