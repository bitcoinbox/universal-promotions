import { Ticket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { ticketsUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The marquee CTA — the shared premium `primary` button (brushed-gold foil, glow, hover
 * shine sweep) plus a ticket glyph and uppercase label. Links out to the real ticket
 * vendor (PRticket.com), opening in a new tab with a safe rel.
 */
export function TicketsButton({
  label,
  className,
  size = "sm",
}: {
  label: string;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ExternalLink
      href={ticketsUrl}
      className={cn(buttonVariants({ variant: "primary", size }), "uppercase tracking-wide", className)}
    >
      <Ticket className="size-4 -rotate-[18deg]" strokeWidth={2.25} />
      {label}
    </ExternalLink>
  );
}
