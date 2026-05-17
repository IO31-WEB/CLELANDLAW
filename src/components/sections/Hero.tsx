export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex items-center relative bg-[#0A0A0F] pt-20 overflow-hidden">

      {/* Mesh background — static on mobile via .mesh-orb CSS class, animated on desktop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="mesh-orb mesh-orb-1 absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#00C896] opacity-20"
          style={{ top: "-15%", left: "-10%" }}
        />
        <div
          className="mesh-orb mesh-orb-2 absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#E8754A] opacity-15"
          style={{ bottom: "-15%", right: "-8%" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center w-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-sm">
          <span className="text-[#00C896]">✓</span>
          Florida Bar Licensed Estate Planning Attorney
        </div>

        {/* Headline — LCP element, no animation delay on it */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight mb-6">
          Your estate plan.<br />
          <span className="text-[#00C896]">Attorney-crafted.</span><br />
          <span className="text-white/65 text-3xl sm:text-4xl md:text-5xl font-semibold">
            Done entirely online.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/65 max-w-xl mx-auto mb-10 leading-relaxed">
          Flat-fee wills and trusts for Florida families.
          Personally reviewed by Ryan Cleland, Esq.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-14">
          <a
            href="#packages"
            className="bg-[#00C896] hover:bg-[#00E5A8] active:scale-95 text-black font-semibold text-base px-8 py-4 rounded-2xl transition-colors w-full sm:w-auto text-center"
          >
            View Packages &amp; Pricing →
          </a>
          <a
            href="#about"
            className="border border-white/25 hover:border-white/40 font-medium text-base px-7 py-4 rounded-2xl transition-colors w-full sm:w-auto text-center text-white/80"
          >
            Meet Ryan Cleland, Esq.
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-white/50">
          {["🔒 256-bit Encrypted", "⚖️ Florida Bar Licensed", "⏱ 3–5 Day Delivery", "💳 Flat Fee"].map((item) => (
            <div key={item} className="bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
