import Hero from "@/components/Hero";
import About from "@/components/About";
import { Coverage, Process, ServicesGrid } from "@/components/Services";
import { AiSection, Rates } from "@/components/Trade";
import { CtaBanner, Faq, Testimonials, Trust } from "@/components/Closing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تریدچاره | شرکت بازرگانی و ترخیص کالا با ۲۰ سال سابقه",
};

export default function Home() {
  return (
    <main>
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
