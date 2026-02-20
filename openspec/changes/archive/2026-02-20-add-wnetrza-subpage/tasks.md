## 1. CMS & Data Layer

- [x] 1.1 Create Sanity `villaPage` singleton schema with `rooms` array (title, description, coverImage, galleryImages, amenities[]) and `exteriorSections` array (title, subtitle, description, image)
- [x] 1.2 Add `getVillaPage()` query function in `queries.ts` with TypeScript types for VillaPage, VillaRoom, VillaExteriorSection
- [x] 1.3 Add new LucideIcon keys: `wifi`, `crib`, `extra-bed`, `lounger`, `garden-furniture` mapped to appropriate lucide-react icons

## 2. Route & Page Setup

- [x] 2.1 Create `/villa` route with `app/src/app/villa/page.tsx` — server component that fetches `getVillaPage()` and renders the page header (eyebrow + h1 + subtitle matching Gallery/Contact pattern)
- [x] 2.2 Delete the old `/interiors` under-construction page (`app/src/app/interiors/page.tsx`)
- [x] 2.3 Add graceful fallback rendering when CMS data is missing (placeholder message)

## 3. Sub-Navigation

- [x] 3.1 Create `VillaSubNav` client component with two groups (Wnętrza / Na zewnątrz), section items derived from CMS data, sticky positioning below TopNav
- [x] 3.2 Implement IntersectionObserver scroll tracking — active group label emphasis + active item underline indicator
- [x] 3.3 Implement smooth-scroll on sub-nav item click (accounting for sticky nav offset)
- [x] 3.4 Mobile layout: two rows (group labels + horizontally scrollable items), auto-scroll active item into view

## 4. Bedroom Tiles & Accordion

- [x] 4.1 Create `RoomTilesGrid` client component — 3-col grid (2-col mobile) of bedroom tiles with cover photo + title overlay from CMS
- [x] 4.2 Implement row-based accordion expand — clicking a tile opens a panel below the entire row, only one open at a time, smooth animation
- [x] 4.3 Create accordion content layout — 2-col: overlapping/stacked photos (bedroom + bathroom card stack) on left, room title + description + amenity chips on right
- [x] 4.4 Implement photo carousel with manual prev/next navigation within the expanded accordion
- [x] 4.5 Auto-scroll to bring expanded accordion content into view after animation

## 5. Salon i Kuchnia Section

- [x] 5.1 Create salon section — always-visible 2-col layout (photo carousel left, description + amenities right), using the same carousel and amenity chip components as bedrooms

## 6. Exterior Sections

- [x] 6.1 Create `ExteriorSection` component — 2-col alternating text+image block matching the homepage section pattern (h2 + accent bar + subtitle + description + image), with Reveal animation
- [x] 6.2 Render all exterior sections from CMS data in alternating left/right layout

## 7. CTA & Page Completion

- [x] 7.1 Add CTA block at page bottom matching homepage pattern (beige card + heading + button → /contact)

## 8. Navigation Updates

- [x] 8.1 Update TopNav `navItems` array: add "Obiekt" (`/villa`), reorder to Home | Obiekt | Okolica | Galeria | Kontakt
- [x] 8.2 Update homepage links: change `/interiors` references to `/villa` in Nieruchomość section CTA and Wnętrza section
- [x] 8.3 Update AreaHighlights cards to link to `/villa` on click

## 9. Styling & Polish

- [x] 9.1 Ensure all new components use existing CSS variables, design tokens, and spacing patterns (--accent, --muted, --background, --surface, Reveal animations)
- [x] 9.2 Test responsive layout: sub-nav, bedroom grid, accordion, exterior sections on mobile/tablet/desktop viewports
