"use client";

import { locales, localeLabels } from "@/lib/i18n";
import { useI18n } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

/**
 * Segmented EN/ES control. Both options are always visible so the choice is obvious;
 * the active language is conveyed with `aria-pressed` and a clear visual state.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.actions.switchLanguage}
      className={cn(
        "inline-flex items-center rounded-full border border-line-2 bg-surface p-0.5 text-[length:var(--step--2)]",
        className,
      )}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={localeLabels[code].full}
            className={cn(
              "rounded-full px-3 py-1 font-semibold uppercase tracking-[0.13em] transition-colors duration-200",
              active
                ? "bg-gold !text-black shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_2px_8px_color-mix(in_srgb,var(--gold)_35%,transparent)]"
                : "text-fg-3 hover:text-fg",
            )}
          >
            {localeLabels[code].full}
          </button>
        );
      })}
    </div>
  );
}
