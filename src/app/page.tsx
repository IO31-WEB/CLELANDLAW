import { Metadata } from "next";
import Nav          from "@/components/layout/Nav";
import Hero         from "@/components/sections/Hero";
import Why          from "@/components/sections/Why";
import HowItWorks   from "@/components/sections/HowItWorks";
import Packages     from "@/components/sections/Packages";
import AboutPreview from "@/components/sections/AboutPreview";
import Testimonials from "@/components/sections/Testimonials";
import CtaBanner    from "@/components/sections/CtaBanner";
import Footer       from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cleland Law — Florida Estate Planning Attorney Online",
};

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Why />
      <HowItWorks />
      <Packages />
      <AboutPreview />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </main>
  );
}
