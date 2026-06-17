import type { MetadataRoute } from "next";
import { fighters } from "@/content/fighters";
import { events } from "@/content/events";
import { legalDocs } from "@/content/legal";
import { siteUrl as base } from "@/lib/site";

const lastModified = "2026-06-15";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/events`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/fighters`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/partners`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/media`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/fight-ops`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const eventPages: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const fighterPages: MetadataRoute.Sitemap = fighters.map((f) => ({
    url: `${base}/fighters/${f.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const legalPages: MetadataRoute.Sitemap = legalDocs.map((d) => ({
    url: `${base}/legal/${d.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...pages, ...eventPages, ...fighterPages, ...legalPages];
}
