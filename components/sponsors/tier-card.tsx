"use client";

import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "@/components/ui/external-link";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/language-provider";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { SponsorPackage } from "@/types";

export function TierCard({ pkg }: { pkg: SponsorPackage }) {
  const { t, locale } = useI18n();
  const featured = pkg.featured;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-token-lg border p-6 sm:p-7",
        featured ? "border-gold/45 bg-surface shadow-[var(--shadow-gold)]" : "border-line bg-surface",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-[length:var(--step-1)] font-bold tracking-tight text-fg">
          {pick(pkg.name, locale)}
        </h3>
        {featured && (
          <Badge tone="solidGold" size="sm" className="uppercase">
            <Star className="size-3" />
            {t.partners.featuredLabel}
          </Badge>
        )}
      </div>
      <p className="mt-2 text-[length:var(--step--1)] text-fg-2">{pick(pkg.summary, locale)}</p>

      <span className="kicker mt-6">{t.partners.tierIncludes}</span>
      <ul className="mt-3 flex flex-col gap-2.5">
        {pick(pkg.inclusions, locale).map((item) => (
          <li key={item} className="flex gap-2.5 text-[length:var(--step--1)] text-fg-2">
            <Check className="mt-0.5 size-4 shrink-0 text-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <ExternalLink
        href="#"
        className={cn(buttonVariants({ variant: featured ? "primary" : "outline", size: "md" }), "mt-7 w-full")}
      >
        {t.partners.tierCta}
      </ExternalLink>
    </article>
  );
}
