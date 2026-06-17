# Architecture

A static, content-driven Next.js 15 App Router site. No backend, no database, no external scripts —
all content is typed local data, structured so it can later swap to a real API with minimal change.

## Rendering model

Each route is a thin **server component** (`app/<route>/page.tsx`) that does two things: export
`metadata` (and, for dynamic routes, `generateMetadata` + `generateStaticParams`), and render a single
**client "view"** from `components/pages/`. The view holds the interactivity and reads UI copy through
`useI18n()` and data through the content/data modules.

```
app/events/[slug]/page.tsx   → metadata + <EventDetailView slug={…} />   (server)
components/pages/…            → the actual UI, "use client", consumes the dictionary + data
```

Why: the server shell keeps SEO/metadata and static generation clean, while the client view can use the
i18n context (a client hook) without forcing the whole tree to re-architect. Most pages are statically
generated; dynamic segments (`events/[slug]`, `fighters/[slug]`, `legal/[slug]`) pre-render their params.

Special files: `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx` ("Off the card"),
`app/error.tsx` (route boundary), `app/global-error.tsx` (root boundary).

## Internationalization (EN / ES)

The i18n primitives live in `lib/i18n.ts`:

- `Locale = "en" | "es"`, `defaultLocale = "en"`, `isLocale()` guard, and `localeLabels`.
- `Localized<T = string> = Record<Locale, T>` — the shape for any per-language data field.
- `pick(value, locale)` resolves a `Localized<T>` for the active locale.

**UI copy** is one object, `content/dictionary.ts`. English is canonical, and:

```ts
const en = { /* … */ } as const;
export type Dictionary = typeof en;
const es: Dictionary = { /* … */ };   // must match en exactly — a missing key is a compile error
export const dictionaries = { en, es };
```

The **provider** (`components/i18n/language-provider.tsx`) holds locale state, exposes
`{ locale, setLocale, toggleLocale, t }` via `useI18n()`, persists the choice to `localStorage`
(`up-locale`), and syncs `<html lang>`. It renders the default locale on the server and first paint,
then applies the stored preference in an effect — **hydration-safe** (no mismatch). `LanguageToggle`
flips EN ↔ ES.

**Data** that differs by language (fighter bios/taglines, event names/summaries/recaps, sponsor
categories, media titles) uses `Localized<T>` and is resolved with `pick()` at render.

## Data layer

Content is typed modules under `content/`:

| Module | Exports |
|---|---|
| `fighters.ts` | `fighters`, `getFighter(slug)`, `boutSide()`, `boutWon()` |
| `events.ts` | `events`, `getEvent(slug)`, `upcomingEvents`, `pastEvents`, `nextEvent`, `getFighterNextEvent()` |
| `divisions.ts` | `divisions`, `divisionOrder` |
| `sponsors.ts` | sponsor brands, packages, hospitality, recap metrics |
| `media.ts` | `mediaItems` (content-engine assets) + source collections (`youtubeVideos`, `instagramAssets`, `podcastConcepts`, …) |
| `ops.ts` | `opsKpis`, `pipeline`, `inventory`, `opsEvent` (the Fight Ops payload) |
| `legal.ts`, `navigation.ts`, `dictionary.ts` | legal docs, nav items, bilingual UI copy |

Per-entity slug getters live alongside their data (e.g. `getEvent` in `events.ts`). **Cross-entity
joins and derivations** are centralized in `lib/data.ts`:

- `getEventSponsors(event)` — resolve an event's sponsor slugs to ordered `Sponsor[]`.
- `getMediaForEvent(slug)` / `getMediaForFighter(slug)` / `getAllMedia()`.
- `getFighterFights(slug)` — every bout (past + upcoming) for a fighter, as `FighterFight[]`.
- `mediaPhase(category)` — map a media category to a timeline phase (build-up / fight-night / aftermath).

`lib/data.ts` deliberately mirrors `BACKEND_MEDIA_CONTRACT.md`. To move to a real backend, make these
functions async and point them at the API — callers already treat them as the read surface.

### Domain types (`types/index.ts`)

The core models: `Fighter`, `FightRecord`, `Division`, `FightEvent`, `Bout`, `BoutResult`,
`EventLifecycle` (+ `eventLifecycleOrder`), `Broadcast`, `Sponsor`/`SponsorPackage`/`HospitalityPackage`,
`MediaItem` (with `MediaCategory`, `MediaSource`, `RightsStatus`, `MediaPhase`), `LegalDoc`, and the
Fight Ops set (`OpsEvent`, `ReadinessPillar`, `ReadinessStatus`, `SellThroughPoint`, `RunOfShowRow`,
`TelemetryMetric`, `MediaReadinessRow`).

