## ADDED Requirements

### Requirement: Section image per key
The system SHALL support a single CMS-managed image per Home section keyed by `property`, `interiors`, `garden`, and `location`.

#### Scenario: Sections map to CMS keys
- **WHEN** Home sections are rendered
- **THEN** each section uses the image for its matching section key

### Requirement: Alt text for section images
The system SHALL require alt text for each Home section image.

#### Scenario: Alt text is present
- **WHEN** a Home section image is configured in CMS
- **THEN** it includes non-empty alt text

### Requirement: Graceful rendering when images missing
The system SHALL render Home sections without breaking layout if a section image is missing.

#### Scenario: Missing image in CMS
- **WHEN** a section image is missing or unavailable
- **THEN** the section content still renders and the image container is omitted

