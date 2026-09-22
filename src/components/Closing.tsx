"use client";

import { useState } from "react";
import { FAQS, TESTIMONIALS } from "@/lib/data";
import { I, Reveal, SectionHead, useUI } from "./ui";

/* ================= Enamad badge ================= */

export function EnamadSeal({ size = "md" }: { size?: "md" | "sm" }) {
  const box = size === "md" ? "h-24 w-24" : "h-16 w-16";
  return (
    <span className={`relative grid ${box} shrink-0 place-items-center`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-lg">
        <defs>
          <linearGradient id="enamad-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1f74ff" />
            <stop offset="100%" stopColor="#084cb8" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="47" fill="url(#enamad-g)" />
        <circle cx="50" cy="50" r="47" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#7cbcff" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M50 22l6.5 13.2 14.5 2.1-10.5 10.2 2.5 14.5-13-6.8-13 6.8 2.5-14.5L29 37.3l14.5-2.1L50 22z" fill="#fff" />
        <path d="M30 70h40" stroke="#7cbcff" strokeWidth="3" strokeLinecap="round" />
        <path d="M37 77h26" stroke="#7cbcff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ================= Trust / licenses ================= */

const LICENSES = [
  {
    icon: "enamad",
    title: "نماد اعتماد الکترونیکی",
    desc: "دارای اینماد دو ستاره از مرکز توسعه تجارت الکترونیکی",
    code: "کد: ۴۵۸۲۹۱۷۳",
  },
  {
    icon: "badge",
    title: "کارگزاری رسمی گمرک",
    desc: "مجوز رسمی حق‌العمل‌کاری از گمرک جمهوری اسلامی ایران",
    code: "پروانه: ۱۳۹۸/۵۴۲۱",
  },
  {
    icon: "bank",
    title: "عضو اتاق بازرگانی",
    desc: "عضو فعال اتاق بازرگانی، صنایع، معادن و کشاورزی ایران",
    code: "کارت بازرگانی معتبر",
  },
  {
    icon: "medal",
    title: "ISO 9001:2015",
    desc: "گواهی مدیریت کیفیت در ارائه خدمات بازرگانی و لجستیک",
    code: "Cert. IR-2024-8817",
  },
];

export function Trust() {
  return (
    <section id="licenses" className="relative scroll-mt-28 bg-gradient-to-b from-white via-brand-50/70 to-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="اعتماد، سرمایه اصلی ماست"
          title={
            <>
              دارای <span className="text-gradient">مجوزهای رسمی</span> و نماد اعتماد
            </>
          }
          desc="تریدچاره تحت نظارت نهادهای رسمی کشور فعالیت می‌کند؛ با خیال راحت سرمایه و کالای خود را به ما بسپارید."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LICENSES.map((l, i) => (
            <Reveal key={l.title} delay={i * 90}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-[28px] border border-brand-100 bg-white p-7 text-center shadow-card transition hover:-translate-y-2 hover:border-brand-300 hover:shadow-soft">
                {l.icon === "enamad" ? (
                  <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <EnamadSeal />
                  </span>
                ) : (
                  <span className="grid h-24 w-24 place-items-center rounded-[28px] bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <I name={l.icon} className="h-11 w-11" />
                  </span>
                )}
                <h3 className="text-[16px] font-black text-ink-900">{l.title}</h3>
                <p className="text-[12.5px] leading-7 text-slate-500">{l.desc}</p>
                <span dir="ltr" className="rounded-full bg-brand-50 px-3.5 py-1.5 text-[11.5px] font-black text-brand-700">
                  {l.code}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Testimonials ================= */

export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="داستان موفقیت"
          title={
            <>
              بازرگانانی که با ما <span className="text-gradient">رشد کردند</span>
            </>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 110} className="h-full">
              <figure className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[28px] border border-brand-100 bg-white p-7 shadow-card transition hover:-translate-y-2 hover:shadow-soft">
                <span className="pointer-events-none absolute -top-3 left-4 text-[110px] leading-none font-black text-brand-50 select-none">
                  &quot;
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <I key={s} name="star" className="h-4 w-4 fill-amber-400" strokeWidth={0} />
                  ))}
                </span>
                <blockquote className="relative text-[14px] leading-8 font-medium text-slate-600">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-brand-50 pt-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 text-[15px] font-black text-white">
                    {t.initials}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[14px] font-black text-ink-900">{t.name}</span>
                    <span className="mt-0.5 block text-[12px] font-bold text-slate-400">{t.role}</span>
                  </span>
                  <I name="checks" className="mr-auto h-5 w-5 text-green-500" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= FAQ ================= */

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative scroll-mt-28 py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHead
          eyebrow="سوالات متداول"
          title={
            <>
              هر سؤالی دارید، <span className="text-gradient">اینجا جوابش هست</span>
            </>
          }
        />
        <div className="mt-10 flex flex-col gap-3.5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div
                  className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                    isOpen ? "border-brand-300 bg-white shadow-soft" : "border-brand-100 bg-white/70 hover:border-brand-200 hover:bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-start"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl transition ${
                        isOpen ? "bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft" : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      <I name="chat" className="h-5 w-5" />
                    </span>
                    <span className="flex-1 text-[15px] font-black text-ink-900">{f.q}</span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? "rotate-180 border-brand-500 bg-brand-600 text-white" : "border-brand-200 text-brand-600"}`}>
                      <I name="down" className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </button>
                  <div className={`faq-panel ${isOpen ? "open" : ""}`}>
                    <div className="faq-inner">
                      <p className="px-6 pb-6 text-[13.5px] leading-8 text-slate-500">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= CTA banner ================= */

export function CtaBanner() {
  const { openContact, setChatOpen } = useUI();
  return (
    <section className="relative px-4 pb-20 sm:px-6 lg:pb-28">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-l from-brand-800 via-brand-600 to-brand-500 px-8 py-14 text-center shadow-soft sm:px-12 lg:py-16">
          <div className="bg-grid-white absolute inset-0 opacity-60" />
          <div className="animate-floaty absolute top-8 right-10 hidden h-20 w-20 rounded-3xl border border-white/30 bg-white/10 backdrop-blur lg:block" />
          <div className="animate-floaty-sm absolute bottom-10 left-12 hidden h-14 w-14 rounded-2xl border border-white/30 bg-white/10 backdrop-blur lg:block [animation-delay:1.5s]" />
          <div className="animate-drift absolute -top-24 right-1/3 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl" />
          <div className="animate-drift absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-brand-950/50 blur-3xl [animation-delay:2s]" />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2 text-[13px] font-black text-white backdrop-blur">
              <I name="bolt" className="h-4 w-4 text-amber-300" />
              مشاوره اول + استعلام تعرفه کاملاً رایگان
            </span>
            <h2 className="text-3xl leading-[1.6] font-black text-balance text-white sm:text-4xl lg:text-[40px]">
              همین امروز، تجارت بعدی‌تان را با اطمینان شروع کنید
            </h2>
            <p className="max-w-xl text-[14.5px] leading-8 text-sky-100/90">
              یک تماس کافی است تا کارشناسان ما مسیر بهینه واردات، هزینه دقیق و زمان‌بندی ترخیص کالای شما را اعلام کنند.
            </p>
            <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={openContact}
                className="btn-shine flex items-center justify-center gap-2 rounded-2xl bg-white px-9 py-4 text-[16px] font-black text-brand-800 shadow-glow transition hover:bg-brand-50"
              >
                <I name="phone" className="h-5 w-5" />
                تماس با ما
              </button>
              <button
                onClick={() => setChatOpen(true)}
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-white/40 bg-white/10 px-8 py-[14px] text-[16px] font-black text-white backdrop-blur transition hover:bg-white/20"
              >
                <I name="bot" className="h-5 w-5" />
                مشاوره با هوش مصنوعی
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
