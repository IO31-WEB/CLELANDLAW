"use client";

import { useState } from "react";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#00C896]">Cleland</span> Law
          </span>
          <span className="text-[10px] text-white/40 -mt-1">FLORIDA ESTATE PLANNING</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#packages" className="hover:text-[#00C896] transition-colors">Packages</a>
          <a href="#why" className="hover:text-[#00C896] transition-colors">Why Us</a>
          <a href="#process" className="hover:text-[#00C896] transition-colors">How It Works</a>
          <a href="#about" className="hover:text-[#00C896] transition-colors">About Ryan</a>
        </div>

        <a 
          href="#packages" 
          className="bg-[#00C896] hover:bg-[#00E5A8] text-black px-6 py-2.5 rounded-2xl font-semibold hidden md:block transition-all"
        >
          Get Started
        </a>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="md:hidden text-3xl text-white"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0A0F] py-6">
          <div className="flex flex-col gap-6 px-6 text-lg">
            <a href="#packages" onClick={() => setMobileOpen(false)}>Packages</a>
            <a href="#why" onClick={() => setMobileOpen(false)}>Why Us</a>
            <a href="#process" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#about" onClick={() => setMobileOpen(false)}>About Ryan</a>
            <a 
              href="#packages" 
              onClick={() => setMobileOpen(false)}
              className="bg-[#00C896] text-black py-4 text-center rounded-2xl font-semibold mt-4"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
