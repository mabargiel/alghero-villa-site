### Requirement: Location page renders at /location with subpage header
The system SHALL serve a page at `/{locale}/location` (or `/location` for default locale). The page SHALL display a SubpageHeader with translated eyebrow, title, and description. All text SHALL come from the `next-intl` translation system under the `location` namespace.

#### Scenario: Page loads in Polish
- **WHEN** a user navigates to `/pl/location`
- **THEN** the page displays the eyebrow as "Okolica", a translated title, and a translated description introducing the Alghero surroundings

#### Scenario: Page loads in English
- **WHEN** a user navigates to `/location`
- **THEN** the page displays the eyebrow as "Surroundings", a translated title, and English description

### Requirement: Hero section displays a full-width image
The page SHALL render a hero section at the top with a full-width image fetched from Sanity CMS. The image SHALL use `next/image` with lazy loading, quality optimization via Sanity URL builder, and responsive sizing.

#### Scenario: Hero image renders
- **WHEN** the location page loads
- **THEN** a full-width hero image is displayed with a text overlay containing the page title and a subtle scroll indicator

### Requirement: Sticky section navigation tracks scroll position
The page SHALL display a sticky side navigation (visible on xl+ screens) that tracks 6 category sections: Plaże, Miasteczka, Zabytki, Przyroda, Wycieczki, Nurkowanie. Section labels SHALL come from the translation system. The nav SHALL use IntersectionObserver to highlight the currently visible section. Clicking a nav item SHALL smooth-scroll to that section.

#### Scenario: Navigation highlights active section
- **WHEN** the user scrolls to the "Miasteczka" section
- **THEN** the sticky nav highlights the "Miasteczka" item as active with accent styling

#### Scenario: Navigation click scrolls to section
- **WHEN** the user clicks "Zabytki" in the sticky nav
- **THEN** the page smooth-scrolls to the Zabytki section with offset for the top navbar

#### Scenario: Navigation hidden until past hero
- **WHEN** the hero section is still visible in the viewport
- **THEN** the sticky navigation is hidden

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

### Requirement: Beach cards expand on hover without layout shift (desktop)
On desktop, when a user hovers over a regular beach card, the card SHALL scale up (approximately 1.12x) using CSS `transform: scale()`, gain elevated `z-index` and a shadow, and reveal a description panel extending below the card. The surrounding cards SHALL NOT move or reflow. The expansion SHALL use CSS transitions (300ms ease).

#### Scenario: Card hover expands with description
- **WHEN** a user hovers over the "Lazzaretto" card on desktop
- **THEN** the card scales up, floats above neighboring cards with shadow, and reveals the beach description text and full attribute tag list

#### Scenario: Card hover does not shift surrounding cards
- **WHEN** a user hovers over any beach card
- **THEN** all other cards remain in their original grid positions

#### Scenario: Card returns to normal on mouse leave
- **WHEN** the user moves the mouse away from a hovered card
- **THEN** the card transitions back to its original scale and z-index within 300ms

### Requirement: Beach cards open bottom sheet on tap (mobile)
On mobile/touch devices, tapping a regular beach card SHALL open a bottom sheet that slides up from the bottom of the viewport. The bottom sheet SHALL display: the beach image (large), beach name, drive time, full description, attribute tags with labels, and a "Open in Google Maps" link. The bottom sheet SHALL be dismissible by dragging down, tapping the backdrop, or pressing Escape.

#### Scenario: Tap opens bottom sheet
- **WHEN** a user taps the "Le Bombarde" card on a mobile device
- **THEN** a bottom sheet slides up showing the beach image, name, "19 min" drive time, description, tags (biały piasek, skały, turkusowa woda, dla dzieci, park linowy, bary), and a Google Maps link

#### Scenario: Bottom sheet dismisses on drag down
- **WHEN** the user drags the bottom sheet downward past a threshold
- **THEN** the bottom sheet slides out of view and the backdrop fades

#### Scenario: Bottom sheet dismisses on backdrop tap
- **WHEN** the user taps the semi-transparent backdrop behind the bottom sheet
- **THEN** the bottom sheet dismisses

#### Scenario: Bottom sheet is keyboard accessible
- **WHEN** the bottom sheet is open and the user presses Escape
- **THEN** the bottom sheet dismisses and focus returns to the card that triggered it

