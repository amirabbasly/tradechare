import Image from "next/image";
import { ARTICLES } from "@/lib/blog";
import { CtaBanner } from "@/components/Closing";
import { Breadcrumbs } from "@/components/Seo";
import { I, Reveal, SectionHead } from "@/components/ui";

export const metadata = {
  title: "مقالات آموزشی بازرگانی، گمرک و صادرات",
  description: "کتابخانه تخصصی تریدچاره: آموزش ترخیص کالا، ثبت سفارش، تعرفه گمرکی، صادرات، تخصیص ارز و تحلیل بازار ارز از کارشناسان با ۲۰ سال تجربه.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <main className="overflow-hidden">
      <section className="relative overflow-hidden pt-[150px] pb-10 sm:pt-[170px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
          <div className="animate-drift absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-brand-200/60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-4 flex justify-center">
            <Breadcrumbs
              items={[
                { name: "خانه", href: "/" },
                { name: "مقالات", href: "/blog" },
              ]}
            />
          </div>
          <SectionHead
            eyebrow="کتابخانه دانش بازرگانی"
            title={<>مقالات آموزشی <span className="text-gradient">تریدچاره</span></>}
            desc="۲۰ سال تجربه عملی در ترخیص، ثبت سفارش و تجارت را به زبان ساده با شما به اشتراک می‌گذاریم."
          />

          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2 text-[13px] font-black text-brand-700 shadow-sm">
              <I name="doc" className="h-4 w-4" />
              {ARTICLES.length.toLocaleString("fa-IR")} مقاله تخصصی و کاربردی
            </span>
          </div>

          {/* featured */}
          <Reveal delay={100} className="mt-12">
            <a
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-[32px] border border-brand-100 bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-soft lg:grid-cols-2"
            >
              <div className="relative min-h-[260px] overflow-hidden lg:min-h-[340px]">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <span className="absolute top-5 right-5 rounded-full bg-gradient-to-l from-amber-400 to-orange-400 px-4 py-1.5 text-[12px] font-black text-white shadow-lg">
                  ⭐ مقاله ویژه
                </span>
              </div>
              <div className="flex flex-col items-start justify-center gap-4 p-7 sm:p-10">
                <span className="rounded-full bg-brand-50 px-4 py-1.5 text-[12.5px] font-black text-brand-700">
                  {featured.category}
                </span>
                <h2 className="text-2xl leading-snug font-black text-ink-900 transition group-hover:text-brand-700 sm:text-[28px]">
                  {featured.title}
                </h2>
                <p className="text-[14px] leading-8 text-slate-500">{featured.excerpt}</p>
                <span className="flex items-center gap-4 text-[12px] font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <I name="clock" className="h-4 w-4" /> {featured.read} مطالعه
                  </span>
                  <span className="flex items-center gap-1.5">
                    <I name="doc" className="h-4 w-4" /> {featured.date}
                  </span>
                </span>
                <span className="mt-1 flex items-center gap-2 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-500 px-6 py-3 text-[14px] font-black text-white shadow-soft">
                  خواندن مقاله
                  <I name="arrow" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </a>
          </Reveal>

          {/* grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 90} className="h-full">
                <a
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-card transition hover:-translate-y-2 hover:border-brand-300 hover:shadow-soft"
                >
                  <div className="relative h-52 shrink-0 overflow-hidden">
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[11.5px] font-black text-brand-700 shadow backdrop-blur">
                      {a.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 p-6">
                    <h2 className="text-[16.5px] leading-8 font-black text-ink-900 transition group-hover:text-brand-700">
                      {a.title}
                    </h2>
                    <p className="line-clamp-2 text-[13px] leading-7 text-slate-500">{a.excerpt}</p>
                    <span className="mt-auto flex items-center justify-between border-t border-brand-50 pt-4 text-[12px] font-bold text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <I name="clock" className="h-4 w-4" /> {a.read}
                      </span>
                      <span>{a.date}</span>
                    </span>
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
