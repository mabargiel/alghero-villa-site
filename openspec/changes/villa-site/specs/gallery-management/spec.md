## ADDED Requirements

### Requirement: Gallery image management in CMS
The system SHALL allow admins to add, remove, and reorder gallery images via Sanity CMS.

#### Scenario: Add image
- **WHEN** an admin uploads a new image in the CMS
- **THEN** the image becomes available in the gallery after revalidation

### Requirement: Gallery image fields
Each gallery image SHALL include an image asset and required alt text, with optional title and numeric order.

#### Scenario: Save image with required fields
- **WHEN** an admin saves a gallery image with asset and alt text
- **THEN** the record is accepted and ready for display

### Requirement: Gallery ordering
The system SHALL sort gallery images by ascending `order`, with a stable fallback order when `order` is not set.

#### Scenario: Order fallback
- **WHEN** two images do not have an explicit order
- **THEN** the gallery displays them in a stable deterministic order
