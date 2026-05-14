"use client";

import { useState, useEffect } from "react";

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
    description: "A legally valid, Florida Bar-compliant will that protects your family and names guardians for minor children.",
    includes: ["Attorney-drafted Florida will", "Guardian nominations for minors", "Named executor", "30-day unlimited revisions", "Secure PDF delivery", "Ryan Cleland, Esq. review"],
  },
  {
    id: "trust",
    icon: "🏛",
    tag: "Most Popular",
    name: "Revocable Living Trust",
    price: 899,
    description: "Skip probate entirely. A comprehensive trust that transfers assets seamlessly and privately.",
    includes: ["Revocable Living Trust Agreement", "Pour-Over Will included", "Certificate of Trust", "30-min strategy call with Ryan", "60-day unlimited revisions"],
  },
  {
    id: "complete",
    icon: "⚖️",
    tag: "Complete Suite",
    name: "Complete Estate Plan",
    price: 1499,
    description: "The full suite — every document your family needs, personally curated and reviewed by Ryan.",
    includes: ["Revocable Living Trust", "Last Will & Testament", "Durable Power of Attorney", "Healthcare Surrogate", "Priority 3-day delivery"],
  },
];

const FAMILY = ["Single, no children", "Single with children", "Married, no children", "Married with children", "Divorced with children", "Widowed"];

function GlobalStyles() {
  useEffect(() => {
    const id = "cleland-law-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      :root {
        --obs: #0A0A0F; --obs2: #0F0F18; --obs3: #141422;
        --em: #00C896; --em2: #00E5A8; --em3: #00A87A;
        --copper: #E8754A;
        --pearl: #F0EEE9;
        --border: rgba(240,238,233,0.08);
      }
      html { scroll-behavior: smooth; }
      body { background: var(--obs); color: var(--pearl); font-family: 'Outfit', system-ui, sans-serif; overflow-x: hidden; }
      h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; line-height: 1.1; }
      .glass { background: rgba(20,20,34,0.7); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 16px; }
      .fu { animation: fadeUp 0.6s ease forwards; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}

/* ==================== NAV ==================== */
function Nav({ view, setView }: { view: string; setView: (v: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <button 
          onClick={() => { setView("home"); setMobileOpen(false); }}
          className="flex flex-col items-start"
        >
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#00C896]">Cleland</span> Law
          </span>
          <span className="text-[10px] text-white/40 -mt-1 tracking-widest">FLORIDA ESTATE PLANNING</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {["home", "packages", "about"].map((v) => (
            <button 
              key={v} 
              onClick={() => setView(v)}
              className={`font-medium transition-colors ${view === v ? "text-[#00C896]" : "text-white/70 hover:text-white"}`}
            >
              {v === "home" ? "Home" : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
          <button 
            onClick={() => setView("packages")} 
            className="bg-[#00C896] hover:bg-[#00E5A8] text-black px-6 py-2.5 rounded-2xl font-semibold transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>

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
          {["home", "packages", "about"].map((v) => (
            <button 
              key={v}
              onClick={() => { setView(v); setMobileOpen(false); }}
              className="block w-full text-left px-6 py-4 text-lg border-b border-white/10 last:border-none"
            >
              {v === "home" ? "Home" : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
          <div className="px-6 pt-6">
            <button 
              onClick={() => { setView("packages"); setMobileOpen(false); }}
              className="w-full bg-[#00C896] text-black py-4 rounded-2xl font-semibold text-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ==================== HERO ==================== */
function Hero({ setView }: { setView: (v: string) => void }) {
  return (
    <section className="min-h-[100dvh] flex items-center relative px-6 pt-20 pb-16 bg-[#0A0A0F]">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-1.5 mb-8 text-sm">
          <span className="text-[#00C896]">✓</span>
          Florida Bar Licensed Attorney
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tighter mb-8">
          Your estate plan.<br />
          <span className="text-[#00C896]">Done right.</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12">
          Attorney-drafted wills and trusts for Florida families. 
          Flat fee. Fully online. Personally reviewed by Ryan Cleland, Esq.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setView("packages")}
            className="bg-[#00C896] hover:bg-[#00E5A8] text-black font-semibold text-lg px-10 py-4 rounded-2xl transition-all active:scale-[0.97]"
          >
            View Packages →
          </button>
          <button 
            onClick={() => setView("about")}
            className="border border-white/30 hover:bg-white/5 font-medium text-lg px-8 py-4 rounded-2xl transition-all"
          >
            Meet Ryan Cleland, Esq.
          </button>
        </div>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-white/60 text-lg">Every package includes personal attorney review by Ryan Cleland, Esq.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PKGS.map((pkg, i) => (
            <div 
              key={pkg.id}
              className={`glass p-8 rounded-3xl transition-all hover:-translate-y-2 ${i === 1 ? 'ring-2 ring-[#00C896] scale-[1.02]' : ''}`}
            >
              {i === 1 && (
                <div className="inline-block bg-[#00C896] text-black text-xs font-bold tracking-widest px-4 py-1 rounded-full mb-6">MOST POPULAR</div>
              )}
              
              <div className="text-5xl mb-6">{pkg.icon}</div>
              <div className="text-sm uppercase tracking-widest text-[#00C896] mb-2">{pkg.tag}</div>
              <h3 className="text-2xl font-semibold mb-3">{pkg.name}</h3>
              <p className="text-white/60 mb-8">{pkg.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold">${pkg.price}</span>
                <span className="text-white/40"> flat fee</span>
              </div>

              <ul className="space-y-3 mb-10 text-sm">
                {pkg.includes.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-[#00C896] mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => { setPkg(pkg); setView("checkout"); }}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-4 rounded-2xl font-semibold transition-all active:scale-95"
              >
                Select Package →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== CHECKOUT (Mobile Friendly) ==================== */
function Checkout({ pkg, setView }: { pkg: Package; setView: (v: string) => void }) {
  const [step, setStep] = useState(1);
  // ... keep your existing checkout logic (form state, validation, etc.)

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-20 pb-12 px-6">
      {/* Your existing checkout UI with improved mobile spacing and button sizes */}
      {/* ... */}
    </div>
  );
}

/* ==================== ROOT ==================== */
export default function HomePage() {
  const [view, setView] = useState<"home" | "packages" | "about" | "checkout">("home");
  const [selectedPkg, setSelectedPkg] = useState<Package>(PKGS[1]);

  return (
    <>
      <GlobalStyles />
      <Nav view={view} setView={setView} />

      {view === "home" && (
        <>
          <Hero setView={setView} />
          <Packages setView={setView} setPkg={setSelectedPkg} />
          {/* Add other sections: Why, HowItWorks, AboutPreview, Testimonials, etc. as needed */}
        </>
      )}

      {view === "packages" && <Packages setView={setView} setPkg={setSelectedPkg} />}
      {view === "about" && <div className="pt-20">About Section Here</div>}
      {view === "checkout" && <Checkout pkg={selectedPkg} setView={setView} />}
    </>
  );
}
