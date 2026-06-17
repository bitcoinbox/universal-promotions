"use client";

import { useI18n } from "@/components/i18n/language-provider";

/** Keyboard skip-to-content link — visually hidden until focused. */
export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-token focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-[var(--brand-ink)]"
    >
      {t.actions.skipToContent}
    </a>
  );
}
