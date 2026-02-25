## ADDED Requirements

### Requirement: Vercel Web Analytics is loaded on every page
The site SHALL include the `@vercel/analytics/next` `<Analytics />` component in the root layout so that every page view is tracked.

#### Scenario: Page view is recorded
- **WHEN** a visitor loads any page on the site
- **THEN** a request to `/_vercel/insights/view` SHALL be made

#### Scenario: Analytics loads without consent
- **WHEN** a visitor has not interacted with the cookie consent banner
- **THEN** the Vercel Analytics script SHALL still be loaded (it is cookie-free)

### Requirement: Analytics component is placed in root layout
The `<Analytics />` component SHALL be rendered inside `<body>` in `app/src/app/layout.tsx`, not in the locale layout.

#### Scenario: Non-locale route is tracked
- **WHEN** a visitor hits a non-locale route (e.g., API route, error page)
- **THEN** the Analytics component SHALL still be present in the DOM
