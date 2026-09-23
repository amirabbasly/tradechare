"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { faToman } from "@/lib/data";
import { useRates } from "@/lib/useRates";
import { I, Reveal, useUI } from "@/components/ui";
import { Breadcrumbs } from "@/components/Seo";

/* ---------- helpers ---------- */

const faToEn = (s: string) =>
  s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[,٬،\s]/g, "");

const toNum = (s: string) => {
  const n = parseFloat(faToEn(s));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

function NumInput({
  label,
  value,
  setValue,
  suffix,
  hint,
  dir = "ltr",
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  suffix?: string;
  hint?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-black text-slate-600">{label}</span>
      <span className="relative block">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          inputMode="decimal"
          dir={dir}
          className="w-full rounded-2xl border-2 border-brand-100 bg-white px-4 py-3 text-[16px] font-black text-ink-900 tabular-nums outline-none transition placeholder:font-bold placeholder:text-slate-300 focus:border-brand-500 focus:shadow-card"
        />
        {suffix && (
          <span className="absolute top-1/2 left-4 -translate-y-1/2 text-[12px] font-black text-slate-400">
            {suffix}
          </span>
        )}
      </span>
      {hint && <span className="mt-1 block text-[11.5px] font-bold text-slate-400">{hint}</span>}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-black text-slate-600">{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border-2 border-brand-100 bg-white px-4 py-3 text-[14px] font-black text-ink-900 outline-none transition focus:border-brand-500"
        >
          {children}
        </select>
        <I name="down" className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-brand-500" />
      </span>
    </label>
  );
}

/* ---------- currency converter ---------- */

function FxConverter() {
  const { items, live } = useRates("arz");
  const [amount, setAmount] = useState("10000");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("TOMAN");

  const rateOf = (code: string) =>
    code === "TOMAN" ? 1 : code === "RIAL" ? 0.1 : (items.find((i) => i.code === code)?.toman ?? 0);
  const nameOf = (code: string) =>
    code === "TOMAN" ? "تومان" : code === "RIAL" ? "ریال" : (items.find((i) => i.code === code)?.name ?? "");

  const num = toNum(amount);
  const fromRate = rateOf(from);
  const toRate = rateOf(to);
  const result = fromRate > 0 && toRate > 0 ? (num * fromRate) / toRate : 0;

  return (
    <div className="flex h-full flex-col gap-4 rounded-[30px] border border-brand-100 bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 text-[18px] font-black text-ink-900">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
            <I name="coins" className="h-6 w-6" />
          </span>
          تبدیل ارزها به یکدیگر
        </h2>
        <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black ${live ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${live ? "animate-live bg-green-500" : "bg-amber-400"}`} />
          {live ? "نرخ زنده" : "آفلاین"}
        </span>
      </div>

      <NumInput label="مبلغ" value={amount} setValue={setAmount} hint="می‌توانید اعداد فارسی هم وارد کنید" />

      <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <Select label="از" value={from} onChange={setFrom}>
          <option value="TOMAN">🇮🇷 تومان</option>
          <option value="RIAL">🇮🇷 ریال</option>
          {items.map((i) => (
            <option key={`f-${i.code}-${i.name}`} value={i.code}>
              {i.flag} {i.name}
            </option>
          ))}
        </Select>
        <button
          onClick={() => {
            setFrom(to === "TOMAN" || to === "RIAL" ? from : to);
            setTo(from === "TOMAN" || from === "RIAL" ? to : from);
          }}
          aria-label="جابه‌جایی"
          className="mx-auto grid h-[52px] w-[52px] place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft transition hover:rotate-180 hover:shadow-glow"
        >
          <I name="refresh" className="h-5 w-5" />
        </button>
        <Select label="به" value={to} onChange={setTo}>
          <option value="TOMAN">🇮🇷 تومان</option>
          <option value="RIAL">🇮🇷 ریال</option>
          {items.map((i) => (
            <option key={`t-${i.code}-${i.name}`} value={i.code}>
              {i.flag} {i.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-auto rounded-3xl bg-gradient-to-l from-brand-800 to-brand-600 p-5 text-white shadow-soft">
        <p className="text-[12.5px] font-bold text-stone-200">نتیجه تبدیل</p>
        <p className="mt-1 text-[24px] leading-10 font-black break-words tabular-nums">
          {result > 0 ? `${result.toLocaleString("fa-IR", { maximumFractionDigits: result < 100 ? 2 : 0 })} ${nameOf(to)}` : "—"}
        </p>
        <p className="mt-1 text-[11.5px] font-bold text-stone-200/80">
          هر {nameOf(from)} ={" "}
          {fromRate > 0 && toRate > 0
            ? `${(fromRate / toRate).toLocaleString("fa-IR", { maximumFractionDigits: 4 })} ${nameOf(to)}`
            : "—"}
        </p>
      </div>
    </div>
  );
}

/* ---------- customs duty calculator ---------- */

function DutyCalculator() {
  const { openContact } = useUI();
  const [cif, setCif] = useState("50000");
  const [ets, setEts] = useState("700000");
  const [rate, setRate] = useState("15");
  const [other, setOther] = useState("0");

  const calc = useMemo(() => {
    const cifUsd = toNum(cif);
    const etsRial = toNum(ets);
    const maakhaz = Math.min(toNum(rate), 100);
    const otherT = toNum(other);

    const cifT = (cifUsd * etsRial) / 10; // تومان
    const gomroki = cifT * 0.04;
    const sood = cifT * (Math.max(maakhaz - 4, 0) / 100);
    const duty = gomroki + sood;
    const vat = (cifT + duty) * 0.1;
    const helal = duty * 0.01;
    const total = duty + vat + helal + otherT;

    return { cifT, gomroki, sood, duty, vat, helal, otherT, total, maakhaz, eff: cifT > 0 ? (total / cifT) * 100 : 0 };
  }, [cif, ets, rate, other]);

  const rows = [
    { label: "حقوق گمرکی (۴٪ ارزش CIF)", value: calc.gomroki, color: "from-brand-600 to-brand-400" },
    { label: `سود بازرگانی (${(calc.maakhaz - 4 > 0 ? calc.maakhaz - 4 : 0).toLocaleString("fa-IR")}٪)`, value: calc.sood, color: "from-amber-500 to-amber-300" },
    { label: "مالیات ارزش افزوده (۱۰٪)", value: calc.vat, color: "from-emerald-500 to-emerald-300" },
    { label: "عوارض هلال‌احمر (۱٪ حقوق ورودی)", value: calc.helal, color: "from-rose-500 to-rose-300" },
    { label: "سایر هزینه‌ها (انبارداری، THC و…)", value: calc.otherT, color: "from-slate-500 to-slate-300" },
  ];

  return (
    <div className="flex h-full flex-col gap-4 rounded-[30px] border-2 border-brand-200 bg-gradient-to-b from-brand-50/80 to-white p-6 shadow-card sm:p-7">
      <h2 className="flex items-center gap-2.5 text-[18px] font-black text-ink-900">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-soft">
          <I name="calc" className="h-6 w-6" />
        </span>
        محاسبه حقوق ورودی گمرک
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <NumInput label="ارزش CIF کالا" value={cif} setValue={setCif} suffix="دلار" />
        <NumInput label="نرخ ارز گمرکی (ETS)" value={ets} setValue={setEts} suffix="ریال" hint="نرخ روزانه سامانه EPL گمرک" />
        <NumInput label="مأخذ حقوق ورودی (از جدول تعرفه)" value={rate} setValue={setRate} suffix="٪" hint="شامل حقوق گمرکی ۴٪ + سود بازرگانی" />
        <NumInput label="سایر هزینه‌های ترخیص" value={other} setValue={setOther} suffix="تومان" hint="انبارداری، THC، استاندارد و…" />
      </div>

      <div className="rounded-2xl bg-brand-950 p-4 text-[12.5px] leading-7 font-bold text-stone-100">
        💡 ارزش CIF شما: <span className="font-black text-white">{calc.cifT > 0 ? faToman(Math.round(calc.cifT)) : "—"}</span>
        <span className="text-stone-200/70"> (محاسبه با نرخ ETS، نه نرخ آزاد)</span>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-center justify-between gap-2 text-[12.5px] font-black">
              <span className="text-slate-600">{r.label}</span>
              <span className="whitespace-nowrap text-ink-900 tabular-nums">{r.value > 0 ? faToman(Math.round(r.value)) : "—"}</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brand-100">
              <div
                className={`h-full rounded-full bg-gradient-to-l ${r.color} transition-all duration-500`}
                style={{ width: `${calc.total > 0 ? Math.max((r.value / calc.total) * 100, r.value > 0 ? 3 : 0) : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3 rounded-3xl bg-gradient-to-l from-brand-800 to-brand-600 p-5 text-white shadow-soft sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-[12.5px] font-bold text-stone-200">جمع قابل پرداخت به گمرک (تقریبی)</p>
          <p className="mt-1 text-[26px] font-black tabular-nums">{calc.total > 0 ? faToman(Math.round(calc.total)) : "—"}</p>
          <p className="mt-0.5 text-[11.5px] font-bold text-stone-200/80">
            نرخ مؤثر: {calc.eff.toLocaleString("fa-IR", { maximumFractionDigits: 1 })}٪ ارزش کالا
          </p>
        </div>
        <button
          onClick={openContact}
          className="btn-shine shrink-0 rounded-2xl bg-white px-6 py-3 text-[14px] font-black text-brand-800 shadow-glow transition hover:bg-brand-50"
        >
          صدور پیش‌فاکتور رسمی
        </button>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

const RULES = [
  { t: "حقوق گمرکی ۴٪", d: "طبق ماده ۱ قانون امور گمرکی، ۴٪ ارزش CIF کالا به‌عنوان حقوق گمرکی ثابت دریافت می‌شود." },
  { t: "سود بازرگانی متغیر", d: "مازاد مأخذ جدول تعرفه بر ۴٪، سود بازرگانی است که دولت برای حمایت از تولید داخلی تعیین می‌کند." },
  { t: "مالیات ارزش افزوده ۱۰٪", d: "۱۰٪ مجموع ارزش CIF به‌علاوه حقوق ورودی، طبق قانون مالیات بر ارزش افزوده محاسبه می‌شود." },
  { t: "هلال‌احمر ۱٪", d: "معادل ۱٪ حقوق ورودی به‌عنوان عوارض جمعیت هلال‌احمر جمهوری اسلامی ایران اخذ می‌شود." },
  { t: "نرخ ETS گمرک", d: "مبنای تبدیل ارز در گمرک، نرخ ETS اعلامی در سامانه EPL است، نه نرخ آزاد بازار." },
];

export default function CalculatorPage() {
  const { setChatOpen } = useUI();

  return (
    <main className="overflow-hidden">
      <section className="relative overflow-hidden pt-[150px] pb-10 sm:pt-[170px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
          <div className="animate-drift absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <div className="flex justify-center">
              <Breadcrumbs
                items={[
                  { name: "خانه", href: "/" },
                  { name: "ماشین‌حساب ارز و حقوق گمرکی", href: "/calculator" },
                ]}
              />
            </div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-[13px] font-black text-brand-700 shadow-sm">
                <I name="calc" className="h-4 w-4" />
                ابزارهای بازرگانی تریدچاره
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-[30px] leading-[1.7] font-black text-ink-900 sm:text-4xl sm:leading-[1.6]">
                ماشین‌حساب <span className="text-gradient">ارز و حقوق گمرکی</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-[14px] leading-8 text-slate-500 sm:text-[15px]">
                تبدیل لحظه‌ای ارزها با نرخ زنده بازار و برآورد دقیق حقوق ورودی بر
                اساس قوانین گمرکی جمهوری اسلامی ایران.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
            <Reveal>
              <FxConverter />
            </Reveal>
            <Reveal delay={120}>
              <DutyCalculator />
            </Reveal>
          </div>

          <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-[1.25fr_1fr]">
            <Reveal>
              <div className="flex h-full flex-col gap-3 rounded-[30px] border border-brand-100 bg-white p-6 shadow-card sm:p-7">
                <h2 className="flex items-center gap-2.5 text-[17px] font-black text-ink-900">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
                    <I name="doc" className="h-6 w-6" />
                  </span>
                  مبانی قانونی محاسبات
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {RULES.map((r) => (
                    <div key={r.t} className="rounded-2xl bg-brand-50/70 p-4">
                      <p className="flex items-center gap-1.5 text-[13.5px] font-black text-brand-800">
                        <I name="check" className="h-4 w-4 text-green-600" strokeWidth={2.5} />
                        {r.t}
                      </p>
                      <p className="mt-1.5 text-[12px] leading-6.5 font-medium text-slate-500">{r.d}</p>
                    </div>
                  ))}
                </div>
                <p className="rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-4 text-[12px] leading-7 font-bold text-amber-800">
                  ⚠️ این محاسبات برآورد تقریبی است و جایگزین استعلام رسمی گمرک نیست. مأخذ دقیق هر کالا از جدول
                  تعرفه (کتاب مقررات صادرات و واردات) استخراج می‌شود؛ برای صدور پیش‌فاکتور دقیق با کارشناسان ما در
                  تماس باشید.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12px] font-black text-slate-400">راهنماهای مرتبط:</span>
                  <a href="/blog/find-hs-code" className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12px] font-black text-brand-700 transition hover:bg-brand-100">
                    پیدا کردن کد HS
                  </a>
                  <a href="/blog/import-rules-1405" className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12px] font-black text-brand-700 transition hover:bg-brand-100">
                    قوانین واردات ۱۴۰۵
                  </a>
                  <a href="/markets" className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12px] font-black text-brand-700 transition hover:bg-brand-100">
                    نرخ لحظه‌ای ارز
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative h-full min-h-[380px] overflow-hidden rounded-[30px] border border-white/60 shadow-soft">
                <Image
                  src="/images/customs-gate.png"
                  alt="گیت هوشمند گمرک"
                  width={880}
                  height={880}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6 sm:p-7">
                  <h3 className="text-xl leading-9 font-black text-white">
                    مأخذ کالای خود را نمی‌دانید؟
                    <br />
                    چاره‌بات در چند ثانیه پیدا می‌کند
                  </h3>
                  <button
                    onClick={() => setChatOpen(true)}
                    className="btn-shine flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-[14px] font-black text-brand-800 shadow-glow transition hover:bg-brand-50"
                  >
                    <I name="bot" className="h-5 w-5" />
                    استعلام هوشمند تعرفه
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
