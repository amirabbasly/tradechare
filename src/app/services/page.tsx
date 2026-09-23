"use client";

import Image from "next/image";
import { SERVICES, STEPS } from "@/lib/data";
import { I, Reveal, SectionHead, useUI } from "@/components/ui";
import { CtaBanner } from "@/components/Closing";

const DETAILS: Record<string, string[]> = {
  "ترخیص از کلیه گمرکات": [
    "کارگزار رسمی در ۴۸ گمرک سراسری",
    "تنظیم اظهارنامه، کوتاژ و پروانه",
    "پیگیری آزمایشگاه، استاندارد و قرنطینه",
    "ترخیص اضطراری ۲۴ ساعته فرودگاهی",
  ],
  "ثبت سفارش و سامانه EPL": [
    "ثبت سفارش در سامانه جامع تجارت",
    "اخذ و بررسی پیش‌فاکتور (پروفرما)",
    "تمدید، ویرایش و پیگیری پرونده",
    "اولویت‌بندی و تخصیص ارز",
  ],
  "تخصیص ارز نیما و توافقی": [
    "ارز نیمایی، توافقی و صادراتی",
    "هماهنگی با بانک عامل تا واریز حواله",
    "رفع تعهد ارزی واردات و صادرات",
    "مشاوره پوشش ریسک نوسان نرخ",
  ],
  "حمل بین‌المللی": [
    "دریایی FCL و LCL از چین و امارات",
    "هوایی اکسپرس ۵ تا ۷ روزه",
    "زمینی، ترانزیت و کراس‌استاف",
    "سرویس درب‌به‌درب با رهگیری لحظه‌ای",
  ],
  "اعتبارات و امور بانکی": [
    "گشایش اعتبار اسنادی (LC)",
    "برات و حواله‌جات ارزی",
    "تسویه امن از طریق دفتر دبی",
    "رفع سوءاثر و تعهدات بانکی",
  ],
  "استعلام تعرفه و HS Code": [
    "تشخیص هوشمند کد تعرفه با چاره‌بات",
    "استعلام بخشنامه‌ها و معافیت‌ها",
    "مشاوره تعیین ارزش گمرکی",
    "رسیدگی به اختلافات تعرفه‌ای",
  ],
  "مدیریت سرمایه تجاری": [
    "تامین مالی زنجیره تامین (SCF)",
    "مدیریت سبد ارزی شرکت‌ها",
    "پوشش ریسک نوسانات نرخ ارز",
    "گزارش‌دهی مالی به هیئت‌مدیره",
  ],
  "بیمه و بازرسی کالا": [
    "بیمه باربری با معتبرترین بیمه‌ها",
    "بازرسی کمی و کیفی مبدا (SGS/BV)",
    "نمونه‌برداری و آزمون استاندارد",
    "اخذ مجوزهای بهداشت و قرنطینه",
  ],
};

const GUIDES = [
  { slug: "shahid-rajaee-clearance-guide", title: "راهنمای ترخیص از گمرک شهید رجایی", desc: "از اظهارنامه تا پروانه؛ ترفندهای کاهش خواب کالا", cover: "/images/blog-clearance.png" },
  { slug: "order-registration-samane", title: "ثبت سفارش در سامانه جامع تجارت", desc: "آموزش قدم‌به‌قدم بدون حتی یک برگشت پرونده", cover: "/images/blog-portal.png" },
  { slug: "car-clearance", title: "ترخیص خودرو از گمرک", desc: "شرایط، مدارک و عوارض خودروهای وارداتی", cover: "/images/blog-car.png" },
  { slug: "cargo-insurance", title: "بیمه باربری و بازرسی کالا", desc: "محافظت از سرمایه با بیمه و بازرسی مبدا", cover: "/images/blog-shipping.png" },
];

