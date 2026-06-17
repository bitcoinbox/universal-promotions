"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Instagram, Twitter, Youtube, Calendar, Download, Trophy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { Portrait } from "@/components/brand/portrait";
import { Badge } from "@/components/ui/badge";
import { FighterStatusBadge } from "@/components/fighters/status-badge";
import { Matchup } from "@/components/events/matchup";
import { MediaCard } from "@/components/media/media-card";
import { ExternalLink } from "@/components/ui/external-link";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/language-provider";
import {
  getFighter,
  divisions,
  getFighterNextEvent,
  getFighterFights,
  getMediaForFighter,
} from "@/lib/data";
import { pick } from "@/lib/i18n";
import { cn, formatRecord, formatDate } from "@/lib/utils";
import type { Bout, FightEvent, SocialLinks } from "@/types";

const socialIcons = { instagram: Instagram, x: Twitter, youtube: Youtube } as const;

function TapeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-b-0">
      <span className="text-[length:var(--step--1)] text-fg-3">{label}</span>
      <span className="text-[length:var(--step--1)] font-semibold text-fg">{value}</span>
    </div>
  );
}

function FightHistoryRow({ fighterSlug, event, bout }: { fighterSlug: string; event: FightEvent; bout: Bout }) {
  const { t, locale } = useI18n();
  const opponentSlug = bout.redSlug === fighterSlug ? bout.blueSlug : bout.redSlug;
  const opponent = getFighter(opponentSlug);
  const result = bout.result;
  const won = result?.winnerSlug === fighterSlug;
  const isDraw = result?.method === "Draw";
  return (
    <li className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-b-0">
      <div className="min-w-0">
        <Link href={`/events/${event.slug}`} className="font-medium text-fg hover:text-gold">
          {pick(event.name, locale)}
        </Link>
        <p className="text-[length:var(--step--2)] text-fg-3">
          {formatDate(event.date, locale, { month: "short", day: "numeric", year: "numeric" })}
          {opponent && (
            <>
              {" · "}
              {t.common.vs}{" "}
              <Link href={`/fighters/${opponent.slug}`} className="hover:text-gold">
                {opponent.name}
              </Link>
            </>
          )}
        </p>
      </div>
      {result ? (
        <Badge tone={isDraw ? "neutral" : won ? "ok" : "outline"} size="sm" className="font-mono">
          {isDraw ? "D" : won ? "W" : "L"} · {result.method}
          {result.round ? ` R${result.round}` : ""}
        </Badge>
      ) : (
        <Badge tone="gold" size="sm">
          {t.common.upcoming}
        </Badge>
      )}
    </li>
  );
}

