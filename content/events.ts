import type { FightEvent } from "@/types";
import { ticketsUrl } from "@/lib/site";

/**
 * EVENT SCHEDULE.
 * Only real, confirmed events go here. Queen of the Ring is a real Universal Promotions card
 * (official poster + ticket link). Opponents/undercard that aren't confirmed are shown as
 * "To be announced" — NO opponent names, records, or results are invented. Fill in the rest
 * of the card (and add new events) as they're officially announced.
 */
const TBD = "To be announced";

export const events: FightEvent[] = [
  {
    slug: "queen-of-the-ring",
    name: { en: "Queen of the Ring", es: "Queen of the Ring" },
    posterSrc: "/media/universal/events/queen-of-the-ring-july-11-clean.png",
    actionImageSrc: "/media/universal/youtube/kiria-tapia-action-bg.jpg",
    actionVideoSrc: "/media/universal/instagram/instagram-reel-5.mp4",
    summary: {
      en: "Universal Promotions presents Queen of the Ring in San Juan — undefeated San Juan prospect Kiria Tapia headlines in front of her people. Full card to be announced.",
      es: "Universal Promotions presenta Queen of the Ring en San Juan — la prospecto invicta sanjuanera Kiria Tapia encabeza ante su gente. Cartelera completa por anunciar.",
    },
    ticketUrl: ticketsUrl,
    date: "2026-07-11",
    doorsTime: "6:00 PM",
    venue: "Coliseíto Pedrín Zorrilla",
    city: "San Juan, PR",
    venueNote: { en: "San Juan fight-night venue", es: "Sede de boxeo en San Juan" },
    status: "upcoming",
    lifecycle: "tickets-live",
    ticketStatus: "on-sale",
    venueCapacity: 4000,
    broadcasts: [],
    hue: 286,
    sponsorSlugs: [],
    card: [
      {
        redSlug: "kiria-tapia",
        blueName: TBD,
        divisionId: "super-featherweight",
      },
    ],
  },
];

const eventsBySlug = new Map(events.map((e) => [e.slug, e]));

export function getEvent(slug: string): FightEvent | undefined {
  return eventsBySlug.get(slug);
}

export const upcomingEvents = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));

export const pastEvents = events
  .filter((e) => e.status === "past")
  .sort((a, b) => b.date.localeCompare(a.date));

/** The single next event on the calendar (earliest upcoming). */
export const nextEvent = upcomingEvents[0];

/** Derive a fighter's next scheduled bout from the event data — the source of truth. */
export function getFighterNextEvent(fighterSlug: string): FightEvent | undefined {
  return upcomingEvents.find((e) =>
    e.card.some((b) => b.redSlug === fighterSlug || b.blueSlug === fighterSlug),
  );
}
