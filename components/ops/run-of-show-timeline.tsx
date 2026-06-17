"use client";

import { DoorOpen, Swords, Crown, Bell, Mic } from "lucide-react";
import { FighterCard } from "@/components/ops/fighter-card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";
import type { RunOfShowRow, Fighter } from "@/types";

const ICON = {
  doors: DoorOpen,
  undercard: Swords,
  comain: Swords,
  main: Crown,
  final: Bell,
  interview: Mic,
} as const;

/**
 * Vertical fight-night schedule. Only the doors time and the main-event bout (real Kiria
 * vs "To be announced") are real; row times and the undercard/co-main slots are an
 * illustrative "Sample schedule" with NO invented fighters or matchups.
 */
export function RunOfShowTimeline({
  rows,
  headliner,
  opponentName,
}: {
  rows: RunOfShowRow[];
  headliner?: Fighter;
  opponentName: string;
}) {
  const { t } = useI18n();
  const labelFor = (kind: RunOfShowRow["kind"]) =>
    ({
      doors: t.ops.rosDoors,
      undercard: t.ops.rosUndercard,
      comain: t.ops.rosComain,
      main: t.ops.rosMain,
      final: t.ops.rosFinal,
      interview: t.ops.rosInterviews,
    })[kind];

  return (
    <ol className="flex flex-col">
      {rows.map((row, i) => {
        const Icon = ICON[row.kind];
        const isMain = row.kind === "main";
        const isLast = i === rows.length - 1;
        return (
          <li key={row.id} className="grid grid-cols-[auto_1fr] gap-x-3 sm:grid-cols-[5.5rem_auto_1fr] sm:gap-x-4">
            {/* time (mono) — hidden on xs, shown inline instead */}
            <span className="tabular hidden pt-1.5 text-right font-mono text-[length:var(--step--1)] text-fg-2 sm:block">
              {row.time}
            </span>
            {/* rail */}
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border",
                  isMain
                    ? "border-gold bg-[color-mix(in_srgb,var(--gold)_16%,transparent)] text-gold"
                    : "border-line bg-bg-2 text-fg-3",
                )}
              >
                <Icon className="size-4" />
              </span>
              {!isLast && <span aria-hidden className="my-1 w-px flex-1 bg-line" />}
            </div>
            {/* content */}
            <div className={cn("min-w-0", isLast ? "pb-0" : "pb-6")}>
              <div
                className={cn(
                  isMain &&
                    "rounded-token border border-[color-mix(in_srgb,var(--gold)_28%,transparent)] bg-[color-mix(in_srgb,var(--gold)_6%,transparent)] p-3.5",
                )}
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className={cn(
                      isMain
                        ? "font-display text-[length:var(--step-1)] uppercase leading-none text-gold"
                        : "text-[length:var(--step-0)] font-semibold text-fg",
                    )}
                  >
                    {labelFor(row.kind)}
                  </span>
                  <span className="tabular font-mono text-[length:var(--step--2)] text-fg-3 sm:hidden">{row.time}</span>
                  {isMain && (
                    <Badge tone="gold" size="sm" className="uppercase tracking-wide">
                      {t.common.mainEvent}
                    </Badge>
                  )}
                </div>

                {isMain && headliner ? (
                  <div className="mt-3 grid gap-2 sm:max-w-md">
                    <FighterCard fighter={headliner} />
                    <div className="flex items-center gap-2 pl-1 text-[length:var(--step--2)] text-fg-3">
                      <span className="font-mono uppercase tracking-wider">{t.common.vs}</span>
                      <Badge tone="outline">{opponentName}</Badge>
                    </div>
                  </div>
                ) : row.kind === "undercard" || row.kind === "comain" ? (
                  <p className="mt-1 text-[length:var(--step--1)] text-fg-3">{t.ops.matchupsTBA}</p>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
