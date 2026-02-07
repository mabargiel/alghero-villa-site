## ADDED Requirements

### Requirement: Home page structure and narrative
The system SHALL provide a long-scroll home page with these sections in order: Hero, Highlights, Property story, Garden & outdoor living, Interiors teaser, Location teaser, Amenities, CTA band + contact teaser, and Footer.

#### Scenario: Home page section order
- **WHEN** a visitor scrolls the home page
- **THEN** the sections appear in the defined order with distinct headings

### Requirement: Polish description as content source
The system SHALL use the Polish description in `materials/description-polish` as the primary source for home page section copy (Property, Interiors, Garden, Location, and audience fit), with minimal edits for web readability.

#### Scenario: Section copy mapping
- **WHEN** the home page content is assembled
- **THEN** the section copy is derived from the corresponding Polish description paragraphs

### Requirement: Hero presentation with motion overlay
The system SHALL render a static hero image with a subtle motion overlay (e.g., slow gradient drift) and a primary CTA that routes to the Contact page.

#### Scenario: Hero load and CTA
- **WHEN** the home page loads
- **THEN** the hero image is visible immediately and the CTA links to the Contact page

### Requirement: Section imagery mapping to descriptions
The system SHALL pair section imagery with the relevant story: exterior/garden images for Hero and Garden, interior images for Interiors, and surroundings/beach/sunset images for Location.

#### Scenario: Section image selection
- **WHEN** a section renders
- **THEN** its imagery is selected from the mapped asset set matching that section

### Requirement: Responsive layout
The system SHALL provide a mobile-first responsive layout that preserves section hierarchy and readability across phone, tablet, and desktop breakpoints.

#### Scenario: Mobile layout
- **WHEN** the site is viewed on a phone-sized screen
- **THEN** content stacks vertically with readable typography and accessible tap targets

### Requirement: Code quality tooling
The system SHALL include ESLint, Prettier, and Stylelint using current stable versions and recommended configurations.

#### Scenario: Linting and formatting
- **WHEN** developers run linting and formatting commands
- **THEN** code is checked and formatted consistently across TypeScript and styles
