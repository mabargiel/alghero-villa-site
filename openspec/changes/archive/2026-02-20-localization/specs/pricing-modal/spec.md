## MODIFIED Requirements

### Requirement: Modal overlay with pricing calendar
The system SHALL display a centered modal overlay containing the pricing calendar and price summary when triggered from the booking bar. All text labels SHALL come from the translation system.

#### Scenario: Modal opens with translated header
- **WHEN** the user opens the pricing modal in Italian locale
- **THEN** the modal header displays "Verifica il prezzo" instead of hardcoded Polish

#### Scenario: Close button aria-label is translated
- **WHEN** the modal renders in any locale
- **THEN** the close button has a translated aria-label (e.g., "Close" in English, "Chiudi" in Italian)

### Requirement: Contact CTA in modal
The price summary inside the modal SHALL display a CTA button linking to the locale-aware `/contact` route when a valid date range is selected. The button label SHALL come from the translation system.

#### Scenario: CTA in English locale
- **WHEN** the user has selected a valid date range in English locale
- **THEN** the button displays "Ask about availability" and links to `/contact`

#### Scenario: CTA in Italian locale
- **WHEN** the user has selected a valid date range in Italian locale
- **THEN** the button displays "Richiedi disponibilità" and links to `/it/contact`

## ADDED Requirements

### Requirement: Price summary labels use translations
All labels in the price summary (summary heading, total label, extras labels, night pluralization, min-nights warning, empty state prompt) SHALL come from the translation system.

#### Scenario: Summary heading in Spanish
- **WHEN** the price summary renders in Spanish
- **THEN** the heading displays "Resumen"

#### Scenario: Night pluralization in Italian
- **WHEN** the summary shows 3 nights in Italian locale
- **THEN** it displays "3 notti"

#### Scenario: Extras labels translated
- **WHEN** the price summary shows extras in English locale
- **THEN** "Cleaning" and "Refundable deposit" are displayed with "included" for the cleaning fee

#### Scenario: Min-nights warning translated
- **WHEN** the user selects fewer than 5 nights in Polish locale
- **THEN** the warning displays "Minimalny pobyt to 5 nocy. Wybierz dłuższy zakres dat."

#### Scenario: Empty state prompt translated
- **WHEN** no dates are selected in Italian locale
- **THEN** the prompt displays "Seleziona le date sul calendario per vedere il prezzo."
