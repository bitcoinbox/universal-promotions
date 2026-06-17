import type { HospitalityPackage, RecapMetric, RecapPlacement, Sponsor, SponsorPackage } from "@/types";

/**
 * PROTOTYPE SPONSORS — every brand below is fictional and invented for this concept.
 * None of these names represent a real company or an actual partnership with Universal
 * Promotions. Categories are illustrative.
 */
export const sponsors: Sponsor[] = [
  { slug: "coqui-energy", name: "Coquí Energy", tier: "presenting", hue: 150, category: { en: "Energy drink", es: "Bebida energética" } },
  { slug: "banco-isla", name: "Banco Isla", tier: "presenting", hue: 210, category: { en: "Banking", es: "Banca" } },
  { slug: "bahia-telecom", name: "Bahía Telecom", tier: "official", hue: 196, category: { en: "Telecom", es: "Telecomunicaciones" } },
  { slug: "marca-boricua", name: "Marca Boricua", tier: "official", hue: 36, category: { en: "Spirits", es: "Licores" } },
  { slug: "sol-arena", name: "Sol y Arena Resorts", tier: "official", hue: 28, category: { en: "Hospitality", es: "Hospitalidad" } },
  { slug: "platano-foods", name: "Plátano Foods", tier: "official", hue: 96, category: { en: "Food & beverage", es: "Alimentos y bebidas" } },
  { slug: "vega-motors", name: "Vega Motors", tier: "supporting", hue: 220, category: { en: "Automotive", es: "Automotriz" } },
  { slug: "el-faro-seguros", name: "El Faro Seguros", tier: "supporting", hue: 250, category: { en: "Insurance", es: "Seguros" } },
  { slug: "nube-cloud", name: "Nube", tier: "supporting", hue: 264, category: { en: "Technology", es: "Tecnología" } },
  { slug: "fortaleza-co", name: "Fortaleza Co.", tier: "supporting", hue: 12, category: { en: "Sportswear", es: "Ropa deportiva" } },
];

const sponsorsBySlug = new Map(sponsors.map((s) => [s.slug, s]));

export function getSponsor(slug: string): Sponsor | undefined {
  return sponsorsBySlug.get(slug);
}

export const sponsorPackages: SponsorPackage[] = [
  {
    id: "presenting",
    tier: "presenting",
    name: { en: "Presenting Partner", es: "Auspiciador Presentador" },
    summary: {
      en: "Top billing across the card and the broadcast — the brand the night is presented by.",
      es: "Máxima jerarquía en la cartelera y la transmisión — la marca que presenta la noche.",
    },
    featured: true,
    inclusions: {
      en: [
        "Event title integration (\"presented by\")",
        "Ring canvas center logo",
        "Broadcast lower-third and bumper integrations",
        "Premium ringside LED rotation",
        "Presenting tag on all social cutdowns",
        "Hospitality suite + ringside seating",
        "Full post-event recap report",
      ],
      es: [
        "Integración en el título del evento (\"presentado por\")",
        "Logo central en la lona del ring",
        "Integraciones en transmisión (lower-third y bumpers)",
        "Rotación premium en LED a pie de ring",
        "Mención de presentador en todos los cortes sociales",
        "Suite de hospitalidad + asientos a pie de ring",
        "Reporte de recap post-evento completo",
      ],
    },
  },
  {
    id: "official",
    tier: "official",
    name: { en: "Official Partner", es: "Auspiciador Oficial" },
    summary: {
      en: "Category exclusivity with strong, repeated on-camera presence.",
      es: "Exclusividad de categoría con presencia fuerte y repetida frente a cámara.",
    },
    inclusions: {
      en: [
        "Category exclusivity for the card",
        "Ring apron or ring-post placement",
        "Ringside LED rotation",
        "Sponsor of a designated social cutdown series",
        "Allocation of tickets and credentials",
        "Post-event recap report",
      ],
      es: [
        "Exclusividad de categoría para la cartelera",
        "Ubicación en faldón o postes del ring",
        "Rotación en LED a pie de ring",
        "Auspicio de una serie designada de cortes sociales",
        "Asignación de boletos y credenciales",
        "Reporte de recap post-evento",
      ],
    },
  },
  {
    id: "supporting",
    tier: "supporting",
    name: { en: "Supporting Partner", es: "Auspiciador Colaborador" },
    summary: {
      en: "Cost-effective, on-the-night visibility for emerging and local brands.",
      es: "Visibilidad costo-efectiva durante la noche para marcas emergentes y locales.",
    },
    inclusions: {
      en: [
        "Venue and concourse signage",
        "Logo in event program and listings",
        "Brand mention in social recap",
        "Recap summary with delivered impressions",
      ],
      es: [
        "Rotulación en sede y pasillos",
        "Logo en el programa del evento y listados",
        "Mención de marca en el recap social",
        "Resumen de recap con impresiones entregadas",
      ],
    },
  },
];

