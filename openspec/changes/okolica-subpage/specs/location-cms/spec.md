## ADDED Requirements

### Requirement: Sanity schema defines locationPage document type
The Sanity CMS SHALL have a `locationPage` document type registered in the schema. It SHALL be a singleton document. The schema SHALL be defined in `/schemaTypes/locationPage.ts` and exported from the schema types index.

#### Scenario: Schema is registered
- **WHEN** Sanity Studio loads
- **THEN** the "Location Page" document type is available in the content browser

### Requirement: locationPage has a hero image field
The `locationPage` document SHALL have a `heroImage` field of type `mediaImage` (reusing the existing mediaImage object type) for the page hero section.

#### Scenario: Hero image is editable
- **WHEN** an editor opens the locationPage document in Sanity Studio
- **THEN** they can upload/select a hero image with alt text and hotspot

### Requirement: locationPage has keyed image arrays per category
The `locationPage` document SHALL have arrays for each category: `beaches`, `towns`, `nature`, `archaeology`, `dayTrips`, `diving`. Each array item SHALL be an object with a `locationKey` (string, required) and `images` (array of `mediaImage`, min 1). The `locationKey` SHALL match the `id` field in the TypeScript data file.

#### Scenario: Beach images are manageable per location
- **WHEN** an editor opens the locationPage beaches array in Sanity Studio
- **THEN** they see entries keyed by location (e.g., "mugoni", "le-bombarde") each containing an array of images with alt text and hotspot

#### Scenario: locationKey appears in preview
- **WHEN** viewing the beaches array in Sanity Studio
- **THEN** each entry displays its `locationKey` value as the preview title for easy identification

### Requirement: GROQ query fetches locationPage with image data
The frontend SHALL have a GROQ query and corresponding TypeScript types in `/src/lib/sanity/queries.ts` that fetches the `locationPage` document with all image arrays, including asset URLs and metadata dimensions.

#### Scenario: Query returns structured image data
- **WHEN** `getLocationPage()` is called
- **THEN** it returns the document with heroImage, and all category arrays containing locationKey and images with asset URLs

### Requirement: Sanity image optimization is applied
All location images SHALL be optimized using the Sanity URL builder with appropriate width and quality settings: thumbnails at `width(800).quality(80)`, featured cards at `width(1400).quality(85)`, hero at `width(2200).quality(85)`. All SHALL use `.auto("format")` for WebP/AVIF delivery.

#### Scenario: Thumbnail images are optimized
- **WHEN** a regular beach card renders
- **THEN** the image URL includes `w=800&q=80&auto=format` parameters from the Sanity CDN
