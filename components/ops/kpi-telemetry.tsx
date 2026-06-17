"use client";

import { Sparkline } from "@/components/ops/sparkline";
import { useI18n } from "@/components/i18n/language-provider";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { TelemetryMetric } from "@/types";

const trendColor = {
  up: "var(--ok)",
  down: "var(--live)",
  flat: "var(--fg-3)",
} as const;

/** Operating telemetry readouts — terminal-style tile: mono label, big value, full-width trend line. */
export function KpiTelemetry({ metrics }: { metrics: TelemetryMetric[] }) {
  const { locale } = useI18n();
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {metrics.map((m) => (
        <div
          key={m.id}
          className="ops-card relative flex flex-col overflow-hidden rounded-token border border-line p-4"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-0.5"
            style={{ background: m.delta ? trendColor[m.trend] : "var(--line-2)" }}
          />
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-mono text-[length:var(--step--2)] uppercase tracking-[0.1em] text-fg-3">
              {pick(m.label, locale)}
            </span>
            {m.delta ? (
              <span
                className="tabular shrink-0 rounded-[3px] px-1.5 py-0.5 font-mono text-[10px] font-semibold leading-none"
                style={{
                  color: trendColor[m.trend],
                  background: `color-mix(in srgb, ${trendColor[m.trend]} 13%, transparent)`,
                }}
              >
                {m.delta}
              </span>
            ) : (
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">—</span>
            )}
          </div>
          <div className="mt-2 tabular font-mono text-[length:var(--step-2)] font-bold leading-none text-fg">
            {m.value}
          </div>
          <Sparkline data={m.spark} stretch height={26} className={cn("mt-3", !m.delta && "opacity-40")} />
        </div>
      ))}
    </div>
  );
}
