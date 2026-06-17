"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Self-hosted Instagram reel that autoplays muted + looping (the brand's own clips,
 * downloaded to the repo — no third-party scripts, no CSP relaxation).
 *
 * Performance:
 * - The visible poster is a LAZY, optimized next/image (AVIF at the grid size). The video
 *   carries NO native `poster` attribute, so no unoptimized full-size JPG is fetched
 *   eagerly on first paint — nothing here loads until the tile nears the viewport.
 * - `preload="none"` + IntersectionObserver: the mp4 only loads/decodes while in view.
 * - `prefers-reduced-motion` → just the static poster image, never the video.
 * Decorative (`aria-hidden`, not tab-focusable); the wrapping link carries the label.
 */
export function ReelVideo({
  src,
  poster,
  sizes,
  className,
  eager = false,
}: {
  src: string;
  poster: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <>
      {/* Lazy, optimized poster — visible until the video paints, and the reduced-motion state. */}
      <Image
        src={poster}
        alt=""
        fill
        sizes={sizes}
        priority={eager}
        loading={eager ? undefined : "lazy"}
        className={cn("object-cover", className)}
      />
      {!reduce && (
        <video
          ref={ref}
          // Fade in only once frames are actually painting, so there's no black flash over the poster.
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            playing ? "opacity-100" : "opacity-0",
            className,
          )}
          autoPlay={eager}
          muted
          loop
          playsInline
          preload={eager ? "auto" : "none"}
          tabIndex={-1}
          aria-hidden
          onPlaying={() => setPlaying(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </>
  );
}
