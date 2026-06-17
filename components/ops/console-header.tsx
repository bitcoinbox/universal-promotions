"use client";

import { MapPin, CalendarDays } from "lucide-react";
import { useI18n } from "@/components/i18n/language-provider";
import { pick } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { FightEvent } from "@/types";

/**
 * Command bar that frames the console as live software: a pulsing status, the active event,
 * its location/date, and a PROTOTYPE environment tag. Mono, uppercase, broadcast-tracked.
 */
export function ConsoleHeader({ event }: { event: FightEvent }) {
  const { t, locale } = useI18n();
  return (
    <div className="ops-card ops-ticks relative flex flex-wrap items-center gap-x-5 gap-y-2.5 rounded-token-lg border border-line px-4 py-3 sm:px-5">
      <span className="inline-flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ok)] opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-[var(--ok)]" />
        </span>
        <span className="font-mono text-[length:var(--step--2)] uppercase tracking-[0.2em] text-[var(--ok)]">
          {t.ops.liveOps}
        </span>
      </span>

      <span aria-hidden className="hidden h-4 w-px bg-line-2 sm:block" />

      <span className="font-mono text-[length:var(--step--1)] font-semibold uppercase tracking-[0.1em] text-fg">
        {pick(event.name, locale)}
      </span>

      <span className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[length:var(--step--2)] uppercase tracking-[0.08em] text-fg-3">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5 text-gold" />
          {event.city}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-gold" />
          {formatDate(event.date, locale, { month: "short", day: "numeric", year: "numeric" })}
          {event.doorsTime && ` · ${event.doorsTime}`}
        </span>
        <span className="rounded-[5px] border border-[color-mix(in_srgb,var(--warn)_42%,transparent)] bg-[color-mix(in_srgb,var(--warn)_8%,transparent)] px-1.5 py-1 tracking-[0.14em] text-[var(--warn)]">
          {t.common.prototype}
        </span>
      </span>
    </div>
  );
}
