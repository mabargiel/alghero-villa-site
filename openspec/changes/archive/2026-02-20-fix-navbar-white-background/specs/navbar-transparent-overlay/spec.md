## ADDED Requirements

### Requirement: Transparent navbar over hero
When the hero media is visible at the top of the page, the navbar background SHALL be transparent.

#### Scenario: Initial page load with hero visible
- **WHEN** the page loads and the hero media is visible at the top
- **THEN** the navbar background is transparent on the first render

#### Scenario: Refresh while hero is visible
- **WHEN** the user refreshes the page and the hero media is visible at the top
- **THEN** the navbar background remains transparent without flashing an opaque color

### Requirement: Stable transition after hero
The navbar background SHALL remain transparent until the scroll position indicates the hero media is no longer visible.

#### Scenario: User scrolls past hero
- **WHEN** the user scrolls until the hero media is no longer visible
- **THEN** the navbar may switch to its non-transparent style according to existing behavior
