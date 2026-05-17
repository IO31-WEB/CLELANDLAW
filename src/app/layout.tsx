import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Only load weights actually used — cuts font payload ~60%
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],   // removed 300, 500, 900 — not used
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // removed 200, 300 — not used
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Cleland Law — Florida Estate Planning Attorney",
    template: "%s | Cleland Law",
  },
  description:
    "Attorney-drafted wills and trusts for Florida families. Flat-fee, fully online, personally reviewed by Ryan Cleland, Esq. — Florida Bar licensed estate planning attorney.",
  keywords: ["Florida estate planning", "will attorney Florida", "living trust Florida", "online estate planning Florida", "Ryan Cleland attorney"],
  authors: [{ name: "Ryan Cleland, Esq." }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://clelandlaw.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Cleland Law",
    title: "Cleland Law — Florida Estate Planning Attorney",
    description: "Attorney-drafted wills and trusts. Flat-fee. Fully online. Florida Bar licensed.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleland Law — Estate Planning Online",
    description: "Wills from $299. Trusts from $899. Attorney-prepared. Florida.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        {/* Preconnect to critical third-party origins BEFORE they're needed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Schema.org — Attorney */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Attorney",
              name: "Ryan Cleland, Esq.",
              url: process.env.NEXT_PUBLIC_APP_URL,
              description: "Florida Bar licensed estate planning attorney offering online will and trust preparation.",
              areaServed: { "@type": "State", name: "Florida" },
              knowsAbout: ["Estate Planning", "Wills", "Trusts", "Probate", "Power of Attorney"],
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "Bar Admission",
                recognizedBy: { "@type": "Organization", name: "The Florida Bar" },
              },
              alumniOf: [
                { "@type": "CollegeOrUniversity", name: "Barry University School of Law" },
                { "@type": "CollegeOrUniversity", name: "University of Central Florida" },
              ],
            }),
          }}
        />
      </head>
      <ClerkProvider>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}
