import type { InventoryRow, OpsEvent, OpsKpi, PipelineGroup } from "@/types";

/**
 * PROTOTYPE FIGHT-OPS DATA — illustrative demo data only.
 * Every KPI, count, percentage, and figure here exists to demonstrate the operations
 * interface. None of it is live, measured, or official. The console is scoped to the ONE
 * real card on the calendar (queen-of-the-ring); that event's real facts (date, venue,
 * 4,000 capacity, headliner Kiria Tapia, "opponent to be announced") are read live from
 * content/events.ts + content/fighters.ts and are NEVER duplicated here.
 */

/** Home-page operating snapshot tiles (kept for the homepage KPI block). */
export const opsKpis: OpsKpi[] = [
  { id: "events", label: { en: "Events this season", es: "Eventos esta temporada" }, value: "6", delta: "+2", trend: "up" },
  { id: "roster", label: { en: "Active roster", es: "Roster activo" }, value: "12", trend: "flat" },
  { id: "tickets", label: { en: "Tickets sold (season)", es: "Boletos vendidos (temporada)" }, value: "41,200", delta: "+18%", trend: "up" },
  { id: "inventory", label: { en: "Sponsor inventory sold", es: "Inventario de auspicio vendido" }, value: "82%", delta: "+6 pts", trend: "up" },
  { id: "assets", label: { en: "Media assets delivered", es: "Material de prensa entregado" }, value: "1,940", delta: "+210", trend: "up" },
  { id: "audience", label: { en: "Avg. broadcast audience", es: "Audiencia promedio" }, value: "172K", delta: "+9%", trend: "up" },
];

/**
 * Fighter pipeline. Only REAL roster slugs appear; the scouting/signed groups carry a
 * count but NO names (those prospects aren't real people) — they render as anonymized
 * "+N in scouting" chips so nothing is fabricated.
 */
export const pipeline: PipelineGroup[] = [
  { stage: "scouting", count: 8, fighterSlugs: [] },
  { stage: "signed", count: 5, fighterSlugs: [] },
  { stage: "developing", count: 4, fighterSlugs: ["kiria-tapia", "mathew-soto"] },
  { stage: "headliner", count: 3, fighterSlugs: ["olajuwon-acosta", "stephanie-pineiro", "orlando-gonzalez"] },
];

/** Sponsor placement inventory — real generic placement categories, sample fulfillment counts. */
export const inventory: InventoryRow[] = [
  { label: { en: "Ring canvas (center)", es: "Lona del ring (centro)" }, contracted: 1, total: 1 },
  { label: { en: "Ringside LED", es: "LED a pie de ring" }, contracted: 9, total: 12 },
  { label: { en: "Apron & ring posts", es: "Faldón y postes" }, contracted: 6, total: 8 },
  { label: { en: "Broadcast integrations", es: "Integraciones en transmisión" }, contracted: 3, total: 4 },
  { label: { en: "Social cutdown series", es: "Series de cortes sociales" }, contracted: 5, total: 6 },
  { label: { en: "Concourse signage", es: "Rotulación de pasillos" }, contracted: 14, total: 20 },
];

/**
 * SINGLE-EVENT OPERATIONS CONSOLE payload, scoped to queen-of-the-ring.
 * Every number below is ILLUSTRATIVE — not live, not official. The real anchors
 * (date, venue, 4,000 capacity, Kiria Tapia, "opponent to be announced") come from
 * getEvent("queen-of-the-ring") + getFighter("kiria-tapia").
 */
