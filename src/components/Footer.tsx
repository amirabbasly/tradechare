"use client";

import { ADDRESSES, NAV_LINKS, PHONES, SERVICES } from "@/lib/data";
import { EnamadSeal } from "./Closing";
import { I, Logo, useUI } from "./ui";

const GUIDES = [
  { t: "ثبت سفارش در سامانه جامع تجارت", s: "order-registration-samane" },
  { t: "ترخیص خودرو از گمرک", s: "car-clearance" },
  { t: "تخصیص ارز نیما و توافقی", s: "currency-allocation-import" },
  { t: "صفر تا صد صادرات کالا", s: "export-guide" },
  { t: "رفع تعهد ارزی صادرات", s: "export-commitment" },
  { t: "کارت بازرگانی؛ شرایط و مدارک", s: "business-card" },
  { t: "قوانین و ممنوعیت‌های واردات ۱۴۰۵", s: "import-rules-1405" },
  { t: "بیمه باربری و بازرسی کالا", s: "cargo-insurance" },
  { t: "صادرات به عراق", s: "export-to-iraq" },
];

export default function Footer() {
  const { openContact, setChatOpen } = useUI();

  return (
    <footer id="contact" className="relative scroll-mt-28 overflow-hidden">
      {/* 3D wave divider */}
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="relative z-10 -mb-px block h-[70px] w-full sm:h-[100px]" aria-hidden="true">
        <defs>
          <linearGradient id="wave-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#4cab6f" />
            <stop offset="100%" stopColor="#107242" />
          </linearGradient>
        </defs>
        <path d="M0,60 C240,110 480,10 720,50 C960,90 1200,20 1440,60 L1440,110 L0,110 Z" fill="url(#wave-g)" opacity="0.35" />
        <path d="M0,80 C260,120 520,30 780,65 C1040,100 1240,40 1440,75 L1440,110 L0,110 Z" fill="url(#wave-g)" />
      </svg>

      {/* light tech-blue 3D body */}
      <div className="relative bg-gradient-to-b from-brand-500 via-brand-600 to-brand-900">
        <div className="bg-grid-white absolute inset-0 opacity-40" />
        <div className="animate-drift absolute top-0 right-1/4 h-80 w-80 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="animate-drift absolute bottom-20 left-10 h-72 w-72 rounded-full bg-stone-200/20 blur-3xl [animation-delay:2.5s]" />
        {/* floating 3D cubes */}
        <div className="animate-floaty absolute top-16 left-[8%] hidden h-16 w-16 rounded-3xl border border-white/40 bg-white/10 shadow-glow backdrop-blur lg:block" />
        <div className="animate-floaty-sm absolute top-40 right-[5%] hidden h-12 w-12 rounded-2xl border border-white/40 bg-white/10 backdrop-blur lg:block" />
        <div className="animate-floaty absolute bottom-40 left-[16%] hidden h-10 w-10 rotate-12 rounded-xl border border-white/40 bg-amber-300/20 backdrop-blur lg:block [animation-delay:1.8s]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6">
          {/* top glass panel */}
          <div className="glass grid gap-8 rounded-[32px] border border-white/50 p-8 shadow-glow lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr] lg:p-10">
            {/* brand */}
            <div className="flex flex-col items-start gap-4">
              <Logo />
              <p className="text-[13.5px] leading-8 text-slate-600">
                تریدچاره؛ پلتفرم جامع خدمات بازرگانی، ترخیص کالا از کلیه گمرکات،
                ثبت سفارش، تخصیص ارز و مدیریت سرمایه تجاری با هوش مصنوعی اختصاصی.
              </p>
              <div className="flex items-center gap-2.5">
                {[
                  { n: "send", t: "تلگرام" },
                  { n: "chat", t: "واتساپ" },
                  { n: "globe", t: "وب‌سایت" },
                  { n: "phone", t: "تماس" },
                ].map((s) => (
                  <button
                    key={s.n}
                    title={s.t}
                    onClick={openContact}
                    className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft transition hover:scale-110 hover:shadow-glow"
                  >
                    <I name={s.n} className="h-5 w-5" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setChatOpen(true)}
                className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50 px-5 py-3 text-[13px] font-black text-brand-700 transition hover:border-brand-500 hover:bg-brand-100"
              >
                <I name="bot" className="h-5 w-5" />
                گفت‌وگو با چاره‌بات (۲۴ ساعته)
              </button>
            </div>

            {/* quick links */}
            <div>
              <h4 className="text-[15px] font-black text-ink-900">دسترسی سریع</h4>
              <ul className="mt-4 flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="group flex items-center gap-2 rounded-xl px-2 py-2 text-[13.5px] font-bold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-300 transition group-hover:bg-brand-600" />
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/ai" className="group flex items-center gap-2 rounded-xl px-2 py-2 text-[13.5px] font-black text-brand-700 transition hover:bg-brand-50">
                    <I name="bot" className="h-4 w-4" />
                    چاره‌بات — هوش مصنوعی
                  </a>
                </li>
                <li>
                  <a href="/about" className="group flex items-center gap-2 rounded-xl px-2 py-2 text-[13.5px] font-bold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-300 transition group-hover:bg-brand-600" />
                    درباره تریدچاره
                  </a>
                </li>
                <li>
                  <a href="/markets" className="group flex items-center gap-2 rounded-xl px-2 py-2 text-[13.5px] font-bold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-300 transition group-hover:bg-brand-600" />
                    نرخ لحظه‌ای ارز و طلا
                  </a>
                </li>
              </ul>
            </div>

            {/* services */}
            <div>
              <h4 className="text-[15px] font-black text-ink-900">خدمات</h4>
              <ul className="mt-4 flex flex-col gap-1">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.title}>
                    <a href="/services" className="group flex w-full items-center gap-2 rounded-xl px-2 py-2 text-start text-[13.5px] font-bold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300 transition group-hover:bg-brand-600" />
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* contact */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[15px] font-black text-ink-900">تماس با ما</h4>
              <div className="flex flex-col gap-2.5">
                {PHONES.map((p) => (
                  <a
                    key={p.value}
                    href={p.href}
                    className="group flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/70 p-3 transition hover:border-brand-400 hover:shadow-card"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft transition group-hover:scale-110">
                      <I name="phone" className="h-4.5 w-4.5" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[11.5px] font-bold text-slate-400">{p.label}</span>
                      <span dir="ltr" className="block text-[16px] font-black text-ink-900 tabular-nums">{p.value}</span>
                    </span>
                  </a>
                ))}
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl bg-brand-950 p-4 text-white">
                <I name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                <p className="text-[12.5px] leading-7 font-bold text-stone-100">
                  {ADDRESSES.tehran.text}
                </p>
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl border border-brand-200 bg-brand-50 p-4">
                <I name="globe" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <p className="text-[12.5px] leading-7 font-bold text-slate-600">
                  <span className="font-black text-brand-800">دفتر دبی: </span>
                  {ADDRESSES.dubai.text}
                </p>
              </div>
            </div>
          </div>

          {/* guides strip */}
          <div className="mt-6 rounded-[28px] border border-white/25 bg-white/10 px-7 py-6 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-[15px] font-black text-white">جدیدترین راهنماهای بازرگانی</h4>
              <a href="/blog" className="flex items-center gap-1.5 text-[12.5px] font-black text-amber-300 transition hover:text-amber-200">
                همه مقالات
                <I name="arrow" className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((g) => (
                <a
                  key={g.s}
                  href={`/blog/${g.s}`}
                  className="group flex items-center gap-2 rounded-xl px-2 py-2 text-[13px] font-bold text-stone-100 transition hover:bg-white/10 hover:text-white"
                >
                  <I name="arrow" className="h-3.5 w-3.5 shrink-0 text-amber-300 transition group-hover:-translate-x-0.5" />
                  {g.t}
                </a>
              ))}
            </div>
          </div>

          {/* licenses strip */}
          <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-[28px] border border-white/25 bg-white/10 px-7 py-5 backdrop-blur-xl lg:flex-row">
            <div className="flex items-center gap-4">
              <EnamadSeal size="sm" />
              <div className="leading-tight text-white">
                <p className="text-[15px] font-black">دارای اینماد و مجوزهای رسمی بازرگانی</p>
                <p className="mt-1 text-[12.5px] font-bold text-stone-200">
                  نماد اعتماد الکترونیکی • کارگزاری رسمی گمرک • عضو اتاق بازرگانی • ISO 9001
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {["badge", "shield", "medal"].map((icon, i) => (
                <span key={i} className="grid h-12 w-12 place-items-center rounded-2xl border border-white/30 bg-white/15 text-white backdrop-blur">
                  <I name={icon} className="h-6 w-6" />
                </span>
              ))}
              <a href="#licenses" className="mr-2 rounded-2xl bg-white px-5 py-3 text-[13px] font-black text-brand-800 shadow-glow transition hover:bg-brand-50">
                مشاهده مجوزها
              </a>
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/20 pt-6 text-[12.5px] font-bold text-stone-100 lg:flex-row">
            <p>© ۱۴۰۵ تریدچاره — تمامی حقوق مادی و معنوی محفوظ است.</p>
            <p className="flex items-center gap-2">
              <I name="clock" className="h-4 w-4" />
              {ADDRESSES.hours} • پشتیبانی آنلاین ۲۴ ساعته
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
