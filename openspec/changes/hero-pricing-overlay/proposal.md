## Why

The current `/pricing` page forces users to navigate away from the hero to check prices. Moving the pricing experience into a modal triggered from a booking bar on the hero keeps visitors engaged with the stunning video background while providing instant price estimation. Additionally, the hero text needs better readability over the dynamic video, and the page background color needs warming to match the villa's Mediterranean interior palette.

## What Changes

- **Add a booking bar to the hero section**: A date-picker bar at the bottom of the hero with check-in/check-out fields and a "Sprawdź cenę" CTA. No guest selector — the villa rents at a flat rate regardless of occupancy.
- **Add a pricing modal**: Clicking the booking bar opens a centered modal containing the existing PricingCalendar + PriceSummary components. The modal CTA links to `/contact` for inquiry.
- **Remove the `/pricing` route**: The standalone pricing page is replaced by the hero modal. The "Cennik" nav link is removed or replaced.
- **Improve hero text readability**: Replace single text-shadow with layered multi-shadow approach. Reduce overlay opacity to let video breathe (from `bg-black/55` to ~`bg-black/40` on desktop). No frosted glass or background containers — the video should feel immersive.
- **Warm the color palette**: Shift page background from cool mint (`#edf3f0`) to warm linen (`#f5f0ea`). Warm surface tokens slightly. Replace bright emerald CTA gradient with the brand olive green (`#48685a`). Keep `--brand`/`--accent` olive green unchanged.
- **Center hero text**: Shift text alignment from left-aligned to centered, matching the premium villa aesthetic.

## Capabilities

### New Capabilities
- `hero-booking-bar`: Booking date-picker bar anchored at the bottom of the hero section, triggering a pricing modal on date interaction.
- `pricing-modal`: Full-screen modal overlay containing the pricing calendar and price summary, accessible from the hero booking bar.

### Modified Capabilities
- `pricing-calendar`: Requirements change — the calendar and price summary now render inside a modal instead of a standalone page. Layout adapts to modal context. Responsive behavior may differ (modal width constraints vs full page).

## Impact

- **Frontend components**: `page.tsx` (hero section restructured), `HeroMedia.tsx` (minor), new `BookingBar.tsx`, new `PricingModal.tsx`, `PricingCalendar.tsx` (layout adaptation), `PriceSummary.tsx` (minor), `TopNav.tsx` (remove Cennik link)
- **Styles**: `globals.css` (color tokens, hero text shadows, booking bar styles, modal styles)
- **Routes**: `/pricing/page.tsx` removed
- **No backend/CMS changes**: Same Sanity queries and pricing engine
- **No dependency changes**: Uses existing react-day-picker, no new packages needed
