"use client";

import Image from "next/image";
import { I, Reveal, SectionHead, useUI } from "./ui";

const PILLARS = [
  { icon: "globe", title: "تجارت جهانی و بین‌المللی", desc: "اتصال مستقیم به بازارهای چین، امارات، ترکیه و اروپا" },
  { icon: "anchor", title: "ترخیص کالا و امور گمرکی", desc: "کارگزاری رسمی در ۴۸ گمرک سراسری کشور" },
  { icon: "ship", title: "صادرات و واردات", desc: "زنجیره کامل تامین، حمل و تسویه بین‌المللی" },
  { icon: "users", title: "اتصال به بازارهای جهانی", desc: "دفتر دبی و شبکه تامین‌کنندگان معتبر جهانی" },
];

const TIMELINE = [
  { year: "۱۳۸۵", title: "تأسیس تریدچاره", desc: "شروع فعالیت در دفتر نیاوران تهران" },
  { year: "۱۳۹۰", title: "پروانه کارگزاری رسمی", desc: "اخذ مجوز حق‌العمل‌کاری از گمرک ایران" },
  { year: "۱۳۹۵", title: "توسعه سراسری", desc: "پوشش ۲۰ گمرک و عضویت اتاق بازرگانی" },
  { year: "۱۴۰۰", title: "افتتاح دفتر دبی", desc: "تسویه بین‌المللی و ترانزیت خلیج فارس" },
  { year: "۱۴۰۴", title: "رونمایی از چاره‌بات", desc: "اولین هوش مصنوعی فارسی حوزه گمرک" },
];

function Ctas() {
  const { openContact } = useUI();
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <a
        href="/services"
        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-500 px-8 py-3.5 text-[15px] font-black text-white shadow-soft transition hover:shadow-glow"
      >
        مشاهده خدمات ما
        <I name="arrow" className="h-4 w-4" />
      </a>
      <button
        onClick={openContact}
        className="flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-200 bg-white px-8 py-3 text-[15px] font-black text-brand-700 transition hover:border-brand-400 hover:bg-brand-50"
      >
        <I name="phone" className="h-4 w-4" />
        تماس با ما
      </button>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-brand-50/50 to-white" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* image */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-[560px]">
              <div className="absolute -inset-3 rounded-[36px] bg-gradient-to-br from-brand-200/60 to-cyan-200/40 blur-xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/60 shadow-soft">
                <Image
                  src="/images/about-office.png"
                  alt="دفتر مرکزی تریدچاره و تیم بازرگانی"
                  width={1120}
                  height={860}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="animate-floaty glass-strong absolute -top-5 right-4 flex items-center gap-3 rounded-3xl border border-white/60 px-5 py-3.5 shadow-card sm:right-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                  <I name="medal" className="h-6 w-6" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[22px] font-black text-ink-900">۲۰+ سال</span>
                  <span className="block text-[12px] font-bold text-slate-500">تجربه بازرگانی</span>
                </span>
              </div>
              <div className="animate-floaty-sm glass-strong absolute -bottom-5 left-4 flex items-center gap-3 rounded-3xl border border-white/60 px-5 py-3.5 shadow-card [animation-delay:1.6s] sm:left-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg">
                  <I name="file" className="h-6 w-6" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[22px] font-black text-ink-900">۲۵٬۰۰۰+</span>
                  <span className="block text-[12px] font-bold text-slate-500">پرونده موفق</span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <div className="order-1 lg:order-2">
            <SectionHead
              center={false}
              eyebrow="درباره تریدچاره"
              title={
                <>
                  ۲۰ سال است تجارت ایران را <span className="text-gradient">جلو می‌بریم</span>
                </>
              }
              desc="تریدچاره از سال ۱۳۸۵ به‌عنوان یک شرکت بازرگانی خانوادگی در نیاوران تهران آغاز به کار کرد و امروز با بیش از ۱۲۰ کارشناس، ۴۸ گمرک تحت پوشش و دفتر فعال در دبی، یکی از معتبرترین نام‌های حوزه تجارت و ترخیص کالاست."
            />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-brand-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-card">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
                      <I name={p.icon} className="h-5.5 w-5.5" />
                    </span>
                    <span>
                      <span className="block text-[14px] font-black text-ink-900">{p.title}</span>
                      <span className="mt-0.5 block text-[12px] leading-6 font-bold text-slate-500">{p.desc}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={150}>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                {["کارگزار رسمی گمرک ایران", "دارای اینماد دو ستاره", "تسویه امن از دفتر دبی", "فاکتور رسمی و شفاف"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-[13px] font-black text-slate-600">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-green-50 text-green-600">
                      <I name="check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={220} className="mt-7">
              <Ctas />
            </Reveal>
          </div>
        </div>

        {/* timeline */}
        <div className="mt-16 lg:mt-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-black text-ink-900 sm:text-3xl">
              مسیر <span className="text-gradient">۲۰ ساله</span> ما
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="relative flex min-w-[220px] snap-start flex-col items-center gap-2 rounded-[26px] border border-brand-100 bg-white p-6 text-center shadow-sm lg:min-w-0">
                  <span className="rounded-full bg-gradient-to-l from-brand-600 to-cyan-500 px-4 py-1.5 text-[15px] font-black text-white shadow-soft">
                    {t.year}
                  </span>
                  <h4 className="mt-1 text-[15px] font-black text-ink-900">{t.title}</h4>
                  <p className="text-[12.5px] leading-6 font-bold text-slate-500">{t.desc}</p>
                  {i < TIMELINE.length - 1 && (
                    <span className="absolute top-1/2 -left-3 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-400 lg:flex">
                      <I name="arrow" className="h-4 w-4 rotate-180" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
