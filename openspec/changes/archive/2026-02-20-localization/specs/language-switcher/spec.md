## ADDED Requirements

### Requirement: Language switcher in top bar
The system SHALL display a horizontal language switcher in the top bar row (where social icons are), separated from the social icons by a `|` divider. The switcher SHALL show all 4 locale codes: EN, IT, PL, ES.

#### Scenario: Switcher renders on desktop
- **WHEN** any page loads on desktop
- **THEN** the top bar shows social icons on the left side of the right-aligned group, a `|` divider, and then the 4 language codes

#### Scenario: Active locale is visually distinct
- **WHEN** the current locale is Italian
- **THEN** "IT" appears visually emphasized (e.g., bold or with accent color) while EN, PL, ES appear in the default muted style

### Requirement: Language switcher navigates to same page in target locale
Each language code in the switcher SHALL be a link to the current page path in the target locale.

#### Scenario: User switches from English to Italian on villa page
- **WHEN** the user clicks "IT" while viewing `/villa`
- **THEN** the browser navigates to `/it/villa`

#### Scenario: User switches from Italian to English on contact page
- **WHEN** the user clicks "EN" while viewing `/it/contact`
- **THEN** the browser navigates to `/contact` (no prefix for English)

#### Scenario: User switches language on home page
- **WHEN** the user clicks "PL" while viewing `/`
- **THEN** the browser navigates to `/pl/`

### Requirement: Language switcher visible on mobile
The language switcher SHALL be visible on mobile viewports in the same top bar position above the main nav, accessible without opening the hamburger menu.

#### Scenario: Mobile top bar with switcher
- **WHEN** any page loads on mobile
- **THEN** the social icons and language switcher row is visible above the logo/hamburger row

### Requirement: Language switcher sets locale cookie
Clicking a language in the switcher SHALL set the `NEXT_LOCALE` cookie to persist the user's preference.

#### Scenario: User selects Spanish
- **WHEN** the user clicks "ES" in the language switcher
- **THEN** the `NEXT_LOCALE` cookie is set to `es` and subsequent visits default to Spanish
