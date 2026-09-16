"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X, ArrowRight } from "lucide-react";

export default function SparshaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const navItems = [
    { name: "Home", id: "home", href: "#home" },
    { name: "Our Story", id: "our-story", href: "#our-story" },
    { name: "Products", id: "products", href: "#products" },
    { name: "Why Sparsha", id: "why-sparsha", href: "#why-sparsha" },
    { name: "Period Awareness", id: "period-awareness", href: "#period-awareness" },
    { name: "Her28Days", id: "her28days", href: "#her28days", hasBadge: true },
    { name: "Contact", id: "contact", href: "#contact" },
  ];

  // Active section tracking via RAF-throttled scroll listener
  useEffect(() => {
    let ticking = false;
    let lastActive = "home";

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      
      // Top of page is always home
      if (scrollY < 250) {
        if (lastActive !== "home") {
          lastActive = "home";
          setActiveSection("home");
        }
        ticking = false;
        return;
      }

      // Check sections from bottom to top or nearest visible
      const sectionIds = ["contact", "her28days", "products", "why-sparsha", "our-story", "period-awareness", "home"];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when top of section is within upper half of viewport
          if (rect.top <= 240 && rect.bottom >= 120) {
            if (lastActive !== id) {
              lastActive = id;
              setActiveSection(id);
            }
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
      window.history.replaceState(null, "", " ");
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdf8f9]/85 backdrop-blur-md border-b border-[#f5e4e8] transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Official Sparsha Brand Logo */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-3 group"
          >
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
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`transition-colors relative pb-1 flex items-center gap-1 ${
                    isActive
                      ? "text-[#d81b60] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#d81b60] after:rounded-full"
                      : "text-[#4a3540] hover:text-[#d81b60]"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasBadge && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d81b60] animate-ping" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5a424f] border border-[#f2dce1] transition-all hover:bg-[#faebee] hover:text-[#d81b60] hover:scale-105 shadow-sm"
              aria-label="Search Sparsha"
            >
              <Search className="h-4 w-4" />
            </button>

            <a
              href="#products"
              onClick={(e) => handleNavClick(e, "products")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d81b60] to-[#c2185b] px-6 py-2.5 text-sm font-semibold text-white shadow-soft-pink transition-all duration-300 hover:shadow-lg hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Sparsha</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
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
        <div className="lg:hidden border-b border-[#f5e4e8] bg-[#fdf8f9]/98 px-6 py-5 shadow-lg backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col gap-4 text-base font-medium text-[#4a3540]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`py-1 transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-[#d81b60] font-semibold border-b border-[#faebee]"
                      : "text-[#4a3540] hover:text-[#d81b60]"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-[#d81b60]" />}
                </a>
              );
            })}

            <div className="pt-3 border-t border-[#f5e4e8] flex flex-col gap-3">
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "products")}
                className="w-full text-center rounded-full bg-[#d81b60] py-3 text-sm font-semibold text-white shadow-soft-pink"
              >
                Explore Sparsha →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
