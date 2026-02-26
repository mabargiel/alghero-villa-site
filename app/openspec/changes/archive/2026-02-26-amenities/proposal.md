## Why

The Home page highlight and amenities sections look plain and text-heavy, which undersells the premium feel of the property. This change makes them visual-first with CMS-managed images, consistent Lucide icons, and a brand-aligned dark strip for amenities.

## What Changes

- Replace “Najważniejsze atuty” with image tiles featuring icon overlays and shorter labels.
- Replace “Udogodnienia” with a single-row Lucide icon grid on a deep olive strip.
- Move all existing inline SVG icons to a consistent Lucide icon set.
- Add CMS control for highlight images and labels.

## Capabilities

### New Capabilities

- `highlights-media`: CMS-managed highlight tiles with image + label and optional alt text.
- `amenities-icon-row`: Single-row amenities grid using Lucide icons and brand-aligned dark strip styling.
- `icon-standardization`: Consistent icon system using Lucide across the site.

### Modified Capabilities

- None.

## Impact

- Sanity schema additions for highlight media and labels.
- Home page layout updates for highlight tiles and amenities row.
- Icon usage updates in TopNav, Contact page, and Home.
