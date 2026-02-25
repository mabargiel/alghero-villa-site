## MODIFIED Requirements

### Requirement: Language switcher in top bar
The system SHALL display a horizontal language switcher in the top bar row (where social icons are), separated from the social icons by a `|` divider. The switcher SHALL show all 6 locale codes: EN, IT, PL, ES, FR, DE.

#### Scenario: Switcher renders on desktop
- **WHEN** any page loads on desktop
- **THEN** the top bar shows social icons on the left side of the right-aligned group, a `|` divider, and then the 6 language codes

#### Scenario: Active locale is visually distinct
- **WHEN** the current locale is French
- **THEN** "FR" appears visually emphasized (e.g., bold or with accent color) while EN, IT, PL, ES, DE appear in the default muted style

#### Scenario: Active locale is German
- **WHEN** the current locale is German
- **THEN** "DE" appears visually emphasized while EN, IT, PL, ES, FR appear in the default muted style

### Requirement: Language switcher navigates to same page in target locale
Each language code in the switcher SHALL be a link to the current page path in the target locale.

#### Scenario: User switches from English to French on villa page
- **WHEN** the user clicks "FR" while viewing `/villa`
- **THEN** the browser navigates to `/fr/villa`

#### Scenario: User switches from French to German on contact page
- **WHEN** the user clicks "DE" while viewing `/fr/contact`
- **THEN** the browser navigates to `/de/contact`

#### Scenario: User switches from German to English on home page
- **WHEN** the user clicks "EN" while viewing `/de/`
- **THEN** the browser navigates to `/`

### Requirement: Language switcher visible on mobile
The language switcher SHALL be visible on mobile viewports in the same top bar position above the main nav, accessible without opening the hamburger menu.

#### Scenario: Mobile top bar with 6 locale codes
- **WHEN** any page loads on mobile
- **THEN** the social icons and language switcher row is visible above the logo/hamburger row, displaying all 6 locale codes
