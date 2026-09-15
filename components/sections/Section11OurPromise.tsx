"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Heart } from "lucide-react";

export default function Section11OurPromise() {
  const shouldReduceMotion = useReducedMotion();

  const promises = [
    {
      title: "Comfort that lasts.",
      desc: "Uninterrupted freshness through busy mornings, intense workouts, and calm nights.",
    },
    {
      title: "Protection you can trust.",
      desc: "Engineered with clinical leak-barrier locks and high-speed core polymers.",
    },
    {
      title: "Care that respects your body.",
      desc: "Zero bleach, zero artificial perfumes, zero toxins on delicate intimate skin.",
    },
    {
      title: "Quality that puts women first.",
      desc: "Rooted in our national health mission: Swasth Mahila, Swasth Bharat.",
    },
  ];

  return (
    <section
      id="promise"
      className="relative w-full bg-[#fdf8f9] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#f5e4e8]"
    >
      {/* Background subtle ambiance */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-[500px] w-[500px] rounded-full bg-[#faedf1]/80 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-[450px] w-[450px] rounded-full bg-[#fce7ec]/70 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & 4 Sequential Promises */}
          <div className="lg:col-span-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#d81b60]"
            >
              Nationwide Pledge
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281920] leading-[1.12]"
            >
              Our Promise to <br />
              <span className="text-[#d81b60]">Every Woman.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-[#5a424f] leading-relaxed font-light"
            >
              Unwavering standards of hygiene, material transparency, and accessibility for every woman across India.
            </motion.p>

            {/* 4 Promises Staggered Sequential Reveal */}
            <div className="mt-8 space-y-4">
              {promises.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.12 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 rounded-2xl border border-white/90 bg-white/80 p-4 sm:p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-rose-100"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#faebee] text-[#d81b60] mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#281920]">
                      {p.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5a424f] mt-0.5 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Bharat / India Map Visual with Swasth Mahila, Swasth Bharat */}
          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2, margin: "-50px" }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-3xl border-2 border-white/95 bg-gradient-to-br from-[#faedf1]/90 via-white to-[#fbf0f3]/90 p-6 sm:p-8 shadow-card-wellness backdrop-blur-md flex flex-col items-center justify-center text-center overflow-hidden"
            >
              {/* Soft radial aura behind map */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08)_0%,transparent_70%)] pointer-events-none" />

              {/* Exact Uploaded India / Bharat Visual with Gentle Floating Parallax */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-64 h-80 sm:w-72 sm:h-92 my-2 flex items-center justify-center"
              >
                <Image
                  src="/assets/sparsha-bharat-map.png"
                  alt="Swasth Mahila, Swasth Bharat — Sparsha Nationwide Mission"
                  fill
                  priority
                  sizes="(max-width: 640px) 256px, 288px"
                  className="object-contain drop-shadow-md select-none pointer-events-none"
                />
              </motion.div>

              {/* Message Typography */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4"
              >
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#281920]">
                  Swasth Mahila, <br />
                  <span className="text-[#d81b60]">Swasth Bharat.</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#5a424f] max-w-xs mt-2 leading-relaxed font-light">
                  Because empowered, healthy women are the foundation of a thriving nation.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#faebee] px-4 py-1.5 text-xs font-bold text-[#d81b60] border border-rose-200/60 shadow-sm">
                  <Heart className="h-3.5 w-3.5 fill-[#d81b60] text-[#d81b60]" />
                  <span>Caring for Women Across All 28 States</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
