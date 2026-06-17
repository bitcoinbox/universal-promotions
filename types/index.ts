import type { Localized } from "@/lib/i18n";

/* ── Fighters ─────────────────────────────────────────────────────────── */

export type DivisionId =
  | "flyweight"
  | "super-flyweight"
  | "bantamweight"
  | "super-bantamweight"
  | "featherweight"
  | "super-featherweight"
  | "lightweight"
  | "super-lightweight"
  | "welterweight"
  | "middleweight";

export type Division = {
  id: DivisionId;
  label: Localized;
  limitLbs: number;
};

export type Stance = "orthodox" | "southpaw";

export type FighterStatus = "champion" | "prospect" | "active";

export type FightRecord = {
  wins: number;
  losses: number;
  draws: number;
  /** Wins that came by knockout (subset of wins). */
  ko: number;
};

/** External handles. Rendered through <ExternalLink> so rel/target are always safe. */
export type SocialLinks = {
  instagram?: string;
  x?: string;
  youtube?: string;
};

export type Fighter = {
  slug: string;
  name: string;
  nickname?: Localized;
  /** One-line marketable story hook (the angle, not the résumé). */
  tagline: Localized;
  status: FighterStatus;
  division?: DivisionId;
  stance?: Stance;
  hometown?: string;
  age?: number;
  record?: FightRecord;
  /** Accent hue (deg) used to seed the generated portrait gradient (photo fallback). */
  hue: number;
  /** Real fighter photo (public sourced). When present, replaces the generated portrait. */
  imageSrc?: string;
  /** object-position for the photo crop, e.g. "50% 20%". Defaults to center-top. */
  imageFocus?: string;
  bio: Localized;
  social?: SocialLinks;
};

/* ── Events ───────────────────────────────────────────────────────────── */

export type EventStatus = "upcoming" | "past";

export type TicketStatus = "on-sale" | "limited" | "sold-out" | "announced";

/**
 * The full promotional lifecycle of a card. Drives the event-page status stepper and
 * tells the "content before / during / after" story. Ordered.
 */
export type EventLifecycle =
  | "announced"
  | "tickets-live"
  | "fight-week"
  | "live"
  | "results-posted"
  | "recap-published";

export const eventLifecycleOrder: EventLifecycle[] = [
  "announced",
  "tickets-live",
  "fight-week",
  "live",
  "results-posted",
  "recap-published",
];

export type Broadcast = {
  /** Display name of the network or platform. */
  name: string;
  kind: "tv" | "streaming";
};

/**
 * A bout side is EITHER a roster fighter (by slug, links to their profile) OR an inline
 * opponent (name + optional record, no profile) — so events can feature real opponents
 * without adding every opponent to the roster.
 */
export type Bout = {
  redSlug?: string;
  blueSlug?: string;
  redName?: string;
  blueName?: string;
  redRecord?: FightRecord;
  blueRecord?: FightRecord;
  divisionId: DivisionId;
  rounds?: number;
  isTitle?: boolean;
  titleLabel?: Localized;
  /** Present only for past events. */
  result?: BoutResult;
};

export type BoutResult = {
  /** Winner by roster slug, or by inline opponent name. */
  winnerSlug?: string;
  winnerName?: string;
  method: "KO" | "TKO" | "UD" | "SD" | "MD" | "Draw";
  round?: number;
};

export type FightEvent = {
  slug: string;
  name: Localized;
  /** Optional official / source poster image used instead of the generated event art. */
  posterSrc?: string;
  /** Decorative action image for event promo surfaces. */
  actionImageSrc?: string;
  /** Local decorative action video for event promo surfaces. */
  actionVideoSrc?: string;
  /** Optional fight footage used as muted decorative motion around this event. */
  highlightVideo?: {
    youtubeId: string;
    title: string;
    sourceUrl: string;
    sourceLabel: string;
    thumbnailSrc?: string;
    start?: number;
    end?: number;
  };
  /** Event-level public description, sourced from official/social copy when available. */
  summary?: Localized;
  /** Ticketing destination when a real public URL is available. */
  ticketUrl?: string;
  /** ISO date (date-only; no fabricated exact times beyond the card). */
  date: string;
  doorsTime?: string;
  venue: string;
  city: string;
  /** Short venue descriptor (neighborhood / character), used on the venue block. */
  venueNote?: Localized;
  status: EventStatus;
  lifecycle: EventLifecycle;
  ticketStatus: TicketStatus;
  /** Venue seated capacity reference — NOT reported attendance. */
  venueCapacity?: number;
  broadcasts: Broadcast[];
  /** Ordered: main event first, then co-main, then undercard. */
  card: Bout[];
  /** Sponsor slugs visible on the night. */
  sponsorSlugs: string[];
  hue: number;
  recap?: Localized;
};

/* ── Sponsors / partners ──────────────────────────────────────────────── */

export type SponsorTier = "presenting" | "official" | "supporting";

export type Sponsor = {
  slug: string;
  name: string;
  /** Fictional category so nothing implies a real-world partnership. */
  category: Localized;
  tier: SponsorTier;
  hue: number;
};

export type SponsorPackage = {
  id: string;
  name: Localized;
  tier: SponsorTier;
  /** Short positioning line. */
  summary: Localized;
  inclusions: Localized<string[]>;
  featured?: boolean;
};

export type HospitalityPackage = {
  id: string;
  name: Localized;
  /** Party size / format, e.g. "Table of 10". */
  capacity: Localized;
  summary: Localized;
  features: Localized<string[]>;
};

/** A single line item in the sample sponsor recap report (all demo data). */
export type RecapMetric = {
  label: Localized;
  value: string;
  /** Optional delta vs. previous event, e.g. "+12%". */
  delta?: string;
  hint?: Localized;
};

