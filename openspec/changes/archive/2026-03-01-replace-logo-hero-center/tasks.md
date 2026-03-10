## 1. Replace Logo Asset

- [x] 1.1 Copy new SVG (`monte calvia-kopia_logo.svg`) to `public/logo.svg`, replacing the existing file

## 2. TopNav: Conditional Logo Hiding

- [x] 2.1 Add `hideLogo?: boolean` prop to `TopNav` component (adapted: used `usePathname()` detection since TopNav lives in shared layout)
- [x] 2.2 When `hideLogo` is true, hide the logo `<Link>` and adjust nav bar alignment (`justify-end` on desktop, keep mobile menu button in place)
- [x] 2.3 Pass `hideLogo={true}` from the home page layout to `TopNav` (adapted: auto-detected via `isHome = pathname === "/"` instead)

## 3. Hero: Replace Badge with Centered Logo

- [x] 3.1 In `src/app/[locale]/page.tsx`, replace the `heroBadge` div with a centered logo `<img>` (or Next.js `Image` with `unoptimized`)
- [x] 3.2 Apply responsive sizing: `w-64` on mobile, `md:w-96`, with `h-auto`
- [x] 3.3 Use CSS mask with white fill (same technique as nav) if the dark-fill SVG doesn't contrast well against the hero overlay — evaluate visually
- [x] 3.4 Adjust headline spacing from `mt-6` to `mt-8` for visual balance below the larger logo

## 4. Verify Responsiveness and Alignment

- [x] 4.1 Verify hero content (logo, headline, booking bar, scroll indicator) is centered and properly spaced on mobile
- [x] 4.2 Verify hero content is centered and properly spaced on desktop
- [x] 4.3 Verify non-home pages (villa, location, gallery, contact) show the nav logo correctly with the new asset
- [x] 4.4 Verify mobile navigation menu still works correctly when logo is hidden on home page
