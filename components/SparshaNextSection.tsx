"use client";

import React from "react";
import Image from "next/image";
import { Check, Shield, Feather, Heart, ArrowRight } from "lucide-react";

export default function SparshaNextSection() {
  return (
    <section className="relative w-full bg-[#fdf8f9] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#f5e4e8]">
      <div className="mx-auto max-w-7xl">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pb-16 border-b border-[#f2dce1]">
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl font-bold text-[#d81b60]">100%</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4a3540] mt-1.5">
              Cottony Rash-Free Comfort
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl font-bold text-[#d81b60]">Zero</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4a3540] mt-1.5">
              Harmful Chemicals or Toxins
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl font-bold text-[#d81b60]">280 mm</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4a3540] mt-1.5">
              Extra-Long Leakage Lock
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl font-bold text-[#d81b60]">Swasth Bharat</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4a3540] mt-1.5">
              Certified Feminine Wellness
            </span>
          </div>
        </div>

        {/* Product Showcase & Brand Promise */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d81b60]">
              The Sparsha Promise
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#281920] leading-tight">
              Crafted for pure comfort, confidence, and peace of mind.
            </h2>
            <p className="mt-4 text-base text-[#5a424f] leading-relaxed">
              Every woman deserves unrestricted movement and the dignity of clean, dermatologically gentle period care. Sparsha combines anion-chip technology with an ultra-soft breathable surface for lasting protection.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#faebee] text-[#d81b60] mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#281920]">Multi-Layer Anion Absorption</h4>
                  <p className="text-xs text-[#5a424f]">Locks moisture away instantly without feeling heavy or damp.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#faebee] text-[#d81b60] mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#281920]">Ultra-Soft Breathable Wings</h4>
                  <p className="text-xs text-[#5a424f]">Stays securely anchored during fitness, work, and sleep.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#faebee] text-[#d81b60] mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#281920]">Eco-Conscious & Skin Friendly</h4>
                  <p className="text-xs text-[#5a424f]">Free of chlorine, artificial fragrances, and harsh bleach.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-[#d81b60] px-7 py-3.5 text-sm font-semibold text-white shadow-soft-pink transition-all hover:bg-[#c2185b] hover:shadow-lg"
              >
                <span>Discover All Sparsha Products</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-card-wellness border-2 border-white/90 bg-white/60">
              <Image
                src="/assets/sparsha-blue-pack-perspective.jpg"
                alt="Official Sparsha Blue Packaging Edition"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="mt-20 pt-8 border-t border-[#f2dce1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b505e]">
          <p>© 2026 Sparsha — Swasth Mahila, Swasth Bharat. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#d81b60] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d81b60] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#d81b60] transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
