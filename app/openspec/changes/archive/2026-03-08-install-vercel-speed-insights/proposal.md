## Why

We already use Vercel Analytics for page views but have no visibility into real-user performance metrics (LCP, FID, CLS, TTFB). Adding Vercel Speed Insights gives us Web Vitals monitoring on every deployment so we can catch performance regressions early.

## What Changes

- Add `@vercel/speed-insights` npm package
- Render the `<SpeedInsights />` component in the root layout alongside the existing `<Analytics />` component

## Capabilities

### New Capabilities
- `vercel-speed-insights`: Collecting and reporting real-user Web Vitals (LCP, FID, CLS, TTFB, INP) via Vercel Speed Insights

### Modified Capabilities
_(none — no existing spec requirements change)_

## Impact

- **Dependencies**: New package `@vercel/speed-insights`
- **Code**: `src/app/layout.tsx` — one additional import and component
- **Infrastructure**: Vercel dashboard will begin receiving Speed Insights data on next deploy
- **Bundle size**: Minimal — the package loads asynchronously
