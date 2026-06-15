## Why

Links on the home page that route to `/villa` and `/location` either point at the page root (no anchor) or point at an anchor that lands flush against the fixed `TopNav`, hiding the heading. Visitors clicking "Poznaj ogród →" or one of the `AreaHighlights` tiles ("Wnętrza", "Werandy", "Kuchnia letnia", "Boisko") expect to see the relevant section — instead they land at the top of the destination page or with the heading clipped behind the nav, which reads as "the link didn't work."

## What Changes

- **AreaHighlights tiles**: each of the four home-page tiles gets its own deep-link target (currently all four link to bare `/villa`).
- **Beaches CTA**: home-page "Poznaj plaże →" deep-links to the beaches section on `/location` instead of the page root.
- **Location section**: gains a new "Poznaj okolicę →" CTA pointing at `/location` root (currently no CTA at all).
- **Villa bedrooms anchor**: section id renamed from Polish slug `#sypialnie` to English `#bedrooms` to match the project convention (English in code/URLs, Polish in user-facing copy). No existing links target this anchor, so the rename is contained.
- **Global anchor scroll offset**: `html { scroll-padding-top: 96px }` added to `globals.css` so anchor jumps land below the fixed `TopNav` rather than behind it. Affects every existing and future in-page anchor navigation.
- **New translation key**: `home.locationLink` ("Poznaj okolicę →" / "Explore the area →" / …) added for the new Location section CTA.

## Capabilities

### New Capabilities

- `section-deep-links`: home-page CTAs deep-link to specific sections on destination pages; anchor scroll lands the section heading below the fixed top nav rather than behind it; section IDs follow the project's English-in-code convention.

### Modified Capabilities

<!-- None - no existing specs in this project yet -->

## Impact

- **Code**:
  - `src/components/AreaHighlights.tsx` — per-tile `href` in the `areas` array
  - `src/app/[locale]/page.tsx` — beaches CTA href update; new Location section CTA
  - `src/app/[locale]/villa/VillaPageClient.tsx` — rename `#sypialnie` to `#bedrooms` (2 occurrences)
  - `src/app/globals.css` — add `scroll-padding-top: 96px` to the `html` rule
- **Translations**: new `home.locationLink` key in `messages/pl.json` and every other locale present in `messages/`.
- **APIs / dependencies**: none.
- **User-visible behavior**: clicking home-page CTAs that lead into `/villa` or `/location` now lands on the intended section with the heading visible below the top nav. Existing in-page anchor jumps anywhere in the app also gain the heading-clearance offset.
- **Breaking**: none. Anchor changes are additive (or rename a slug that has no inbound links).
