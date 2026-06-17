import { cn } from "@/lib/utils";

/**
 * Signature Fight Ops panel. Layered instrument surface (`.ops-card`) with a header that
 * pairs an optional mono section index with the title, a gold-lead hairline rule, and
 * opt-in broadcast corner ticks (`frame`). Used for every console section.
 */
export function OpsPanel({
  title,
  icon: Icon,
  action,
  index,
  frame = false,
  recessed = false,
  className,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  /** Two-character mono section index, e.g. "02". */
  index?: string;
  /** Broadcast corner ticks for signature (primary) panels. */
  frame?: boolean;
  /** Secondary panel: drops into the page (inset) instead of floating, for visual hierarchy. */
  recessed?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative flex flex-col rounded-token-lg border p-5 sm:p-6",
        recessed
          ? "border-line/70 bg-bg-2 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.02)]"
          : "ops-card border-line",
        frame && "ops-ticks",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {index && (
            <span className="tabular shrink-0 rounded-[5px] border border-line-2 px-1.5 py-1 font-mono text-[10px] leading-none tracking-[0.12em] text-gold-deep">
              {index}
            </span>
          )}
          <Icon className="size-4 shrink-0 text-gold" />
          <h3 className="text-[length:var(--step-0)] font-semibold leading-tight text-fg">{title}</h3>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </header>
      <div aria-hidden className="ops-rule mb-5 mt-3.5" />
      {children}
    </section>
  );
}
