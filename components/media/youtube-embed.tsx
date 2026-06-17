import Image from "next/image";
import { ExternalLink } from "@/components/ui/external-link";
import { cn } from "@/lib/utils";

export function YouTubeEmbed({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-token-lg border border-line bg-bg shadow-[var(--shadow-elev)]", className)}>
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export function YouTubePlaylistEmbed({
  playlistId,
  title,
  className,
}: {
  playlistId: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-token-lg border border-line bg-bg shadow-[var(--shadow-elev)]", className)}>
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export function YouTubeThumbnailCard({
  video,
  compact = false,
}: {
  video: { id: string; title: string; duration: string; kind: string; thumbnailSrc?: string };
  compact?: boolean;
}) {
  return (
    <ExternalLink
      href={`https://www.youtube.com/watch?v=${video.id}`}
      className="group block overflow-hidden rounded-token border border-line bg-surface shadow-[var(--shadow-sm)] transition-colors hover:border-gold/50"
    >
      <div className="relative aspect-video overflow-hidden bg-bg">
        <Image
          src={video.thumbnailSrc ?? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-2 right-2 rounded bg-bg/85 px-2 py-1 text-[length:var(--step--2)] font-semibold text-fg backdrop-blur-sm">
          {video.duration}
        </span>
      </div>
      <div className={cn("p-4", compact && "p-3")}>
        <p className="kicker text-gold">{video.kind}</p>
        <h3 className={cn("mt-1 font-display font-bold leading-tight text-fg", compact ? "text-[length:var(--step-0)]" : "text-[length:var(--step-1)]")}>
          {video.title}
        </h3>
      </div>
    </ExternalLink>
  );
}
