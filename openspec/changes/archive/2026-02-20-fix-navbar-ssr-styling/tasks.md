## 1. CSS Custom Properties

- [x] 1.1 Add navbar-mode CSS variables to `:root` in `globals.css` (subpage defaults: `--nav-text`, `--nav-text-muted`, `--nav-text-hover`, `--nav-active`, `--nav-logo-bg`, `--nav-logo-shadow`, `--nav-border`, `--nav-hamburger`, `--nav-mobile-bg`, `--nav-mobile-text`, `--nav-mobile-border`, `--nav-underline`)
- [x] 1.2 Add `html.is-home` override block in `globals.css` with hero-mode values for all navbar variables
- [x] 1.3 Remove the old SSR flash workaround (lines 80-86: "Smooth color transition for nav to avoid SSR flash")

## 2. Inline Script

- [x] 2.1 Add blocking inline `<script>` as first child of `<body>` in `layout.tsx` that reads `window.location.pathname` and adds `is-home` class to `<html>` when on `/`

## 3. TopNav Refactor

- [x] 3.1 Add `useEffect` that toggles `is-home` class on `document.documentElement` based on `usePathname()` value
- [x] 3.2 Remove the `isHome` variable and replace all `isHome` ternary expressions with CSS variable references (social icons, logo, desktop nav, active/hover links, underline, mobile button, hamburger lines, mobile nav)

## 4. Verification

- [x] 4.1 Run `npm run build && npm run start` and verify home page navbar is white/hero-styled on initial load
- [x] 4.2 Verify subpage navbar is dark/subpage-styled on initial load
- [x] 4.3 Verify client-side navigation between home and subpages toggles navbar styling correctly
- [x] 4.4 View page source and confirm `<script>` appears before `<header>` and no `isHome` ternaries remain in TopNav
