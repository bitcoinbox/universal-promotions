"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clapperboard, ArrowUpRight } from "lucide-react";
import { ReelVideo } from "@/components/media/reel-video";
import { ExternalLink } from "@/components/ui/external-link";
import { cn } from "@/lib/utils";

type HeroVideo = { id: string; title: string; duration: string; kind: string; thumbnailSrc: string };

const NOCOOKIE = "https://www.youtube-nocookie.com/embed";
const playSrc = (id: string) => `${NOCOOKIE}/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
const IFRAME_ALLOW = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";

/**
 * Hero fight carousel. Slide 0 is the autoplaying highlights loop (real ring action,
 * self-hosted — reliable, never a dark consent frame); slides 1..N are the individual
 * full fights as posters. Arrows and the strip browse the slides; tapping the play button
 * or a thumbnail loads that fight in-place with sound. Reduced-motion users get a poster
 * on the highlights slide (handled inside ReelVideo).
 */
export function HeroVideoCarousel({
  videos,
  ambientClip,
  ambientPoster,
  channelName,
  channelUrl,
  channelAvatar,
  watchChannelLabel,
  ctaLabel,
  highlightsLabel,
  prevLabel,
  nextLabel,
}: {
  videos: readonly HeroVideo[];
  ambientClip: string;
  ambientPoster: string;
  channelName: string;
  channelUrl: string;
  channelAvatar: string;
  watchChannelLabel: string;
  ctaLabel: string;
  highlightsLabel: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const count = videos.length;
  // slide 0 = highlights loop; slides 1..count = videos[slide-1]
  const [index, setIndex] = useState(0);
  const [playId, setPlayId] = useState<string | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const slideFight = index === 0 ? null : videos[index - 1];
  const active = playId ? videos.find((v) => v.id === playId) : slideFight;

  const go = (delta: number) => {
    setPlayId(null);
    setIndex((i) => (((i + delta) % (count + 1)) + (count + 1)) % (count + 1));
  };
  const watch = (id: string, slide: number) => {
    setIndex(slide);
    setPlayId(id);
  };
  const toHighlights = () => {
    setPlayId(null);
    setIndex(0);
  };

  // keep the active strip item in view
  useEffect(() => {
    stripRef.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [index]);

  return (
    <div className="w-full min-w-0">
      <div className="group relative aspect-video overflow-hidden rounded-token-lg border border-line bg-bg shadow-[var(--shadow-elev)]">
        {playId ? (
          <iframe
            key={playId}
            className="absolute inset-0 h-full w-full"
            src={playSrc(playId)}
            title={active?.title ?? channelName}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow={IFRAME_ALLOW}
            allowFullScreen
          />
        ) : index === 0 ? (
          <button
            type="button"
            onClick={() => watch(videos[0].id, 1)}
            aria-label={`${ctaLabel}: ${videos[0].title}`}
            className="absolute inset-0 h-full w-full text-left"
          >
            <ReelVideo src={ambientClip} poster={ambientPoster} sizes="(min-width:1024px) 58vw, 100vw" eager />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-bg/25" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-bg/70 px-3 py-1 text-[length:var(--step--2)] font-semibold text-gold backdrop-blur-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-gold" />
              {channelName}
            </span>          </button>
        ) : (
          <button
            type="button"
            onClick={() => slideFight && watch(slideFight.id, index)}
            aria-label={`${ctaLabel}: ${slideFight?.title ?? ""}`}
            className="absolute inset-0 h-full w-full text-left"
          >
            <Image src={slideFight!.thumbnailSrc} alt="" fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-bg/70 px-3 py-1 text-[length:var(--step--2)] font-semibold text-gold backdrop-blur-sm">
              {slideFight!.kind}
            </span>            <span className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
              <span className="block truncate text-[length:var(--step--1)] font-semibold text-fg">{slideFight!.title}</span>
              <span className="shrink-0 rounded bg-bg/80 px-2 py-1 text-[length:var(--step--2)] font-semibold text-fg backdrop-blur-sm">
                {slideFight!.duration}
              </span>
            </span>
          </button>
        )}

        {/* prev / next */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={prevLabel}
          className="absolute left-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-bg/75 text-fg backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={nextLabel}
          className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-bg/75 text-fg backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* meta row */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <Image src={channelAvatar} alt={channelName} width={36} height={36} className="size-9 shrink-0 rounded-full border border-gold/35 object-cover" />
          <span className="min-w-0">
            <span className="block truncate text-[length:var(--step--1)] font-semibold text-fg">{active ? active.title : channelName}</span>
            <span className="block truncate text-[length:var(--step--2)] text-fg-3">
              {active ? `${channelName} · ${active.duration}` : `${count} full fights · tap to watch`}
            </span>
          </span>
        </span>
        <ExternalLink href={channelUrl} className="inline-flex shrink-0 items-center gap-1 text-[length:var(--step--1)] text-gold hover:underline">
          {watchChannelLabel}
          <ArrowUpRight className="size-3.5" />
        </ExternalLink>
      </div>

      {/* slide picker: highlights chip + fights */}
      <div ref={stripRef} className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          data-i={0}
          onClick={toHighlights}
          aria-current={index === 0 && !playId ? "true" : undefined}
          className={cn(
            "flex aspect-video w-[5.5rem] shrink-0 flex-col items-center justify-center gap-1 rounded-token border text-[length:var(--step--2)] font-semibold transition-colors",
            index === 0 && !playId ? "border-gold bg-gold/10 text-gold" : "border-line text-fg-3 hover:text-fg",
          )}
        >
          <Clapperboard className="size-4" />
          {highlightsLabel}
        </button>
        {videos.map((v, i) => {
          const isActive = playId === v.id || (!playId && index === i + 1);
          return (
            <button
              key={v.id}
              type="button"
              data-i={i + 1}
              onClick={() => watch(v.id, i + 1)}
              aria-label={`${ctaLabel}: ${v.title}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative aspect-video w-[5.5rem] shrink-0 overflow-hidden rounded-token border transition-opacity",
                isActive ? "border-gold" : "border-line opacity-60 hover:opacity-100",
              )}
            >
              <Image src={v.thumbnailSrc} alt="" fill sizes="88px" className="object-cover" />
              {isActive && <span aria-hidden className="absolute inset-0 ring-2 ring-inset ring-gold" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
