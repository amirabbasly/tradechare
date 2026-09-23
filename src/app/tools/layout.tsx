import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اپلیکیشن و ابزارهای بازرگانی",
  description:
    "جعبه‌ابزار بازرگان: مبدل ارز، ماشین‌حساب گمرکی، تابلوی زنده نرخ‌ها، استعلام تعرفه و رهگیری پرونده + اپلیکیشن موبایل تریدچاره.",
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
