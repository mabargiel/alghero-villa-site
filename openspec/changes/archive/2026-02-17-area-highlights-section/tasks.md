## 1. CMS Schema

- [x] 1.1 Create `areaHighlight` document type in `alghero-villa-cms/schemaTypes/areaHighlight.ts` — singleton with an ordered `mediaImage` array and help text indicating expected image order
- [x] 1.2 Register the new schema in `schemaTypes/index.ts`

## 2. Sanity Queries

- [x] 2.1 Add GROQ query `getAreaHighlights` in `app/src/lib/sanity/queries.ts` to fetch the `areaHighlight` document with its images array
- [x] 2.2 Add TypeScript type for the query result

## 3. Icon Setup

- [x] 3.1 Add any new Lucide icon mappings needed for the highlight areas to `LucideIcon.tsx` (e.g. icons for bedrooms, living room, kitchen, garden, terraces, etc.)

## 4. Component Implementation

- [x] 4.1 Create `app/src/components/AreaHighlights.tsx` as a client component with the hardcoded areas data array (title, description, iconKey per area)
- [x] 4.2 Implement the card grid layout — equal-width columns on desktop, single column on mobile
- [x] 4.3 Implement default card state: background image with dark gradient overlay, centered icon + uppercase title
- [x] 4.4 Implement hover interaction: card height transition, icon+title fade out, description fade in, background image subtle zoom
- [x] 4.5 Implement mobile tap-to-toggle: tap expands card, tap again collapses, only one card expanded at a time
- [x] 4.6 Implement fallback for cards without a CMS image (neutral background color)

## 5. CSS Animations

- [x] 5.1 Add `.highlight-card-item` staggered scroll-reveal styles to `globals.css` (same pattern as `.amenity-item` and `.mini-gallery-item`)
- [x] 5.2 Add card hover/expand transition styles (height, opacity crossfade, image scale)

## 6. Page Integration

- [x] 6.1 Add centered section header (title + accent bar + subtitle) above the card grid, styled consistently with other section headers
- [x] 6.2 Import `AreaHighlights` in `page.tsx`, fetch `getAreaHighlights` in the data loading, and place the section after the decorative SVG divider
- [x] 6.3 Wrap the section in `<Reveal>` with staggered card delays

## 7. Verification

- [x] 7.1 Verify the build succeeds (`next build`)
- [x] 7.2 Visually verify desktop hover animation, mobile tap interaction, and scroll-reveal
- [x] 7.3 Verify CMS images appear correctly when the `areaHighlight` document is populated
