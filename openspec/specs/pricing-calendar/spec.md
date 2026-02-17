## ADDED Requirements

### Requirement: Date range selection calendar
The system SHALL display an interactive two-month calendar on the pricing page that allows visitors to select a check-in and check-out date by clicking.

#### Scenario: User selects a date range
- **WHEN** the user clicks a start date and then an end date on the calendar
- **THEN** the selected range is visually highlighted and a price summary is displayed

#### Scenario: User selects a single date
- **WHEN** the user clicks only one date without selecting a second
- **THEN** that date is highlighted as the start date and the calendar awaits a second click for the end date

#### Scenario: User clears selection
- **WHEN** the user clicks the already-selected start date or uses a reset action
- **THEN** the selection is cleared and the price summary is hidden

### Requirement: Calendar shows pricing tiers visually
The system SHALL color-code calendar days based on their base pricing tier so visitors can see at a glance which periods are more or less expensive.

#### Scenario: Days with base pricing configured
- **WHEN** a day falls within a configured base pricing range
- **THEN** the day is displayed with a color indicating its price tier

#### Scenario: Days without pricing configured
- **WHEN** a day does not fall within any base pricing range
- **THEN** the day is displayed as unavailable (greyed out) and SHALL NOT be selectable

### Requirement: Promotion days are visually distinct
The system SHALL display days covered by an active promotion with a distinct visual indicator (different color or badge) so visitors can identify promotional periods.

#### Scenario: Day within a promotion range
- **WHEN** a calendar day falls within a promotion's date range
- **THEN** the day is rendered with a promotion indicator distinct from standard pricing colors

### Requirement: Price summary breakdown
The system SHALL display a price summary panel when a date range is selected, showing total cost per segment. The system SHALL NOT display per-day prices — only segment totals.

#### Scenario: Selected range spans a single pricing tier with no promotion
- **WHEN** the selected range falls entirely within one base pricing range with no active promotion
- **THEN** the summary shows: the date range, number of nights, and total cost for the segment

#### Scenario: Selected range spans multiple pricing tiers
- **WHEN** the selected range crosses base pricing range boundaries
- **THEN** the summary shows a separate line item for each segment with its date range, night count, and segment total

#### Scenario: Selected range includes promotional days
- **WHEN** part of the selected range falls within a promotion
- **THEN** the promoted segment is shown as a separate line item with the original segment total struck through, the promotional total, and a promotion badge (e.g., "−15%")

#### Scenario: Selected range includes days with no pricing
- **WHEN** the user attempts to select a range that includes unavailable days
- **THEN** the selection SHALL NOT include unavailable days (selection stops at the boundary)

### Requirement: Additional fees and included items display
The system SHALL display configured additional fees, deposits, and included items below the price breakdown.

#### Scenario: Fee configured in CMS
- **WHEN** a date range is selected and a fee with type `fee` exists in the pricing config
- **THEN** the fee is listed with its label and amount below the cost breakdown

#### Scenario: Deposit configured in CMS
- **WHEN** a date range is selected and a fee with type `deposit` exists in the pricing config
- **THEN** the deposit is listed with its label and amount below the cost breakdown

#### Scenario: Included item configured in CMS
- **WHEN** a fee with type `included` exists in the pricing config
- **THEN** the item is listed with its label and "w cenie" instead of an amount

### Requirement: Perks display
The system SHALL display configured perks (e.g., free car, exclusive rental) as informational items on the pricing page.

#### Scenario: Perks configured in CMS
- **WHEN** the pricing page loads and perks exist in the pricing config
- **THEN** each perk is displayed with its text, visible regardless of date selection

### Requirement: Minimum stay enforcement
The system SHALL enforce a minimum stay of 5 nights when selecting a date range.

#### Scenario: User selects a range shorter than 5 nights
- **WHEN** the user selects an end date that results in fewer than 5 nights
- **THEN** the selection is not accepted and the user is informed of the 5-night minimum

#### Scenario: User selects exactly 5 nights
- **WHEN** the user selects an end date that results in exactly 5 nights
- **THEN** the selection is accepted and the price summary is displayed

### Requirement: Contact CTA
The system SHALL display a call-to-action button that links to the contact page.

#### Scenario: User wants to inquire about selected dates
- **WHEN** a date range is selected
- **THEN** a CTA button links to `/contact`

### Requirement: Calendar navigation
The system SHALL allow navigating forward and backward through months.

#### Scenario: User navigates to future months
- **WHEN** the user clicks the forward navigation arrow
- **THEN** the calendar advances by one month

#### Scenario: User navigates to past months
- **WHEN** the user clicks the backward navigation arrow
- **THEN** the calendar goes back by one month

#### Scenario: Past dates are not selectable
- **WHEN** a calendar day is before today's date
- **THEN** that day is displayed as disabled and SHALL NOT be selectable

### Requirement: Responsive layout
The system SHALL display the calendar and price summary in a responsive layout that works on both desktop and mobile viewports.

#### Scenario: Desktop viewport
- **WHEN** the viewport is desktop-width (≥768px)
- **THEN** two months are shown side by side with the price summary alongside or below the calendar

#### Scenario: Mobile viewport
- **WHEN** the viewport is mobile-width (<768px)
- **THEN** one month is shown at a time with the price summary below the calendar
