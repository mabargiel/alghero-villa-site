## Why

Home page sections still show placeholder media and the CMS mixes hero and gallery images, which makes content updates slow and inconsistent. This change makes the Home page fully CMS-driven for imagery (with a clear hero vs gallery split) and adds premium motion without risking scroll or hydration issues.

## What Changes

- Replace Home page placeholders with real CMS-managed images per section.
- Split CMS hero media from gallery images into separate, dedicated structures.
- Add desktop-only hero video support with a mobile/static image fallback.
- Introduce lightweight, hydration-safe animations for Home page sections and media.

## Capabilities

### New Capabilities
- `home-page-media`: CMS-managed hero media with desktop video support and a mobile/static fallback, plus image handling for the Home page.
- `home-section-images`: CMS-managed single image per Home section (property, interiors, garden, location) with required alt text.
- `gallery-hero-separation`: Separate CMS structures for hero media and gallery images.
- `home-page-animations`: Motion behavior for Home page sections that remains responsive, non-blocking, and reduced-motion aware.

### Modified Capabilities
- None.

## Impact

- Sanity schema in `alghero-villa-cms` (new document types and updated gallery).
- Next.js Home page data fetching and rendering in `alghero-house/app`.
- Hero media handling (`HeroMedia`) and new image usage for section blocks.
- CSS and small client-side behaviors for scroll/hover animations.
