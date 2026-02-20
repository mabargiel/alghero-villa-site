## Why

The navbar on `montecalvia.com` renders with dark subpage styling on the home page hero, making navigation links invisible (dark text on dark background). This is caused by `usePathname()` returning an incorrect value during ISR pre-rendering on Vercel production, and the wrong value persisting through hydration via the RSC payload. The bug only affects the production custom domain — localhost and Vercel preview URLs work correctly.

## What Changes

- Replace all React-computed `isHome` ternaries in `TopNav` with CSS custom properties that switch based on an `is-home` class on `<html>`
- Add an inline `<script>` in the root layout that reads `window.location.pathname` before the first paint and sets the `is-home` class, bypassing the broken `usePathname()` for initial visual styling
- Add a `useEffect` in `TopNav` to sync the `is-home` class during client-side navigation
- Remove the existing CSS workaround ("Smooth color transition for nav to avoid SSR flash")

## Capabilities

### New Capabilities

- `navbar-ssr-fix`: CSS-variable-driven navbar theming with inline script for zero-flash correct styling on initial page load

### Modified Capabilities

_None — no existing spec-level requirements change._

## Impact

- `app/src/components/TopNav.tsx` — major refactor: all `isHome` conditionals replaced with CSS variable references
- `app/src/app/globals.css` — new CSS custom properties for navbar modes
- `app/src/app/layout.tsx` — inline script added before `<TopNav />`
