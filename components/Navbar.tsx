"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="relative flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-6 py-3 shadow-2xl backdrop-blur-xl">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-orange-500 p-[1px] transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#090813]">
                <Sparkles className="h-4 w-4 text-orange-400 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-wider text-white group-hover:text-purple-200 transition-colors font-sans">
                DREAMFRAME
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">
                Neural Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <Link
              href="#showcase"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            >
              Showcase
            </Link>
            <Link
              href="#models"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            >
              Models
            </Link>
            <Link
              href="#features"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            >
              Pricing
            </Link>
            <Link
              href="#api"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            >
              API Docs
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-3 py-1.5">
              Sign In
            </button>
            <Link
              href="#generate"
              className="relative group inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-900/60 to-purple-800/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:scale-105"
            >
              <span>Launch Studio</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-orange-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl border border-white/10 bg-black/90 p-5 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col gap-4 text-sm font-medium text-zinc-300">
              <Link
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Showcase
              </Link>
              <Link
                href="#models"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Models
              </Link>
              <Link
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Pricing
              </Link>
              <Link
                href="#api"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                API Docs
              </Link>
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
                <button className="w-full text-center py-2 text-sm font-medium text-zinc-300">
                  Sign In
                </button>
                <Link
                  href="#generate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-full bg-gradient-to-r from-orange-500 to-purple-600 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg"
                >
                  Launch Studio
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
