## Why

The home page tiles currently show 4 areas: Sypialnie (Bedrooms), Salon (Living Room), Ogród (Garden), Weranda (Veranda). The villa has a sports field (volleyball/football) that deserves visibility, and the interior spaces (bedrooms + salon) are better represented as a single "Interiors" tile. The tiles need to become: Wnętrza, Werandy, Ogród, Boisko.

## What Changes

- **Merge "Sypialnie" + "Salon" into "Wnętrza"** (Interiors) — single tile covering all indoor spaces
- **Rename "Weranda" to "Werandy"** (plural) — reflects multiple covered terraces
- **Keep "Ogród"** unchanged
- **Add "Boisko"** (Sports Field) — new tile for the volleyball/football court
- Update all 6 language translation files (pl, en, it, es, fr, de) with new keys and descriptions
- Update CMS schema (`areaHighlight.ts`) to reflect new tile order and names
- Update tile icons and link targets as needed

## Capabilities

### New Capabilities

_None — this modifies existing capabilities._

### Modified Capabilities

- `area-highlights-cards`: Tile definitions change from [Sypialnie, Salon, Ogród, Weranda] to [Wnętrza, Werandy, Ogród, Boisko] with updated translation keys, descriptions, and icons
- `i18n-translations`: New translation keys for Wnętrza and Boisko tiles; updated keys for Werandy; removed keys for Sypialnie and Salon
- `villa-cms`: CMS schema `areaHighlight.ts` must update tile order description and labels to match new tiles

## Impact

- **Frontend**: `AreaHighlights.tsx` component — tile array redefined
- **Translations**: All 6 locale JSON files under `app/messages/`
- **CMS**: `areaHighlight.ts` schema at `/Users/mateuszbargiel/Projects/alghero-villa-cms/schemaTypes/`
- **No breaking API changes** — purely presentational update