export type RecapPlacement = {
  label: Localized;
  impressions: string;
  /** 0–100 share-of-screen style figure for the bar. */
  share: number;
};

/* ── Media (content engine) ──────────────────────────────────────────────
   Repeatable content categories that a fight card naturally generates before,
   during, and after the event. Every asset carries source + rights + relations,
   mirroring BACKEND_MEDIA_CONTRACT.md so this can later swap to a real API. */

export type MediaFormat = "article" | "gallery" | "video" | "podcast";

export type MediaCategory =
  | "announcement"
  | "press-conference"
  | "open-workout"
  | "weigh-in"
  | "faceoff"
  | "fight-night"
  | "result"
  | "recap"
  | "highlight"
  | "interview"
  | "podcast"
  | "sponsor-recap";

/** Coarse timeline phase a category belongs to (derived in lib/data). */
export type MediaPhase = "build-up" | "fight-night" | "aftermath";

/** Where an asset originated. */
export type MediaSource = "website" | "instagram" | "facebook" | "tiktok" | "youtube" | "podcast" | "manual" | "generated";

/** Usage/rights posture — present on EVERY media record. */
export type RightsStatus = "public_reference" | "permission_needed" | "embed_only" | "owned" | "generated" | "unknown";

export type MediaItem = {
  slug: string;
  category: MediaCategory;
  format: MediaFormat;
  title: Localized;
  excerpt: Localized;
  date: string;
  hue: number;
  /** For video assets. */
  runtime?: string;
  /** For galleries. */
  itemCount?: number;
  /** Public provenance. External links render through safe link helpers. */
  sourceUrl?: string;
  /** Preferred embed target for YouTube/podcast items when available. */
  embedUrl?: string;
  thumbnailUrl?: string;
  /** Connections back to the event and fighters this asset covers. */
  relatedEventSlug?: string;
  relatedFighterSlugs?: string[];
  source: MediaSource;
  rightsStatus: RightsStatus;
  /** Prototype/generated demo content (true across v1). */
  isDemo: boolean;
};

/* ── Fight Ops (prototype dashboard) ─────────────────────────────────── */

export type OpsKpi = {
  id: string;
  label: Localized;
  value: string;
  delta?: string;
  trend: "up" | "down" | "flat";
};

export type PipelineStage = "scouting" | "signed" | "developing" | "headliner";

export type InventoryRow = {
  label: Localized;
  contracted: number;
  total: number;
};

export type PipelineGroup = {
  stage: PipelineStage;
  count: number;
  /** Representative roster fighters at this stage (may be empty for unsigned scouting). */
  fighterSlugs: string[];
};

/* ── Fight Ops: single-event operations console (prototype) ──────────────
   One cohesive demo object scoped to the ONE real card (queen-of-the-ring).
   The event's real facts (date, venue, capacity, headliner, opponent) are
   read live from content/events.ts + content/fighters.ts and never copied
   here; only the illustrative operating figures live in this shape. Every
   number is clearly labeled "(Sample)" in the UI. */

/** Operational readiness verdict for a pillar. Drives the heat-map badge color. */
export type ReadinessStatus = "ready" | "at-risk" | "blocked";

/** One of the six operating pillars tracked toward fight night. */
export type ReadinessPillar = {
  /** Stable id, also used as the scroll-anchor target. */
  id: "venue" | "ticketing" | "talent" | "broadcast" | "sponsors" | "media";
  /** Illustrative readiness percentage (0–100). */
  pct: number;
  status: ReadinessStatus;
  /** The one real fact for this pillar (e.g. seats, headliner status). */
  note: Localized;
};

/** A cumulative ticket-sales point on the illustrative sell-through curve. */
export type SellThroughPoint = {
  /** Relative-window label (e.g. "On sale", "Wk 2", "Today") — NOT a calendar date. */
  dayLabel: Localized;
  /** Cumulative tickets sold by this point (never exceeds the real capacity). */
  sold: number;
};

/** A row in the illustrative run-of-show timeline. */
export type RunOfShowRow = {
  id: string;
  /** Clock time label. Only the doors row time is real. */
  time: string;
  kind: "doors" | "undercard" | "comain" | "main" | "final" | "interview";
  /** True only for rows whose facts are real (doors time, the main-event bout). */
  real: boolean;
};

/** A KPI telemetry tile: a metric value plus a 7-point trend sparkline (shape only). */
export type TelemetryMetric = {
  id: string;
  label: Localized;
  value: string;
  delta?: string | null;
  trend: "up" | "down" | "flat";
  /** 7 sample points — used only for the sparkline shape, not exact figures. */
  spark: number[];
};

/** A media-fulfillment stream rendered as a Meter. */
export type MediaReadinessRow = {
  label: Localized;
  done: number;
  total: number;
};

/** The whole single-event ops console payload (all figures illustrative). */
export type OpsEvent = {
  /** Real event slug this console is scoped to. */
  slug: string;
  ticketsSold: number;
  readinessPct: number;
  readiness: ReadinessPillar[];
  sellThrough: SellThroughPoint[];
  runOfShow: RunOfShowRow[];
  mediaReadiness: MediaReadinessRow[];
  telemetry: TelemetryMetric[];
};

/* ── Legal / compliance ──────────────────────────────────────────────── */

export type LegalDoc = {
  slug: string;
  title: Localized;
  summary: Localized;
  updated: string;
  sections: { heading: Localized; body: Localized }[];
};

/* ── Contact / inquiries ─────────────────────────────────────────────── */

export type InquiryTopic =
  | "tickets"
  | "sponsorship"
  | "media-credentials"
  | "fighter-management"
  | "general";
