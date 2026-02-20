## Context

The Villa Monte Calvia website is a Next.js 16 App Router application. All visible text is currently hardcoded in Polish across ~15 component files and 1 data file. Content from Sanity CMS is exclusively images and pricing numbers — no CMS text needs translation. The site has 5 routes: `/`, `/villa`, `/location`, `/gallery`, `/contact`.

## Goals / Non-Goals

**Goals:**
- Support 4 languages: English (default), Italian, Polish, Spanish
- English serves without URL prefix; others use `/it`, `/pl`, `/es` prefixes
- Detect preferred language from `Accept-Language` header on first visit
- Allow users to override language via a persistent switcher
- All hardcoded Polish removed from source code — every visible string goes through `next-intl`
- Locale-aware date formatting, number formatting, and pluralization
- SEO: proper `<html lang>`, per-locale metadata, sitemap with hreflang

**Non-Goals:**
- RTL language support
- Sanity CMS schema changes (CMS stores images only)
- Per-locale content from CMS (all text lives in translation JSON files)
- Server-side geo-IP detection (we use `Accept-Language` only)
- Dynamic language switching without page navigation (each locale is a distinct URL)

## Decisions

### 1. Use `next-intl` for i18n

**Choice**: `next-intl` library with App Router integration

**Rationale**: `next-intl` is the most widely adopted i18n solution for Next.js App Router. It provides middleware for locale detection, `useTranslations()` / `getTranslations()` hooks for client/server components, ICU MessageFormat for pluralization, and locale-aware `<Link>` / `useRouter` wrappers. Rolling our own would replicate most of what `next-intl` already does.

**Alternatives considered**:
- DIY with JSON files + React context — more boilerplate, no built-in middleware, would need to implement locale negotiation manually
- `next-i18next` — designed for Pages Router, App Router support is secondary

### 2. Route structure: `[locale]` segment with default locale elision

**Choice**: Move all pages under `app/[locale]/`, configure `next-intl` middleware to hide the `/en` prefix for the default locale

**Rationale**: `next-intl` natively supports `localePrefix: "as-needed"` which serves English at `/villa` and Italian at `/it/villa`. No custom redirect logic needed.

**Structure**:
```
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── villa/
│   ├── gallery/
│   ├── contact/
│   └── location/
├── api/            ← stays outside [locale]
├── robots.ts       ← stays outside [locale]
└── sitemap.ts      ← stays outside [locale]
```

### 3. Translation file organization

**Choice**: Single JSON file per locale in `messages/` directory, with nested namespaces

**Rationale**: With ~150 keys total across 5 pages, a single file per locale is manageable and avoids the complexity of per-page splitting. Namespaces (`nav`, `home`, `villa`, `pricing`, `contact`, `gallery`, `common`) provide logical grouping within each file.

**File structure**:
```
messages/
├── en.json    ← source of truth
├── it.json
├── pl.json
└── es.json
```

### 4. `Accept-Language` detection with cookie persistence

**Choice**: `next-intl` middleware reads `Accept-Language` on first visit, redirects to the matching locale. After the user selects a language via the switcher, a `NEXT_LOCALE` cookie is set and takes precedence on subsequent visits.

**Rationale**: `Accept-Language` reflects the user's OS/browser language preference, which is more accurate than geo-IP for determining language. The cookie ensures that manual overrides persist. This is the default behavior of `next-intl` middleware.

### 5. Language switcher placement

**Choice**: Horizontal row of locale codes (`EN | IT | PL | ES`) in the existing top bar, right side, separated from social icons by a `|` divider. Active locale is visually distinct (bold or underlined). On mobile, the switcher sits in the same top row.

**Rationale**: Matches the user's stated preference. Keeps the switcher always accessible without cluttering the main nav. Each link is simply `/{locale}{currentPath}`.

### 6. Internal link handling

**Choice**: Replace all `<Link>` from `next/link` and `<a href>` for internal routes with `next-intl`'s locale-aware `<Link>` component. Import `Link` from `@/i18n/navigation` (configured via `next-intl`'s `createNavigation`).

**Rationale**: `next-intl`'s `<Link>` automatically prefixes the correct locale. This avoids manually building locale-prefixed URLs throughout the codebase.

### 7. Villa data.ts refactoring

**Choice**: Convert `data.ts` to export only structural data (keys, amenity arrays, boolean flags). All titles and descriptions move to translation files keyed by room/section key (e.g., `villa.rooms.bedroom-1.title`).

**Rationale**: Keeps one source of truth for translations. The room keys and amenity arrays are language-independent; only the human-readable text needs translation.

### 8. Date and number formatting

**Choice**: Use `next-intl`'s `useFormatter()` hook which provides `format.dateTime()` and `format.number()` methods that respect the current locale. Replace all hardcoded `toLocaleDateString("pl-PL")` and `Intl.NumberFormat("pl-PL")` calls.

**DayPicker locale**: Dynamically import the correct `react-day-picker` locale based on the current `next-intl` locale.

## Risks / Trade-offs

**[Bundle size increase]** → `next-intl` adds ~2-3kB gzipped. Acceptable for the functionality gained.

**[4x static pages at build time]** → Build time increases proportionally. For 5 pages × 4 locales = 20 pages, this is negligible.

**[Translation quality]** → AI-generated translations for IT/ES may have nuanced inaccuracies. Mitigation: translations are in JSON files that can be easily reviewed and corrected.

**[Stale translations]** → Adding new UI text requires updating all 4 JSON files. Mitigation: TypeScript-based key checking with `next-intl` can warn about missing keys in development.

**[DayPicker locale dynamic import]** → Need to conditionally load `pl`, `it`, `es` locale packs for react-day-picker at runtime. Mitigation: these are small locale definition objects; dynamic import with a simple switch is straightforward.
