import { cn, clamp } from "@/lib/utils";

/**
 * SVG donut gauge (0–100%). Gold stroke when at/above `target`, amber when under. The
 * stroke fills from empty to its value via the `ops-ring-fill` keyframe, which the global
 * reduced-motion block auto-disables. Pure server component — no JS.
 */
export function ReadinessRing({
  pct,
  target = 70,
  label,
  size = 132,
  stroke = 10,
  className,
}: {
  pct: number;
  target?: number;
  label?: string;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const value = clamp(pct, 0, 100);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  const onTrack = value >= target;
  const accent = onTrack ? "var(--gold)" : "var(--warn)";

  return (
    <div className={cn("relative grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={
            {
              "--ring-c": `${c}px`,
              animation: "ops-ring-fill 1100ms var(--ease) both",
            } as React.CSSProperties
          }
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="tabular font-display text-[length:var(--step-3)] leading-none text-fg" style={{ color: accent }}>
          {value}
          <span className="text-[length:var(--step-0)]">%</span>
        </span>
        {label && <span className="kicker mt-1 text-center">{label}</span>}
      </div>
    </div>
  );
}
