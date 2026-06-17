"use client";

import {
  Info,
  Activity,
  Route,
  Gauge,
  Users,
  Megaphone,
  Film,
  CalendarClock,
  LineChart,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { DemoBadge } from "@/components/ui/demo-badge";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { OpsPanel } from "@/components/ops/ops-panel";
import { Meter } from "@/components/ops/meter";
import { SampleTag } from "@/components/ops/sample-tag";
import { ConsoleHeader } from "@/components/ops/console-header";
import { LifecycleStepper } from "@/components/ops/lifecycle-stepper";
import { EventSummaryCard } from "@/components/ops/event-summary-card";
import { ReadinessHeatmap } from "@/components/ops/readiness-heatmap";
import { SellThroughChart } from "@/components/ops/sell-through-chart";
import { FighterCard } from "@/components/ops/fighter-card";
import { RunOfShowTimeline } from "@/components/ops/run-of-show-timeline";
import { KpiTelemetry } from "@/components/ops/kpi-telemetry";
import { DrawerProvider } from "@/components/ops/fighter-detail-drawer";
import { useI18n } from "@/components/i18n/language-provider";
import { getEvent } from "@/content/events";
import { getFighter } from "@/content/fighters";
import { opsEvent, pipeline, inventory } from "@/content/ops";
import { pick } from "@/lib/i18n";
import { clamp } from "@/lib/utils";
import type { PipelineStage } from "@/types";

export function FightOpsView() {
  const { t, locale } = useI18n();

  const event = getEvent(opsEvent.slug);
  const headliner = getFighter(event?.card[0]?.redSlug);
  const opponentName = t.ops.opponentTBA;

  const stageLabel: Record<PipelineStage, string> = {
    scouting: t.ops.stageScouting,
    signed: t.ops.stageSigned,
    developing: t.ops.stageDeveloping,
    headliner: t.ops.stageHeadliner,
  };

  return (
    <DrawerProvider>
      <PageHero
        kicker={t.ops.kicker}
        title={t.ops.title}
        intro={t.ops.intro}
        backgroundSrc="/media/universal/sections/up-page-ops.png"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="gold">{t.ops.badge}</Badge>
          <DemoBadge />
        </div>
      </PageHero>

      {/* prototype disclaimer */}
      <Container className="pt-6">
        <div className="flex items-start gap-3 rounded-token border border-[color-mix(in_srgb,var(--warn)_35%,transparent)] bg-[color-mix(in_srgb,var(--warn)_8%,transparent)] p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-[var(--warn)]" />
          <p className="text-[length:var(--step--1)] text-fg-2">{t.ops.disclaimer}</p>
        </div>
      </Container>

      {event && (
        <>
          {/* command bar */}
          <Container className="pt-6">
            <ConsoleHeader event={event} />
          </Container>

          {/* 01 — lifecycle */}
          <section className="pt-5">
            <Container>
              <OpsPanel
                title={t.ops.lifecycleHeading}
                icon={Route}
                index="01"
                action={
                  <Badge tone="ok" dot className="uppercase tracking-wide">
                    {t.common.live}
                  </Badge>
                }
              >
                <LifecycleStepper current={event.lifecycle} />
              </OpsPanel>
            </Container>
          </section>

          {/* command card */}
          <section className="pt-5">
            <Container>
              <EventSummaryCard
                event={event}
                headliner={headliner}
                opponentName={opponentName}
                ticketsSold={opsEvent.ticketsSold}
                readinessPct={opsEvent.readinessPct}
                readiness={opsEvent.readiness}
              />
            </Container>
          </section>

          {/* 02 — readiness board */}
          <section id="ops-readiness" className="scroll-mt-24 pt-5">
            <Container>
              <OpsPanel title={t.ops.readinessHeading} icon={Gauge} index="02" frame action={<SampleTag />}>
                <p className="-mt-1 mb-5 text-[length:var(--step--1)] text-fg-2">{t.ops.readinessSub}</p>
                <ReadinessHeatmap pillars={opsEvent.readiness} />
              </OpsPanel>
            </Container>
          </section>

          {/* engine room — textured band */}
          <section className="ops-shell relative mt-12 border-y border-line py-14 sm:py-16">
            <div aria-hidden className="ops-grid pointer-events-none absolute inset-0" />
            <Container className="relative flex flex-col gap-5">
              {/* 03 — sell-through */}
              <div id="ops-sell-through" className="scroll-mt-24">
                <OpsPanel title={t.ops.sellThroughHeading} icon={LineChart} index="03" frame action={<DemoBadge />}>
                  <p className="-mt-1 mb-4 text-[length:var(--step--1)] text-fg-2">{t.ops.sellThroughNote}</p>
                  <SellThroughChart points={opsEvent.sellThrough} capacity={event.venueCapacity ?? 4000} />
                </OpsPanel>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {/* 04 — talent pipeline */}
                <div id="ops-pipeline" className="scroll-mt-24">
                  <OpsPanel title={t.ops.pipelineHeading} icon={Users} index="04" action={<SampleTag />} className="h-full">
                    <p className="-mt-1 mb-4 text-[length:var(--step--1)] text-fg-2">{t.ops.pipelineSub}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {pipeline.map((group) => {
                        const named = group.fighterSlugs.map((s) => getFighter(s)).filter((f) => f !== undefined);
                        const remainder = Math.max(0, group.count - named.length);
                        return (
                          <div key={group.stage} className="rounded-token border border-line bg-bg-2/60 p-3">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="font-mono text-[length:var(--step--2)] uppercase tracking-[0.1em] text-fg-3">
                                {stageLabel[group.stage]}
                              </span>
                              <span className="tabular font-mono text-[length:var(--step-1)] font-bold text-gold">
                                {group.count}
                              </span>
                            </div>
                            <div className="mt-3 flex flex-col gap-2">
                              {named.map((f) => (
                                <FighterCard key={f.slug} fighter={f} />
                              ))}
                              {remainder > 0 && (
                                <span
                                  title={t.ops.notShown}
                                  className="inline-flex items-center justify-center gap-1.5 rounded-token border border-dashed border-line-2 px-2 py-2 font-mono text-[length:var(--step--2)] text-fg-3"
                                >
                                  +{remainder} · {t.ops.notShown}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </OpsPanel>
                </div>

                {/* 05 — run of show */}
                <OpsPanel
                  title={t.ops.runOfShowHeading}
                  icon={CalendarClock}
                  index="05"
                  action={<SampleTag label={t.ops.sampleSchedule} />}
                >
                  <RunOfShowTimeline rows={opsEvent.runOfShow} headliner={headliner} opponentName={opponentName} />
                </OpsPanel>
              </div>

              {/* 06 / 07 — sponsor inventory + media readiness */}
              <div id="ops-sponsors" className="grid scroll-mt-24 gap-5 lg:grid-cols-2">
                <OpsPanel title={t.ops.panelInventory} icon={Megaphone} index="06" recessed action={<SampleTag label={t.ops.sampleFulfillment} />}>
                  <div className="flex flex-col gap-4">
                    {inventory.map((row) => {
                      const pct = clamp(Math.round((row.contracted / row.total) * 100), 0, 100);
                      return (
                        <Meter
                          key={pick(row.label, locale)}
                          label={pick(row.label, locale)}
                          text={`${row.contracted}/${row.total} ${t.ops.contracted}`}
                          pct={pct}
                          tone={pct >= 100 ? "ok" : "gold"}
                        />
                      );
                    })}
                  </div>
                </OpsPanel>

                <OpsPanel title={t.ops.mediaHeading} icon={Film} index="07" recessed action={<SampleTag label={t.ops.sampleFulfillment} />}>
                  <div className="flex flex-col gap-4">
                    {opsEvent.mediaReadiness.map((row) => {
                      const pct = clamp(Math.round((row.done / row.total) * 100), 0, 100);
                      return (
                        <Meter
                          key={pick(row.label, locale)}
                          label={pick(row.label, locale)}
                          text={`${row.done}/${row.total}`}
                          pct={pct}
                          tone={pct >= 100 ? "ok" : "gold"}
                        />
                      );
                    })}
                  </div>
                </OpsPanel>
              </div>
            </Container>
          </section>

          {/* 08 — telemetry */}
          <section id="ops-telemetry" className="scroll-mt-24 py-14 sm:py-16">
            <Container>
              <OpsPanel
                title={t.ops.telemetryHeading}
                icon={Activity}
                index="08"
                action={
                  <div className="flex items-center gap-2">
                    <span className="hidden font-mono text-[length:var(--step--2)] uppercase tracking-[0.1em] text-fg-3 sm:inline">
                      {t.ops.last7Days}
                    </span>
                    <DemoBadge />
                  </div>
                }
              >
                <KpiTelemetry metrics={opsEvent.telemetry} />
              </OpsPanel>
            </Container>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="pb-24 pt-4">
        <Container>
          <div className="ops-card relative overflow-hidden rounded-token-lg border border-line p-10 sm:p-14">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--gold-deep)] to-[var(--gold)]" />
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="max-w-xl font-display text-[length:var(--step-3)] font-bold tracking-tight">
                  {t.ops.ctaTitle}
                </h2>
                <p className="mt-4 max-w-xl text-[length:var(--step-0)] text-fg-2">{t.ops.ctaBody}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <ButtonLink href="/partners" size="lg">
                  {t.actions.partnerWithUs}
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <ExternalLink href="#" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  {t.actions.requestDeck}
                </ExternalLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </DrawerProvider>
  );
}
