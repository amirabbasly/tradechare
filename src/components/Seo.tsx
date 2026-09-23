import { ADDRESSES, FAQS, PHONES } from "@/lib/data";
import type { Article } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { I } from "./ui";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** اسکیمای سازمان + وب‌سایت — سراسری */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "تریدچاره",
          alternateName: "Tradechare",
          url: SITE_URL,
          logo: `${SITE_URL}/images/logo.png`,
          description:
            "شرکت بازرگانی تریدچاره؛ ترخیص کالا از کلیه گمرکات، ثبت سفارش، تخصیص ارز و حمل بین‌المللی با ۲۰ سال سابقه.",
          foundingDate: "2006",
          telephone: "+98-21-91006669",
          email: "info@tradechare.ir",
          address: [
            {
              "@type": "PostalAddress",
              addressLocality: "تهران",
              streetAddress: "نیاوران، خیابان جماران، پلاک ۱۲",
              addressCountry: "IR",
            },
            {
              "@type": "PostalAddress",
              addressLocality: "دبی",
              streetAddress: "بیزینس‌بی، برج پرایم تاور، طبقه ۲۱",
              addressCountry: "AE",
            },
          ],
          contactPoint: PHONES.map((p) => ({
            "@type": "ContactPoint",
            telephone: p.value.replace(/-/g, ""),
            contactType: "sales",
            areaServed: "IR",
            availableLanguage: "fa",
          })),
          sameAs: [`${SITE_URL}/blog`],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "تریدچاره",
          url: SITE_URL,
        },
      ]}
    />
  );
}

/** اسکیمای سوالات متداول — صفحه اصلی */
export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

/** اسکیمای مقاله + بردکرامب */
export function ArticleJsonLd({ article }: { article: Article }) {
  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          image: `${SITE_URL}${article.cover}`,
          author: { "@type": "Organization", name: "تریدچاره", url: SITE_URL },
          publisher: {
            "@type": "Organization",
            name: "تریدچاره",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
          },
          mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
          inLanguage: "fa-IR",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "خانه", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "مقالات", item: `${SITE_URL}/blog` },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: `${SITE_URL}/blog/${article.slug}`,
            },
          ],
        },
      ]}
    />
  );
}

/** بردکرامب تصویری + اسکیما برای صفحات داخلی */
export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: `${SITE_URL}${it.href}`,
          })),
        }}
      />
      <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-bold text-stone-400">
        {items.map((it, i) => (
          <span key={it.href} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-brand-300">‹</span>}
            {i === items.length - 1 ? (
              <span className="text-brand-700">{it.name}</span>
            ) : (
              <a href={it.href} className="transition hover:text-brand-600">
                {it.name}
              </a>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

/** کارت تماس داخل مقالات — لینک‌سازی به نقاط تبدیل */
export function ArticleCta({ title = "برای این خدمت، مستقیم با کارشناس صحبت کنید" }: { title?: string }) {
  return (
    <div className="not-prose my-2 flex flex-col gap-3 rounded-[26px] bg-gradient-to-l from-brand-800 to-brand-600 p-6 text-white shadow-soft sm:flex-row sm:items-center">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
        <I name="headset" className="h-7 w-7" />
      </span>
      <p className="flex-1 text-[14px] leading-8 font-bold text-stone-50">{title}</p>
      <span className="flex shrink-0 gap-2">
        <a
          href={`tel:+982191006669`}
          className="rounded-2xl bg-white px-5 py-2.5 text-[13.5px] font-black whitespace-nowrap text-brand-800 transition hover:bg-brand-50"
        >
          <span dir="ltr">021-91006669</span>
        </a>
        <a
          href="/ai"
          className="rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-[13.5px] font-black whitespace-nowrap text-white transition hover:bg-white/20"
        >
          پرسش از چاره‌بات
        </a>
      </span>
    </div>
  );
}

export { ADDRESSES };
