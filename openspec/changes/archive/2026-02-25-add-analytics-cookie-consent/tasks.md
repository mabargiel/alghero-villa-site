## 1. Vercel Web Analytics

- [x] 1.1 Install `@vercel/analytics` package (`npm i @vercel/analytics`)
- [x] 1.2 Add `<Analytics />` component to `app/src/app/layout.tsx` inside `<body>`

## 2. Consent Infrastructure

- [x] 2.1 Create `ConsentProvider` client component (`app/src/components/ConsentProvider.tsx`) with React context that reads/writes `localStorage` key `cookie-consent` and exposes consent state (`null | "granted" | "denied"`) and updater function
- [x] 2.2 Create `CookieBanner` client component (`app/src/components/CookieBanner.tsx`) — fixed bottom banner with localized text, Accept/Reject buttons, and privacy policy link; reads and updates consent via context
- [x] 2.3 Create `TrackingPixels` client component (`app/src/components/TrackingPixels.tsx`) — conditionally renders FastTony pixel `<Script>` tag only when consent is `"granted"`
- [x] 2.4 Integrate `ConsentProvider`, `CookieBanner`, and `TrackingPixels` into `app/src/app/[locale]/layout.tsx`

## 3. Footer Updates

- [x] 3.1 Add "Cookie preferences" link to the footer in `app/src/app/[locale]/layout.tsx` that re-opens the consent banner
- [x] 3.2 Add "Privacy Policy" link to the footer in `app/src/app/[locale]/layout.tsx` linking to `/<locale>/privacy`

## 4. Privacy Policy Page

- [x] 4.1 Create `app/src/app/[locale]/privacy/page.tsx` with privacy & cookie policy content rendered from translations
- [x] 4.2 Add `privacy` translation namespace to `app/messages/en.json` with all GDPR-required sections (data controller, data collected, purposes, cookies, third parties, retention, user rights, contact)
- [x] 4.3 Add `privacy` translations to `app/messages/it.json`
- [x] 4.4 Add `privacy` translations to `app/messages/pl.json`
- [x] 4.5 Add `privacy` translations to `app/messages/es.json`

## 5. Consent Banner Translations

- [x] 5.1 Add `cookieConsent` translation keys to `app/messages/en.json` (banner text, accept, reject, privacy link, cookie preferences)
- [x] 5.2 Add `cookieConsent` translations to `app/messages/it.json`
- [x] 5.3 Add `cookieConsent` translations to `app/messages/pl.json`
- [x] 5.4 Add `cookieConsent` translations to `app/messages/es.json`
