## Context

The Alghero villa website (Next.js 16, React 19, Tailwind v4) currently shows an under-construction stub at `/pricing`. Sanity CMS manages all content (hero, gallery, home sections) via GROQ queries with 5-minute ISR revalidation. No pricing, calendar, or date-related schemas or components exist yet.

The villa operates as a seasonal rental (May–October) with weekly pricing that varies by season. The owner wants full CMS control over pricing configuration, including the ability to run date-specific promotions.

## Goals / Non-Goals

**Goals:**
- CMS-driven pricing: owner manages base rates, promotions, fees, and perks entirely from Sanity Studio.
- Interactive calendar: visitors select a date range and see a real-time cost breakdown with promotion visibility.
- Polish-language UI consistent with the rest of the site's design language (warm neutrals, olive brand color, Lato font).
- Server-side data fetching with the same ISR caching pattern used by existing pages.

**Non-Goals:**
- Actual booking/reservation system — the CTA links to the contact page.
- Payment processing or availability tracking.
- Multi-property support — this is a single-villa site.
- Localization beyond Polish.

## Decisions

### 1. Pricing data model: date ranges with daily rate + nested promotions

**Choice:** Singleton `pricingConfig` document with an array of base pricing ranges. Each range defines `startDate`, `endDate`, and `pricePerDay`. Each range contains a nested `promotions[]` array where each promotion has its own date sub-range (within the parent), a type (`percentage` or `fixed`), and a value.

**Why:** This gives the owner maximum flexibility — arbitrary date ranges instead of fixed months, multiple promotions per range, and year-explicit dates that avoid ambiguity. The nested structure keeps promotions coupled to their base range, eliminating stacking conflicts.

**Alternatives considered:**
- Month-based tiers (simpler but too rigid for promotions and cross-month ranges).
- Separate top-level promotions array (creates stacking/overlap ambiguity).

### 2. Calendar library: react-day-picker

**Choice:** Use `react-day-picker` for the date range selection UI.

**Why:** Lightweight (~10KB), headless/unstyled (works with Tailwind), supports range selection natively, good accessibility (ARIA), and active maintenance. Aligns with the project's minimal-dependency approach.

**Alternatives considered:**
- Custom calendar from scratch (high effort, accessibility risk).
- `react-datepicker` (heavier, comes with its own styles that fight Tailwind).

### 3. Price calculation: client-side from server-fetched config

**Choice:** Fetch the full `pricingConfig` document server-side (ISR, 5-min revalidation) and pass it to a client component. Price calculation happens client-side as the user selects dates.

**Why:** The pricing dataset is small (a few KB). Calculating on the client gives instant feedback as the user adjusts their date range. No API route needed. Follows the same pattern as existing pages (server fetch → client interactivity).

**Alternatives considered:**
- API route for price calculation (unnecessary complexity for a small, public dataset).
- Full SSR with no client interactivity (can't do interactive date selection).

### 4. Promotion display: inline badges with strikethrough pricing

**Choice:** Days covered by a promotion get a distinct calendar color. The price summary shows the original price struck through with the promotional price and a badge (e.g., "−15%").

**Why:** Makes promotions immediately visible and creates a sense of value. Standard e-commerce pattern that users understand.

## Risks / Trade-offs

- **Date range validation in CMS** — Promotions must fall within parent range, and promotions within the same range must not overlap. Sanity custom validation handles this, but complex validation rules can be fragile. → Mitigation: thorough validation with clear error messages in Polish.
- **No availability awareness** — The calendar shows pricing but not whether dates are actually booked. Users may select dates that are unavailable. → Mitigation: Explicitly out of scope. The CTA is "Zapytaj o termin" (ask about availability), not "Book now".
- **Year-by-year setup** — Owner must configure pricing for each year. → Mitigation: Sanity's document duplication makes copying last year's config easy. Could add year-rollover tooling later if needed.

## Open Questions

- Minimum stay enforcement: should the calendar prevent selecting ranges shorter than 7 days? (Deferred to owner preference — can be added as an optional field in CMS.)
