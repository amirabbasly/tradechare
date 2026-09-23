import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ماشین‌حساب حقوق گمرکی و مبدل ارز",
  description:
    "محاسبه آنلاین حقوق ورودی گمرک (حقوق گمرکی ۴٪، سود بازرگانی، مالیات ۱۰٪ و هلال‌احمر) و تبدیل لحظه‌ای ارزها با نرخ زنده بازار.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
