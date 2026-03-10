## Why

The villa page is a long scrolling page with many sections and no clear visual grouping. Users have to scroll through everything to find what they're looking for. Adding a visual entry point that groups content into "Wnętrza" (Interiors) and "Na zewnątrz" (Outdoors) makes navigation intuitive and gives users a quick mental model of the page structure.

## What Changes

- Add a **hero navigation section** after SubpageHeader with two side-by-side clickable images (CMS-managed) that smooth-scroll to the corresponding content group. On mobile, render as two buttons without images.
- Update **VillaSubNav** (right-side scroll-spy nav) to display "Wnętrza" and "Na zewnątrz" as visible group headers instead of invisible separators.
- **Fix z-index bug** where VillaSubNav overlaps the green SubpageHeader on certain screen sizes.
- Add **two new image fields** to Sanity CMS villa page schema for the hero navigation images.
- **No content changes** — all existing sections, their order, names, and layouts remain unchanged.

## Capabilities

### New Capabilities

- `villa-hero-nav`: Clickable hero image pair (desktop) / button pair (mobile) that groups villa content into "Wnętrza" and "Na zewnątrz" and smooth-scrolls to the appropriate section group.

### Modified Capabilities

_None — no existing spec-level behavior changes._

## Impact

- **Frontend**: `VillaPageClient.tsx`, `VillaSubNav.tsx`, new hero nav component, translation files (6 locales)
- **CMS**: Sanity schema at `/Users/mateuszbargiel/Projects/alghero-villa-cms` — add two `mediaImage` fields to `villaPage` document
- **Sanity queries**: Update `getVillaPage` query to fetch the new hero nav images
- **No route, API, or dependency changes**
