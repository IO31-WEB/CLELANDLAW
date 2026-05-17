"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    // Passive listener — never blocks scroll on mobile
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on any nav link tap
  const close = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0A0A0F]/97 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#00C896]">Cleland</span>
            <span className="text-white"> Law</span>
          </span>
          <span className="text-[9px] text-white/35 tracking-widest uppercase mt-0.5">
            Florida Estate Planning
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
          {[["#packages","Packages"],["#why","Why Us"],["#process","How It Works"],["#about","About Ryan"]].map(([href, label]) => (
            <a key={href} href={href} className="hover:text-[#00C896] transition-colors py-1">
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#packages"
          className="hidden md:inline-flex items-center bg-[#00C896] hover:bg-[#00E5A8] text-black px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
        >
          Get Started
        </a>

        {/* Mobile hamburger — large tap target */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 rounded-lg"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu — no layout shift, smooth open */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 border-t border-white/8" : "max-h-0"
        } bg-[#0A0A0F]`}
      >
        <div className="flex flex-col px-5 py-5 gap-1">
          {[
            ["#packages", "Packages"],
            ["#why",      "Why Us"],
            ["#process",  "How It Works"],
            ["#about",    "About Ryan"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="text-white/75 text-base py-3 px-2 border-b border-white/5 last:border-0 hover:text-[#00C896] transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#packages"
            onClick={close}
            className="mt-4 bg-[#00C896] text-black py-3.5 text-center rounded-xl font-bold text-base"
          >
            Get Started →
          </a>
        </div>
      </div>
    </nav>
  );
}
