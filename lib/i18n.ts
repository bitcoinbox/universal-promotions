/**
 * Locale primitives. Kept framework-agnostic so both data files and UI can share them.
 * The site is bilingual EN/ES; copy lives in a single dictionary (content/dictionary.ts)
 * and locale-specific data fields use the `Localized<T>` shape below.
 */
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** A value that exists in both languages, e.g. a fighter bio or event summary. */
export type Localized<T = string> = Record<Locale, T>;

/** Resolve a localized value for the active locale. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "es";
}

export const localeLabels: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  es: { short: "ES", full: "Español" },
};
