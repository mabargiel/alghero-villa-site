## ADDED Requirements

### Requirement: VillaPage singleton document type in Sanity
The Sanity CMS SHALL have a `villaPage` singleton document type containing two ordered arrays: `rooms` and `exteriorSections`. The document SHALL be editable in Sanity Studio with clear field labels and help text.

#### Scenario: Editor opens villaPage in Sanity Studio
- **WHEN** an editor navigates to the villaPage document in Sanity Studio
- **THEN** they see two sections: "Pokoje" (rooms) and "Na zewnątrz" (exterior sections), each as reorderable arrays

### Requirement: Room entries with cover image, gallery, description, and amenities
Each room entry in the `rooms` array SHALL contain: a `title` (string), a `description` (text), a `coverImage` (mediaImage with alt text and hotspot), a `galleryImages` array (mediaImage[]), and an `amenities` array (string[] of icon keys matching LucideIcon names, e.g. "climate", "wifi", "crib", "extra-bed").

#### Scenario: Editor adds a new room
- **WHEN** an editor adds a room entry to the rooms array
- **THEN** they can fill in title, description, upload a cover image, add multiple gallery images, and select amenities from a list of predefined icon keys

#### Scenario: Editor reorders rooms
- **WHEN** an editor drags a room entry to a new position in the array
- **THEN** the room order on the frontend reflects the new CMS order

### Requirement: Exterior section entries with title, subtitle, description, and image
Each entry in the `exteriorSections` array SHALL contain: a `title` (string), a `subtitle` (string), a `description` (text), and an `image` (mediaImage with alt text and hotspot).

#### Scenario: Editor adds an exterior section
- **WHEN** an editor adds an exterior section entry
- **THEN** they can fill in title, subtitle, description, and upload an image

#### Scenario: Editor reorders exterior sections
- **WHEN** an editor drags an exterior section to a new position
- **THEN** the section order on the frontend reflects the new CMS order

### Requirement: Sanity query fetches villaPage data for the frontend
The frontend SHALL have a `getVillaPage()` query function that fetches the `villaPage` singleton with all nested room and exterior section data, including resolved image asset URLs and metadata. The query SHALL use the same caching pattern as other queries (revalidate: 300).

#### Scenario: Query returns full villa page data
- **WHEN** the `/villa` page server component calls `getVillaPage()`
- **THEN** it receives the complete villaPage document with rooms (including cover image, gallery images, amenities) and exterior sections (including images)

#### Scenario: Query returns null when document missing
- **WHEN** no `villaPage` document exists in Sanity
- **THEN** `getVillaPage()` returns null

### Requirement: New LucideIcon keys for room amenities
The `LucideIcon` component SHALL support additional icon keys needed for per-room amenities: `wifi`, `crib` (łóżeczko niemowlęce), `extra-bed` (dostawka), `lounger` (leżak), `garden-furniture` (meble ogrodowe). These SHALL map to appropriate Lucide React icons.

#### Scenario: WiFi icon renders
- **WHEN** a room has "wifi" in its amenities array
- **THEN** the LucideIcon component renders the Wifi icon from lucide-react

#### Scenario: Unknown amenity key falls back to Circle
- **WHEN** a room has an unrecognized amenity key
- **THEN** the LucideIcon component renders the fallback Circle icon

### Requirement: AreaHighlight image order description
The `areaHighlight` Sanity schema's `images` field description SHALL read:
> Kolejność zdjęć musi odpowiadać kolejności stref w kodzie: 1) Wnętrza, 2) Werandy, 3) Ogród, 4) Boisko

#### Scenario: Editor sees updated order description
- **WHEN** an editor opens the `areaHighlight` document in Sanity Studio
- **THEN** the images field help text shows the updated tile order: 1) Wnętrza, 2) Werandy, 3) Ogród, 4) Boisko
