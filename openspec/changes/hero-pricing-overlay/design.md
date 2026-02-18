## Context

The Villa Monte Calvia website currently has a separate `/pricing` page with a two-month calendar and price summary panel. The hero section has left-aligned text over a video background with a single CTA button. The page uses a cool mint-tinted background (`#edf3f0`) and bright emerald CTA buttons that feel disconnected from the warm Mediterranean villa interiors.

The hero text uses a single `text-shadow` layer and `bg-black/55` overlay for readability — insufficient for a dynamic video background.

## Goals / Non-Goals

**Goals:**
- Move the pricing experience into a modal triggered from a booking bar on the hero
- Center hero text and improve readability over video with layered text-shadows
- Warm the color palette (background, CTA buttons) while preserving the olive green brand accent
- Remove the standalone `/pricing` route and "Cennik" nav link

**Non-Goals:**
- Booking/reservation system integration (future scope)
- Guest count selector (flat pricing regardless of occupancy)
- Airbnb/Booking.com calendar sync for unavailable dates (future scope)
- CMS schema changes (no new Sanity fields needed)

## Decisions

### 1. Modal vs. dropdown for pricing

**Decision**: Full-screen centered modal with backdrop.

**Alternatives considered:**
- Dropdown from the booking bar — too cramped for two-month calendar + price summary
- Slide-in panel — breaks the centered, immersive feel of the hero

**Rationale**: The existing PricingCalendar renders a two-month calendar (flex-row on desktop) plus a sidebar PriceSummary. This needs horizontal space. A centered modal with max-width constraint works well and keeps the video visible as a dimmed backdrop.

### 2. Modal layout

**Decision**: Stack calendar and summary vertically inside the modal. The current `lg:flex-row` layout with a 380px sidebar works on a full page but the modal should be narrower (~max-w-3xl). Inside the modal:
- Calendar (two months side-by-side on desktop, stacked on mobile)
- Legend below calendar
- PriceSummary below the legend (always visible, shows placeholder when no dates selected)

This keeps the modal compact. The PriceSummary is always visible at the bottom so the user immediately sees results after selecting dates.

### 3. Booking bar design

**Decision**: A semi-transparent white bar (`bg-white/90 backdrop-blur-sm`) anchored near the bottom of the hero viewport. Contains:
- Calendar icon + "Zameldowanie" (check-in label) — clickable, opens modal
- Arrow → "Wymeldowanie" (check-out label) — clickable, opens modal
- "Sprawdź cenę" CTA button — opens modal

No guest selector. The bar is a simple trigger to open the modal.

After the user has selected dates in the modal and closed it, the bar updates to show the selected dates and a price teaser (e.g., "od 1 690 €").

### 4. Text readability approach

**Decision**: Layered text-shadows instead of containers or frosted glass.

```css
.hero-text-shadow {
  text-shadow:
    0 2px 8px rgb(0 0 0 / 60%),
    0 4px 16px rgb(0 0 0 / 40%),
    0 8px 40px rgb(0 0 0 / 30%);
}
```

Reduce desktop overlay from `bg-black/55` to `bg-black/40` to let the video breathe more. Mobile stays at `bg-black/75` (small screens need more contrast).

The booking bar gets its own solid background (`bg-white/90`) so it's naturally readable as a UI element.

### 5. Hero text centering

**Decision**: Center all hero text content (badge, h1, paragraph). Remove the `md:text-left` / `md:justify-start` modifiers. The flex container becomes `items-center justify-center text-center` at all breakpoints.

The old "Sprawdź dostępność" CTA button is removed — the booking bar replaces it as the primary action.

### 6. Color palette changes

**Decision**: Warm backgrounds, keep olive green accent, replace emerald CTA with brand green.

| Token | Before | After |
|---|---|---|
| `--background` | `#edf3f0` | `#f5f0ea` |
| `--surface` | `#f4f1e9` | `#f2ede4` |
| `--surface-strong` | `#ebe5d8` | `#e5ddd0` |
| `--brand` | `#48685a` | `#48685a` (unchanged) |
| `--accent` | `#48685a` | `#48685a` (unchanged) |
| `--deep-olive` | `#1f2a23` | `#1f2a23` (unchanged) |

CTA buttons throughout the site (hero booking bar, PriceSummary, bottom CTA card) shift from `bg-gradient-to-r from-emerald-700 to-emerald-600` to a brand-green approach: `bg-[var(--brand)]` with a slightly lighter hover state. Shadow colors shift from emerald green to the brand olive.

### 7. Component architecture

**Decision**: Two new client components, minimal changes to existing ones.

- **`BookingBar.tsx`** (new, client) — Renders the date fields + CTA. Manages modal open/close state. Holds selected date range + computed breakdown as state. Fetches `PricingConfig` via props from the server component (page.tsx).
- **`PricingModal.tsx`** (new, client) — Renders the modal shell (backdrop + centered content). Contains `PricingCalendar` and `PriceSummary` (existing components). Receives `config`, `range`, `onRangeChange`, `onClose` as props.
- **`PricingCalendar.tsx`** (modified) — Lift `range` state up: accept `range` and `onRangeChange` as props instead of managing internally. Remove the `PriceSummary` from inside this component (it now lives in the modal shell). Layout changes: remove the `lg:flex-row` wrapper since the parent (modal) handles layout.
- **`PriceSummary.tsx`** — No changes needed. Already a pure presentational component.
- **`page.tsx`** (modified) — Fetch `getPricingConfig()` alongside existing hero data. Pass config to `BookingBar`. Remove old CTA button. Center hero text.
- **`TopNav.tsx`** (modified) — Remove the "Cennik" item from `navItems`.
- **`globals.css`** (modified) — Update color tokens, hero-text-shadow, add modal styles.

### 8. Server vs. client boundary

**Decision**: `page.tsx` stays a server component. It fetches `PricingConfig` and passes it as a prop to `BookingBar` (client component). This is the same pattern used for the current pricing page — no new data fetching patterns needed.

### 9. Modal close behavior

**Decision**: Modal closes on:
- Clicking the X button
- Clicking the backdrop
- Pressing Escape

When closed, the selected range and breakdown persist in the BookingBar state so the bar can show the selected dates and price teaser.

### 10. /pricing route removal

**Decision**: Delete `app/src/app/pricing/page.tsx`. No redirect needed — this is a pre-launch site with no SEO history to preserve.

## Risks / Trade-offs

- **Calendar in modal on mobile**: Two-month calendar in a modal on small screens could feel cramped. Mitigation: PricingCalendar already shows 1 month on mobile via `flex-col`. The modal will be full-width on mobile with proper padding.
- **State management**: BookingBar holds range state and passes it to PricingModal → PricingCalendar. This is a straightforward prop-drilling approach. No need for context or state management library for this scope.
- **Scroll lock**: When modal is open, body scroll should be locked. Use `overflow: hidden` on body. Must be cleaned up on modal close.
- **Video performance**: Reducing the overlay from `/55` to `/40` means more video detail is visible. The video encoding quality matters more now. Current video sources from Sanity should be adequate.
