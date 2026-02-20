## Why

The villa website currently serves all content in hardcoded Polish, limiting its reach to Polish-speaking visitors. As a vacation rental in Sardinia, Italy, the site needs to address Italian guests, international travelers (English), and the Spanish market. Adding multi-language support will broaden the audience and improve booking conversions from non-Polish visitors.

## What Changes

- Add `next-intl` for internationalization with Next.js App Router
- Restructure routes under a `[locale]` dynamic segment (`en`, `it`, `pl`, `es`)
- English is the default locale (no URL prefix); non-default locales use prefixed URLs (`/it/villa`, `/pl/contact`, `/es/gallery`)
- Add middleware for `Accept-Language` header detection and locale routing
- Extract all hardcoded Polish strings (~120-150 keys) into JSON translation files (`messages/en.json`, `messages/it.json`, `messages/pl.json`, `messages/es.json`)
- Add a language switcher in the top bar (next to social icons, separated by `|`)
- Locale-aware date/number formatting (replace hardcoded `pl-PL`)
- Locale-aware internal links (all `<Link>` and `<a>` hrefs)
- Locale-aware sitemap with hreflang alternates
- Locale-aware metadata (page titles, descriptions, OG tags per language)
- Dynamic `<html lang>` attribute based on active locale
- User can always override detected language via the switcher; preference persisted via cookie

## Capabilities

### New Capabilities
- `i18n-routing`: Locale-based URL routing with `[locale]` segment, middleware for Accept-Language detection, cookie-based preference persistence, and default-locale URL elision
- `i18n-translations`: Translation file structure, string extraction from all components, ICU MessageFormat for pluralization, locale-aware date/number formatting
- `language-switcher`: Horizontal language selector in top bar next to social icons, visible on all pages, works on both desktop and mobile

### Modified Capabilities
- `navbar-transparent-overlay`: TopNav gains the language switcher row and all nav labels become translatable
- `hero-booking-bar`: Date formatting, "Check-in"/"Check-out" labels, and price formatting become locale-aware
- `pricing-calendar`: DayPicker locale, tier labels, and legend become locale-aware
- `pricing-modal`: Summary labels, night pluralization, extras, CTA become translatable
- `villa-subpage`: Room data, exterior data, amenity labels, stat labels, sub-nav labels all move to translation files
- `contact-info-panel`: "Sprawdź dojazd" and map alt text become translatable

## Impact

- **Dependencies**: Add `next-intl` package
- **Routing**: All page files move from `app/` to `app/[locale]/`; new `middleware.ts` at app root
- **Components**: Every component with visible text gains translation hooks (`useTranslations` / `getTranslations`)
- **Data files**: `villa/data.ts` restructured to use translation keys instead of Polish strings
- **SEO**: Sitemap expands to 4x entries with hreflang; robots.txt unchanged
- **CMS**: No Sanity schema changes needed (CMS handles images only)
- **Build**: Static generation now produces pages for 4 locales
