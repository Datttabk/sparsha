"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Check } from "lucide-react";

export default function SparshaFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2, margin: "-40px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="scroll-mt-20 relative w-full bg-[#faedf1] text-[#281920] pt-16 pb-12 border-t border-[#f2dce1]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#f2dce1]">
          
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-3 group">
              <div className="relative h-11 w-11 rounded-2xl overflow-hidden shadow-xs transition-transform duration-300 group-hover:scale-[1.04]">
                <Image
                  src="/assets/sparsha-logo.png"
                  alt="Sparsha Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#281920] group-hover:text-[#d81b60] transition-colors">
                Sparsha
              </span>
            </Link>
            <p className="text-xs text-[#5a424f] leading-relaxed mt-2 max-w-sm">
              Dedicated to empowering women with uncompromising comfort, clinical skin safety, and menstrual dignity. Swasth Mahila, Swasth Bharat.
            </p>

            {/* Social Icons — Instagram Only */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/her28days?stkn=bm9na2dlOHZjbWxw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#d81b60] hover:text-white hover:bg-[#d81b60] transition-all duration-300 border border-[#f2dce1] shadow-xs hover:scale-105"
                aria-label="Instagram"
              >
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-serif text-base font-bold text-[#281920] mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs text-[#5a424f]">
                <li><Link href="/" className="hover:text-[#d81b60] transition-colors">Home</Link></li>
                <li><Link href="#story" className="hover:text-[#d81b60] transition-colors">Our Story</Link></li>
                <li><Link href="#products" className="hover:text-[#d81b60] transition-colors">Products</Link></li>
                <li><Link href="#why-sparsha" className="hover:text-[#d81b60] transition-colors">Why Sparsha</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-[#281920] mb-4">
                Initiatives
              </h4>
              <ul className="space-y-2.5 text-xs text-[#5a424f]">
                <li><Link href="#her28days" className="hover:text-[#d81b60] transition-colors">Her28Days</Link></li>
                <li><Link href="#awareness" className="hover:text-[#d81b60] transition-colors">Period Awareness</Link></li>
                <li><Link href="#protection" className="hover:text-[#d81b60] transition-colors">Protection Tech</Link></li>
                <li><Link href="#contact" className="hover:text-[#d81b60] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Col */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-lg font-bold text-[#281920]">
              Stay Connected
            </h4>
            <p className="text-xs text-[#5a424f] mt-1">
              For a healthier, happier tomorrow. Receive wellness tips and initiatives.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-[#f2dce1] bg-white px-4 py-2.5 text-xs text-[#281920] placeholder-gray-400 focus:outline-none focus:border-[#d81b60]"
              />
              <button
                type="submit"
                className="rounded-full bg-[#d81b60] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#c2185b] shadow-sm"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                <Check className="h-3 w-3" /> Thank you for joining the Sparsha community!
              </p>
            )}
          </div>

        </div>

        {/* Bottom copyright & final brand statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b505e]">
          <p>© 2026 Sparsha. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[#d81b60] font-medium">
            <span>Because every woman deserves a healthier tomorrow.</span>
            <Heart className="h-3.5 w-3.5 fill-[#d81b60]" />
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
