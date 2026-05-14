"use client";

import { useState, useEffect } from "react";

/* ─── Types ─── */
interface Package {
  id: string;
  icon: string;
  tag: string;
  name: string;
  price: number;
  description: string;
  includes: string[];
}

/* ─── Data ─── */
const PKGS: Package[] = [
  {
    id: "will",
    icon: "📜",
    tag: "Foundation",
    name: "Last Will & Testament",
    price: 299,
    description:
      "A legally valid, Florida Bar-compliant will that protects your family and names guardians for minor children.",
    includes: [
      "Attorney-drafted Florida will",
      "Guardian nominations for minors",
      "Named executor",
      "30-day unlimited revisions",
      "Secure PDF delivery",
      "Ryan Cleland, Esq. review & signature",
    ],
  },
  {
    id: "trust",
    icon: "🏛",
    tag: "Most Popular",
    name: "Revocable Living Trust",
    price: 899,
    description:
      "Skip probate entirely. A comprehensive trust that transfers assets seamlessly, privately, and without court involvement.",
    includes: [
      "Revocable Living Trust Agreement",
      "Pour-Over Will included",
      "Certificate of Trust",
      "Asset transfer guidance",
      "30-min strategy call with Ryan",
      "60-day unlimited revisions",
      "Notarized delivery option",
    ],
  },
  {
    id: "complete",
    icon: "⚖️",
    tag: "Complete Suite",
    name: "Complete Estate Plan",
    price: 1499,
    description:
      "The full suite — every document your family needs, personally curated and reviewed by Ryan in a single engagement.",
    includes: [
      "Revocable Living Trust",
      "Last Will & Testament",
      "Durable Power of Attorney",
      "Healthcare Surrogate",
      "Living Will / Advance Directive",
      "HIPAA Authorization",
      "45-min planning call",
      "Priority 3-day delivery",
      "1-year amendment service",
    ],
  },
];

const FAMILY = [
  "Single, no children",
  "Single with children",
  "Married, no children",
  "Married with children",
  "Divorced with children",
  "Widowed",
];

/* ─── Inline styles / CSS injection ─── */
function GlobalStyles() {
  useEffect(() => {
    const id = "cleland-law-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      :root {
        --obs: #0A0A0F; --obs2: #0F0F18; --obs3: #141422;
        --slate: #1A1A2E; --slate2: #22223A;
        --em: #00C896; --em2: #00E5A8; --em3: #00A87A;
        --em-glow: rgba(0,200,150,0.18);
        --copper: #E8754A; --copper2: #F5956E;
        --pearl: #F0EEE9; --ghost: #E8E6E0;
        --border: rgba(240,238,233,0.08);
        --border2: rgba(0,200,150,0.2);
        --ease: cubic-bezier(0.16,1,0.3,1);
        --t: 0.3s cubic-bezier(0.16,1,0.3,1);
      }
      html { scroll-behavior: smooth; }
      body { background: var(--obs); color: var(--pearl); overflow-x: hidden; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--obs2); }
      ::-webkit-scrollbar-thumb { background: var(--em3); border-radius: 2px; }
      @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      @keyframes meshMove  { 0%,100%{transform:translate(0%,0%) scale(1)} 33%{transform:translate(3%,-2%) scale(1.05)} 66%{transform:translate(-2%,3%) scale(0.97)} }
      @keyframes meshMove2 { 0%,100%{transform:translate(0%,0%) scale(1)} 33%{transform:translate(-4%,2%) scale(1.08)} 66%{transform:translate(2%,-3%) scale(0.95)} }
      @keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
      @keyframes glow      { 0%,100%{box-shadow:0 0 20px rgba(0,200,150,0.2)} 50%{box-shadow:0 0 40px rgba(0,200,150,0.5)} }
      @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      .fu  { animation: fadeUp 0.7s var(--ease) both; }
      .fu1 { animation: fadeUp 0.7s 0.10s var(--ease) both; }
      .fu2 { animation: fadeUp 0.7s 0.20s var(--ease) both; }
      .fu3 { animation: fadeUp 0.7s 0.30s var(--ease) both; }
      .fu4 { animation: fadeUp 0.7s 0.40s var(--ease) both; }
      .em-text {
        background: linear-gradient(135deg,var(--em) 0%,var(--em2) 50%,var(--em) 100%);
        background-size: 200% auto;
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text; animation: shimmer 4s linear infinite;
      }
      .copper-text {
        background: linear-gradient(135deg,var(--copper) 0%,var(--copper2) 50%,var(--copper) 100%);
        background-size: 200% auto;
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text; animation: shimmer 4s 1s linear infinite;
      }
      .glass {
        background: rgba(20,20,34,0.6); backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 16px;
      }
      .glass-em {
        background: rgba(0,200,150,0.06); backdrop-filter: blur(20px);
        border: 1px solid rgba(0,200,150,0.2); border-radius: 16px;
      }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}

