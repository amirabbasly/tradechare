import { CtaBanner } from "@/components/Closing";
import { I, Reveal } from "@/components/ui";

const LINKS = [
  { icon: "anchor", t: "خدمات بازرگانی", d: "ترخیص، ثبت سفارش و حمل", href: "/services" },
  { icon: "trendUp", t: "نرخ لحظه‌ای ارز و طلا", d: "تالار معاملات تریدچاره", href: "/markets" },
  { icon: "calc", t: "ماشین‌حساب گمرکی", d: "محاسبه حقوق ورودی", href: "/calculator" },
  { icon: "bot", t: "چاره‌بات", d: "هوش مصنوعی بازرگانی", href: "/ai" },
  { icon: "doc", t: "مقالات آموزشی", d: "کتابخانه دانش تجارت", href: "/blog" },
  { icon: "medal", t: "درباره ما", d: "۲۰ سال تجربه", href: "/about" },
];

export default function NotFound() {
  return (
    <main className="overflow-hidden">
      <section className="relative overflow-hidden pt-[160px] pb-16 sm:pt-[180px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="text-gradient text-[100px] leading-none font-black tabular-nums sm:text-[130px]">
              ۴۰۴
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-2xl font-black text-ink-900 sm:text-3xl">
              این صفحه پیدا نشد؛ ولی راه را گم نکرده‌اید!
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-8 text-slate-500">
              ممکن است آدرس اشتباه تایپ شده یا صفحه جابه‌جا شده باشد. از میان
              محبوب‌ترین بخش‌های تریدچاره، مسیرتان را پیدا کنید:
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/"
                className="btn-shine flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-500 px-8 py-3.5 text-[15px] font-black text-white shadow-soft transition hover:shadow-glow"
              >
                بازگشت به صفحه اصلی
              </a>
              <a
                href="/ai"
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-200 bg-white px-8 py-3 text-[15px] font-black text-brand-700 transition hover:border-brand-400 hover:bg-brand-50"
              >
                <I name="bot" className="h-5 w-5" />
                پرسیدن از چاره‌بات
              </a>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-3 text-start sm:grid-cols-2 lg:grid-cols-3">
            {LINKS.map((l, i) => (
              <Reveal key={l.href} delay={i * 60}>
                <a
                  href={l.href}
                  className="group flex h-full items-center gap-3 rounded-3xl border border-brand-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white">
                    <I name={l.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-black text-ink-900">{l.t}</span>
                    <span className="mt-0.5 block text-[11.5px] font-bold text-slate-400">{l.d}</span>
                  </span>
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
