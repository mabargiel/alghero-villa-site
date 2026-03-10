## 1. CMS Schema & Query

- [x] 1.1 Add `heroNavInteriorsImage` and `heroNavOutdoorsImage` (mediaImage) fields to `villaPage` schema in Sanity CMS (`/Users/mateuszbargiel/Projects/alghero-villa-cms/schemaTypes/villaPage.ts`)
- [x] 1.2 Update `getVillaPage` Sanity query to fetch the two new hero nav image fields (`src/lib/sanity/queries.ts` or equivalent)

## 2. Hero Navigation Component

- [x] 2.1 Create `VillaHeroNav` client component — desktop (md+): two side-by-side clickable image cards with overlay text; mobile: two styled buttons without images; fallback to buttons when CMS images are missing
- [x] 2.2 Implement smooth-scroll on click — "Wnętrza" scrolls to `#salon`, "Na zewnątrz" scrolls to `#ext-garden`
- [x] 2.3 Render `VillaHeroNav` in `page.tsx` between stats grid and `VillaPageClient`, passing CMS image data

## 3. VillaSubNav Updates

- [x] 3.1 Add visible styled group header labels ("Wnętrza" / "Na zewnątrz") above each item group in `VillaSubNav`
- [x] 3.2 Fix z-index overlap bug — hide VillaSubNav when user is at the top of the page (SubpageHeader visible), show after scrolling past header using IntersectionObserver

## 4. Translations

- [x] 4.1 Add/verify translation keys for "Wnętrza" and "Na zewnątrz" group labels across all 6 locales (en, it, pl, es, fr, de)
