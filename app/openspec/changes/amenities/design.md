## Context

The Home page currently renders “Najważniejsze atuty” and “Udogodnienia” as plain text lists. The change introduces visual tiles for highlights with CMS-managed images and a single-row icon strip for amenities, while standardizing all icons in the site to Lucide.

## Goals / Non-Goals

**Goals:**

- Replace highlights with image tiles using shorter labels and Lucide icon overlays.
- Render amenities as a single-row Lucide icon grid on a deep olive background.
- Standardize all inline SVG icons to a consistent Lucide icon set.
- Store highlight labels and images in CMS with optional alt text.

**Non-Goals:**

- Editing all Home copy in CMS (only highlights media/labels are CMS-managed).
- Changing the overall Home page structure beyond the two sections.
- Introducing heavy animation libraries or major layout refactors.

## Decisions

- **CMS model:** Add a `highlights` document with an ordered list of items containing `label`, `iconKey`, and `image` (alt optional). This avoids hardcoded mappings and keeps content editable.
- **Icon system:** Use Lucide icons across the site (TopNav, Contact, and Home). Use a small curated subset mapped by `iconKey` to avoid arbitrary icon choices.
- **Amenities layout:** Use a single-row grid that fits to width (no scrolling). On small screens, the row compresses with smaller icon sizes and tighter spacing to keep a single line.
- **Highlight tiles:** Use consistent aspect ratio tiles with an overlay for legibility. Use the same accent palette as existing sections and apply subtle hover motion only.
- **Theme fit:** The amenities strip uses a deep olive tone aligned with `--accent` rather than a neutral charcoal to keep the palette cohesive.

## Risks / Trade-offs

- **Single-row compression** → Icons and labels may feel tight on small screens; mitigate with responsive font/icon sizes and optional line breaks.
- **CMS iconKey misuse** → Use a limited list of icon keys in schema options to prevent invalid icons.
- **Inconsistent imagery** → Provide guidance for highlight images to keep similar tone/brightness.

## Migration Plan

- Add `highlights` schema in CMS and deploy.
- Populate highlight items with labels, images, and icon keys.
- Update Home page sections and replace inline SVGs with Lucide icons.
- Verify layout on mobile/desktop and adjust icon sizes if needed.

## Open Questions

- Final deep-olive hex value for the amenities strip.
- Exact Lucide icon mapping per highlight and amenity label.
