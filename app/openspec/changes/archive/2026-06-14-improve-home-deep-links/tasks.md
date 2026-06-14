## 1. Global scroll offset

- [x] 1.1 Add `scroll-padding-top: 96px` to the `html` rule in `src/app/globals.css` (keep existing `scroll-behavior: smooth`, `overflow-x: hidden`, `scrollbar-width: none`)

## 2. Villa anchor rename

- [x] 2.1 Rename `id: "sypialnie"` → `id: "bedrooms"` in `src/app/[locale]/villa/VillaPageClient.tsx:67` (interiorItems push)
- [x] 2.2 Rename `<section id="sypialnie">` → `<section id="bedrooms">` in `src/app/[locale]/villa/VillaPageClient.tsx:143`
- [x] 2.3 Verify with grep: no remaining references to `sypialnie` anywhere in `src/`, `messages/`, or `openspec/specs/`

## 3. AreaHighlights per-tile deep links

- [x] 3.1 Extend the `Area` type in `src/components/AreaHighlights.tsx` with an `href: string` field
- [x] 3.2 Populate `href` on each of the four `areas` entries:
  - `areaInteriorsTitle` → `/villa#salon`
  - `areaVerandasTitle` → `/villa#ext-veranda`
  - `areaSummerKitchenTitle` → `/villa#ext-summer-kitchen`
  - `areaSportsFieldTitle` → `/villa#ext-sports-court`
- [x] 3.3 Replace the hard-coded `href="/villa"` on the `<Link>` (line ~61) with `href={area.href}`
- [x] 3.4 Verify TypeScript still passes — the `Link` from `@/i18n/navigation` may type-narrow `href`; if it complains about template-literal hrefs with hashes, use `as const` or the appropriate object form

## 4. Home page section CTAs

- [x] 4.1 Update beaches CTA in `src/app/[locale]/page.tsx:327` — change `href="/location"` to `href="/location#section-beaches"`
- [x] 4.2 Add a new Location section CTA below the existing location bullets list (around line 388): a `<Link>` mirroring the structure of the beaches CTA, with `href="/location"` and label `{t("locationLink")}`

## 5. Translations

- [x] 5.1 Add `"locationLink": "Poznaj okolicę →"` to the `home` section of `messages/pl.json`
- [x] 5.2 Add `home.locationLink` to `messages/en.json` (suggested: `"Explore the area →"`)
- [x] 5.3 Add `home.locationLink` to `messages/de.json`, `messages/es.json`, `messages/fr.json`, `messages/it.json` with translated copy
- [x] 5.4 Verify with grep: every `messages/*.json` file contains a `locationLink` key under `home`

## 6. Verification

- [x] 6.1 Start dev server (`npm run dev`) and visit the home page; click each of the four `AreaHighlights` tiles and confirm each lands on the correct villa section with the heading visible below the top nav
- [x] 6.2 Click "Poznaj wnętrza →", "Poznaj ogród →", "Poznaj plaże →", and the new "Poznaj okolicę →" CTAs and confirm each lands correctly
- [x] 6.3 Open `/villa` directly, click any `VillaSubNav` item, and confirm the section heading clears the top nav (sanity check that `scroll-padding-top` works for same-page anchors too)
- [x] 6.4 Open `/location` directly, click any `LocationHorizontalNav` item, and confirm the section heading clears the top nav
- [x] 6.5 Reload `/villa#bedrooms` directly in the address bar and confirm the page loads scrolled to the bedrooms section
- [x] 6.6 Repeat verification on a mobile viewport (DevTools) to confirm 96px offset still feels right; tune if obviously off (note: final value tuned to 240px during verification)
