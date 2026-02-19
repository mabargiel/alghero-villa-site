## ADDED Requirements

### Requirement: Pricing config singleton document
The Sanity CMS SHALL provide a singleton document type `pricingConfig` for managing all pricing data from a single place.

#### Scenario: Owner accesses pricing config in Studio
- **WHEN** the CMS user opens the pricing configuration in Sanity Studio
- **THEN** a single `pricingConfig` document is available for editing

### Requirement: Base pricing ranges
The `pricingConfig` document SHALL contain an array of base pricing ranges, each with a label, start date, end date, and price per day.

#### Scenario: Owner creates a base pricing range
- **WHEN** the CMS user adds a new entry to the base pricing ranges array
- **THEN** they can set a label (string), start date (date), end date (date), and price per day (number)

#### Scenario: Start date must be before end date
- **WHEN** the CMS user sets a start date that is after the end date
- **THEN** the CMS SHALL display a validation error

### Requirement: Promotions nested within base ranges
Each base pricing range SHALL contain an optional array of promotions. Each promotion has a label, start date, end date, type (`percentage` or `fixed`), and value.

#### Scenario: Owner adds a percentage promotion
- **WHEN** the CMS user adds a promotion with type `percentage` and value `15`
- **THEN** the frontend interprets this as a 15% discount off the base daily rate for those dates

#### Scenario: Owner adds a fixed-price promotion
- **WHEN** the CMS user adds a promotion with type `fixed` and value `350`
- **THEN** the frontend interprets this as a flat €350/day rate for those dates, replacing the base rate

#### Scenario: Promotion dates must fall within parent range
- **WHEN** the CMS user sets promotion dates outside the parent base range's start/end dates
- **THEN** the CMS SHALL display a validation error

#### Scenario: Promotion date ranges within same parent must not overlap
- **WHEN** the CMS user adds two promotions whose date ranges overlap within the same base range
- **THEN** the CMS SHALL display a validation error

#### Scenario: Promotion type is mutually exclusive
- **WHEN** the CMS user selects a promotion type
- **THEN** only `percentage` or `fixed` is allowed — not both simultaneously

### Requirement: Additional fees and included items
The `pricingConfig` document SHALL contain an array of extra items, each with a label, type (`fee`, `deposit`, or `included`), and an optional amount (not required when type is `included`).

#### Scenario: Owner configures cleaning as included
- **WHEN** the CMS user adds an extra with label "Sprzątanie", type "included"
- **THEN** the frontend displays this with "w cenie" instead of a price amount

#### Scenario: Owner configures deposit
- **WHEN** the CMS user adds an extra with label "Depozyt zwrotny", amount 800, type "deposit"
- **THEN** the frontend displays this as a refundable deposit in the price summary

#### Scenario: Owner configures an additional fee
- **WHEN** the CMS user adds an extra with label, amount, and type "fee"
- **THEN** the frontend displays this as a one-time fee in the price summary

### Requirement: Perks
The `pricingConfig` document SHALL contain an array of perk text strings describing included benefits.

#### Scenario: Owner adds a perk
- **WHEN** the CMS user adds a perk text "Samochód do dyspozycji gości — Gratis!"
- **THEN** the frontend displays this perk on the pricing page

### Requirement: GROQ query for pricing data
The frontend SHALL fetch the `pricingConfig` document via a GROQ query with ISR revalidation (300 seconds), consistent with existing query patterns.

#### Scenario: Pricing data is fetched on page load
- **WHEN** the pricing page is rendered server-side
- **THEN** the full `pricingConfig` document (ranges, promotions, fees, perks) is fetched and passed to the client component
