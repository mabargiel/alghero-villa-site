## ADDED Requirements

### Requirement: Locale-based URL routing with [locale] segment
The system SHALL serve all pages under a `[locale]` dynamic route segment supporting `en`, `it`, `pl`, and `es` locales. English (`en`) SHALL be the default locale.

#### Scenario: English page served without locale prefix
- **WHEN** a user navigates to `/villa`
- **THEN** the page is served with English content and no `/en` prefix in the URL

#### Scenario: Non-default locale served with prefix
- **WHEN** a user navigates to `/it/villa`
- **THEN** the page is served with Italian content

#### Scenario: Explicit default locale prefix redirects
- **WHEN** a user navigates to `/en/villa`
- **THEN** the system redirects to `/villa` (removing the unnecessary `/en` prefix)

#### Scenario: Unknown locale in URL
- **WHEN** a user navigates to `/de/villa`
- **THEN** the system serves a 404 page

### Requirement: Accept-Language detection on first visit
The system SHALL use `next-intl` middleware to detect the user's preferred language from the `Accept-Language` HTTP header on the first visit (when no locale cookie exists).

#### Scenario: Italian browser visits root
- **WHEN** a user with `Accept-Language: it` visits `/` for the first time
- **THEN** the system redirects to `/it/`

#### Scenario: Polish browser visits root
- **WHEN** a user with `Accept-Language: pl` visits `/` for the first time
- **THEN** the system redirects to `/pl/`

#### Scenario: Unsupported language in Accept-Language
- **WHEN** a user with `Accept-Language: de` visits `/` for the first time
- **THEN** the system serves the page in English (default locale) at `/`

#### Scenario: English browser visits root
- **WHEN** a user with `Accept-Language: en` visits `/` for the first time
- **THEN** the system serves the page in English at `/` (no redirect)

### Requirement: Cookie-based locale persistence
The system SHALL persist the user's locale preference in a `NEXT_LOCALE` cookie. The cookie SHALL take precedence over `Accept-Language` on subsequent visits.

#### Scenario: User switches language via switcher
- **WHEN** a user switches from English to Italian using the language switcher
- **THEN** a `NEXT_LOCALE=it` cookie is set and subsequent visits serve Italian content

#### Scenario: Returning user with cookie
- **WHEN** a user with `NEXT_LOCALE=pl` cookie visits `/`
- **THEN** the system redirects to `/pl/` regardless of the `Accept-Language` header

### Requirement: Dynamic HTML lang attribute
The root `<html>` element SHALL have its `lang` attribute set to the current locale.

#### Scenario: Italian page renders
- **WHEN** a user visits `/it/contact`
- **THEN** the rendered HTML has `<html lang="it">`

#### Scenario: English page renders
- **WHEN** a user visits `/gallery`
- **THEN** the rendered HTML has `<html lang="en">`

### Requirement: Locale-aware internal links
All internal `<Link>` and `<a>` elements pointing to site pages SHALL automatically include the correct locale prefix based on the current locale.

#### Scenario: Link in Italian context
- **WHEN** a component renders `<Link href="/contact">` while the active locale is `it`
- **THEN** the rendered anchor points to `/it/contact`

#### Scenario: Link in English context
- **WHEN** a component renders `<Link href="/contact">` while the active locale is `en`
- **THEN** the rendered anchor points to `/contact` (no prefix)

### Requirement: Locale-aware sitemap with hreflang
The sitemap SHALL include entries for all pages in all 4 locales, with `hreflang` alternate links for each page.

#### Scenario: Sitemap includes all locale variants
- **WHEN** a search engine fetches `/sitemap.xml`
- **THEN** each page entry includes alternate links for `en`, `it`, `pl`, and `es` with correct locale-prefixed URLs

### Requirement: Locale-aware metadata
Each page SHALL generate metadata (title, description, OG tags) using the translations for the active locale.

#### Scenario: Italian home page metadata
- **WHEN** a user visits `/it/`
- **THEN** the page title and description are in Italian

#### Scenario: English contact page metadata
- **WHEN** a user visits `/contact`
- **THEN** the page title and description are in English

### Requirement: API routes remain outside locale routing
API routes (`/api/*`) SHALL NOT be affected by locale routing.

#### Scenario: API route accessed directly
- **WHEN** a client sends a POST to `/api/contact`
- **THEN** the request is handled normally without locale detection or redirection
