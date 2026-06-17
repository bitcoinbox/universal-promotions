"use client";

import { divisions } from "@/content/divisions";
import { useDrawer } from "@/components/ops/fighter-detail-drawer";
import { useI18n } from "@/components/i18n/language-provider";
import { Portrait } from "@/components/brand/portrait";
import { pick } from "@/lib/i18n";
import { cn, formatRecord } from "@/lib/utils";
import type { Fighter } from "@/types";

/**
 * Shared roster atom for the Fight Ops console (pipeline columns, run-of-show timeline).
 * Hue-coded left border, real name + record + division + hometown. When interactive it is
 * a <button> that opens the shared fighter drawer; otherwise it renders as a static card.
 */
export function FighterCard({
  fighter,
  interactive = true,
  className,
}: {
  fighter: Fighter;
  interactive?: boolean;
  className?: string;
}) {
  const { t, locale } = useI18n();
  const drawer = useDrawer();
  const division = fighter.division ? divisions[fighter.division] : undefined;

  const inner = (
    <>
      <Portrait
        name={fighter.name}
        hue={fighter.hue}
        imageSrc={fighter.imageSrc}
        imageFocus={fighter.imageFocus}
        ratio="square"
        sizes="48px"
        scrim={false}
        className="size-11 shrink-0 rounded-token"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[length:var(--step--1)] font-semibold text-fg">{fighter.name}</span>
          {fighter.record && (
            <span className="tabular shrink-0 font-mono text-[length:var(--step--2)] text-fg-2">
              {formatRecord(fighter.record)}
            </span>
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[length:var(--step--2)] text-fg-3">
          {division && <span className="truncate">{pick(division.label, locale)}</span>}
          {division && fighter.hometown && <span aria-hidden>·</span>}
          {fighter.hometown && <span className="truncate">{fighter.hometown}</span>}
        </div>
      </div>
    </>
  );

  const base = cn(
    "flex items-center gap-3 rounded-token border border-line bg-bg-2 p-2.5 pl-3 text-left",
    "border-l-2",
    className,
  );
  const hueStyle = { borderLeftColor: `hsl(${fighter.hue} 70% 52%)` } as React.CSSProperties;

  if (!interactive || !drawer) {
    return (
      <div className={base} style={hueStyle}>
        {inner}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => drawer.open(fighter.slug)}
      aria-label={`${fighter.name} — ${t.actions.viewFighter}`}
      className={cn(
        base,
        "w-full transition-[transform,border-color,background-color,box-shadow] duration-200 ease-[var(--ease)]",
        "hover:-translate-y-0.5 hover:border-line-2 hover:bg-surface hover:shadow-[var(--shadow-elev)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
      )}
      style={hueStyle}
    >
      {inner}
    </button>
  );
}
