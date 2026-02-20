## Why

The villa showcase subpage is the largest missing piece of the site. The PDF website plan specifies a detailed "Atrakcje Villi" section covering both interiors (bedrooms, living room, kitchen, per-room amenities) and exteriors (garden, relaxation zone, veranda, sports court, summer kitchen, parking, views). Currently `/interiors` shows an "under construction" placeholder. This page is essential for prospective guests to explore the full property before booking.

## What Changes

- Create a new route at `/villa` with navbar label "Obiekt" — a single combined page showcasing the entire property
- Remove the old `/interiors` under-construction route (redirect or replace)
- Page has two main sections:
  - **Wnętrza** (Interiors):
    - Sypialnie — 6 expandable bedroom tiles, each showing photos + en-suite bathroom. Each tile displays per-room amenities as icons (e.g. WiFi, klimatyzacja, łóżeczko niemowlęce, dostawka — varying per room)
    - Salon i Kuchnia — photos with descriptions
    - Indoor amenities summary with icons
  - **Na zewnątrz** (Exteriors):
    - Ogród (1ha fenced Mediterranean property)
    - Strefa wypoczynkowa
    - Weranda i taras
    - Boisko sportowe
    - Kuchnia letnia
    - Parking
    - Widoki / Otoczenie
    - Each as a content block with image + description
- All photos must be configurable from Sanity CMS (not hardcoded)
- Styling must match the existing site design system (colors, typography, spacing, Reveal animations)
- Add "Obiekt" link to the TopNav navigation bar
- Update AreaHighlights cards on the homepage to link to `/villa`

## Capabilities

### New Capabilities
- `villa-subpage`: The combined interiors/exteriors showcase page at `/villa` — layout, sections, expandable room tiles with per-room amenities, exterior content blocks, all CMS-driven
- `villa-cms`: Sanity schema for villa page content — rooms (with photos, descriptions, amenities per room), exterior sections (with photos and descriptions)

### Modified Capabilities
- `area-highlights-cards`: Update links from highlights to point to `/villa`
- `navbar-ssr-fix`: Add "Obiekt" entry to the navigation items list

## Impact

- **Routes**: New `/villa` route; remove `/interiors` under-construction page
- **Components**: New page component, expandable room tile component, exterior section blocks
- **Navigation**: `TopNav.tsx` — add "Obiekt" nav item, update order
- **Homepage**: AreaHighlights and/or home page CTA links updated from `/interiors` to `/villa`
- **CMS**: New Sanity document type(s) for villa rooms and exterior sections with image arrays and amenity lists
- **Dependencies**: No new packages expected — uses existing Lucide icons, Next.js Image, Sanity client
