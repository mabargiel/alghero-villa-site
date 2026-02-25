## Context

Villa Monte Calvia is a Next.js 16 App Router site deployed on Vercel, with `next-intl` providing i18n across 4 locales (en, it, pl, es). There is currently no analytics, no cookie consent, and no privacy policy. The site targets EU-wide visitors renting a holiday villa in Sardinia.

Two tracking integrations are needed:
1. **Vercel Web Analytics** — cookie-free, privacy-friendly, always-on
2. **FastTony pixel** — a Meta Pixel proxy that drops cookies and requires GDPR consent

## Goals / Non-Goals

**Goals:**
- Integrate Vercel Web Analytics for page-view tracking
- Load FastTony pixel only after explicit user consent
- Provide a GDPR-compliant cookie consent banner in all 4 locales
- Create a privacy & cookie policy page in all 4 locales
- Allow users to change their consent preference after initial choice

**Non-Goals:**
- Granular consent categories (all marketing cookies are one bucket — only FastTony)
- Server-side consent propagation or Consent Mode API integration
- Cookie consent for Vercel Analytics (it doesn't use cookies)
- A full-blown CMP (Consent Management Platform) — keep it simple and custom

## Decisions

### 1. Vercel Analytics placement — root layout

**Decision:** Render `<Analytics />` from `@vercel/analytics/next` in `app/src/app/layout.tsx` (root layout), not the locale layout.

**Rationale:** Vercel Analytics is cookie-free and doesn't need consent or localization context. Placing it in the root layout ensures every page is tracked, including error pages and non-locale routes. This matches Vercel's recommended setup.

**Alternative considered:** Locale layout — rejected because it would miss non-locale routes and unnecessarily couples analytics to i18n.

### 2. Consent state — localStorage with a React context

**Decision:** Store consent as a string value (`"granted"` | `"denied"`) in `localStorage` under key `cookie-consent`. Expose state and updater through a `ConsentProvider` React context wrapping the locale layout.

**Rationale:** localStorage is the simplest persistence mechanism, survives sessions, and doesn't itself require consent (it's not a cookie). A React context makes consent state available to both the banner component and the tracking script component without prop drilling.

**Alternative considered:** Cookie-based storage — rejected because storing consent in a cookie is paradoxical (you'd need consent to set the consent cookie). A dedicated consent cookie is technically exempt under GDPR, but localStorage is simpler and avoids confusion.

### 3. Conditional script loading — render-gated, not script-blocking

**Decision:** The `<TrackingPixels />` component simply does not render the `<Script>` tag until consent is `"granted"`. No scripts are loaded, blocked, or paused — they just don't exist in the DOM until consent.

**Rationale:** This is the cleanest GDPR approach. No tracking code touches the browser until after explicit opt-in. Using Next.js `<Script strategy="afterInteractive">` ensures the pixel loads promptly after consent without blocking rendering.

**Alternative considered:** Loading the pixel immediately but in "paused" mode (Meta Consent Mode) — rejected because FastTony is a proxy and may not support Meta's consent mode API. Not loading at all is simpler and unambiguously compliant.

### 4. Cookie banner — minimal bottom toast

**Decision:** A fixed-position bottom banner with: explanation text, "Accept" button, "Reject" button, and a link to the privacy policy page. Dismisses on choice and doesn't reappear.

**Rationale:** A villa rental site needs a welcoming first impression. An intrusive modal or full-screen overlay hurts UX. A bottom toast is the industry standard for simple consent. Since there's only one category (marketing), there's no need for a preference center.

### 5. Re-consent — footer link

**Decision:** Add a "Cookie preferences" link in the existing footer that re-opens the consent banner.

**Rationale:** GDPR requires that consent be as easy to withdraw as to give. A footer link is discoverable without cluttering the UI. No floating cookie icon needed.

### 6. Privacy policy — static page with hardcoded localized content

**Decision:** Create a `/privacy` route under `[locale]` with content in translation JSON files. No CMS integration.

**Rationale:** Privacy policy content rarely changes and is tightly coupled to the codebase (it references specific technologies). Keeping it in translation files alongside other content is consistent with the existing i18n pattern and avoids CMS overhead.

### 7. FastTony pixel ID — hardcoded

**Decision:** The FastTony pixel URL (`https://pixel.fasttony.com/ae3a14b9d5b54ee3b7fe46d18c346c55`) is hardcoded in the `TrackingPixels` component, not stored in an env var.

**Rationale:** This is a single, stable script URL tied to the account. There's no scenario where it varies between environments. An env var adds indirection without benefit.

## Risks / Trade-offs

- **[Risk] FastTony pixel may fire before consent on client navigation** → Mitigation: The `<Script>` tag is only rendered when consent is granted, and `strategy="afterInteractive"` ensures it loads once. On subsequent navigations, the script is already loaded — but this is expected behavior since consent was already given.

- **[Risk] localStorage not available (SSR, private browsing edge cases)** → Mitigation: Default to `null` (no consent), which shows the banner. Wrap localStorage access in try/catch.

- **[Trade-off] Hardcoded privacy policy text vs CMS** → Accepted: privacy policy is a legal document that changes infrequently. Translation files are sufficient. If it needs frequent updates later, it can be moved to Sanity.

- **[Trade-off] No granular consent categories** → Accepted: With only one tracking pixel, categories add complexity without value. If more pixels are added later, the ConsentProvider can be extended to support categories.
