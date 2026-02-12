## Context

The Home page currently uses placeholder blocks for section media and relies on a single `gallery` document for both hero and gallery images. The change introduces CMS-owned hero media (with a desktop video option) and a dedicated image per Home section, while keeping animations lightweight and hydration-safe.

## Goals / Non-Goals

**Goals:**

- Provide CMS-managed hero media with desktop video support and a mobile/static fallback.
- Provide CMS-managed single images (with required alt text) for the four Home sections.
- Split hero and gallery structures in the CMS for clarity and editing.
- Add on-scroll/hover animations that do not block scrolling or delay interactivity.

**Non-Goals:**

- Editing Home section copy in CMS (text remains hardcoded for now).
- Building the interiors subpage with multi-room imagery.
- Introducing heavy animation frameworks or scroll hijacking libraries.

## Decisions

- **CMS document split:** Create a dedicated `hero` document for hero media, keep a separate `gallery` document for gallery images, and add a `homeSection` document keyed by `sectionKey` (`property`, `interiors`, `garden`, `location`) with a single image + alt text. This keeps editorial responsibilities clear and avoids mixing media types.
- **Hero video handling:** Store a `videoUrl` string for desktop playback and a required `mobileImage` used for mobile and as the video poster/fallback. Desktop uses video when present; otherwise it falls back to rotating hero images.
- **Section image layout:** One image per section, rendered with a consistent aspect ratio to reduce layout shift and preserve a premium, ordered look.
- **Animation approach:** Use CSS transitions and a minimal IntersectionObserver to toggle `in-view` classes. Respect `prefers-reduced-motion` and avoid JS that blocks scrolling or delays hydration.
- **Image delivery:** Continue using Sanity image URLs with format auto-selection and controlled widths, leaning on `next/image` where appropriate for responsive sizing.

## Risks / Trade-offs

- **Video performance** → Keep desktop-only video, use a poster image, and allow fallback to images when no video URL is set.
- **Hydration regressions** → Avoid client-only layout changes; use CSS media queries for desktop/mobile hero variants and minimal IO class toggling.
- **Content migration confusion** → Provide clear CMS structure and validation (required alt text, required sectionKey) to prevent missing imagery.
- **Inconsistent aspect ratios** → Define recommended ratios for editorial guidance and enforce consistent rendering.

## Migration Plan

- Add/adjust Sanity schema types (`hero`, `homeSection`, update `gallery`).
- Populate new documents with existing hero and section images.
- Update Next.js queries and Home page rendering to use the new CMS structure.
- Verify mobile/desktop hero behavior and animation performance.

## Open Questions

- Final hosting for hero video (external CDN vs Sanity file asset).
- Final image aspect ratio standard per section and hero.
