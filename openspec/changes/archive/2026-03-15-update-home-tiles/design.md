## Context

The home page has a 4-tile grid (`AreaHighlights.tsx`) showcasing villa areas. Currently the tiles are: Sypialnie (bedrooms), Salon (living-room), Ogród (garden), Weranda (veranda). Each tile is a hardcoded entry in an `areas` array with translation keys, an icon key, and a positional link to a CMS image from the `areaHighlight` Sanity document.

The tiles need to become: **Wnętrza** (interiors), **Werandy** (verandas), **Ogród** (garden), **Boisko** (sports field). Translations exist in 6 locale files (pl, en, it, es, fr, de). The CMS schema describes the image order in its `description` field.

## Goals / Non-Goals

**Goals:**
- Replace the 4 tile definitions in `AreaHighlights.tsx`
- Add/update translation keys across all 6 locales for new tiles
- Remove unused translation keys (areaBedrooms*, areaSalon*)
- Update CMS schema description to reflect new tile order
- Add appropriate icon for Boisko tile

**Non-Goals:**
- Changing the tile component layout, hover behavior, or linking logic
- Modifying the villa subpage
- Uploading new CMS images (editor responsibility)

## Decisions

### 1. New tile array in `AreaHighlights.tsx`

Replace the 4 entries with:

| # | titleKey | descriptionKey | iconKey | Rationale |
|---|----------|---------------|---------|-----------|
| 1 | `areaInteriorsTitle` | `areaInteriorsDescription` | `living-room` | Sofa icon fits "interiors" best. Reuses existing `Sofa` mapping. |
| 2 | `areaVerandasTitle` | `areaVerandasDescription` | `veranda` | Existing `Umbrella` mapping. Key renamed to plural. |
| 3 | `areaGardenTitle` | `areaGardenDescription` | `garden` | Unchanged. |
| 4 | `areaSportsFieldTitle` | `areaSportsFieldDescription` | `sports` | Existing `Activity` mapping — fits volleyball/football. |

**Alternative considered:** Using `bedrooms` icon for interiors — rejected since "interiors" is broader than bedrooms; the sofa icon better represents a combined living space.

### 2. Translation key strategy

- **New keys**: `areaInteriorsTitle`, `areaInteriorsDescription`, `areaSportsFieldTitle`, `areaSportsFieldDescription`, `areaVerandasTitle`, `areaVerandasDescription`
- **Removed keys**: `areaBedroomsTitle`, `areaBedroomsDescription`, `areaSalonTitle`, `areaSalonDescription`, `areaVerandaTitle`, `areaVerandaDescription`
- **Unchanged keys**: `areaGardenTitle`, `areaGardenDescription`

### 3. CMS schema update

Update the `description` field in `areaHighlight.ts` from:
> 1) Sypialnie, 2) Salon, 3) Ogród, 4) Weranda

to:
> 1) Wnętrza, 2) Werandy, 3) Ogród, 4) Boisko

This is a label change only — no schema migration needed. The editor will need to reorder/replace images in Sanity Studio to match.

## Risks / Trade-offs

- **CMS image mismatch** → After deploy, existing CMS images will be in the old order. Mitigation: coordinate with editor to update images in Sanity Studio after schema update. The fallback (neutral background) handles missing images gracefully.
- **No icon perfectly represents "sports field"** → The `Activity` icon (zigzag line) is abstract but already mapped as `sports`. Acceptable given the existing icon set.
