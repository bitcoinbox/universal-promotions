import { cn } from "@/lib/utils";

/**
 * Placeholder sponsor "logo" lockup. Real partner marks aren't used in this prototype
 * (none of these brands exist), so each renders as a tasteful wordmark plate with a faint
 * hue tint — enough to populate a sponsor wall convincingly without inventing a logo.
 */
export function SponsorLogo({
  name,
  hue,
  className,
}: {
  name: string;
  hue: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-14 items-center justify-center rounded-token border border-line bg-surface px-4 text-center",
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(120% 140% at 0% 0%, hsl(${hue} 50% 22% / 0.28), transparent 60%)`,
      }}
    >
      <span className="font-display text-[length:var(--step--1)] font-bold uppercase tracking-[0.12em] text-fg-2">
        {name}
      </span>
    </div>
  );
}
