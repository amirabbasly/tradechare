"use client";

import Image from "next/image";
import { CUSTOMS, SERVICES, STEPS } from "@/lib/data";
import { I, Reveal, SectionHead, useUI } from "./ui";

export function ServicesGrid() {
  const { openContact } = useUI();
  return (
    <section id="services" className="relative scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="خدمات جامع بازرگانی"
          title={
            <>
              هر آنچه تجارت شما نیاز دارد، <span className="text-gradient">یکجا</span>
            </>
          }
          desc="از استعلام تعرفه تا تحویل درب انبار؛ زنجیره کامل واردات، صادرات و ترخیص کالا با یک قرارداد و یک پنل مدیریتی."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 90}>
              <button
                onClick={openContact}
                className="group relative flex h-full w-full flex-col items-start gap-3 overflow-hidden rounded-[26px] border border-brand-100 bg-white p-6 text-start shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-300 hover:shadow-soft"
              >
                <span className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-brand-100/0 blur-2xl transition-all duration-500 group-hover:bg-brand-100" />
                <span className="flex w-full items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <I name={s.icon} className="h-7 w-7" />
                  </span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-black text-brand-700">
                    {s.tag}
                  </span>
                </span>
                <h3 className="text-[17px] font-black text-ink-900">{s.title}</h3>
                <p className="text-[13.5px] leading-7 text-slate-500">{s.desc}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-1 text-[13px] font-black text-brand-600">
                  درخواست خدمت
                  <I name="arrow" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60} className="mt-8 text-center">
          <a
            href="/services"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-brand-200 bg-white px-8 py-3.5 text-[15px] font-black text-brand-700 shadow-sm transition hover:border-brand-500 hover:bg-brand-50 hover:shadow-card"
          >
            مشاهده جزئیات همه خدمات
            <I name="arrow" className="h-4 w-4" />
          </a>
        </Reveal>

        {/* wide banner */}
        <Reveal delay={100} className="mt-8">
          <div className="relative overflow-hidden rounded-[32px] shadow-soft">
            <Image
              src="/images/port-wide.png"
              alt="بندر کانتینری"
              width={1600}
              height={520}
              className="h-[300px] w-full object-cover sm:h-[340px]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-brand-950/90 via-brand-900/60 to-brand-900/10" />
            <div className="absolute inset-0 flex flex-col items-start justify-center gap-4 p-8 sm:p-12">
              <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[13px] font-black text-white backdrop-blur">
                ترخیص از کلیه گمرکات کشور
              </span>
              <h3 className="max-w-xl text-2xl leading-snug font-black text-balance text-white sm:text-[34px] sm:leading-[1.7]">
                از جبل‌علی تا شهید رجایی؛ کالای شما در سریع‌ترین مسیر ممکن
              </h3>
              <p className="max-w-lg text-[14px] leading-8 text-sky-100/90">
                شبکه کارگزاران رسمی تریدچاره در بنادر، فرودگاه‌ها و مرزهای زمینی، پرونده شما را بدون معطلی به سرانجام می‌رساند.
              </p>
              <button
                onClick={openContact}
                className="btn-shine mt-1 flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-[15px] font-black text-brand-800 shadow-glow transition hover:bg-brand-50"
              >
                <I name="anchor" className="h-5 w-5" />
                استعلام ترخیص کالا
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-white py-20 lg:py-24">
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="فرایند شفاف، بدون استرس"
          title={
            <>
              تجارت شما در <span className="text-gradient">۵ گام ساده</span>
            </>
          }
          desc="از لحظه ثبت درخواست تا تحویل درب انبار، هر مرحله را لحظه‌ای در پنل خود دنبال کنید."
        />

        <div className="relative mt-14">
          <div className="absolute top-9 right-[6%] left-[6%] hidden h-1 rounded-full bg-gradient-to-l from-brand-100 via-brand-300 to-brand-100 lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 110}>
                <div className="group relative flex h-full flex-col items-center gap-4 rounded-[26px] border border-brand-100 bg-white/90 p-6 text-center shadow-sm backdrop-blur transition hover:-translate-y-2 hover:shadow-soft">
                  <span className="relative grid h-[74px] w-[74px] place-items-center">
                    <span className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-brand-500 to-brand-800 shadow-soft transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105" />
                    <span className="absolute inset-0 rounded-[24px] ring-1 ring-white/40 ring-inset" />
                    <span className="relative text-[26px] font-black text-white">{(i + 1).toLocaleString("fa-IR")}</span>
                    <span className="absolute -bottom-1 -left-1 grid h-7 w-7 place-items-center rounded-full bg-cyan-400 text-white ring-4 ring-white">
                      <I name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                  </span>
                  <h3 className="text-[15.5px] font-black text-ink-900">{s.title}</h3>
                  <p className="text-[12.5px] leading-7 text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Coverage() {
  const { setChatOpen } = useUI();
  return (
    <section id="customs" className="relative scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHead
              center={false}
              eyebrow="پوشش سراسری"
              title={
                <>
                  در <span className="text-gradient">۴۸ گمرک</span> سراسری، کنار شماییم
                </>
              }
              desc="بنادر جنوبی، فرودگاه‌های بین‌المللی و مرزهای زمینی؛ هر جا کالای شما باشد، کارگزار تریدچاره همان‌جاست."
            />
            <Reveal delay={120}>
              <div className="mt-6 flex flex-col gap-3">
                {[
                  { from: "جبل‌علی (دبی)", to: "شهید رجایی", time: "ترانزیت دریایی ۲ تا ۴ روزه" },
                  { from: "گوآنگجو (چین)", to: "فرودگاه امام", time: "حمل هوایی ۵ تا ۷ روزه" },
                  { from: "استانبول (ترکیه)", to: "بازرگان / غرب تهران", time: "حمل زمینی ۷ تا ۱۰ روزه" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <I name={["ship", "plane", "truck"][i]} className="h-6 w-6" />
                    </span>
                    <div className="flex-1 leading-tight">
                      <p className="text-[14px] font-black text-ink-900" dir="rtl">
                        {r.from} <span className="mx-1 text-brand-400">←</span> {r.to}
                      </p>
                      <p className="mt-1 text-[12px] font-bold text-slate-400">{r.time}</p>
                    </div>
                    <span className="h-2 w-2 animate-live rounded-full bg-green-500" />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <button
                onClick={() => setChatOpen(true)}
                className="mt-5 flex items-center gap-2 text-[14px] font-black text-brand-700 hover:text-brand-600"
              >
                <I name="bot" className="h-5 w-5" />
                از چاره‌بات بپرسید: بهترین گمرک برای کالای من کدام است؟
              </button>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CUSTOMS.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 80}>
                <div
                  className={`group flex items-center gap-3 rounded-2xl border p-4 transition hover:-translate-y-1 hover:shadow-card ${
                    c.hot
                      ? "border-brand-300 bg-gradient-to-l from-brand-600 to-brand-500 text-white shadow-soft"
                      : "border-brand-100 bg-white"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                      c.hot ? "bg-white/20 text-white" : "bg-brand-50 text-brand-600"
                    }`}
                  >
                    <I name="anchor" className="h-6 w-6" />
                  </span>
                  <div className="leading-tight">
                    <p className={`text-[14px] font-black ${c.hot ? "text-white" : "text-ink-900"}`}>{c.name}</p>
                    <p className={`mt-1 text-[12px] font-bold ${c.hot ? "text-sky-100" : "text-slate-400"}`}>{c.time}</p>
                  </div>
                  {c.hot && (
                    <span className="mr-auto rounded-full bg-white/25 px-2.5 py-1 text-[10px] font-black text-white">
                      پرتردد
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
