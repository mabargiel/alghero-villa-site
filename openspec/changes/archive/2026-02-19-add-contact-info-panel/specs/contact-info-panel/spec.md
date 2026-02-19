## ADDED Requirements

### Requirement: Contact page displays two-column layout on desktop
The contact page SHALL display the contact info panel and the contact form side by side on desktop (`md:` breakpoint and above). On mobile, the layout SHALL stack vertically with the form first and the info panel below.

#### Scenario: Desktop two-column layout
- **WHEN** the viewport is at `md` breakpoint or wider
- **THEN** the contact info panel is displayed on the left and the contact form on the right in a two-column grid

#### Scenario: Mobile stacked layout
- **WHEN** the viewport is below `md` breakpoint
- **THEN** the contact form is displayed first, followed by the contact info panel below

### Requirement: Static map component with location pin
The contact info panel SHALL display a static map image showing the villa's location in Alghero. A brand-colored (`--accent`) location pin icon SHALL be overlaid on the map, centered on the villa's position. The map image SHALL be generated from OpenStreetMap tiles using a local Leaflet utility (not shipped to production).

#### Scenario: Map displays with pin overlay
- **WHEN** the contact page loads
- **THEN** a static map image is visible with a brand-colored SVG pin icon overlaid at the center

### Requirement: Map CTA button links to Google Maps directions
The static map component SHALL include a CTA button labeled "SPRAWDŹ DOJAZD" overlaid on the map. Clicking the button SHALL open Google Maps directions to the villa in a new tab.

#### Scenario: User clicks directions button
- **WHEN** the user clicks the "SPRAWDŹ DOJAZD" button on the map
- **THEN** a new tab opens with Google Maps directions to the villa's coordinates

### Requirement: Contact details display phone and email
The contact info panel SHALL display the villa's phone number and email address. The phone number SHALL be a clickable `tel:` link. The email SHALL be a clickable `mailto:` link.

#### Scenario: Phone number is clickable
- **WHEN** the user clicks the phone number
- **THEN** the device initiates a phone call to the displayed number

#### Scenario: Email is clickable
- **WHEN** the user clicks the email address
- **THEN** the device opens the default email client with the displayed address

### Requirement: Social links displayed in info panel
The existing social links (Facebook, Instagram, Google) SHALL be relocated from their current position above the form into the contact info panel, below the phone and email.

#### Scenario: Social links visible in info panel
- **WHEN** the contact page loads
- **THEN** Facebook, Instagram, and Google links are displayed in the contact info panel
