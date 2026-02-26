## ADDED Requirements

### Requirement: Split-complementary color harmony
The color system SHALL use a split-complementary harmony based on hues 20° (terracotta), 155° (tropical green), and 210° (Mediterranean blue).

#### Scenario: Color harmony validation
- **WHEN** the primary palette colors are examined
- **THEN** the CTA warm color uses hue ~20°, the brand/accent greens use hue ~155°, and the sky accent uses hue ~210°

### Requirement: Three-tier green hierarchy
The system SHALL provide three distinct green tones for brand (`--brand`), accent (`--accent`), and accent-strong (`--accent-strong`) with at least 10 lightness units between each step.

#### Scenario: Green hierarchy distinction
- **WHEN** brand (#2D5A4A), accent (#1A4535), and accent-strong (#0D3326) are rendered side by side
- **THEN** each is clearly distinguishable from the others

### Requirement: Terracotta primary CTA
The system SHALL use terracotta (`--accent-warm`: #B5623A) as the primary call-to-action color, replacing the previous gold accent.

#### Scenario: Book Now button rendering
- **WHEN** the primary CTA button (e.g., "Book Now") is rendered
- **THEN** it uses `--accent-warm` (#B5623A) as its background color

#### Scenario: CTA hover state
- **WHEN** a user hovers over the primary CTA button
- **THEN** the button background darkens to the hover value (#A25524)

### Requirement: Mediterranean blue secondary accent
The system SHALL provide a sky blue accent (`--accent-sky`: #1B7FA3) for links and secondary interactive elements.

#### Scenario: Link rendering on light backgrounds
- **WHEN** a text link is rendered on a light background
- **THEN** it uses `--accent-sky` color and meets WCAG AA contrast ratio (minimum 4.5:1)

### Requirement: Warm neutral background scale
The system SHALL provide three background tones with distinct spacing: background (#F4F1EB), surface (#E8E2D6), and surface-strong (#D5CCBE), each separated by approximately 5-6% lightness.

#### Scenario: Background hierarchy
- **WHEN** page background, card surface, and footer/emphasized surface are rendered
- **THEN** each uses its designated variable and is visually distinguishable

### Requirement: No hardcoded brand colors in components
Component files SHALL NOT contain hardcoded hex or rgba values that encode the brand color. All brand-tinted shadows and hover states SHALL use the current palette values.

#### Scenario: Brand shadow alignment
- **WHEN** a button shadow uses brand-color-tinted rgba values
- **THEN** the RGB values match the current `--brand` color (#2D5A4A → rgb 45,90,74)

#### Scenario: Hover state alignment
- **WHEN** a hover state uses a hardcoded hex for a lighter brand tone
- **THEN** the hex value is derived from the current brand color

### Requirement: Pricing calendar palette alignment
The pricing calendar tier colors and legend swatches SHALL be derived from the main palette color families.

#### Scenario: Pricing tier backgrounds
- **WHEN** pricing calendar day cells render for low, mid, and high tiers
- **THEN** low tier uses a brand-green tint, mid tier uses a warm amber tint, and high tier uses a terracotta tint

#### Scenario: Promo indicator in-family
- **WHEN** a promotional date is indicated in the pricing calendar
- **THEN** the indicator uses warm coral (#D4654A) instead of magenta, staying within the palette family

### Requirement: Email template palette alignment
Email templates SHALL use an inline color palette tonally aligned with the website palette (warm cream backgrounds, brand-aligned text and accent colors).

#### Scenario: Email background tone
- **WHEN** a confirmation or notification email is rendered
- **THEN** the email background uses a warm cream tone aligned with the website's `--background`

#### Scenario: Email text hierarchy
- **WHEN** email heading and body text are rendered
- **THEN** the heading uses a dark tone aligned with `--foreground` and body uses a mid-tone aligned with `--muted`

### Requirement: Hero and overlay color alignment
The hero section overlay, animation gradient, and text shadows SHALL use colors derived from the new palette's deep tones.

#### Scenario: Hero overlay rendering
- **WHEN** the hero section dark overlay renders
- **THEN** it uses `--deep-olive` (#1A2420) with appropriate opacity

#### Scenario: Hero gradient animation
- **WHEN** the hero background gradient animates
- **THEN** the gradient colors are derived from the new brand green family, not olive-toned
