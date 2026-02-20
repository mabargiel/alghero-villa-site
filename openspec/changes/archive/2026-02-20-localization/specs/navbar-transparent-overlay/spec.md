## MODIFIED Requirements

### Requirement: Transparent navbar over hero
When the hero media is visible at the top of the page, the navbar background shall be transparent. The navbar SHALL include a top bar row with social icons and language switcher above the main navigation row.

#### Scenario: Initial page load with hero visible
- **WHEN** the page loads and the hero media is visible at the top
- **THEN** the navbar background is transparent on the first render, with the language switcher and social icons visible in the top bar

#### Scenario: Refresh while hero is visible
- **WHEN** the user refreshes the page and the hero media is visible at the top
- **THEN** the navbar background remains transparent without flashing an opaque color

## ADDED Requirements

### Requirement: Navigation labels use translations
All navigation labels (Home, Villa, Location, Gallery, Contact) SHALL come from the translation system instead of hardcoded strings.

#### Scenario: Nav renders in Italian
- **WHEN** the page renders with Italian locale active
- **THEN** nav labels display as "Home", "Villa", "Dintorni", "Galleria", "Contatti"

#### Scenario: Nav renders in English
- **WHEN** the page renders with English locale active
- **THEN** nav labels display as "Home", "Villa", "Location", "Gallery", "Contact"

### Requirement: Mobile menu button label uses translations
The mobile "Menu" button text SHALL come from the translation system.

#### Scenario: Mobile menu in Spanish
- **WHEN** the mobile nav renders with Spanish locale active
- **THEN** the button displays "Menú"

### Requirement: Aria labels use translations
All aria-labels in the navbar (logo link, social icon links) SHALL come from the translation system.

#### Scenario: Logo aria-label in Polish
- **WHEN** the navbar renders in Polish
- **THEN** the logo link has an aria-label in Polish