### Requirement: Beach attribute tags display as icon pills
Each beach card and detail view SHALL display attribute tags as small pill-shaped chips with an icon and translated label. The tag vocabulary SHALL include: sandy, rocks, seaweed, turquoise, kid-friendly, beach-services, bars, snorkeling, waves, rope-park, diving-center. Tag labels SHALL come from the translation system.

#### Scenario: Tags render on card
- **WHEN** a beach card renders for "Maria Pia"
- **THEN** tag pills display for: sandy, kid-friendly, beach-services, bars

#### Scenario: Tags are translated
- **WHEN** the page renders in Italian
- **THEN** tag labels display in Italian (e.g., "Sabbiosa", "Per bambini", "Bar")

### Requirement: Towns section displays large cards
The Miasteczka section SHALL display cards for Alghero, Bosa, Castelsardo, and Tinnura & Orgosolo. Cards SHALL be larger than beach cards (2 per row on desktop). Each card SHALL show an image from Sanity, the town name, and a brief translated description. Hover expand and mobile bottom sheet behaviors SHALL apply.

#### Scenario: Towns render with images
- **WHEN** the Miasteczka section loads
- **THEN** four large cards display for Alghero, Bosa, Castelsardo, and Tinnura & Orgosolo with images and descriptions

#### Scenario: Tinnura card displays with CMS image
- **WHEN** the Miasteczka section loads
- **THEN** the Tinnura & Orgosolo card displays with an image from Sanity CMS matched by `locationKey: "tinnura"`, the translated name, drive time "50 min", and a translated description about the mural villages

### Requirement: Archaeology section displays cards
The Zabytki section SHALL display cards for Nuraghi, Domy Wróżek, Pozzo Santa Cristina, and Piramida. Each SHALL show an image, name, and description. Hover expand and mobile bottom sheet behaviors SHALL apply.

#### Scenario: Archaeology cards render
- **WHEN** the Zabytki section loads
- **THEN** four cards display with images and translated names/descriptions

### Requirement: Nature section displays with featured card
The Przyroda section SHALL display Grotta di Nettuno as a featured hero card (large, full-width). Remaining items (Capo Caccia, Grota Verde, Zatoki, Trekking, Asinara) SHALL display in a grid. Hover expand and mobile bottom sheet behaviors SHALL apply.

#### Scenario: Grotta di Nettuno renders as featured
- **WHEN** the Przyroda section loads
- **THEN** Grotta di Nettuno displays as a large hero card with image, description, and "35 min" drive time

### Requirement: Day trips section displays cards
The Wycieczki section SHALL display cards for Costa Smeralda and La Maddalena with images, names, and descriptions. Hover expand and mobile bottom sheet behaviors SHALL apply.

#### Scenario: Day trip cards render
- **WHEN** the Wycieczki section loads
- **THEN** two cards display for Costa Smeralda and La Maddalena

### Requirement: Diving section displays cards
The Nurkowanie section SHALL display cards for Tramariglio and Porto Conte with images, names, and descriptions. Hover expand and mobile bottom sheet behaviors SHALL apply.

#### Scenario: Diving cards render
- **WHEN** the Nurkowanie section loads
- **THEN** two cards display for Tramariglio and Porto Conte

### Requirement: CTA section at page bottom
The page SHALL end with a CTA section prompting the user to book, linking to the contact page. CTA text SHALL be translated. The CTA component SHALL reuse the existing CtaSection component pattern.

#### Scenario: CTA renders with link to contact
- **WHEN** the user scrolls to the bottom of the location page
- **THEN** a CTA section displays with translated booking prompt and a link to `/{locale}/contact`

### Requirement: Page fetches images from Sanity with ISR caching
The page server component SHALL fetch location images from Sanity using a GROQ query. The fetch SHALL use ISR with `revalidate: 300` (5 minutes), matching the caching strategy of other pages.

#### Scenario: Images load from Sanity CDN
- **WHEN** the location page renders server-side
- **THEN** images are fetched from Sanity with quality optimization and served via Sanity CDN

### Requirement: Content data comes from TypeScript data file
All structured location data (names, descriptions, coordinates, drive times, tags, featured flags, sub-groupings) SHALL be defined in a TypeScript data file at `/src/data/location-data.ts` with full type safety.

#### Scenario: Data file provides beach information
- **WHEN** the location page component reads beach data
- **THEN** it receives typed objects with id, name, driveMinutes, description, tags array, coordinates, googleMapsUrl, featured flag, and subgroup identifier

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
