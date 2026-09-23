"use client";

import { useState } from "react";
import Image from "next/image";
import { faToman } from "@/lib/data";
import { formatUpdateTime, useRates } from "@/lib/useRates";
import type { NormItem } from "@/lib/upstream";
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
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-brand-500 shadow-glow">
          <I name="bot" className="h-6 w-6 text-white" />
          <span className="absolute -right-1 -bottom-1 h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-brand-950" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[14px] font-black text-white sm:text-[15px]">چاره‌بات — مغز متفکر تجارت شما</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[12px] font-bold text-green-300">
            <span className="h-1.5 w-1.5 animate-live rounded-full bg-green-400" /> آنلاین و آماده پاسخ‌گویی
          </p>
        </div>
        <span className="mr-auto hidden shrink-0 rounded-full bg-white/10 px-3 py-1 text-[11px] font-black text-cyan-200 sm:block">
          نسخه ۴.۲
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {AI_DEMOS.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setActive(d);
                setKey((k) => k + 1);
              }}
              className={`rounded-full px-3.5 py-2 text-[12px] font-black transition sm:px-4 sm:text-[12.5px] ${
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
          <div className="animate-slide-up self-start rounded-2xl rounded-tr-md bg-gradient-to-l from-brand-500 to-brand-600 px-4 py-3 text-[13px] leading-7 font-bold text-white shadow-lg sm:text-[13.5px]">
            {active.q}
          </div>
          <div className="animate-slide-up flex items-start gap-2.5 self-stretch rounded-2xl rounded-tl-md border border-white/10 bg-white/10 px-4 py-3 text-[13px] leading-7 font-medium text-sky-50 [animation-delay:150ms] sm:text-[13.5px]">
            <I name="spark" className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
            {active.a}
          </div>
        </div>

        <div className="mt-1 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[12.5px] font-bold text-sky-200/60 sm:text-[13px]">
          <I name="chat" className="h-4 w-4 shrink-0" />
          <span className="truncate">سؤال بازرگانی خود را بپرسید…</span>
          <span className="mr-auto grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-brand-500 text-white">
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
              desc="اولین دستیار هوش مصنوعی فارسی‌زبان حوزه گمرک و تجارت؛ آموزش‌دیده روی ۲۰ سال پرونده واقعی ترخیص، بخشنامه‌ها و تعرفه‌های گمرکی."
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
                className="btn-shine mt-7 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-l from-cyan-400 to-brand-500 px-8 py-4 text-[15px] font-black text-white shadow-glow transition hover:brightness-110 sm:w-auto"
              >
                <I name="chat" className="h-5 w-5" />
                شروع گفت‌وگوی رایگان با چاره‌بات
              </button>
            </Reveal>
          </div>
          <Reveal delay={150} className="relative">
            <div className="animate-floaty absolute -top-8 -left-2 z-10 w-28 rotate-[-6deg] overflow-hidden rounded-2xl border-4 border-white/20 shadow-glow sm:-left-5 sm:w-36">
              <Image src="/images/ai-brain.png" alt="هوش مصنوعی چاره‌بات" width={288} height={288} className="h-auto w-full object-cover" loading="lazy" />
            </div>
            <div className="pt-6 sm:pt-4">
              <AiDemo />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Live rates ================= */

function LiveRow({ item }: { item: NormItem }) {
  return (
    <div className="flex items-center gap-3 border-b border-brand-50 px-4 py-3.5 transition last:border-0 hover:bg-brand-50/60 sm:px-5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl sm:h-11 sm:w-11 sm:text-2xl">
        {item.flag}
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-[13px] font-black text-ink-900 sm:text-[14px]">{item.name}</p>
        <p className="mt-0.5 text-[11px] font-bold text-slate-400" dir="ltr">{item.code}/IRR</p>
      </div>
      <div className="shrink-0 text-left">
        <p className="text-[14px] font-black whitespace-nowrap text-ink-900 tabular-nums sm:text-[16px]">
          {item.toman.toLocaleString("fa-IR")}
        </p>
        <p className="text-[10.5px] font-bold text-slate-400">تومان</p>
      </div>
    </div>
  );
}

function Converter() {
  const { items, live } = useRates("arz");
  const [amount, setAmount] = useState("10000");
  const [code, setCode] = useState("USD");
  const [dir, setDir] = useState<"toToman" | "fromToman">("toToman");
  const cur = items.find((i) => i.code === code) ?? items[0];
  const num = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;
  const result = dir === "toToman" ? num * cur.toman : cur.toman > 0 ? num / cur.toman : 0;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-gradient-to-b from-brand-700 via-brand-600 to-brand-800 p-6 text-white shadow-soft">
      <div className="bg-grid-white absolute inset-0 opacity-50" />
      <div className="animate-drift absolute -top-20 -left-20 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="relative flex h-full flex-col">
        <h3 className="flex items-center gap-2 text-[17px] font-black">
          <I name="calc" className="h-5 w-5 text-cyan-300" />
          مبدل ارز به تومان
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-[12.5px] font-bold text-sky-200">
          <span className={`h-1.5 w-1.5 rounded-full ${live ? "animate-live bg-green-300" : "bg-amber-300"}`} />
          {live ? "محاسبه با نرخ زنده بازار" : "محاسبه با آخرین نرخ ثبت‌شده"}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-black/25 p-1.5">
          <button
            onClick={() => setDir("toToman")}
            className={`rounded-xl px-3 py-2.5 text-[13px] font-black transition ${dir === "toToman" ? "bg-white text-brand-800 shadow" : "text-sky-200 hover:bg-white/10"}`}
          >
            ارز ← تومان
          </button>
          <button
            onClick={() => setDir("fromToman")}
            className={`rounded-xl px-3 py-2.5 text-[13px] font-black transition ${dir === "fromToman" ? "bg-white text-brand-800 shadow" : "text-sky-200 hover:bg-white/10"}`}
          >
            تومان ← ارز
          </button>
        </div>

        <label className="mt-4 block text-[13px] font-black text-sky-100">
          {dir === "toToman" ? `مبلغ (${cur.name})` : "مبلغ (تومان)"}
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="decimal"
          dir="ltr"
          className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 text-left text-[18px] font-black text-white tabular-nums backdrop-blur outline-none placeholder:text-sky-200/40 focus:border-cyan-300"
          placeholder="10,000"
        />

        <label className="mt-4 block text-[13px] font-black text-sky-100">انتخاب ارز</label>
        <div className="relative mt-2">
          <select
            value={cur.code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 text-[14px] font-black text-white backdrop-blur outline-none focus:border-cyan-300 [&>option]:text-slate-800"
          >
            {items.map((r) => (
              <option key={`${r.code}-${r.name}`} value={r.code}>
                {r.flag} {r.name}
              </option>
            ))}
          </select>
          <I name="down" className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-sky-200" />
        </div>

        <div className="mt-5 rounded-2xl bg-black/25 p-4 backdrop-blur">
          <p className="text-[12px] font-bold text-sky-200">نتیجه تبدیل</p>
          <p className="mt-1 text-[22px] leading-9 font-black break-words text-white tabular-nums">
            {result > 0
              ? dir === "toToman"
                ? faToman(Math.round(result))
                : `${result.toLocaleString("fa-IR", { maximumFractionDigits: 2 })} ${cur.name}`
              : "—"}
          </p>
          <p className="mt-1 text-[11px] font-bold text-sky-200/70">
            نرخ {cur.name}: {cur.toman.toLocaleString("fa-IR")} تومان
          </p>
        </div>

        <a
          href="/calculator"
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-[13.5px] font-black text-white backdrop-blur transition hover:bg-white/20"
        >
          <I name="calc" className="h-4.5 w-4.5" />
          ماشین‌حساب کامل ارز و حقوق گمرکی
        </a>
      </div>
    </div>
  );
}

export function Rates() {
  const [tab, setTab] = useState<"arz" | "tala">("arz");
  const arz = useRates("arz");
  const tala = useRates("tala");
  const active = tab === "arz" ? arz : tala;

  return (
    <section id="rates" className="relative scroll-mt-28 bg-gradient-to-b from-white via-brand-50/60 to-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="تابلو لحظه‌ای بازار"
          title={
            <>
              نرخ ارز و طلا، <span className="text-gradient">مستقیم از بازار</span>
            </>
          }
          desc="نرخ‌ها به‌صورت خودکار از بازار دریافت و هر ۵ دقیقه تازه‌سازی می‌شوند تا همیشه با عدد واقعی تصمیم بگیرید."
        />

        <Reveal delay={80}>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex w-full gap-2 rounded-3xl border border-brand-100 bg-white p-1.5 shadow-sm sm:w-auto">
              <button
                onClick={() => setTab("arz")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-[14px] font-black transition sm:flex-none ${
                  tab === "arz" ? "bg-gradient-to-l from-brand-700 to-brand-500 text-white shadow-soft" : "text-slate-500 hover:bg-brand-50"
                }`}
              >
                💱 ارزها
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${tab === "arz" ? "bg-white/25" : "bg-brand-50 text-brand-700"}`}>
                  {arz.items.length.toLocaleString("fa-IR")}
                </span>
              </button>
              <button
                onClick={() => setTab("tala")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-[14px] font-black transition sm:flex-none ${
                  tab === "tala" ? "bg-gradient-to-l from-amber-500 to-orange-500 text-white shadow-soft" : "text-slate-500 hover:bg-brand-50"
                }`}
              >
                ✨ طلا و سکه
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${tab === "tala" ? "bg-white/25" : "bg-brand-50 text-brand-700"}`}>
                  {tala.items.length.toLocaleString("fa-IR")}
                </span>
              </button>
            </div>
            <p
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-black ${
                active.live ? "border-green-200 bg-green-50 text-green-700" : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${active.live ? "animate-live bg-green-500" : "bg-amber-400"}`} />
              {active.live
                ? `متصل به بازار — به‌روزرسانی: ${formatUpdateTime(active.updatedAt)}`
                : "حالت آفلاین — نمایش آخرین نرخ‌های ثبت‌شده"}
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="min-w-0">
            <div className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-card">
              <div
                className={`flex items-center justify-between px-5 py-4 text-white ${
                  tab === "arz" ? "bg-gradient-to-l from-brand-950 to-brand-700" : "bg-gradient-to-l from-amber-600 to-orange-500"
                }`}
              >
                <p className="flex items-center gap-2 text-[14px] font-black">
                  <span className="h-2 w-2 animate-live rounded-full bg-green-400" />
                  {tab === "arz" ? "تابلوی ارز تریدچاره" : "تابلوی طلا و سکه تریدچاره"}
                </p>
                <p className="text-[12px] font-bold text-white/80">واحد: تومان</p>
              </div>
              <div className="chat-scroll max-h-[548px] overflow-y-auto">
                {active.items.map((r) => (
                  <LiveRow key={`${r.code}-${r.name}`} item={r} />
                ))}
              </div>
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