/* ─── Mesh background ─── */
function MeshBg({ variant = "section" }: { variant?: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div style={{
        position: "absolute", top: variant === "hero" ? "-10%" : "20%",
        left: variant === "hero" ? "-5%" : "-10%",
        width: variant === "hero" ? 700 : 500, height: variant === "hero" ? 700 : 500,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(0,200,150,0.15) 0%,transparent 70%)",
        animation: "meshMove 12s ease-in-out infinite", filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", top: variant === "hero" ? "30%" : "60%",
        right: variant === "hero" ? "-10%" : "-5%",
        width: variant === "hero" ? 600 : 400, height: variant === "hero" ? 600 : 400,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(232,117,74,0.12) 0%,transparent 70%)",
        animation: "meshMove2 15s ease-in-out infinite", filter: "blur(50px)",
      }} />
    </div>
  );
}

/* ─── Nav ─── */
function Nav({ view, setView }: { view: string; setView: (v: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "all 0.4s", padding: "0 32px",
      fontFamily: "'Outfit', system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 1, lineHeight: 1 }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700 }}>
            <span className="em-text">Cleland</span>
            <span style={{ color: "rgba(240,238,233,0.8)" }}> Law</span>
          </span>
          <span style={{ fontSize: 9, color: "rgba(240,238,233,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Estate Planning · Florida</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {(["home", "packages", "about"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: view === v ? "var(--em)" : "rgba(240,238,233,0.5)",
              fontSize: 14, fontWeight: 400, padding: "8px 14px", borderRadius: 8,
              transition: "color var(--t)", letterSpacing: "0.01em",
              fontFamily: "'Outfit', system-ui, sans-serif",
            }}>
              {v === "home" ? "Home" : v === "packages" ? "Pricing" : "About"}
            </button>
          ))}
          <button onClick={() => setView("packages")} style={{
            background: "linear-gradient(135deg,var(--em),var(--em2))",
            color: "var(--obs)", border: "none", padding: "10px 22px", borderRadius: 10,
            fontSize: 14, fontWeight: 700, marginLeft: 10, letterSpacing: "0.02em",
            boxShadow: "0 4px 20px rgba(0,200,150,0.25)", transition: "all var(--t)",
            cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif",
          }}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero({ setView }: { setView: (v: string) => void }) {
  return (
    <section style={{
      minHeight: "100vh", background: "var(--obs)", position: "relative",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "100px 32px 60px", overflow: "hidden",
      fontFamily: "'Outfit', system-ui, sans-serif",
    }}>
      <MeshBg variant="hero" />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom,transparent,var(--em),var(--copper),transparent)" }} />
      <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 760 }}>
          <div className="fu" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.2)",
            borderRadius: 30, padding: "6px 16px 6px 8px", marginBottom: 36,
          }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--em)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✓</div>
            <span style={{ fontSize: 12, color: "var(--em)", fontWeight: 500, letterSpacing: "0.05em" }}>Florida Bar Licensed · Ryan Cleland, Esq.</span>
          </div>
          <h1 className="fu1" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(48px,7vw,88px)", fontWeight: 700, lineHeight: 1.05,
            marginBottom: 30, letterSpacing: "-0.02em",
          }}>
            <span style={{ color: "var(--pearl)" }}>Your estate plan.</span><br />
            <span className="em-text">Attorney-crafted.</span><br />
            <span style={{ color: "rgba(240,238,233,0.4)", fontWeight: 400, fontStyle: "italic", fontSize: "0.85em" }}>Done entirely online.</span>
          </h1>
          <p className="fu2" style={{ fontSize: 18, color: "rgba(240,238,233,0.55)", fontWeight: 300, lineHeight: 1.8, marginBottom: 44, maxWidth: 560 }}>
            Skip the billable hours. Skip the office visits. Get a real, Florida Bar attorney to draft your will or trust — flat fee, fully online, delivered in days.
          </p>
          <div className="fu3" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 64 }}>
            <button onClick={() => setView("packages")} style={{
              background: "linear-gradient(135deg,var(--em) 0%,var(--em2) 100%)",
              color: "var(--obs)", border: "none", padding: "16px 36px",
              borderRadius: 12, fontSize: 16, fontWeight: 700, letterSpacing: "0.02em",
              boxShadow: "0 8px 40px rgba(0,200,150,0.3)", transition: "all var(--t)", cursor: "pointer",
              fontFamily: "'Outfit', system-ui, sans-serif",
            }}>
              View Packages & Pricing →
            </button>
            <button onClick={() => setView("about")} style={{
              background: "rgba(240,238,233,0.04)", color: "rgba(240,238,233,0.65)",
              border: "1px solid var(--border)", padding: "16px 28px",
              borderRadius: 12, fontSize: 15, fontWeight: 400, transition: "all var(--t)",
              cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif",
            }}>
              Meet Ryan Cleland, Esq.
            </button>
          </div>
          <div className="fu4" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[["🔒", "256-bit Encrypted"], ["⚖️", "Florida Bar Licensed"], ["⏱", "3–5 Day Delivery"], ["💳", "Flat-Fee Pricing"]].map(([icon, text]) => (
              <div key={text} style={{
                display: "flex", alignItems: "center", gap: 7,
                background: "rgba(240,238,233,0.04)", border: "1px solid var(--border)",
                borderRadius: 30, padding: "6px 14px",
              }}>
                <span style={{ fontSize: 12 }}>{icon}</span>
                <span style={{ fontSize: 12, color: "rgba(240,238,233,0.45)", fontWeight: 400 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Stats */}
      <div style={{
        maxWidth: 1160, margin: "64px auto 0", width: "100%",
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16,
        position: "relative", zIndex: 1,
      }}>
        {[["$299", "Wills start at"], ["3–5", "Business days"], ["100%", "Florida-licensed"], ["0", "Surprise fees"]].map(([n, l]) => (
          <div key={l} className="glass" style={{ padding: "28px 32px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>
              <span className="em-text">{n}</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(240,238,233,0.45)", fontWeight: 400, letterSpacing: "0.05em" }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Why ─── */
function Why() {
  const cards = [
    { icon: "👨‍⚖️", title: "Real Attorney Review", body: "Every document personally reviewed and signed by Ryan Cleland, Esq. — a licensed Florida Bar attorney focused exclusively on estate planning." },
    { icon: "🔐", title: "Bank-Level Security", body: "Your intake data is encrypted end-to-end and stored under attorney-client privilege. We never share or sell your information." },
    { icon: "⚡", title: "Lightning Fast Turnaround", body: "From form submission to completed documents in 3–5 business days. Priority packages delivered in 24–48 hours." },
    { icon: "💎", title: "No Hourly Surprises", body: "One flat fee. No consultation charges. No 'per-document' billing. No invoice at the end wondering what you paid for." },
  ];
  return (
    <section style={{ background: "var(--obs2)", padding: "100px 32px", position: "relative", overflow: "hidden", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <MeshBg />
      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ height: 1, width: 40, background: "linear-gradient(to right,transparent,var(--em))" }} />
          <span style={{ fontSize: 11, color: "var(--em)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Why Cleland Law</span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, marginBottom: 60, lineHeight: 1.1, maxWidth: 640 }}>
          <span style={{ color: "var(--pearl)" }}>The best of both worlds. </span>
          <span className="copper-text">Attorney quality,</span>
          <span style={{ color: "rgba(240,238,233,0.4)", fontStyle: "italic" }}> modern convenience.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
          {cards.map((c, i) => (
            <div key={i} className="glass" style={{ padding: "32px 28px", transition: "all var(--t)", borderRadius: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: "var(--pearl)", marginBottom: 10 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(240,238,233,0.45)", fontWeight: 300, lineHeight: 1.8 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Choose Your Package", b: "Select from Will, Trust, or Complete Estate Plan. All include personal review by Ryan Cleland, Esq." },
    { n: "02", t: "Complete Secure Intake", b: "A guided questionnaire collects everything Ryan needs. Encrypted, confidential, takes ~15 minutes." },
    { n: "03", t: "Secure Checkout", b: "Pay via Stripe's encrypted checkout. Flat fee — no billing surprises, ever." },
    { n: "04", t: "Ryan Drafts Your Documents", b: "Your intake is reviewed and all documents are personally prepared by Ryan within 3–5 business days." },
    { n: "05", t: "Receive & Sign", b: "Download your completed, attorney-prepared documents via secure link. Sign, notarize, and you're protected." },
  ];
  return (
    <section style={{ background: "var(--obs3)", padding: "100px 32px", position: "relative", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div style={{ position: "sticky", top: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div style={{ height: 1, width: 36, background: "linear-gradient(to right,transparent,var(--copper))" }} />
            <span style={{ fontSize: 11, color: "var(--copper)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Process</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,3.5vw,50px)", fontWeight: 700, color: "var(--pearl)", lineHeight: 1.1, marginBottom: 24 }}>
            From zero to<br /><em className="em-text">protected</em><br />in five steps.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(240,238,233,0.4)", fontWeight: 300, lineHeight: 1.8, marginBottom: 36, maxWidth: 340 }}>
            No office visits. No phone tag. No waiting weeks for an appointment that costs $400/hour just to talk.
          </p>
          <div className="glass-em" style={{ padding: "20px 24px", display: "inline-flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 24 }}>⏱</span>
            <div>
              <div style={{ fontSize: 13, color: "var(--em)", fontWeight: 600 }}>Average completion time</div>
              <div style={{ fontSize: 12, color: "rgba(240,238,233,0.4)" }}>~15 min intake · 3–5 day delivery</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 24, padding: "28px 0", borderBottom: i < steps.length - 1 ? "1px solid rgba(240,238,233,0.05)" : "none" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: `rgba(${i < 2 ? "0,200,150" : "232,117,74"},0.08)`,
                border: `1px solid rgba(${i < 2 ? "0,200,150" : "232,117,74"},0.2)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 600, color: i < 2 ? "var(--em)" : "var(--copper)" }}>{s.n}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 19, fontWeight: 600, color: "var(--pearl)", marginBottom: 6 }}>{s.t}</h3>
                <p style={{ fontSize: 14, color: "rgba(240,238,233,0.4)", fontWeight: 300, lineHeight: 1.7 }}>{s.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Packages ─── */
function Packages({ setView, setPkg }: { setView: (v: string) => void; setPkg: (p: Package) => void }) {
  return (
    <section style={{ background: "var(--obs2)", padding: "100px 32px", position: "relative", overflow: "hidden", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <MeshBg />
      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div style={{ height: 1, width: 36, background: "var(--em)", opacity: 0.5 }} />
            <span style={{ fontSize: 11, color: "var(--em)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Packages & Pricing</span>
            <div style={{ height: 1, width: 36, background: "var(--em)", opacity: 0.5 }} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,4vw,56px)", fontWeight: 700, color: "var(--pearl)", lineHeight: 1.1, marginBottom: 16 }}>
            Transparent pricing.<br /><span className="em-text">Zero surprises.</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(240,238,233,0.4)", fontWeight: 300, maxWidth: 500, margin: "0 auto" }}>
            Every package includes personal preparation and review by Ryan Cleland, Esq.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24, alignItems: "start" }}>
          {PKGS.map((p, i) => (
            <PkgCard key={p.id} pkg={p} featured={i === 1} onSelect={(pkg) => { setPkg(pkg); setView("checkout"); }} />
          ))}
        </div>
        <div style={{ marginTop: 48, padding: "20px 28px", background: "rgba(232,117,74,0.05)", border: "1px solid rgba(232,117,74,0.15)", borderRadius: 12, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ color: "var(--copper)", fontSize: 16, flexShrink: 0, marginTop: 2 }}>⚠</span>
          <p style={{ fontSize: 13, color: "rgba(240,238,233,0.4)", lineHeight: 1.7 }}>
            <strong style={{ color: "rgba(240,238,233,0.6)" }}>Attorney Advertising & Disclaimer:</strong> Documents prepared through this service are for Florida residents only. Purchasing a package establishes an attorney-client relationship with Ryan Cleland, Esq. No results are guaranteed. Florida Bar compliant.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Package Card ─── */
function PkgCard({ pkg, featured, onSelect }: { pkg: Package; featured: boolean; onSelect: (p: Package) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", borderRadius: 20,
        padding: featured ? 2 : 0,
        background: featured ? "linear-gradient(135deg,var(--em) 0%,var(--em2) 50%,var(--copper) 100%)" : "transparent",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        transition: "transform var(--t), box-shadow var(--t)",
        boxShadow: hov ? (featured ? "0 30px 80px rgba(0,200,150,0.25)" : "0 20px 60px rgba(0,0,0,0.4)") : "none",
      }}
    >
      {featured && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(135deg,var(--em),var(--copper))",
          color: "var(--obs)", padding: "5px 20px", borderRadius: 20,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          whiteSpace: "nowrap", zIndex: 2, boxShadow: "0 4px 20px rgba(0,200,150,0.4)",
        }}>★ Most Popular</div>
      )}
      <div className={featured ? "" : "glass"} style={{
        borderRadius: 18, padding: "36px 32px",
        background: featured ? "var(--obs3)" : undefined,
        border: featured ? "none" : undefined,
        height: "100%", display: "flex", flexDirection: "column",
        fontFamily: "'Outfit', system-ui, sans-serif",
      }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: featured ? "rgba(0,200,150,0.15)" : "rgba(240,238,233,0.05)", border: `1px solid ${featured ? "rgba(0,200,150,0.3)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>
          {pkg.icon}
        </div>
        <div style={{ fontSize: 11, color: featured ? "var(--em)" : "rgba(240,238,233,0.35)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{pkg.tag}</div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 600, color: "var(--pearl)", marginBottom: 8, lineHeight: 1.2 }}>{pkg.name}</h3>
        <p style={{ fontSize: 14, color: "rgba(240,238,233,0.45)", marginBottom: 24, fontWeight: 300, lineHeight: 1.7 }}>{pkg.description}</p>
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 13, color: featured ? "var(--em)" : "rgba(240,238,233,0.3)", marginTop: 4 }}>$</span>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56, fontWeight: 700, lineHeight: 1, color: featured ? "var(--em)" : "var(--pearl)" }}>
              {pkg.price.toLocaleString()}
            </span>
          </div>
          <span style={{ fontSize: 12, color: "rgba(240,238,233,0.3)", letterSpacing: "0.05em" }}>flat fee · no hidden costs</span>
        </div>
        <ul style={{ listStyle: "none", flex: 1, marginBottom: 28 }}>
          {pkg.includes.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < pkg.includes.length - 1 ? "1px solid rgba(240,238,233,0.05)" : "transparent" }}>
              <span style={{ color: featured ? "var(--em)" : "var(--em3)", fontSize: 12, marginTop: 3, flexShrink: 0 }}>✦</span>
              <span style={{ fontSize: 13, color: "rgba(240,238,233,0.6)", fontWeight: 300, lineHeight: 1.5 }}>{item}</span>
            </li>
          ))}
        </ul>
        <button onClick={() => onSelect(pkg)} style={{
          width: "100%", padding: "14px",
          background: featured ? "linear-gradient(135deg,var(--em),var(--em2))" : "rgba(240,238,233,0.06)",
          color: featured ? "var(--obs)" : "var(--pearl)",
          border: featured ? "none" : "1px solid var(--border)",
          borderRadius: 10, fontSize: 15, fontWeight: 700,
          transition: "all var(--t)", letterSpacing: "0.02em", cursor: "pointer",
          fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
          Get Started →
        </button>
      </div>
    </div>
  );
}

/* ─── About Preview ─── */
function AboutPreview() {
  return (
    <section style={{ background: "var(--obs)", padding: "100px 32px", position: "relative", overflow: "hidden", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <MeshBg />
      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
          <div className="glass" style={{ borderRadius: 24, padding: "40px", background: "linear-gradient(135deg,rgba(0,200,150,0.06) 0%,rgba(20,20,34,0.8) 100%)" }}>
            <div style={{ width: "100%", aspectRatio: "3/4", borderRadius: 16, background: "linear-gradient(135deg,var(--obs3) 0%,var(--slate) 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 28, border: "1px solid var(--border)" }}>
              <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(0,200,150,0.1)", border: "1px solid rgba(0,200,150,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 16 }}>👨‍⚖️</div>
              <span style={{ color: "rgba(240,238,233,0.3)", fontSize: 13 }}>Ryan Cleland, Esq.</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Florida Bar 2023", "Barry Univ. Law", "UCF Technical Writing", "Estate Planning"].map((b) => (
                <span key={b} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", padding: "5px 12px", borderRadius: 20, background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.2)", color: "var(--em)" }}>{b}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div style={{ height: 1, width: 36, background: "linear-gradient(to right,transparent,var(--em))" }} />
              <span style={{ fontSize: 11, color: "var(--em)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Your Attorney</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 8 }}>
              <span style={{ color: "var(--pearl)" }}>Ryan Cleland,</span><br />
              <span className="copper-text">Esq.</span>
            </h2>
            <div style={{ fontSize: 14, color: "var(--em)", fontWeight: 500, marginBottom: 28, letterSpacing: "0.05em" }}>Estate Planning & Probate Administration · Florida Bar</div>
            <p style={{ fontSize: 15, color: "rgba(240,238,233,0.55)", fontWeight: 300, lineHeight: 1.9, marginBottom: 20 }}>
              Ryan Cleland is a Florida-licensed attorney admitted to the Florida Bar in 2023, practicing exclusively in estate planning and probate administration. He earned his J.D. from Barry University's Dwayne O. Andreas School of Law.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["⚖️", "Florida Bar Admitted, 2023"], ["🎓", "J.D., Barry University School of Law (2022)"], ["📋", "Focus: Estate Planning & Probate Administration"], ["📍", "Serving all of Florida — fully remote"]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, fontSize: 14, marginTop: 2 }}>{icon}</span>
                  <span style={{ fontSize: 14, color: "rgba(240,238,233,0.5)", fontWeight: 300 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const reviews = [
    { q: "Ryan walked me through the entire trust process. Documents in hand within a week. Far better than LegalZoom with no attorney.", n: "Margaret T.", l: "Naples, FL" },
    { q: "I put off my estate plan for years because I thought it would cost thousands. This was painless, professional, and done in days.", n: "David K.", l: "Fort Myers, FL" },
    { q: "Having a real Florida Bar attorney sign off gave me confidence no document service could. Impeccably prepared.", n: "Patricia W.", l: "Sarasota, FL" },
  ];
  return (
    <section style={{ background: "var(--obs3)", padding: "100px 32px", position: "relative", overflow: "hidden", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 11, color: "var(--em)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Client Experiences</span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, color: "var(--pearl)", marginTop: 12 }}>
            Florida families, <em className="em-text">protected.</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {reviews.map((r, i) => (
            <div key={i} className="glass" style={{ padding: "32px 28px", borderRadius: 16, position: "relative" }}>
              <div style={{ color: "var(--em)", fontSize: 16, marginBottom: 16, letterSpacing: 3 }}>★★★★★</div>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 400, color: "rgba(240,238,233,0.7)", lineHeight: 1.8, fontStyle: "italic", marginBottom: 20 }}>
                &ldquo;{r.q}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,var(--em3),var(--copper))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--obs)" }}>
                  {r.n[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--pearl)" }}>{r.n}</div>
                  <div style={{ fontSize: 11, color: "rgba(240,238,233,0.3)" }}>{r.l}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CtaBanner({ setView }: { setView: (v: string) => void }) {
  return (
    <section style={{ background: "linear-gradient(135deg,var(--obs2) 0%,var(--slate) 50%,var(--obs2) 100%)", padding: "100px 32px", position: "relative", overflow: "hidden", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(0,200,150,0.08) 0%,transparent 70%)" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(34px,5vw,60px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
          <span style={{ color: "var(--pearl)" }}>Don&apos;t leave your<br />family unprotected.</span>
        </h2>
        <p style={{ fontSize: 18, color: "rgba(240,238,233,0.45)", fontWeight: 300, marginBottom: 40 }}>
          Wills from $299. Trusts from $899. Attorney-prepared. Online. Florida.
        </p>
        <button onClick={() => setView("packages")} style={{
          background: "linear-gradient(135deg,var(--em),var(--em2))",
          color: "var(--obs)", border: "none", padding: "18px 48px",
          borderRadius: 12, fontSize: 18, fontWeight: 700, letterSpacing: "0.02em",
          boxShadow: "0 0 60px rgba(0,200,150,0.3),0 8px 40px rgba(0,200,150,0.2)",
          transition: "all var(--t)", cursor: "pointer",
          fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
          Start My Estate Plan →
        </button>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer({ setView }: { setView: (v: string) => void }) {
  return (
    <footer style={{ background: "var(--obs)", borderTop: "1px solid var(--border)", padding: "60px 32px 28px", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700 }}>
                <span className="em-text">Cleland</span>
                <span style={{ color: "rgba(240,238,233,0.7)" }}> Law</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(240,238,233,0.3)", lineHeight: 1.8, fontWeight: 300, maxWidth: 300 }}>
              Attorney-prepared estate planning for Florida families. Flat-fee, fully online. Personally reviewed by Ryan Cleland, Esq.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 11, color: "var(--em)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Services</h4>
            {["Last Will & Testament", "Revocable Living Trust", "Complete Estate Plan"].map((s) => (
              <button key={s} onClick={() => setView("packages")} style={{ display: "block", background: "none", border: "none", color: "rgba(240,238,233,0.35)", fontSize: 13, fontWeight: 300, padding: "5px 0", textAlign: "left", transition: "color var(--t)", cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>{s}</button>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, color: "var(--em)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Company</h4>
            {([["home", "Home"], ["about", "About Ryan"], ["packages", "Pricing"]] as const).map(([v, l]) => (
              <button key={v} onClick={() => setView(v)} style={{ display: "block", background: "none", border: "none", color: "rgba(240,238,233,0.35)", fontSize: 13, fontWeight: 300, padding: "5px 0", textAlign: "left", transition: "color var(--t)", cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
          <p style={{ color: "rgba(240,238,233,0.2)", fontSize: 12 }}>
            © {new Date().getFullYear()} Cleland Law · Ryan Cleland, Esq. · Florida Bar · Licensed in Florida Only
          </p>
          <p style={{ color: "rgba(240,238,233,0.15)", fontSize: 11, maxWidth: 500, textAlign: "right", lineHeight: 1.6 }}>
            Attorney advertising. This site is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Checkout ─── */
type FormData = {
  firstName: string; lastName: string; email: string; emailConfirm: string; phone: string;
  familyStatus: string; spouseName: string; children: string;
  primaryBeneficiary: string; contingentBeneficiary: string;
  personalRepresentative: string; successor: string;
  assets: string; specialInstructions: string; consentTerms: boolean;
};

function Checkout({ pkg, setView }: { pkg: Package; setView: (v: string) => void }) {
  const [step, setStep] = useState(1);
  const [fd, setFd] = useState<FormData>({
    firstName: "", lastName: "", email: "", emailConfirm: "", phone: "",
    familyStatus: "", spouseName: "", children: "",
    primaryBeneficiary: "", contingentBeneficiary: "",
    personalRepresentative: "", successor: "",
    assets: "", specialInstructions: "", consentTerms: false,
  });
  const [errs, setErrs] = useState<Record<string, string>>({});

  const upd = (k: keyof FormData, v: string | boolean) => setFd((p) => ({ ...p, [k]: v }));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 2) {
      if (!fd.firstName.trim()) e.firstName = "Required";
      if (!fd.lastName.trim()) e.lastName = "Required";
      if (!/\S+@\S+\.\S+/.test(fd.email)) e.email = "Valid email required";
      if (fd.email !== fd.emailConfirm) e.emailConfirm = "Emails must match";
      if (!fd.phone.trim()) e.phone = "Required";
      if (!fd.consentTerms) e.consentTerms = "Required to proceed";
    }
    if (s === 3) {
      if (!fd.familyStatus) e.familyStatus = "Required";
      if (!fd.primaryBeneficiary.trim()) e.primaryBeneficiary = "Required";
      if (!fd.personalRepresentative.trim()) e.personalRepresentative = "Required";
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrs(e);
    if (!Object.keys(e).length) setStep((s) => s + 1);
  };

  const inputStyle = (field: string) => ({
    background: errs[field] ? "rgba(255,107,107,0.08)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${errs[field] ? "rgba(255,107,107,0.5)" : "var(--border)"}`,
    borderRadius: 10, padding: "13px 16px", color: "var(--pearl)",
    fontSize: 15, outline: "none", width: "100%",
    fontFamily: "'Outfit', system-ui, sans-serif", transition: "all var(--t)",
  });

  const STEPS = [{ id: 1, label: "Package" }, { id: 2, label: "Your Info" }, { id: 3, label: "Details" }, { id: 4, label: "Pay" }, { id: 5, label: "Done" }];

  return (
    <div style={{ minHeight: "100vh", background: "var(--obs)", paddingTop: 70, paddingBottom: 60, fontFamily: "'Outfit', system-ui, sans-serif" }}>
      {/* Step bar */}
      <div style={{ background: "rgba(10,10,15,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "16px 32px", position: "sticky", top: 70, zIndex: 50 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", gap: 4 }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" as any }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                  background: step > s.id ? "var(--em)" : "transparent",
                  border: step > s.id ? "none" : step === s.id ? "2px solid var(--em)" : "2px solid rgba(240,238,233,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700,
                  color: step > s.id ? "var(--obs)" : step === s.id ? "var(--em)" : "rgba(240,238,233,0.3)",
                }}>
                  {step > s.id ? "✓" : s.id}
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", color: step === s.id ? "var(--pearl)" : step > s.id ? "var(--em)" : "rgba(240,238,233,0.25)" }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 1, margin: "0 6px", background: step > s.id ? "var(--em3)" : "var(--border)", transition: "background var(--t)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
        {/* Package pill */}
        <div className="glass" style={{ padding: "16px 24px", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 24 }}>{pkg.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "var(--em)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Selected</div>
              <div style={{ fontSize: 16, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, color: "var(--pearl)" }}>{pkg.name}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontWeight: 700, color: "var(--em)", lineHeight: 1 }}>${pkg.price.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "rgba(240,238,233,0.3)" }}>flat fee</div>
          </div>
        </div>

        <div className="glass" style={{ padding: "40px", borderRadius: 20 }}>
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34, fontWeight: 700, color: "var(--pearl)", marginBottom: 8 }}>Package Confirmed</h2>
              <p style={{ color: "rgba(240,238,233,0.45)", marginBottom: 32, fontWeight: 300 }}>Here&apos;s everything included in your <strong style={{ color: "var(--em)" }}>{pkg.name}</strong>:</p>
              <ul style={{ listStyle: "none", marginBottom: 32 }}>
                {pkg.includes.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < pkg.includes.length - 1 ? "1px solid rgba(240,238,233,0.05)" : "none" }}>
                    <span style={{ color: "var(--em)", fontSize: 12, marginTop: 3, flexShrink: 0 }}>✦</span>
                    <span style={{ color: "rgba(240,238,233,0.65)", fontSize: 15 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setStep(2)} style={{ width: "100%", padding: "15px", background: "linear-gradient(135deg,var(--em),var(--em2))", color: "var(--obs)", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>
                Continue to Your Information →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34, fontWeight: 700, color: "var(--pearl)", marginBottom: 8 }}>Your Information</h2>
              <p style={{ color: "rgba(240,238,233,0.4)", marginBottom: 32, fontWeight: 300 }}>Encrypted and protected under attorney-client privilege.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {(["firstName", "lastName"] as const).map((f) => (
                  <div key={f} style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,238,233,0.4)", marginBottom: 7 }}>{f === "firstName" ? "First Name" : "Last Name"} *</label>
                    <input value={fd[f]} onChange={(e) => upd(f, e.target.value)} placeholder={f === "firstName" ? "First Name" : "Last Name"} style={inputStyle(f)} />
                    {errs[f] && <p style={{ color: "#FF6B6B", fontSize: 11, marginTop: 5 }}>{errs[f]}</p>}
                  </div>
                ))}
              </div>
              {(["email", "emailConfirm", "phone"] as const).map((f) => (
                <div key={f} style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,238,233,0.4)", marginBottom: 7 }}>{f === "email" ? "Email Address" : f === "emailConfirm" ? "Confirm Email" : "Phone Number"} *</label>
                  <input type={f === "phone" ? "tel" : "email"} value={fd[f]} onChange={(e) => upd(f, e.target.value)} placeholder={f === "email" ? "Email Address" : f === "emailConfirm" ? "Confirm Email" : "Phone Number"} style={inputStyle(f)} />
                  {errs[f] && <p style={{ color: "#FF6B6B", fontSize: 11, marginTop: 5 }}>{errs[f]}</p>}
                </div>
              ))}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,238,233,0.4)", marginBottom: 7 }}>State *</label>
                <select style={{ ...inputStyle("state") }}><option value="Florida">Florida</option></select>
                <p style={{ fontSize: 11, color: "rgba(240,238,233,0.25)", marginTop: 5 }}>Currently serving Florida residents only.</p>
              </div>
              <div style={{ background: errs.consentTerms ? "rgba(255,107,107,0.06)" : "rgba(0,200,150,0.04)", border: `1px solid ${errs.consentTerms ? "rgba(255,107,107,0.3)" : "rgba(0,200,150,0.15)"}`, borderRadius: 12, padding: "20px", marginBottom: 28 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                  <input type="checkbox" checked={fd.consentTerms} onChange={(e) => upd("consentTerms", e.target.checked)} style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2, cursor: "pointer", accentColor: "var(--em)" }} />
                  <span style={{ color: "rgba(240,238,233,0.5)", lineHeight: 1.7, fontWeight: 300, fontSize: 13 }}>
                    I acknowledge that proceeding establishes an attorney-client relationship with Ryan Cleland, Esq. My information is protected under attorney-client privilege. Documents are governed by Florida law. I agree to the Terms of Engagement and Privacy Policy. *
                  </span>
                </label>
                {errs.consentTerms && <p style={{ color: "#FF6B6B", fontSize: 11, marginTop: 8 }}>{errs.consentTerms}</p>}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px", background: "transparent", color: "rgba(240,238,233,0.4)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>← Back</button>
                <button onClick={next} style={{ flex: 2, padding: "14px", background: "linear-gradient(135deg,var(--em),var(--em2))", color: "var(--obs)", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>Continue to Document Details →</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34, fontWeight: 700, color: "var(--pearl)", marginBottom: 8 }}>Document Details</h2>
              <p style={{ color: "rgba(240,238,233,0.4)", marginBottom: 32, fontWeight: 300 }}>Ryan will use this to prepare your {pkg.name}.</p>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,238,233,0.4)", marginBottom: 7 }}>Family / Marital Status *</label>
                <select value={fd.familyStatus} onChange={(e) => upd("familyStatus", e.target.value)} style={inputStyle("familyStatus")}>
                  <option value="">Select your situation...</option>
                  {FAMILY.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errs.familyStatus && <p style={{ color: "#FF6B6B", fontSize: 11, marginTop: 5 }}>{errs.familyStatus}</p>}
              </div>
              {(["primaryBeneficiary", "contingentBeneficiary", "personalRepresentative", "successor"] as const).map((f) => (
                <div key={f} style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,238,233,0.4)", marginBottom: 7 }}>
                    {f === "primaryBeneficiary" ? "Primary Beneficiary *" : f === "contingentBeneficiary" ? "Contingent Beneficiary" : f === "personalRepresentative" ? "Personal Representative *" : "Successor / Alternate"}
                  </label>
                  <input value={fd[f]} onChange={(e) => upd(f, e.target.value)} style={inputStyle(f)} placeholder="Full legal name and relationship" />
                  {errs[f] && <p style={{ color: "#FF6B6B", fontSize: 11, marginTop: 5 }}>{errs[f]}</p>}
                </div>
              ))}
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: "13px", background: "transparent", color: "rgba(240,238,233,0.4)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>← Back</button>
                <button onClick={next} style={{ flex: 2, padding: "14px", background: "linear-gradient(135deg,var(--em),var(--em2))", color: "var(--obs)", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>Review & Pay →</button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34, fontWeight: 700, color: "var(--pearl)", marginBottom: 8 }}>Review & Pay</h2>
              <p style={{ color: "rgba(240,238,233,0.4)", marginBottom: 32, fontWeight: 300 }}>Confirm your order and complete secure payment.</p>
              <div style={{ background: "rgba(0,200,150,0.04)", border: "1px solid rgba(0,200,150,0.15)", borderRadius: 14, padding: "24px", marginBottom: 24 }}>
                <div style={{ fontSize: 11, color: "var(--em)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Order Summary</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "rgba(240,238,233,0.6)", fontSize: 15 }}>{pkg.icon} {pkg.name}</span>
                  <span style={{ color: "var(--pearl)", fontWeight: 500 }}>${pkg.price.toLocaleString()}</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(240,238,233,0.06)", paddingTop: 12, marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 600, color: "var(--pearl)" }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: "var(--em)" }}>${pkg.price.toLocaleString()}</span>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1.5px dashed rgba(0,200,150,0.2)", borderRadius: 14, padding: "32px 24px", textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 13, color: "rgba(240,238,233,0.4)", marginBottom: 6 }}>🔐 Stripe Secure Payment Form</div>
                <div style={{ fontSize: 12, color: "rgba(240,238,233,0.2)" }}>Stripe Elements mounts here in production · PCI-DSS Level 1 compliant</div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(3)} style={{ flex: 1, padding: "13px", background: "transparent", color: "rgba(240,238,233,0.4)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>← Back</button>
                <button onClick={() => setStep(5)} style={{ flex: 2, padding: "16px", background: "linear-gradient(135deg,var(--em) 0%,var(--em2) 50%,var(--copper) 100%)", color: "var(--obs)", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700, letterSpacing: "0.02em", boxShadow: "0 4px 30px rgba(0,200,150,0.3)", cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>
                  🔒 Pay ${pkg.price.toLocaleString()} & Submit →
                </button>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 28px", background: "rgba(0,200,150,0.1)", border: "2px solid var(--em)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, animation: "glow 2s ease-in-out infinite" }}>✓</div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 42, fontWeight: 700, color: "var(--pearl)", marginBottom: 12 }}>Order Confirmed.</h2>
              <p className="em-text" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", marginBottom: 28 }}>Your estate plan is in good hands.</p>
              <p style={{ color: "rgba(240,238,233,0.45)", fontSize: 15, lineHeight: 1.8, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
                Confirmation sent to <strong style={{ color: "var(--em)" }}>{fd.email}</strong>. Ryan will prepare your documents within <strong style={{ color: "var(--pearl)" }}>3–5 business days</strong>.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setView("home")} style={{ padding: "12px 28px", background: "transparent", color: "rgba(240,238,233,0.5)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>Return Home</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Root ─── */
export default function HomePage() {
  const [view, setView] = useState("home");
  const [pkg, setPkg] = useState<Package>(PKGS[1]);

  const go = (v: string) => {
    setView(v);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <GlobalStyles />
      <Nav view={view} setView={go} />
      {view === "home" && (
        <main>
          <Hero setView={go} />
          <Why />
          <HowItWorks />
          <Packages setView={go} setPkg={setPkg} />
          <AboutPreview />
          <Testimonials />
          <CtaBanner setView={go} />
          <Footer setView={go} />
        </main>
      )}
      {view === "packages" && (
        <main style={{ paddingTop: 70 }}>
          <Packages setView={go} setPkg={setPkg} />
          <Footer setView={go} />
        </main>
      )}
      {view === "about" && (
        <main style={{ paddingTop: 70 }}>
          <AboutPreview />
          <Footer setView={go} />
        </main>
      )}
      {view === "checkout" && <Checkout pkg={pkg} setView={go} />}
    </>
  );
}
