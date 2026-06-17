import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn-style button. Variants via cva; premium micro-interactions baked in
 * (hover-lift on primary, active press, focus ring). `buttonVariants` is exported so the
 * same styling can be applied to a Next <Link> via <ButtonLink>.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-token font-semibold whitespace-nowrap " +
    "transition-[transform,background,box-shadow,border-color,color] duration-150 " +
    "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 " +
    "active:translate-y-px active:scale-[0.985] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // Brushed-gold foil with a championship glow and a hover shine sweep (pure CSS,
        // hover-only, GPU transform — no runtime cost, and the global reduced-motion rule
        // zeroes the motion).
        primary:
          "relative overflow-hidden text-[var(--brand-ink)] " +
          "bg-[linear-gradient(135deg,var(--gold-soft)_0%,var(--gold)_46%,var(--gold-deep)_100%)] " +
          "shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_3px_16px_color-mix(in_srgb,var(--gold)_42%,transparent)] " +
          "hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_9px_28px_color-mix(in_srgb,var(--gold)_60%,transparent)] " +
          "before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:-translate-x-[120%] " +
          "before:bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] " +
          "before:transition-transform before:duration-[600ms] before:ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:before:translate-x-[120%]",
        outline:
          "border border-line-2 bg-transparent text-fg hover:-translate-y-0.5 hover:border-gold hover:text-gold hover:bg-[color-mix(in_srgb,var(--gold)_7%,transparent)]",
        ghost: "bg-surface text-fg border border-line hover:-translate-y-0.5 hover:border-line-2 hover:bg-surface-2",
        subtle: "bg-surface-2 text-fg-2 hover:-translate-y-0.5 hover:bg-surface hover:text-fg",
        link: "text-gold underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-3.5 text-[length:var(--step--1)]",
        md: "h-11 px-5 text-[length:var(--step-0)]",
        lg: "h-13 px-7 text-[length:var(--step-0)]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  ...props
}: React.ComponentProps<typeof Link> & ButtonVariants) {
  return <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
