# Fight Ops console

`/fight-ops` is the flagship feature: a prototype **operations terminal scoped to one real card**
(Queen of the Ring) that reads like software an owner would run a fight night on — end to end —
rather than a marketing grid. It is the "engine room" sell for the pitch: *the public site is the
storefront; this is the platform underneath it.*

- **Route:** `app/fight-ops/page.tsx` → `components/pages/fight-ops-view.tsx`
- **Components:** `components/ops/*` (14 files)
- **Data:** `content/ops.ts` (the `opsEvent` object), typed in `types/index.ts`
- **Real anchors:** `getEvent("queen-of-the-ring")` + `getFighter(...)` — never duplicated into ops data

---

## The honesty model

The console is a prototype, and it never pretends otherwise. Honesty is enforced in three standing
layers plus one structural rule:

1. **Standing disclaimer** — an amber banner under the hero names the real anchor (event, venue, the
   4,000-seat capacity, the headliner) and states that every figure marked "Sample" is illustrative.
2. **Per-panel demo badges** — chart/data panels carry a `DemoBadge` ("Demo data") in their header.
3. **Inline "Sample" tags** — `SampleTag` sits next to every illustrative number ("Sample",
   "Sample fulfillment", "Sample schedule").

**What is real** (read live from `content/events.ts` + `content/fighters.ts`, never copied into ops):
the event, its date, doors time, venue (Coliseíto Pedrín Zorrilla), city, **4,000 capacity**, ticket
status, poster, ticket URL; the `tickets-live` lifecycle stage (drives the stepper honestly); the
headliner **Kiria Tapia** with her real **9-0-0** record, division, and hometown; the opponent rendered
exactly as **"To be announced"**; and the twelve real roster fighters with real names/records/divisions
in the pipeline and drawer.

**What is clearly-labeled sample:** the tickets-sold figure and the sell-through curve (capped under
the real 4,000, with relative-window X labels and **no invented on-sale date**); the six readiness
percentages and the overall readiness ring; run-of-show row *times* (only the doors time is real); the
undercard/co-main rows (division-or-TBA only — **no invented fighters or matchups**); media/sponsor
fulfillment counts; and all telemetry values.

**Structural rule — no orphaned slugs.** An earlier version referenced events that no longer exist
(`noche-boricua`, `raices`, …) and rendered raw slugs. The fix was deletion, not relabeling: there is
no event selector, and no component reads a slug without a real `getEvent`/`getFighter` match. The
sell-through and summary read the one real event; the pipeline reads only real fighter slugs.

---

## Layout, top to bottom

It is a single scrolling page (no tabs — to keep one focused build and avoid layout shift). Panels
share a signature `OpsPanel` chrome (mono section index, gold-lead header rule, layered surface, opt-in
broadcast corner ticks); a `recessed` variant drops secondary panels into the page for depth hierarchy.

| # | Section | Component | What it shows |
|---|---|---|---|
| — | Page hero | `site/PageHero` | Branded intro + gold + demo badges |
| — | Disclaimer | (inline) | Standing honesty banner naming the real anchor |
| — | Command bar | `ConsoleHeader` | `◉ LIVE OPS · QUEEN OF THE RING · San Juan · Jul 11 · PROTOTYPE` — frames it as live software |
| 01 | Lifecycle | `LifecycleStepper` | 6 promotional stages; the real `tickets-live` stage is current (pulse), past stages checked, future locked |
| — | Event command card | `EventSummaryCard` + `ReadinessRing` | Real poster/date/venue/capacity, tickets meter, the 66% readiness ring, a 6-pillar mini-breakdown, and the headliner card vs "To be announced" |
| 02 | Readiness board | `ReadinessHeatmap` | Six pillars (venue/ticketing/talent/broadcast/sponsors/media) as segmented status gauges; each tile scrolls to its detail |
| 03 | Sell-through | `SellThroughChart` | Hand-built SVG area chart: cumulative sales vs the 4,000 house, dashed target-pace line, hover readout, a persistent "Today" endpoint |
| 04 | Talent pipeline | `FighterCard` | Read-only Scouting → Signed → Developing → Headliner columns of the real roster; unnamed prospects shown as "+N not shown publicly" |
| 05 | Run of show | `RunOfShowTimeline` | Real doors → illustrative undercard ("Matchups to be announced") → the real Kiria-vs-TBA main event (tinted lane) |
| 06 | Sponsor inventory | `Meter` | Real generic placement categories, sample fulfillment (state-colored) |
| 07 | Media readiness | `Meter` | Pre-event / fight-night / aftermath fulfillment (empty rows render a dashed track) |
| 08 | Telemetry | `KpiTelemetry` + `Sparkline` | Six KPI tiles with colored delta pills + full-width trend lines |
| — | CTA | (inline) | "This is the operating system under the brand" → Partners / request deck |

