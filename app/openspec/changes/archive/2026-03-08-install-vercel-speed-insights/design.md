## Context

The app is a Next.js 16 site deployed on Vercel. Vercel Analytics (`@vercel/analytics`) is already installed in `src/app/layout.tsx` as a sibling component inside `<body>`. Speed Insights is a companion product that collects real-user Web Vitals using the same deployment infrastructure.

## Goals / Non-Goals

**Goals:**

- Collect real-user Web Vitals (LCP, FID, CLS, TTFB, INP) via Vercel Speed Insights
- Zero-config setup — no custom reporting endpoint or environment variables required

**Non-Goals:**

- Custom performance thresholds or alerting
- Synthetic / lab performance testing (Lighthouse CI, etc.)
- Self-hosted or third-party Web Vitals reporting

## Decisions

### Use `@vercel/speed-insights` package

**Choice**: Install the official `@vercel/speed-insights` package and render `<SpeedInsights />` in the root layout.
**Rationale**: This is the Vercel-recommended approach for Next.js. The component auto-detects the Vercel environment, loads asynchronously, and requires no configuration. It mirrors the pattern already used for `<Analytics />`.
**Alternatives considered**: Manual `web-vitals` library + custom reporting — rejected because it adds unnecessary complexity for a Vercel-hosted app.

### Place component in root layout

**Choice**: Add `<SpeedInsights />` next to `<Analytics />` in `src/app/layout.tsx`.
**Rationale**: Root layout is the single entry point for all pages, ensuring metrics are collected site-wide. This follows the same pattern as the existing Analytics component.

## Risks / Trade-offs

- **[Minimal bundle impact]** → The package loads asynchronously and does not block rendering. No mitigation needed.
- **[Vercel-only]** → Speed Insights only works on Vercel deployments. If the hosting platform changes, this component becomes a no-op. → Acceptable trade-off given current infrastructure commitment.
