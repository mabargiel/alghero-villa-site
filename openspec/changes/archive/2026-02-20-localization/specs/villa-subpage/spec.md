## MODIFIED Requirements

### Requirement: Villa page renders at /villa with standard subpage header
The system SHALL serve a page at the `/{locale}/villa` route (or `/villa` for English). The page SHALL display a header with translated eyebrow label, title, and subtitle. All text SHALL come from the translation system.

#### Scenario: Page loads with Italian header
- **WHEN** a user navigates to `/it/villa`
- **THEN** the page displays the eyebrow as "Villa", title as "Villa Monte Calvia", and subtitle in Italian

#### Scenario: Page loads with English header
- **WHEN** a user navigates to `/villa`
- **THEN** the page displays the eyebrow as "Property", title as "Villa Monte Calvia", and subtitle in English

### Requirement: Sticky sub-navigation with two groups tracks scroll position
The page SHALL display a sub-navigation bar with two translated group labels and translated section items. Group and item labels SHALL come from the translation system.

#### Scenario: Sub-nav in Italian
- **WHEN** the villa page renders in Italian
- **THEN** the group labels display as "Interni" and "Esterni" with section names in Italian

#### Scenario: Sub-nav in English
- **WHEN** the villa page renders in English
- **THEN** the group labels display as "Interiors" and "Outdoors" with section names in English

#### Scenario: Active section updates on scroll
- **WHEN** the user scrolls through the Bedrooms section
- **THEN** the translated "Interiors" group label is emphasized and the translated "Bedrooms" item shows an active indicator

### Requirement: Bedroom tiles display as 3-column grid with accordion expand
The bedroom section heading, subtitle, room titles, and room descriptions SHALL come from the translation system. Room structural data (keys, amenity arrays) SHALL remain in the data file.

#### Scenario: Bedroom section in Spanish
- **WHEN** the bedroom section renders in Spanish
- **THEN** the heading displays "Dormitorios" and room titles/descriptions are in Spanish

### Requirement: Expanded bedroom accordion shows per-room amenities with translated labels
Amenity labels (WiFi, Air conditioning, Bathroom, Crib, Extra bed, etc.) SHALL come from the translation system.

#### Scenario: Amenity labels in Italian
- **WHEN** a bedroom accordion is expanded in Italian locale
- **THEN** amenity chips display translated labels (e.g., "Aria condizionata", "Bagno", "Cucina")

### Requirement: Salon section uses translated content
The salon section title, subtitle, and description SHALL come from the translation system.

#### Scenario: Salon in English
- **WHEN** the salon section renders in English
- **THEN** the title displays "Living Room & Kitchen" with English description

### Requirement: Exterior sections use translated content
Each exterior section title, subtitle, and description SHALL come from the translation system.

#### Scenario: Garden section in Polish
- **WHEN** the garden exterior section renders in Polish
- **THEN** the title displays "Ogród" with Polish subtitle and description

### Requirement: Villa stats use translated labels
The villa stats grid (bedrooms count, bathrooms count, land size, etc.) SHALL use translated labels from the translation system.

#### Scenario: Stats in Italian
- **WHEN** the villa stats render in Italian
- **THEN** labels display as "camere", "bagni", "proprietà", "aria condizionata", "giardino", "parcheggio"

### Requirement: CTA block at page bottom uses translated text
The CTA heading, description, and button label SHALL come from the translation system. The button link SHALL be locale-aware.

#### Scenario: CTA in Spanish
- **WHEN** the villa page CTA renders in Spanish
- **THEN** the button displays "Contáctanos" and links to `/es/contact`