export const opsEvent: OpsEvent = {
  slug: "queen-of-the-ring", // REAL anchor (events.ts is the source of truth)
  ticketsSold: 2847, // illustrative — vs the real 4,000 capacity (71%)
  readinessPct: 66, // illustrative overall readiness for the ring gauge

  // Six operating pillars. The % is illustrative; the one real fact per row is real.
  readiness: [
    { id: "venue", pct: 83, status: "ready", note: { en: "5 of 6 prep items", es: "5 de 6 preparativos" } },
    { id: "ticketing", pct: 71, status: "ready", note: { en: "2,847 / 4,000 seats", es: "2,847 / 4,000 asientos" } },
    { id: "talent", pct: 50, status: "at-risk", note: { en: "Headliner confirmed · opponent TBA", es: "Estelarista confirmada · rival por anunciar" } },
    { id: "broadcast", pct: 40, status: "blocked", note: { en: "Crew booked · partner pending", es: "Equipo reservado · socio pendiente" } },
    { id: "sponsors", pct: 67, status: "at-risk", note: { en: "8 of 12 placements", es: "8 de 12 ubicaciones" } },
    { id: "media", pct: 64, status: "at-risk", note: { en: "16 of 25 assets", es: "16 de 25 archivos" } },
  ],

  // Illustrative cumulative sell-through — never exceeds the real 4,000; relative-window
  // labels (NO invented on-sale date).
  sellThrough: [
    { dayLabel: { en: "On sale", es: "A la venta" }, sold: 0 },
    { dayLabel: { en: "Day 2", es: "Día 2" }, sold: 640 },
    { dayLabel: { en: "Day 4", es: "Día 4" }, sold: 1120 },
    { dayLabel: { en: "Wk 1", es: "Sem 1" }, sold: 1580 },
    { dayLabel: { en: "Wk 2", es: "Sem 2" }, sold: 2010 },
    { dayLabel: { en: "Wk 3", es: "Sem 3" }, sold: 2390 },
    { dayLabel: { en: "Wk 4", es: "Sem 4" }, sold: 2620 },
    { dayLabel: { en: "Today", es: "Hoy" }, sold: 2847 },
  ],

  // "Sample schedule" — only the doors time and the main-event bout (Kiria vs TBA) are real.
  runOfShow: [
    { id: "doors", time: "6:00 PM", kind: "doors", real: true },
    { id: "undercard", time: "6:30 PM", kind: "undercard", real: false },
    { id: "comain", time: "8:30 PM", kind: "comain", real: false },
    { id: "main", time: "9:15 PM", kind: "main", real: true },
    { id: "final", time: "10:15 PM", kind: "final", real: false },
    { id: "interview", time: "10:30 PM", kind: "interview", real: false },
  ],

  // Illustrative media fulfillment — feeds three Meters.
  mediaReadiness: [
    { label: { en: "Pre-event assets", es: "Material previo" }, done: 12, total: 16 },
    { label: { en: "Fight-night assets", es: "Material de la pelea" }, done: 4, total: 6 },
    { label: { en: "Aftermath (projected)", es: "Post-evento (proyectado)" }, done: 0, total: 3 },
  ],

  // Illustrative telemetry; sparkline arrays are shape-only (not exact figures).
  telemetry: [
    { id: "tickets", label: { en: "Tickets sold", es: "Boletos vendidos" }, value: "2,847", delta: "+341", trend: "up", spark: [1580, 2010, 2210, 2390, 2510, 2620, 2847] },
    { id: "sponsors", label: { en: "Sponsor placements", es: "Ubicaciones de auspicio" }, value: "8/12", delta: "+1", trend: "up", spark: [4, 5, 5, 6, 7, 7, 8] },
    { id: "media", label: { en: "Media delivered", es: "Material entregado" }, value: "16/25", delta: "+4", trend: "up", spark: [6, 8, 9, 11, 12, 14, 16] },
    { id: "medical", label: { en: "Medical clearances", es: "Avales médicos" }, value: "1/1", delta: null, trend: "flat", spark: [0, 0, 1, 1, 1, 1, 1] },
    { id: "broadcast", label: { en: "Broadcast cameras", es: "Cámaras de transmisión" }, value: "4/6", delta: null, trend: "flat", spark: [2, 3, 3, 4, 4, 4, 4] },
    { id: "venue", label: { en: "Venue setup", es: "Montaje de sede" }, value: "83%", delta: "+12%", trend: "up", spark: [40, 55, 62, 70, 75, 80, 83] },
  ],
};
