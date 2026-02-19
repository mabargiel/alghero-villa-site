## Why

The website's pricing page (`/pricing`) is currently an under-construction stub. Potential guests have no way to check pricing or understand rental costs without contacting the owner directly. An interactive pricing page with a date-range calendar will let visitors explore costs, see seasonal rates and active promotions, and reduce friction before they reach out to book.

## What Changes

- Add a new **interactive pricing calendar** on the `/pricing` page where users select a date range and see a calculated cost breakdown.
- Create a **Sanity CMS pricing schema** (`pricingConfig` singleton) that lets the owner define:
  - Base pricing as date ranges with a daily rate.
  - Promotions per range (array) — either percentage discount or fixed override price, with their own sub-date-ranges.
  - Additional fees (cleaning, deposit).
  - Included perks (free car, exclusive rental, etc.).
- Display a **price summary panel** showing per-segment breakdown, promotion badges, fees, and a CTA linking to the contact page.
- Calendar days outside any configured base range appear as unavailable (greyed out), naturally handling off-season (Nov–Apr) without explicit configuration.

## Capabilities

### New Capabilities
- `pricing-calendar`: Interactive date-range calendar UI that visualizes seasonal pricing, highlights promotions, and calculates total cost for a selected stay.
- `pricing-cms`: Sanity CMS schema and GROQ queries for managing base pricing ranges, promotions, fees, and perks.

### Modified Capabilities
- `under-construction-mode`: The `/pricing` route will no longer show the under-construction page; it will render the new pricing page instead.

## Impact

- **Frontend**: New page component at `app/src/app/pricing/page.tsx`, new client-side calendar component, new Sanity query in `lib/sanity/queries.ts`.
- **Sanity CMS**: New schema types (`pricingConfig`, nested objects for ranges/promotions/extras/perks) added to `schemaTypes/`.
- **Dependencies**: A date/calendar library will be needed (e.g., `react-day-picker` or custom implementation).
- **No breaking changes** to existing pages or APIs.
