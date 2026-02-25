## Context

The site uses `next-intl` (v4.8.3) with a `[locale]` dynamic route segment supporting `en`, `it`, `pl`, `es`. Translation files live in `app/messages/<locale>.json` (223 lines each, 10 namespaces). The language switcher in `TopNav.tsx` renders locale codes from a static `localeLabels` map. Middleware, navigation helpers, and `generateStaticParams()` all derive from the routing config's `locales` array — adding a locale there propagates automatically.

## Goals / Non-Goals

**Goals:**

- Add `fr` and `de` as fully supported locales with complete translations
- Follow the exact same patterns used for existing locales — no new abstractions
- Ensure proper ICU pluralization for French and German grammatical rules

**Non-Goals:**

- Redesigning the language switcher layout (6 items still fits the current horizontal row)
- Adding locale-specific content in Sanity CMS (translations are UI-only, CMS content is separate)
- Regional variants (e.g., `fr-CH`, `de-AT`) — only `fr` and `de`

## Decisions

### 1. Translation source: Manual translation from English source

**Decision**: Translate all keys from `en.json` into French and German manually (or via high-quality translation), maintaining identical key structure.
**Rationale**: The existing files (`it.json`, `pl.json`, `es.json`) were created this way. Machine translation alone risks inaccurate villa descriptions, legal text (privacy policy), and marketing copy. The key structure must be identical across all files.

### 2. Locale codes: `fr` and `de`

**Decision**: Use standard ISO 639-1 codes `fr` and `de`, with OG locale values `fr_FR` and `de_DE`.
**Rationale**: Matches the pattern of existing locales (`en` → `en_GB`, `it` → `it_IT`, `pl` → `pl_PL`, `es` → `es_ES`).

### 3. No routing config changes beyond locales array

**Decision**: Only modify the `locales` array in `routing.ts`. Default locale remains `en`, `localePrefix` remains `"as-needed"`.
**Rationale**: The `next-intl` middleware, navigation helpers, and static generation all derive behavior from this array. No other routing changes needed.

### 4. Language switcher: Add FR/DE to existing localeLabels map

**Decision**: Add `fr: "FR"` and `de: "DE"` to the `localeLabels` record in `TopNav.tsx`. The switcher already iterates `routing.locales`, so it will automatically render the new items.
**Rationale**: Minimal code change. The horizontal layout accommodates 6 short labels.

## Risks / Trade-offs

- **Build time increase** → Static generation produces pages for 6 locales instead of 4 (~50% more pages). Acceptable for this site size.
- **Translation quality** → FR/DE translations must be reviewed by native speakers before going live. Mitigation: can deploy behind feature branch for review.
- **Switcher crowding on mobile** → 6 locale codes in a row may be tight on very small screens. Mitigation: current codes are 2 chars each with small gaps; 6 items fit within typical mobile widths. Monitor after deployment.
