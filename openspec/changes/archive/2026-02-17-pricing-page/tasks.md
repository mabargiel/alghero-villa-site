## 1. Sanity CMS Schema

- [x] 1.1 Create `pricingRange` object type with fields: label (string), startDate (date), endDate (date), pricePerDay (number), promotions array — in `schemaTypes/pricingRange.ts`
- [x] 1.2 Create `pricingPromotion` object type with fields: label (string), startDate (date), endDate (date), type (percentage | fixed), value (number) — in `schemaTypes/pricingPromotion.ts`
- [x] 1.3 Create `pricingExtra` object type with fields: label (string), amount (number, optional), type (fee | deposit | included) — in `schemaTypes/pricingExtra.ts`. Amount is not required when type is `included`.
- [x] 1.4 Create `pricingConfig` singleton document type with fields: baseRanges (array of pricingRange), extras (array of pricingExtra), perks (array of strings) — in `schemaTypes/pricingConfig.ts`
- [x] 1.5 Add validation rules: startDate < endDate on ranges, promotion dates within parent range, no overlapping promotions within same range
- [x] 1.6 Register all new types in `schemaTypes/index.ts`

## 2. Sanity Query & Types

- [x] 2.1 Define TypeScript types for `PricingConfig`, `PricingRange`, `PricingPromotion`, `PricingExtra` in `lib/sanity/queries.ts`
- [x] 2.2 Create GROQ query to fetch the `pricingConfig` singleton with all nested data
- [x] 2.3 Create `getPricingConfig()` fetch function with 300s ISR revalidation

## 3. Price Calculation Logic

- [x] 3.1 Create `lib/pricing.ts` with a `calculatePriceBreakdown(config, startDate, endDate)` function that returns per-segment line items (date range, nights, segment total, promotion info). Per-day prices are used internally for calculation but never exposed in the output.
- [x] 3.2 Handle promotion application: percentage discounts and fixed-price overrides
- [x] 3.3 Handle ranges that span multiple pricing tiers with separate line items

## 4. Calendar Component

- [x] 4.1 Install `react-day-picker` dependency
- [x] 4.2 Create `PricingCalendar` client component with date range selection using react-day-picker
- [x] 4.3 Style calendar with Tailwind to match site design (brand colors, price tier color coding, promotion indicators)
- [x] 4.4 Disable past dates and dates without configured pricing (unavailable/greyed out)
- [x] 4.5 Enforce 5-night minimum stay: prevent selecting ranges shorter than 5 nights and show a message when attempted
- [x] 4.6 Implement responsive layout: 2 months on desktop, 1 month on mobile

## 5. Price Summary Component

- [x] 5.1 Create `PriceSummary` client component showing per-segment breakdown with date range, night count, and segment total (no per-day prices shown)
- [x] 5.2 Display promotion badges with strikethrough original segment total for promotional segments
- [x] 5.3 Display extras below the cost breakdown: fees and deposits with amounts, `included` items with "w cenie" label
- [x] 5.4 Display perks as informational items
- [x] 5.5 Add "Zapytaj o termin" CTA button linking to `/contact`

## 6. Pricing Page

- [x] 6.1 Replace the under-construction redirect in `app/src/app/pricing/page.tsx` with a server component that fetches `pricingConfig` and renders the pricing page
- [x] 6.2 Ensure `/pricing` route works (no `/cennik` alias needed — English URLs only)
- [x] 6.3 Add page metadata (title, description, OpenGraph) for the pricing page
- [x] 6.4 Compose `PricingCalendar` and `PriceSummary` into the page layout with Reveal animations consistent with other pages
