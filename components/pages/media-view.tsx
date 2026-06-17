"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Archive,
  BadgeCheck,
  ClapperboardIcon,
  Database,
  Facebook,
  FileVideo,
  Instagram,
  Layers3,
  Megaphone,
  Mic2,
  Music2,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  Tag,
  UploadCloud,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { MediaCard } from "@/components/media/media-card";
import { ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { YouTubeEmbed, YouTubeThumbnailCard } from "@/components/media/youtube-embed";
import { useI18n } from "@/components/i18n/language-provider";
import { getAllMedia, mediaPhase } from "@/lib/data";
import { fighters } from "@/content/fighters";
import { instagramAssets, instagramProfile, podcastConcepts, universalPromotionsTV, youtubeVideos } from "@/content/media";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { MediaPhase } from "@/types";

type PhaseFilter = "all" | MediaPhase;
type VaultStatus = "ready" | "review" | "queue";
type VaultRecord = {
  source: string;
  type: string;
  title: string;
  linkedTo: string;
  output: string;
  rights: string;
  status: VaultStatus;
  tags: string[];
};

const vaultSteps: {
  icon: LucideIcon;
  title: { en: string; es: string };
  body: { en: string; es: string };
}[] = [
  {
    icon: UploadCloud,
    title: { en: "Ingest", es: "Ingesta" },
    body: {
      en: "YouTube fights, Instagram reels, Facebook posts, posters, photos, and podcast clips enter one clean queue.",
      es: "Peleas de YouTube, reels de Instagram, posts de Facebook, afiches, fotos y clips del podcast entran a una cola limpia.",
    },
  },
  {
    icon: Tag,
    title: { en: "Tag", es: "Etiquetar" },
    body: {
      en: "Every asset is tied to fighters, events, sponsors, source links, rights status, and publish-ready formats.",
      es: "Cada activo se conecta a boxeadores, eventos, auspiciadores, fuentes, derechos y formatos listos para publicar.",
    },
  },
  {
    icon: Sparkles,
    title: { en: "Package", es: "Empaquetar" },
    body: {
      en: "The vault turns raw coverage into fighter profiles, sponsor recaps, highlight clips, and press materials.",
      es: "El vault convierte cobertura cruda en perfiles, reportes para auspiciadores, highlights y materiales de prensa.",
    },
  },
];

const vaultRecords: VaultRecord[] = [
  {
    source: "YouTube",
    type: "Full fight",
    title: "Johniel Ramos vs Alex Pallette",
    linkedTo: "Johniel Ramos · Universal Promotions TV",
    output: "Fighter page + clip queue",
    rights: "Embed only",
    status: "ready",
    tags: ["full fight", "archive", "super featherweight"],
  },
  {
    source: "Instagram",
    type: "Reel",
    title: "Ringside action from the main event",
    linkedTo: "Fight-night reels · social highlights",
    output: "Shorts/Reels/TikTok set",
    rights: "Public source",
    status: "ready",
    tags: ["action", "social", "ringside"],
  },
  {
    source: "Event",
    type: "Poster",
    title: "Queen of the Ring · July 11",
    linkedTo: "Kiria Tapia · Coliseíto Pedrín Zorrilla",
    output: "Event promo kit",
    rights: "Owned asset",
    status: "review",
    tags: ["tickets", "poster", "San Juan"],
  },
  {
    source: "Podcast",
    type: "Long form",
    title: "UPinion Dividida analysis",
    linkedTo: "Universal Promotions TV · podcast growth",
    output: "Transcript + sponsor reads",
    rights: "Embed only",
    status: "queue",
    tags: ["podcast", "chapters", "sponsors"],
  },
];

const statusCopy: Record<VaultStatus, { label: string; className: string }> = {
  ready: { label: "Ready", className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
  review: { label: "Review", className: "border-gold/35 bg-gold/10 text-gold" },
  queue: { label: "Queue", className: "border-blue-300/30 bg-blue-300/10 text-blue-200" },
};

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-[length:var(--step--1)] font-medium transition-colors",
        active ? "border-gold bg-gold/15 text-gold" : "border-line-2 bg-surface text-fg-2 hover:border-gold/40 hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function MediaVaultSection({
  indexedAssetCount,
  rosterCount,
  mediaCount,
}: {
  indexedAssetCount: number;
  rosterCount: number;
  mediaCount: number;
}) {
  const { locale } = useI18n();
  const vaultStats = [
    { value: `${indexedAssetCount}`, label: { en: "indexed assets", es: "activos indexados" } },
    { value: `${rosterCount}`, label: { en: "fighter profiles linked", es: "perfiles enlazados" } },
    { value: `${mediaCount}`, label: { en: "catalog records", es: "registros del catálogo" } },
  ];

  return (
    <section className="border-b border-line bg-bg py-14 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div>
              <span className="kicker inline-flex items-center gap-2">
                <Database className="size-4 text-gold" />
                Fight Media Vault
              </span>
              <h2 className="mt-3 max-w-2xl font-display text-[length:var(--step-2)] font-bold tracking-tight">
                A searchable media system for every fighter, event, sponsor, and clip.
              </h2>
              <p className="mt-4 max-w-xl text-[length:var(--step-0)] text-fg-2">
                Universal already has the raw material. The vault turns that archive into a working asset library: clean source links,
                rights notes, roster connections, sponsor moments, and ready-to-publish packages.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {vaultStats.map((stat) => (
                  <div key={pick(stat.label, locale)} className="rounded-token border border-line bg-surface p-4">
                    <span className="block font-display text-[length:var(--step-1)] font-bold text-fg">{stat.value}</span>
                    <span className="mt-1 block text-[length:var(--step--2)] font-semibold uppercase tracking-[0.16em] text-fg-3">
                      {pick(stat.label, locale)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                {vaultSteps.map((step, i) => (
                  <Reveal key={pick(step.title, locale)} delay={i * 0.05}>
                    <article className="flex gap-4 rounded-token border border-line bg-surface p-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-token border border-gold/30 bg-gold/10 text-gold">
                        <step.icon className="size-5" />
                      </span>
                      <span>
                        <span className="block font-display text-[length:var(--step-0)] font-bold text-fg">
                          {pick(step.title, locale)}
                        </span>
                        <span className="mt-1 block text-[length:var(--step--1)] text-fg-2">{pick(step.body, locale)}</span>
                      </span>
                    </article>
                  </Reveal>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="md">
                  Build this system
                </ButtonLink>
                <ButtonLink href="/fight-ops" size="md" variant="ghost">
                  See fight ops
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-token-lg border border-line bg-surface shadow-[var(--shadow-md)]">
              <div className="border-b border-line bg-bg-2 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-token border border-gold/30 bg-gold/10 text-gold">
                      <Archive className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[length:var(--step-1)] font-bold">Universal asset index</h3>
                      <p className="text-[length:var(--step--2)] text-fg-3">YouTube · Instagram · Facebook · events · podcast</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[length:var(--step--2)] font-semibold text-emerald-300">
                    <BadgeCheck className="size-3.5" />
                    Source tracked
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-token border border-line bg-bg px-3 py-2 text-[length:var(--step--1)] text-fg-3">
                  <Search className="size-4 text-gold" />
                  <span>Search fighter, sponsor, event, clip, or rights status</span>
                </div>
              </div>

              <div className="divide-y divide-line">
                {vaultRecords.map((record) => {
                  const status = statusCopy[record.status];
                  return (
                    <article key={`${record.source}-${record.title}`} className="p-4 transition-colors hover:bg-bg-2/70 sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-2.5 py-1 text-[length:var(--step--2)] font-semibold text-fg-2">
                              <FileVideo className="size-3.5 text-gold" />
                              {record.source}
                            </span>
                            <span className="rounded-full border border-line bg-bg px-2.5 py-1 text-[length:var(--step--2)] font-semibold text-fg-3">
                              {record.type}
                            </span>
                            <span className={cn("rounded-full border px-2.5 py-1 text-[length:var(--step--2)] font-semibold", status.className)}>
                              {status.label}
                            </span>
                          </div>
                          <h4 className="mt-3 font-display text-[length:var(--step-0)] font-bold text-fg">{record.title}</h4>
                          <p className="mt-1 text-[length:var(--step--1)] text-fg-2">{record.linkedTo}</p>
                        </div>
                        <div className="rounded-token border border-line bg-bg px-3 py-2 text-right">
                          <span className="block text-[length:var(--step--2)] font-semibold uppercase tracking-[0.14em] text-fg-3">
                            Output
                          </span>
                          <span className="block text-[length:var(--step--1)] font-semibold text-gold">{record.output}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {record.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-bg-2 px-2.5 py-1 text-[length:var(--step--2)] font-medium text-fg-2">
                            {tag}
                          </span>
                        ))}
                        <span className="ml-auto inline-flex items-center gap-1.5 text-[length:var(--step--2)] font-semibold text-fg-3">
                          <ShieldCheck className="size-3.5 text-gold" />
                          {record.rights}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="grid gap-3 border-t border-line bg-bg-2 p-4 sm:grid-cols-3 sm:p-5">
                {[
                  { icon: Youtube, label: "Full fights", value: youtubeVideos.length },
                  { icon: Instagram, label: "Social posts", value: instagramAssets.length },
                  { icon: Layers3, label: "Reusable packs", value: "Press · sponsor · clips" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-token border border-line bg-surface p-3">
                    <span className="grid size-9 place-items-center rounded-token bg-gold/10 text-gold">
                      <item.icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[length:var(--step--2)] font-semibold uppercase tracking-[0.14em] text-fg-3">
                        {item.label}
                      </span>
                      <span className="block font-display text-[length:var(--step-0)] font-bold text-fg">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function MediaView() {
  const { t, locale } = useI18n();
  const [phase, setPhase] = useState<PhaseFilter>("all");
  const all = useMemo(() => getAllMedia(), []);
  const filtered = useMemo(
    () => (phase === "all" ? all : all.filter((m) => mediaPhase(m.category) === phase)),
    [all, phase],
  );
  const featuredInstagram = instagramAssets;

  const phases = [
    { icon: Megaphone, key: "build-up" as const, label: t.media.phaseBuildUp, desc: t.media.phaseBuildUpDesc },
    { icon: Swords, key: "fight-night" as const, label: t.media.phaseFightNight, desc: t.media.phaseFightNightDesc },
    { icon: ClapperboardIcon, key: "aftermath" as const, label: t.media.phaseAftermath, desc: t.media.phaseAftermathDesc },
  ];

  const socialChannels = [
    { name: "YouTube", handle: "@universalpromotionsTV", href: universalPromotionsTV.url, icon: Youtube, color: "#FF0033" },
    { name: "Facebook", handle: "Universal Promotions", href: universalPromotionsTV.links.facebook, icon: Facebook, color: "#1877F2" },
    { name: "Instagram", handle: "@universal_promotion_boxing", href: universalPromotionsTV.links.instagram, icon: Instagram, color: "#E4405F" },
    { name: "TikTok", handle: "@universalpromotionstv", href: universalPromotionsTV.links.tiktok, icon: Music2, color: "#25F4EE" },
  ];

  const filters: { value: PhaseFilter; label: string }[] = [
    { value: "all", label: t.common.all },
    { value: "build-up", label: t.media.phaseBuildUp },
    { value: "fight-night", label: t.media.phaseFightNight },
    { value: "aftermath", label: t.media.phaseAftermath },
  ];

  return (
    <>
      <PageHero
        kicker={t.media.kicker}
        title={t.media.title}
        intro={t.media.intro}
        backgroundSrc="/media/universal/sections/up-page-media.png"
      />

      <MediaVaultSection
        indexedAssetCount={youtubeVideos.length + instagramAssets.length + all.length}
        rosterCount={fighters.length}
        mediaCount={all.length}
      />

      {/* Universal Promotions TV */}
      <section className="border-b border-line bg-bg-2 py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src={universalPromotionsTV.avatarUrl}
                  alt="Universal Promotions TV"
                  width={72}
                  height={72}
                  className="size-16 rounded-token border border-gold/35 object-cover shadow-[var(--shadow-sm)]"
                />
                <div>
                  <span className="kicker inline-flex items-center gap-2">
                    <Youtube className="size-4 text-gold" />
                    Universal Promotions TV
                  </span>
                  <p className="mt-1 text-[length:var(--step--1)] text-fg-3">
                    24.6K subscribers · 763 videos · 4.6M+ views
                  </p>
                </div>
              </div>
              <h2 className="mt-3 max-w-2xl font-display text-[length:var(--step-2)] font-bold tracking-tight">
                {t.home.watchTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-[length:var(--step-0)] text-fg-2">
                {pick(universalPromotionsTV.mission, locale)}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ExternalLink
                  href={universalPromotionsTV.url}
                  className="inline-flex items-center justify-center gap-2 rounded-token bg-gold px-5 py-3 text-[length:var(--step--1)] font-bold !text-black shadow-[var(--shadow-gold)] hover:-translate-y-0.5"
                >
                  <Play className="size-4" />
                  Watch Universal Promotions TV
                </ExternalLink>
                <ExternalLink
                  href={universalPromotionsTV.links.instagram}
                  className="inline-flex items-center justify-center gap-2 rounded-token border border-line-2 bg-surface px-5 py-3 text-[length:var(--step--1)] font-semibold text-fg hover:border-gold/50"
                >
                  <Instagram className="size-4" />
                  Instagram
                </ExternalLink>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {socialChannels.map((channel) => (
                  <ExternalLink
                    key={channel.name}
                    href={channel.href}
                    className="group rounded-token border border-line bg-surface p-4 transition-colors hover:-translate-y-0.5 hover:border-gold/50"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="grid size-10 shrink-0 place-items-center rounded-token border border-line bg-bg-2"
                        style={{ color: channel.color }}
                      >
                        <channel.icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-[length:var(--step-0)] font-bold text-fg">
                          {channel.name}
                        </span>
                        <span className="block truncate text-[length:var(--step--2)] text-fg-3 group-hover:text-gold">
                          {channel.handle}
                        </span>
                      </span>
                    </span>
                  </ExternalLink>
                ))}
              </div>
            </div>

            <Reveal delay={0.08}>
              <YouTubeEmbed videoId={youtubeVideos[0].id} title={youtubeVideos[0].title} />
            </Reveal>
          </div>

          <div className="mt-10">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="kicker inline-flex items-center gap-2">
                  <Instagram className="size-4 text-gold" />
                  Instagram fight feed
                </span>
                <h3 className="mt-1 font-display text-[length:var(--step-2)] font-bold tracking-tight">
                  Reels, posters, and fight-night moments pulled from the official profile
                </h3>
              </div>
              <ExternalLink href={instagramProfile.url} className="text-[length:var(--step--1)] font-semibold text-gold hover:underline">
                Open @{instagramProfile.username}
              </ExternalLink>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
              <ExternalLink
                href={instagramProfile.url}
                className="group col-span-2 flex flex-col justify-between rounded-token border border-line bg-surface p-5 shadow-[var(--shadow-sm)] transition-colors hover:border-gold/50 sm:col-span-1"
              >
                <span>
                  <Image
                    src={instagramProfile.imageSrc}
                    alt="Universal Promotions Instagram profile"
                    width={96}
                    height={96}
                    className="size-20 rounded-token border border-gold/35 object-cover"
                  />
                  <span className="mt-5 block font-display text-[length:var(--step-1)] font-bold text-fg">
                    {instagramProfile.name}
                  </span>
                  <span className="mt-1 block text-[length:var(--step--1)] text-fg-3">{instagramProfile.handle}</span>
                  <span className="mt-4 block text-[length:var(--step--1)] text-fg-2">{instagramProfile.bio}</span>
                </span>
                <span className="mt-5 grid grid-cols-2 gap-3">
                  <span className="rounded-token border border-line bg-bg-2 p-3">
                    <span className="block font-display text-[length:var(--step-1)] font-bold text-fg">{instagramProfile.followers}</span>
                    <span className="kicker mt-1 block">Followers</span>
                  </span>
                  <span className="rounded-token border border-line bg-bg-2 p-3">
                    <span className="block font-display text-[length:var(--step-1)] font-bold text-fg">{instagramAssets.length}</span>
                    <span className="kicker mt-1 block">Assets</span>
                  </span>
                </span>
              </ExternalLink>

              {featuredInstagram.map((asset) => (
                <ExternalLink
                  key={asset.shortcode}
                  href={asset.sourceUrl}
                  className="group overflow-hidden rounded-token border border-line bg-surface shadow-[var(--shadow-sm)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-bg">
                    <Image
                      src={asset.imageSrc}
                      alt={asset.caption}
                      fill
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 44vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-bg/75 px-2.5 py-1 text-[length:var(--step--2)] font-semibold text-gold backdrop-blur-sm">
                      {asset.isVideo && <Play className="size-3" fill="currentColor" />}
                      {asset.label}
                    </span>
                    <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-bg/70 px-2.5 py-1 text-[length:var(--step--2)] font-semibold text-white backdrop-blur-sm">
                      {asset.metric}
                    </span>
                    <span className="absolute bottom-3 left-3 right-3 text-[length:var(--step--2)] font-semibold leading-snug text-white">
                      {asset.caption}
                    </span>
                  </div>
                </ExternalLink>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="kicker">Latest video assets</span>
                <h3 className="mt-1 font-display text-[length:var(--step-2)] font-bold tracking-tight">
                  Full fights, press, news, and UPinion Dividida
                </h3>
              </div>
              <ExternalLink href={`${universalPromotionsTV.url}/videos`} className="text-[length:var(--step--1)] font-semibold text-gold hover:underline">
                View the full channel
              </ExternalLink>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {youtubeVideos.slice(0, 8).map((video) => (
                <YouTubeThumbnailCard key={video.id} video={video} compact />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* podcast growth */}
      <section className="border-b border-line py-14 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="kicker inline-flex items-center gap-2">
                <Mic2 className="size-4 text-gold" />
                Podcast growth
              </span>
              <h2 className="mt-3 max-w-3xl font-display text-[length:var(--step-2)] font-bold tracking-tight">
                Turn every episode into search, clips, sponsor inventory, and fighter discovery.
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-token border border-line bg-surface px-4 py-3 text-[length:var(--step--1)] text-fg-2">
              <Search className="size-4 text-gold" />
              Transcript-ready archive
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {podcastConcepts.map((concept, i) => (
              <Reveal key={pick(concept.title, locale)} delay={i * 0.05}>
                <article className="h-full rounded-token border border-line bg-surface p-5 shadow-[var(--shadow-sm)]">
                  <span className="grid size-10 place-items-center rounded-token border border-gold/30 bg-gold/10 text-gold">
                    <Mic2 className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[length:var(--step-1)] font-bold">{pick(concept.title, locale)}</h3>
                  <p className="mt-2 text-[length:var(--step--1)] text-fg-2">{pick(concept.description, locale)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* content engine explainer */}
      <section className="border-b border-line bg-bg-2 py-12">
        <Container>
          <span className="kicker">{t.media.engineKicker}</span>
          <h2 className="mt-2 max-w-3xl font-display text-[length:var(--step-2)] font-bold tracking-tight">
            {t.media.engineTitle}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {phases.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => setPhase(p.key)}
                  className="flex h-full w-full flex-col items-start gap-3 rounded-token border border-line bg-surface p-5 text-left transition-colors hover:border-gold/40"
                >
                  <span className="grid size-10 place-items-center rounded-token border border-gold/30 bg-gold/10 text-gold">
                    <p.icon className="size-5" />
                  </span>
                  <span className="font-display text-[length:var(--step-1)] font-bold">{p.label}</span>
                  <span className="text-[length:var(--step--1)] text-fg-2">{p.desc}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* filterable feed */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <span className="kicker mr-1">{t.media.filterPhase}</span>
            {filters.map((f) => (
              <Chip key={f.value} active={phase === f.value} onClick={() => setPhase(f.value)}>
                {f.label}
              </Chip>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-fg-2">{t.media.empty}</p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <MediaCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* media kit */}
      <section className="pb-24">
        <Container>
          <div className="grid items-center gap-8 rounded-token-lg border border-line bg-surface p-8 sm:p-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="kicker">{t.media.kitKicker}</span>
              <h2 className="mt-2 font-display text-[length:var(--step-2)] font-bold tracking-tight">{t.media.kitTitle}</h2>
              <p className="mt-3 max-w-xl text-[length:var(--step-0)] text-fg-2">{t.media.kitBody}</p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <ButtonLink href="/contact" size="lg">
                {t.contact.credentialsTitle}
              </ButtonLink>
              <ButtonLink href="/contact" size="md" variant="ghost">
                {t.actions.downloadKit}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