The readiness tiles, the lifecycle stepper labels, and the command bar all anchor-scroll to the
matching `id` (`ops-readiness`, `ops-sell-through`, `ops-pipeline`, `ops-sponsors`, `ops-telemetry`).

---

## Component architecture

Everything lives in `components/ops/`. The codebase's i18n is a client hook (`useI18n`), and the page
shell is `"use client"`, so children compile as client components regardless — they call `useI18n`
directly rather than threading `t`/`locale` through props. Performance is preserved because the work is
static markup + hand-built SVG, not runtime computation.

**Chrome & primitives**
- `ops-panel.tsx` — `OpsPanel`: the signature panel. Props: `title`, `icon`, `index`, `frame`
  (broadcast corner ticks), `recessed` (secondary elevation), `action`.
- `console-header.tsx` — `ConsoleHeader`: the command bar (status, event, location, date, PROTOTYPE tag).
- `sample-tag.tsx` — `SampleTag`: the inline "Sample" marker.
- `sparkline.tsx` — `Sparkline`: a static gold polyline; `stretch` fills the container with a
  non-scaling stroke.

**Sections**
- `lifecycle-stepper.tsx` — `LifecycleStepper`: maps `eventLifecycleOrder` against the event's real
  `lifecycle`; pulse on the current node (reduced-motion gated).
- `event-summary-card.tsx` — `EventSummaryCard`: the hero card; embeds the ring, the tickets `Meter`,
  the headliner `FighterCard`, and the compact pillar breakdown.
- `readiness-ring.tsx` — `ReadinessRing`: an SVG donut gauge (gold at/above target, amber under); fills
  from empty via the `ops-ring-fill` keyframe.
- `readiness-heatmap.tsx` — `ReadinessHeatmap`: six tiles, each a `<button>` that smooth-scrolls to its
  pillar's section; status encoded as a 12-segment gauge + dotted chip.
- `sell-through-chart.tsx` — `SellThroughChart`: the standout viz (see below).
- `fighter-card.tsx` — `FighterCard`: the reusable hue-coded roster atom; opens the shared drawer.
- `run-of-show-timeline.tsx` — `RunOfShowTimeline`: the vertical night schedule with a rail; the main
  event gets a tinted lane + Anton display title.
- `kpi-telemetry.tsx` — `KpiTelemetry`: six terminal-style tiles (colored delta pill, full-width
  sparkline; static metrics dim and drop the pill so the six differentiate).

**The one interactive island**
- `fighter-detail-drawer.tsx` — exports `DrawerProvider` + `useDrawer()`. The page shell wraps
  everything in `DrawerProvider`; any `FighterCard` calls `useDrawer().open(slug)`. A single right-side
  drawer resolves the fighter (`getFighter`) and shows record/division/stance/hometown + next bout
  (`getFighterNextEvent`) + a profile link. Closes on **Escape**, **backdrop click**, and the close
  button; locks body scroll while open. Concentrating interactivity here keeps the rest static.

