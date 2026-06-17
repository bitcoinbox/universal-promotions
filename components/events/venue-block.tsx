"use client";

import { MapPin, Users, ArrowUpRight } from "lucide-react";
import { ExternalLink } from "@/components/ui/external-link";
import { useI18n } from "@/components/i18n/language-provider";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { FightEvent } from "@/types";

/** Venue card with a stylized map placeholder, details, and a (placeholder) directions link. */
export function VenueBlock({ event, className }: { event: FightEvent; className?: string }) {
  const { t, locale } = useI18n();
  return (
    <div className={cn("overflow-hidden rounded-token-lg border border-line bg-surface", className)}>
      <div
        className="bg-grid relative h-28"
        style={{ backgroundColor: `hsl(${event.hue} 28% 10%)` }}
        aria-hidden
      >
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-11 place-items-center rounded-full border border-gold/40 bg-bg/60 text-gold backdrop-blur-sm">
            <MapPin className="size-5" />
          </span>
        </div>
      </div>
      <div className="p-5">
        <span className="kicker">{t.events.venueTitle}</span>
        <h3 className="mt-1 font-display text-[length:var(--step-1)] font-bold text-fg">{event.venue}</h3>
        <p className="text-[length:var(--step--1)] text-fg-2">{event.city}</p>
        {event.venueNote && (
          <p className="mt-1 text-[length:var(--step--2)] text-fg-3">{pick(event.venueNote, locale)}</p>
        )}
        {event.venueCapacity && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-[length:var(--step--2)] text-fg-2">
            <Users className="size-3.5 text-fg-3" />
            {t.events.capacityLabel} ~{event.venueCapacity.toLocaleString(locale === "es" ? "es-PR" : "en-US")}
          </p>
        )}
        <ExternalLink
          href="#"
          className="mt-4 flex items-center gap-1.5 text-[length:var(--step--1)] font-semibold text-gold hover:underline"
        >
          {t.events.getDirections}
          <ArrowUpRight className="size-3.5" />
        </ExternalLink>
      </div>
    </div>
  );
}
