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
          <p