### Data-honesty posture

Public catalog data (fighters, events) is kept conceptually separate from demo/operational data (the
Fight Ops console, sponsor recap), which always carries a demo marker. Unconfirmed opponents read
"To be announced" — never invented. Every `MediaItem` carries `source`, `rightsStatus`, and `isDemo`,
so nothing implies owned or licensed content it isn't. See [FIGHT_OPS.md](FIGHT_OPS.md#the-honesty-model)
for the console's specific model.

## Security

- **Content-Security-Policy with a per-request nonce** (`middleware.ts`). A fresh nonce
  (`btoa(crypto.randomUUID())`) is minted per request; Next stamps it onto its own bootstrap scripts.
  - `script-src 'self' 'nonce-…' 'strict-dynamic'` (prod) — no `unsafe-eval`, no third-party JS.
    Dev adds `'unsafe-eval'` for HMR.
  - `style-src 'self' 'unsafe-inline'` (element `style` attributes; low risk for styles).
  - `img-src 'self' data: https://i.ytimg.com https://yt3.googleusercontent.com` (`data:` for the inline
    noise SVG; YouTube thumbnails allow-listed).
  - `frame-src https://www.youtube-nocookie.com https://www.youtube.com`, `connect-src 'self'`,
    `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, `form-action 'self'`,
    `upgrade-insecure-requests`.
- **Static headers** (`next.config.ts`): `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a deny-by-default `Permissions-Policy`,
  `Cross-Origin-Opener-Policy: same-origin`, and HSTS `max-age=63072000; includeSubDomains; preload`
  (2 years).
- **Safe external links** (`components/ui/external-link.tsx`): real `http(s)` links get
  `target="_blank" rel="noopener noreferrer"`; placeholder `#` renders inert.
- No secrets/tokens in the repo. No `dangerouslySetInnerHTML` except static, build-time JSON-LD. No
  third-party scripts. Minimal, reputable dependencies.

## SEO & metadata

- Root `metadata` in `app/layout.tsx`: title template, description, Open Graph (with `en_US` / `es_PR`
  alternates and a `1200×630` social image), Twitter `summary_large_image`, theme color, and a
  build-time `SportsOrganization` JSON-LD block.
- **Per-page canonicals** — static pages set `alternates: { canonical: "/path" }`; dynamic routes set it
  in `generateMetadata`. (A canonical must never be set on the root layout — it would leak to every page.)
- `app/sitemap.ts` enumerates home + all routes + event/fighter/legal pages with change-frequency and
  priority; `app/robots.ts` allows all and points at the sitemap. Both read the origin from
  `lib/site.ts` (`NEXT_PUBLIC_SITE_URL`, defaulting to the production URL).

## Performance

- **Images:** `next/image` with `formats: ["image/avif", "image/webp"]`, constrained `qualities`
  (`[55, 60, 75]`), and `minimumCacheTTL: 31536000` (optimized variants cache for a year). Remote
  patterns are limited to YouTube thumbnails. Most "imagery" is deterministic CSS gradients (zero CLS,
  no requests).
- **Video:** self-hosted MP4 reels. `ReelVideo` gates load/decode behind an IntersectionObserver and
  shows a lazy poster first (no black flash); reduced motion shows the poster only. The hero reel is
  preloaded for fast autoplay. YouTube uses sandboxed `nocookie` iframes.
- **Caching:** `/media/*` is served `public, max-age=2592000, stale-while-revalidate=86400` (30 days +
  1-day stale).
- **Fonts:** all `display: swap`; Anton is a single 400 weight with `font-synthesis: none`.
- **Motion:** Lenis smooth scroll is lazy-loaded after mount; reveals use IntersectionObserver. A global
  `prefers-reduced-motion` rule disables all animation, Lenis, and video.

## Accessibility

Semantic landmarks and headings; a skip-to-content link; labeled controls and toggles (`aria-pressed`,
`aria-current`, `aria-expanded`); visible gold focus rings (`:focus-visible`); keyboard-operable nav
(Escape closes the mobile sheet) and the Fight Ops drawer (Escape / outside-click); `aria-live` on the
roster result count; and `prefers-reduced-motion` honored across reveals, smooth scroll, and every
console animation.

## Build & deploy

`npm run build` (Next.js, strict TS + ESLint) produces the optimized output; the site deploys to
**Vercel**. No build secrets, no remote fetches at build time. Verify locally with `npm run typecheck`,
`npm run lint`, `npm run build`, and `npm run lighthouse`.
