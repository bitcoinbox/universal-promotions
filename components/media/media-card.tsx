"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, Camera, Play, Clock, Image as ImageIcon, ArrowUpRight, CalendarDays, Mic2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "@/components/ui/external-link";
import { RightsBadge } from "@/components/media/rights-badge";
import { useI18n } from "@/components/i18n/language-provider";
import { getEvent } from "@/content/events";
import { pick } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { MediaCategory, MediaFormat, MediaItem } from "@/types";

const formatMeta: Record<MediaFormat, { Icon: typeof FileText; ctaKey: "readRelease" | "viewGallery" | "watch" | "listen" }> = {
  article: { Icon: FileText, ctaKey: "readRelease" },
  gallery: { Icon: Camera, ctaKey: "viewGallery" },
  video: { Icon: Play, ctaKey: "watch" },
  podcast: { Icon: Mic2, ctaKey: "listen" },
};

const categoryPreview: Record<MediaCategory, string> = {
  announcement: "/media/universal/events/queen-of-the-ring-july-11-clean.png",
  "press-conference": "/media/universal/youtube/choke-de-campeones-presser.jpg",
  "open-workout": "/media/universal/backgrounds/up-training-gym.png",
  "weigh-in": "/media/universal/instagram/instagram-reel-7.jpg",
  faceoff: "/media/universal/instagram/instagram-reel-2.jpg",
  "fight-night": "/media/universal/hero-reel-horizontal-v2-poster.jpg",
  result: "/media/universal/youtube/bryan-perez-vs-michael-castro.jpg",
  recap: "/media/universal/branded/up-branded-event.png",
  highlight: "/media/universal/hero-reel-knockouts-v3-poster.jpg",
  interview: "/media/universal/youtube/stephanie-pineiro-upinion.jpg",
  podcast: "/media/universal/youtube/top-5-libra-ashleyann-lozada.jpg",
  "sponsor-recap": "/media/universal/branded/up-branded-ops.png",
};

export function MediaCard({ item }: { item: MediaItem }) {
  const { t, locale } = useI18n();
  const { Icon, ctaKey } = formatMeta[item.format];
  const isVideo = item.format === "video";
  const isPlayable = item.format === "video" || item.format === "podcast";
  const relatedEvent = item.relatedEventSlug ? getEvent(item.relatedEventSlug) : undefined;
  const previewUrl = item.thumbnailUrl ?? categoryPreview[item.category];

  return (
    <article className="group flex flex-col overflow-hidden rounded-token-lg border border-line bg-surface shadow-[var(--shadow-sm)] transition-colors hover:border-line-2">
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          backgroundColor: `hsl(${item.hue} 36% 11%)`,
          backgroundImage: `radial-gradient(110% 90% at 70% -10%, hsl(${item.hue} 58% 30% / 0.5), transparent 60%), linear-gradient(180deg, hsl(${item.hue} 28% 13%), hsl(${item.hue} 34% 7%))`,
        }}
      >
        {previewUrl && (
          <Image
            src={previewUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/10" />
        <div className="absolute inset-0 grid place-items-center">
          {isPlayable ? (
            <span className="grid size-14 place-items-center rounded-full bg-gold text-[var(--brand-ink)] shadow-[var(--shadow-gold)] transition-transform duration-200 group-hover:scale-105">
              {isVideo ? <Play className="size-6 translate-x-0.5" fill="currentColor" /> : <Mic2 className="size-6" />}
            </span>
          ) : (
            !previewUrl && <Icon className="size-12 text-white/20" />
          )}
        </div>

        <div className="absolute left-3 top-3">
          <Badge tone="solidGold" size="sm" className="uppercase">
            {t.media.categories[item.category]}
          </Badge>
        </div>

        {(item.runtime || item.itemCount) && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-bg/70 px-2 py-1 text-[length:var(--step--2)] text-white backdrop-blur-sm">
              {item.runtime ? <Clock className="size-3" /> : <ImageIcon className="size-3" />}
              {item.runtime ?? `${item.itemCount}`}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="kicker inline-flex items-center gap-1.5">
            <CalendarDays className="size-3" />
            {formatDate(item.date, locale, { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <RightsBadge status={item.rightsStatus} />
        </div>

        <h3 className="mt-2 font-display text-[length:var(--step-1)] font-bold leading-tight tracking-tight text-fg">
          {pick(item.title, locale)}
        </h3>
        <p className="mt-2 text-[length:var(--step--1)] text-fg-2">{pick(item.excerpt, locale)}</p>

        <div className="mt-4 flex flex-1 items-end justify-between gap-3">
          <ExternalLink
            href={item.sourceUrl ?? "#"}
            className="inline-flex items-center gap-1.5 text-[length:var(--step--1)] font-semibold text-gold hover:underline"
          >
            {t.media[ctaKey]}
            <ArrowUpRight className="size-3.5" />
          </ExternalLink>
          {relatedEvent && (
            <Link
              href={`/events/${relatedEvent.slug}`}
              className="truncate text-[length:var(--step--2)] text-fg-3 hover:text-gold"
              title={pick(relatedEvent.name, locale)}
            >
              {t.media.relatedTo}: {pick(relatedEvent.name, locale)}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
