/**
 * Data-access layer — the single intended surface for reading site data.
 *
 * Today every function reads typed local mock data from `content/*`. Because the UI goes
 * through this layer, swapping to a real backend later means changing only this file (and
 * making these functions async) — the components don't change. The functions deliberately
 * mirror BACKEND_MEDIA_CONTRACT.md's suggested API surface (events, fighters, media,
 * sponsors, dashboard).
 *
 * Two kinds of data, kept conceptually separate:
 *   • PUBLIC CATALOG — factual public-facing data (fighters, events, sponsors, media, legal)
 *   • DEMO / OPERATIONAL — illustrative prototype metrics (Fight Ops dashboard, recap report)
 *     Always surfaced with a "demo data" marker in the UI.
 */
import { divisions, divisionOrder } from "@/content/divisions";
import { fighters, getFighter } from "@/content/fighters";
import {
  events,
  getEvent,
  upcomingEvents,
  pastEvents,
  nextEvent,
  getFighterNextEvent,
} from "@/content/events";
import { mediaItems, getMediaItem } from "@/content/media";
import {
  sponsors,
  getSponsor,
  sponsorPackages,
  hospitalityPackages,
  audienceValue,
} from "@/content/sponsors";
import { legalDocs, getLegalDoc } from "@/content/legal";
import type { Bout, FightEvent, MediaCategory, MediaItem, MediaPhase, Sponsor } from "@/types";

/* ── Public catalog ──────────────────────────────────────────────────── */
export {
  divisions,
  divisionOrder,
  fighters,
  getFighter,
  events,
  getEvent,
  upcomingEvents,
  pastEvents,
  nextEvent,
  getFighterNextEvent,
  mediaItems,
  getMediaItem,
  sponsors,
  getSponsor,
  sponsorPackages,
  hospitalityPackages,
  audienceValue,
  legalDocs,
  getLegalDoc,
};

/** Resolve an event's sponsor records, preserving order. */
export function getEventSponsors(event: FightEvent): Sponsor[] {
  return event.sponsorSlugs.map(getSponsor).filter((s): s is Sponsor => s !== undefined);
}

/* ── Media content engine ────────────────────────────────────────────── */

const phaseByCategory: Record<MediaCategory, MediaPhase> = {
  announcement: "build-up",
  "press-conference": "build-up",
  "open-workout": "build-up",
  "weigh-in": "build-up",
  faceoff: "build-up",
  "fight-night": "fight-night",
  result: "fight-night",
  highlight: "fight-night",
  recap: "aftermath",
  interview: "aftermath",
  podcast: "aftermath",
  "sponsor-recap": "aftermath",
};

export function mediaPhase(category: MediaCategory): MediaPhase {
  return phaseByCategory[category];
}

const byDateDesc = (a: MediaItem, b: MediaItem) => b.date.localeCompare(a.date);

export function getAllMedia(): MediaItem[] {
  return [...mediaItems].sort(byDateDesc);
}

export function getMediaForEvent(eventSlug: string): MediaItem[] {
  return getAllMedia().filter((m) => m.relatedEventSlug === eventSlug);
}

export function getMediaForFighter(fighterSlug: string): MediaItem[] {
  return getAllMedia().filter((m) => m.relatedFighterSlugs?.includes(fighterSlug));
}

/* ── Fighter fight history ───────────────────────────────────────────── */

export type FighterFight = { event: FightEvent; bout: Bout };

/** Every bout (past + upcoming) a fighter appears on, newest first. */
export function getFighterFights(fighterSlug: string): FighterFight[] {
  const out: FighterFight[] = [];
  for (const event of events) {
    for (const bout of event.card) {
      if (bout.redSlug === fighterSlug || bout.blueSlug === fighterSlug) out.push({ event, bout });
    }
  }
  return out.sort((a, b) => b.event.date.localeCompare(a.event.date));
}
