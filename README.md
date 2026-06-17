# Universal Promotions — website prototype

A premium, bilingual (English / Spanish) website **prototype** for **Universal Promotions**, a
Puerto Rico boxing promotion. It positions the brand as a modern fight promotion and previews the
**Fight Ops** platform the company could run its business on.

**Live:** https://universal-promotions.vercel.app

> **This is an independent design prototype.** Every metric, report, and operational figure shown is
> **illustrative demo data** — not official Universal Promotions records — and is labeled as such in
> the UI. Real anchors (the Queen of the Ring card, its venue and capacity, the roster fighters and
> their records) are sourced from public information; nothing here asserts real attendance, rankings,
> partnerships, or unannounced matchups. Opponents that aren't confirmed read "To be announced."

---

## Highlights

- **One premium design system** — fluid `clamp()` type, a single easing curve, layered depth, and a
  championship-gold + cobalt palette on warm ink. No magic numbers; every value is a token.
- **Fully bilingual** — one dictionary, English canonical, Spanish **type-checked to the same shape**
  so a missing translation is a compile error. Persists to `localStorage`, updates `<html lang>`.
- **A flagship "Fight Ops" console** — an interactive, single-event operations terminal built from
  hand-rolled SVG/CSS (no chart library): a live sell-through curve, a six-pillar readiness board,
  a real-roster talent pipeline, a run-of-show timeline, and KPI telemetry. See [docs/FIGHT_OPS.md](docs/FIGHT_OPS.md).
- **Production-hardened** — per-request nonce CSP, a full security-header set, safe external links,
  no third-party scripts, no `dangerouslySetInnerHTML` beyond static JSON-LD.
- **Fast by construction** — AVIF/WebP via `next/image`, IntersectionObserver-gated self-hosted video,
  `font-display: swap`, zero layout shift, and **`prefers-reduced-motion` honored everywhere**.
- **No animation library, no backend, no database** — all content is typed local data behind a single
  read surface (`lib/data.ts`) that mirrors a future API.

## Tech stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (`strict`)
- **Tailwind CSS v4** — tokens via `@theme` in `app/globals.css` (no `tailwind.config`)
- **Lenis** (smooth scroll, lazy-loaded) · **lucide-react** (icons) · **CVA** + `clsx` + `tailwind-merge`
- Reveal-on-scroll is a custom IntersectionObserver + a tiny `prefers-reduced-motion` hook —
  **no Framer Motion / animation library ships**.
- shadcn-style components (owned, not a heavy kit). No external scripts, no database.

## Quickstart

```bash
npm install
npm run dev          # http://localhost:3000
```

No environment variables are required to run locally. Two are optional (see `.env.example`):

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, Open Graph, canonical URLs, sitemap, robots | production Vercel URL |
| `NEXT_PUBLIC_TICKETS_URL` | Where the Tickets button + event "Get tickets" link out to | `https://www.prticket.com` |

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint (next/core-web-vitals)
npm run typecheck    # tsc --noEmit
npm run lighthouse   # Lighthouse audit on localhost:3000
```

## Documentation

| Doc | What's in it |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Rendering model, the i18n system, the data layer, the domain types, security, SEO, performance, accessibility |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Color/space/type/radius/shadow/motion tokens, fonts, helper classes, the Fight Ops "terminal" surfaces, component primitives |
| [docs/FIGHT_OPS.md](docs/FIGHT_OPS.md) | The flagship console — every section, the component architecture, the data-honesty model, and how the hand-built visualizations work |

`BACKEND_MEDIA_CONTRACT.md` (repo root) sketches the future backend / media API surface that
`lib/data.ts` is designed to swap onto.

## Pages

| Route | What it is |
|---|---|
| `/` | Home — hero reel, next fight night, pillars, roster preview, sponsor band, Fight Ops teaser |
| `/events` | Upcoming fight cards + past-event recaps |
| `/events/[slug]` | **Event detail** — lifecycle stepper, full card, tickets/watch/press CTAs, venue block, broadcast, sponsors, connected coverage |
| `/fighters` | Filterable roster (status / division) |
| `/fighters/[slug]` | Fighter profile — story hook, tale of the tape, next fight, fight history, related media |
| `/partners` | Sponsorship value, audience metrics, tiers, hospitality / VIP, and a sample sponsor recap report |
| `/media` | **Content engine** — build-up / fight-night / aftermath, filterable, every asset tagged with category, rights, and event/fighter links |
| `/fight-ops` | **Fight Ops console** — a single-event operations terminal (see [docs/FIGHT_OPS.md](docs/FIGHT_OPS.md)) |
| `/contact` | Contact & press — inquiry form + media-credentials request |
| `/legal/[slug]` | Privacy, Terms, Event Terms, Media Policy, Code of Conduct (sample prototype docs) |

Plus `sitemap.ts`, `robots.ts`, a custom `not-found` ("Off the card"), and route/global error boundaries.

**Events are the conversion engine:** every card carries a promotional lifecycle (announced →
tickets-live → fight-week → live → results-posted → recap-published) and a full set of CTAs.
**Media is a content engine:** the same fight card naturally generates content before, during, and
after the night, and each asset links back to its event and fighters.

## The Fight Ops console

The flagship feature. `/fight-ops` is a prototype **operations terminal scoped to one real card**
(Queen of the Ring) that reads like software an owner would run a fight night on — not a marketing
grid. It is framed as live software (a command bar with a `PROTOTYPE` tag), and every illustrative
number is triple-labeled (a standing disclaimer + a per-panel demo badge + inline "Sample" tags).

It includes a promotion-lifecycle stepper, an event command card with an SVG readiness-ring gauge,
a six-pillar readiness board (segmented status gauges), a hand-built **sell-through curve** to the
real 4,000-seat house, a read-only **talent pipeline** of the real roster, a **run-of-show timeline**
(real doors time + real main event), sponsor/media fulfillment meters, and KPI telemetry with inline
sparklines. A single shared slide-in fighter drawer is the only heavy client island; everything else
is hand-rolled SVG/CSS — **no chart library**. Full breakdown in [docs/FIGHT_OPS.md](docs/FIGHT_OPS.md).

## Project structure

```
app/                 Routes (server shell: metadata + render a client view), sitemap, robots,
                     not-found, error boundaries
