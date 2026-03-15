## 1. Update tile definitions

- [x] 1.1 Replace the `areas` array in `app/src/components/AreaHighlights.tsx` with new tile entries: Wnętrza (`living-room`), Werandy (`veranda`), Ogród (`garden`), Boisko (`sports`)

## 2. Update translations

- [x] 2.1 In all 6 locale files (`app/messages/{pl,en,it,es,fr,de}.json`), add new keys: `areaInteriorsTitle`, `areaInteriorsDescription`, `areaVerandasTitle`, `areaVerandasDescription`, `areaSportsFieldTitle`, `areaSportsFieldDescription` under the `home` namespace
- [x] 2.2 In all 6 locale files, remove old keys: `areaBedroomsTitle`, `areaBedroomsDescription`, `areaSalonTitle`, `areaSalonDescription`, `areaVerandaTitle`, `areaVerandaDescription`

## 3. Update CMS schema

- [x] 3.1 In `/Users/mateuszbargiel/Projects/alghero-villa-cms/schemaTypes/areaHighlight.ts`, update the `images` field description to: `Kolejność zdjęć musi odpowiadać kolejności stref w kodzie: 1) Wnętrza, 2) Werandy, 3) Ogród, 4) Boisko`

## 4. Verify

- [x] 4.1 Run the dev server and confirm the 4 tiles render correctly with updated titles and descriptions in Polish
- [x] 4.2 Switch locale and verify translations display correctly
