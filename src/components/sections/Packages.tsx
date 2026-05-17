"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      "45-min planning call with Ryan",
      "Priority 3-day delivery",
      "1-year amendment service",
    ],
  },
];

export default function Packages() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("trust");
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelect = (pkg: Package) => {
    setSelected(pkg.id);
    setLoading(pkg.id);
    router.push(`/checkout?package=${pkg.id}`);
  };

  return (
    <section id="packages" className="py-20 px-6 bg-[#0F0F18]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#00C896] text-sm font-semibold tracking-widest uppercase mb-3">
            Packages &amp; Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Transparent Pricing. Zero Surprises.
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Every package includes personal review by Ryan Cleland, Esq.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative glass p-8 rounded-3xl transition-all cursor-pointer hover:-translate-y-2 ${
                selected === pkg.id
                  ? "ring-2 ring-[#00C896] scale-[1.02] shadow-[0_0_40px_rgba(0,200,150,0.15)]"
                  : ""
              } ${index === 1 ? "md:-mt-4" : ""}`}
              onClick={() => setSelected(pkg.id)}
            >
              {index === 1 && (
                <div className="text-center mb-6">
                  <span className="bg-[#00C896] text-black text-xs font-bold tracking-widest px-5 py-1.5 rounded-full">
                    ★ MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-5xl mb-5">{pkg.icon}</div>
              <div className="uppercase text-xs tracking-widest text-[#00C896] mb-2 font-semibold">
                {pkg.tag}
              </div>
              <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
              <p className="text-white/55 mb-6 leading-relaxed text-sm">
                {pkg.description}
              </p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-[#00C896]">
                  ${pkg.price.toLocaleString()}
                </span>
                <span className="text-white/35 text-sm ml-2">flat fee</span>
              </div>

              <ul className="space-y-2.5 mb-8 text-sm">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-white/5 pb-2.5">
                    <span className="text-[#00C896] flex-shrink-0 mt-0.5">✦</span>
                    <span className="text-white/65">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(pkg);
                }}
                disabled={loading === pkg.id}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all disabled:opacity-70 ${
                  index === 1
                    ? "bg-[#00C896] hover:bg-[#00E5A8] text-black shadow-[0_4px_20px_rgba(0,200,150,0.3)]"
                    : "bg-white/8 hover:bg-white/15 border border-white/20 text-white"
                }`}
              >
                {loading === pkg.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Get Started →"
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 rounded-2xl bg-white/3 border border-white/8 text-center">
          <p className="text-white/35 text-xs leading-relaxed max-w-3xl mx-auto">
            <strong className="text-white/50">Attorney Advertising &amp; Disclaimer:</strong> Documents
            prepared through this service are for Florida residents only. Purchasing a package
            establishes an attorney-client relationship with Ryan Cleland, Esq. No results are
            guaranteed. Florida Bar compliant.
          </p>
        </div>
      </div>
    </section>
  );
}
