import { cn } from "@/lib/utils";

const trendClass = {
  up: "text-[var(--ok)]",
  down: "text-[var(--live)]",
  flat: "text-fg-3",
} as const;

/**
 * A single metric: large value, mono kicker label, optional delta. Used for the home
 * stats strip and the Fight Ops KPI row. `mono` swaps the value to the monospace face for
 * a more operational, data-surface feel.
 */
export function Stat({
  value,
  label,
  delta,
  trend = "flat",
  hint,
  mono = false,
  className,
}: {
  value: string;
  label: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "tabular text-[length:var(--step-2)] font-bold leading-none text-fg",
            mono ? "font-mono tracking-tight" : "font-display",
          )}
        >
          {value}
        </span>
        {delta && (
          <span className={cn("tabular text-[length:var(--step--1)] font-semibold", trendClass[trend])}>
            {delta}
          </span>
        )}
      </div>
      <span className="kicker">{label}</span>
      {hint && <span className="text-[length:var(--step--2)] text-fg-3">{hint}</span>}
    </div>
  );
}
