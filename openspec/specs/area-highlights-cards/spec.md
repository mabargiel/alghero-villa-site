## ADDED Requirements

### Requirement: Highlights grid displays area cards with background images
The homepage SHALL render a highlights section containing a grid of cards, one per house area. Each card SHALL display a background image fetched from Sanity CMS, a Lucide icon, and an uppercase title centered over a dark gradient overlay.

#### Scenario: Cards render with CMS images on desktop
- **WHEN** the homepage loads on a viewport >= 768px
- **THEN** the highlights section displays cards in a horizontal grid (equal-width columns) with each card showing its CMS-managed background image, a centered icon, and a title

#### Scenario: Cards render on mobile in a single column
- **WHEN** the homepage loads on a viewport < 768px
- **THEN** the highlights section displays cards stacked vertically in a single column

#### Scenario: Fallback when CMS images are missing
- **WHEN** the `areaHighlight` document has no images or fewer images than the hardcoded areas
- **THEN** cards without a matching CMS image SHALL still render with a neutral background color and retain icon + title

### Requirement: Section header with centered title and subtitle
The highlights section SHALL display a centered title heading above the card grid, followed by an accent underline bar and a small accent-colored subtitle note. Styling SHALL be consistent with other section headers on the page.

#### Scenario: Title and subtitle render above cards
- **WHEN** the highlights section is visible
- **THEN** a centered `<h2>` title, an accent underline bar, and a subtitle are displayed above the card grid

### Requirement: Hover interaction reveals description on desktop
On desktop viewports, hovering over a card SHALL trigger an animated transition where the card grows taller, the icon and title fade out, and a short description text fades in. The background image SHALL subtly zoom in.

#### Scenario: Card expands on hover
- **WHEN** the user hovers over a card on a desktop viewport
- **THEN** the card height increases with a smooth transition (~500ms), the icon+title fade out, a text description fades in, and the background image scales up slightly

#### Scenario: Card returns to default on hover-out
- **WHEN** the user moves the cursor away from a hovered card
- **THEN** the card smoothly returns to its default height, the description fades out, and the icon+title fade back in

### Requirement: Tap interaction on mobile
On touch/mobile devices, tapping a card SHALL toggle the expanded state (showing description). Only one card SHALL be expanded at a time.

#### Scenario: Tap expands a card on mobile
- **WHEN** the user taps a card on a touch device
- **THEN** the card expands to show the description, and any previously expanded card collapses

#### Scenario: Tap again collapses the card
- **WHEN** the user taps an already-expanded card on a touch device
- **THEN** the card collapses back to its default state showing icon+title

### Requirement: Scroll-reveal animation on section entry
The highlights section SHALL animate into view using the existing `Reveal` component pattern, with individual cards appearing in a staggered sequence.

#### Scenario: Section fades in on scroll
- **WHEN** the user scrolls the highlights section into the viewport
- **THEN** cards fade in and slide up with staggered delays (each card delayed ~100ms after the previous)

### Requirement: CMS schema for area highlight images
A new Sanity CMS document type `areaHighlight` SHALL be created as a singleton, containing an ordered array of `mediaImage` objects. The schema SHALL include help text indicating the expected image order matching the frontend areas.

#### Scenario: Editor uploads images in CMS
- **WHEN** an editor creates or edits the `areaHighlight` document in Sanity Studio
- **THEN** they can add, reorder, and remove images in the array, each with alt text and hotspot support

### Requirement: Section positioned below decorative divider
The highlights section SHALL be placed on the homepage directly after the decorative SVG divider and before the first text+image content section (Nieruchomość).

#### Scenario: Correct page order
- **WHEN** the homepage renders
- **THEN** the section order is: Hero → Decorative SVG → **Highlights** → Nieruchomość → Wnętrza → Mini Gallery → ...
