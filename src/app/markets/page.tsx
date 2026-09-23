import { Rates } from "@/components/Market";
import { CtaBanner } from "@/components/Closing";
import { Breadcrumbs, JsonLd } from "@/components/Seo";
import { I, Reveal } from "@/components/ui";

export const metadata = {
  title: "نرخ لحظه‌ای ارز، طلا و سکه | تالار معاملات",
  description:
    "قیمت لحظه‌ای دلار، یورو، درهم، طلا و سکه با نمودار تکنیکال کندل‌استیک، دیده‌بان بازار و تحلیل روزانه. تالار معاملات تریدچاره هر ۵ دقیقه به‌روز می‌شود.",
  alternates: { canonical: "/markets" },
};

const MARKET_FAQS = [
  {
    q: "قیمت دلار امروز چند است؟",
    a: "قیمت لحظه‌ای دلار آزاد به‌همراه نمودار تکنیکال آن را می‌توانید در تابلوی بالای همین صفحه ببینید. نرخ‌ها مستقیم از بازار دریافت و هر ۵ دقیقه تازه‌سازی می‌شوند.",
  },
  {
    q: "تفاوت نرخ آزاد، نیما و توافقی چیست؟",
    a: "نرخ آزاد قیمت بازار غیررسمی، نرخ نیما قیمت رسمی سامانه نیما برای کالاهای اولویت‌دار و نرخ توافقی قیمت مورد توافق بانک و مشتری است. در مقاله تخصیص ارز نیما و توافقی این تفاوت‌ها را کامل توضیح داده‌ایم.",
  },
  {
    q: "بهترین زمان خرید ارز برای واردات چه زمانی است؟",
    a: "بهترین استراتژی، خرید پلکانی در چند مرحله است تا ریسک نوسان پوشش داده شود. تحلیل روزانه بازار را می‌توانید از چاره‌بات، دستیار هوشمند ما، دریافت کنید.",
  },
  {
    q: "آیا قیمت‌های این صفحه برای محاسبات گمرکی معتبر است؟",
    a: "خیر؛ مبنای محاسبات گمرک نرخ ETS است نه نرخ آزاد. برای محاسبه دقیق حقوق ورودی از ماشین‌حساب حقوق گمرکی تریدچاره استفاده کنید.",
  },
];

export default function MarketsPage() {
  return (
    <main className="overflow-hidden">
      {/* compact hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#050d20] to-brand-950 pt-[150px] pb-8 sm:pt-[170px]">
        <div className="bg-grid-white absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "خانه", href: "/" },
              { name: "نرخ لحظه‌ای ارز و طلا", href: "/markets" },
            ]}
          />
          <div className="mt-4 flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[12.5px] font-black text-amber-200">
              <span className="h-1.5 w-1.5 animate-live rounded-full bg-green-400" />
              تالار معاملات تریدچاره
            </span>
            <h1 className="text-[28px] leading-[1.7] font-black text-white sm:text-4xl">
              نرخ لحظه‌ای ارز، طلا و سکه
            </h1>
            <p className="max-w-2xl text-[14px] leading-8 text-stone-300">
              قیمت دلار، یورو، درهم، طلا و سکه را با نمودار تکنیکال، دیده‌بان بازار
              و عمق معاملات دنبال کنید — مستقیم از بازار، هر ۵ دقیقه تازه‌سازی می‌شود.
            </p>
          </div>
        </div>
      </section>

      <Rates />

      {/* SEO content */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl leading-snug font-black text-ink-900 sm:text-[28px]">
              راهنمای تابلوی ارز تریدچاره؛ چطور از این صفحه استفاده کنیم؟
            </h2>
          </Reveal>
          <div className="mt-6 flex flex-col gap-5 text-[14.5px] leading-9 font-medium text-stone-600">
            <Reveal>
              <p>
                تابلوی بالای صفحه، قیمت لحظه‌ای مهم‌ترین ارزها (دلار، یورو، درهم، پوند، لیر و یوان)
                و انواع طلا و سکه را نمایش می‌دهد. با کلیک روی هر نماد در دیده‌بان، نمودار کندل‌استیک،
                قیمت خرید و فروش، سقف و کف روز و عمق بازار همان نماد را می‌بینید. برای تبدیل سریع
                مبالغ هم می‌توانید از <a href="/calculator" className="font-black text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4 hover:text-brand-600">مبدل ارز و ماشین‌حساب گمرکی</a> استفاده کنید.
              </p>
            </Reveal>
            <Reveal>
              <h3 className="text-xl font-black text-ink-900">چه عواملی نرخ ارز را جابه‌جا می‌کند؟</h3>
              <p className="mt-2">
                عرضه و تقاضای بازار، سیاست‌های بانک مرکزی، اخبار سیاسی و روندهای جهانی دلار، مهم‌ترین
                محرک‌های نرخ‌اند. برای واردکنندگان، نکته کلیدی این است که تصمیم خرید را بر اساس «میانگین»
                بگیرند نه «لحظه»؛ استراتژی خرید پلکانی را در مقاله <a href="/blog/fx-analysis-importers" className="font-black text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4 hover:text-brand-600">تحلیل بازار ارز برای واردکنندگان</a> کامل توضیح داده‌ایم.
              </p>
            </Reveal>
            <Reveal>
              <h3 className="text-xl font-black text-ink-900">تفاوت نرخ آزاد با نرخ گمرکی (ETS)</h3>
              <p className="mt-2">
                قیمت‌هایی که در این صفحه می‌بینید، نرخ بازار آزاد است؛ اما مبنای محاسبه حقوق ورودی در گمرک،
                نرخ ETS اعلامی در سامانه EPL است که معمولاً پایین‌تر است. پس برای برآورد هزینه واردات،
                عدد این تابلو را مستقیم در فرمول گمرک نگذارید — <a href="/ai" className="font-black text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4 hover:text-brand-600">از چاره‌بات بپرسید</a> یا سری به صفحه محاسبه حقوق گمرکی بزنید.
              </p>
            </Reveal>
          </div>

          {/* FAQ */}
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: MARKET_FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }}
          />
          <Reveal className="mt-10">
            <h2 className="text-2xl font-black text-ink-900">سوالات پرتکرار بازار ارز</h2>
          </Reveal>
          <div className="mt-5 flex flex-col gap-3">
            {MARKET_FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm transition open:border-brand-300 open:shadow-card">
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-open:bg-brand-600 group-open:text-white">
                      <I name="chat" className="h-4.5 w-4.5" />
                    </span>
                    <span className="flex-1 text-[14.5px] font-black text-ink-900">{f.q}</span>
                    <I name="down" className="h-4 w-4 shrink-0 text-brand-500 transition group-open:rotate-180" />
                  </summary>
                  <p className="px-6 pb-6 text-[13.5px] leading-8 text-stone-500">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
