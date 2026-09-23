"use client";

import Image from "next/image";
import { faToman } from "@/lib/data";
import { formatUpdateTime, useRates } from "@/lib/useRates";
import { CountUp, I, Reveal, useUI } from "./ui";

function Ticker() {
  const { items, live } = useRates("arz");
  const list = items.slice(0, 14);
  const doubled = [...list, ...list];
  return (
    <div className="marquee-hover relative overflow-hidden border-y border-brand-100 bg-white/80 py-3 backdrop-blur-xl" dir="ltr">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
      {live && (
        <span className="absolute top-1/2 left-3 z-20 flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-gradient-to-l from-brand-700 to-brand-500 px-3 py-1.5 text-[11px] font-black text-white shadow-soft" dir="rtl">
          <span className="h-1.5 w-1.5 animate-live rounded-full bg-green-300" />
          نرخ زنده بازار
        </span>
      )}
      <div className="animate-marquee flex w-max items-center gap-3 pr-3">
        {doubled.map((r, i) => (
          <div
            key={`${r.code}-${i}`}
            dir="rtl"
            className="flex items-center gap-2.5 rounded-2xl border border-brand-100 bg-white px-3.5 py-2 shadow-sm sm:gap-3 sm:px-4"
          >
            <span className="text-lg sm:text-xl">{r.flag}</span>
            <div className="flex flex-col leading-tight">
              <span className="max-w-[130px] truncate text-[11.5px] font-black text-ink-900 sm:max-w-none sm:text-[12px]">{r.name}</span>
              <span className="text-[11.5px] font-bold text-slate-500 tabular-nums sm:text-[12px]">
                {r.toman.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiTip({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-3xl border border-white/40 bg-gradient-to-l from-brand-950/95 to-brand-800/95 p-3 pr-4 pl-5 text-white shadow-soft backdrop-blur ${className}`}>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-brand-500 shadow-glow">
        <I name="bot" className="h-6 w-6" />
      </span>
      <div className="leading-tight">
        <p className="text-[12px] font-black text-cyan-200">پیشنهاد چاره‌بات</p>
        <p className="mt-0.5 text-[12px] font-bold">
          تعرفه HS: <span dir="ltr" className="tabular-nums">8471.30</span> — حقوق ورودی ۵٪
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const { openContact, setChatOpen } = useUI();
  const { items, live, updatedAt } = useRates("arz");
  const dollar = items.find((i) => i.code === "USD") ?? items[0];

  return (
    <>
      <section id="top" className="relative overflow-hidden pt-[150px] pb-10 sm:pt-[165px] lg:pb-16">
        {/* backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
          <div className="animate-drift absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-cyan-200/60 to-brand-300/40 blur-3xl" />
          <div className="animate-drift absolute top-40 -right-40 h-[560px] w-[560px] rounded-full bg-gradient-to-bl from-brand-200/70 to-sky-100/50 blur-3xl [animation-delay:2s]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
          {/* copy */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-start">
            <Reveal>
              <span className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-brand-200 bg-white/80 py-1.5 pr-2 pl-4 text-[12px] font-bold text-brand-800 shadow-sm backdrop-blur sm:text-[13px]">
                <span className="rounded-full bg-gradient-to-l from-brand-600 to-cyan-500 px-3 py-1 text-[11px] font-black text-white sm:text-[12px]">
                  ۲۰ سال سابقه
                </span>
                شرکت بازرگانی و ترخیص کالا با هوش مصنوعی اختصاصی
                <I name="spark" className="h-4 w-4 text-brand-500" />
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-[30px] leading-[1.7] font-black text-balance text-ink-900 sm:text-5xl sm:leading-[1.5] lg:text-[54px] lg:leading-[1.45]">
                تجارت جهانی،
                <br />
                بدون مرز با <span className="text-gradient">تریدچاره</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="max-w-xl text-[14.5px] leading-8 text-slate-500 sm:text-[17px] sm:leading-9">
                ثبت سفارش، تخصیص ارز، ترخیص از کلیه گمرکات کشور، حمل بین‌المللی و
                مدیریت سرمایه تجاری — همه در یک پلتفرم یکپارچه با پشتیبانی{" "}
                <span className="font-black text-brand-700">هوش مصنوعی چاره‌بات</span> و
                کارشناسان رسمی گمرک.
              </p>
            </Reveal>

            <Reveal delay={240} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={openContact}
                className="btn-shine group flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-l from-brand-700 via-brand-600 to-brand-500 px-9 py-4 text-[16px] font-black text-white shadow-soft transition hover:shadow-glow"
              >
                <I name="phone" className="h-5 w-5 transition group-hover:rotate-12" />
                تماس با ما
              </button>
              <button
                onClick={() => setChatOpen(true)}
                className="group flex items-center justify-center gap-2.5 rounded-2xl border-2 border-brand-200 bg-white/80 px-8 py-[14px] text-[16px] font-black text-brand-700 backdrop-blur transition hover:border-brand-400 hover:bg-brand-50"
              >
                <I name="bot" className="h-5 w-5 transition group-hover:scale-110" />
                گفت‌وگو با چاره‌بات
              </button>
            </Reveal>

            <Reveal delay={320} className="w-full">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-1 lg:justify-start">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3 space-x-reverse">
                    {["رک", "سم", "حن", "م‌ا"].map((t, i) => (
                      <span
                        key={i}
                        className={`grid h-10 w-10 place-items-center rounded-full text-[12px] font-black text-white ring-[3px] ring-white ${
                          ["bg-gradient-to-br from-brand-500 to-brand-700", "bg-gradient-to-br from-cyan-500 to-brand-600", "bg-gradient-to-br from-indigo-500 to-brand-700", "bg-gradient-to-br from-sky-400 to-cyan-600"][i]
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <I key={i} name="star" className="h-3.5 w-3.5 fill-amber-400" strokeWidth={0} />
                      ))}
                    </span>
                    <span className="text-[12px] font-bold text-slate-500">
                      <span className="font-black text-ink-900">+۲۵٬۰۰۰</span> بازرگان فعال
                    </span>
                  </div>
                </div>
                <span className="hidden h-9 w-px bg-brand-100 sm:block" />
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] font-bold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <I name="badge" className="h-4 w-4 text-brand-600" /> دارای اینماد
                  </span>
                  <span className="flex items-center gap-1.5">
                    <I name="shield" className="h-4 w-4 text-brand-600" /> کارگزار رسمی گمرک
                  </span>
                  <span className="hidden items-center gap-1.5 sm:flex">
                    <I name="medal" className="h-4 w-4 text-brand-600" /> ۲۰ سال تجربه
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* visual */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto max-w-[560px]">
              <div className="ring-conic animate-spin-slow absolute -inset-4 rounded-[36px] opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/60 shadow-soft sm:rounded-[32px]">
                <Image
                  src="/images/hero-port.png"
                  alt="بندر هوشمند و کشتی کانتینری تریدچاره"
                  width={1120}
                  height={880}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-950/45 to-transparent" />
                <div className="glass absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-2xl border border-white/50 px-3 py-2.5 sm:inset-x-4 sm:bottom-4 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 animate-live rounded-full bg-green-500" />
                    <span className="text-[11.5px] font-black text-ink-900 sm:text-[13px]">بندر شهید رجایی — اسکله ۷</span>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-black whitespace-nowrap text-white sm:px-3 sm:text-[12px]">
                    در حال تخلیه
                  </span>
                </div>
              </div>

              {/* floating card: dollar (live) */}
              <div className="animate-floaty glass-strong absolute -top-4 right-0 w-44 rounded-3xl border border-white/60 p-3.5 shadow-card sm:-top-5 sm:-right-6 sm:w-52 sm:p-4">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-bold text-slate-500 sm:text-[12px]">دلار لحظه‌ای</span>
                  <span className={`h-2 w-2 rounded-full ${live ? "animate-live bg-green-500" : "bg-slate-300"}`} />
                </div>
                <p className="mt-1 text-[17px] font-black text-ink-900 tabular-nums sm:text-[20px]">
                  {dollar ? faToman(dollar.toman).replace(" تومان", "") : "—"}
                </p>
                <p className="text-[10px] font-bold text-slate-400 sm:text-[11px]">
                  {live ? `تومان — ${formatUpdateTime(updatedAt)}` : "تومان — آخرین نرخ ثبت‌شده"}
                </p>
              </div>

              {/* floating card: clearance case (tablet & desktop only) */}
              <div className="animate-floaty-sm glass-strong absolute top-1/2 -left-3 hidden w-60 -translate-y-1/2 rounded-3xl border border-white/60 p-4 shadow-card [animation-delay:1.4s] md:block lg:-left-10">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[12px] font-black text-ink-900">
                    <I name="box" className="h-4 w-4 text-brand-600" />
                    پرونده TRC-0817
                  </span>
                  <span className="text-[11px] font-black text-brand-600">۷۸٪</span>
                </div>
                <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-brand-100">
                  <div className="animate-bar h-full w-[78%] rounded-full bg-gradient-to-l from-brand-600 to-cyan-400" />
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <I name="checks" className="h-3.5 w-3.5 text-green-500" />
                  تشریفات گمرکی — شهید رجایی
                </p>
              </div>

              {/* floating AI tip (desktop) / static (mobile) */}
              <AiTip className="animate-floaty absolute -bottom-6 right-8 hidden [animation-delay:2.6s] sm:flex" />
            </div>
            <AiTip className="mx-auto mt-4 max-w-[560px] sm:hidden" />
          </Reveal>
        </div>

        {/* stats */}
        <div className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:mt-16">
          <Reveal>
            <div className="glass grid grid-cols-2 gap-x-4 gap-y-6 rounded-[28px] border border-brand-100/80 px-5 py-7 shadow-card sm:px-6 lg:grid-cols-4">
              {[
                { v: 20, s: "+", t: "سال تجربه بازرگانی", icon: "medal" },
                { v: 48, s: "+", t: "گمرک تحت پوشش", icon: "anchor" },
                { v: 25000, s: "+", t: "پرونده موفق ترخیص", icon: "file" },
                { v: 98, s: "٪", t: "رضایت بازرگانان", icon: "star" },
              ].map((s, i) => (
                <div key={i} className={`flex items-center justify-center gap-2.5 sm:gap-3 ${i > 0 ? "lg:border-r lg:border-brand-100" : ""}`}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft sm:h-12 sm:w-12">
                    <I name={s.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-xl font-black text-ink-900 sm:text-[28px]">
                      <CountUp to={s.v} suffix={s.s} />
                    </span>
                    <span className="text-[11.5px] font-bold text-slate-500 sm:text-[13px]">{s.t}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <Ticker />
    </>
  );
}
