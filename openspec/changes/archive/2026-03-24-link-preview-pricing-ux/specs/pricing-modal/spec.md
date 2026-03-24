## MODIFIED Requirements

### Requirement: Price summary labels use translations
All labels in the price summary (summary heading, total label, extras labels, night pluralization, min-nights warning, empty state prompt, tooltip labels) SHALL come from the translation system.

#### Scenario: Summary heading in Spanish
- **WHEN** the price summary renders in Spanish
- **THEN** the heading displays "Resumen"

#### Scenario: Night pluralization in Italian
- **WHEN** the summary shows 3 nights in Italian locale
- **THEN** it displays "3 notti"

#### Scenario: Tooltip labels translated
- **WHEN** the user hovers the info icon in English locale
- **THEN** the tooltip shows "Base price", "Cleaning fee", and "Refundable deposit" labels from translations

#### Scenario: Min-nights warning translated
- **WHEN** the user selects fewer than 5 nights in Polish locale
- **THEN** the warning displays "Minimalny pobyt to 5 nocy. Wybierz dłuższy zakres dat."

#### Scenario: Empty state prompt translated
- **WHEN** no dates are selected in Italian locale
- **THEN** the prompt displays "Seleziona le date sul calendario per vedere il prezzo."

## ADDED Requirements

### Requirement: Cleaning fee included in displayed total
The price summary SHALL add the cleaning fee (€150) to the displayed total price. The cleaning fee SHALL NOT appear as a separate line item below the total.

#### Scenario: Total includes cleaning fee
- **WHEN** the user selects a date range with a calculated base price of €1000
- **THEN** the total displays €1150 (base price + €150 cleaning fee)

#### Scenario: Cleaning fee not shown as separate extra
- **WHEN** the price summary renders with a valid date range
- **THEN** no separate "Cleaning" line item appears in the extras section

### Requirement: Price breakdown info tooltip
The price summary SHALL display a `?` icon button next to the total price. On hover (desktop) or focus (keyboard/mobile), a tooltip SHALL appear showing the cost breakdown: base price for the stay, cleaning fee amount, and a note that the deposit is refundable.

#### Scenario: Tooltip appears on hover
- **WHEN** the user hovers over the `?` icon next to the total
- **THEN** a tooltip appears showing the base price, cleaning fee (€150), and a note about the refundable deposit

#### Scenario: Tooltip accessible via keyboard
- **WHEN** the user focuses the `?` icon button via Tab key
- **THEN** the same tooltip content appears as on hover

#### Scenario: Tooltip disappears on mouse leave
- **WHEN** the user moves the mouse away from the `?` icon
- **THEN** the tooltip disappears

### Requirement: Refundable deposit remains visible
The security deposit (€800) SHALL continue to be displayed as a separate line item below the total, marked as refundable.

#### Scenario: Deposit shown separately
- **WHEN** the price summary renders with a valid date range
- **THEN** the deposit line shows "€800" with "Refundable deposit" label
