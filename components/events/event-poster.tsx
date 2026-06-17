"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { TicketBadge } from "@/components/events/ticket-badge";
import { useI18n } from "@/components/i18n/language-provider";
import { boutSide } from "@/content/fighters";
import { pick } from "@/lib/i18n";
import { cn, formatDate } from "@/lib/utils";
import type { FightEvent } from "@/types";

/**
 * Generated fight poster. A hue-seeded gradient with a gold-foil event title and the
 * main-event names — stands in for commissioned poster art, no image asset required.
 */
export function EventPoster({ event, className }: { event: FightEvent; className?: string }) {
  const { t, locale } = useI18n();
  const title = pick(event.name, locale);
  const main = event.card[0];
  const red = main ? boutSide(main, "red") : undefined;
  const blue = main ? boutSide(main, "blue") : undefined;

  if (event.posterSrc) {
    return (
      <div
        className={cn(
          "relative isolate aspect-[1123/1400] w-full overflow-hidden rounded-token bg-[#06172f] shadow-[var(--shadow-sm)]",
          className,
        )}
      >
        <Image
          src={event.posterSrc}
          alt={`${title} poster`}
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-noise relative isolate flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-token p-5 sm:min-h-[19rem] sm:p-6",
        className,
      )}
      style={{
        backgroundColor: `hsl(${event.hue} 38% 9%)`,
        backgroundImage: [
          `radial-gradient(120% 90% at 80% -10%, hsl(${event.hue} 62% 32% / 0.5), transparent 60%)`,
          `radial-gradient(90% 80% at 0% 120%, hsl(${(event.hue + 24) % 360} 60% 26% / 0.45), transparent 60%)`,
          `linear-gradient(180deg, hsl(${event.hue} 28% 11%), hsl(${event.hue} 34% 6%))`,
        ].join(", "),
      }}
    >
      <svg aria-hidden viewBox="0 0 24 24" fill="white" className="pointer-events-none absolute -right-6 bottom-8 w-40 opacity-[0.05]">
        <path d="M12 2l2.9 6.26L22 9l-5 4.6L18.2 22 12 18.3 5.8 22 7 13.6 2 9l7.1-.74z" />
      </svg>

      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="kicker text-white/70">
          {formatDate(event.date, locale, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
        </span>
        <TicketBadge status={event.ticketStatus} />
      </div>

      <div className="relative z-10 mt-6">
        <span className="kicker mb-2 block text-gold">{t.common.mainEvent}</span>
        <h3 className="text-gold-foil font-display text-[length:var(--step-4)] uppercase leading-[0.92]">
          {title}
        </h3>
        {red && blue && (
          <p className="mt-3 font-display text-[length:var(--step-1)] font-bold text-white">
            {red.name}
            <span className="px-2 text-gold">·</span>
            {blue.name}
          </p>
        )}
        <p className="mt-2.5 inline-flex items-center gap-1.5 text-[length:var(--step--1)] text-white/65">
          <MapPin className="size-3.5 shrink-0" />
          {event.venue}, {event.city}
        </p>
      </div>
    </div>
  );
}
