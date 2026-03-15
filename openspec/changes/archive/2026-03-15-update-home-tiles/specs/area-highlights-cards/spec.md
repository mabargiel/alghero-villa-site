## MODIFIED Requirements

### Requirement: Highlights grid displays area cards with background images
The homepage SHALL render a highlights section containing a grid of 4 cards for the following areas in order: Wnętrza (Interiors), Werandy (Verandas), Ogród (Garden), Boisko (Sports Field). Each card SHALL display a background image fetched from Sanity CMS, a Lucide icon, and an uppercase title centered over a dark gradient overlay. Each card SHALL link to the `/villa` page.

The hardcoded `areas` array SHALL use:
1. `areaInteriorsTitle` / `areaInteriorsDescription` / icon `living-room`
2. `areaVerandasTitle` / `areaVerandasDescription` / icon `veranda`
3. `areaGardenTitle` / `areaGardenDescription` / icon `garden`
4. `areaSportsFieldTitle` / `areaSportsFieldDescription` / icon `sports`

#### Scenario: Cards render with CMS images on desktop
- **WHEN** the homepage loads on a viewport >= 768px
- **THEN** the highlights section displays 4 cards in a horizontal grid: Wnętrza, Werandy, Ogród, Boisko — each showing its CMS-managed background image, a centered icon, and a title

#### Scenario: Cards render on mobile in a single column
- **WHEN** the homepage loads on a viewport < 768px
- **THEN** the highlights section displays cards stacked vertically in a single column

#### Scenario: Fallback when CMS images are missing
- **WHEN** the `areaHighlight` document has no images or fewer images than the hardcoded areas
- **THEN** cards without a matching CMS image SHALL still render with a neutral background color and retain icon + title

#### Scenario: Clicking a card navigates to villa page
- **WHEN** the user clicks on any area highlight card
- **THEN** the browser navigates to `/villa`
