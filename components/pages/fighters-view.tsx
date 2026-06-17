"use client";

import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { Roster } from "@/components/fighters/roster";
import { useI18n } from "@/components/i18n/language-provider";
import { fighters } from "@/content/fighters";
import type { FightRecord } from "@/types";

function recordLabel(record?: FightRecord) {
  if (!record) return null;
  return `${record.wins}-${record.losses}${record.draws ? `-${record.draws}` : ""} · ${record.ko} KO`;
}

export function FightersView() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        kicker={t.fighters.kicker}
        title={t.fighters.title}
        intro={t.fighters.intro}
        backgroundSrc="/media/universal/sections/up-page-fighters.png"
      >
        <div className="flex max-w-4xl flex-wrap gap-2">
          {fighters.map((fighter) => (
            <Link
              key={fighter.slug}
              href={`/fighters/${fighter.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-bg/55 px-3.5 py-2 text-[length:var(--step--1)] text-fg-2 backdrop-blur-sm transition-colors hover:border-gold/45 hover:text-fg"
            >
              <span className="font-semibold text-fg">{fighter.name}</span>
              {fighter.record && <span className="font-mono text-[length:var(--step--2)] text-gold">{recordLabel(fighter.record)}</span>}
            </Link>
          ))}
        </div>
      </PageHero>
      <section className="py-12 sm:py-16">
        <Container>
          <Roster />
        </Container>
      </section>
    </>
  );
}
