import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badge = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium leading-none whitespace-nowrap",
  {
    variants: {
      tone: {
        gold: "border-transparent bg-gold/15 text-gold",
        solidGold: "border-transparent bg-gold text-[var(--brand-ink)]",
        neutral: "border-line-2 bg-surface text-fg-2",
        outline: "border-line-2 bg-transparent text-fg-2",
        accent: "border-transparent bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-accent",
        live: "border-transparent bg-[color-mix(in_srgb,var(--live)_16%,transparent)] text-[var(--live)]",
        ok: "border-transparent bg-[color-mix(in_srgb,var(--ok)_15%,transparent)] text-[var(--ok)]",
        warn: "border-transparent bg-[color-mix(in_srgb,var(--warn)_16%,transparent)] text-[var(--warn)]",
      },
      size: {
        sm: "px-2 py-0.5 text-[length:var(--step--2)]",
        md: "px-2.5 py-1 text-[length:var(--step--1)]",
      },
    },
    defaultVariants: { tone: "neutral", size: "sm" },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badge> & { dot?: boolean };

export function Badge({ className, tone, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badge({ tone, size }), className)} {...props}>
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-current" />}
      {children}
    </span>
  );
}
