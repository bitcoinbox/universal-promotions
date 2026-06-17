"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const NOCOOKIE = "https://www.youtube-nocookie.com/embed";

/** User-initiated player (sound + controls on; playsInline, nocookie). */
const playSrc = (id: string) => `${NOCOOKIE}/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;

const IFRAME_ALLOW = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";

/**
 * Featured video surface. Leads with a bright, full-bleed thumbnail and a clear play
 * affordance, then loads the real player (with sound) on tap. We deliberately do NOT
 * auto-embed a muted YouTube loop here: the nocookie embed frequently paints a dark
 * consent/"confirm you're not a bot" frame before any video shows, which reads as an empty
 * black box. A crisp poster is faster, always visible, and never blank.
 */
export function YouTubeAutoplay({
  videoId,
  title,
  poster,
  label,
  ctaLabel = "Watch",
  className,
  priority = false,
}: {
  videoId: string;
  title: string;
  poster: string;
  label?: string;
  ctaLabel?: string;
  className?: string;
  priority?: boolean;
}) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-token-lg border border-line bg-bg shadow-[var(--shadow-elev)]",
        className,
      )}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={playSrc(videoId)}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow={IFRAME_ALLOW}
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`${ctaLabel}: ${title}`}
          className="group absolute inset-0 h-full w-full text-left"
        >
          <Image src={poster} alt="" fill priority={priority} sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
          {/* light, bottom-only scrim — keep the thumbnail bright */}
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg/70 to-transparent" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold !text-black shadow-[var(--shadow-gold)] transition-transform duration-200 group-hover:scale-105"
          >
            <Play className="size-7 translate-x-0.5" fill="currentColor" />
          </span>
          {label && (
            <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-bg/70 px-3 py-1 text-[length:var(--step--2)] font-semibold text-gold backdrop-blur-sm">
              {label}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

/**
 * Lightweight click-to-play video tile for grids. Paints only a poster (zero third-party
 * JS, fast) and loads the player on click — inherently reduced-motion safe.
 */
export function YouTubeLite({
  videoId,
  title,
  poster,
  kind,
  duration,
  className,
}: {
  videoId: string;
  title: string;
  poster: string;
  kind?: string;
  duration?: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("group relative aspect-video overflow-hidden rounded-token border border-line bg-bg", className)}>
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={playSrc(videoId)}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow={IFRAME_ALLOW}
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play: ${title}`}
          className="absolute inset-0 h-full w-full text-left"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent" />
          {kind && (
            <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-bg/85 px-2.5 py-1 text-[length:var(--step--2)] font-semibold text-gold backdrop-blur-sm">
              {kind}
            </span>
          )}
          {duration && (
            <span className="absolute bottom-3 right-3 rounded bg-bg/85 px-2 py-1 text-[length:var(--step--2)] font-semibold text-fg backdrop-blur-sm">
              {duration}
            </span>
          )}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold/95 !text-black shadow-[var(--shadow-gold)] transition-transform duration-200 group-hover:scale-105"
          >
            <Play className="size-5 translate-x-0.5" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
