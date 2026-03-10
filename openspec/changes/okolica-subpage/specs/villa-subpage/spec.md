## MODIFIED Requirements

### Requirement: Villa page renders at /villa with standard subpage header
The system SHALL serve a page at the `/{locale}/villa` route (or `/villa` for English). The page SHALL display a header with translated eyebrow label, title, and subtitle. All text SHALL come from the translation system.

The `/location` route SHALL no longer redirect to the under-construction page. It SHALL serve the full location (Okolica) page.

#### Scenario: Page loads with Italian header
- **WHEN** a user navigates to `/it/villa`
- **THEN** the page displays the eyebrow as "Villa", title as "Villa Monte Calvia", and subtitle in Italian

#### Scenario: Page loads with English header
- **WHEN** a user navigates to `/villa`
- **THEN** the page displays the eyebrow as "Property", title as "Villa Monte Calvia", and subtitle in English

#### Scenario: Location route serves real page
- **WHEN** a user navigates to `/location` or `/{locale}/location`
- **THEN** the full Okolica page renders instead of the under-construction placeholder
