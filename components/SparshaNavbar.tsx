"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X, ArrowRight } from "lucide-react";

export default function SparshaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdf8f9]/85 backdrop-blur-md border-b border-[#f5e4e8] transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Official Sparsha Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-[1.04]">
              <Image
                src="/assets/sparsha-logo.png"
                alt="Sparsha Logo"
                fill
                priority
                sizes="(max-width: 640px) 44px, 48px"
                className="object-contain"
              />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#281920] group-hover:text-[#d81b60] transition-colors">
              Sparsha
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#4a3540]">
            <Link
              href="/"
              className="relative text-[#d81b60] font-semibold transition-colors pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#d81b60] after:rounded-full"
            >
              Home
            </Link>
            <Link
              href="#story"
              className="transition-colors hover:text-[#d81b60]"
            >
              Our Story
            </Link>
            <Link
              href="#products"
              className="transition-colors hover:text-[#d81b60]"
            >
              Products
            </Link>
            <Link
              href="#why-sparsha"
              className="transition-colors hover:text-[#d81b60]"
            >
              Why Sparsha
            </Link>
            <Link
              href="#awareness"
              className="transition-colors hover:text-[#d81b60]"
            >
              Period Awareness
            </Link>
            <Link
              href="#her28days"
              className="transition-colors hover:text-[#d81b60] flex items-center gap-1"
            >
              <span>Her28Days</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d81b60] animate-ping" />
            </Link>
            <Link
              href="#contact"
              className="transition-colors hover:text-[#d81b60]"
            >
              Contact
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5a424f] border border-[#f2dce1] transition-all hover:bg-[#faebee] hover:text-[#d81b60] hover:scale-105 shadow-sm"
              aria-label="Search Sparsha"
            >
              <Search className="h-4 w-4" />
            </button>

            <Link
              href="#explore"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d81b60] to-[#c2185b] px-6 py-2.5 text-sm font-semibold text-white shadow-soft-pink transition-all duration-300 hover:shadow-lg hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Sparsha</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4a3540] hover:text-[#d81b60] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#f5e4e8] bg-[#fdf8f9]/98 px-6 py-5 shadow-lg backdrop-blur-xl">
          <div className="flex flex-col gap-4 text-base font-medium text-[#4a3540]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#d81b60] font-semibold py-1 border-b border-[#faebee]"
            >
              Home
            </Link>
            <Link
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d81b60] transition-colors py-1"
            >
              Our Story
            </Link>
            <Link
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d81b60] transition-colors py-1"
            >
              Products
            </Link>
            <Link
              href="#why-sparsha"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d81b60] transition-colors py-1"
            >
              Why Sparsha
            </Link>
            <Link
              href="#awareness"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d81b60] transition-colors py-1"
            >
              Period Awareness
            </Link>
            <Link
              href="#her28days"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d81b60] transition-colors py-1"
            >
              Her28Days Movement
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d81b60] transition-colors py-1"
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-[#f5e4e8] flex flex-col gap-3">
              <Link
                href="#explore"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-full bg-[#d81b60] py-3 text-sm font-semibold text-white shadow-soft-pink"
              >
                Explore Sparsha →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
