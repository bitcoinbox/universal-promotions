"use client";

import Link from "next/link";
import { Calendar, MapPin, Play, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import { Matchup } from "@/components/events/matchup";
import { Badge } from "@/components/ui/badge";
import { SponsorLogo } from "@/components/brand/sponsor-logo";
import { useI18n } from "@/components/i18n/language-provider";
import { boutSide, boutWon, type BoutSide } from "@/content/fighters";
import { getSponsor } from "@/content/sponsors";
import { pick } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { Bout, FightEvent } from "@/types";

function SideName({ side, className }: { side: BoutSide; className?: string }) {
  return side.slug ? (
    <Link href={`/fighters/${side.slug}`} className={className}>
      {side.name}
    </Link>
  ) : (
    <span className={className}>{side.name}</span>
  );
}

function ResultLine({ bout }: { bout: Bout }) {
  const { t } = useI18n();
  if (!bout.result) return null;
  const red = boutSide(bout, "red");
  const blue = boutSide(bout, "blue");
  if (!red || !blue) return null;
  const isDraw = bout.result.method === "Draw";
  const redWon = boutWon(bout, red);
  const winner = isDraw || redWon ? red : blue;
  const loser = isDraw || redWon ? blue : red;
  return (
    <li className="flex items-center justify-between gap-3 border-t border-line py-2 first:border-t-0">
      <span className="text-[length:var(--step--1)]">
        <SideName side={winner} className="font-semibold text-fg hover:text-gold" />
        <span className="px-1.5 text-fg-3">{isDraw ? t.common.vs : "def."}</span>
        <SideName side={loser} className="text-fg-2 hover:text-gold" />
      </span>
      <span className="shrink-0 font-mono text-[length:var(--step--2)] font-semibold text-gold">
        {bout.result.method}
        {bout.result.round ? ` · R${bout.result.round}` : ""}
      </span>
    </li>
  );
}

export function PastEventCard({ event }: { event: FightEvent }) {
  const { t, locale } = useI18n();
  const sponsors = event.sponsorSlugs.map(getSponsor).filter((s) => s !== undefined);

  return (
    <article className="flex flex-col gap-5 rounded-token-lg border border-line bg-surface p-6 shadow-[var(--shadow-sm)]">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[length:var(--step-1)] font-bold tracking-tight text-fg">
            <Link href={`/events/${event.slug}`} className="hover:text-gold">
              {pick(event.name, locale)}
            </Link>
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[length:var(--step--1)] text-fg-2">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 text-fg-3" />
              {formatDate(event.date, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-fg-3" />
              {event.venue}
            </span>
          </div>
        </div>
        <Badge tone="neutral">{t.common.past}</Badge>
      </header>

      <div className="rounded-token border border-line bg-bg-2 p-4 sm:p-5">
        <span className="kicker mb-4 block">{t.events.resultLabel}</span>
        <Matchup bout={event.card[0]} size="md" />
      </div>

      {event.card.length > 1 && (
        <ul>
          {event.card.slice(1).map((bout, i) => (
            <ResultLine key={`${bout.redSlug}-${i}`} bout={bout} />
          ))}
        </ul>
      )}

      {event.recap && <p className="text-[length:var(--step--1)] leading-relaxed text-fg-2">{pick(event.recap, locale)}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 py-2 text-[length:var(--step--1)] text-fg-2 transition-colors hover:border-gold/40 hover:text-fg"
        >
          <ArrowUpRight className="size-3.5 text-gold" />
          {t.actions.viewEvent}
        </Link>
        <Link
          href="/media"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 py-2 text-[length:var(--step--1)] text-fg-2 transition-colors hover:border-gold/40 hover:text-fg"
        >
          <Play className="size-3.5 text-gold" />
          {t.events.highlights}
        </Link>
        <Link
          href="/media"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 py-2 text-[length:var(--step--1)] text-fg-2 transition-colors hover:border-gold/40 hover:text-fg"
        >
          <ImageIcon className="size-3.5 text-gold" />
          {t.events.photos}
        </Link>
      </div>

      {sponsors.length > 0 && (
        <div className="border-t border-line pt-4">
          <span className="kicker">{t.events.sponsorsOnNight}</span>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {sponsors.slice(0, 5).map((s) => (
              <SponsorLogo key={s.slug} name={s.name} hue={s.hue} className="h-10" />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
