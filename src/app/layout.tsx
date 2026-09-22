import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import { UIProvider } from "@/components/ui";

export const metadata: Metadata = {
  title: "تریدچاره | پلتفرم جامع بازرگانی، ترخیص کالا و هوش مصنوعی تجارت",
  description:
    "تریدچاره؛ پلتفرم یکپارچه خدمات بازرگانی، ترخیص از کلیه گمرکات، ثبت سفارش، تخصیص ارز، نرخ‌نامه خدمات، نرخ لحظه‌ای ارز و هوش مصنوعی اختصاصی تجارت.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full scroll-smooth">
      <body className="min-h-full bg-white font-sans text-slate-800 antialiased">
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
