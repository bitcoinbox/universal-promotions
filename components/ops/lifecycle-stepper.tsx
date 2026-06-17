"use client";

import { Check, Lock } from "lucide-react";
import { eventLifecycleOrder, type EventLifecycle } from "@/types";
import { useI18n } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

/**
 * Six-stage promotional lifecycle stepper. Marks each stage completed / current / future
 * against the event's REAL `lifecycle` field. The current node carries a pulse dot (the
 * global reduced-motion rule disables it). Presentational — read-only.
 */
export function LifecycleStepper({ current }: { current: EventLifecycle }) {
  const { t } = useI18n();
  const currentIndex = eventLifecycleOrder.indexOf(current);

  return (
    <ol className="flex items-start">
      {eventLifecycleOrder.map((stage, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "future";
        const isLast = i === eventLifecycleOrder.length - 1;
        return (
          <li key={stage} className="relative flex flex-1 flex-col items-center">
            {/* connector track to the next node */}
            {!isLast && (
              <span
                aria-hidden
                className="absolute left-1/2 top-4 h-0.5 w-full -translate-y-1/2"
                style={{
                  background:
                    i < currentIndex
                      ? "linear-gradient(90deg, var(--gold-deep), var(--gold))"
                      : "var(--line)",
                }}
              />
            )}
            {/* node */}
            <span
              className={cn(
                "relative z-10 grid size-8 place-items-center rounded-full border text-[length:var(--step--2)] font-semibold",
                state === "done" && "border-transparent bg-[color-mix(in_srgb,var(--gold)_22%,transparent)] text-gold",
                state === "current" && "border-gold bg-gold text-[var(--brand-ink)] shadow-[var(--shadow-gold)]",
                state === "future" && "border-line bg-bg-2 text-fg-3",
              )}
            >
              {state === "done" ? (
                <Check className="size-4" strokeWidth={2.5} />
              ) : state === "future" ? (
                <Lock className="size-3.5" />
              ) : (
                <span className="size-2 animate-pulse rounded-full bg-[var(--brand-ink)]" />
              )}
            </span>
            {/* label */}
            <span
              className={cn(
                "mt-2 max-w-[10ch] text-center text-[length:var(--step--2)] leading-tight",
                state === "current" ? "font-semibold text-fg" : "text-fg-3",
              )}
            >
              {t.lifecycle[stage]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
