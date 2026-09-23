import type { Metadata } from "next";
import "./globals.css";
import { UIProvider } from "@/components/ui";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Widgets from "@/components/Widgets";

export const metadata: Metadata = {
  title: "تریدچاره | پلتفرم جامع بازرگانی، ترخیص کالا و هوش مصنوعی تجارت",
  description:
    "تریدچاره؛ شرکت بازرگانی با ۲۰ سال سابقه؛ ترخیص از کلیه گمرکات، ثبت سفارش، تخصیص ارز، نرخ لحظه‌ای ارز و طلا، ماشین‌حساب حقوق گمرکی و هوش مصنوعی اختصاصی تجارت.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full scroll-smooth">
      <body className="min-h-full bg-white font-sans text-slate-800 antialiased">
        <UIProvider>
          <Navbar />
          {children}
          <Footer />
          <Widgets />
        </UIProvider>
      </body>
    </html>
  );
}
