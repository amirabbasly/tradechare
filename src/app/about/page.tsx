import Image from "next/image";
import { ADDRESSES, PHONES } from "@/lib/data";
import { CtaBanner, Trust } from "@/components/Closing";
import { Breadcrumbs, JsonLd } from "@/components/Seo";
import { CountUp, I, Reveal, SectionHead } from "@/components/ui";

export const metadata = {
  title: "درباره ما | ۲۰ سال تجربه بازرگانی و ترخیص کالا",
  description:
    "داستان ۲۰ ساله تریدچاره؛ از دفتر نیاوران تا ۴۸ گمرک سراسری و دفتر دبی. با تیم، ارزش‌ها، مجوزها و دفاتر ما آشنا شوید.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  { year: "۱۳۸۵", title: "تأسیس در نیاوران تهران", desc: "شروع فعالیت به‌عنوان شرکت بازرگانی خانوادگی با تمرکز بر واردات" },
  { year: "۱۳۹۰", title: "پروانه کارگزاری رسمی گمرک", desc: "اخذ مجوز حق‌العمل‌کاری و ورود حرفه‌ای به حوزه ترخیص کالا" },
  { year: "۱۳۹۵", title: "توسعه سراسری", desc: "پوشش ۲۰ گمرک، عضویت اتاق بازرگانی و عبور از ۵٬۰۰۰ پرونده موفق" },
  { year: "۱۴۰۰", title: "افتتاح دفتر دبی", desc: "تسویه بین‌المللی، ترانزیت خلیج فارس و شبکه تامین‌کنندگان جهانی" },
  { year: "۱۴۰۴", title: "رونمایی از چاره‌بات", desc: "اولین هوش مصنوعی فارسی‌زبان حوزه گمرک و تجارت ایران" },
  { year: "امروز", title: "۴۸ گمرک، ۲۵٬۰۰۰ پرونده", desc: "۱۲۰ کارشناس، دو دفتر فعال و معتبرترین نام حوزه ترخیص" },
];

