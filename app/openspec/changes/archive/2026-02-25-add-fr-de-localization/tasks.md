## 1. Routing Configuration

- [x] 1.1 Add `"fr"` and `"de"` to the `locales` array in `app/src/i18n/routing.ts`

## 2. Translation Files

- [x] 2.1 Create `app/messages/fr.json` with all namespaces translated to French (copy structure from `en.json`, translate all values, set `ogLocale` to `fr_FR`, use correct ICU pluralization for French)
- [x] 2.2 Create `app/messages/de.json` with all namespaces translated to German (copy structure from `en.json`, translate all values, set `ogLocale` to `de_DE`, use correct ICU pluralization for German)

## 3. Language Switcher

- [x] 3.1 Add `fr: "FR"` and `de: "DE"` to the `localeLabels` record in `app/src/components/TopNav.tsx`

## 4. Verification

- [x] 4.1 Run the build to confirm static generation succeeds for all 6 locales
- [x] 4.2 Verify FR and DE translation files have identical key structure to `en.json`
