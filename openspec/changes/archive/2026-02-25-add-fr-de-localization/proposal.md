## Why

The villa website currently supports 4 languages (EN, IT, PL, ES) but the target audience includes French and German travelers — two of the largest tourism demographics visiting Sardinia. Adding French and German expands reach to these key markets with minimal effort, since the i18n infrastructure is already in place.

## What Changes

- Add `fr` and `de` to the supported locales list in the routing configuration
- Create `fr.json` and `de.json` translation files with all existing namespaces fully translated
- Update the language switcher UI to display FR and DE alongside existing locale codes
- Update sitemap to include `fr` and `de` hreflang entries for all pages
- Update OG metadata to use `fr_FR` and `de_DE` locale codes
- Middleware automatically handles the new locales (no changes needed)
- Static generation automatically picks up new locales via `generateStaticParams()` (no changes needed)

## Capabilities

### New Capabilities

_(none — this change extends existing capabilities, no new spec domains introduced)_

### Modified Capabilities

- `i18n-routing`: Expand supported locales from `["en", "it", "pl", "es"]` to `["en", "it", "pl", "es", "fr", "de"]`; update scenarios for FR/DE routing, Accept-Language detection, and sitemap hreflang
- `i18n-translations`: Add `fr.json` and `de.json` translation files with all namespaces; include FR/DE pluralization rules (ICU MessageFormat); add FR/DE date and number formatting scenarios
- `language-switcher`: Expand switcher to display 6 locale codes (EN, IT, PL, ES, FR, DE) with same navigation and cookie behavior

## Impact

- **Files modified**: `src/i18n/routing.ts`, `src/components/TopNav.tsx`
- **Files created**: `messages/fr.json`, `messages/de.json`
- **Build**: Static page count increases (~2x more locale variants generated)
- **No dependency changes**: `next-intl` already supports any number of locales
- **No breaking changes**: Existing locale URLs and behavior unchanged
