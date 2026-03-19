## 1. Data layer — new town + beach featured flags

- [x] 1.1 Add Tinnura & Orgosolo entry to `towns` array in `location-data.ts` (id: `tinnura`, name: "Tinnura & Orgosolo", driveMinutes: 50, coords: [40.2683, 8.5456], category: "towns")
- [x] 1.2 Set `featured: true` on `maria-pia` beach entry in `location-data.ts`
- [x] 1.3 Set `featured: true` on `lazzaretto` beach entry in `location-data.ts`

## 2. Translations — new town

- [x] 2.1 Add `loc_tinnura_name` and `loc_tinnura` keys to `en.json`
- [x] 2.2 Add `loc_tinnura_name` and `loc_tinnura` keys to `pl.json`
- [x] 2.3 Add `loc_tinnura_name` and `loc_tinnura` keys to `it.json`
- [x] 2.4 Add `loc_tinnura_name` and `loc_tinnura` keys to `fr.json`
- [x] 2.5 Add `loc_tinnura_name` and `loc_tinnura` keys to `de.json`
- [x] 2.6 Add `loc_tinnura_name` and `loc_tinnura` keys to `es.json`

## 3. Translations — beach highlights

- [x] 3.1 Add `loc_maria-pia_highlight` key to all 6 language files (favourite text, e.g. "Our favourite!" in EN)
- [x] 3.2 Add `loc_lazzaretto_highlight` key to all 6 language files (e.g. "Crystal-clear coves!" in EN)
- [x] 3.3 Update `loc_mugoni_highlight` in all 6 language files (change from "Our favourite!" to new highlight, e.g. "Pine forest & golden sand!" in EN)

## 4. Component refactor — dynamic featured beaches

- [x] 4.1 Refactor `LocationPageClient.tsx` to dynamically render featured beaches from the `featured` flag instead of hardcoding `mugoni`, `le-bombarde`, `la-pelosa` by ID
- [x] 4.2 Update featured card interspersing logic to handle 5 featured cards across the Alghero subgroup (Maria Pia, Le Bombarde, Lazzaretto, Mugoni) and nearby subgroup (La Pelosa)

## 5. Verification

- [x] 5.1 Verify the app builds without errors (`npm run build` or equivalent)
- [ ] 5.2 Visually verify all 5 featured beach cards render correctly on the location page
- [ ] 5.3 Visually verify Tinnura & Orgosolo town card renders with CMS image
