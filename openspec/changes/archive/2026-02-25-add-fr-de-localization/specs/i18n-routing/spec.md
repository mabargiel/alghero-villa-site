## MODIFIED Requirements

### Requirement: Locale-based URL routing with [locale] segment
The system SHALL serve all pages under a `[locale]` dynamic route segment supporting `en`, `it`, `pl`, `es`, `fr`, and `de` locales. English (`en`) SHALL be the default locale.

#### Scenario: English page served without locale prefix
- **WHEN** a user navigates to `/villa`
- **THEN** the page is served with English content and no `/en` prefix in the URL

#### Scenario: Non-default locale served with prefix
- **WHEN** a user navigates to `/it/villa`
- **THEN** the page is served with Italian content

#### Scenario: French page served with prefix
- **WHEN** a user navigates to `/fr/villa`
- **THEN** the page is served with French content

#### Scenario: German page served with prefix
- **WHEN** a user navigates to `/de/villa`
- **THEN** the page is served with German content

#### Scenario: Explicit default locale prefix redirects
- **WHEN** a user navigates to `/en/villa`
- **THEN** the system redirects to `/villa` (removing the unnecessary `/en` prefix)

#### Scenario: Unknown locale in URL
- **WHEN** a user navigates to `/ja/villa`
- **THEN** the system serves a 404 page

### Requirement: Accept-Language detection on first visit
The system SHALL use `next-intl` middleware to detect the user's preferred language from the `Accept-Language` HTTP header on the first visit (when no locale cookie exists).

#### Scenario: Italian browser visits root
- **WHEN** a user with `Accept-Language: it` visits `/` for the first time
- **THEN** the system redirects to `/it/`

#### Scenario: Polish browser visits root
- **WHEN** a user with `Accept-Language: pl` visits `/` for the first time
- **THEN** the system redirects to `/pl/`

#### Scenario: French browser visits root
- **WHEN** a user with `Accept-Language: fr` visits `/` for the first time
- **THEN** the system redirects to `/fr/`

#### Scenario: German browser visits root
- **WHEN** a user with `Accept-Language: de` visits `/` for the first time
- **THEN** the system redirects to `/de/`

#### Scenario: Unsupported language in Accept-Language
- **WHEN** a user with `Accept-Language: ja` visits `/` for the first time
- **THEN** the system serves the page in English (default locale) at `/`

#### Scenario: English browser visits root
- **WHEN** a user with `Accept-Language: en` visits `/` for the first time
- **THEN** the system serves the page in English at `/` (no redirect)

### Requirement: Locale-aware sitemap with hreflang
The sitemap SHALL include entries for all pages in all 6 locales, with `hreflang` alternate links for each page.

#### Scenario: Sitemap includes all locale variants
- **WHEN** a search engine fetches `/sitemap.xml`
- **THEN** each page entry includes alternate links for `en`, `it`, `pl`, `es`, `fr`, and `de` with correct locale-prefixed URLs
