## MODIFIED Requirements

### Requirement: Beach section displays featured hero cards interspersed with grid
The beach section SHALL render 5 featured hero cards (Maria Pia, Le Bombarde, Lazzaretto, Mugoni, La Pelosa) as large full-width cards with image, name, highlight text, description, drive time, and attribute tags. Maria Pia SHALL display the "Our favourite!" highlight. Between featured cards, remaining beaches SHALL display in a responsive grid (2 columns on mobile, 3-4 on desktop). Beach data SHALL come from the TypeScript data file. Beach images SHALL come from Sanity CMS, matched by `locationKey`. The component SHALL dynamically render featured cards based on the `featured: true` flag rather than hardcoding beach IDs.

#### Scenario: Featured card for Maria Pia renders as favourite
- **WHEN** the beach section loads
- **THEN** a large hero card displays for "Spiaggia di Maria Pia" with "Our favourite!" highlight (translated), full description, drive time "10 min", and attribute tags

#### Scenario: Featured card for Le Bombarde renders
- **WHEN** the beach section loads
- **THEN** a large hero card displays for "Le Bombarde" with "One of the most famous beaches!" highlight

#### Scenario: Featured card for Lazzaretto renders
- **WHEN** the beach section loads
- **THEN** a large hero card displays for "Lazzaretto" with a translated highlight, full description, drive time "20 min", and attribute tags

#### Scenario: Featured card for Mugoni renders
- **WHEN** the beach section loads
- **THEN** a large hero card displays for "Porto Conte / Mugoni" with updated highlight (no longer "Our favourite!"), full description, drive time "22 min", and attribute tags

#### Scenario: Featured card for La Pelosa renders
- **WHEN** the beach section loads
- **THEN** a large hero card displays for "La Pelosa" with "The pearl of Sardinia!" highlight in the nearby beaches subgroup

#### Scenario: Regular beach cards render in grid
- **WHEN** the beach section loads
- **THEN** non-featured beaches render as smaller cards in a responsive grid showing image, name, drive time, and attribute tag icons

#### Scenario: Beach sub-groupings display with headers
- **WHEN** the beach section renders
- **THEN** beaches are grouped under translated sub-headers: "Beaches in Alghero", "Southern coast", and "Beaches nearby"

### Requirement: Towns section displays large cards
The Miasteczka section SHALL display cards for Alghero, Bosa, Castelsardo, and Tinnura & Orgosolo. Cards SHALL be larger than beach cards (2 per row on desktop). Each card SHALL show an image from Sanity, the town name, and a brief translated description. Hover expand and mobile bottom sheet behaviors SHALL apply.

#### Scenario: Towns render with images
- **WHEN** the Miasteczka section loads
- **THEN** four large cards display for Alghero, Bosa, Castelsardo, and Tinnura & Orgosolo with images and descriptions

#### Scenario: Tinnura card displays with CMS image
- **WHEN** the Miasteczka section loads
- **THEN** the Tinnura & Orgosolo card displays with an image from Sanity CMS matched by `locationKey: "tinnura"`, the translated name, drive time "50 min", and a translated description about the mural villages

## ADDED Requirements

### Requirement: Tinnura & Orgosolo town data entry exists
The location data file SHALL include an entry for Tinnura & Orgosolo with id `tinnura`, name "Tinnura & Orgosolo", driveMinutes 50, coordinates for Tinnura center, a Google Maps directions URL, and category `towns`.

#### Scenario: Tinnura entry in data file
- **WHEN** the towns array is read from location-data.ts
- **THEN** it contains an entry with `id: "tinnura"`, `category: "towns"`, `driveMinutes: 50`

### Requirement: All translations exist for Tinnura & Orgosolo
The translation system SHALL include keys `loc_tinnura_name` and `loc_tinnura` in all 6 supported languages (en, pl, it, fr, de, es). The name SHALL be "Tinnura & Orgosolo" (or language-appropriate equivalent). The description SHALL describe both villages as famous for their murals (murales).

#### Scenario: English translation for Tinnura
- **WHEN** the page renders in English
- **THEN** the Tinnura card displays with name "Tinnura & Orgosolo" and a description about the mural villages

#### Scenario: Polish translation for Tinnura
- **WHEN** the page renders in Polish
- **THEN** the Tinnura card displays with name "Tinnura i Orgosolo" and a Polish description about the mural villages

### Requirement: Updated beach highlight translations exist
The translation system SHALL include highlight keys for `loc_maria-pia_highlight` and `loc_lazzaretto_highlight` in all 6 languages. The `loc_mugoni_highlight` key SHALL be updated to a new highlight text (not "Our favourite!" — that moves to Maria Pia).

#### Scenario: Maria Pia highlight in English
- **WHEN** the page renders in English
- **THEN** the Maria Pia featured card displays highlight text "Our favourite!"

#### Scenario: Mugoni highlight updated in English
- **WHEN** the page renders in English
- **THEN** the Mugoni featured card displays a new highlight text (not "Our favourite!")
