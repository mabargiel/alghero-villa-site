## MODIFIED Requirements

### Requirement: Date range selection calendar
The system SHALL display an interactive two-month calendar in the pricing modal that allows visitors to select a check-in and check-out date by clicking. The calendar component SHALL use the locale-appropriate `react-day-picker` locale for month/weekday names and formatting.

#### Scenario: Calendar renders in Italian
- **WHEN** the pricing calendar renders with Italian locale active
- **THEN** month names and weekday abbreviations display in Italian

#### Scenario: Calendar renders in English
- **WHEN** the pricing calendar renders with English locale active
- **THEN** month names and weekday abbreviations display in English

#### Scenario: User selects a date range
- **WHEN** the user clicks a start date and then an end date on the calendar
- **THEN** the selected range is visually highlighted and the parent component is notified via the change handler

## ADDED Requirements

### Requirement: Pricing tier labels use translations
The calendar legend labels (Low season, Mid season, High season, Promotion) SHALL come from the translation system.

#### Scenario: Legend renders in Spanish
- **WHEN** the calendar legend renders with Spanish locale active
- **THEN** labels display as "Temporada baja", "Temporada media", "Temporada alta", "Promoción"

#### Scenario: Legend renders in Polish
- **WHEN** the calendar legend renders with Polish locale active
- **THEN** labels display as "Niski sezon", "Średni sezon", "Wysoki sezon", "Promocja"