const VALUES = [
  { icon: "shield", t: "شفافیت مطلق", d: "پیش‌فاکتور رسمی قبل از شروع، بدون حتی یک هزینه پنهان" },
  { icon: "bolt", t: "سرعت", d: "فرایندهای بهینه‌شده و پیگیری روزانه پرونده‌ها" },
  { icon: "users", t: "همراهی واقعی", d: "مدیر پرونده اختصاصی و پشتیبانی ۲۴ ساعته" },
  { icon: "bot", t: "نوآوری", d: "هوش مصنوعی، پنل رهگیری لحظه‌ای و اتوماسیون" },
  { icon: "badge", t: "اعتبار رسمی", d: "مجوزهای کامل گمرکی و عضویت نهادهای رسمی" },
  { icon: "globe", t: "نگاه جهانی", d: "دفتر دبی و شبکه تامین‌کنندگان در ۱۲ کشور" },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "درباره تریدچاره",
          url: "https://tradechare.ir/about",
          mainEntity: { "@type": "Organization", name: "تریدچاره" },
        }}
      />

      {/* hero */}
      <section className="relative overflow-hidden pt-[150px] pb-12 sm:pt-[170px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "خانه", href: "/" },
              { name: "درباره ما", href: "/about" },
            ]}
          />
          <div className="mt-6 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-[13px] font-black text-brand-700 shadow-sm">
                  <I name="medal" className="h-4 w-4" />
                  از ۱۳۸۵ تا امروز — ۲۰ سال تجارت
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-4 text-[30px] leading-[1.7] font-black text-ink-900 sm:text-4xl sm:leading-[1.6]">
                  داستان <span className="text-gradient">تریدچاره</span>؛
                  <br />
                  ۲۰ سال اعتماد بازرگانان
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-4 flex flex-col gap-4 text-[14.5px] leading-8.5 font-medium text-stone-500">
                  <p>
                    تریدچاره در سال ۱۳۸۵ به‌عنوان یک شرکت بازرگانی خانوادگی در نیاوران تهران آغاز
                    به کار کرد؛ با یک باور ساده: «تجارت باید شفاف، سریع و بدون استرس باشد.» امروز،
                    بعد از دو دهه، با بیش از ۱۲۰ کارشناس، ۴۸ گمرک تحت پوشش و دفتر فعال در دبی،
                    یکی از معتبرترین نام‌های حوزه تجارت و ترخیص کالای کشور هستیم.
                  </p>
                  <p>
                    ما از ثبت سفارش تا تحویل درب انبار را با یک قرارداد و یک پنل رهگیری مدیریت
                    می‌کنیم؛ بیش از ۲۵٬۰۰۰ پرونده موفق، کارگزاری رسمی گمرک، عضویت اتاق بازرگانی
                    و هوش مصنوعی اختصاصی «چاره‌بات»، حاصل همین مسیر ۲۰ ساله است.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { v: 20, s: "+", t: "سال سابقه" },
                    { v: 120, s: "+", t: "کارشناس" },
                    { v: 12, s: "", t: "کشور همکار" },
                  ].map((s) => (
                    <div key={s.t} className="rounded-3xl border border-brand-100 bg-white p-4 text-center shadow-card">
                      <p className="text-2xl font-black text-ink-900 sm:text-3xl">
                        <CountUp to={s.v} suffix={s.s} />
                      </p>
                      <p className="mt-1 text-[12px] font-bold text-stone-500">{s.t}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <div className="relative mx-auto max-w-[560px]">
                <div className="absolute -inset-3 rounded-[36px] bg-gradient-to-br from-brand-200/60 to-amber-200/40 blur-xl" />
                <div className="relative overflow-hidden rounded-[32px] border border-white/60 shadow-soft">
                  <Image
                    src="/images/about-office.png"
                    alt="تیم بازرگانی تریدچاره در دفتر مرکزی"
                    width={1120}
                    height={860}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
                <div className="animate-floaty glass-strong absolute -bottom-5 right-4 flex items-center gap-2.5 rounded-2xl border border-white/60 px-4 py-3 shadow-card sm:right-8">
                  <I name="pin" className="h-6 w-6 text-brand-600" />
                  <span className="text-[13px] font-black text-ink-900">دفتر مرکزی — نیاوران، جماران</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-gradient-to-b from-white via-brand-50/60 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="مسیر ما"
            title={<>۲۰ سال در <span className="text-gradient">۶ ایستگاه</span></>}
          />
          <div className="relative mt-12">
            <div className="absolute top-0 bottom-0 right-[27px] hidden w-1 rounded-full bg-gradient-to-b from-brand-200 via-brand-400 to-amber-400 lg:block" />
            <div className="flex flex-col gap-5">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 60}>
                  <div className="flex items-start gap-5 rounded-[26px] border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft lg:mr-14">
                    <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-soft">
                      <I name={i === TIMELINE.length - 1 ? "star" : "check"} className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-[13px] font-black text-brand-600">{t.year}</p>
                      <h2 className="mt-0.5 text-[17px] font-black text-ink-900">{t.title}</h2>
                      <p className="mt-1 text-[13.5px] leading-7 text-stone-500">{t.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="ارزش‌های ما"
            title={<>چرا بازرگانان به ما <span className="text-gradient">اعتماد می‌کنند</span></>}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={(i % 3) * 80}>
                <div className="group flex h-full items-start gap-4 rounded-[26px] border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-soft">
                  <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 p-3 text-white shadow-soft transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <I name={v.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-[16px] font-black text-ink-900">{v.t}</span>
                    <span className="mt-1 block text-[13px] leading-7 text-stone-500">{v.d}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Trust />

      {/* offices */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="کجا هستیم"
            title={<>دو دفتر، <span className="text-gradient">یک تیم</span></>}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[28px] bg-gradient-to-l from-brand-800 to-brand-600 p-7 text-white shadow-soft sm:p-8">
                <h2 className="flex items-center gap-2.5 text-[18px] font-black">
                  <I name="pin" className="h-6 w-6 text-amber-300" />
                  {ADDRESSES.tehran.title}
                </h2>
                <p className="mt-3 text-[14.5px] leading-8 font-bold text-stone-100">{ADDRESSES.tehran.text}</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  {PHONES.map((p) => (
                    <a key={p.value} href={p.href} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 backdrop-blur transition hover:bg-white/20">
                      <span className="text-[13px] font-bold text-stone-200">{p.label}</span>
                      <span dir="ltr" className="text-[16px] font-black tabular-nums">{p.value}</span>
                    </a>
                  ))}
                </div>
                <p className="mt-4 flex items-center gap-2 text-[12.5px] font-bold text-amber-200">
                  <I name="clock" className="h-4 w-4" /> {ADDRESSES.hours}
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex h-full flex-col gap-4 rounded-[28px] border border-brand-100 bg-white p-7 shadow-card sm:p-8">
                <h2 className="flex items-center gap-2.5 text-[18px] font-black text-ink-900">
                  <I name="globe" className="h-6 w-6 text-brand-600" />
                  {ADDRESSES.dubai.title}
                </h2>
                <p className="text-[14.5px] leading-8 font-bold text-stone-500">{ADDRESSES.dubai.text}</p>
                <ul className="flex flex-col gap-2.5">
                  {["تسویه ارزی امن با تامین‌کنندگان", "ترانزیت خلیج فارس به بنادر ایران", "انبارداری و کراس‌استاف در جبل‌علی", "پشتیبانی فارسی‌زبان در امارات"].map((t) => (
                    <li key={t} className="flex items-center gap-2.5 rounded-2xl bg-brand-50/70 px-4 py-3 text-[13.5px] font-bold text-stone-600">
                      <I name="check" className="h-4 w-4 shrink-0 text-green-600" strokeWidth={2.5} />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href="/services" className="mt-auto flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-200 px-5 py-3 text-[14px] font-black text-brand-700 transition hover:border-brand-500 hover:bg-brand-50">
                  مشاهده خدمات بازرگانی
                  <I name="arrow" className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
