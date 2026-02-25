## MODIFIED Requirements

### Requirement: Translation files for all supported locales
The system SHALL maintain JSON translation files for English, Italian, Polish, Spanish, French, and German in a `messages/` directory at the app root. English (`en.json`) SHALL be the source of truth.

#### Scenario: All locale files exist
- **WHEN** the application builds
- **THEN** `messages/en.json`, `messages/it.json`, `messages/pl.json`, `messages/es.json`, `messages/fr.json`, and `messages/de.json` all exist and contain the same set of translation keys

#### Scenario: French translation file has all namespaces
- **WHEN** `messages/fr.json` is loaded
- **THEN** it contains all namespaces: `metadata`, `nav`, `home`, `villa`, `pricing`, `contact`, `gallery`, `cookieConsent`, `privacy`, and `common`

#### Scenario: German translation file has all namespaces
- **WHEN** `messages/de.json` is loaded
- **THEN** it contains all namespaces: `metadata`, `nav`, `home`, `villa`, `pricing`, `contact`, `gallery`, `cookieConsent`, `privacy`, and `common`

### Requirement: ICU MessageFormat for pluralization
Translation keys that involve counts SHALL use ICU MessageFormat syntax to handle pluralization rules for each locale.

#### Scenario: French night count pluralization (singular)
- **WHEN** the pricing summary shows 1 night in French
- **THEN** it displays "1 nuit"

#### Scenario: French night count pluralization (plural)
- **WHEN** the pricing summary shows 3 nights in French
- **THEN** it displays "3 nuits"

#### Scenario: German night count pluralization (singular)
- **WHEN** the pricing summary shows 1 night in German
- **THEN** it displays "1 Nacht"

#### Scenario: German night count pluralization (plural)
- **WHEN** the pricing summary shows 3 nights in German
- **THEN** it displays "3 Nächte"

## ADDED Requirements

### Requirement: French OG locale metadata
The French translation file SHALL include `ogLocale` set to `fr_FR` in the `metadata` namespace.

#### Scenario: French page OG locale
- **WHEN** a user visits `/fr/`
- **THEN** the OpenGraph locale meta tag is set to `fr_FR`

### Requirement: German OG locale metadata
The German translation file SHALL include `ogLocale` set to `de_DE` in the `metadata` namespace.

#### Scenario: German page OG locale
- **WHEN** a user visits `/de/`
- **THEN** the OpenGraph locale meta tag is set to `de_DE`
