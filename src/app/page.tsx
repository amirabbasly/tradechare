import Hero from "@/components/Hero";
import About from "@/components/About";
import { Coverage, Process, ServicesGrid } from "@/components/Services";
import { AiSection, Rates } from "@/components/Trade";
import { CtaBanner, Faq, Testimonials, Trust } from "@/components/Closing";
import { FaqJsonLd } from "@/components/Seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "تریدچاره | شرکت بازرگانی و ترخیص کالا با ۲۰ سال سابقه",
  },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <FaqJsonLd />
      <Hero />
      <About />
      <ServicesGrid />
      <AiSection />
      <Rates />
      <Process />
      <Coverage />
      <Trust />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </main>
  );
}
