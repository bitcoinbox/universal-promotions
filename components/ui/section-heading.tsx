import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/**
 * Reusable section header: mono kicker → display title → optional intro, revealed on
 * scroll with a small stagger. Strings are pre-resolved by the caller (so this stays a
 * presentational component usable from server or client trees).
 */
export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  className,
  id,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  const centered = align === "center";
  return (
    <div
      id={id}
      className={cn("flex flex-col gap-3", centered && "items-center text-center", className)}
    >
      {kicker && (
        <Reveal>
          <span className="kicker">{kicker}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-[length:var(--step-2)] font-bold tracking-tight text-fg">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={cn("text-[length:var(--step-0)] text-fg-2", centered && "mx-auto")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
