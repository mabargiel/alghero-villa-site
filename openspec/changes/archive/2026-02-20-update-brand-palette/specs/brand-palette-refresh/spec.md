## ADDED Requirements

### Requirement: Brand tint usage
The system SHALL expose a brand tint color aligned with the logo for large branding elements and hero-specific branding.

#### Scenario: Brand name styling
- **WHEN** the brand name or logo text is rendered on the site
- **THEN** it uses the configured brand tint color

### Requirement: Accessible accents
The system SHALL provide accent and accent-strong colors derived from the brand tint that meet WCAG AA contrast on the primary background.

#### Scenario: Primary interactive elements
- **WHEN** buttons or links are rendered on light backgrounds
- **THEN** they use the accent or accent-strong colors with WCAG AA contrast

### Requirement: Warm neutral foundation
The system SHALL retain warm neutral background and surface colors to preserve the premium, inviting tone.

#### Scenario: Page surfaces
- **WHEN** page backgrounds and surface cards render
- **THEN** they use the configured warm neutral colors
