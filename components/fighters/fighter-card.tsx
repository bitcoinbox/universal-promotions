"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { Portrait } from "@/components/brand/portrait";
import { RecordLine } from "@/components/fighters/record-line";
import { FighterStatusBadge } from "@/components/fighters/status-badge";
import { useI18n } from "@/components/i18n/language-provider";
import { divisions } from "@/content/divisions";
import { getFighterNextEvent } from "@/content/events";
import { pick } from "@/lib/i18n";
import { cn, formatDate } from "@/lib/utils";
import type { Fighter } from "@/types";

/**
 * Poster-style roster card. One clear hierarchy: photo → status (top), then
 * name · record · division (bottom). Champions get a gold rim.
 */
export function FighterCard({ fighter }: { fighter: Fighter }) {
  const { locale } = useI18n();
  const division = fighter.division ? divisions[fighter.division] : undefined;
  const nextEvent = getFighterNextEvent(fighter.slug);
  const isChampion = fighter.status === "champion";

  return (
    <Link
      href={`/fighters/${fighter.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-token border shadow-[var(--shadow-sm)] transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1",
        isChampion ? "border-gold/45" : "border-line",
      )}
    >
      <Portrait
        name={fighter.name}
        hue={fighter.hue}
        imageSrc={fighter.imageSrc}
        imageFocus={fighter.imageFocus}
        ratio="tall"
        rounded={false}
        sizes="(min-width:1024px) 24vw, (min-width:640px) 45vw, 90vw"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-3.5">
        <FighterStatusBadge status={fighter.status} className="self-start" />

        <div className="min-w-0">
          <h3 className="font-display text-[length:var(--step-1)] leading-[0.95] text-white transition-colors group-hover:text-gold">
            {fighter.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {fighter.record && <RecordLine record={fighter.record} className="text-gold" />}
            {division && (
              <span className="min-w-0 truncate text-[length:var(--step--2)] text-white/55">{pick(division.label, locale)}</span>
            )}
          </div>
          {nextEvent && (
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/55 px-2.5 py-1 text-[length:var(--step--2)] text-white/85 backdrop-blur-sm">
              <Calendar className="size-3 shrink-0 text-gold" />
              {formatDate(nextEvent.date, locale, { month: "short", day: "numeric" })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
