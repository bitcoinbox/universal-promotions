"use client";

import Link from "next/link";
import { Portrait } from "@/components/brand/portrait";
import { Badge } from "@/components/ui/badge";
import { RecordLine } from "@/components/fighters/record-line";
import { useI18n } from "@/components/i18n/language-provider";
import { divisions } from "@/content/divisions";
import { boutSide, boutWon, type BoutSide } from "@/content/fighters";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Bout } from "@/types";

/** A vs B, with optional result for past bouts. Roster fighters link to their profile. */
export function Matchup({
  bout,
  size = "md",
  className,
}: {
  bout: Bout;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { t, locale } = useI18n();
  const red = boutSide(bout, "red");
  const blue = boutSide(bout, "blue");
  if (!red || !blue) return null;

  const division = divisions[bout.divisionId];
  const titleLabel = bout.titleLabel ? pick(bout.titleLabel, locale) : t.common.titleFight;
  const avatar = size === "lg" ? "size-16 sm:size-24" : size === "md" ? "size-14 sm:size-16" : "size-12";
  const nameSize =
    size === "lg" ? "text-[length:var(--step-1)]" : size === "md" ? "text-[length:var(--step-0)]" : "text-[length:var(--step--1)]";

  const Side = ({ side }: { side: BoutSide }) => {
    const won = boutWon(bout, side);
    const lost = !!bout.result && !won && bout.result.method !== "Draw";
    const inner = (
      <>
        <div className={cn("relative transition-opacity", lost && "opacity-55")}>
          <Portrait
            name={side.name}
            hue={side.hue}
            imageSrc={side.imageSrc}
            imageFocus={side.imageFocus}
            ratio="square"
            scrim={false}
            sizes="96px"
            className={cn(avatar, "rounded-full border border-line-2", won && "border-gold")}
          />
          {won && (
            <Badge tone="solidGold" size="sm" className="absolute -bottom-2 left-1/2 -translate-x-1/2 uppercase">
              Win
            </Badge>
          )}
        </div>
        <div className="min-w-0">
          <div className={cn("font-display font-bold leading-tight transition-colors", side.slug && "group-hover:text-gold", nameSize, lost ? "text-fg-2" : "text-fg")}>
            {side.name}
          </div>
          {side.record && <RecordLine record={side.record} className="mt-0.5 block" />}
        </div>
      </>
    );
    const base = "group flex min-w-0 flex-1 flex-col items-center gap-2 text-center";
    return side.slug ? (
      <Link href={`/fighters/${side.slug}`} className={base}>
        {inner}
      </Link>
    ) : (
      <div className={base}>{inner}</div>
    );
  };

  return (
    <div className={cn("flex items-start gap-2 sm:gap-3", className)}>
      <Side side={red} />
      <div className="flex shrink-0 flex-col items-center gap-1.5 px-0.5 pt-2 sm:px-1">
        <span className="font-display text-[length:var(--step-1)] font-bold italic text-fg-3">{t.common.vs}</span>
        {bout.isTitle && (
          <Badge tone="gold" size="sm">
            {titleLabel}
          </Badge>
        )}
        <span className="text-center text-[length:var(--step--2)] leading-tight text-fg-3">
          {pick(division.label, locale)}
          {bout.rounds && (
            <>
              <br />
              {bout.rounds} {t.common.rounds}
            </>
          )}
        </span>
        {bout.result && (
          <span className="font-mono text-[length:var(--step--2)] font-semibold text-gold">
            {bout.result.method}
            {bout.result.round ? ` · R${bout.result.round}` : ""}
          </span>
        )}
      </div>
      <Side side={blue} />
    </div>
  );
}
