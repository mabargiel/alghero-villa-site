## Why

The homepage currently transitions from the hero directly into text-heavy content sections. There is no visual "at a glance" overview of the villa's key areas. Adding an interactive highlights grid — image cards with icons, titles, and hover-reveal descriptions — gives visitors an immediate, engaging preview of the property's distinct spaces and encourages scrolling deeper.

## What Changes

- Add a new **"Highlights" section** to the homepage, placed directly below the decorative SVG divider (before the first text+image section).
- Above the grid, a **centered title** (e.g. "Strefy willi" or similar — exact wording TBD) with a small **subtitle/note** underneath, styled consistently with the other section headers on the page (accent underline bar + accent-colored subtitle).
- The section displays a horizontal grid of cards (one per house area). Each card shows:
  - A **background image** (managed via Sanity CMS)
  - A **Lucide icon** and **title** centered on the image (default/idle state)
  - On **hover**: the card grows taller with a smooth animation, and the icon+title is replaced by a short **description** text
- On **mobile**, cards stack vertically (1 column) with a tappable interaction or always-expanded state.
- A new **Sanity CMS document type** (`areaHighlight`) is created to allow editors to manage the background images for each highlight card.
- Texts (titles, descriptions) and icons are hardcoded in the frontend for now.

## Capabilities

### New Capabilities

- `area-highlights-cards`: Interactive image-card grid component with hover animation, icon/title default state, and description reveal on hover. Includes CMS integration for background images.

### Modified Capabilities

_(none — no existing spec-level behavior changes)_

## Impact

- **Frontend app** (`app/src/app/page.tsx`): New section inserted after the decorative divider
- **New component** (`app/src/components/AreaHighlights.tsx`): Client component for hover interactions
- **Sanity CMS** (`alghero-villa-cms`): New `areaHighlight` schema type + schema index registration
- **Sanity queries** (`app/src/lib/sanity/queries.ts`): New GROQ query to fetch highlight images
- **CSS** (`app/src/app/globals.css`): New animation/transition styles for the card hover effect
- **LucideIcon component**: May need additional icon mappings for the chosen area icons
