## Context

The villa page (`/[locale]/villa/page.tsx`) renders a SubpageHeader, stats grid, then `VillaPageClient` which renders Salon, Bedrooms (tile grid), and 7 exterior sections in a single scrolling layout. A fixed right-side nav (`VillaSubNav`) provides scroll-spy navigation on XL+ screens but uses invisible group separators — users see a flat dot list without group context.

The page content comes from two sources: hardcoded structure in `data.ts` and CMS-managed images from Sanity (`villaPage` document with `roomImages` and `exteriorImages` arrays).

The right-side nav currently sits at `fixed top-[58%] right-6 z-30`, which causes it to overlap the green SubpageHeader hero on certain viewport heights.

## Goals / Non-Goals

**Goals:**

- Add a visual hero navigation section with two clickable image cards that group content into "Wnętrza" / "Na zewnątrz" and smooth-scroll to the corresponding section group
- Make VillaSubNav group headers ("Wnętrza" / "Na zewnątrz") visible and styled
- Fix the z-index overlap bug between VillaSubNav and SubpageHeader
- Add CMS fields for the two hero navigation images

**Non-Goals:**

- Changing any section content, order, names, or layouts
- Adding/removing sections
- Changing the route or top-level navigation
- Redesigning the SubpageHeader or stats grid
- Okolica page

## Decisions

### 1. Hero nav component placement

**Decision**: Create a new `VillaHeroNav` client component rendered between the stats grid and `VillaPageClient` in `page.tsx`.

**Rationale**: Keeps it separate from the existing content rendering logic. The component needs client-side JS for smooth scrolling on click, so it must be a client component.

**Alternatives considered**: Embedding it inside `VillaPageClient` — rejected because it needs CMS image data passed from the server component, and keeping it at the page level follows the existing pattern (stats grid is also rendered directly in `page.tsx`).

### 2. Desktop vs Mobile rendering

**Decision**: Desktop (md+) shows two side-by-side images with overlay text and click-to-scroll. Mobile shows two styled buttons without images.

**Rationale**: Large hero images on mobile would push content too far down. Buttons are faster to load and more thumb-friendly.

### 3. Scroll targets

**Decision**: Clicking "Wnętrza" scrolls to `#salon` (the first interior section). Clicking "Na zewnątrz" scrolls to `#ext-garden` (the first exterior section).

**Rationale**: Reuses existing section IDs. No need for new anchor elements — the sections already have `id` attributes.

### 4. VillaSubNav group headers

**Decision**: Render group labels as visible styled text above each group's dot items, not as clickable buttons.

**Rationale**: The group headers categorize — they don't need their own scroll target since the hero nav already handles group-level navigation. Keeping them as labels avoids confusion about what clicking a header does vs clicking an item.

### 5. VillaSubNav z-index fix

**Decision**: Hide VillaSubNav when the user is scrolled to the top (SubpageHeader area) using an IntersectionObserver on the first content section. Show it only after the user scrolls past the header.

**Rationale**: More robust than z-index tweaking. The nav is irrelevant when the hero/header is visible anyway. This also avoids competing with the new hero nav section.

### 6. CMS schema for hero nav images

**Decision**: Add two `mediaImage` fields (`heroNavInteriorsImage` and `heroNavOutdoorsImage`) directly on the `villaPage` document type.

**Rationale**: Follows the existing pattern of `mediaImage` fields on `villaPage`. Two flat fields are simpler than an array since there are always exactly two images.

## Risks / Trade-offs

- **[CMS deployment ordering]** → Sanity schema must be deployed before the frontend can fetch new fields. Deploy CMS first, add images in studio, then deploy frontend. Non-blocking: frontend handles missing images gracefully (hero nav falls back to button-only mode like mobile).
- **[Translation scope]** → Two new translation keys per locale ("Wnętrza", "Na zewnątrz") across 6 locales. Already partially exist (`groupInteriors`, `groupOutdoors`) — just need to verify/update the values.
