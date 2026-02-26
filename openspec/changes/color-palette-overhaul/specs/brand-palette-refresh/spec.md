## MODIFIED Requirements

### Requirement: Brand tint usage
The system SHALL expose a brand color (#2D5A4A, tropical green) aligned with Mediterranean vegetation for branding elements, and a terracotta warm accent (#B5623A) derived from the villa's terracotta tiles for primary CTAs.

#### Scenario: Brand name styling
- **WHEN** the brand name or logo text is rendered on the site
- **THEN** it uses the configured brand color (#2D5A4A)

#### Scenario: Primary CTA styling
- **WHEN** a primary call-to-action (e.g., "Book Now") is rendered
- **THEN** it uses the terracotta accent-warm color (#B5623A) instead of the previous gold (#f2a733)

### Requirement: Accessible accents
The system SHALL provide accent (#1A4535) and accent-strong (#0D3326) colors as deeper tones of the brand green, plus a Mediterranean sky blue (#1B7FA3) for links, all meeting WCAG AA contrast on the primary background (#F4F1EB).

#### Scenario: Primary interactive elements
- **WHEN** buttons or links are rendered on light backgrounds
- **THEN** brand green buttons use accent or accent-strong colors, and text links use accent-sky color, each with WCAG AA contrast (minimum 4.5:1)

#### Scenario: Green hierarchy for secondary actions
- **WHEN** secondary action buttons (e.g., "Explore Villa") are rendered
- **THEN** they use the brand green (#2D5A4A) to visually distinguish from primary terracotta CTAs

### Requirement: Warm neutral foundation
The system SHALL use warm neutral background (#F4F1EB), surface (#E8E2D6), and surface-strong (#D5CCBE) colors derived from proven luxury web palettes to preserve the premium, inviting tone.

#### Scenario: Page surfaces
- **WHEN** page backgrounds and surface cards render
- **THEN** they use the configured warm neutral colors with clear visual distinction between levels
