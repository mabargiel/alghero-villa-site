## Context

The location page currently has 3 hardcoded featured beaches (Mugoni, Le Bombarde, La Pelosa) referenced by ID in `LocationPageClient.tsx`. The towns section has 3 entries (Alghero, Bosa, Castelsardo). All content text lives in 6 translation files under the `location` namespace.

## Goals / Non-Goals

**Goals:**
- Add Tinnura & Orgosolo as a new town with id `tinnura` (matching existing CMS key)
- Restructure featured beaches: Maria Pia as favourite + 4 highlights (Le Bombarde, Lazzaretto, Mugoni, La Pelosa)
- Add translations for new town and updated highlights in all 6 languages
- Refactor `LocationPageClient` to dynamically render featured beaches instead of hardcoding 3 by ID

**Non-Goals:**
- Changing the visual layout/design of featured or regular cards
- Adding new CMS entries (tinnura already exists in CMS)
- Changing any other location categories (archaeology, nature, day trips, diving)

## Decisions

### 1. Town entry: single `tinnura` id covering both villages

Both Tinnura and Orgosolo are famous for their murals. They'll be a single entry with id `tinnura` (matching CMS key) and display name "Tinnura & Orgosolo". The description will cover both villages. Category: `towns`. Drive time: ~90 min (midpoint — Tinnura is ~50 min, Orgosolo is ~2h). Coordinates: Tinnura center (40.2683, 8.5456).

**Alternative**: Two separate entries. Rejected because CMS has a single `tinnura` key and they're thematically linked (mural villages).

### 2. Dynamic featured beach rendering

Currently `LocationPageClient` hardcodes `mugoni`, `leBombarde`, `laPelosa` by ID on lines 90-92 and manually interleaves them with regular beach chunks. With 5 featured beaches, this approach doesn't scale.

**Approach**: Filter featured beaches dynamically from the `beaches` array (already has `featured: true` flags). Render featured cards interspersed with regular cards in a generic loop rather than manually placing each one. Featured cards appear after every N regular cards or at subgroup boundaries.

**Alternative**: Keep hardcoding all 5. Rejected — fragile and harder to maintain.

### 3. Featured beach ordering and highlights

| Beach | `featured` | Highlight text |
|---|---|---|
| Maria Pia | `true` (new) | "Our favourite!" / translations |
| Le Bombarde | `true` (unchanged) | "One of the most famous beaches!" (keep existing) |
| Lazzaretto | `true` (new) | "Crystal-clear coves!" / translations |
| Mugoni | `true` (unchanged) | "Pine forest & golden sand!" / translations (updated from "Our favourite!") |
| La Pelosa | `true` (unchanged) | "The pearl of Sardinia!" (keep existing) |

Display order in the Alghero subgroup: Maria Pia (favourite) → regular chunk → Le Bombarde → regular chunk → Lazzaretto → remaining regular → then Mugoni in a later position. La Pelosa stays in the "nearby" subgroup.

### 4. Translation approach

Add `loc_tinnura_name` and `loc_tinnura` keys to all 6 language files. Add `loc_maria-pia_highlight` and `loc_lazzaretto_highlight` keys. Update `loc_mugoni_highlight` in all languages. Descriptions for Tinnura & Orgosolo will be sourced from public tourism information about these mural villages.

## Risks / Trade-offs

- **[Layout with 5 featured cards]** More featured cards means a longer beach section. → Acceptable since the interspersing pattern keeps regular cards visible between heroes.
- **[Drive time for combined entry]** Tinnura (~50 min) and Orgosolo (~2h) have very different drive times. → Use Tinnura's drive time (50 min) since it's the primary destination and closer; mention Orgosolo as a further option in the description.
