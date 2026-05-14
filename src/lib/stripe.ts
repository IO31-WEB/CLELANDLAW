import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export const PACKAGES = {
  will: {
    id: "will",
    name: "Last Will & Testament",
    price: 299_00,
    stripePriceId: process.env.STRIPE_PRICE_WILL!,
    icon: "📜",
  },
  trust: {
    id: "trust",
    name: "Revocable Living Trust",
    price: 899_00,
    stripePriceId: process.env.STRIPE_PRICE_TRUST!,
    icon: "🏛",
  },
  complete: {
    id: "complete",
    name: "Complete Estate Plan",
    price: 1499_00,
    stripePriceId: process.env.STRIPE_PRICE_COMPLETE!,
    icon: "⚖️",
  },
} as const;

export type PackageId = keyof typeof PACKAGES;
