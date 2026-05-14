"use client";

import { useState } from "react";

export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex items-center relative bg-[#0A0A0F] pt-20 overflow-hidden">
      {/* Background Mesh Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#00C896] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#E8754A] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-2 mb-8 text-sm">
          <span className="text-[#00C896]">✓</span>
          Florida Bar Licensed Estate Planning Attorney
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tighter mb-8">
          Your estate plan.<br />
          <span className="text-[#00C896]">Attorney-crafted.</span><br />
          <span className="text-white/70 text-4xl md:text-5xl">Done entirely online.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12">
          Flat-fee wills and trusts for Florida families. 
          Personally reviewed by Ryan Cleland, Esq.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#packages" 
            className="bg-[#00C896] hover:bg-[#00E5A8] text-black font-semibold text-lg px-10 py-4 rounded-2xl transition-all active:scale-95 w-full sm:w-auto"
          >
            View Packages & Pricing →
          </a>
          <a 
            href="#about" 
            className="border border-white/30 hover:bg-white/5 font-medium text-lg px-8 py-4 rounded-2xl transition-all w-full sm:w-auto"
          >
            Meet Ryan Cleland, Esq.
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 text-sm text-white/60">
          <div>🔒 256-bit Encrypted</div>
          <div>⚖️ Florida Bar Licensed</div>
          <div>⏱ 3–5 Day Delivery</div>
          <div>💳 Flat Fee — No Surprises</div>
        </div>
      </div>
    </section>
  );
}
