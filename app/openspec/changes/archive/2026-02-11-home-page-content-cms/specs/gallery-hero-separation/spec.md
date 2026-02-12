## ADDED Requirements

### Requirement: Separate hero and gallery structures

The system SHALL store hero media and gallery images in separate CMS structures.

#### Scenario: Hero and gallery are distinct

- **WHEN** CMS content is queried
- **THEN** hero media and gallery images are retrieved from different document types or fields

### Requirement: Gallery page uses only gallery images

The system SHALL render the gallery page using only gallery images and never include hero media.

#### Scenario: Gallery page content source

- **WHEN** the gallery page is rendered
- **THEN** it uses the gallery image collection and excludes hero media
