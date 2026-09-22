"use client";

import { useMemo, useState } from "react";
import { FEES, PLANS, RATES, faToman, type Rate } from "@/lib/data";
import { I, Reveal, SectionHead, useUI } from "./ui";

/* ================= AI section ================= */

const AI_DEMOS = [
  {
    id: "hs",
    chip: "تشخیص تعرفه",
    q: "کد تعرفه «قطعات یدکی پمپ آب صنعتی» چیه؟",
    a: "بر اساس مشخصات کالا، کد پیشنهادی HS: 8413.91 با حقوق ورودی ۵٪ و اولویت ارزی ۲۲ است. دقت تشخیص: ۹۷٪",
  },
  {
    id: "duty",
    chip: "محاسبه حقوق ورودی",
    q: "حقوق ورودی یک کانتینر ۴۰ فوت لوازم خانگی چقدر میشه؟",
    a: "با ارزش CIF حدود ۴۸٬۰۰۰ دلار: حقوق ورودی ≈ ۵٬۹۰۰ دلار + مالیات ارزش افزوده ۱۰٪. جزئیات کامل در پیش‌فاکتور شما صادر شد.",
  },
  {
    id: "fx",
    chip: "تحلیل نرخ ارز",
    q: "الان وقت خوبی برای خرید درهمه؟",
    a: "تحلیل ۳۰ روزه: روند درهم صعودی ملایم (+۲.۱٪). پیشنهاد: خرید پلکانی در ۳ مرحله + پوشش ریسک با سبد ارزی.",
  },
] as const;

