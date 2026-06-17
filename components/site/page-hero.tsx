import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/** Consistent page-level hero: gold wash, mono kicker, h1, intro, optional slot. */
export function PageHero({
  kicker,
  title,
  intro,
  children,
  className,
  backgroundSrc,
  backgroundPosition = "center",
}: {
  kicker?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
  backgroundSrc?: string;
  backgroundPosition?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden border-b border-line", className)}>
      {backgroundSrc ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={backgroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={60}
            className="object-cover opacity-65"
            style={{ objectPosition: backgroundPosition }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,11,14,0.9)_0%,rgba(10,11,14,0.72)_38%,rgba(10,11,14,0.28)_78%,rgba(10,11,14,0.48)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(46rem_26rem_at_82%_-20%,rgba(229,184,80,0.13),transparent_60%)]" />
        </div>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(46rem 26rem at 82% -20%, color-mix(in srgb, var(--gold) 13%, transparent), transparent 60%)",
          }}
        />
      )}
      <Container className="py-14 sm:py-20">
        {kicker && (
          <Reveal>
            <span className="kicker">{kicker}</span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="mt-3 max-w-3xl font-display text-[length:var(--step-3)] font-bold leading-[1.05] tracking-tight">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-[length:var(--step-0)] text-fg-2">{intro}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.14}>
            <div className="mt-6">{children}</div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