/* ── Audience value (DEMO DATA) ───────────────────────────────────────────
   Illustrative figures used on the partners page to frame the opportunity. */
export const audienceValue: RecapMetric[] = [
  { label: { en: "Avg. broadcast audience", es: "Audiencia promedio" }, value: "172K", hint: { en: "per televised card", es: "por cartelera televisada" } },
  { label: { en: "Social reach / month", es: "Alcance social / mes" }, value: "2.8M" },
  { label: { en: "Fight-week impressions", es: "Impresiones de semana de pelea" }, value: "5.1M" },
  { label: { en: "In-arena, marquee card", es: "En arena, cartelera estelar" }, value: "~12K" },
];

/* ── Hospitality / VIP (DEMO DATA) ───────────────────────────────────────── */
export const hospitalityPackages: HospitalityPackage[] = [
  {
    id: "ringside-table",
    name: { en: "Ringside Table", es: "Mesa a Pie de Ring" },
    capacity: { en: "Table of 10", es: "Mesa de 10" },
    summary: {
      en: "Closest to the action — where cameras and crowd are pointed.",
      es: "Lo más cerca de la acción — donde apuntan las cámaras y el público.",
    },
    features: {
      en: ["Ringside seating for 10", "Dedicated host & service", "Fighter walkout view", "Logo on table signage"],
      es: ["Asientos a pie de ring para 10", "Anfitrión y servicio dedicados", "Vista del ringwalk", "Logo en rotulación de mesa"],
    },
  },
  {
    id: "vip-suite",
    name: { en: "VIP Suite", es: "Suite VIP" },
    capacity: { en: "Up to 20", es: "Hasta 20" },
    summary: {
      en: "A private suite with catering and a branded presence.",
      es: "Una suite privada con catering y presencia de marca.",
    },
    features: {
      en: ["Private suite for up to 20", "Catering & open bar", "In-suite branding", "Priority entrance & parking"],
      es: ["Suite privada para hasta 20", "Catering y barra abierta", "Marca dentro de la suite", "Entrada y estacionamiento prioritarios"],
    },
  },
  {
    id: "hospitality-lounge",
    name: { en: "Hospitality Lounge", es: "Lounge de Hospitalidad" },
    capacity: { en: "Per-seat", es: "Por asiento" },
    summary: {
      en: "Premium club access for clients and guests, by the seat.",
      es: "Acceso premium de club para clientes e invitados, por asiento.",
    },
    features: {
      en: ["Club lounge access", "Premium seating block", "Pre-fight reception", "Networking with partners"],
      es: ["Acceso al club lounge", "Bloque de asientos premium", "Recepción pre-pelea", "Networking con socios"],
    },
  },
];

/* ── Sample sponsor recap report (DEMO DATA) ──────────────────────────────
   Figures below are illustrative and exist only to show the report format a
   partner would receive. They are not measured results. */

export const recapReportEventSlug = "raices";

export const recapMetrics: RecapMetric[] = [
  { label: { en: "Total reach", es: "Alcance total" }, value: "1.24M", delta: "+18%" },
  { label: { en: "Avg. broadcast audience", es: "Audiencia promedio" }, value: "184K", delta: "+9%" },
  { label: { en: "Social impressions", es: "Impresiones sociales" }, value: "3.4M", delta: "+22%" },
  { label: { en: "On-camera logo time", es: "Tiempo de logo en cámara" }, value: "14m 30s" },
  { label: { en: "Est. media value", es: "Valor mediático est." }, value: "$96K", hint: { en: "Modeled estimate", es: "Estimado modelado" } },
  { label: { en: "Press mentions", es: "Menciones de prensa" }, value: "42" },
];

export const recapPlacements: RecapPlacement[] = [
  { label: { en: "Ring canvas (center)", es: "Lona del ring (centro)" }, impressions: "880K", share: 100 },
  { label: { en: "Social cutdowns", es: "Cortes para redes" }, impressions: "1.1M", share: 82 },
  { label: { en: "Ringside LED", es: "LED a pie de ring" }, impressions: "540K", share: 64 },
  { label: { en: "Broadcast lower-third", es: "Lower-third en transmisión" }, impressions: "184K", share: 44 },
  { label: { en: "Step-and-repeat", es: "Backdrop de prensa" }, impressions: "120K", share: 26 },
];