function AiDemo() {
  const [active, setActive] = useState<(typeof AI_DEMOS)[number]>(AI_DEMOS[0]);
  const [key, setKey] = useState(0);
  return (
    <div className="glass-dark overflow-hidden rounded-[30px] border border-white/15 shadow-soft">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-brand-500 shadow-glow">
          <I name="bot" className="h-6 w-6 text-white" />
          <span className="absolute -right-1 -bottom-1 h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-brand-950" />
        </span>
        <div className="leading-tight">
          <p className="text-[15px] font-black text-white">چاره‌بات — مغز متفکر تجارت شما</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[12px] font-bold text-green-300">
            <span className="h-1.5 w-1.5 animate-live rounded-full bg-green-400" /> آنلاین و آماده پاسخ‌گویی
          </p>
        </div>
        <span className="mr-auto hidden rounded-full bg-white/10 px-3 py-1 text-[11px] font-black text-cyan-200 sm:block">
          نسخه ۴.۲
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {AI_DEMOS.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setActive(d);
                setKey((k) => k + 1);
              }}
              className={`rounded-full px-4 py-2 text-[12.5px] font-black transition ${
                active.id === d.id
                  ? "bg-gradient-to-l from-cyan-400 to-brand-500 text-white shadow-glow"
                  : "border border-white/15 bg-white/5 text-sky-100 hover:bg-white/10"
              }`}
            >
              {d.chip}
            </button>
          ))}
        </div>

        <div key={key} className="flex flex-col gap-3">
          <div className="animate-slide-up self-start rounded-2xl rounded-tr-md bg-gradient-to-l from-brand-500 to-brand-600 px-4 py-3 text-[13.5px] leading-7 font-bold text-white shadow-lg">
            {active.q}
          </div>
          <div className="animate-slide-up flex items-start gap-2.5 self-stretch rounded-2xl rounded-tl-md border border-white/10 bg-white/10 px-4 py-3 text-[13.5px] leading-7 font-medium text-sky-50 [animation-delay:150ms]">
            <I name="spark" className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
            {active.a}
          </div>
        </div>

        <div className="mt-1 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[13px] font-bold text-sky-200/60">
          <I name="chat" className="h-4 w-4" />
          سؤال بازرگانی خود را بپرسید…
          <span className="mr-auto grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-brand-500 text-white">
            <I name="send" className="h-4 w-4 -scale-x-100" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function AiSection() {
  const { setChatOpen } = useUI();
  const feats = [
    { icon: "search", t: "تشخیص هوشمند HS Code", d: "تشخیص کد تعرفه از روی نام، عکس و کاتالوگ کالا با دقت ۹۷٪" },
    { icon: "calc", t: "محاسبه دقیق هزینه‌ها", d: "حقوق ورودی، عوارض، مالیات و کارمزدها را لحظه‌ای و شفاف ببینید" },
    { icon: "chart", t: "پیش‌بینی بازار ارز", d: "تحلیل روند نرخ‌ها و پیشنهاد بهترین زمان خرید و تخصیص ارز" },
    { icon: "clock", t: "پیش‌بینی زمان ترخیص", d: "تخمین دقیق زمان ترخیص بر اساس گمرک، فصل و نوع کالا" },
  ];
  return (
    <section id="ai" className="relative scroll-mt-20 overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-[#0d2557] to-brand-950" />
      <div className="bg-grid-white absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]" />
      <div className="animate-drift absolute top-10 right-10 h-96 w-96 rounded-full bg-brand-500/30 blur-[120px]" />
      <div className="animate-drift absolute bottom-10 left-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px] [animation-delay:3s]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              center={false}
              dark
              eyebrow="هوش مصنوعی اختصاصی بازرگانی"
              title={
                <>
                  با <span className="text-gradient-light">چاره‌بات</span>، مثل یک هلدینگ تجارت کنید
                </>
              }
              desc="اولین دستیار هوش مصنوعی فارسی‌زبان حوزه گمرک و تجارت؛ آموزش‌دیده روی ۱۲ سال پرونده واقعی ترخیص، بخشنامه‌ها و تعرفه‌های گمرکی."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {feats.map((f, i) => (
                <Reveal key={f.t} delay={i * 90}>
                  <div className="group flex h-full flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-cyan-300/40 hover:bg-white/10">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-brand-600 text-white shadow-glow transition-transform group-hover:scale-110">
                      <I name={f.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="text-[15px] font-black text-white">{f.t}</h3>
                    <p className="text-[12.5px] leading-7 text-sky-100/70">{f.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <button
                onClick={() => setChatOpen(true)}
                className="btn-shine mt-7 flex items-center gap-2.5 rounded-2xl bg-gradient-to-l from-cyan-400 to-brand-500 px-8 py-4 text-[15px] font-black text-white shadow-glow transition hover:brightness-110"
              >
                <I name="chat" className="h-5 w-5" />
                شروع گفت‌وگوی رایگان با چاره‌بات
              </button>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <AiDemo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Rates ================= */

function Spark({ data, up }: { data: readonly number[]; up: boolean }) {
  const pts = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const r = max - min || 1;
    return data
      .map((v, i) => `${(i / (data.length - 1)) * 96},${30 - ((v - min) / r) * 26}`)
      .join(" ");
  }, [data]);
  return (
    <svg viewBox="0 0 96 32" className="h-8 w-24" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={up ? "#16a34a" : "#ef4444"} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Row({ r }: { r: Rate }) {
  const up = r.change >= 0;
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-brand-50 px-5 py-4 transition last:border-0 hover:bg-brand-50/60 sm:grid-cols-[1.3fr_1fr_1fr_0.8fr_auto] sm:gap-4">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-2xl">{r.flag}</span>
        <div className="leading-tight">
          <p className="text-[14px] font-black text-ink-900">{r.name}</p>
          <p className="mt-0.5 text-[11px] font-bold text-slate-400" dir="ltr">{r.code}/IRR</p>
        </div>
      </div>
      <div className="text-left sm:text-right">
        <p className="text-[11px] font-bold text-slate-400">خرید</p>
        <p className="text-[15px] font-black text-ink-900 tabular-nums">{r.buy.toLocaleString("fa-IR")}</p>
      </div>
      <div className="hidden text-right sm:block">
        <p className="text-[11px] font-bold text-slate-400">فروش</p>
        <p className="text-[15px] font-black text-ink-900 tabular-nums">{r.sell.toLocaleString("fa-IR")}</p>
      </div>
      <div className="hidden sm:block">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-black tabular-nums ${up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          <I name={up ? "trendUp" : "trendDown"} className="h-3.5 w-3.5" />
          {up ? "+" : "−"}{Math.abs(r.change).toLocaleString("fa-IR")}%
        </span>
      </div>
      <div className="hidden md:block">
        <Spark data={r.spark} up={up} />
      </div>
    </div>
  );
}

function Converter() {
  const [amount, setAmount] = useState("10000");
  const [code, setCode] = useState("USD");
  const rate = RATES.find((r) => r.code === code) ?? RATES[0];
  const result = (parseFloat(amount.replace(/[^0-9.]/g, "")) || 0) * rate.sell;
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-brand-700 via-brand-600 to-brand-800 p-6 text-white shadow-soft">
      <div className="bg-grid-white absolute inset-0 opacity-50" />
      <div className="animate-drift absolute -top-20 -left-20 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="relative">
        <h3 className="flex items-center gap-2 text-[17px] font-black">
          <I name="calc" className="h-5 w-5 text-cyan-300" />
          مبدل ارز به تومان
        </h3>
        <p className="mt-1 text-[12.5px] font-bold text-sky-200">محاسبه لحظه‌ای بر اساس نرخ فروش تابلو</p>

        <label className="mt-5 block text-[13px] font-black text-sky-100">مبلغ ارز</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="decimal"
          dir="ltr"
          className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 text-left text-[18px] font-black text-white tabular-nums backdrop-blur outline-none placeholder:text-sky-200/40 focus:border-cyan-300"
          placeholder="10,000"
        />

        <label className="mt-4 block text-[13px] font-black text-sky-100">انتخاب ارز</label>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {RATES.slice(0, 8).map((r) => (
            <button
              key={r.code}
              onClick={() => setCode(r.code)}
              className={`flex flex-col items-center gap-0.5 rounded-2xl border px-1 py-2.5 text-[11px] font-black transition ${
                code === r.code
                  ? "border-cyan-300 bg-white text-brand-800 shadow-glow"
                  : "border-white/15 bg-white/5 text-white hover:bg-white/15"
              }`}
            >
              <span className="text-lg leading-none">{r.flag}</span>
              <span dir="ltr">{r.code}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-black/25 p-4 backdrop-blur">
          <p className="text-[12px] font-bold text-sky-200">معادل تومانی</p>
          <p className="mt-1 text-[24px] font-black text-white tabular-nums">
            {result > 0 ? faToman(Math.round(result)) : "—"}
          </p>
          <p className="mt-1 text-[11px] font-bold text-sky-200/70">
            نرخ {rate.name}: {rate.sell.toLocaleString("fa-IR")} تومان
          </p>
        </div>
      </div>
    </div>
  );
}

export function Rates() {
  return (
    <section id="rates" className="relative scroll-mt-28 bg-gradient-to-b from-white via-brand-50/60 to-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="تابلو لحظه‌ای ارز"
          title={
            <>
              نرخ ارزها، <span className="text-gradient">شفاف و به‌روز</span>
            </>
          }
          desc="نرخ‌های خرید و فروش به‌روزرسانی می‌شوند تا همیشه با عدد واقعی تصمیم بگیرید. (مقادیر این پیش‌نمایش نمایشی است)"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-card">
              <div className="flex items-center justify-between bg-gradient-to-l from-brand-950 to-brand-700 px-5 py-4 text-white">
                <p className="flex items-center gap-2 text-[14px] font-black">
                  <span className="h-2 w-2 animate-live rounded-full bg-green-400" />
                  تابلوی معاملات تریدچاره
                </p>
                <p className="text-[12px] font-bold text-sky-200">واحد: تومان</p>
              </div>
              <div className="hidden grid-cols-[1.3fr_1fr_1fr_0.8fr_auto] gap-4 border-b border-brand-100 bg-brand-50/60 px-5 py-2.5 text-[11.5px] font-black text-slate-400 sm:grid">
                <span>ارز</span>
                <span className="text-right">خرید</span>
                <span className="text-right">فروش</span>
                <span>تغییر روز</span>
                <span className="hidden md:block">روند ۷ روزه</span>
              </div>
              {RATES.map((r) => (
                <Row key={r.code} r={r} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={140}>
            <Converter />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Pricing ================= */

export function Pricing() {
  const { openContact } = useUI();
  return (
    <section id="pricing" className="relative scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="نرخ‌نامه شفاف خدمات"
          title={
            <>
              قیمت‌گذاری <span className="text-gradient">بدون هزینه پنهان</span>
            </>
          }
          desc="پیش‌فاکتور رسمی قبل از شروع کار، تسویه با فاکتور رسمی بعد از تحویل. همین‌قدر ساده و شفاف."
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 110} className="h-full">
              <div
                className={`relative flex h-full flex-col gap-5 rounded-[30px] border p-7 transition hover:-translate-y-2 ${
                  p.featured
                    ? "border-brand-400 bg-gradient-to-b from-brand-700 via-brand-600 to-brand-800 text-white shadow-soft hover:shadow-glow"
                    : "border-brand-100 bg-white shadow-card hover:border-brand-300"
                }`}
              >
                {p.featured && (
                  <>
                    <span className="absolute -top-4 right-1/2 translate-x-1/2 rounded-full bg-gradient-to-l from-amber-400 to-orange-400 px-5 py-1.5 text-[12px] font-black whitespace-nowrap text-white shadow-lg">
                      ⭐ محبوب‌ترین انتخاب بازرگانان
                    </span>
                    <div className="bg-grid-white absolute inset-0 rounded-[30px] opacity-40" />
                  </>
                )}
                <div className="relative">
                  <h3 className={`text-[18px] font-black ${p.featured ? "text-white" : "text-ink-900"}`}>{p.name}</h3>
                  <p className={`mt-1 text-[13px] font-bold ${p.featured ? "text-sky-200" : "text-slate-400"}`}>{p.desc}</p>
                </div>
                <div className="relative flex items-end gap-2">
                  <span className={`text-[38px] leading-none font-black ${p.featured ? "text-white" : "text-gradient"}`}>{p.price}</span>
                  <span className={`pb-1 text-[13px] font-black ${p.featured ? "text-sky-200" : "text-slate-400"}`}>{p.unit}</span>
                </div>
                <ul className="relative flex flex-col gap-3">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-[13.5px] leading-7 font-bold ${p.featured ? "text-sky-50" : "text-slate-600"}`}>
                      <span className={`mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${p.featured ? "bg-cyan-300/30 text-cyan-200" : "bg-green-50 text-green-600"}`}>
                        <I name="check" className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openContact}
                  className={`relative mt-auto rounded-2xl px-6 py-3.5 text-[15px] font-black transition ${
                    p.featured
                      ? "btn-shine bg-white text-brand-800 shadow-glow hover:bg-brand-50"
                      : "border-2 border-brand-200 text-brand-700 hover:border-brand-500 hover:bg-brand-50"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-card">
            <div className="flex items-center gap-2 border-b border-brand-100 bg-brand-50/60 px-6 py-4">
              <I name="doc" className="h-5 w-5 text-brand-600" />
              <h3 className="text-[15px] font-black text-ink-900">ریز نرخ‌نامه خدمات پرکاربرد</h3>
            </div>
            <div className="grid md:grid-cols-2">
              {FEES.map((f, i) => (
                <div key={f.service} className={`flex items-center justify-between gap-4 px-6 py-4 ${i % 2 === 0 ? "md:border-l" : ""} border-b border-brand-50 transition last:border-b-0 hover:bg-brand-50/50 md:[&:nth-last-child(-n+2)]:border-b-0`}>
                  <span className="flex items-center gap-2.5 text-[13.5px] font-bold text-slate-600">
                    <I name="check" className="h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                    {f.service}
                  </span>
                  <span className="shrink-0 rounded-full bg-brand-50 px-3.5 py-1.5 text-[12.5px] font-black whitespace-nowrap text-brand-700">
                    {f.fee}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
