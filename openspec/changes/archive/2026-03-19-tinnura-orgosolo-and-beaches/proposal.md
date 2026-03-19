## Why

The location page needs two content updates: (1) adding Tinnura & Orgosolo — two famous Sardinian mural villages — to the towns section, and (2) restructuring featured beaches so that Maria Pia becomes the favourite, with Le Bombarde, Lazzaretto, Mugoni, and La Pelosa as highlights (expanding from 3 to 5 featured beaches).

## What Changes

- Add a new town entry "Tinnura & Orgosolo" (id: `tinnura`, CMS key: `tinnura`) to the towns section with descriptions in all 6 languages
- Make **Maria Pia** the featured favourite beach (`loc_maria-pia_highlight: "Our favourite!"`)
- Add **Lazzaretto** as a new featured/highlighted beach
- Keep **Le Bombarde**, **Mugoni**, **La Pelosa** as featured but reassign highlights (Mugoni loses "Our favourite!")
- Update `LocationPageClient` to handle 5 featured beaches instead of 3 hardcoded ones
- Add all necessary translations (6 languages: en, pl, it, fr, de, es) for the new town and updated beach highlights

## Capabilities

### New Capabilities

_None — this change extends existing capabilities._

### Modified Capabilities

- `location-subpage`: Featured beach list changes from 3 hardcoded (Mugoni, Le Bombarde, La Pelosa) to 5 dynamic (Maria Pia, Le Bombarde, Lazzaretto, Mugoni, La Pelosa). Town section gets a new entry.

## Impact

- `app/src/data/location-data.ts` — new town entry, `featured` flags on maria-pia and lazzaretto, remove from mugoni? No — keep featured on all 5
- `app/src/app/[locale]/location/LocationPageClient.tsx` — refactor hardcoded featured beach references to support 5 featured beaches dynamically
- `app/messages/{en,pl,it,fr,de,es}.json` — new translation keys for tinnura town + updated highlight keys for maria-pia, lazzaretto; update mugoni highlight
