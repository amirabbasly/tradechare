import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Coverage, Process, ServicesGrid } from "@/components/Services";
import { AiSection, Pricing, Rates } from "@/components/Trade";
import { CtaBanner, Faq, Testimonials, Trust } from "@/components/Closing";
import Footer from "@/components/Footer";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesGrid />
        <AiSection />
        <Rates />
        <Pricing />
        <Process />
        <Coverage />
        <Trust />
        <Testimonials />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
      <Widgets />
    </>
  );
}
