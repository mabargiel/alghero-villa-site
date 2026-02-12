## ADDED Requirements

### Requirement: CMS-managed highlight tiles
The system SHALL render “Najważniejsze atuty” as image tiles sourced from CMS entries containing a label, image, and optional alt text.

#### Scenario: Highlights render from CMS
- **WHEN** the Home page loads
- **THEN** the highlights section uses CMS-provided labels and images

### Requirement: Short labels
The system SHALL display shortened labels for highlights as stored in CMS.

#### Scenario: Short labels appear
- **WHEN** the highlights section renders
- **THEN** each tile shows the CMS label text without additional copy

### Requirement: Optional alt text
The system SHALL allow highlight images to omit alt text without breaking rendering.

#### Scenario: Missing alt text
- **WHEN** a highlight image has no alt text
- **THEN** the tile still renders and uses an empty alt attribute

