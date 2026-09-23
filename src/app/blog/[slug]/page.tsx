import Image from "next/image";
import { notFound } from "next/navigation";
import { ARTICLES, type Article } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { CtaBanner } from "@/components/Closing";
import { ArticleCta, ArticleJsonLd, Breadcrumbs } from "@/components/Seo";
import { I } from "@/components/ui";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return { title: "مقاله" };
  return {
    title: a.title,
    description: a.excerpt,
    authors: [{ name: "تیم تحریریه تریدچاره", url: SITE_URL }],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: a.title,
      description: a.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      section: a.category,
      tags: a.tags,
      images: [{ url: a.cover, width: 1200, height: 630, alt: a.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.excerpt,
      images: [a.cover],
    },
  };
}

/** تبدیل [[متن|لینک]] به لینک داخلی */
function renderRich(text: string, keyPrefix: string) {
  const parts = text.split(/\[\[(.+?)\|(.+?)\]\]/g);
  const out: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(<span key={`${keyPrefix}-t${i}`}>{parts[i]}</span>);
    const label = parts[i + 1];
    const href = parts[i + 2];
    if (label && href) {
      out.push(
        <a
          key={`${keyPrefix}-l${i}`}
          href={href}
          className="font-black text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4 transition hover:text-brand-600 hover:decoration-brand-500"
        >
          {label}
        </a>
      );
    }
  }
  return out;
}

/** هر آیتم body یا پاراگراف است یا سرفصل (شروع با ##) */
function renderBlock(block: string, key: string) {
  if (block.startsWith("## ")) {
    return (
      <h2 key={key} className="pt-2 text-[21px] leading-9 font-black text-ink-900">
        {block.replace(/^##\s+/, "")}
      </h2>
    );
  }
  return (
    <p key={key} className="text-[15px] leading-9.5 font-medium text-stone-600">
      {renderRich(block, key)}
    </p>
  );
}

function relatedArticles(article: Article): Article[] {
  const scored = ARTICLES.filter((a) => a.slug !== article.slug).map((a) => ({
    a,
    score:
      a.tags.filter((t) => article.tags.includes(t)).length * 2 +
      (a.category === article.category ? 1 : 0),
  }));
  scored.sort((x, y) => y.score - x.score);
  return scored.slice(0, 3).map((s) => s.a);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = relatedArticles(article);
  const pageUrl = `${SITE_URL}/blog/${article.slug}`;
  const shareLinks = [
    {
      name: "تلگرام",
      icon: "send",
      href: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.title)}`,
    },
    {
      name: "واتساپ",
      icon: "chat",
      href: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${pageUrl}`)}`,
    },
    {
      name: "لینکدین",
      icon: "users",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    },
    {
      name: "ایکس",
      icon: "x",
      href: `https://x.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.title)}`,
    },
  ];

  return (
    <main className="overflow-hidden">
      <ArticleJsonLd article={article} />
      <article className="relative overflow-hidden pt-[150px] pb-10 sm:pt-[170px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_20%,black,transparent)]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "خانه", href: "/" },
              { name: "مقالات", href: "/blog" },
              { name: article.title, href: `/blog/${article.slug}` },
            ]}
          />

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <a
              href="/blog"
              className="rounded-full bg-gradient-to-l from-brand-600 to-amber-500 px-4 py-1.5 text-[12.5px] font-black text-white"
            >
              {article.category}
            </a>
            <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-stone-400">
              <I name="clock" className="h-4 w-4" /> {article.read} مطالعه
            </span>
            <span className="text-[12.5px] font-bold text-stone-400">• {article.date}</span>
          </div>

          <h1 className="mt-4 text-[26px] leading-[1.8] font-black text-ink-900 sm:text-[34px]">
            {article.title}
          </h1>
          <p className="mt-3 text-[15px] leading-9 font-bold text-stone-500">{article.excerpt}</p>

          {/* byline */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/80 px-4 py-3 backdrop-blur">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 text-[16px] font-black text-white">
              تر
            </span>
            <span className="leading-tight">
              <span className="block text-[13.5px] font-black text-ink-900">تیم تحریریه تریدچاره</span>
              <span className="mt-0.5 block text-[11.5px] font-bold text-stone-400">
                بازبینی‌شده توسط کارشناسان گمرک • {article.date}
              </span>
            </span>
          </div>

          <div className="relative mt-6 h-64 overflow-hidden rounded-[28px] shadow-soft sm:h-96">
            <Image src={article.cover} alt={article.title} fill className="object-cover" priority />
          </div>

          <div className="mt-8 flex flex-col gap-5">
            {article.body.slice(0, 3).map((p, i) => renderBlock(p, `a${i}`))}
          </div>

          <div className="mt-7">
            <ArticleCta />
          </div>

          <div className="mt-7 flex flex-col gap-5">
            {article.body.slice(3).map((p, i) => renderBlock(p, `b${i}`))}
          </div>

          {/* tags + share */}
          <div className="mt-8 flex flex-col gap-4 border-t border-brand-100 pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-black text-stone-400">برچسب‌ها:</span>
              {article.tags.map((t) => (
                <a
                  key={t}
                  href="/blog"
                  className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12px] font-black text-brand-700 transition hover:bg-brand-100"
                >
                  #{t}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-black text-stone-400">اشتراک‌گذاری:</span>
              {shareLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`اشتراک در ${s.name}`}
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-brand-200 bg-white text-brand-600 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-card"
                >
                  <I name={s.icon} className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start gap-3 rounded-[26px] bg-gradient-to-l from-brand-800 to-brand-600 p-6 text-white shadow-soft sm:flex-row sm:items-center">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
              <I name="bot" className="h-7 w-7" />
            </span>
            <p className="flex-1 text-[14px] leading-8 font-bold text-stone-50">
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
                  <span className="mt-auto text-[12px] font-bold text-stone-400">{a.date} • {a.read}</span>
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
