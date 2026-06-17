"use client";

import { TrendingUp } from "lucide-react";
import { DemoBadge } from "@/components/ui/demo-badge";
import { SponsorLogo } from "@/components/brand/sponsor-logo";
import { useI18n } from "@/components/i18n/language-provider";
import { recapMetrics, recapPlacements, recapReportEventSlug, getSponsor } from "@/content/sponsors";
import { getEvent } from "@/content/events";
import { pick } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

/** Polished preview of the post-event report a partner receives. All figures are demo. */
export function RecapReport() {
  const { t, locale } = useI18n();
  const event = getEvent(recapReportEventSlug);
  const sponsor = getSponsor("coqui-energy");

  return (
    <div className="overflow-hidden rounded-token-lg border border-line-2 bg-surface shadow-[var(--shadow-elev)]">
      {/* report header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-bg-2 px-6 py-5">
        <div>
          <span className="kicker">{t.partners.recapTitle}</span>
          {event && (
            <p className="mt-1 font-display text-[length:var(--step-1)] font-bold text-fg">
              {pick(event.name, locale)}
              <span className="ml-2 font-sans text-[length:var(--step--1)] font-normal text-fg-3">
                · {formatDate(event.date, locale)}
              </span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {sponsor && <SponsorLogo name={sponsor.name} hue={sponsor.hue} className="h-10 w-36" />}
          <DemoBadge />
        </div>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-b border-line p-6 sm:grid-cols-3">
        {recapMetrics.map((m) => (
          <div key={pick(m.label, locale)} className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="tabular font-mono text-[length:var(--step-2)] font-bold leading-none text-fg">
                {m.value}
              </span>
              {m.delta && (
                <span className="tabular inline-flex items-center gap-0.5 text-[length:var(--step--2)] font-semibold text-[var(--ok)]">
                  <TrendingUp className="size-3" />
                  {m.delta}
                </span>
              )}
            </div>
            <span className="kicker">{pick(m.label, locale)}</span>
            {m.hint && <span className="text-[length:var(--step--2)] text-fg-3">{pick(m.hint, locale)}</span>}
          </div>
        ))}
      </div>

      {/* placement share */}
      <div className="p-6">
        <span className="kicker">{t.partners.values.exposureTitle}</span>
        <div className="mt-4 flex flex-col gap-4">
          {recapPlacements.map((p) => (
            <div key={pick(p.label, locale)}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-[length:var(--step--1)]">
                <span className="text-fg-2">{pick(p.label, locale)}</span>
                <span className="tabular font-mono font-semibold text-fg">{p.impressions}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-bg-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${p.share}%`,
                    background: "linear-gradient(90deg, var(--gold-deep), var(--gold))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
