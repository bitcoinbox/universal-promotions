"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useI18n } from "@/components/i18n/language-provider";
import { getLegalDoc } from "@/content/legal";
import { pick } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

export function LegalView({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="-mx-2 inline-flex items-center gap-1.5 rounded-token px-2 py-2 text-[length:var(--step--1)] text-fg-2 transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" />
          {t.legal.backHome}
        </Link>

        <span className="kicker mt-6 block">{t.legal.sectionTitle}</span>
        <h1 className="mt-2 font-display text-[length:var(--step-2)] font-bold tracking-tight">
          {pick(doc.title, locale)}
        </h1>
        <p className="mt-3 text-[length:var(--step-0)] text-fg-2">{pick(doc.summary, locale)}</p>
        <p className="mt-2 text-[length:var(--step--2)] text-fg-3">
          {t.legal.updated}: {formatDate(doc.updated, locale)}
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-token border border-[color-mix(in_srgb,var(--warn)_30%,transparent)] bg-[color-mix(in_srgb,var(--warn)_7%,transparent)] p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-[var(--warn)]" />
          <p className="text-[length:var(--step--1)] text-fg-2">{t.legal.notice}</p>
        </div>

        <div className="mt-10 flex flex-col gap-8">
          {doc.sections.map((section) => (
            <section
              key={pick(section.heading, locale)}
              className="border-t border-line pt-8 first:border-t-0 first:pt-0"
            >
              <h2 className="font-display text-[length:var(--step-1)] font-bold tracking-tight text-fg">
                {pick(section.heading, locale)}
              </h2>
              <p className="mt-2 max-w-[68ch] leading-relaxed text-fg-2">{pick(section.body, locale)}</p>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
