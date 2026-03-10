## Why

The hero section currently shows both the top-left navigation logo and a "Villa Monte Calvia — Alghero" badge, creating visual clutter. Replacing the logo asset with the new branded SVG and centering it in the hero as the focal element (instead of the text badge) produces a cleaner, more impactful first impression while maintaining brand identity.

## What Changes

- Replace the current logo asset (`public/logo.svg`) with the new SVG (`monte calvia-kopia_logo.svg`)
- On the **home/hero page only**, hide the top-left navigation logo and instead display the new logo centered in the hero section, replacing the "Villa Monte Calvia — Alghero" badge
- On **all other pages**, the top-left navigation logo continues to display as before (using the new asset)
- Ensure the centered hero logo is properly sized and aligned on both mobile and desktop
- Realign hero content (headline, scroll indicator, booking bar) to account for the badge-to-logo swap

## Capabilities

### New Capabilities

- `hero-logo`: Centered logo display in the hero section, replacing the text badge, with responsive sizing and proper alignment across breakpoints

### Modified Capabilities

_None — no existing specs to modify._

## Impact

- **Assets**: `public/logo.svg` replaced with new SVG file
- **Components**: `TopNav.tsx` — conditionally hide logo on home page; `page.tsx` (home) — swap badge for centered logo element
- **Styles**: May need new CSS for hero logo sizing/responsive behavior; existing `--nav-logo-*` CSS variables unchanged
- **Translations**: `heroBadge` key becomes unused on the home page (keep for potential future use)
- **Other pages**: No layout changes — subpage headers and navigation unaffected beyond the updated logo asset
