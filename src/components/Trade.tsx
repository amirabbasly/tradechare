"use client";

import { useState } from "react";
import { faToman } from "@/lib/data";
import { formatUpdateTime, useRates } from "@/lib/useRates";
import type { NormItem } from "@/lib/upstream";
import { I, Reveal, SectionHead } from "./ui";

export { AiSection } from "./AiShowcase";

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
