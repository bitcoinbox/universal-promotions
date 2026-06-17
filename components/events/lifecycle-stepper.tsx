"use client";

import { Check } from "lucide-react";
import { useI18n } from "@/components/i18n/language-provider";
import { eventLifecycleOrder, type EventLifecycle } from "@/types";
import { cn } from "@/lib/utils";

/** Horizontal promotional-lifecycle tracker: announced → … → recap published. */
export function LifecycleStepper({ current, className }: { current: EventLifecycle; className?: string }) {
  const { t } = useI18n();
  const idx = eventLifecycleOrder.indexOf(current);

  return (
    <div className={className}>
      <span className="kicker">{t.lifecycle.title}</span>
      <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {eventLifecycleOrder.map((state, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <li key={state} className="flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[length:var(--step--2)] font-medium",
                  active
                    ? "border-gold bg-gold/15 text-gold"
                    : done
                      ? "border-line-2 bg-surface text-fg-2"
                      : "border-line bg-transparent text-fg-3",
                )}
              >
                {done ? (
                  <Check className="size-3" />
                ) : (
                  <span className={cn("size-1.5 rounded-full", active ? "animate-pulse bg-gold" : "bg-fg-3/60")} />
                )}
                {t.lifecycle[state]}
              </span>
              {i < eventLifecycleOrder.length - 1 && (
                <span aria-hidden className="hidden h-px w-3 bg-line sm:block" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
