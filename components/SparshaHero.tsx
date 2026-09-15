"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Sparkles, ArrowRight, Heart, Flower2 } from "lucide-react";

export default function SparshaHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#fdf8f9] via-[#faedf1] to-[#fbf2f5] pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* Background Soft Architectural Window Light & Shadow Accents */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft morning window grid shadow emulation */}
        <div className="absolute top-10 left-1/4 h-[600px] w-[500px] bg-gradient-to-tr from-[#f5d9e2]/30 via-[#f8e6ec]/20 to-transparent blur-3xl transform -rotate-12" />
        <div className="absolute top-1/3 -right-24 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[#f8d7e3]/40 via-[#fbebf0]/20 to-transparent blur-2xl" />
        
        {/* Floating decorative petals */}
        <div className="absolute top-36 left-12 h-4 w-4 rounded-full bg-gradient-to-br from-[#f472b6]/40 to-[#d81b60]/20 blur-[1px] animate-petal" />
        <div className="absolute top-64 right-1/3 h-5 w-3 rounded-full bg-gradient-to-br from-[#f472b6]/35 to-[#d81b60]/15 blur-[1px] animate-petal [animation-delay:2s]" />
        <div className="absolute bottom-40 right-20 h-6 w-4 rounded-full bg-gradient-to-br from-[#f472b6]/30 to-[#d81b60]/10 blur-[1px] animate-petal [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: 42-45% WIDTH ON DESKTOP                    */}
          {/* Headline, Divider, Support Text, Icons, CTAs, Product    */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center z-20">
            
            {/* Eyebrow Brand Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d81b60]">
                Care Today, A Healthier Tomorrow
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="mt-4"
            >
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-[#281920]">
                Move Freely.
                <br />
                <span className="text-[#d81b60] drop-shadow-[0_2px_15px_rgba(216,27,96,0.12)]">
                  Live Fully.
                </span>
              </h1>
            </motion.div>

            {/* Decorative Divider with Center Lotus Flower Icon */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mt-6 flex items-center gap-3 max-w-md"
            >
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#e5b6c5] to-[#d81b60]/40" />
              <div className="relative flex items-center justify-center text-[#d81b60]">
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 24 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#d81b60]"
                >
                  {/* Delicate lotus / flower emblem */}
                  <path d="M12 2C13.5 6 15 11 12 16C9 11 10.5 6 12 2Z" fill="rgba(216,27,96,0.15)" />
                  <path d="M12 16C15 11 19 9 22 13C18 16 14 16 12 16Z" />
                  <path d="M12 16C9 11 5 9 2 13C6 16 10 16 12 16Z" />
                </svg>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#e5b6c5] to-[#d81b60]/40" />
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              className="mt-5 text-lg sm:text-xl font-normal text-[#4f3844] max-w-md leading-relaxed"
            >
              Comfort that keeps up with every move.
            </motion.p>

            {/* Feature Icons Strip: 3 Horizontally Aligned Circles */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-8 flex items-center gap-6 sm:gap-8 max-w-md"
            >
              {/* Feature 1: Leaf */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="flex h-13 w-13 items-center justify-center rounded-full border border-[#e89db4] bg-white/80 backdrop-blur-sm text-[#d81b60] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#d81b60] group-hover:shadow-[0_0_15px_rgba(216,27,96,0.2)]">
                  <Leaf className="h-6 w-6 stroke-[1.5]" />
                </div>
                <span className="mt-2 text-xs font-semibold text-[#4a3540] leading-tight">
                  Super Soft
                  <br />
                  Comfort
                </span>
              </div>

              {/* Feature 2: Shield */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="flex h-13 w-13 items-center justify-center rounded-full border border-[#e89db4] bg-white/80 backdrop-blur-sm text-[#d81b60] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#d81b60] group-hover:shadow-[0_0_15px_rgba(216,27,96,0.2)]">
                  <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
                </div>
                <span className="mt-2 text-xs font-semibold text-[#4a3540] leading-tight">
                  Reliable
                  <br />
                  Protection
                </span>
              </div>

              {/* Feature 3: Gentle Flower / Skin Care */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="flex h-13 w-13 items-center justify-center rounded-full border border-[#e89db4] bg-white/80 backdrop-blur-sm text-[#d81b60] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#d81b60] group-hover:shadow-[0_0_15px_rgba(216,27,96,0.2)]">
                  <Flower2 className="h-6 w-6 stroke-[1.5]" />
                </div>
                <span className="mt-2 text-xs font-semibold text-[#4a3540] leading-tight">
                  Gentle on
                  <br />
                  Skin
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA */}
              <a
                href="#explore"
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#d81b60] via-[#c2185b] to-[#ad1457] px-7 py-3.5 text-sm font-semibold text-white shadow-soft-pink transition-all duration-300 hover:shadow-lg hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Sparsha</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full border border-[#d81b60]/30 bg-white/60 px-6 py-3.5 text-sm font-medium text-[#4a3540] backdrop-blur-sm transition-all duration-300 hover:bg-[#faebee] hover:border-[#d81b60] hover:text-[#d81b60]"
              >
                <span>Discover Our Products</span>
              </a>
            </motion.div>

            {/* ======================================================== */}
            {/* PRODUCT DISPLAY: Pedestal, Blue Sparsha Box & Pad        */}
            {/* ======================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
              className="mt-10 relative max-w-md animate-float-subtle"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-card-wellness border border-white/80 bg-white/40 backdrop-blur-sm">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/sparsha/product-pedestal.jpg"
                    alt="Official Sparsha Ultra Soft Sanitary Napkin on Marble Pedestal"
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Subtle soft gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fdf8f9]/50 via-transparent to-transparent" />
                  
                  {/* Official Blue Packaging Tag Badge */}
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#1e40af] shadow-sm backdrop-blur-md flex items-center gap-1.5 border border-blue-100">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span>Official Blue Edition • 280mm</span>
                  </div>

                  {/* Soft sanitary napkin callout pill */}
                  <div className="absolute bottom-3 right-3 rounded-full bg-[#fdf8f9]/95 px-3 py-1 text-[11px] font-semibold text-[#d81b60] shadow-sm backdrop-blur-md border border-[#fce7ec]">
                    <span>Ultra Soft Pure Cotton Feel</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 55-58% WIDTH ON DESKTOP                   */}
          {/* Empowering Woman Stretching in Sunlit Wellness Studio    */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end z-10">
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl"
            >
              {/* Ambient Glow behind the woman visual */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#fbcfe8]/40 via-[#fde047]/10 to-[#fed7aa]/30 blur-2xl opacity-70 -z-10" />

              {/* Main Lifestyle Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-card-wellness border-2 border-white/90 bg-white/40">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/sparsha/woman-stretching.jpg"
                    alt="Confident woman stretching comfortably in a sunlit wellness studio"
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Warm morning light subtle gradient reflection */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-[#fed7aa]/10 to-[#fdf2f8]/20" />
                </div>

                {/* Floating Empowering Brand Quote Overlay */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                  className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 rounded-2xl bg-white/85 backdrop-blur-md p-3.5 sm:p-4 border border-white/80 shadow-md flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faebee] text-[#d81b60]">
                      <Heart className="h-5 w-5 fill-[#d81b60]/20 text-[#d81b60]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#d81b60]">
                        Empowered Comfort
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#4a3540]">
                        Designed for unrestricted freedom and gentle skin protection.
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-[#6b7280] shrink-0 border-l border-gray-200 pl-3">
                    <span>100% Rash-Free</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Subtle Corner Stamp: Her28Days Movement */}
              <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white p-1 shadow-md border border-[#f5e4e8] transition-transform hover:rotate-6 duration-300">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image
                    src="/assets/her28days-emblem.png"
                    alt="Her28Days Movement"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>

            </motion.div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* TRUST BADGES STRIP BELOW HERO                           */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          className="mt-16 pt-8 border-t border-[#f2dce1] grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-bold text-[#d81b60]">100%</span>
            <span className="text-xs font-medium text-[#4a3540] mt-1">Cottony Rash-Free Comfort</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-bold text-[#d81b60]">Zero</span>
            <span className="text-xs font-medium text-[#4a3540] mt-1">Harmful Chemicals or Toxins</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-bold text-[#d81b60]">280 mm</span>
            <span className="text-xs font-medium text-[#4a3540] mt-1">Extra-Long Leakage Lock</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-bold text-[#d81b60]">Swasth Bharat</span>
            <span className="text-xs font-medium text-[#4a3540] mt-1">Certified Feminine Wellness</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
