## ADDED Requirements

### Requirement: Single-row amenities grid
The system SHALL render “Udogodnienia” as a single-row, fit-to-width icon grid using Lucide icons.

#### Scenario: Amenities stay in one row
- **WHEN** the amenities section renders
- **THEN** all items appear in a single row without scrolling

### Requirement: Deep olive strip background
The system SHALL render the amenities row on a deep olive strip aligned with the site palette.

#### Scenario: Amenities strip styling
- **WHEN** the amenities section renders
- **THEN** it uses the deep olive background with contrasting icon and text colors

### Requirement: Responsive sizing
The system SHALL adjust icon and label sizes on smaller screens to keep a single-row layout.

#### Scenario: Mobile layout
- **WHEN** the viewport is small
- **THEN** icons and text reduce in size to remain in one row

