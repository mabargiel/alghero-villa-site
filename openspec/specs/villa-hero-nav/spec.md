## ADDED Requirements

### Requirement: Hero navigation section displays two content groups

The villa page SHALL display a hero navigation section between the stats grid and the content sections. The section SHALL present two groups: "Wnętrza" (Interiors) and "Na zewnątrz" (Outdoors).

#### Scenario: Desktop hero navigation with images

- **WHEN** a user views the villa page on a viewport ≥ md breakpoint (768px)
- **THEN** the hero navigation section SHALL display two side-by-side clickable image cards with overlay text labels ("Wnętrza" and "Na zewnątrz"), where images are sourced from the CMS

#### Scenario: Mobile hero navigation without images

- **WHEN** a user views the villa page on a viewport < md breakpoint
- **THEN** the hero navigation section SHALL display two styled buttons labeled "Wnętrza" and "Na zewnątrz" without images

#### Scenario: CMS images not configured

- **WHEN** the CMS hero navigation images have not been uploaded
- **THEN** the hero navigation section SHALL fall back to button-only rendering (same as mobile) on all viewports

### Requirement: Hero navigation smooth-scrolls to content groups

Clicking a hero navigation card/button SHALL smooth-scroll the page to the first section of the corresponding content group.

#### Scenario: Click Wnętrza

- **WHEN** the user clicks the "Wnętrza" hero card or button
- **THEN** the page SHALL smooth-scroll to the first interior section (Salon)

#### Scenario: Click Na zewnątrz

- **WHEN** the user clicks the "Na zewnątrz" hero card or button
- **THEN** the page SHALL smooth-scroll to the first exterior section (Ogród)

### Requirement: VillaSubNav displays visible group headers

The right-side scroll-spy navigation SHALL display "Wnętrza" and "Na zewnątrz" as visible styled text labels above their respective item groups.

#### Scenario: Group headers visible on XL+ screens

- **WHEN** the user views the villa page on a viewport ≥ XL breakpoint
- **THEN** the VillaSubNav SHALL display group header labels ("Wnętrza", "Na zewnątrz") styled distinctly from the scroll-spy dot items

### Requirement: VillaSubNav does not overlap SubpageHeader

The right-side navigation SHALL NOT visually overlap the green SubpageHeader hero area.

#### Scenario: User is scrolled to top of page

- **WHEN** the villa page first content section is not yet in the viewport
- **THEN** the VillaSubNav SHALL be hidden

#### Scenario: User scrolls past header

- **WHEN** the first content section enters the viewport
- **THEN** the VillaSubNav SHALL become visible

### Requirement: CMS supports hero navigation images

The Sanity CMS villa page schema SHALL include two image fields for the hero navigation section.

#### Scenario: CMS fields available in studio

- **WHEN** a content editor opens the villa page document in Sanity Studio
- **THEN** they SHALL see two image upload fields: one for the interiors hero image and one for the outdoors hero image, each requiring alt text

#### Scenario: Images fetched by frontend

- **WHEN** the frontend queries the villa page data
- **THEN** the query SHALL return the hero navigation image URLs and alt text (or null if not uploaded)
