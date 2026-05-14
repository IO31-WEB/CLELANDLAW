"use client";

import { useState } from "react";

interface Package {
  id: string;
  icon: string;
  tag: string;
  name: string;
  price: number;
  description: string;
  includes: string[];
}

const PKGS: Package[] = [
  {
    id: "will",
    icon: "📜",
    tag: "Foundation",
    name: "Last Will & Testament",
    price: 299,
    description: "A legally valid, Florida Bar-compliant will that protects your family.",
    includes: ["Attorney-drafted Florida will", "Guardian nominations", "Named executor", "30-day revisions", "Secure delivery"],
  },
  {
    id: "trust",
    icon: "🏛",
    tag: "Most Popular",
    name: "Revocable Living Trust",
    price: 899,
    description: "Skip probate. Comprehensive trust with full attorney review.",
    includes: ["Revocable Living Trust", "Pour-Over Will", "Strategy call with Ryan", "60-day revisions"],
  },
  {
    id: "complete",
    icon: "⚖️",
    tag: "Complete Suite",
    name: "Complete Estate Plan",
    price: 1499,
    description: "Everything your family needs in one plan.",
    includes: ["Living Trust + Will", "Power of Attorney", "Healthcare Documents", "Priority delivery"],
  },
];

function Nav({ view, setView }: { view: string; setView: (v: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <button onClick={() => setView("home")} className="flex flex-col">
          <span className="text-2xl font-bold text-white">
            <span className="text-[#00C896]">Cleland</span> Law
          </span>
          <span className="text-[10px] text-white/40 -mt-1">FLORIDA ESTATE PLANNING</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {["home", "packages", "about"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`font-medium ${view === v ? "text-[#00C896]" : "text-white/70 hover:text-white"}`}
            >
              {v === "home" ? "Home" : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
          <button onClick={() => setView("packages")} className="bg-[#00C896] hover:bg-[#00E5A8] text-black px-6 py-2.5 rounded-2xl font-semibold transition">
            Get Started
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-3xl">
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0F] border-t border-white/10 py-4">
          {["home", "packages", "about"].map((v) => (
            <button
              key={v}
              onClick={() => { setView(v); setMobileOpen(false); }}
              className="block w-full text-left px-6 py-4 text-lg border-b border-white/10 last:border-none"
            >
              {v === "home" ? "Home" : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default function HomePage() {
  const [view, setView] = useState<"home" | "packages" | "about" | "checkout">("home");
  const [selectedPkg, setSelectedPkg] = useState<Package>(PKGS[1]);

  return (
    <>
      <Nav view={view} setView={setView} />

      {view === "home" && (
        <main className="pt-20">
          <Hero setView={setView} />
          <Packages setView={setView} setPkg={setSelectedPkg} />
        </main>
      )}

      {view === "packages" && <Packages setView={setView} setPkg={setSelectedPkg} />}
      {view === "about" && <div className="pt-20 text-center min-h-screen">About Ryan Cleland, Esq. — Content coming soon.</div>}
      {view === "checkout" && <Checkout pkg={selectedPkg} setView={setView} />}
    </>
  );
}

/* ==================== HERO ==================== */
function Hero({ setView }: { setView: (v: string) => void }) {
  return (
    <section className="min-h-[90dvh] flex items-center px-6 relative bg-[#0A0A0F]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-1.5 mb-8 text-sm">
          Florida Bar Licensed Attorney
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter mb-6">
          Your estate plan.<br />
          <span className="text-[#00C896]">Done right.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Flat-fee wills and trusts. Personally reviewed by Ryan Cleland, Esq.
        </p>
        <button
          onClick={() => setView("packages")}
          className="bg-[#00C896] text-black font-semibold text-lg px-10 py-4 rounded-2xl hover:bg-[#00E5A8] transition-all active:scale-95"
        >
          View Packages & Pricing →
        </button>
      </div>
    </section>
  );
}

/* ==================== PACKAGES ==================== */
function Packages({ setView, setPkg }: { setView: (v: string) => void; setPkg: (p: Package) => void }) {
  return (
    <section className="py-20 px-6 bg-[#0F0F18]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-white/60">All packages include personal attorney review</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PKGS.map((pkg, i) => (
            <div key={pkg.id} className={`glass p-8 rounded-3xl transition-all hover:-translate-y-2 ${i === 1 ? "ring-2 ring-[#00C896] scale-[1.02]" : ""}`}>
              {i === 1 && <div className="bg-[#00C896] text-black text-xs font-bold px-4 py-1 rounded-full inline-block mb-6">MOST POPULAR</div>}
              
              <div className="text-6xl mb-6">{pkg.icon}</div>
              <div className="uppercase text-sm tracking-widest text-[#00C896] mb-1">{pkg.tag}</div>
              <h3 className="text-2xl font-semibold mb-3">{pkg.name}</h3>
              <p className="text-white/60 mb-8 min-h-[80px]">{pkg.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold">${pkg.price}</span>
              </div>

              <ul className="space-y-3 mb-10 text-sm">
                {pkg.includes.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="text-[#00C896] mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { setPkg(pkg); setView("checkout"); }}
                className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-semibold transition-all active:scale-95"
              >
                Select This Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== CHECKOUT ==================== */
function Checkout({ pkg, setView }: { pkg: Package; setView: (v: string) => void }) {
  const [step, setStep] = useState(1);

  const handlePay = () => {
    alert(`In production this would open Stripe Checkout for $${pkg.price}`);
    setStep(5);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-20 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

          <div className="bg-white/5 p-6 rounded-2xl mb-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-4xl mb-2">{pkg.icon}</div>
                <div className="font-semibold">{pkg.name}</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">${pkg.price}</div>
              </div>
            </div>
          </div>

          {step < 5 ? (
            <button
              onClick={handlePay}
              className="w-full bg-[#00C896] text-black py-5 rounded-2xl text-xl font-semibold hover:bg-[#00E5A8] transition-all active:scale-95"
            >
              Pay ${pkg.price} with Stripe →
            </button>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">✅</div>
              <h3 className="text-3xl font-bold mb-4">Order Confirmed</h3>
              <p className="text-white/70 mb-8">Thank you! A confirmation email has been sent.</p>
              <button onClick={() => setView("home")} className="text-[#00C896] underline text-lg">
                Return Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
