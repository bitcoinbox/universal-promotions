"use client";

import { useI18n } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

/**
 * Subtle per-figure "Sample" marker placed next to illustrative numbers. Lighter than the
 * DemoBadge — used inline so a viewer is never misled into reading prototype figures as real.
 */
export function SampleTag({ label, className }: { label?: string; className?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[length:var(--step--2)] uppercase tracking-wide text-fg-3",
        className,
      )}
    >
      <span aria-hidden className="size-1 rounded-full bg-[var(--warn)]" />
      {label ?? t.ops.sample}
    </span>
  );
}
