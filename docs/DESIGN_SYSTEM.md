# Design system

One token system, defined once in `app/globals.css` and surfaced as Tailwind theme classes via
`@theme inline`. No `tailwind.config` file, no magic numbers — every color, size, radius, shadow, and
easing is a token. The direction: **deep warm ink + championship gold, with a restrained cobalt support
accent** (a nod to the Puerto Rico flag), avoiding the black/red sports cliché and SaaS gradients.

## Color

Defined as CSS custom properties on `:root` and mirrored into Tailwind (`bg-surface`, `text-fg-2`, …).

| Token | Value | Use |
|---|---|---|
| `--bg` / `--bg-2` | `#0a0b0e` / `#0d0f14` | Page background / recessed band |
| `--surface` / `--surface-2` | `#14161d` / `#1b1e27` | Card surface / raised surface |
| `--line` / `--line-2` | `#262a34` / `#353b49` | Hairline / stronger border |
| `--fg` / `--fg-2` / `--fg-3` | `#f4f2ea` / `#a7adba` / `#8c919f` | Text / muted / faint (AA on lightest surface) |
| `--gold` / `--gold-soft` / `--gold-deep` | `#e3b34e` / `#f1d089` / `#b07f2b` | Brand primary + gradient stops |
| `--brand-ink` | `#1c1505` | Ink on gold fills |
| `--accent` / `--accent-ink` | `#5b9bff` / `#06122b` | Cobalt support (data/system chrome) |
| `--live` / `--ok` / `--warn` | `#ff5a52` / `#4bbf8a` / `#e0a64b` | Status — used sparingly |

Status colors carry meaning: the Fight Ops readiness board maps `ready → --ok`, `at-risk → --warn`,
`blocked → --live`, and telemetry deltas color by trend.

## Type

One fluid scale built with `clamp(min, preferred, max)` — no breakpoint jumps. `--step-0` is the body
size; the scale runs `--step--2` (~0.75rem) through `--step-6` (~9rem display).

**Fonts** (loaded in `app/layout.tsx` via `next/font`, all `display: swap`):
- **Anton** — heavy condensed display face for `h1`–`h4`, the "fight poster" voice. Single 400 weight;
  `font-synthesis: none` so the browser never fakes a bold/italic cut. Exposed as `--font-display`.
- **Inter** — body (`--font-sans`), variable.
- **JetBrains Mono** — numerics, data labels, and the Fight Ops "terminal" chrome (`--font-mono`),
  variable. Pair with `.tabular` for tabular figures.

## Radius, shadow, motion

- **Radius:** `--radius` (0.7rem, `rounded-token`), `--radius-sm` (0.45rem), `--radius-lg` (1.1rem).
- **Shadow:** layered, never one flat blur — `--shadow-sm`, `--shadow-elev` (`--shadow-lg`), and a
  gold-tinted `--shadow-gold` for premium surfaces.
- **Motion:** **one easing curve everywhere** — `--ease: cubic-bezier(0.2, 0.8, 0.2, 1)` (plus
  `--ease-spring` for the occasional overshoot), base duration `--dur: 180ms`. A global
  `@media (prefers-reduced-motion: reduce)` block forces `animation-duration`/`transition-duration` to
  ~0, so **any CSS animation is automatically disabled under reduced motion** — server components don't
  need a JS gate.

## Helper classes

Defined in `app/globals.css`:

- `.kicker` — eyebrow label (mono, small, uppercase, letter-spaced).
- `.tabular` — tabular numerals for records/dates/metrics.
- `.text-gold-foil` — metallic gold gradient text for the wordmark and display headlines.
- `.hairline` — 1px top divider.
- `.bg-grid` — subtle technical grid behind data surfaces.
- `.bg-noise` — faint film-grain SVG to keep large dark fills from banding.

### Fight Ops "terminal" surfaces

Added for the console; reusable for any data-dense surface:

- `.ops-shell` — engine-room band: layered radial gradients (cobalt + gold washes) over a vertical fade.
- `.ops-grid` — a fine grid masked with a radial gradient so it fades at the edges (no hard rectangle).
- `.ops-card` — signature panel surface: a soft inner top highlight + a layered shadow for real depth.
- `.ops-ticks` — broadcast corner ticks (top-left + bottom-right L-shapes) for signature panels.
- `.ops-rule` — a hairline header rule with a short gold lead segment.
- Keyframes `ops-ring-fill` (readiness ring) and `ops-draw` (chart line draw-in), both auto-disabled by
  the reduced-motion block.

## Component primitives (`components/ui/`)

- **Button / ButtonLink** (`button.tsx`) — a CVA component with variants `primary` (foil gradient +
  glow + a shine sweep), `outline`, `ghost`, `subtle`, `link`, and sizes `sm`/`md`/`lg`. Micro-
  interactions: hover-lift, active press, gold focus ring. `ButtonLink` applies the same styling to a
  Next `<Link>`.
- **ExternalLink** (`external-link.tsx`) — safe anchor: real `http(s)` links get
  `target="_blank" rel="noopener noreferrer"`; placeholder `#` renders inert.
- **Badge** (`badge.tsx`) — CVA tones (`gold`, `solidGold`, `neutral`, `outline`, `accent`, `live`,
  `ok`, `warn`), sizes `sm`/`md`, optional leading dot.
- **Stat** (`stat.tsx`) — a metric tile (value + kicker label + optional delta/trend); `mono` swaps to
  the monospace face for an operational feel.
- **Container**, **SectionHeading**, **DemoBadge** — layout width, section header (kicker → title →
  intro, revealed on scroll), and the consistent "Demo data" marker.

### `cn()`

`lib/utils.ts` exports `cn(...)` = `twMerge(clsx(...))` — conditional classes with Tailwind conflict
resolution. Used everywhere; it lets later classes win over earlier ones (e.g. a passed-in `className`
overrides a component default).

## Principles

- **Tokens, not values.** If you're typing a hex or a px in a component, it probably belongs in
  `globals.css`.
- **One easing system.** Reach for `--ease`; reserve `--ease-spring` for deliberate overshoot.
- **Depth via layered shadow + hairline borders + subtle gradients**, not flat fills.
- **Mobile-first, fluid type, zero layout shift.** Fixed aspect ratios for any media box.
- **Reduced motion is not optional** — it's handled globally; don't ship an animation that can't be
  disabled.
