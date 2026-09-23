import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "چاره‌بات؛ هوش مصنوعی اختصاصی بازرگانی و گمرک",
  description:
    "با چاره‌بات گفت‌وگو کنید: تشخیص HS Code، محاسبه حقوق ورودی، تحلیل بازار ارز و پیش‌بینی زمان ترخیص. رایگان و ۲۴ ساعته.",
  alternates: { canonical: "/ai" },
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
