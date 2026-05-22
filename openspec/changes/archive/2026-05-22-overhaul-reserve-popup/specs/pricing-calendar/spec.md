## ADDED Requirements

### Requirement: Calendar supports collapsed-then-expanded presentation
The `AvailabilityCalendar` component SHALL support a presentation in which it is hidden behind a single-row date input until the user activates it, at which point the calendar replaces its host's body. This presentation is used inside the pricing modal's Stage 1.

#### Scenario: Calendar exposes a collapsed and expanded presentation
- **WHEN** the calendar is mounted inside the pricing modal Stage 1
- **THEN** it renders only the collapsed date input until the user activates expansion, after which it renders the full 2-month calendar plus an exit affordance

#### Scenario: Selection state persists across collapse and expand
- **WHEN** the user selects a date range and then collapses the calendar back to the input
- **THEN** the selected range is summarized on the collapsed input and re-displayed on the calendar when expanded again

## MODIFIED Requirements

### Requirement: Calendar legend shows availability and promotion
The calendar legend SHALL display two entries: an "Available" entry and a "Promotion" entry. No "Booked" entry SHALL be shown. Season-type labels (Low/Mid/High season) and per-tier price dots SHALL NOT appear.

#### Scenario: Legend shows available indicator
- **WHEN** the pricing calendar is rendered
- **THEN** a legend entry labeled with the locale-appropriate word for "Available" / "Dostępne" is shown with a non-promo tile-color swatch

#### Scenario: Legend shows promotion indicator
- **WHEN** the pricing calendar is rendered
- **THEN** a legend entry labeled with the locale-appropriate word for "Promotion" / "Promocja" is shown with its existing styling

#### Scenario: Legend omits booked indicator
- **WHEN** the pricing calendar is rendered
- **THEN** no "Booked" / "Zajęte" entry appears in the legend

