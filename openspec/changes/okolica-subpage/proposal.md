## Why

The `/location` route currently shows an "under construction" placeholder. The villa website needs a rich, image-heavy "Okolica" (Surroundings) subpage to showcase the 20+ beaches, charming towns, archaeological sites, nature attractions, day trips, and diving spots near Alghero — a core selling point for guests considering booking.

## What Changes

- Replace the `/location` under-construction placeholder with a full "Okolica" subpage
- Add a hybrid layout with **featured hero cards** (Mugoni, Le Bombarde, La Pelosa) interspersed within a responsive card grid
- Implement **Netflix-style hover expand** on desktop (card scales up via z-index, reveals description + tags, no layout shift) with **bottom sheet** on mobile (tap to open)
- Add a **beach attribute tag system** with icons (sandy, rocks, kid-friendly, snorkeling, bars, etc.)
- Add a **static map section** (pre-rendered Azure Maps screenshot) with HTML overlay pins — color-coded by category, hover for popover info, click redirects to Google Maps
- Create a **Sanity CMS schema** (`locationPage`) for managing images per location (keyed arrays by category)
- Hardcode structured content (names, descriptions, coordinates, drive times, tags) in a TypeScript data file
- Add a **sticky section navigation** (reusing VillaSubNav pattern) for category sections: Plaże, Miasteczka, Zabytki, Przyroda, Wycieczki, Nurkowanie
- Create a **standalone Azure Maps script** to generate the static map image
- Add translations for all 6 locales

## Capabilities

### New Capabilities
- `location-subpage`: Full "Okolica" page with hero, sticky nav, category sections, featured cards, hover-expand grid cards, bottom sheet (mobile), static map with interactive HTML overlays, and CTA
- `location-cms`: Sanity CMS schema for location page images (keyed arrays per category: beaches, towns, nature, archaeology, dayTrips, diving)
- `location-map`: Static map image generation (Azure Maps script) and interactive HTML overlay component with color-coded pins, hover popovers, and Google Maps redirect

### Modified Capabilities
- `villa-subpage`: Navigation update — location route now resolves to real page instead of under-construction redirect

## Impact

- **Frontend**: New page at `/[locale]/location/`, new client components (hover cards, bottom sheet, map overlay, sticky nav), new data file
- **CMS**: New Sanity document type `locationPage` with image arrays, schema registration, GROQ queries
- **Assets**: 114 placeholder images to upload to Sanity (user will swap later), static map image in `/public`
- **Navigation**: TopNav already links to `/location` — no nav changes needed, just the route now serves real content
- **Dependencies**: `azure-maps-control` (dev-only, for map generation script)
- **i18n**: New translation namespace `location` across 6 locale files
