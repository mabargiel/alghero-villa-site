## ADDED Requirements

### Requirement: Static map image displays all location pins
The location page SHALL display a static map image (pre-rendered PNG) showing the Alghero area with all location pins visible. The map image SHALL be stored in `/public/images/` and rendered as an `<img>` element with responsive sizing.

#### Scenario: Map image renders on page
- **WHEN** the user scrolls to the map section
- **THEN** a static map image of the Alghero coast is displayed with high resolution (2x for retina)

### Requirement: HTML overlay pins are positioned on the map
Interactive pin elements SHALL be absolutely positioned on top of the static map image using percentage-based coordinates. Each pin SHALL correspond to a location from the data file. Pins SHALL be color-coded by category using CSS classes.

#### Scenario: Pins are color-coded by category
- **WHEN** the map section renders
- **THEN** beach pins appear in blue, town pins in orange, nature pins in green, archaeology pins in brown, day trip and diving pins in purple

#### Scenario: Pin positions scale with image
- **WHEN** the browser viewport resizes
- **THEN** pin positions remain correctly aligned to their map locations because they use percentage-based positioning relative to the map container

### Requirement: Map pins show popover on hover
When a user hovers over a map pin on desktop, a popover SHALL appear showing the location name and drive time. The popover SHALL be positioned near the pin without overflowing the map container.

#### Scenario: Hover shows location info
- **WHEN** the user hovers over the Mugoni pin on desktop
- **THEN** a popover appears showing "Porto Conte / Mugoni" and "22 min"

#### Scenario: Mobile tap shows popover
- **WHEN** the user taps a pin on mobile
- **THEN** the same popover appears, dismissible by tapping elsewhere

### Requirement: Map pin click redirects to Google Maps
When a user clicks a map pin, the browser SHALL open Google Maps in a new tab with directions from the villa's coordinates to the destination coordinates.

#### Scenario: Click opens Google Maps directions
- **WHEN** the user clicks the Lazzaretto pin
- **THEN** a new tab opens with Google Maps directions from Villa Monte Calvia to Lazzaretto beach

### Requirement: Map has a color-coded legend
The map section SHALL include a legend below or beside the map showing the color coding for each category with translated labels.

#### Scenario: Legend displays categories
- **WHEN** the map section renders
- **THEN** a legend shows: Plaże (blue), Miasteczka (orange), Przyroda (green), Zabytki (brown), Wycieczki (purple), Nurkowanie (purple) — all translated per locale

### Requirement: Azure Maps generation script produces static map
A development script at `/scripts/generate-location-map.ts` SHALL use Azure Maps SDK and Playwright to render a styled map centered on Alghero, add color-coded markers for all locations, and save a screenshot as a high-resolution PNG. The script SHALL read coordinates from the data file and the Azure Maps API key from an environment variable (`AZURE_MAPS_KEY`).

#### Scenario: Script generates map image
- **WHEN** a developer runs the map generation script with a valid Azure Maps key
- **THEN** a PNG image is saved to `/public/images/location-map.png` showing the Alghero area with all location markers

#### Scenario: Script reads coordinates from data file
- **WHEN** the script runs
- **THEN** it imports coordinates from `/src/data/location-data.ts` ensuring the map stays in sync with the page data
