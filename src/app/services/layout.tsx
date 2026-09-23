import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدمات بازرگانی؛ ترخیص، ثبت سفارش، حمل و تخصیص ارز",
  description:
    "۸ خدمت تخصصی تریدچاره: ترخیص از کلیه گمرکات، ثبت سفارش، تخصیص ارز، حمل بین‌المللی، اعتبارات بانکی، استعلام تعرفه، مدیریت سرمایه و بیمه باربری.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
