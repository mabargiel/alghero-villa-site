## 1. Color palette & text readability

- [x] 1.1 Update CSS custom properties in `globals.css`: `--background` to `#f5f0ea`, `--surface` to `#f2ede4`, `--surface-strong` to `#e5ddd0`
- [x] 1.2 Replace `.hero-text-shadow` with layered multi-shadow (3 layers: tight, medium, wide)
- [x] 1.3 Reduce hero dark overlay from `bg-black/55` to `bg-black/40` on desktop (mobile stays `bg-black/75`)
- [x] 1.4 Replace all emerald CTA gradients with brand olive green (`--brand`) in `page.tsx` and `PriceSummary.tsx`

## 2. Hero text centering

- [x] 2.1 Center hero text container: change `items-center` + `text-center` at all breakpoints, remove `md:text-left` and `md:justify-start` modifiers in `page.tsx`
- [x] 2.2 Center the badge pill (remove `md:mx-0`)
- [x] 2.3 Remove the old "Sprawdź dostępność" CTA button from the hero

## 3. PricingCalendar refactor (lift state up)

- [x] 3.1 Modify `PricingCalendar` to accept `range`, `onRangeChange`, and `breakdown` as props instead of managing them internally
- [x] 3.2 Remove the inline `PriceSummary` and the `lg:flex-row` wrapper from `PricingCalendar` — it now only renders the calendar + legend
- [x] 3.3 Export `MIN_NIGHTS` constant and the `minNightsWarning` logic so BookingBar can reuse it

## 4. PricingModal component

- [x] 4.1 Create `PricingModal.tsx` client component: backdrop overlay, centered modal panel, close button (X), Escape key handler
- [x] 4.2 Add body scroll lock (set `overflow: hidden` on open, restore on close/unmount)
- [x] 4.3 Render `PricingCalendar` and `PriceSummary` inside the modal, stacked vertically
- [x] 4.4 Add modal CSS styles in `globals.css` (backdrop, animation/transition)

## 5. BookingBar component

- [x] 5.1 Create `BookingBar.tsx` client component with date fields ("Zameldowanie" / "Wymeldowanie"), arrow separator, and "Sprawdź cenę" CTA
- [x] 5.2 Implement modal open/close state management and date range state
- [x] 5.3 Compute price breakdown using `calculatePriceBreakdown` when range changes
- [x] 5.4 After modal close, display selected dates and price teaser on the bar
- [x] 5.5 Style the bar: `bg-white/90 backdrop-blur-sm`, responsive layout (stacked on mobile)

## 6. Page integration

- [x] 6.1 In `page.tsx`, fetch `getPricingConfig()` alongside existing data (add to `Promise.all`)
- [x] 6.2 Add `BookingBar` to the hero section (positioned near bottom of hero viewport)
- [x] 6.3 Remove "Cennik" from `navItems` in `TopNav.tsx`
- [x] 6.4 Delete `app/src/app/pricing/page.tsx`

## 7. Verification

- [ ] 7.1 Verify the full flow: hero loads → booking bar visible → click opens modal → select dates → price shows → close modal → bar shows dates + price → "Zapytaj o termin" links to /contact
- [ ] 7.2 Test mobile responsiveness (modal, booking bar, hero text centering)
- [ ] 7.3 Verify color palette changes render correctly across all sections
- [x] 7.4 Run `next build` to confirm no build errors
