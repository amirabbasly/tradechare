import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "daily" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/markets", priority: 0.9, changeFrequency: "daily" },
    { path: "/calculator", priority: 0.85, changeFrequency: "monthly" },
    { path: "/ai", priority: 0.85, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tools", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.85, changeFrequency: "daily" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...ARTICLES.map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
