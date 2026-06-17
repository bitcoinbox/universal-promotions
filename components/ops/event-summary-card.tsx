"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { ReadinessRing } from "@/components/ops/readiness-ring";
import { FighterCard } from "@/components/ops/fighter-card";
import { Meter } from "@/components/ops/meter";
import { Badge } from "@/components/ui/badge";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { SampleTag } from "@/components/ops/sample-tag";
import { useI18n } from "@/components/i18n/language-provider";
import { ticketsUrl } from "@/lib/site";
import { pick } from "@/lib/i18n";
import { cn, formatDate, clamp } from "@/lib/utils";
import type { FightEvent, Fighter, ReadinessPillar, ReadinessStatus } from "@/types";

const numFmt = (n: number, es: boolean) => n.toLocaleString(es ? "es-PR" : "en-US");

const STATUS_COLOR: Record<ReadinessStatus, string> = {
  ready: "var(--ok)",
  "at-risk": "var(--warn)",
  blocked: "var(--live)",
};
const PILLAR_KEY: Record<ReadinessPillar["id"], string> = {
  venue: "pillarVenue",
  ticketing: "pillarTicketing",
  talent: "pillarTalent",
  broadcast: "pillarBroadcast",
  sponsors: "pillarSponsors",
  media: "pillarMedia",
};

/**
 * The console's anchor: the ONE real event (Queen of the Ring). Date, doors, venue,
 * capacity, headliner, and opponent are real; the tickets-sold figure and overall
 * readiness % are illustrative ("Sample"). Wraps the readiness ring gauge.
 */
export function EventSummaryCard({
  event,
  headliner,
  opponentName,
  ticketsSold,
  readinessPct,
  readiness = [],
}: {
  event: FightEvent;
  headliner?: Fighter;
  opponentName: string;
  ticketsSold: number;
  readinessPct: number;
  readiness?: ReadinessPillar[];
}) {
  const { t, locale } = useI18n();
  const es = locale === "es";
  const capacity = event.venueCapacity ?? 0;
  const pct = capacity ? clamp(Math.round((ticketsSold / capacity) * 100), 0, 100) : 0;

  return (
    <div className="ops-card ops-ticks relative overflow-hidden rounded-token-lg border border-line">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--gold-deep)] to-[var(--gold)]" />
      <div className="relative grid gap-7 p-6 lg:grid-cols-[1.55fr_1fr] sm:p-8">
        {/* left: poster + meta + tickets */}
        <div className="flex flex-col gap-5 sm:flex-row">
          {event.posterSrc && (
            <div className="relative aspect-[3/4] w-32 shrink-0 overflow-hidden rounded-token border border-line sm:w-36">
              <Image
                src={event.posterSrc}
                alt={pick(event.name, locale)}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <span className="kicker text-gold">{t.ops.commandKicker}</span>
            <h2 className="mt-1 font-display text-[length:var(--step-3)] uppercase leading-[0.95] text-gold-foil">
              {pick(event.name, locale)}
            </h2>

            <ul className="mt-3 flex flex-col gap-1.5 text-[length:var(--step--1)] text-fg-2">
              <li className="inline-flex items-center gap-2">
                <Calendar className="size-4 text-gold" />
                {formatDate(event.date, locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </li>
              {event.doorsTime && (
                <li className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-gold" />
                  {t.common.doors} {event.doorsTime}
                </li>
              )}
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-gold" />
                {event.venue}, {event.city}
              </li>
              <li className="inline-flex items-center gap-2">
                <Users className="size-4 text-gold" />
                {numFmt(capacity, es)} {t.ops.seats}
              </li>
            </ul>

            <div className="mt-4 max-w-sm">
              <Meter
                label={t.ops.ticketsSold}
                text={`${numFmt(ticketsSold, es)} / ${numFmt(capacity, es)} · ${pct}%`}
                pct={pct}
              />
              <SampleTag className="mt-1.5" />
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <ExternalLink
                href={event.ticketUrl ?? ticketsUrl}
                className={cn(buttonVariants({ variant: "primary", size: "sm" }), "uppercase tracking-wide")}
              >
                {t.actions.getTickets}
              </ExternalLink>
              <ButtonLink href={`/events/${event.slug}`} variant="outline" size="sm">
                {t.actions.viewEvent}
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* right: readiness ring + headliner matchup */}
        <div className="relative flex flex-col items-center gap-4 border-line lg:border-l lg:pl-7">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-6 left-1/2 size-48 -translate-x-1/2 rounded-full opacity-60 blur-2xl"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--gold) 22%, transparent), transparent 70%)" }}
          />
          <ReadinessRing pct={readinessPct} label={t.ops.readinessLabel} size={150} />
          <SampleTag />

          {/* compact pillar breakdown — echoes the readiness board below */}
          {readiness.length > 0 && (
            <div className="grid w-full grid-cols-2 gap-1.5">
              {readiness.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-1.5 rounded-[5px] border border-line bg-bg-2/50 px-2 py-1.5"
                  title={`${pick(p.note, locale)} · ${p.pct}%`}
                >
                  <span className="size-1.5 shrink-0 rounded-full" style={{ background: STATUS_COLOR[p.status] }} />
                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">
                    {t.ops[PILLAR_KEY[p.id] as keyof typeof t.ops] as string}
                  </span>
                  <span className="tabular ml-auto font-mono text-[10px] font-semibold text-fg-2">{p.pct}</span>
                </div>
              ))}
            </div>
          )}

          <div className="w-full pt-1">
            <span className="kicker mb-2 block text-center text-gold">{t.ops.headlinerLabel}</span>
            {headliner && <FighterCard fighter={headliner} />}
            <div className="mt-2 flex items-center justify-center gap-2 text-[length:var(--step--2)] text-fg-3">
              <span className="font-mono uppercase tracking-wider">{t.common.vs}</span>
              <Badge tone="outline">{opponentName}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
