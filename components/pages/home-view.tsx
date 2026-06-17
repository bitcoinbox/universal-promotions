"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { ArrowRight, Calendar, MapPin, Youtube, Instagram } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Stat } from "@/components/ui/stat";
import { DemoBadge } from "@/components/ui/demo-badge";
import { FighterCard } from "@/components/fighters/fighter-card";
import { EventPoster } from "@/components/events/event-poster";
import { TicketBadge } from "@/components/events/ticket-badge";
import { YouTubeLite } from "@/components/media/youtube-player";
import { HeroVideoCarousel } from "@/components/media/hero-video-carousel";
import { ReelVideo } from "@/components/media/reel-video";
import { useI18n } from "@/components/i18n/language-provider";
import { fighters } from "@/content/fighters";
import { nextEvent } from "@/content/events";
import { instagramAssets, instagramProfile, universalPromotionsTV, youtubeVideos } from "@/content/media";
import { opsKpis } from "@/content/ops";
import { pick } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { FightEvent } from "@/types";

/** Quiet section header — kicker + restrained title, smaller than the page hero. */
function SectionTitle({ kicker, title, intro, className }: { kicker: string; title: string; intro?: string; className?: string }) {
  return (
    <div className={className}>
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-2 max-w-2xl font-display text-[length:var(--step-2)] font-bold tracking-tight text-fg">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-xl text-[length:var(--step-0)] text-fg-2">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

function NextEventActionCard({ event }: { event: FightEvent }) {
  const { t, locale } = useI18n();
  const video = event.highlightVideo;
  const thumbnailSrc = event.actionImageSrc ?? video?.thumbnailSrc ?? (video ? `https://i.ytimg.com/vi/${video.youtubeId}/hq720.jpg` : undefined);
  const actionVideoSrc = event.actionVideoSrc;
  const hasBackgroundMedia = Boolean(actionVideoSrc ?? thumbnailSrc);

  return (
    <div className="event-action-card group/event relative isolate flex h-full flex-col justify-between overflow-hidden rounded-token-lg border border-line bg-surface p-6 shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-0.5 hover:border-gold/55 hover:shadow-[0_0_0_1px_rgba(239,184,75,0.18),0_24px_80px_rgba(239,184,75,0.14)] sm:p-7">
      {hasBackgroundMedia && (
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          {actionVideoSrc ? (
            <EventBackgroundVideo src={actionVideoSrc} />
          ) : (
            thumbnailSrc && (
              <Image
                src={thumbnailSrc}
                alt=""
                fill
                sizes="(min-width:1024px) 36vw, 100vw"
                loading="lazy"
                className="pointer-events-none scale-110 object-cover opacity-[0.58] saturate-125 transition duration-500 group-hover/event:scale-[1.14] group-hover/event:opacity-[0.76]"
              />
            )
          )}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,11,14,0.66),rgba(10,11,14,0.42)_44%,rgba(10,11,14,0.76))] transition duration-300 group-hover/event:bg-[linear-gradient(135deg,rgba(10,11,14,0.5),rgba(10,11,14,0.28)_44%,rgba(10,11,14,0.58))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(239,184,75,0.24),transparent_34%)] opacity-0 transition duration-300 group-hover/event:opacity-100" />
        </div>
      )}

      <div className="relative z-10">
        <div className="transition duration-300 group-hover/event:drop-shadow-[0_0_18px_rgba(239,184,75,0.42)]">
          <TicketBadge status={event.ticketStatus} size="md" />
        </div>
        <div className="mt-5 flex flex-col gap-3 text-[length:var(--step-0)] text-fg-2">
          <span className="inline-flex items-center gap-2.5">
            <Calendar className="size-4 text-gold" />
            {formatDate(event.date, locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </span>
          <span className="inline-flex items-center gap-2.5">
            <MapPin className="size-4 text-fg-3 group-hover/event:text-gold/80" />
            {event.venue}, {event.city}
          </span>
        </div>
      </div>
      <div className="relative z-10 mt-7 flex flex-wrap gap-3">
        <ExternalLink href={event.ticketUrl ?? `/events/${event.slug}`} className={buttonVariants({ variant: "primary", size: "md" })}>
          {t.actions.getTickets}
        </ExternalLink>
        <ButtonLink href={`/events/${event.slug}`} variant="ghost">
          {t.actions.viewEvent}
        </ButtonLink>
      </div>
    </div>
  );
}

function EventBackgroundVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Respect reduced-motion: leave the poster, never download the clip.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only load + play this heavy clip while the card is near the viewport (it sits below
    // the fold), and pause when it leaves — never compete with the hero/LCP on first paint.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.load();
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.78] saturate-110 transition duration-500 group-hover/event:opacity-95"
      muted
      loop
      playsInline
      preload="none"
      controls={false}
      disablePictureInPicture
      data-event-action-video
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

const HERO_CLIP = "/media/universal/hero-reel-knockouts-v3.mp4";

export function HomeView() {
  const { t, locale } = useI18n();

  // Start fetching the above-the-fold hero clip immediately at high priority, instead of
  // letting the browser defer the <video> behind everything else (it otherwise sat idle
  // ~0.9s before requesting). Does not change the clip — just makes it autoplay sooner.
  preload(HERO_CLIP, { as: "video", fetchPriority: "high" });

  const featured = ["olajuwon-acosta", "stephanie-pineiro", "orlando-gonzalez", "kiria-tapia"]
    .map((slug) => fighters.find((f) => f.slug === slug))
    .filter((f) => f !== undefined);

  const watchGrid = youtubeVideos.slice(1, 5);
  // The homepage grid autoplays — only surface assets that actually have a video,
  // so a still image never sits dead among the looping reels.
  const feed = instagramAssets.filter((a) => "videoSrc" in a).slice(0, 8);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image src="/media/universal/sections/up-section-hero.png" alt="" fill priority sizes="(max-width:1672px) 100vw, 1672px" quality={60} className="object-cover opacity-75" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,11,14,0.86)_0%,rgba(10,11,14,0.68)_36%,rgba(10,11,14,0.22)_72%,rgba(10,11,14,0.42)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(46rem_30rem_at_82%_-10%,rgba(229,184,80,0.12),transparent_62%)]" />
        </div>

        <Container className="grid grid-cols-1 items-center gap-10 py-14 sm:py-16 lg:grid-cols-[0.82fr_minmax(0,1.18fr)] lg:gap-12 lg:py-24">
          <div>
            <Reveal>
              <span className="kicker inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gold" />
                {t.home.heroKicker}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-[clamp(2.5rem,11vw,6.5rem)] uppercase leading-[0.9] tracking-[-0.01em]">
                {t.home.heroLineA} <span className="text-gold-foil">{t.home.heroLineB}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-[length:var(--step-1)] text-fg-2">{t.home.heroSub}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/events" size="lg">
                  {t.home.heroPrimary}
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <a href="#watch" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  {t.common.watch}
                </a>
                <ButtonLink href="/partners" size="lg" variant="ghost">
                  {t.home.heroPartner}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="min-w-0">
            <HeroVideoCarousel
              videos={youtubeVideos}
              ambientClip={HERO_CLIP}
              ambientPoster="/media/universal/hero-reel-knockouts-v3-poster.jpg"
              channelName={universalPromotionsTV.name}
              channelUrl={universalPromotionsTV.url}
              channelAvatar={universalPromotionsTV.avatarUrl}
              watchChannelLabel={t.home.watchChannel}
              ctaLabel={t.common.watch}
              highlightsLabel={t.home.heroHighlights}
              prevLabel={t.home.prevFight}
              nextLabel={t.home.nextFight}
            />
          </Reveal>
        </Container>
      </section>

      {/* ── Next event: poster/details ──── */}
      {nextEvent && (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionTitle kicker={t.home.nextEventKicker} title={pick(nextEvent.name, locale)} intro={t.home.nextEventBody} />
              <ButtonLink href="/events" variant="outline" className="shrink-0">
                {t.actions.upcomingEvents}
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-stretch">
              <Reveal>
                <EventPoster event={nextEvent} />
              </Reveal>
              <Reveal delay={0.06}>
                <NextEventActionCard event={nextEvent} />
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* ── Watch (Universal Promotions TV) ──────────────────────────── */}
      <section id="watch" className="relative isolate overflow-hidden scroll-mt-20 border-y border-line py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image src="/media/universal/sections/up-section-media.png" alt="" fill sizes="(max-width:1672px) 100vw, 1672px" quality={55} loading="lazy" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,14,0.82)_0%,rgba(10,11,14,0.58)_40%,rgba(10,11,14,0.82)_100%)]" />
        </div>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle kicker={t.home.watchKicker} title={t.home.watchTitle} intro={t.home.watchBody} />
            <ExternalLink href={universalPromotionsTV.url} className={cnButton()}>
              <Youtube className="size-4" />
              {t.home.watchChannel}
            </ExternalLink>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {watchGrid.map((video) => (
              <Reveal key={video.id} delay={0.05}>
                <div>
                  <YouTubeLite videoId={video.id} title={video.title} poster={video.thumbnailSrc} kind={video.kind} duration={video.duration} />
                  <h3 className="mt-3 font-display text-[length:var(--step-0)] font-bold leading-snug text-fg">{video.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Instagram ────────────────────────────────────────────────── */}
      <section className="bg-bg-2 py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={instagramProfile.imageSrc}
                alt="Universal Promotions Instagram"
                width={52}
                height={52}
                className="size-12 rounded-full border border-gold/35 object-cover"
              />
              <SectionTitle kicker={`${t.home.igTitle} · ${instagramProfile.followers} ${t.home.followers}`} title={t.home.igTitle} intro={t.home.igBody} />
            </div>
            <ExternalLink href={instagramProfile.url} className={cnButton()}>
              <Instagram className="size-4" />
              {t.home.openInstagram}
            </ExternalLink>
          </div>
          <Reveal delay={0.06}>
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {feed.map((asset) => {
                const videoSrc = "videoSrc" in asset ? asset.videoSrc : undefined;
                const sizes = "(min-width:1024px) 22vw, (min-width:640px) 24vw, 50vw";
                return (
                  <ExternalLink
                    key={asset.shortcode}
                    href={asset.sourceUrl}
                    aria-label={`${t.home.openInstagram} — ${asset.caption}`}
                    className="group relative aspect-square overflow-hidden rounded-token border border-line bg-bg"
                  >
                    {videoSrc ? (
                      <ReelVideo
                        src={videoSrc}
                        poster={asset.imageSrc}
                        sizes={sizes}
                        className="transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <Image
                        src={asset.imageSrc}
                        alt=""
                        fill
                        sizes={sizes}
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    )}
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="absolute left-2.5 top-2.5 rounded-full border border-gold/30 bg-bg/70 px-2 py-0.5 text-[length:var(--step--2)] font-semibold text-gold backdrop-blur-sm">
                      {asset.label}
                    </span>
                  </ExternalLink>
                );
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Roster preview ───────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image src="/media/universal/sections/up-section-training.png" alt="" fill sizes="(max-width:1672px) 100vw, 1672px" quality={55} loading="lazy" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,14,0.82)_0%,rgba(10,11,14,0.55)_36%,rgba(10,11,14,0.82)_100%)]" />
        </div>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle kicker={t.home.rosterKicker} title={t.home.rosterTitle} intro={t.home.rosterSub} />
            <ButtonLink href="/fighters" variant="outline" className="shrink-0">
              {t.actions.fullRoster}
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {featured.map((fighter, i) => (
              <Reveal key={fighter.slug} delay={(i % 4) * 0.05}>
                <FighterCard fighter={fighter} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Fight Ops teaser ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-token-lg border border-line bg-surface">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
            <div className="relative grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <SectionTitle kicker={t.home.opsKicker} title={t.home.opsTitle} intro={t.home.opsBody} />
                <ButtonLink href="/fight-ops" className="mt-7">
                  {t.actions.explore}
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
              <Reveal delay={0.08}>
                <div className="rounded-token border border-line-2 bg-bg-2/80 p-5 shadow-[var(--shadow-elev)] backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="kicker">{t.ops.kpiKicker}</span>
                    <DemoBadge />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {opsKpis.slice(0, 4).map((k) => (
                      <Stat key={k.id} value={k.value} label={pick(k.label, locale)} delta={k.delta} trend={k.trend} mono />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/** Outline button class for external links in section headers. */
function cnButton() {
  return buttonVariants({ variant: "outline", size: "md" });
}
