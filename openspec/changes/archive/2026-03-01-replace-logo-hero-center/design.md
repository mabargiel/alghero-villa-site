## Context

The home page hero currently shows:

1. A top-left logo in `TopNav` (CSS-masked `public/logo.svg`, 228KB, `h-20 w-64`)
2. A centered "Villa Monte Calvia — Alghero" text badge (rounded pill with white bg)
3. A headline below the badge

The new logo SVG (`monte calvia-kopia_logo.svg`, ~49KB, viewBox `41 100 293 156`) replaces the old asset and becomes the centered hero focal point instead of the text badge. On non-home pages, the nav logo stays visible as-is.

**Key files:**

- `src/components/TopNav.tsx` — navigation logo + responsive menu
- `src/app/[locale]/page.tsx` — hero section with badge + headline
- `public/logo.svg` — logo asset (to be replaced)
- `src/app/globals.css` — nav/hero CSS variables

## Goals / Non-Goals

**Goals:**

- Replace `public/logo.svg` with the new branded SVG
- On the home page hero, replace the text badge with the logo displayed as a centered `<img>` element
- Hide the TopNav logo when on the home page to avoid duplication
- Maintain mobile and desktop responsiveness

**Non-Goals:**

- Changing the logo rendering technique on subpages (CSS mask stays)
- Modifying the booking bar, scroll indicator, or hero media
- Redesigning the navigation layout or menu behavior
- Changing any other page's layout

## Decisions

### 1. Logo asset: direct file replacement

Replace `public/logo.svg` with the new file. The CSS-mask approach in TopNav will continue to work since the asset path stays the same. This avoids updating references across components.

**Alternative considered:** keeping both files and using different paths. Rejected because there's no need for the old logo and it would add confusion.

### 2. Hero logo: use `<img>` tag (not CSS mask)

In the hero, render the logo as an `<img>` (or Next.js `Image` with `unoptimized` since it's an SVG) to display the original SVG colors/details against the dark hero background. The CSS-mask approach in the nav is designed for single-color rendering and wouldn't show the logo's actual design.

**Alternative considered:** Using CSS mask with white fill like the nav. Rejected because a centered hero logo benefits from the full branded appearance of the SVG.

### 3. Conditional nav logo hiding via prop

Add an optional `hidelogo` prop to `TopNav`. The home page passes `hideLogo={true}`. When set, the logo `<Link>` is hidden but nav items and mobile menu remain in place. The nav bar adjusts with `justify-end` (or `justify-center` on mobile) when the logo is hidden.

**Alternative considered:** Using `usePathname()` to auto-detect home page. Rejected because it creates implicit coupling — a prop is explicit, testable, and doesn't break if routes change.

### 4. Responsive hero logo sizing

Use Tailwind responsive classes for the centered logo:

- Mobile: `w-64` (256px) — fits comfortably in mobile viewport
- Desktop (`md:`): `w-96` (384px) — larger for bigger screens

The logo's ~1.88:1 aspect ratio (293×156) means height scales naturally with `h-auto`.

### 5. Keep headline below the logo

The headline ("Your private retreat among the palms") stays below the centered logo, replacing the old badge→headline stack with a logo→headline stack. Spacing adjusts from `mt-6` to `mt-8` for better visual balance with the larger logo element.

## Risks / Trade-offs

- **[New SVG rendering]** The new logo has a black fill. On the dark hero overlay it may not contrast well enough. → Mitigation: Apply a white CSS filter or use the CSS-mask technique with white fill specifically for the hero instance. Evaluate visually during implementation.
- **[Nav spacing when logo hidden]** Hiding the logo shifts nav alignment. → Mitigation: Use `justify-end` for desktop nav (items stay right), and keep mobile menu button in its normal position.
- **[SVG file size]** The new logo (49KB) is smaller than the old one (228KB), so no performance concern.
