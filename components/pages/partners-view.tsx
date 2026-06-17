"use client";

import { Megaphone, Radio, Shield, BarChart3, ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { DemoBadge } from "@/components/ui/demo-badge";
import { Stat } from "@/components/ui/stat";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { SponsorLogo } from "@/components/brand/sponsor-logo";
import { TierCard } from "@/components/sponsors/tier-card";
import { RecapReport } from "@/components/sponsors/recap-report";
import { useI18n } from "@/components/i18n/language-provider";
import { sponsors, sponsorPackages, audienceValue, hospitalityPackages } from "@/content/sponsors";
import { pick } from "@/lib/i18n";

export function PartnersView() {
  const { t, locale } = useI18n();

  const values = [
    { icon: Megaphone, title: t.partners.values.exposureTitle, body: t.partners.values.exposureBody },
    { icon: Radio, title: t.partners.values.reachTitle, body: t.partners.values.reachBody },
    { icon: Shield, title: t.partners.values.safetyTitle, body: t.partners.values.safetyBody },
    { icon: BarChart3, title: t.partners.values.reportingTitle, body: t.partners.values.reportingBody },
  ];

  return (
    <>
      <PageHero
        kicker={t.partners.kicker}
        title={t.partners.title}
        intro={t.partners.intro}
        backgroundSrc="/media/universal/sections/up-page-partners.png"
      >
        <ExternalLink href="#" className={buttonVariants({ variant: "primary", size: "lg" })}>
          {t.actions.becomePartner}
          <ArrowRight className="size-4" />
        </ExternalLink>
      </PageHero>

      {/* sponsor wall */}
      <section className="border-b border-line bg-bg-2 py-12">
        <Container>
          <div className="mb-6 flex items-center gap-3">
            <span className="kicker">{t.events.sponsorsOnNight}</span>
            <DemoBadge />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {sponsors.map((s) => (
              <SponsorLogo key={s.slug} name={s.name} hue={s.hue} />
            ))}
          </div>
        </Container>
      </section>

      {/* value props */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t.partners.valueKicker} title={t.partners.valueTitle} className="max-w-2xl" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.06}>
                <article className="flex h-full gap-4 rounded-token border border-line bg-surface p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-token border border-gold/30 bg-gold/10 text-gold">
                    <v.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-[length:var(--step-1)] font-bold">{v.title}</h3>
                    <p className="mt-1.5 text-[length:var(--step--1)] text-fg-2">{v.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* audience value */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="kicker">{t.partners.audienceKicker}</span>
            <DemoBadge />
          </div>
          <SectionHeading title={t.partners.audienceTitle} intro={t.partners.audienceBody} className="max-w-2xl" />
          <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {audienceValue.map((m, i) => (
              <Reveal key={pick(m.label, locale)} delay={(i % 4) * 0.05}>
                <Stat value={m.value} label={pick(m.label, locale)} hint={m.hint ? pick(m.hint, locale) : undefined} />
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-[length:var(--step--2)] text-fg-3">{t.partners.audienceNote}</p>
        </Container>
      </section>

      {/* tiers */}
      <section className="border-y border-line bg-bg-2 py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t.partners.tiersKicker} title={t.partners.tiersTitle} className="max-w-2xl" />
          <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
            {sponsorPackages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.06}>
                <TierCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[length:var(--step--2)] text-fg-3">{t.partners.tiersNote}</p>
        </Container>
      </section>

      {/* hospitality / VIP */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            kicker={t.partners.hospitalityKicker}
            title={t.partners.hospitalityTitle}
            intro={t.partners.hospitalitySub}
            className="max-w-2xl"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {hospitalityPackages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-token-lg border border-line bg-surface p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-[length:var(--step-1)] font-bold">{pick(pkg.name, locale)}</h3>
                    <span className="rounded-full border border-line-2 px-2 py-0.5 text-[length:var(--step--2)] text-fg-2">
                      {pick(pkg.capacity, locale)}
                    </span>
                  </div>
                  <p className="mt-2 text-[length:var(--step--1)] text-fg-2">{pick(pkg.summary, locale)}</p>
                  <span className="kicker mt-5">{t.partners.hospitalityIncludes}</span>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {pick(pkg.features, locale).map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-[length:var(--step--1)] text-fg-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-7">
            <ExternalLink href="#" className={buttonVariants({ variant: "outline", size: "md" })}>
              {t.partners.hospitalityCta}
            </ExternalLink>
          </div>
        </Container>
      </section>

      {/* recap report */}
      <section className="border-t border-line bg-bg-2 py-16 sm:py-20">
        <Container>
          <SectionHeading
            kicker={t.partners.recapKicker}
            title={t.partners.recapTitle}
            intro={t.partners.recapSub}
            className="max-w-2xl"
          />
          <Reveal>
            <div className="mt-10">
              <RecapReport />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <div
            className="relative overflow-hidden rounded-token-lg border border-gold/25 p-10 text-center sm:p-14"
            style={{
              background:
                "radial-gradient(50rem 22rem at 50% 0%, color-mix(in srgb, var(--gold) 14%, transparent), transparent 65%), var(--surface)",
            }}
          >
            <Reveal>
              <h2 className="mx-auto max-w-2xl font-display text-[length:var(--step-3)] font-bold tracking-tight">
                {t.partners.ctaTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mx-auto mt-4 max-w-xl text-[length:var(--step-0)] text-fg-2">{t.partners.ctaBody}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <ExternalLink href="#" className={buttonVariants({ variant: "primary", size: "lg" }) + " mt-8"}>
                {t.actions.becomePartner}
              </ExternalLink>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
