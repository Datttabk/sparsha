"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Plane, Heart, ArrowUpRight } from "lucide-react";

export default function Section7EverydayLife() {
  const cards = [
    {
      category: "CAREER & LEADERSHIP",
      title: "Corporate & Business",
      supportingText: "Stay focused. Stay confident.",
      desc: "Command meetings, lead summits, and conquer demanding office hours with complete peace of mind.",
      image: "/sparsha/life-corporate.jpg",
      icon: <Briefcase className="h-3.5 w-3.5" />,
    },
    {
      category: "CAMPUS & LEARNING",
      title: "Campus & Academics",
      supportingText: "Learn, grow and move with confidence.",
      desc: "Rush between lecture halls, collaborate in the library, and live student life with zero hesitation.",
      image: "/sparsha/life-campus.jpg",
      icon: <GraduationCap className="h-3.5 w-3.5" />,
    },
    {
      category: "TRAVEL & EXPLORATION",
      title: "Transit & Journey",
      supportingText: "Comfort wherever your journey takes you.",
      desc: "Long flights, train voyages, and road trips made effortless with breathable all-day protection.",
      image: "/sparsha/life-transit.jpg",
      icon: <Plane className="h-3.5 w-3.5" />,
    },
    {
      category: "MINDFULNESS & REST",
      title: "Wellness & Rest",
      supportingText: "Take care of yourself, every day.",
      desc: "Embrace yoga, meditation, quiet reading, and deeply rejuvenating sleep with gentle tenderness.",
      image: "/sparsha/life-wellness.jpg",
      icon: <Heart className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <section
      id="everyday-life"
      className="relative w-full bg-[#fdf8f9] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#f5e4e8]"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-20 left-1/3 h-[500px] w-[500px] rounded-full bg-[#faedf1]/80 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-[450px] w-[450px] rounded-full bg-[#fce7ec]/70 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#d81b60]"
          >
            Everyday Mobility
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#281920]"
          >
            Sparsha in <span className="text-[#d81b60]">Everyday Life</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-serif text-xl sm:text-2xl text-[#d81b60] italic font-normal"
          >
            Comfort that moves with you, wherever life takes you.
          </motion.p>
        </div>

        {/* 4 Premium Consistent Lifestyle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 35px -10px rgba(216, 27, 96, 0.15)",
                transition: { duration: 0.3 },
              }}
              className="group rounded-3xl overflow-hidden border border-white/90 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 flex flex-col hover:border-rose-200"
            >
              {/* Card Image Container with subtle zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#faedf1]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle soft gradient over image */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-3.5 left-3.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#d81b60] shadow-sm backdrop-blur-md flex items-center gap-1.5 border border-[#fce7ec]">
                  {card.icon}
                  <span className="tracking-wider">{card.category}</span>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-[#281920] group-hover:text-[#d81b60] transition-colors">
                      {card.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-[#d81b60] opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </div>
                  <p className="text-xs font-semibold text-[#d81b60] mt-1">
                    {card.supportingText}
                  </p>
                  <p className="mt-3 text-xs text-[#5a424f] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom subtle indicator line */}
                <div className="mt-5 pt-3 border-t border-rose-50 flex items-center justify-between text-[11px] text-[#8e7081]">
                  <span>Sparsha 24/7 Comfort</span>
                  <span className="text-[#d81b60] font-medium">Verified Fit</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

