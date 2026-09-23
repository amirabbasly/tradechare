import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: {
    path: string;
    priority: number;
    changeFrequency: "daily" | "weekly" | "monthly";
    images?: string[];
  }[] = [
    { path: "", priority: 1, changeFrequency: "daily", images: [`${SITE_URL}/images/hero-port.png`] },
    { path: "/services", priority: 0.9, changeFrequency: "weekly", images: [`${SITE_URL}/images/services-hero.png`] },
    { path: "/markets", priority: 0.9, changeFrequency: "daily" },
    { path: "/calculator", priority: 0.85, changeFrequency: "monthly" },
    { path: "/ai", priority: 0.85, changeFrequency: "weekly", images: [`${SITE_URL}/images/ai-brain.png`] },
    { path: "/about", priority: 0.8, changeFrequency: "monthly", images: [`${SITE_URL}/images/about-office.png`] },
    { path: "/tools", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.85, changeFrequency: "daily" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      ...(p.images ? { images: p.images } : {}),
    })),
    ...ARTICLES.map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      images: [`${SITE_URL}${a.cover}`],
    })),
  ];
}
