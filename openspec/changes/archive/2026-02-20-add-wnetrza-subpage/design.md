## Context

The site currently has a placeholder at `/interiors`. The villa showcase subpage (`/villa`, navbar label "Obiekt") will be the richest content page on the site — a long-scrolling page with sticky sub-navigation, expandable bedroom tiles with per-room amenities, a salon section, and 7 exterior content blocks. All images are CMS-driven via Sanity. The page must match the existing design system (warm earth tones, Reveal animations, Lato font, accent bars).

Existing patterns to build on:
- 2-col alternating text+image sections (from homepage)
- `Reveal` component for scroll-triggered animations
- `LucideIcon` for amenity icons
- Sanity `mediaImage` pattern for CMS images
- `urlFor()` helper for image URLs

## Goals / Non-Goals

**Goals:**
- Create a complete `/villa` page with interior and exterior sections
- Sticky sub-navigation with two groups (Wnętrza / Na zewnątrz) tracking scroll position
- Accordion-style expandable bedroom tiles with per-room photo carousel and amenities
- Salon i Kuchnia as a single section with carousel
- 7 exterior sections in alternating 2-col layout
- All photos and room data editable in Sanity CMS
- Consistent styling with the rest of the site
- Nav order updated to: Home | Obiekt | Okolica | Galeria | Kontakt

**Non-Goals:**
- Full-screen hero for this page (using simple eyebrow+h1+subtitle header like Gallery/Contact)
- Video content on this page
- Booking/pricing integration on this page
- Implementing the Okolica/Location subpage (separate change)
- Changing the homepage layout or content sections

## Decisions

### 1. Page structure: long scroll with sticky sub-nav

The page uses a single long-scrolling layout with a sticky sub-navigation bar that sits below the TopNav on scroll. The sub-nav has two groups: "Wnętrza" (Sypialnie, Salon) and "Na zewnątrz" (Ogród, Strefa wypoczynkowa, Weranda i taras, Boisko sportowe, Kuchnia letnia, Parking, Widoki).

IntersectionObserver tracks which section is in the viewport and updates both the active group label and the active item underline in the sub-nav. Clicking a sub-nav item smooth-scrolls to that section.

**Desktop:** Both groups visible side-by-side, separated by a vertical divider. Active group label is bold/emphasized, active item has an underline indicator.

**Mobile (M1):** Two rows — group labels on top row, items for both groups on second row, horizontally scrollable. Active item auto-scrolls into view.

**Alternative considered:** Tabbed mobile nav (M2) — rejected because it hides items from the inactive group, making the page feel less explorable.

### 2. Bedroom tiles: 3-col grid with row-based accordion

6 bedroom tiles in a 3×2 grid (2-col on mobile). Each tile shows a cover photo with the room name overlaid. Clicking a tile opens an accordion panel below the entire row (not just below the tile), pushing content down. Only one accordion can be open at a time.

**Expanded accordion content (2-col layout):**
- Left: Two overlapping/stacked photos (bedroom + bathroom) as a visual card stack, with a carousel to cycle through all room photos. Manual navigation with prev/next arrows.
- Right: Room title, description text, and per-room amenity icons displayed as small icon+label chips.

**Alternative considered:** Modal/lightbox for room detail — rejected because it breaks the scroll flow and the sub-nav tracking. Accordion keeps everything in-page.

### 3. Salon i Kuchnia: single section with carousel

Treated as a single "room" — same 2-col layout as the expanded bedroom accordion (photos left, text+amenities right), but always visible (not behind a tile). Photo carousel with multiple images.

### 4. Exterior sections: alternating 2-col blocks

Each of the 7 exterior sections follows the existing homepage pattern: alternating text-left/image-right and image-left/text-right layout. Each section has an h2 title, accent bar, subtitle, description, and one CMS image. Uses the same `Reveal` animation and `SectionImage`-style component.

### 5. CMS: single `villaPage` singleton document

One Sanity singleton document `villaPage` containing two arrays:

```
villaPage {
  rooms: [
    {
      _key, title, description,
      coverImage: mediaImage,
      galleryImages: mediaImage[],
      amenities: string[]  // keys matching LucideIcon names
    }
  ],
  exteriorSections: [
    {
      _key, title, subtitle, description,
      image: mediaImage
    }
  ]
}
```

**Why a singleton:** The page is a fixed structure — there's exactly one villa page. Arrays within the singleton allow reordering rooms/sections in the CMS without code changes.

**Amenities as string keys:** Each room stores an array of icon key strings (e.g. `["climate", "wifi", "crib", "extra-bed"]`). The frontend maps these to icons via the existing `LucideIcon` component. New icon keys will be added to `LucideIcon` as needed (wifi, crib, extra-bed, lounger, etc.).

**Alternative considered:** Separate document types for rooms and exterior sections — rejected as over-engineered for a single page with a fixed structure.

### 6. Sub-nav stacking with TopNav

The sub-nav sticks at the top of the viewport below the main TopNav. Both remain visible on scroll. The sub-nav uses `position: sticky` with a `top` value matching the TopNav height.

On mobile, the TopNav is ~56px and the sub-nav is ~80px (two rows). This leaves ~64% of viewport for content on a 568px screen — acceptable.

### 7. Route changes

- New route: `/villa/page.tsx` (server component fetching from Sanity, rendering client sub-components)
- Remove: `/interiors/page.tsx` (delete the under-construction page)
- Homepage links updated: `/interiors` → `/villa`

## Risks / Trade-offs

- **Sub-nav + TopNav stacking on mobile** → Total sticky height ~136px on small screens. Mitigation: keep sub-nav compact, consider collapsing to single row if testing reveals viewport issues.
- **9 exterior sections may feel repetitive** → Mitigation: alternating layout + varied photography + Reveal animations create visual rhythm. Can trim sections later if content is thin.
- **Accordion scroll position** → When an accordion opens, it pushes content down. The user's viewport might end up in a weird position. Mitigation: auto-scroll to bring the expanded content into view after the animation completes.
- **CMS dependency** → Page won't render meaningful content until Sanity documents are populated. Mitigation: graceful fallback states (empty rooms array → show placeholder message).
