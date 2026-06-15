# section-deep-links

## Purpose

Home-page CTAs deep-link to specific sections on destination pages, anchor scroll lands the section heading below the fixed top nav rather than behind it, and section IDs follow the project's English-in-code convention.

## Requirements

### Requirement: Home-page CTAs deep-link to specific destination sections

Every home-page link or tile that routes to `/villa` or `/location` SHALL target the most specific section on the destination page that matches the link's visible label. A link MUST NOT route to a destination page's root unless its label is a generic page reference (e.g. a teaser block that spans multiple sections).

#### Scenario: Clicking an AreaHighlights tile lands on the matching villa section

- **WHEN** a visitor clicks one of the four `AreaHighlights` tiles on the home page (Wnętrza, Werandy, Kuchnia letnia, Boisko)
- **THEN** the browser navigates to `/villa` with the URL fragment corresponding to that tile's section: `#salon`, `#ext-veranda`, `#ext-summer-kitchen`, `#ext-sports-court` respectively
- **AND** the destination section's heading is in view

#### Scenario: Clicking the home-page Villa CTA lands on the salon section

- **WHEN** a visitor clicks the "Poznaj wnętrza →" CTA in the home-page Villa block
- **THEN** the browser navigates to `/villa#salon`
- **AND** the salon section's heading is in view

#### Scenario: Clicking the home-page Garden CTA lands on the garden section

- **WHEN** a visitor clicks the "Poznaj ogród →" CTA in the home-page Garden block
- **THEN** the browser navigates to `/villa#ext-garden`
- **AND** the garden section's heading is in view

#### Scenario: Clicking the home-page Beaches CTA lands on the beaches section

- **WHEN** a visitor clicks the "Poznaj plaże →" CTA in the home-page Beaches block
- **THEN** the browser navigates to `/location#section-beaches`
- **AND** the beaches section's heading is in view

#### Scenario: Clicking the home-page Location CTA lands on the location page root

- **WHEN** a visitor clicks the "Poznaj okolicę →" (or locale equivalent) CTA in the home-page Location block
- **THEN** the browser navigates to `/location` with no URL fragment
- **AND** the page's own in-page navigation (`LocationHorizontalNav`) becomes the entry point for picking a specific section

### Requirement: Anchor jumps land below the fixed top navigation

Whenever an anchor link navigates the browser to an element with an `id` attribute, the destination element SHALL be positioned vertically such that its top edge is visible below the fixed `TopNav` rather than clipped behind it.

#### Scenario: Same-page anchor click clears the top nav

- **WHEN** a visitor clicks any anchor link (`href="#section-id"`) on any page
- **THEN** the browser scrolls so the target element's top edge sits below the fixed `TopNav`
- **AND** the section's heading is fully visible

#### Scenario: Cross-page deep link clears the top nav

- **WHEN** a visitor navigates to a URL containing a fragment (e.g. `/villa#ext-garden`) from another page
- **THEN** on initial page load the browser scrolls so the target element's top edge sits below the fixed `TopNav`
- **AND** the section's heading is fully visible

### Requirement: Section IDs use English slugs

All section `id` attributes used as anchor targets SHALL use English-only kebab-case identifiers, regardless of the language of the user-facing content. User-facing copy SHALL continue to be localized via the translation files.

#### Scenario: Villa bedrooms section uses an English id

- **WHEN** the villa page renders the bedrooms section
- **THEN** the section element's `id` attribute is `bedrooms` (English)
- **AND** no element in the codebase references the prior `sypialnie` slug

#### Scenario: Adding a new anchorable section

- **WHEN** a developer adds a new section that other pages may deep-link to
- **THEN** the `id` attribute uses English kebab-case (e.g. `summer-kitchen`, not `kuchnia-letnia`)

### Requirement: Translation keys exist for every CTA label

Every user-facing CTA label rendered on the home page SHALL be sourced from the `messages/<locale>.json` translation files, including the CTA pointing at the location page root.

#### Scenario: Location CTA has a translation key

- **WHEN** the home page renders the Location section CTA
- **THEN** the label text comes from a `home.locationLink` key
- **AND** that key is defined in every `messages/<locale>.json` file present in the project
