"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Crown, Sparkles } from "lucide-react";

export default function Section1EveryWoman() {
  const featureBlocks = [
    {
      title: "COMFORT",
      desc: "Softness you can feel",
      icon: <Heart className="h-5 w-5 fill-[#d81b60]/20 text-[#d81b60]" />,
    },
    {
      title: "CONFIDENCE",
      desc: "To be your best, always",
      icon: <Crown className="h-5 w-5 text-[#d81b60]" />,
    },
    {
      title: "CARE",
      desc: "Because you matter",
      icon: <Sparkles className="h-5 w-5 text-[#d81b60]" />,
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#fdf8f9] via-[#faedf1] to-[#fdf8f9] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Soft background ambient glow & floating subtle petals */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(248,215,227,0.4) 0%, rgba(248,215,227,0.1) 45%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250,229,237,0.4) 0%, rgba(250,229,237,0.1) 45%, transparent 70%)",
        }}
      />

      {/* Decorative Drifting Petals (pure CSS/motion lightweight) */}
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-20 right-[15%] w-8 h-8 rounded-full bg-gradient-to-br from-pink-300/40 to-rose-400/20 blur-[1px] transform rotate-45"
      />
      <motion.div
        animate={{ y: [0, 22, 0], x: [0, -10, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute bottom-24 left-[10%] w-6 h-6 rounded-full bg-gradient-to-tr from-pink-400/30 to-rose-300/20 blur-[1px]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography & Staggered Feature Blocks */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d81b60]">
              Our Core Belief
            </span>

            {/* Heading reveals line-by-line */}
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281920] leading-[1.12]">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block"
              >
                Every Woman
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="block text-[#d81b60]"
              >
                Deserves More
              </motion.span>
            </h2>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-4 font-serif text-2xl sm:text-3xl text-[#d81b60] italic font-normal"
            >
              Comfort. Confidence. Care.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-4 text-base sm:text-lg text-[#5a424f] leading-relaxed max-w-xl font-light"
            >
              Menstruation is not an obstacle—it is an innate rhythm of life and strength. Sparsha was born out of a commitment to elevate menstrual well-being from a quiet compromise to an uncompromising experience of dignity.
            </motion.p>

            {/* Three Elegant Feature Blocks Staggered */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featureBlocks.map((block, idx) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.12 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-white/90 bg-white/75 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-[#fce7ec]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faebee] text-[#d81b60] mb-3">
                    {block.icon}
                  </div>
                  <h4 className="font-serif text-base font-bold tracking-wider text-[#281920]">
                    {block.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#5a424f] leading-relaxed">
                    &ldquo;{block.desc}&rdquo;
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Campaign Lifestyle Woman Image with subtle parallax & flowing mood */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-card-wellness border-2 border-white/95 bg-white/60">
              <Image
                src="/sparsha/woman-flowing.jpg"
                alt="Confident young woman in soft blush pink dress with floating fabric"
                fill
                priority
                className="object-cover transition-transform duration-1000 ease-out hover:scale-[1.03]"
              />

              {/* Soft editorial gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

              {/* Floating Bottom Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 backdrop-blur-md p-4 border border-white/80 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#281920] leading-snug">
                      Strong Women, Brighter Tomorrows.
                    </h4>
                    <p className="text-xs font-medium text-[#d81b60] mt-0.5">
                      Empowered by gentle comfort & fearless protection.
                    </p>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-[#faebee] flex items-center justify-center text-[#d81b60] shrink-0 text-sm font-bold shadow-sm">
                    ♥
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