components/
  brand/             Logo, generated Portrait, SponsorLogo (deterministic gradients — no image assets)
  events/            EventPoster, Matchup, event cards, lifecycle stepper, ticket/broadcast/venue bits
  fighters/          FighterCard, Roster (filters), RecordLine, status badge
  ops/               The Fight Ops console (14 components) — see docs/FIGHT_OPS.md
  sponsors/          TierCard, RecapReport
  media/             MediaCard, ReelVideo (IO-gated mp4), YouTube embed
  site/              Header (a11y mobile nav), Footer, PageHero, DemoBanner, SkipLink, ContactForm
  ui/                Button (CVA), Badge, Stat, Container, ExternalLink, SectionHeading, DemoBadge
  i18n/              LanguageProvider (context), LanguageToggle
  pages/             One client "view" per route (consumes the i18n dictionary)
  reveal.tsx         Reveal-on-scroll (IntersectionObserver, reduced-motion aware)
  smooth-scroll.tsx  Lenis (lazy-loaded after mount, reduced-motion aware)
content/             Typed data: fighters, events, divisions, sponsors, media, ops, legal,
                     navigation + dictionary.ts (all bilingual UI copy, EN canonical, ES type-checked)
types/index.ts       Domain models
lib/data.ts          Data-access layer — the single read surface; swap to a real API here
lib/                 i18n primitives (Locale, Localized<T>, pick), site config, utils, reduced-motion hook
middleware.ts        Per-request nonce Content-Security-Policy
app/globals.css      The entire design-token system + helper classes
```

## Architecture at a glance

- **Rendering** — each route is a thin server component (metadata only) that renders a single client
  "view" from `components/pages/`. Views read UI copy through `useI18n()` and data through `lib/data.ts`.
- **Data layer** — components read through `lib/data.ts`, not raw `content/*`, so moving to a backend
  later means changing only that one module (and making its functions async). It mirrors
  `BACKEND_MEDIA_CONTRACT.md` and keeps **public catalog** data separate from **demo/operational** data,
  which always carries a demo marker. Every media record carries `source`, `rightsStatus`, and `isDemo`.
- **Bilingual** — `content/dictionary.ts` is the single source of UI copy; `type Dictionary = typeof en`
  forces the Spanish object to match, so a missing key fails the build. Per-language data fields use
  `Localized<T> = { en; es }`, resolved with `pick(value, locale)`.
- **No image assets** — fighter portraits, posters, and sponsor logos render as deterministic
  hue-seeded gradients (fixed aspect ratios → zero CLS, no licensing concerns). Swap for licensed
  photography in production.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full treatment.

## Security

- **CSP with a per-request nonce** (`middleware.ts`): `script-src 'self' 'nonce-…' 'strict-dynamic'`
  runs Next's framework scripts while refusing any injected or third-party script. Frame/object/base
  locked down; YouTube embeds explicitly allow-listed.
- **Static headers** (`next.config.ts`): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, a deny-by-default `Permissions-Policy`, `Cross-Origin-Opener-Policy`, and a
  two-year preload HSTS.
- **Safe external links** via `<ExternalLink>` — real http(s) links always get
  `rel="noopener noreferrer" target="_blank"`; prototype placeholders (`#`) render inert.
- No secrets, tokens, or private data. No `dangerouslySetInnerHTML` except static, build-time JSON-LD.
  No third-party scripts. Dependencies are minimal and reputable.

## Accessibility

Semantic landmarks, skip-to-content link, labeled controls and toggles (`aria-pressed`, `aria-current`,
`aria-expanded`), visible gold focus rings, keyboard-operable nav and the Fight Ops drawer (Escape /
outside-click close), `aria-live` on the roster result count, and **`prefers-reduced-motion` honored
everywhere** (reveals, Lenis, and every console animation disable).

## Verification

`npm run lint`, `npm run typecheck`, and `npm run build` all pass. Pages were reviewed on desktop
(1280) and mobile (390) via headless Chromium, in both English and Spanish, with reduced-motion and
hydration verified in a real browser context.

## What to make real for production

Replace the typed data with a CMS/API (behind `lib/data.ts`), add licensed photography/video, wire the
ticketing and partner CTAs to real destinations, connect the contact form to an inbox, and feed the
Fight Ops console live operational data.

---

Designed & built by **[Island Labs](https://islandlabs.studio)**.
