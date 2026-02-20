## ADDED Requirements

### Requirement: Villa page renders at /villa with standard subpage header
The system SHALL serve a page at the `/villa` route. The page SHALL display a header matching the existing subpage pattern: an uppercase eyebrow label ("Obiekt"), a large h1 title ("Villa Monte Calvia"), and a muted subtitle describing the property. The page SHALL use the standard subpage navbar styling (not hero mode).

#### Scenario: Page loads with correct header
- **WHEN** a user navigates to `/villa`
- **THEN** the page displays an eyebrow label, h1 title, and subtitle in the same style as the Gallery and Contact pages

#### Scenario: Navbar renders in subpage mode
- **WHEN** the `/villa` page loads
- **THEN** the TopNav uses dark brand color styling (not hero-mode white)

### Requirement: Sticky sub-navigation with two groups tracks scroll position
The page SHALL display a sub-navigation bar that becomes sticky below the TopNav when the user scrolls past it. The sub-nav SHALL have two labeled groups: "Wnętrza" (containing Sypialnie, Salon) and "Na zewnątrz" (containing Ogród, Strefa wypoczynkowa, Weranda i taras, Boisko sportowe, Kuchnia letnia, Parking, Widoki). The active group label SHALL be visually emphasized and the active section item SHALL display an underline indicator, both updated based on scroll position via IntersectionObserver.

#### Scenario: Sub-nav becomes sticky on scroll
- **WHEN** the user scrolls the page past the sub-nav's natural position
- **THEN** the sub-nav sticks below the TopNav and remains visible during scroll

#### Scenario: Active section updates on scroll
- **WHEN** the user scrolls through the Sypialnie section
- **THEN** the "Wnętrza" group label is emphasized and "Sypialnie" shows an active underline indicator

#### Scenario: Active group switches on scroll into exterior sections
- **WHEN** the user scrolls past the interior sections into the Ogród section
- **THEN** the "Na zewnątrz" group label becomes emphasized and "Ogród" shows an active underline indicator

#### Scenario: Clicking a sub-nav item scrolls to section
- **WHEN** the user clicks "Weranda i taras" in the sub-nav
- **THEN** the page smooth-scrolls to the Weranda i taras section

### Requirement: Mobile sub-nav displays two rows with horizontal scroll
On viewports below 768px, the sub-nav SHALL display in two rows: group labels on the top row, section items on the bottom row. The items row SHALL be horizontally scrollable. The active item SHALL auto-scroll into view.

#### Scenario: Mobile sub-nav renders two rows
- **WHEN** the page loads on a viewport < 768px
- **THEN** the sub-nav shows group labels on the first row and scrollable section items on the second row

#### Scenario: Active item scrolls into view on mobile
- **WHEN** the user scrolls to a section whose sub-nav item is off-screen
- **THEN** the sub-nav items row auto-scrolls to bring the active item into view

### Requirement: Bedroom tiles display as 3-column grid with accordion expand
The Sypialnie section SHALL display 6 bedroom tiles in a 3-column grid on desktop (2-column on mobile). Each tile SHALL show a cover photo from the CMS with the room title overlaid. Clicking a tile SHALL open an accordion panel below the entire row. Only one accordion SHALL be open at a time — opening a new one closes the previous.

#### Scenario: Tiles render in grid layout
- **WHEN** the Sypialnie section loads with 6 rooms from the CMS
- **THEN** 6 tiles display in a 3×2 grid on desktop, 2-column on mobile, each with a cover photo and title overlay

#### Scenario: Clicking a tile opens the accordion
- **WHEN** the user clicks on "Sypialnia 1" tile
- **THEN** an accordion panel slides open below the first row, showing the room detail

#### Scenario: Opening a second accordion closes the first
- **WHEN** the user clicks "Sypialnia 4" while "Sypialnia 1" is expanded
- **THEN** the Sypialnia 1 accordion closes and the Sypialnia 4 accordion opens below the second row

#### Scenario: Page scrolls to show expanded content
- **WHEN** an accordion opens
- **THEN** the page scrolls to bring the expanded content into view

### Requirement: Expanded bedroom accordion shows overlapping photos with carousel and per-room amenities
The expanded accordion panel SHALL display a 2-column layout. The left column SHALL show two overlapping/stacked photos (bedroom and bathroom) with a carousel allowing manual navigation through all room gallery images via prev/next arrows. The right column SHALL show the room title, description, and per-room amenity icons as icon+label chips. Amenities SHALL vary per room as configured in the CMS.

#### Scenario: Overlapping photos display
- **WHEN** a bedroom accordion is expanded
- **THEN** the left column shows two photos in a stacked/overlapping card arrangement

#### Scenario: Carousel navigation
- **WHEN** the user clicks the next arrow in the photo carousel
- **THEN** the carousel advances to the next photo in the room's gallery

#### Scenario: Per-room amenities display
- **WHEN** a bedroom accordion is expanded for a room with amenities ["climate", "wifi", "crib"]
- **THEN** the right column displays three amenity chips with the corresponding icons and labels

#### Scenario: Room with no amenities
- **WHEN** a bedroom accordion is expanded for a room with an empty amenities array
- **THEN** the amenities section is not displayed

### Requirement: Salon i Kuchnia displays as a single always-visible section with carousel
The Salon i Kuchnia section SHALL display as a 2-column layout (photos left, text+amenities right) that is always visible (not behind a tile). The photo area SHALL include a carousel with manual navigation through multiple images from the CMS.

#### Scenario: Salon section renders
- **WHEN** the Salon i Kuchnia section loads with CMS data
- **THEN** a 2-column layout displays with a photo carousel on the left and room description + amenities on the right

### Requirement: Exterior sections display as alternating 2-column blocks
Each exterior section (Ogród, Strefa wypoczynkowa, Weranda i taras, Boisko sportowe, Kuchnia letnia, Parking, Widoki / Otoczenie) SHALL display as a 2-column block with text on one side and a CMS image on the other. Sections SHALL alternate between text-left/image-right and image-left/text-right. Each section SHALL include an h2 title, accent underline bar, subtitle, and description text. Each section SHALL use the Reveal animation on scroll entry.

#### Scenario: Exterior sections render with alternating layout
- **WHEN** the exterior sections load
- **THEN** sections alternate between text-left/image-right and image-left/text-right layout

#### Scenario: Exterior section with missing CMS image
- **WHEN** an exterior section has no image configured in the CMS
- **THEN** the section renders with text only, without a broken image placeholder

#### Scenario: Sections animate on scroll
- **WHEN** the user scrolls an exterior section into view
- **THEN** the section fades in with a translateY animation (matching the existing Reveal pattern)

### Requirement: CTA block at page bottom links to contact
The page SHALL end with a call-to-action block matching the homepage CTA pattern: a rounded card with warm beige background, a heading, descriptive text, and a green button linking to `/contact`.

#### Scenario: CTA block renders at bottom
- **WHEN** the user scrolls to the bottom of the villa page
- **THEN** a CTA card is displayed with a button linking to `/contact`

### Requirement: Graceful fallback when CMS data is missing
The page SHALL handle missing CMS data gracefully. If the `villaPage` document does not exist or has empty arrays, the page SHALL display a placeholder message instead of broken content.

#### Scenario: No villa page document in CMS
- **WHEN** the Sanity `villaPage` document does not exist
- **THEN** the page displays a placeholder message indicating content is being prepared

#### Scenario: Empty rooms array
- **WHEN** the `villaPage` document exists but has an empty rooms array
- **THEN** the Sypialnie section is not rendered and the sub-nav omits the Sypialnie item
