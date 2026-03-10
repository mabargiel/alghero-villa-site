## Context

The villa website at `/[locale]/location` currently renders an under-construction placeholder. The site uses Next.js 16 (App Router), Tailwind CSS 4 with CSS variables, Sanity CMS for images, and `next-intl` for i18n across 6 locales. Existing subpages (villa, gallery) establish patterns for server/client component split, sub-navigation (VillaSubNav), image optimization via Sanity CDN, and lightbox interactions.

The "Okolica" page is the most content-dense page on the site: ~20 beaches with structured attributes, plus 5 other attraction categories. It must feel like discovery, not a data dump.

## Goals / Non-Goals

**Goals:**
- Deliver an image-heavy, engaging surroundings page with smooth navigation across 6 categories
- Implement Netflix-style hover expand on desktop, bottom sheet on mobile
- Provide a static map with interactive HTML overlays (zero runtime cost)
- Keep images manageable via Sanity CMS while hardcoding structured content
- Maintain performance with lazy loading despite 30+ image cards

**Non-Goals:**
- Interactive/embedded map SDK (no Azure Maps runtime dependency in production)
- Per-beach detail pages (all content lives on the single page)
- Full multilingual content for all beach descriptions in V1 (Polish first, other locales can use same descriptions or be translated later)
- Search or filter functionality for beaches

## Decisions

### 1. Hybrid layout with featured hero cards (Approach C)

**Choice:** 3 featured hero cards (Mugoni, Le Bombarde, La Pelosa) interspersed in the beach grid, with remaining beaches in a responsive card grid.

**Why over full-magazine (A):** 20+ full-bleed images = extremely long page, slow loads, poor navigation. The hybrid gives visual rhythm without overwhelming.

**Why over pure grid (B):** Pure grid lacks the "wow" factor. Featured cards break the monotony and highlight the owner's recommendations.

### 2. Hover expand via CSS transform + z-index (no layout shift)

**Choice:** On desktop hover, card scales to ~1.12x via `transform: scale()`, gains elevated `z-index` and shadow, and reveals a description panel that extends below the card boundary. Surrounding cards remain in place.

**Why:** Layout shift (pushing content) feels janky with a grid of 20+ cards. The floating expand is smooth and keeps spatial context. This is a pure CSS solution — no JavaScript state for hover.

**Alternative considered:** Inline expand with content push — rejected because it disrupts the user's mental map of the grid.

### 3. Bottom sheet for mobile detail view

**Choice:** On mobile tap, a bottom sheet slides up from the bottom with beach image, name, description, tags, and Google Maps link. Dismissible by drag-down or backdrop tap.

**Why:** Bottom sheets are the native mobile pattern for supplementary content. They're thumb-friendly and don't obscure the full viewport like modals.

**Implementation:** Custom component using `touch` events for drag, CSS transforms for slide animation, backdrop with opacity transition.

### 4. Static map image with HTML overlay pins

**Choice:** Pre-render a map screenshot using Azure Maps SDK in a development-only script. Use the screenshot as a static `<img>` in production with absolutely-positioned HTML pin elements on top, using percentage-based coordinates.

**Why over embedded SDK:** Zero ongoing cost, zero external runtime dependency, no API key in production. The map serves orientation and Google Maps navigation — zoom/pan isn't needed.

**Pin behavior:** Color-coded by category (CSS classes), hover shows popover (name + drive time), click opens Google Maps directions URL from villa coordinates.

**Trade-off:** Map must be regenerated if locations change. Acceptable since locations are fixed geographic points.

### 5. Images in Sanity, content in TypeScript data file

**Choice:** Create a `locationPage` Sanity document type with keyed image arrays per category. All structured content (names, descriptions, coordinates, drive times, tags, featured flags) lives in `/src/data/location-data.ts`.

**Why split:** Images need visual management (drag-reorder, crop via hotspot, easy swap later). Content is structured data that benefits from TypeScript types and is easier to bulk-edit in code. This matches the pattern already established by villa-subpage (room data in code, images in Sanity).

**Sanity schema structure:**
```
locationPage (singleton document)
├── heroImage: mediaImage
├── beaches[]: { locationKey: string, images: mediaImage[] }
├── towns[]: { locationKey: string, images: mediaImage[] }
├── nature[]: { locationKey: string, images: mediaImage[] }
├── archaeology[]: { locationKey: string, images: mediaImage[] }
├── dayTrips[]: { locationKey: string, images: mediaImage[] }
└── diving[]: { locationKey: string, images: mediaImage[] }
```

Each array item has a `locationKey` (e.g., "mugoni", "le-bombarde") that joins with the TypeScript data file.

### 6. Reuse VillaSubNav pattern for sticky section navigation

**Choice:** Create a section navigation component following the same IntersectionObserver + smooth scroll pattern from VillaSubNav. Positioned fixed on the right side (xl+ screens), tracking 6 category sections.

**Why reuse:** Proven pattern, consistent UX across subpages, accessible (aria-current, aria-label).

**Sections tracked:** Plaże, Miasteczka, Zabytki, Przyroda, Wycieczki, Nurkowanie (translated per locale).

### 7. Beach attribute tag system

**Choice:** Define a tag vocabulary as a TypeScript enum/map with icon + label pairs. Tags are referenced by key in the beach data. Rendered as small pill-shaped chips below each card.

**Tags:** sandy, rocks, seaweed, turquoise, kid-friendly, beach-services, bars, snorkeling, waves, rope-park, diving-center.

Labels are translated via the i18n system.

### 8. Azure Maps generation script

**Choice:** A standalone Node.js script in `/scripts/generate-map.ts` that uses `azure-maps-control` to render the map in a headless browser (Playwright), add styled markers, and screenshot the result.

**Input:** Coordinates from `location-data.ts`, Azure Maps API key from environment variable.
**Output:** Static PNG image saved to `/public/images/location-map.png`.
**Dependencies:** Dev-only — `azure-maps-control` and `playwright` (not bundled in production).

## Risks / Trade-offs

- **114 placeholder images → swap friction**: User must later upload real images to Sanity and match `locationKey` values. Mitigated by clear key naming and Sanity Studio preview showing which location each image set belongs to.

- **Hover expand edge cases**: Cards at grid edges may overflow viewport when expanded. → Mitigate by detecting edge position and adjusting expand direction, or constraining max expansion width.

- **Bottom sheet accessibility**: Must support keyboard dismiss (Escape), focus trap, screen reader announcements. → Follow dialog accessibility patterns already used in gallery lightbox.

- **Static map responsiveness**: A single map image may not look great at all viewport widths. → Generate at high resolution (2x), use CSS `object-fit: contain`, and position pins with percentage coordinates that scale proportionally.

- **Translation volume**: 6 locales × 30+ locations = significant translation work. → Start with Polish descriptions, use same text for all locales initially, translate incrementally.
