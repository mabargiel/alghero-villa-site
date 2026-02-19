## Context

The `/contact` page currently has a single-column layout with a header, social links, and a contact form. The page needs a contact info panel with a static map, phone number, email, and social links — displayed alongside the form in a two-column layout on desktop.

The site uses Next.js with Tailwind CSS v4 and a custom CSS variable design system (`--accent`, `--brand`, `--surface`, etc.). The font is Lato. Components use scroll-reveal animations via the `Reveal` component.

## Goals / Non-Goals

**Goals:**
- Add a contact info panel with static map, phone, email, and social links
- Two-column layout on desktop (info left, form right), stacked on mobile
- Static map with brand-colored pin overlay and CTA linking to Google Maps directions
- Provide a Leaflet HTML utility to generate the map screenshot

**Non-Goals:**
- No live/interactive map embed in production
- No CMS-managed contact data (hardcoded is fine for a single-property site)
- No changes to the contact form itself or the `/api/contact` endpoint

## Decisions

### 1. Static map image vs live embed
**Decision**: Use a static image (PNG/JPG) with CSS-overlaid pin and button.
**Rationale**: Zero runtime dependencies, fastest load, simplest implementation. The villa location never changes.
**Alternatives**: Google Maps embed (heavier, costs nothing but adds iframe), Mapbox (requires API key for tiles).

### 2. Map image source
**Decision**: Generate a one-time screenshot using a local Leaflet HTML file with OpenStreetMap tiles.
**Rationale**: Free, no API keys, OSM tiles are clean by default (no cluttered POI icons like Google Maps). The HTML file is a dev tool — not shipped to production.

### 3. Pin and CTA as CSS overlays vs baked into image
**Decision**: Overlay via CSS (`position: absolute`).
**Rationale**: Keeps the pin in brand color (`--accent`) and the CTA button styled consistently with the rest of the site. Easier to maintain than editing an image.

### 4. Contact data storage
**Decision**: Hardcode phone, email, and social links in the component.
**Rationale**: Single-property vacation rental — this data changes very rarely. Adding a Sanity schema would be overengineering.

### 5. Layout approach
**Decision**: CSS Grid two-column on `md:` breakpoint, single column on mobile. Container widens from `max-w-4xl` to `max-w-6xl`.
**Rationale**: Matches existing responsive patterns in the codebase. Grid gives clean column sizing control.

## Risks / Trade-offs

- **Map image gets stale if OSM updates roads** → Extremely unlikely to matter for a static villa site; easy to regenerate if needed.
- **Hardcoded contact data** → If the phone/email changes, requires a code change and deploy. Acceptable for this use case.
