## Context

The `TopNav` component (`app/src/components/TopNav.tsx`) uses `usePathname()` to determine whether the user is on the home page, switching between hero styling (white/transparent for the dark hero background) and subpage styling (dark text for light backgrounds). On the Vercel production domain, ISR pre-rendering bakes the wrong pathname into both the HTML and the RSC payload, causing the client-side router to trust the wrong value through hydration. The navbar stays broken until a client-side navigation occurs.

Current architecture: ~13 `isHome ? heroClass : subpageClass` ternaries scattered across the component's JSX, all driven by a single `usePathname()` call.

## Goals / Non-Goals

**Goals:**

- Zero-flash correct navbar styling on initial page load for all environments (production, preview, localhost)
- Correct navbar styling during client-side navigation between home and subpages
- Simpler TopNav component with no `isHome` ternary branching in JSX

**Non-Goals:**

- Fixing the underlying Next.js/Vercel ISR `usePathname()` bug (upstream issue)
- Fixing the `isActive` nav link indicator on initial load (minor cosmetic, self-corrects on first navigation)

## Decisions

### 1. CSS custom properties for navbar theming

**Decision**: Define navbar colors as CSS custom properties in `:root` (subpage defaults) with `html.is-home` overrides (hero values). TopNav references these variables instead of computing classes conditionally.

**Rationale**: CSS variables resolve at render time based on the current state of the DOM. By toggling a class on `<html>`, all navbar styling switches instantly without React involvement. This decouples visual styling from React's hydration lifecycle.

**Alternative considered**: Keeping React ternaries and using `useLayoutEffect` + `window.location.pathname`. Rejected because `useLayoutEffect` runs after hydration — the browser has already painted the server HTML by then, causing a visible flash.

### 2. Inline blocking script for initial class assignment

**Decision**: Add a raw `<script>` tag (via `dangerouslySetInnerHTML`) as the first child of `<body>` in `layout.tsx`. The script reads `window.location.pathname` and adds `is-home` to `document.documentElement` if on `/`.

**Rationale**: A blocking `<script>` without `async`/`defer` executes during HTML parsing, before the browser paints subsequent elements. This ensures the CSS variables resolve with the correct hero values before the navbar is ever visible. This is the standard pattern for avoiding theme flashes (used by next-themes, dark mode implementations, etc.).

**Alternative considered**: Next.js `<Script strategy="beforeInteractive">`. This is designed for external scripts with `src`; for inline scripts, raw `dangerouslySetInnerHTML` is the established pattern.

### 3. `useEffect` for client-side navigation sync

**Decision**: TopNav adds a `useEffect` that toggles the `is-home` class on `<html>` whenever `usePathname()` changes.

**Rationale**: The inline script only runs once on page load. For subsequent client-side navigations, React's `usePathname()` works correctly (the bug only affects the initial RSC payload). The `useEffect` keeps the CSS class in sync with the current route.

## Risks / Trade-offs

- **[Risk] Inline script adds a tiny blocking resource** → The script is ~90 bytes, negligible impact on parse time
- **[Risk] CSS variables bypass Tailwind's purge/optimization** → Acceptable; the variables are only used by the navbar and are always needed
- **[Trade-off] `isActive` underline for Home link wrong on initial load** → Acceptable cosmetic limitation; the critical fix (visible text on hero) is worth this minor gap
- **[Risk] Future developers may not understand why CSS variables are used instead of React state** → The inline script and CSS comments will explain the SSR workaround
