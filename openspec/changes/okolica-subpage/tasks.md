## 1. Data Layer

- [x] 1.1 Create `/src/data/location-data.ts` with TypeScript types and all beach data (20 beaches with id, name, driveMinutes, description, tags, coordinates, googleMapsUrl, featured flag, subgroup)
- [x] 1.2 Add towns data (Alghero, Bosa, Castelsardo) to location-data.ts
- [x] 1.3 Add archaeology data (Nuraghi, Domy Wróżek, Pozzo Santa Cristina, Piramida) to location-data.ts
- [x] 1.4 Add nature data (Grotta di Nettuno as featured, Capo Caccia, Grota Verde, Zatoki, Trekking, Asinara) to location-data.ts
- [x] 1.5 Add day trips data (Costa Smeralda, La Maddalena) and diving data (Tramariglio, Porto Conte) to location-data.ts
- [x] 1.6 Define beach attribute tag vocabulary (icon + translation key mapping for sandy, rocks, seaweed, turquoise, kid-friendly, beach-services, bars, snorkeling, waves, rope-park, diving-center)

## 2. Sanity CMS Schema

- [x] 2.1 Create `locationPage.ts` schema in CMS project (`/alghero-villa-cms/schemaTypes/`) with heroImage field and keyed image arrays per category (beaches, towns, nature, archaeology, dayTrips, diving)
- [x] 2.2 Register locationPage schema in `/schemaTypes/index.ts`
- [x] 2.3 Add GROQ query, TypeScript types, and `getLocationPage()` function in `/src/lib/sanity/queries.ts`

## 3. Translations

- [x] 3.1 Add `location` namespace to Polish translation file (`/messages/pl.json`) — section headings, sub-group headers, tag labels, CTA text, page header
- [x] 3.2 Add `location` namespace to remaining 5 locale files (en, it, es, fr, de)

## 4. Page Structure

- [x] 4.1 Replace `/app/[locale]/location/page.tsx` — server component that fetches Sanity images, reads data file, passes props to client component
- [x] 4.2 Create `LocationPageClient.tsx` — client component shell with section layout, section IDs for nav tracking

## 5. Core Components

- [x] 5.1 Create sticky section nav component (reuse VillaSubNav pattern) with 6 category sections, IntersectionObserver tracking, smooth scroll, hidden until past hero
- [x] 5.2 Create `LocationCard` component — regular grid card with image, name, drive time, tag icons; CSS hover expand (scale, z-index, shadow, description reveal)
- [x] 5.3 Create `FeaturedLocationCard` component — large hero-style card with full-width image, name, highlight text, description, drive time, tags
- [x] 5.4 Create `BottomSheet` component — mobile slide-up sheet with drag-to-dismiss, backdrop tap dismiss, Escape key dismiss, focus trap
- [x] 5.5 Create `BeachTags` component — renders pill-shaped tag chips with icons and translated labels

## 6. Section Assembly

- [x] 6.1 Assemble beach section — featured hero cards (Mugoni, Le Bombarde, La Pelosa) interspersed with grid, sub-groupings (Alghero, Południowe, W okolicy)
- [x] 6.2 Assemble towns section — 3 large cards in 2-column layout
- [x] 6.3 Assemble archaeology section — 4 cards in responsive grid
- [x] 6.4 Assemble nature section — Grotta di Nettuno featured card + 5 grid cards
- [x] 6.5 Assemble day trips section — 2 cards
- [x] 6.6 Assemble diving section — 2 cards
- [x] 6.7 Add CTA section at page bottom (reuse CtaSection pattern, link to /contact)

## 7. Map Section

- [x] 7.1 Create Azure Maps generation script at `/scripts/generate-location-map.ts` — reads coordinates from data file, renders map with Playwright, saves PNG to `/public/images/`
- [x] 7.2 Run script to generate static map image
- [x] 7.3 Create `LocationMap` component — static map image with absolutely-positioned HTML pin overlays (percentage coordinates), color-coded by category
- [x] 7.4 Add pin hover popovers (name + drive time) and click-to-Google-Maps behavior
- [x] 7.5 Add color-coded legend below map with translated category labels

## 8. Polish & Integration

- [x] 8.1 Wire up Sanity images to cards — match `locationKey` from CMS data to data file IDs, handle missing images gracefully
- [x] 8.2 Ensure hover expand handles edge cards (cards at grid edges don't overflow viewport)
- [x] 8.3 Verify bottom sheet accessibility — keyboard dismiss, focus trap, screen reader announcements
- [x] 8.4 Add Reveal scroll animations to sections (reuse existing Reveal component)
- [x] 8.5 Test responsive behavior — mobile (1-2 col grid, bottom sheet), tablet (2-3 col), desktop (3-4 col, hover expand), xl+ (sticky side nav)
