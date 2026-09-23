"use client";

import { useChat } from "@/lib/useChat";
import { AiOrb, AiWaves } from "@/components/AiOrb";
import { ChatPanel } from "@/components/AiShowcase";
import { CtaBanner } from "@/components/Closing";
import { I, Reveal } from "@/components/ui";

const EXAMPLES = [
  { icon: "search", q: "کد HS قطعات یدکی پمپ آب صنعتی چیه؟" },
  { icon: "calc", q: "حقوق ورودی یک کانتینر لوازم خانگی چقدر میشه؟" },
  { icon: "coins", q: "الان وقت خوبی برای خرید درهمه؟" },
  { icon: "anchor", q: "بهترین گمرک برای ترخیص لوازم خانگی کدومه؟" },
  { icon: "file", q: "برای ثبت سفارش چه مدارکی لازمه؟" },
  { icon: "ship", q: "حمل دریایی از چین چقدر طول میکشه؟" },
];

const CAPS = [
  { icon: "search", t: "تشخیص HS Code", d: "تشخیص کد تعرفه از نام، عکس و کاتالوگ با دقت ۹۷٪" },
  { icon: "calc", t: "محاسبه حقوق ورودی", d: "حقوق گمرکی، سود بازرگانی، مالیات و عوارض" },
  { icon: "chart", t: "تحلیل بازار ارز", d: "روندشناسی نرخ‌ها و پیشنهاد زمان خرید" },
  { icon: "clock", t: "پیش‌بینی زمان ترخیص", d: "تخمین دقیق بر اساس گمرک و نوع کالا" },
  { icon: "doc", t: "راهنمای بخشنامه‌ها", d: "پاسخ بر اساس آخرین قوانین گمرکی" },
  { icon: "chat", t: "پشتیبانی ۲۴ ساعته", d: "همیشه آنلاین، حتی نیمه‌شب و تعطیلات" },
];

export default function AiPage() {
  const chat = useChat();

  const ask = (q: string) => {
    document.getElementById("chat")?.scrollIntoView({ behavior: "smooth", block: "center" });
    chat.send(q);
  };

  return (
    <main className="overflow-hidden">
      {/* hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-[#0d3a24] to-brand-950 pt-[150px] pb-14 sm:pt-[170px]">
        <div className="bg-grid-white absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <div className="animate-drift absolute top-10 right-1/4 h-96 w-96 rounded-full bg-brand-500/30 blur-[120px]" />
        <div className="animate-drift absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-amber-400/20 blur-[120px] [animation-delay:2.5s]" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${(i * 41.3 + 9) % 100}%`,
                top: `${(i * 29.7 + 5) % 100}%`,
                width: 3 + (i % 4) * 1.5,
                height: 3 + (i % 4) * 1.5,
                animationDelay: `${(i * 0.47) % 4}s`,
                animationDuration: `${3 + (i % 5)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6">
          <Reveal>
            <AiOrb size={170} active={chat.typing} />
          </Reveal>
          <Reveal delay={80}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[13px] font-black text-amber-200 backdrop-blur">
              <AiWaves className="eq-light" />
              هوش مصنوعی اختصاصی بازرگانی
            </span>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="text-3xl leading-[1.7] font-black text-balance text-white sm:text-5xl sm:leading-[1.6]">
              با <span className="text-gradient-light">چاره‌بات</span>، مثل یک هلدینگ تجارت کنید
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-2xl text-[14.5px] leading-8 text-stone-100/80 sm:text-[16px]">
              اولین دستیار هوش مصنوعی فارسی‌زبان حوزه گمرک و تجارت؛ آموزش‌دیده روی
              ۲۰ سال پرونده واقعی ترخیص، بخشنامه‌ها و تعرفه‌های گمرکی. سؤالتان را
              بپرسید — در چند ثانیه پاسخ می‌گیرید.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {["دقت تشخیص ۹۷٪", "پاسخ‌گویی ۲۴ ساعته", "کاملاً فارسی", "رایگان"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[12.5px] font-black text-white backdrop-blur">
                  <I name="check" className="h-3.5 w-3.5 text-green-300" strokeWidth={3} />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* chat console */}
      <section id="chat" className="relative scroll-mt-32 bg-gradient-to-b from-brand-950 to-white pb-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="relative">
              <div className="ring-conic absolute -inset-3 rounded-[36px] opacity-25 blur-2xl" />
              <div className="relative">
                <ChatPanel chat={chat} height={440} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="mt-4 flex justify-center">
            <button
              onClick={chat.reset}
              className="flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-[13px] font-black text-slate-500 shadow-sm transition hover:border-brand-400 hover:text-brand-700"
            >
              <I name="refresh" className="h-4 w-4" />
              شروع گفت‌وگوی تازه
            </button>
          </Reveal>
        </div>
      </section>

      {/* examples */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-black text-ink-900 sm:text-3xl">
              نمی‌دانید چه بپرسید؟ <span className="text-gradient">از این‌ها شروع کنید</span>
            </h2>
            <p className="mt-2 text-[14px] font-bold text-slate-500">با یک کلیک، سؤال برای چاره‌بات ارسال می‌شود</p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMPLES.map((e, i) => (
              <Reveal key={e.q} delay={(i % 3) * 80}>
                <button
                  onClick={() => ask(e.q)}
                  className="group flex w-full items-center gap-3 rounded-3xl border border-brand-100 bg-white p-4 text-start shadow-sm transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white">
                    <I name={e.icon} className="h-5.5 w-5.5" />
                  </span>
                  <span className="flex-1 text-[13.5px] leading-7 font-black text-ink-900">{e.q}</span>
                  <I name="arrow" className="h-4 w-4 shrink-0 text-brand-300 transition group-hover:-translate-x-1 group-hover:text-brand-600" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* capabilities */}
      <section className="bg-gradient-to-b from-white via-brand-50/60 to-white py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-black text-ink-900 sm:text-3xl">
              چاره‌بات <span className="text-gradient">چه کارهایی</span> بلد است؟
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPS.map((c, i) => (
              <Reveal key={c.t} delay={(i % 3) * 80}>
                <div className="group flex h-full flex-col gap-2.5 rounded-[26px] border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-soft transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <I name={c.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-[16px] font-black text-ink-900">{c.t}</h3>
                  <p className="text-[13px] leading-7 text-slate-500">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
