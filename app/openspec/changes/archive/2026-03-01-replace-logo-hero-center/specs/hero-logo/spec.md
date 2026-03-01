## ADDED Requirements

### Requirement: Hero displays centered logo instead of text badge

On the home page, the hero section SHALL display the site logo as a centered image element, replacing the "Villa Monte Calvia — Alghero" text badge. The logo SHALL be positioned above the headline text.

#### Scenario: Home page hero shows centered logo

- **WHEN** user visits the home page
- **THEN** the hero section displays the logo image centered horizontally
- **AND** the logo appears above the headline text
- **AND** no text badge ("Villa Monte Calvia — Alghero") is visible in the hero

#### Scenario: Logo is responsive across breakpoints

- **WHEN** user views the home page on a mobile viewport (< 768px)
- **THEN** the logo displays at a width of 256px (w-64) with auto height
- **WHEN** user views the home page on a desktop viewport (>= 768px)
- **THEN** the logo displays at a width of 384px (w-96) with auto height

### Requirement: Navigation logo is hidden on home page

On the home page, the TopNav component SHALL hide the logo element to avoid visual duplication with the centered hero logo. Navigation links and mobile menu SHALL remain functional and properly aligned.

#### Scenario: Home page hides nav logo

- **WHEN** user is on the home page
- **THEN** the top-left navigation logo is not visible
- **AND** desktop navigation links are displayed aligned to the right
- **AND** the mobile menu button remains accessible

#### Scenario: Non-home pages show nav logo

- **WHEN** user navigates to any page other than the home page (e.g., /villa, /location, /gallery, /contact)
- **THEN** the navigation logo is visible in the top-left position
- **AND** the logo uses the updated SVG asset

### Requirement: Updated logo asset

The site logo asset (`public/logo.svg`) SHALL be replaced with the new branded SVG file. All existing references to `/logo.svg` SHALL continue to work without path changes.

#### Scenario: Logo asset is replaced

- **WHEN** any component references `/logo.svg`
- **THEN** the new branded SVG is served
- **AND** existing CSS-mask rendering in TopNav on non-home pages works correctly

### Requirement: Hero content alignment after logo swap

After replacing the badge with the logo, the hero content (logo, headline, booking bar, scroll indicator) SHALL remain properly centered and spaced on both mobile and desktop viewports.

#### Scenario: Hero vertical spacing is balanced

- **WHEN** user views the home page hero
- **THEN** the logo and headline are vertically centered within the hero viewport
- **AND** the booking bar remains positioned near the bottom of the viewport
- **AND** the scroll indicator remains visible at 85vh