---

## The sell-through chart (no chart library)

`SellThroughChart` is a from-scratch SVG area chart — the most "product" instrument on the page.

- **Geometry** is computed once with `useMemo` from `points` + `capacity` and a fixed viewBox; it never
  recomputes on hover. The Y axis runs `0 → capacity` (so the headroom above the curve is honest), the
  X axis uses **relative-window labels** (`On sale`, `Wk 2`, `Today`) — never a fabricated date.
- **Depth:** a gold gradient area fill under the curve, faint gridlines at the 0/1K/2K/3K/4K ticks, and
  a dashed cobalt **target-pace** reference line.
- **Endpoint:** a persistent gold dot + drop-line + value label marks "Today" (2,847) when not hovering.
- **Hover:** a pointer handler maps `clientX` → nearest data index and moves a thin guide line + an HTML
  readout (day · cumulative · % of capacity). The SVG path itself never re-renders.
- **Motion:** the line draws in via the `ops-draw` keyframe (`pathLength=100`, animated dashoffset),
  auto-disabled under reduced motion.

The same hand-built approach powers `ReadinessRing` (SVG donut), `Sparkline` (polyline), and the
segmented readiness gauges (flexed `<span>`s) — **zero charting dependencies**.

---

## Data shape

All illustrative figures live in one object, `opsEvent` in `content/ops.ts`, typed as `OpsEvent` in
`types/index.ts`:

```ts
export const opsEvent: OpsEvent = {
  slug: "queen-of-the-ring",   // REAL anchor (events.ts is source of truth)
  ticketsSold: 2847,           // illustrative — vs the real 4,000 capacity (71%)
  readinessPct: 66,            // illustrative overall readiness (ring gauge)
  readiness: [ /* 6 pillars: { id, pct, status, note } */ ],
  sellThrough: [ /* cumulative points: { dayLabel, sold } — never exceeds capacity */ ],
  runOfShow: [ /* rows: { id, time, kind, real } — only doors + main are real */ ],
  mediaReadiness: [ /* { label, done, total } */ ],
  telemetry: [ /* { id, label, value, delta, trend, spark[] } */ ],
};
```

The pipeline reuses the existing `pipeline` export (real slugs only; scouting/signed groups keep empty
`fighterSlugs` so no names are invented). Sponsor inventory reuses the existing `inventory` export. Real
event facts are read live from `getEvent("queen-of-the-ring")` and never duplicated here.

---

## Performance & accessibility

- **Hand-built SVG/CSS only**, no chart library. The single interactive island is the shared drawer; the
  chart's hover moves one element without re-rendering the path; the readiness fill/heat-map/ring/stepper
  animate via CSS keyframes.
- **Reduced motion:** every animation (ring fill, chart draw-in, heat-map bars, stepper pulse, drawer
  slide) is disabled under `prefers-reduced-motion`. Verified: the chart line ends fully drawn and the
  gauges show their real values — nothing is left stuck empty.
- **Keyboard / a11y:** heat-map tiles and fighter cards are real `<button>`s with visible gold focus
  rings; the drawer is a labeled dialog that traps focus loosely and closes on Escape/outside-click.
- **Bilingual:** all copy flows through `t.ops.*`; the Spanish dictionary is type-checked to match.

## Extending it

- **More events:** the console is intentionally single-event. To support a roster of cards, add an event
  selector and key `opsEvent` by slug — but keep the "no orphaned slug" rule (every rendered slug must
  resolve to a real `getEvent`/`getFighter`).
- **Live data:** replace the `opsEvent` literal with a fetch behind `lib/data.ts`; the components take
  plain props/objects and don't care where the data comes from.
- **New panels:** wrap content in `OpsPanel` with the next `index`; reuse `Meter`, `Sparkline`,
  `SampleTag`, and the SVG patterns above to stay consistent and dependency-free.
