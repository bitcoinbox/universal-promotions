"use client";

import Link from "next/link";
import { Calendar, Clock, Users } from "lucide-react";
import { EventPoster } from "@/components/events/event-poster";
import { Matchup } from "@/components/events/matchup";
import { BroadcastRow } from "@/components/events/broadcast-row";
import { SponsorLogo } from "@/components/brand/sponsor-logo";
import { ExternalLink } from "@/components/ui/external-link";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/language-provider";
import { divisions } from "@/content/divisions";
import { boutSide, type BoutSide } from "@/content/fighters";
import { getSponsor } from "@/content/sponsors";
import { pick } from "@/lib/i18n";
import { cn, formatDate } from "@/lib/utils";
import type { Bout, FightEvent } from "@/types";

function SideName({ side }: { side: BoutSide }) {
  return side.slug ? (
    <Link href={`/fighters/${side.slug}`} className="text-fg hover:text-gold">
      {side.name}
    </Link>
  ) : (
    <span className="text-fg">{side.name}</span>
  );
}

function BoutLine({ bout }: { bout: Bout }) {
  const { t, locale } = useI18n();
  const red = boutSide(bout, "red");
  const blue = boutSide(bout, "blue");
  if (!red || !blue) return null;
  return (
    <li className="flex flex-col gap-0.5 border-t border-line py-2.5 first:border-t-0 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <span className="text-[length:var(--step--1)] font-medium">
        <SideName side={red} />
        <span className="px-1.5 text-fg-3">{t.common.vs}</span>
        <SideName side={blue} />
      </span>
      <span className="shrink-0 text-[length:var(--step--2)] text-fg-3">
        {pick(divisions[bout.divisionId].label, locale)}
        {bout.rounds ? ` · ${bout.rounds} ${t.common.rounds}` : ""}
      </span>
    </li>
  );
}

export function UpcomingEventCard({ event }: { event: FightEvent }) {
  const { t, locale } = useI18n();
  const undercard = event.card.slice(1);
  const sponsors = event.sponsorSlugs.map(getSponsor).filter((s) => s !== undefined);
  const soldOut = event.ticketStatus === "sold-out";

  return (
    <article className="overflow-hidden rounded-token-lg border border-line bg-surface shadow-[var(--shadow-sm)]">
      <div className="grid lg:grid-cols-2">
        <Link href={`/events/${event.slug}`} className="group block focus-visible:outline-none">
          <EventPoster
            event={event}
            className="rounded-none border-b border-line transition-[border-color] group-hover:border-gold/40 lg:border-b-0 lg:border-r"
          />
        </Link>

        <div className="flex flex-col gap-5 p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[length:var(--step--1)] text-fg-2">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 text-gold" />
              {formatDate(event.date, locale)}
            </span>
            {event.doorsTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-fg-3" />
                {t.common.doors} {event.doorsTime}
              </span>
            )}
            {event.venueCapacity && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3.5 text-fg-3" />
                {t.events.capacityLabel} ~{event.venueCapacity.toLocaleString(locale === "es" ? "es-PR" : "en-US")}
              </span>
            )}
          </div>

          <div className="rounded-token border border-line bg-bg-2 p-4 sm:p-5">
            <span className="kicker mb-4 block">{t.common.mainEvent}</span>
            <Matchup bout={event.card[0]} size="md" />
          </div>

          {event.summary && <p className="text-[length:var(--step--1)] leading-relaxed text-fg-2">{pick(event.summary, locale)}</p>}

          {undercard.length > 0 && (
            <div>
              <span className="kicker">{t.common.undercard}</span>
              <ul className="mt-2">
                {undercard.map((bout, i) => (
                  <BoutLine key={`${bout.redSlug}-${i}`} bout={bout} />
                ))}
              </ul>
              <p className="mt-1 text-[length:var(--step--2)] italic text-fg-3">{t.events.fullCardTba}</p>
            </div>
          )}

          {event.broadcasts.length > 0 && <BroadcastRow broadcasts={event.broadcasts} />}

          {sponsors.length > 0 && (
            <div>
              <span className="kicker">{t.events.sponsorsOnNight}</span>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {sponsors.slice(0, 6).map((s) => (
                  <SponsorLogo key={s.slug} name={s.name} hue={s.hue} className="h-11" />
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-3 pt-1">
            <ExternalLink
              href={event.ticketUrl ?? "#"}
              className={cn(buttonVariants({ variant: soldOut ? "outline" : "primary", size: "md" }), soldOut && "opacity-60")}
            >
              {soldOut ? t.common.soldOut : t.actions.getTickets}
            </ExternalLink>
            <Link href={`/events/${event.slug}`} className={buttonVariants({ variant: "ghost", size: "md" })}>
              {t.actions.viewEvent}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
