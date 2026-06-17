"use client";

import { useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/language-provider";
import { pick } from "@/lib/i18n";
import { cn, clamp } from "@/lib/utils";
import type { SellThroughPoint } from "@/types";

// viewBox geometry (scales responsively; padding leaves room for axis labels)
const W = 900;
const H = 250;
const PAD = { l: 46, r: 18, t: 18, b: 34 };
const PLOT_W = W - PAD.l - PAD.r;
const PLOT_H = H - PAD.t - PAD.b;

/**
 * Hand-built SVG area chart of illustrative cumulative ticket sales vs the REAL 4,000-seat
 * house. No chart library. The path geometry is computed once (useMemo) and never changes
 * on hover; only a thin guide line + readout follow the pointer. Line draws in on mount via
 * the `ops-draw` keyframe (auto-disabled under reduced motion).
 */
export function SellThroughChart({
  points,
  capacity,
  targetPct = 70,
}: {
  points: SellThroughPoint[];
  capacity: number;
  targetPct?: number;
}) {
  const { t, locale } = useI18n();
  const es = locale === "es";
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const n = points.length;
  const x = (i: number) => PAD.l + (i / (n - 1)) * PLOT_W;
  const y = (v: number) => PAD.t + (1 - v / capacity) * PLOT_H;

  const { line, area, ticks } = useMemo(() => {
    const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.sold).toFixed(1)}`).join(" ");
    const bottom = PAD.t + PLOT_H;
    const areaPath = `${linePath} L ${x(n - 1).toFixed(1)} ${bottom} L ${x(0).toFixed(1)} ${bottom} Z`;
    const tickVals = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(f * capacity));
    return { line: linePath, area: areaPath, ticks: tickVals };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, capacity, n]);

  const fmt = (v: number) => (v >= 1000 ? `${(v / 1000).toLocaleString(es ? "es-PR" : "en-US")}K` : `${v}`);
  const fmtFull = (v: number) => v.toLocaleString(es ? "es-PR" : "en-US");

  const onMove = (e: React.PointerEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const f = (e.clientX - rect.left) / rect.width;
    const dataFrac = clamp((f - PAD.l / W) / (PLOT_W / W), 0, 1);
    setActive(Math.round(dataFrac * (n - 1)));
  };

  const targetY = y((capacity * targetPct) / 100);
  const act = active !== null ? points[active] : null;
  const actPct = act ? Math.round((act.sold / capacity) * 100) : 0;
  const guideLeftPct = active !== null ? (x(active) / W) * 100 : 0;

  return (
    <div>
      <div
        ref={wrapRef}
        className="relative w-full touch-none"
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
      >
        {/* floating readout */}
        {act && (
          <div
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-token border border-line-2 bg-surface px-2.5 py-1.5 text-center shadow-[var(--shadow-elev)]"
            style={{ left: `${clamp(guideLeftPct, 12, 88)}%` }}
          >
            <div className="kicker">{pick(act.dayLabel, locale)}</div>
            <div className="tabular font-mono text-[length:var(--step-0)] font-bold text-fg">{fmtFull(act.sold)}</div>
            <div className="tabular text-[length:var(--step--2)] text-gold">
              {actPct}% {t.ops.ofCapacity}
            </div>
          </div>
        )}

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.ops.sellThroughHeading}>
          <defs>
            <linearGradient id="ops-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.34" />
              <stop offset="62%" stopColor="var(--gold)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* horizontal gridlines + y labels */}
          {ticks.map((v) => (
            <g key={v}>
              <line x1={PAD.l} y1={y(v)} x2={W - PAD.r} y2={y(v)} stroke="var(--line)" strokeWidth={1} />
              <text x={PAD.l - 8} y={y(v) + 3.5} textAnchor="end" className="fill-[var(--fg-3)] font-mono" fontSize="11">
                {fmt(v)}
              </text>
            </g>
          ))}

          {/* x labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={x(i)}
              y={H - 12}
              textAnchor="middle"
              className="fill-[var(--fg-3)] font-mono"
              fontSize="10.5"
            >
              {pick(p.dayLabel, locale)}
            </text>
          ))}

          {/* target-pace dashed line */}
          <line
            x1={x(0)}
            y1={y(0)}
            x2={x(n - 1)}
            y2={targetY}
            stroke="var(--accent)"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            opacity={0.8}
          />

          {/* area + line */}
          <path d={area} fill="url(#ops-area)" />
          <path
            d={line}
            fill="none"
            stroke="var(--gold)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={100}
            style={{ ["--draw-len" as string]: "100", animation: "ops-draw 1200ms var(--ease) both" }}
          />

          {/* persistent "today" endpoint marker (hidden while hovering) */}
          {active === null && n > 1 && (
            <g>
              <line
                x1={x(n - 1)}
                y1={y(points[n - 1].sold)}
                x2={x(n - 1)}
                y2={PAD.t + PLOT_H}
                stroke="var(--gold)"
                strokeWidth={1}
                strokeDasharray="2 3"
                opacity={0.5}
              />
              <circle cx={x(n - 1)} cy={y(points[n - 1].sold)} r={4.5} fill="var(--gold)" stroke="var(--bg)" strokeWidth={2} />
              <text
                x={x(n - 1)}
                y={y(points[n - 1].sold) - 12}
                textAnchor="end"
                className="fill-[var(--fg)] font-mono"
                fontSize="13"
                fontWeight="700"
              >
                {fmtFull(points[n - 1].sold)}
              </text>
            </g>
          )}

          {/* hover guide + dot */}
          {active !== null && (
            <g>
              <line x1={x(active)} y1={PAD.t} x2={x(active)} y2={PAD.t + PLOT_H} stroke="var(--gold-soft)" strokeWidth={1} strokeDasharray="3 3" />
              <circle cx={x(active)} cy={y(points[active].sold)} r={4} fill="var(--gold)" stroke="var(--bg)" strokeWidth={2} />
            </g>
          )}
        </svg>
      </div>

      {/* legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[length:var(--step--2)] text-fg-3">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-0.5 w-4 rounded-full bg-[var(--gold)]" />
          {t.ops.ticketsSold}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-0 w-4 border-t-2 border-dashed border-[var(--accent)]" />
          {t.ops.targetPace}
        </span>
      </div>
    </div>
  );
}
