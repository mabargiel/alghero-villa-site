## Context

The homepage follows a pattern: hero → decorative SVG divider → text+image content sections → amenities → CTA. Each section uses the `<Reveal>` component for scroll-triggered fade-in animations. Images for existing sections come from Sanity CMS via the `homeSection` document type and `mediaImage` object type. The site uses Tailwind CSS, Next.js App Router (server components by default), and Lucide icons.

The new highlights section needs to fit visually between the decorative divider and the first content section, providing an interactive visual overview of the villa's key areas.

## Goals / Non-Goals

**Goals:**
- Add a visually engaging grid of image cards that preview the villa's key areas
- Hover interaction: card grows taller, icon+title transitions to a short description
- Background images managed in Sanity CMS; texts and icons hardcoded in frontend
- Consistent animation style with the rest of the site (scroll-reveal + hover transitions)
- Responsive: horizontal grid on desktop, stacked on mobile

**Non-Goals:**
- Making titles/descriptions CMS-editable (hardcoded for now)
- Linking cards to subpages (no navigation on click)
- Video or animated background support in cards

## Decisions

### 1. Component architecture: client component for hover state

The `AreaHighlights` component will be a **client component** (`"use client"`) because it needs hover/tap state management. It receives CMS images as props from the server-rendered page.

**Alternative considered**: Pure CSS `:hover` only — rejected because we need to swap content (icon+title → description) which benefits from state-driven rendering, and mobile needs tap-to-toggle.

### 2. Card layout: CSS Grid with equal columns

Use a CSS Grid with equal-width columns. Desktop: a row of cards (number matches the data array, likely 4–6). Tablet: 2–3 columns. Mobile: single column, full width.

**Alternative considered**: Flexbox with `flex-grow` — rejected because equal-width columns are cleaner with Grid and the number of items is fixed.

### 3. Hover animation: height transition + content crossfade

- Default state: card has a fixed height (e.g. `h-[280px]`), shows dark gradient overlay, centered icon + uppercase title
- Hover state: card transitions to a taller height (e.g. `h-[340px]`), icon+title fade out, description text fades in
- Use CSS `transition` on height + opacity for smooth effect (~500ms ease)
- The background image uses `object-cover` and a subtle `scale(1.03)` zoom on hover

**Alternative considered**: Flip card / 3D transform — rejected as too flashy for the site's elegant, understated style.

### 4. Mobile interaction: tap-to-toggle

On touch devices, tapping a card toggles the expanded state (showing description). Only one card expanded at a time. No hover on mobile, so this provides equivalent interaction.

### 5. CMS schema: new `areaHighlight` singleton document with an image array

Create a single `areaHighlight` document in Sanity with an array of images keyed by area identifier. This mirrors how `miniGallery` works — a single document with an ordered image array. Each image uses the existing `mediaImage` object type (with alt text + hotspot).

The frontend maps images to areas by array order (matching the hardcoded areas array order).

**Alternative considered**: Separate document per area — rejected as overkill for just images; a single document with an ordered array is simpler for editors.

### 6. Section header: centered title + accent bar + subtitle

Follow the existing pattern used by other sections (e.g. "Udogodnienia"):
- `<h2>` centered title
- Accent-colored underline bar (`.h-1.w-12.rounded-full.bg-[var(--accent)]`)
- Small accent-colored subtitle text below

### 7. Scroll animation: reuse existing Reveal component

Wrap the entire section in `<Reveal>` and add staggered `.highlight-card-item` CSS transitions (same pattern as `.mini-gallery-item` and `.amenity-item`).

## Risks / Trade-offs

- **Image array ordering**: CMS editors must maintain the same order as the hardcoded areas array. → Mitigation: Add description/help text in the Sanity schema indicating the expected order.
- **Fixed card count**: Adding/removing areas requires a frontend code change. → Acceptable for now since texts are hardcoded anyway.
- **Mobile tap interaction**: Less discoverable than hover. → Mitigation: Cards on mobile could show a subtle "tap" affordance or start with the first card expanded.
