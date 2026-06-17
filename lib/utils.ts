import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/lib/i18n";
import type { FightRecord } from "@/types";

/** Merge conditional + conflicting Tailwind classes (the shadcn `cn` helper). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "22-0-0" — wins-losses-draws. */
export function formatRecord(record?: FightRecord): string {
  if (!record) return "TBA";
  return `${record.wins}-${record.losses}-${record.draws}`;
}

const dateLocales: Record<Locale, string> = { en: "en-US", es: "es-PR" };

/**
 * Localized date from a date-only ISO string. Formatted in UTC so server and client
 * render identically regardless of timezone (no hydration mismatch).
 */
export function formatDate(
  iso: string,
  locale: Locale,
  opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" },
): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(dateLocales[locale], { ...opts, timeZone: "UTC" }).format(date);
}

/** Up to two initials from a display name. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Clamp a number into [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
