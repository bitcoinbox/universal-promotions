"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X, ArrowRight, MapPin, Swords, Calendar } from "lucide-react";
import { Portrait } from "@/components/brand/portrait";
import { RecordLine } from "@/components/fighters/record-line";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/language-provider";
import { getFighter } from "@/content/fighters";
import { getFighterNextEvent } from "@/content/events";
import { divisions } from "@/content/divisions";
import { pick } from "@/lib/i18n";
import { cn, formatDate } from "@/lib/utils";

type DrawerApi = { open: (slug: string) => void };
const DrawerContext = createContext<DrawerApi | null>(null);

/** Open the shared fighter drawer from any card. Returns null outside a DrawerProvider. */
export function useDrawer(): DrawerApi | null {
  return useContext(DrawerContext);
}

/**
 * Hosts the single shared slide-in fighter drawer for the Fight Ops console. Any fighter
 * card (pipeline, summary, timeline) calls useDrawer().open(slug); only this one client
 * island carries the drawer weight. Closes on Escape, backdrop click, and the close button.
 */
export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  const open = useCallback((s: string) => setSlug(s), []);
  const close = useCallback(() => setSlug(null), []);

  return (
    <DrawerContext.Provider value={{ open }}>
      {children}
      <FighterDrawer slug={slug} onClose={close} />
    </DrawerContext.Provider>
  );
}

function FighterDrawer({ slug, onClose }: { slug: string | null; onClose: () => void }) {
  const { t, locale } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = slug !== null;
  const fighter = slug ? getFighter(slug) : undefined;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const nextEvent = fighter ? getFighterNextEvent(fighter.slug) : undefined;
  const division = fighter?.division ? divisions[fighter.division] : undefined;

  return (
    <div
      aria-hidden={!open}
      className={cn("fixed inset-0 z-[80]", open ? "pointer-events-auto" : "pointer-events-none")}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-[rgba(8,9,12,0.66)] backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={fighter ? fighter.name : "Fighter detail"}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-line bg-surface shadow-[var(--shadow-lg)] transition-transform duration-300 ease-[var(--ease)] will-change-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <span className="kicker text-gold">{t.common.fighters}</span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={t.actions.closeMenu}
            className="grid size-9 place-items-center rounded-token border border-line text-fg-2 transition-colors hover:border-line-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-gold"
          >
            <X className="size-4" />
          </button>
        </header>

        {fighter && (
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="flex items-center gap-4">
              <Portrait
                name={fighter.name}
                hue={fighter.hue}
                imageSrc={fighter.imageSrc}
                imageFocus={fighter.imageFocus}
                ratio="square"
                sizes="96px"
                className="size-24 shrink-0 rounded-token"
              />
              <div className="min-w-0">
                <h3 className="font-display text-[length:var(--step-2)] leading-tight text-fg">{fighter.name}</h3>
                {fighter.nickname && (
                  <p className="text-[length:var(--step--1)] italic text-gold">“{pick(fighter.nickname, locale)}”</p>
                )}
                <Badge
                  tone={fighter.status === "champion" ? "gold" : fighter.status === "prospect" ? "accent" : "neutral"}
                  className="mt-2 uppercase tracking-wide"
                >
                  {t.common[fighter.status]}
                </Badge>
              </div>
            </div>

            <dl className="mt-6 flex flex-col divide-y divide-line">
              {fighter.record && (
                <Row label={t.common.record}>
                  <RecordLine record={fighter.record} />
                </Row>
              )}
              {division && (
                <Row label={t.common.division}>
                  <span className="inline-flex items-center gap-1.5">
                    <Swords className="size-3.5 text-gold" />
                    {pick(division.label, locale)}
                  </span>
                </Row>
              )}
              {fighter.stance && (
                <Row label={t.common.stance}>{fighter.stance === "southpaw" ? t.common.southpaw : t.common.orthodox}</Row>
              )}
              {fighter.hometown && (
                <Row label={t.common.hometown}>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-gold" />
                    {fighter.hometown}
                  </span>
                </Row>
              )}
              {nextEvent && (
                <Row label={t.common.nextFight}>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-gold" />
                    {formatDate(nextEvent.date, locale, { month: "short", day: "numeric" })} · {pick(nextEvent.name, locale)}
                  </span>
                </Row>
              )}
            </dl>

            <p className="mt-5 text-[length:var(--step--1)] leading-relaxed text-fg-2">{pick(fighter.bio, locale)}</p>

            <ButtonLink href={`/fighters/${fighter.slug}`} variant="outline" size="md" className="mt-6 w-full justify-center">
              {t.actions.viewFighter}
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        )}
      </aside>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 text-[length:var(--step--1)]">
      <dt className="kicker">{label}</dt>
      <dd className="text-right text-fg">{children}</dd>
    </div>
  );
}
