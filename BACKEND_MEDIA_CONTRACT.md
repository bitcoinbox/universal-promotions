# Universal Promotions Backend & Media Contract

## Ownership Split

The frontend track owns the premium public website and frontend experience.

The backend track owns backend architecture, typed data contracts, media ingestion, image metadata, retrieval, and security posture.

## Backend Scope

For v1, use a backend-ready architecture even if the frontend starts with local mock data.

- Define typed models for events, fighters, bouts, sponsors, media assets, and dashboard metrics.
- Keep public website data separate from prototype/demo operational data.
- Label all unsourced metrics as demo data.
- Avoid claiming official partnerships, attendance, revenue, rankings, or current event details unless verified.
- Design API contracts so the frontend can later swap mock data for real endpoints.

## Suggested API Surface

Use these as stable frontend-facing contracts:

- `GET /api/events`
- `GET /api/events/:slug`
- `GET /api/fighters`
- `GET /api/fighters/:slug`
- `GET /api/media`
- `GET /api/sponsors`
- `GET /api/dashboard/overview`
- `POST /api/search/media`

`POST /api/search/media` should accept:

```ts
type MediaSearchRequest = {
  query: string;
  filters?: {
    fighterSlug?: string;
    eventSlug?: string;
    source?: "instagram" | "facebook" | "youtube" | "website" | "manual";
    mediaType?: "image" | "video" | "poster" | "press";
  };
};
```

And return:

```ts
type MediaSearchResult = {
  id: string;
  title: string;
  description?: string;
  source: "instagram" | "facebook" | "youtube" | "website" | "manual";
  sourceUrl: string;
  thumbnailUrl: string;
  mediaType: "image" | "video" | "poster" | "press";
  tags: string[];
  relatedFighters: string[];
  relatedEvents: string[];
  rightsStatus: "public_reference" | "permission_needed" | "owned" | "unknown";
  isDemo: boolean;
};
```

## Media / Social RAG Rules

Do not scrape or download social content blindly.

- Prefer official APIs, exported archives, press kits, or user-provided assets.
- If using public social posts for visual reference, store metadata and source URLs first.
- Treat images from social platforms as reference material unless permission is clear.
- Do not remove watermarks, imply ownership, or reuse private/user images.
- Keep `rightsStatus` on every media record.
- Generated images should be inspired by the brand direction, not copies of specific copyrighted/social images.
- Any generated image must be marked as generated/demo unless approved for production.

## Ingestion Pipeline

Planned ingestion stages:

1. Source registry
   - Official website, Instagram, Facebook, YouTube, press links, manual uploads.
   - Requires confirmed official handles before social ingestion.

2. Metadata extraction
   - Caption/title, post URL, date, visible names, event/fighter hints, media type.

3. Enrichment
   - Tags such as `weigh-in`, `fight-night`, `poster`, `press-conference`, `winner`, `venue`.
   - Associate likely event/fighter only when confidence is high.

4. Embedding / retrieval
   - Embed text metadata first.
   - Add image embeddings only when assets are owned, user-provided, or otherwise approved.

5. Frontend delivery
   - Return safe thumbnails, captions, source URLs, and rights labels.

## Security Requirements

- No secrets in repo.
- No hardcoded tokens or social API keys.
- Validate all request input.
- Rate limit search and ingestion endpoints when backend is live.
- SSRF-guard any server-side URL fetch: HTTPS only, block private/loopback IPs.
- Safe external links: `rel="noopener noreferrer"`.
- Minimal dependencies; audit before shipping.
- Never expose raw ingestion logs or internal API errors to the public site.

## Needed Inputs

Before real social ingestion:

- Confirm official Universal Promotions social handles.
- Confirm whether assets can be downloaded or only referenced.
- Confirm whether generated images may use social posts as loose mood/reference.
- Confirm deployment target and whether backend should be serverless, Node API routes, or separate service.
