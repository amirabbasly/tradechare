"use client";

import { useRates } from "@/lib/useRates";
import { CtaBanner } from "@/components/Closing";
import { Breadcrumbs } from "@/components/Seo";
import { I, Reveal, SectionHead, useUI } from "@/components/ui";

const TOOLS = [
  { icon: "coins", title: "مبدل ارز", desc: "تبدیل لحظه‌ای ارزها به یکدیگر با نرخ زنده بازار", href: "/calculator", cta: "استفاده از مبدل" },
  { icon: "calc", title: "ماشین‌حساب حقوق گمرکی", desc: "محاسبه حقوق ورودی طبق قوانین گمرک ایران", href: "/calculator", cta: "محاسبه حقوق ورودی" },
  { icon: "trendUp", title: "تابلوی زنده نرخ‌ها", desc: "نرخ لحظه‌ای ارز، طلا و سکه با تازه‌سازی خودکار", href: "/#rates", cta: "مشاهده تابلو" },
  { icon: "search", title: "استعلام هوشمند تعرفه", desc: "تشخیص HS Code و حقوق ورودی با چاره‌بات", href: "/ai", cta: "استعلام با هوش مصنوعی" },
  { icon: "box", title: "رهگیری پرونده", desc: "پیگیری لحظه‌ای وضعیت پرونده ترخیص شما", href: "/services", cta: "رهگیری پرونده" },
  { icon: "doc", title: "کتابخانه مقالات", desc: "آموزش‌های تخصصی ترخیص، ثبت سفارش و بازار ارز", href: "/blog", cta: "خواندن مقالات" },
];

/** موکاپ موبایل اپلیکیشن با نرخ زنده */
function PhoneMockup() {
  const { items } = useRates("arz");
  const top = items.slice(0, 3);
  return (
    <div className="relative mx-auto w-[270px] sm:w-[300px]">
      <div className="ring-conic animate-spin-slow absolute -inset-6 rounded-[60px] opacity-25 blur-2xl" />
      <div className="animate-floaty relative rounded-[48px] border-[10px] border-ink-900 bg-ink-900 shadow-soft">
        <div className="absolute top-3 right-1/2 z-10 h-6 w-28 translate-x-1/2 rounded-full bg-ink-900" />
        <div className="overflow-hidden rounded-[38px] bg-gradient-to-b from-brand-50 to-white">
          <div className="bg-gradient-to-l from-brand-700 to-brand-500 px-5 pt-12 pb-5 text-white">
            <p className="text-[12px] font-bold text-stone-200">سلام، بازرگان 👋</p>
            <p className="mt-0.5 text-[16px] font-black">تریدچاره</p>
            <div className="mt-3 rounded-2xl bg-white/15 p-3 backdrop-blur">
              <p className="text-[11px] font-bold text-stone-200">دلار آزاد</p>
              <p className="text-[20px] font-black tabular-nums">
                {(top[0]?.toman ?? 104200).toLocaleString("fa-IR")}
              </p>
              <p className="text-[10px] font-bold text-green-300">● زنده</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4">
            {top.map((r) => (
              <div key={r.code} className="flex items-center gap-2.5 rounded-2xl border border-brand-100 bg-white p-2.5 shadow-sm">
                <span className="text-xl">{r.flag}</span>
                <span className="min-w-0 flex-1 truncate text-[11.5px] font-black text-ink-900">{r.name}</span>
                <span className="text-[11px] font-black text-brand-700 tabular-nums">{r.toman.toLocaleString("fa-IR")}</span>
              </div>
            ))}
            <div className="mt-1 grid grid-cols-2 gap-2">
              <span className="rounded-2xl bg-gradient-to-l from-brand-700 to-brand-500 py-2.5 text-center text-[12px] font-black text-white">
                ترخیص کالا
              </span>
              <span className="rounded-2xl border-2 border-brand-200 py-2 text-center text-[12px] font-black text-brand-700">
                چاره‌بات
              </span>
            </div>
          </div>
          <div className="flex items-center justify-around border-t border-brand-100 bg-white px-6 py-3 text-brand-300">
            <I name="anchor" className="h-5 w-5" />
            <I name="chart" className="h-5 w-5 text-brand-600" />
            <I name="bot" className="h-5 w-5" />
            <I name="users" className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const { openContact } = useUI();

  return (
    <main className="overflow-hidden">
      {/* hero */}
      <section className="relative overflow-hidden pt-[150px] pb-12 sm:pt-[170px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
          <div className="animate-drift absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-brand-200/60 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-start">
            <Breadcrumbs
              items={[
                { name: "خانه", href: "/" },
                { name: "ابزارها و اپلیکیشن", href: "/tools" },
              ]}
            />
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-[13px] font-black text-brand-700 shadow-sm">
                <I name="bot" className="h-4 w-4" />
                اپلیکیشن و ابزارهای تریدچاره
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-[30px] leading-[1.7] font-black text-ink-900 sm:text-4xl sm:leading-[1.6] lg:text-[46px]">
                اتاق فرمان تجارت،
                <br />
                در <span className="text-gradient">جیب شما</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="max-w-xl text-[14.5px] leading-8 text-slate-500 sm:text-[16px]">
                نرخ زنده، مبدل ارز، ماشین‌حساب گمرکی، استعلام تعرفه و رهگیری پرونده —
                همه ابزارهایی که یک بازرگان حرفه‌ای هر روز به آن‌ها نیاز دارد.
              </p>
            </Reveal>
            <Reveal delay={240} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={openContact}
                className="btn-shine flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-500 px-7 py-3.5 text-[15px] font-black text-white shadow-soft transition hover:shadow-glow"
              >
                <I name="phone" className="h-5 w-5" />
                دانلود نسخه اندروید
              </button>
              <span className="flex cursor-not-allowed items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-200 bg-white/60 px-7 py-3 text-[14px] font-black text-slate-400">
                <I name="clock" className="h-5 w-5" />
                نسخه iOS به‌زودی
              </span>
            </Reveal>
            <Reveal delay={300}>
              <p className="flex items-center gap-2 text-[12.5px] font-bold text-slate-400">
                <I name="check" className="h-4 w-4 text-green-500" strokeWidth={2.5} />
                بدون نیاز به نصب: نسخه وب روی همه دستگاه‌ها کار می‌کند
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <PhoneMockup />
          </Reveal>
        </div>
      </section>

      {/* tools grid */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="جعبه‌ابزار بازرگانی"
            title={<>۶ ابزاری که هر روز <span className="text-gradient">به آن‌ها نیاز دارید</span></>}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 90} className="h-full">
                <a
                  href={t.href}
                  className="group flex h-full flex-col gap-3 rounded-[28px] border border-brand-100 bg-white p-7 shadow-card transition hover:-translate-y-2 hover:border-brand-300 hover:shadow-soft"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <I name={t.icon} className="h-7 w-7" />
                  </span>
                  <h2 className="text-[18px] font-black text-ink-900">{t.title}</h2>
                  <p className="text-[13.5px] leading-7 text-slate-500">{t.desc}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-1 text-[13.5px] font-black text-brand-600">
                    {t.cta}
                    <I name="arrow" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
