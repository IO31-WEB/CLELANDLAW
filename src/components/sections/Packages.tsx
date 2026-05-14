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

const packages: Package[] = [
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
    description: "Skip probate entirely. A comprehensive trust that transfers assets seamlessly, privately, and without court involvement.",
    includes: ["Revocable Living Trust Agreement", "Pour-Over Will included", "Certificate of Trust", "Asset transfer guidance", "30-min strategy call with Ryan", "60-day unlimited revisions"],
  },
  {
    id: "complete",
    icon: "⚖️",
    tag: "Complete Suite",
    name: "Complete Estate Plan",
    price: 1499,
    description: "The full suite — every document your family needs, personally curated and reviewed by Ryan in a single engagement.",
    includes: ["Revocable Living Trust", "Last Will & Testament", "Durable Power of Attorney", "Healthcare Surrogate", "Living Will", "Priority 3-day delivery"],
  },
];

export default function Packages() {
  const [selected, setSelected] = useState<string>("trust");

  return (
    <section id="packages" className="py-20 px-6 bg-[#0F0F18]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-white/70 text-lg">Every package includes personal review by Ryan Cleland, Esq.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`glass p-8 rounded-3xl transition-all hover:-translate-y-2 ${selected === pkg.id ? "ring-2 ring-[#00C896] scale-[1.02]" : ""}`}
              onClick={() => setSelected(pkg.id)}
            >
              {index === 1 && (
                <div className="inline-block bg-[#00C896] text-black text-xs font-bold tracking-widest px-5 py-1 rounded-full mb-6">
                  MOST POPULAR
                </div>
              )}

              <div className="text-6xl mb-6">{pkg.icon}</div>
              <div className="uppercase text-sm tracking-widest text-[#00C896] mb-2">{pkg.tag}</div>
              <h3 className="text-2xl font-semibold mb-3">{pkg.name}</h3>
              <p className="text-white/60 mb-8 leading-relaxed">{pkg.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold">${pkg.price}</span>
                <span className="text-white/40 ml-1">flat fee</span>
              </div>

              <ul className="space-y-3 mb-10 text-sm">
                {pkg.includes.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#00C896]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.location.href = "#checkout"; }}
                className="block w-full text-center py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-semibold transition-all"
              >
                Select This Plan →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
