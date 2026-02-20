## ADDED Requirements

### Requirement: Translation files for all supported locales
The system SHALL maintain JSON translation files for English, Italian, Polish, and Spanish in a `messages/` directory at the app root. English (`en.json`) SHALL be the source of truth.

#### Scenario: All locale files exist
- **WHEN** the application builds
- **THEN** `messages/en.json`, `messages/it.json`, `messages/pl.json`, and `messages/es.json` all exist and contain the same set of translation keys

### Requirement: Namespace-organized translation keys
Translation files SHALL use nested namespaces to organize keys by feature area: `nav`, `home`, `villa`, `pricing`, `contact`, `gallery`, `common`, `metadata`.

#### Scenario: Navigation labels translated
- **WHEN** the nav renders in Italian
- **THEN** labels display as "Home", "Villa", "Dintorni", "Galleria", "Contatti"

#### Scenario: Home page content translated
- **WHEN** the home page renders in Spanish
- **THEN** all section titles, descriptions, amenity labels, and CTAs display in Spanish

### Requirement: No hardcoded Polish strings in source code
All visible user-facing text in component files SHALL be replaced with calls to `next-intl` translation functions (`useTranslations` for client components, `getTranslations` for server components). No Polish string literals SHALL remain in `.tsx` or `.ts` source files.

#### Scenario: Component renders with translations
- **WHEN** any page component renders
- **THEN** all visible text comes from the translation system, not hardcoded strings

### Requirement: ICU MessageFormat for pluralization
Translation keys that involve counts SHALL use ICU MessageFormat syntax to handle pluralization rules for each locale.

#### Scenario: Polish night count pluralization
- **WHEN** the pricing summary shows 1 night in Polish
- **THEN** it displays "1 noc"

#### Scenario: Polish night count pluralization (few)
- **WHEN** the pricing summary shows 3 nights in Polish
- **THEN** it displays "3 noce"

#### Scenario: Polish night count pluralization (many)
- **WHEN** the pricing summary shows 7 nights in Polish
- **THEN** it displays "7 nocy"

#### Scenario: English night count pluralization
- **WHEN** the pricing summary shows 1 night in English
- **THEN** it displays "1 night"

#### Scenario: English night count pluralization (plural)
- **WHEN** the pricing summary shows 3 nights in English
- **THEN** it displays "3 nights"

### Requirement: Locale-aware date formatting
All date display SHALL use the `next-intl` formatter or equivalent locale-aware formatting tied to the active locale, replacing all hardcoded `pl-PL` locale strings.

#### Scenario: Italian date format
- **WHEN** a date is displayed in Italian locale
- **THEN** the date uses Italian month abbreviations (e.g., "15 mar")

#### Scenario: English date format
- **WHEN** a date is displayed in English locale
- **THEN** the date uses English month abbreviations (e.g., "Mar 15")

### Requirement: Locale-aware number formatting
All number/price display SHALL use locale-aware formatting tied to the active locale.

#### Scenario: Price displayed in Italian
- **WHEN** a price of 1690 is displayed in Italian locale
- **THEN** it renders as "1.690" (Italian thousand separator)

#### Scenario: Price displayed in English
- **WHEN** a price of 1690 is displayed in English locale
- **THEN** it renders as "1,690" (English thousand separator)

### Requirement: Villa room and exterior data uses translation keys
The villa data file SHALL export only structural data (keys, amenity arrays, flags). All room titles, descriptions, exterior titles, subtitles, and descriptions SHALL come from translation files keyed by the room/section key.

#### Scenario: Room title in Italian
- **WHEN** the villa page renders bedroom-1 in Italian
- **THEN** the title displays "Camera 1" from the Italian translation file

#### Scenario: Exterior section in English
- **WHEN** the villa page renders the garden section in English
- **THEN** the title displays "Garden" and the description is in English
