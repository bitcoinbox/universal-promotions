/**
 * Canonical site origin used for metadata, Open Graph, canonical URLs, sitemap and robots.
 * Override per-environment with NEXT_PUBLIC_SITE_URL (no trailing slash needed).
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://universal-promotions.vercel.app").replace(/\/+$/, "");

export const siteName = "Universal Promotions";

/**
 * Where tickets are actually sold (PRticket.com, per the official poster). Override with
 * NEXT_PUBLIC_TICKETS_URL to point at the exact event page once it's live on the vendor.
 */
export const ticketsUrl = process.env.NEXT_PUBLIC_TICKETS_URL ?? "https://www.prticket.com";
