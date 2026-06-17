"use client";

import { Building2, Ticket, Users, Radio, Megaphone, Film } from "lucide-react";
import { useI18n } from "@/components/i18n/language-provider";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { pick } from "@/lib/i18n";
import { cn, clamp } from "@/lib/utils";
import type { ReadinessPillar, ReadinessStatus } from "@/types";

const SEGMENTS = 12;

const META: Record<ReadinessPillar["id"], { icon: typeof Ticket; anchor: string; nameKey: string }> = {
  venue: { icon: Building2, anchor: "ops-readiness", nameKey: "pillarVenue" },
  ticketing: { icon: Ticket, anchor: "ops-sell-through", nameKey: "pillarTicketing" },
  talent: { icon: Users, anchor: "ops-pipeline", nameKey: "pillarTalent" },
  broadcast: { icon: Radio, anchor: "ops-telemetry", nameKey: "pillarBroadcast" },
  sponsors: { icon: Megaphone, anchor: "ops-sponsors", nameKey: "pillarSponsors" },
  media: { icon: Film, anchor: "ops-sponsors", nameKey: "pillarMedia" },
};

const STATUS_TONE: Record<ReadinessStatus, { color: string; key: string }> = {
  ready: { color: "var(--ok)", key: "statusReady" },
  "at-risk": { color: "var(--warn)", key: "statusAtRisk" },
  blocked: { color: "var(--live)", key: "statusBlocked" },
};

/**
 * Six-pillar readiness board. Each tile is a button that smooth-scrolls to the pillar's
 * detail section. Status is encoded as a segmented gauge (terminal/equalizer style) plus a
 * dotted chip. The one real fact per pillar lives in `note`; the % is illustrative.
 */
export function ReadinessHeatmap({ pillars }: { pillars: ReadinessPillar[] }) {
  const { t, locale } = useI18n();
  const reduce = usePrefersReducedMotion();

  const jump = (anchor: string) => {
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((p) => {
        const meta = META[p.id];
        const tone = STATUS_TONE[p.status];
        const Icon = meta.icon;
        const pct = clamp(p.pct, 0, 100);
        const filled = Math.round((pct / 100) * SEGMENTS);
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => jump(meta.anchor)}
            title={pick(p.note, locale)}
            className={cn(
              "ops-card group relative flex flex-col overflow-hidden rounded-token border border-line p-4 text-left",
              "transition-[transform,border-color] duration-200 ease-[var(--ease)]",
              "hover:-translate-y-0.5 hover:border-line-2",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
            )}
          >
            {/* status edge on the left */}
            <span aria-hidden className="absolute inset-y-0 left-0 w-0.5" style={{ background: tone.color }} />

            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-[length:var(--step--2)] uppercase tracking-[0.12em] text-fg-2">
                <Icon className="size-3.5 text-fg-3 transition-colors group-hover:text-gold" />
                {t.ops[meta.nameKey as keyof typeof t.ops] as string}
              </span>
              <span
                className="inline-flex items-center gap-1.5 font-mono text-[length:var(--step--2)] uppercase tracking-[0.08em]"
                style={{ color: tone.color }}
              >
                <span className="size-1.5 rounded-full" style={{ background: tone.color }} />
                {t.ops[tone.key as keyof typeof t.ops] as string}
              </span>
            </div>

            <div className="mt-3 flex items-end gap-1">
              <span className="tabular font-mono text-[length:var(--step-3)] font-bold leading-[0.9] text-fg">{pct}</span>
              <span className="pb-1 font-mono text-[length:var(--step--1)] text-fg-3">%</span>
            </div>

            {/* segmented gauge */}
            <div className="mt-3 flex items-center gap-[3px]">
              {Array.from({ length: SEGMENTS }).map((_, i) => (
                <span
                  key={i}
                  className="h-2.5 flex-1 rounded-[1px]"
                  style={
                    i < filled
                      ? { background: tone.color }
                      : { background: "color-mix(in srgb, var(--line-2) 70%, transparent)" }
                  }
                />
              ))}
            </div>

            <p className="mt-3 truncate text-[length:var(--step--2)] text-fg-3">{pick(p.note, locale)}</p>
          </button>
        );
      })}
    </div>
  );
}
