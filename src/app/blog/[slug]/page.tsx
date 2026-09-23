import Image from "next/image";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/lib/blog";
import { CtaBanner } from "@/components/Closing";
import { I } from "@/components/ui";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  return {
    title: a ? `${a.title} | تریدچاره` : "مقاله | تریدچاره",
    description: a?.excerpt ?? "",
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <main className="overflow-hidden">
      <article className="relative overflow-hidden pt-[150px] pb-10 sm:pt-[170px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_20%,black,transparent)]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <a href="/blog" className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-[13px] font-black text-brand-700 shadow-sm transition hover:bg-brand-50">
            <I name="arrow" className="h-4 w-4 rotate-180" />
            بازگشت به مقالات
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-gradient-to-l from-brand-600 to-cyan-500 px-4 py-1.5 text-[12.5px] font-black text-white">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-400">
              <I name="clock" className="h-4 w-4" /> {article.read} مطالعه
            </span>
            <span className="text-[12.5px] font-bold text-slate-400">• {article.date}</span>
          </div>

          <h1 className="mt-4 text-[26px] leading-[1.8] font-black text-ink-900 sm:text-[34px]">
            {article.title}
          </h1>
          <p className="mt-3 text-[15px] leading-9 font-bold text-slate-500">{article.excerpt}</p>

          <div className="relative mt-7 h-64 overflow-hidden rounded-[28px] shadow-soft sm:h-96">
            <Image src={article.cover} alt={article.title} fill className="object-cover" priority />
          </div>

          <div className="mt-8 flex flex-col gap-5">
            {article.body.map((p, i) => (
              <p key={i} className="text-[15px] leading-9.5 font-medium text-slate-600">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-3 rounded-[26px] bg-gradient-to-l from-brand-800 to-brand-600 p-6 text-white shadow-soft sm:flex-row sm:items-center">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
              <I name="bot" className="h-7 w-7" />
            </span>
            <p className="flex-1 text-[14px] leading-8 font-bold text-sky-50">
              سؤالی درباره این موضوع دارید؟ چاره‌بات، دستیار هوشمند تریدچاره، همین حالا پاسخ می‌دهد.
            </p>
            <a href="/ai" className="shrink-0 rounded-2xl bg-white px-6 py-3 text-[14px] font-black text-brand-800 shadow-glow transition hover:bg-brand-50">
              پرسیدن از چاره‌بات
            </a>
          </div>
        </div>
      </article>

      {/* related */}
      <section className="bg-gradient-to-b from-white via-brand-50/60 to-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-black text-ink-900">
            مقالات <span className="text-gradient">مرتبط</span>
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <a
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-card transition hover:-translate-y-2 hover:shadow-soft"
              >
                <div className="relative h-44 shrink-0 overflow-hidden">
                  <Image src={a.cover} alt={a.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[11.5px] font-black text-brand-700 shadow backdrop-blur">
                    {a.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="text-[15.5px] leading-8 font-black text-ink-900 transition group-hover:text-brand-700">{a.title}</h3>
                  <span className="mt-auto text-[12px] font-bold text-slate-400">{a.date} • {a.read}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