export function FighterProfile({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const fighter = getFighter(slug);
  if (!fighter) notFound();

  const division = fighter.division ? divisions[fighter.division] : undefined;
  const nextEvent = getFighterNextEvent(fighter.slug);
  const nextBout = nextEvent?.card.find((b) => b.redSlug === fighter.slug || b.blueSlug === fighter.slug);
  const koPct = fighter.record && fighter.record.wins > 0 ? Math.round((fighter.record.ko / fighter.record.wins) * 100) : 0;
  const stance = fighter.stance ? (fighter.stance === "orthodox" ? t.common.orthodox : t.common.southpaw) : undefined;
  const social = (fighter.social ?? {}) as SocialLinks;
  const socialEntries = (Object.keys(socialIcons) as (keyof typeof socialIcons)[]).filter((k) => social[k]);
  const fights = getFighterFights(fighter.slug);
  const media = getMediaForFighter(fighter.slug);

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(46rem 26rem at 82% -20%, color-mix(in srgb, var(--gold) 12%, transparent), transparent 60%)" }}
      />
      <Container>
        <Link
          href="/fighters"
          className="-mx-2 inline-flex items-center gap-1.5 rounded-token px-2 py-2 text-[length:var(--step--1)] text-fg-2 transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" />
          {t.fighters.backToRoster}
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* portrait */}
          <Reveal>
            <Portrait
              name={fighter.name}
              hue={fighter.hue}
              imageSrc={fighter.imageSrc}
              imageFocus={fighter.imageFocus}
              ratio="portrait"
              sizes="(min-width:1024px) 40vw, 100vw"
              className={cn("w-full", fighter.status === "champion" && "ring-1 ring-gold/40")}
            />
          </Reveal>

          {/* identity + tape */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <FighterStatusBadge status={fighter.status} size="md" />
                {division && <span className="text-[length:var(--step--1)] text-fg-2">{pick(division.label, locale)}</span>}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              {fighter.nickname && <span className="kicker mt-4 block text-gold">“{pick(fighter.nickname, locale)}”</span>}
              <h1 className="mt-1 font-display text-[length:var(--step-3)] font-bold leading-[1.05] tracking-tight">
                {fighter.name}
              </h1>
              <p className="mt-3 max-w-md text-[length:var(--step-0)] text-fg-2">{pick(fighter.tagline, locale)}</p>
            </Reveal>
            {fighter.hometown && (
              <Reveal delay={0.1}>
                <p className="mt-3 inline-flex items-center gap-1.5 text-fg-2">
                  <MapPin className="size-4 text-fg-3" />
                  {fighter.hometown}
                </p>
              </Reveal>
            )}

            {/* record highlight */}
            {fighter.record && <Reveal delay={0.14}>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-token border border-line bg-surface px-5 py-3">
                  <span className="kicker">{t.fighters.recordLabel}</span>
                  <p className="tabular font-mono text-[length:var(--step-2)] font-bold text-fg">
                    {formatRecord(fighter.record)}
                  </p>
                </div>
                <div className="rounded-token border border-line bg-surface px-5 py-3">
                  <span className="kicker">{t.fighters.koLabel}</span>
                  <p className="tabular font-mono text-[length:var(--step-2)] font-bold text-gold">
                    {fighter.record.ko} <span className="text-[length:var(--step--1)] text-fg-3">({koPct}%)</span>
                  </p>
                </div>
              </div>
            </Reveal>}

            {/* tale of the tape */}
            <Reveal delay={0.18}>
              <div className="mt-6 rounded-token border border-line bg-surface p-5">
                <span className="kicker">{t.fighters.profileTale}</span>
                <div className="mt-2">
                  {division && <TapeRow label={t.common.division} value={`${pick(division.label, locale)} · ${division.limitLbs} lb`} />}
                  {stance && <TapeRow label={t.common.stance} value={stance} />}
                  {fighter.hometown && <TapeRow label={t.common.hometown} value={fighter.hometown} />}
                  {fighter.age && <TapeRow label={t.common.age} value={String(fighter.age)} />}
                  <TapeRow
                    label={t.common.record}
                    value={fighter.record ? `${formatRecord(fighter.record)} · ${fighter.record.ko} KO` : t.common.notListed}
                  />
                </div>
              </div>
            </Reveal>

            {socialEntries.length > 0 && (
              <Reveal delay={0.2}>
                <div className="mt-5 flex items-center gap-3">
                  <span className="kicker">{t.fighters.profileSocial}</span>
                  <div className="flex items-center gap-2">
                    {socialEntries.map((key) => {
                      const Icon = socialIcons[key];
                      return (
                        <ExternalLink
                          key={key}
                          href={social[key] as string}
                          aria-label={`${fighter.name} — ${key}`}
                          className="grid size-9 place-items-center rounded-token border border-line bg-surface text-fg-2 transition-colors hover:border-line-2 hover:text-fg"
                        >
                          <Icon className="size-4" />
                        </ExternalLink>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {/* bio */}
        <Reveal>
          <div className="mt-12 max-w-3xl">
            <span className="kicker">{t.fighters.profileBio}</span>
            <p className="mt-3 text-[length:var(--step-0)] leading-relaxed text-fg-2">{pick(fighter.bio, locale)}</p>
          </div>
        </Reveal>

        {/* next fight */}
        <div className="mt-12 border-t border-line pt-10">
          <span className="kicker">{t.fighters.profileNextFight}</span>
          {nextEvent && nextBout ? (
            <Reveal>
              <div className="mt-4 grid gap-5 rounded-token-lg border border-line bg-surface p-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div>
                  <h3 className="font-display text-[length:var(--step-2)] font-bold text-fg">{pick(nextEvent.name, locale)}</h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[length:var(--step--1)] text-fg-2">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-gold" />
                      {formatDate(nextEvent.date, locale)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-fg-3" />
                      {nextEvent.venue}
                    </span>
                  </p>
                  <div className="mt-5 flex gap-3">
                    <ExternalLink href={nextEvent.ticketUrl ?? "#"} className={buttonVariants({ variant: "primary", size: "md" })}>
                      {t.actions.getTickets}
                    </ExternalLink>
                    <ButtonLink href={`/events/${nextEvent.slug}`} variant="ghost">
                      {t.actions.viewEvent}
                    </ButtonLink>
                  </div>
                </div>
                <div className="rounded-token border border-line bg-bg-2 p-5">
                  <Matchup bout={nextBout} size="md" />
                </div>
              </div>
            </Reveal>
          ) : (
            <p className="mt-3 text-fg-2">{t.fighters.profileNoFight}</p>
          )}
        </div>

        {/* fight history (only when there are real recorded bouts) + media kit */}
        <div className={cn("mt-12 grid gap-8 border-t border-line pt-10", fights.length > 0 && "lg:grid-cols-[1.2fr_1fr]")}>
          {fights.length > 0 && (
            <div>
              <span className="kicker inline-flex items-center gap-1.5">
                <Trophy className="size-3.5" />
                {t.fighters.fightHistory}
              </span>
              <ul className="mt-3">
                {fights.map(({ event, bout }, i) => (
                  <FightHistoryRow key={`${event.slug}-${i}`} fighterSlug={fighter.slug} event={event} bout={bout} />
                ))}
              </ul>
            </div>
          )}

          <div className={cn("rounded-token-lg border border-line bg-surface p-6", fights.length === 0 && "max-w-md")}>
            <span className="kicker">{t.fighters.mediaKitTitle}</span>
            <p className="mt-2 text-[length:var(--step--1)] text-fg-2">{t.fighters.mediaKitBody}</p>
            <ExternalLink
              href="#"
              className={cn(buttonVariants({ variant: "outline", size: "md" }), "mt-5 w-full")}
            >
              <Download className="size-4" />
              {t.actions.downloadKit}
            </ExternalLink>
          </div>
        </div>

        {/* related media */}
        <div className="mt-12 border-t border-line pt-10">
          <span className="kicker">{t.fighters.relatedMedia}</span>
          {media.length > 0 ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {media.slice(0, 3).map((item) => (
                <MediaCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-fg-2">{t.fighters.noMedia}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
