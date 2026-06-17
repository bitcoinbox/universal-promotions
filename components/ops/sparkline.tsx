import { cn } from "@/lib/utils";

/**
 * Tiny gold sparkline — a single polyline normalized into the viewBox. No JS, no hover;
 * fully server-rendered. With `stretch`, it fills the container width (non-scaling stroke
 * keeps the line crisp). `data` is shape-only (illustrative trend), never exact figures.
 */
export function Sparkline({
  data,
  width = 64,
  height = 22,
  stretch = false,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  stretch?: boolean;
  className?: string;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pad = 1.5;
  const stepX = (width - pad * 2) / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = pad + i * stepX;
      const y = pad + (1 - (v - min) / span) * (height - pad * 2);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const lastX = pad + (data.length - 1) * stepX;
  const lastY = pad + (1 - (data[data.length - 1] - min) / span) * (height - pad * 2);

  return (
    <svg
      width={stretch ? undefined : width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
      fill="none"
      aria-hidden
      className={cn(stretch ? "w-full" : "overflow-visible", className)}
    >
      <polyline
        points={points}
        stroke="var(--gold)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {!stretch && <circle cx={lastX} cy={lastY} r={1.8} fill="var(--gold)" />}
    </svg>
  );
}
