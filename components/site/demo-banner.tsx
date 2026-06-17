"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useI18n } from "@/components/i18n/language-provider";

const STORAGE_KEY = "up-demo-dismissed";

/**
 * Slim, dismissible top strip stating this is an independent design prototype with demo
 * data. Honesty-first: prominent on first visit, remembered once dismissed.
 */
export function DemoBanner() {
  const { t } = useI18n();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "1") setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <div className="border-b border-line bg-bg-2 text-fg-2">
      <Container className="flex items-center gap-3 py-2">
        <span className="size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
        <p className="min-w-0 flex-1 truncate text-[length:var(--step--2)] sm:text-[length:var(--step--1)]">
          <span className="font-semibold text-fg">{t.meta.demoBannerTitle}.</span>{" "}
          <span className="text-fg-3">{t.meta.demoBanner}</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setHidden(true);
            try {
              window.localStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* storage unavailable — fine */
            }
          }}
          aria-label={t.meta.dismiss}
          className="grid size-6 shrink-0 place-items-center rounded-full text-fg-3 hover:bg-surface hover:text-fg"
        >
          <X className="size-3.5" />
        </button>
      </Container>
    </div>
  );
}
