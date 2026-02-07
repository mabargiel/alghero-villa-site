## ADDED Requirements

### Requirement: Lato typography across the site
The system SHALL use the Lato font family for headings and body text across all pages to maintain a warm, nature-forward tone.

#### Scenario: Typography rendering
- **WHEN** a visitor loads any page
- **THEN** headings and body copy render using Lato as the primary font

### Requirement: Route-aware navigation contrast
The system SHALL render the navigation in white on the home hero and in dark text on subpages to ensure readable contrast across backgrounds.

#### Scenario: Subpage navigation visibility
- **WHEN** a visitor opens a subpage (Gallery or Contact)
- **THEN** the navigation text and underline are rendered in a dark color with sufficient contrast

### Requirement: Responsive navigation on mobile
The system SHALL provide a mobile-friendly navigation layout that keeps menu access visible and usable on small screens.

#### Scenario: Mobile navigation access
- **WHEN** a visitor views the site on a phone-sized screen
- **THEN** the navigation remains accessible without overlapping content or causing horizontal overflow

### Requirement: Olive accents with readable contrast
The system SHALL apply the main olive color to secondary accents (e.g., underlines, captions, small labels) with sufficient contrast on light backgrounds.

#### Scenario: Accent usage
- **WHEN** a section heading renders
- **THEN** an olive accent is visible without reducing legibility of primary text

### Requirement: Section captions under headings
The system SHALL display a short descriptive caption under primary section titles (e.g., Property, Garden, Interiors, Location, Amenities) to reinforce the narrative.

#### Scenario: Caption presence
- **WHEN** a visitor scrolls to a primary section
- **THEN** the section title includes a brief caption beneath it

### Requirement: Hero-to-content spacing
The system SHALL provide a visible gap between the hero section and the next content section to clarify the transition into the long-scroll narrative.

#### Scenario: Hero transition
- **WHEN** a visitor scrolls past the hero
- **THEN** the first content section begins after a clear vertical gap

### Requirement: Smooth scrolling without visible scrollbar
The system SHALL provide smooth, natural scrolling without visual jumps and SHALL hide the right-side scrollbar while preserving scroll functionality.

#### Scenario: Scroll behavior
- **WHEN** a visitor scrolls the page
- **THEN** scrolling is smooth and no right-side scrollbar is visible

### Requirement: No horizontal overflow
The system SHALL prevent horizontal scrolling or overflow at all breakpoints.

#### Scenario: Horizontal overflow
- **WHEN** a visitor scrolls horizontally on any page
- **THEN** the page does not move and no horizontal scrollbar appears
