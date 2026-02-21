## 1. Setup & Dependencies

- [x] 1.1 Install `next-intl` package
- [x] 1.2 Create `i18n/routing.ts` with locale config (locales array, default locale, `localePrefix: "as-needed"`)
- [x] 1.3 Create `i18n/navigation.ts` using `createNavigation` from `next-intl` for locale-aware `Link`, `redirect`, `usePathname`, `useRouter`
- [x] 1.4 Create `i18n/request.ts` with `getRequestConfig` for server-side locale/messages loading
- [x] 1.5 Create `middleware.ts` at app root with `next-intl` middleware using `Accept-Language` detection

## 2. Translation Files

- [x] 2.1 Create `messages/en.json` with all namespaces: `nav`, `home`, `villa`, `pricing`, `contact`, `gallery`, `common`, `metadata` — full English translations for all ~150 keys
- [x] 2.2 Create `messages/pl.json` — full Polish translations (migrating existing hardcoded strings)
- [x] 2.3 Create `messages/it.json` — full Italian translations
- [x] 2.4 Create `messages/es.json` — full Spanish translations

## 3. Route Restructuring

- [x] 3.1 Create `app/[locale]/layout.tsx` — move root layout content here, add `NextIntlClientProvider`, set dynamic `<html lang>`, use `getTranslations` for metadata
- [x] 3.2 Move `app/page.tsx` → `app/[locale]/page.tsx`
- [x] 3.3 Move `app/villa/` → `app/[locale]/villa/`
- [x] 3.4 Move `app/gallery/` → `app/[locale]/gallery/`
- [x] 3.5 Move `app/contact/` → `app/[locale]/contact/`
- [x] 3.6 Move `app/location/` → `app/[locale]/location/`
- [x] 3.7 Keep `app/api/` routes outside `[locale]` — verify they still work
- [x] 3.8 Update root `app/layout.tsx` to be a minimal wrapper (or remove if not needed)

## 4. Component Localization — Navigation

- [x] 4.1 Update `TopNav.tsx`: replace hardcoded nav labels with `useTranslations("nav")`, replace `Link` from `next/link` with locale-aware `Link` from `@/i18n/navigation`, translate "Menu" button and all aria-labels
- [x] 4.2 Add language switcher to `TopNav.tsx`: horizontal EN|IT|PL|ES row next to social icons separated by `|`, active locale visually distinct, each link navigates to current path in target locale

## 5. Component Localization — Home Page

- [x] 5.1 Update `app/[locale]/page.tsx`: replace all hardcoded Polish strings with `getTranslations("home")` calls — hero headline, section titles/subtitles/descriptions, amenity labels, location items, CTAs, scroll indicator, aria-labels
- [x] 5.2 Update home page metadata to use translated title/description per locale

## 6. Component Localization — Villa Page

- [x] 6.1 Refactor `villa/data.ts`: remove all Polish text, export only structural data (keys, amenity arrays, flags)
- [x] 6.2 Update `villa/page.tsx`: use `getTranslations("villa")` for subpage header, stat labels, and pass locale context to client component
- [x] 6.3 Update `VillaPageClient.tsx`: use `useTranslations("villa")` for amenity labels, sub-nav group labels, section headings, room/exterior titles and descriptions, CTA text. Replace `Link` with locale-aware version
- [x] 6.4 Update `VillaSubNav.tsx`: ensure all labels come from translations passed as props

## 7. Component Localization — Pricing & Booking

- [x] 7.1 Update `BookingBar.tsx`: replace "Zameldowanie"/"Wymeldowanie"/"Sprawdź cenę" with translations, replace hardcoded `pl-PL` date/number formatting with locale-aware formatting
- [x] 7.2 Update `PricingModal.tsx`: translate "Sprawdź cenę" header, "Zamknij" aria-label
- [x] 7.3 Update `PricingCalendar.tsx`: dynamically load `react-day-picker` locale based on current locale, translate TIER_LABELS and "Promocja" legend label, replace `pl-PL` weekday formatting
- [x] 7.4 Update `PriceSummary.tsx`: translate "Podsumowanie", "Razem", extras labels ("Sprzątanie", "Depozyt zwrotny", "w cenie"), "Zapytaj o termin" CTA, min-nights warning, empty state prompt, night pluralization using ICU format. Replace `pl-PL` date/number formatting. Make `/contact` link locale-aware

## 8. Component Localization — Contact & Gallery

- [x] 8.1 Update `contact/page.tsx`: translate subpage header (eyebrow, title, description)
- [x] 8.2 Update `ContactForm.tsx`: translate form labels ("Imię", "Email", "Telefon"), button text, success/error messages
- [x] 8.3 Update `ContactInfoPanel.tsx`: translate "Sprawdź dojazd" button and map alt text
- [x] 8.4 Update `gallery/page.tsx`: translate subpage header and empty-state fallback message

## 9. Component Localization — Layout & Common

- [x] 9.1 Update layout footer: translate "All rights reserved" and "Designed and implemented by"
- [x] 9.2 Update `SubpageHeader.tsx`: ensure it accepts translated props (no changes needed if it already receives text via props)

## 10. SEO & Sitemap

- [x] 10.1 Update `sitemap.ts`: generate entries for all 4 locales with hreflang alternates
- [x] 10.2 Update per-page metadata in each `[locale]` page to use `getTranslations("metadata")` for locale-specific titles and descriptions
- [x] 10.3 Verify `robots.ts` still works correctly outside `[locale]`

## 11. Verification

- [x] 11.1 Build the project (`next build`) and verify no build errors
- [x] 11.2 Manually verify all 4 locales render correctly on key pages (home, villa, contact)
- [x] 11.3 Verify language switcher works and persists preference via cookie
- [x] 11.4 Verify Accept-Language detection redirects correctly on first visit
- [x] 11.5 Verify internal links include correct locale prefix
- [x] 11.6 Verify no hardcoded Polish strings remain in source code
