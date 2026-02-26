## Why

The site has no visitor analytics and no cookie consent mechanism. Adding Vercel Web Analytics provides privacy-friendly page-view data without cookies. Adding the FastTony pixel (Meta Pixel proxy) enables marketing campaign tracking — but since it drops cookies, EU-wide GDPR compliance requires an explicit cookie consent banner. The site also lacks a privacy/cookie policy page, which is legally required when collecting any user data in the EU.

## What Changes

- **Add Vercel Web Analytics** — install `@vercel/analytics` and render `<Analytics />` in the root layout. This is cookie-free and always loaded.
- **Add FastTony pixel** — load `https://pixel.fasttony.com/ae3a14b9d5b54ee3b7fe46d18c346c55` only after the user grants cookie consent.
- **Add cookie consent banner** — a localized (EN/IT/PL) bottom-of-screen banner that lets visitors accept or reject marketing cookies. Choice persists in `localStorage`. A footer link lets users change their preference later.
- **Add privacy & cookie policy page** — a new `/privacy` route with localized content covering data collection, cookie usage, user rights (GDPR Articles 13-14), and contact information.

## Capabilities

### New Capabilities
- `vercel-analytics`: Vercel Web Analytics integration — always-on, cookie-free page-view tracking
- `cookie-consent`: GDPR-compliant cookie consent banner with persistent preference and conditional script loading
- `privacy-policy`: Privacy and cookie policy page with localized content

### Modified Capabilities
_None — no existing spec-level requirements change._

## Impact

- `app/package.json` — new dependency `@vercel/analytics`
- `app/src/app/layout.tsx` — add `<Analytics />` component
- `app/src/app/[locale]/layout.tsx` — add consent provider, cookie banner, conditional tracking scripts
- `app/src/components/` — new `CookieConsent.tsx`, `TrackingPixels.tsx` components
- `app/src/app/[locale]/privacy/page.tsx` — new route
- `app/src/messages/*.json` — new translation keys for banner and privacy page