export default function ServicesPage() {
  const { openContact, setChatOpen } = useUI();

  return (
    <main className="overflow-hidden">
      {/* hero */}
      <section className="relative overflow-hidden pt-[150px] pb-12 sm:pt-[170px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
          <div className="animate-drift absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-brand-200/60 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-[13px] font-black text-brand-700 shadow-sm">
                <I name="anchor" className="h-4 w-4" />
                خدمات بازرگانی تریدچاره
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-[30px] leading-[1.7] font-black text-ink-900 sm:text-4xl sm:leading-[1.6] lg:text-[46px]">
                زنجیره کامل تجارت،
                <br />
                زیر <span className="text-gradient">یک سقف</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="max-w-xl text-[14.5px] leading-8 text-slate-500 sm:text-[16px]">
                با ۲۰ سال تجربه، هر ۸ خدمت کلیدی بازرگانی — از ثبت سفارش تا تحویل
                درب انبار — را با یک قرارداد، یک پنل رهگیری و یک تیم پشتیبانی
                دریافت کنید.
              </p>
            </Reveal>
            <Reveal delay={240} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={openContact}
                className="btn-shine flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-500 px-8 py-3.5 text-[15px] font-black text-white shadow-soft transition hover:shadow-glow"
              >
                <I name="phone" className="h-5 w-5" />
                درخواست خدمت
              </button>
              <button
                onClick={() => setChatOpen(true)}
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-200 bg-white px-8 py-3 text-[15px] font-black text-brand-700 transition hover:border-brand-400 hover:bg-brand-50"
              >
                <I name="bot" className="h-5 w-5" />
                مشاوره با چاره‌بات
              </button>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-[560px]">
              <div className="ring-conic animate-spin-slow absolute -inset-4 rounded-[36px] opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/60 shadow-soft">
                <Image
                  src="/images/services-hero.png"
                  alt="شبکه لجستیک جهانی تریدچاره"
                  width={1120}
                  height={880}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="animate-floaty glass-strong absolute -bottom-5 right-4 flex items-center gap-2.5 rounded-2xl border border-white/60 px-4 py-3 shadow-card sm:right-8">
                <I name="shield" className="h-6 w-6 text-brand-600" />
                <span className="text-[13px] font-black text-ink-900">پوشش بیمه‌ای کامل مرسولات</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* details */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="جزئیات خدمات"
            title={<>۸ ستون اصلی <span className="text-gradient">خدمات ما</span></>}
            desc="روی هر خدمت کلیک کنید تا مستقیم با کارشناس همان حوزه صحبت کنید."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 100}>
                <div className="group flex h-full flex-col gap-4 rounded-[28px] border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-soft sm:p-7">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <I name={s.icon} className="h-7 w-7" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-[17px] font-black text-ink-900 sm:text-[18px]">{s.title}</h2>
                      <span className="mt-1 inline-block rounded-full bg-brand-50 px-3 py-0.5 text-[11px] font-black text-brand-700">
                        {s.tag}
                      </span>
                    </div>
                  </div>
                  <p className="text-[13.5px] leading-7 text-slate-500">{s.desc}</p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {(DETAILS[s.title] ?? []).map((d) => (
                      <li key={d} className="flex items-start gap-2 rounded-xl bg-brand-50/60 px-3 py-2.5 text-[12.5px] leading-6 font-bold text-slate-700">
                        <I name="check" className="mt-0.5 h-4 w-4 shrink-0 text-green-600" strokeWidth={2.5} />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={openContact}
                    className="mt-auto flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-100 px-5 py-3 text-[14px] font-black text-brand-700 transition hover:border-brand-500 hover:bg-brand-50"
                  >
                    <I name="phone" className="h-4 w-4" />
                    درخواست «{s.title}»
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI block */}
      <section className="px-4 pb-4 sm:px-6">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative grid items-center gap-8 overflow-hidden rounded-[36px] bg-gradient-to-l from-brand-950 via-[#0d3a24] to-brand-900 p-8 shadow-soft sm:p-12 lg:grid-cols-2">
            <div className="bg-grid-white absolute inset-0 opacity-50" />
            <div className="animate-drift absolute -top-20 right-10 h-72 w-72 rounded-full bg-brand-500/30 blur-[100px]" />
            <div className="relative order-2 overflow-hidden rounded-[28px] border border-white/15 shadow-glow lg:order-1">
              <Image
                src="/images/ai-brain.png"
                alt="مغز هوش مصنوعی چاره‌بات"
                width={800}
                height={800}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
              <span className="glass absolute right-4 bottom-4 rounded-2xl border border-white/40 px-4 py-2 text-[12.5px] font-black text-ink-900">
                دقت تشخیص تعرفه: ۹۷٪
              </span>
            </div>
            <div className="relative order-1 flex flex-col items-start gap-4 lg:order-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-black text-amber-200">
                چاره‌بات — دستیار هوشمند شما
              </span>
              <h2 className="text-2xl leading-snug font-black text-white sm:text-3xl sm:leading-[1.7]">
                هر ۸ خدمت، با قدرت <span className="text-gradient-light">هوش مصنوعی</span>
              </h2>
              <p className="text-[14px] leading-8 text-stone-100/80">
                چاره‌بات در تمام مراحل — از تشخیص تعرفه و محاسبه حقوق ورودی تا
                پیش‌بینی زمان ترخیص و تحلیل نرخ ارز — کنار شماست و ۲۴ ساعته
                پاسخ‌گوست.
              </p>
              <button
                onClick={() => setChatOpen(true)}
                className="btn-shine mt-1 flex items-center gap-2 rounded-2xl bg-gradient-to-l from-amber-400 to-brand-500 px-8 py-3.5 text-[15px] font-black text-white shadow-glow transition hover:brightness-110"
              >
                <I name="chat" className="h-5 w-5" />
                شروع گفت‌وگو با چاره‌بات
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* process mini */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="شروع همکاری"
            title={<>از درخواست تا تحویل، فقط <span className="text-gradient">۵ گام</span></>}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="flex h-full items-start gap-3 rounded-3xl border border-brand-100 bg-white p-5 shadow-sm">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-[16px] font-black text-white shadow-soft">
                    {(i + 1).toLocaleString("fa-IR")}
                  </span>
                  <span>
                    <span className="block text-[14px] font-black text-ink-900">{s.title}</span>
                    <span className="mt-1 block text-[12px] leading-6 font-bold text-slate-500">{s.desc}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* related guides */}
      <section className="bg-gradient-to-b from-white via-brand-50/60 to-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="راهنماهای مرتبط"
            title={<>قبل از شروع، این راهنماها را <span className="text-gradient">بخوانید</span></>}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDES.map((g, i) => (
              <Reveal key={g.slug} delay={i * 70}>
                <a
                  href={`/blog/${g.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-brand-100 bg-white shadow-card transition hover:-translate-y-2 hover:shadow-soft"
                >
                  <div className="relative h-36 shrink-0 overflow-hidden">
                    <Image src={g.cover} alt={g.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-5">
                    <h3 className="text-[14.5px] leading-7 font-black text-ink-900 transition group-hover:text-brand-700">{g.title}</h3>
                    <p className="line-clamp-2 text-[12.5px] leading-7 text-slate-500">{g.desc}</p>
                  </div>
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
