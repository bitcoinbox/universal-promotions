"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tv, Megaphone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { SponsorLogo } from "@/components/brand/sponsor-logo";
import { EventPoster } from "@/components/events/event-poster";
import { Matchup } from "@/components/events/matchup";
import { BroadcastRow } from "@/components/events/broadcast-row";
import { TicketBadge } from "@/components/events/ticket-badge";
import { LifecycleStepper } from "@/components/events/lifecycle-stepper";
import { VenueBlock } from "@/components/events/venue-block";
import { MediaCard } from "@/components/media/media-card";
import { useI18n } from "@/components/i18n/language-provider";
import { getEvent, getEventSponsors, getMediaForEvent } from "@/lib/data";
import { pick } from "@/lib/i18n";
import { cn, formatDate } from "@/lib/utils";

export function EventDetailView({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const event = getEvent(slug);
  if (!event) notFound();

  const sponsors = getEventSponsors(event);
  const coverage = getMediaForEvent(event.slug);
  const soldOut = event.ticketStatus === "sold-out";
  const undercard = event.card.slice(1);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-[length:var(--step--1)] text-fg-2 transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" />
          {t.events.backToEvents}
        </Link>

        {/* hero */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal>
            <EventPoster event={event} className="shadow-[var(--shadow-elev)]" />
          </Reveal>

          <div className="flex flex-col">
            <Reveal>
              <LifecycleStepper current={event.lifecycle} />
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-[length:var(--step-3)] font-bold leading-[1.05] tracking-tight">
                {pick(event.name, locale)}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[length:var(--step--1)] text-fg-2">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-4 text-gold" />
                  {formatDate(event.date, locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </span>
                {event.doorsTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4 text-fg-3" />
                    {t.common.doors} {event.doorsTime}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4 text-fg-3" />
                  {event.venue}, {event.city}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-5">
                <TicketBadge status={event.ticketStatus} size="md" />
              </div>
            </Reveal>
            {event.summary && (
              <Reveal delay={0.16}>
                <p className="mt-5 max-w-2xl text-[length:var(--step-0)] leading-relaxed text-fg-2">{pick(event.summary, locale)}</p>
              </Reveal>
            )}
            <Reveal delay={0.18}>
              <div className="mt-auto pt-6">
                <div className="flex flex-wrap gap-3">
                  <ExternalLink
                    href={event.ticketUrl ?? "#"}
                    className={cn(buttonVariants({ variant: soldOut ? "outline" : "primary", size: "lg" }), soldOut && "opacity-60")}
                  >
                    {soldOut ? t.common.soldOut : t.actions.getTickets}
                  </ExternalLink>
                  {event.broadcasts.length > 0 && (
                    <ExternalLink href="#" className={buttonVariants({ variant: "outline", size: "lg" })}>
                      <Tv className="size-4" />
                      {t.events.watchCta}
                    </ExternalLink>
                  )}
                  <ButtonLink href="/contact" variant="ghost" size="lg">
                    <Megaphone className="size-4" />
                    {t.events.pressCta}
                  </ButtonLink>
                </div>
                <ExternalLink
                  href="#"
                  className="mt-3 inline-flex items-center gap-1.5 text-[length:var(--step--1)] text-fg-3 hover:text-gold"
                >
                  <Calendar className="size-3.5" />
                  {t.events.alertsCta}
                  <span className="text-fg-3">· {t.events.alertsNote}</span>
                </ExternalLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* card */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <h2 className="font-display text-[length:var(--step-2)] font-bold tracking-tight">{t.events.theCard}</h2>
            <div className="mt-5 rounded-token-lg border border-gold/30 bg-surface p-5 sm:p-6">
              <span className="kicker mb-4 block">{event.status === "past" ? t.events.resultLabel : t.common.mainEvent}</span>
              <Matchup bout={event.card[0]} size="lg" />
            </div>
            {undercard.length > 0 && (
              <div className="mt-4 flex flex-col gap-4">
                {undercard.map((bout, i) => (
                  <div key={`${bout.redSlug}-${i}`} className="rounded-token-lg border border-line bg-surface p-5">
                    <Matchup bout={bout} size="md" />
                  </div>
                ))}
              </div>
            )}
            {event.status === "upcoming" && (
              <p className="mt-4 text-[length:var(--step--2)] italic text-fg-3">{t.events.fullCardTba}</p>
            )}
            {event.recap && (
              <div className="mt-6 rounded-token-lg border border-line bg-bg-2 p-5">
                <span className="kicker">{t.events.recap}</span>
                <p className="mt-2 text-[length:var(--step-0)] leading-relaxed text-fg-2">{pick(event.recap, locale)}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <VenueBlock event={event} />

            {event.broadcasts.length > 0 && (
              <div className="rounded-token-lg border border-line bg-surface p-5">
                <span className="kicker">{t.events.howToWatch}</span>
                <div className="mt-3">
                  <BroadcastRow broadcasts={event.broadcasts} />
                </div>
              </div>
            )}

            {sponsors.length > 0 && (
              <div className="rounded-token-lg border border-line bg-surface p-5">
                <span className="kicker">{t.events.sponsorsOnNight}</span>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {sponsors.map((s) => (
                    <SponsorLogo key={s.slug} name={s.name} hue={s.hue} className="h-11" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* coverage */}
        <div className="mt-16">
          <h2 className="font-display text-[length:var(--step-2)] font-bold tracking-tight">{t.events.coverage}</h2>
          {coverage.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {coverage.map((item, i) => (
                <Reveal key={item.slug} delay={(i % 3) * 0.05}>
                  <MediaCard item={item} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-fg-2">{t.events.noCoverage}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
