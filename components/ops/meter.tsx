import { cn, clamp } from "@/lib/utils";

/**
 * A labeled progress meter. `text` shows on the right; `pct` drives the bar. `tone` lets a
 * console triage by state: complete fills green, in-progress gold, and an empty (0%) meter
 * renders a dashed track so it reads as intentional rather than a failed load.
 */
export function Meter({
  label,
  text,
  pct,
  tone = "gold",
  className,
}: {
  label: string;
  text: string;
  pct: number;
  tone?: "gold" | "ok";
  className?: string;
}) {
  const width = clamp(pct, 0, 100);
  const empty = width === 0;
  const fill = tone === "ok" ? "var(--ok)" : "linear-gradient(90deg, var(--gold-deep), var(--gold))";
  return (
    <div className={cn("", className)}>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-[length:var(--step--1)]">
        <span className="truncate text-fg-2">{label}</span>
        <span className="tabular shrink-0 font-mono text-[length:var(--step--2)] font-semibold text-fg">{text}</span>
      </div>
      <div
        className={cn(
          "h-2 overflow-hidden rounded-full",
          empty ? "border border-dashed border-line-2" : "bg-bg-2",
        )}
      >
        {!empty && <div className="h-full rounded-full" style={{ width: `${width}%`, background: fill }} />}
      </div>
    </div>
  );
}
