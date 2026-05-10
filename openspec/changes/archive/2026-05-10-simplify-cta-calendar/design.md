## Context

The booking bar's CTA button uses the `checkAvailability` translation key across 6 locales. The calendar legend maps price tiers to season-type labels (Low/Mid/High season). Both are pure presentation concerns — no API or data model changes are involved.

## Goals / Non-Goals

**Goals:**
- Replace verbose "check availability" verb with direct "book" verb in all locales
- Replace season-type legend labels with actual per-night prices
- Add a "Booked" legend entry for unavailable dates
- Add a constraints info row below the legend (min nights, max guests)
- Update `MIN_NIGHTS` constant from 5 to 7

**Non-Goals:**
- Changing the icon on the CTA button
- Changing the pricing modal layout
- Adding guest-count selection UI
- Changing how tier colors are computed or applied to calendar days

## Decisions

### Translation-only CTA change
The `checkAvailability` key value is changed in all 6 `app/messages/*.json` files. No component code changes — `BookingBar.tsx` already renders `t("checkAvailability")` and that wiring stays. This avoids churn and keeps the key name stable for any future callers.

### Price in legend, not season label
`AvailabilityCalendar.tsx` currently maps `priceTiers` to hardcoded `tierLabels` array (`[t("tierLow"), t("tierMid"), t("tierHigh")]`). The change replaces `item.label` with a formatted price string (`${price}€`). No locale number formatter needed — prices are whole-number integers, plain `${price}€` is unambiguous across all locales.

### Booked indicator
A new CSS class `pricing-legend-booked` (styled like a grayed-out dot) is added. A new `booked` translation key is added to the `pricing` namespace in all 6 language files. The legend renders this entry after the price tiers and before promotion.

### Constraints info row
A new `<p>` element is appended below the legend `<div>`. It uses two new translation keys: `minNights` (e.g., "min. 7 nocy") and `maxGuests` (e.g., "max. 12 osób"), concatenated with ` · `. These are static strings — no interpolation needed since the values (7 and 12) don't come from config.

### MIN_NIGHTS: 5 → 7
The constant in `AvailabilityCalendar.tsx` is updated. The warning logic that uses it is unchanged — only the threshold changes.

## Risks / Trade-offs

- [Stale key name] `checkAvailability` key name no longer matches its value semantics — future devs may find this confusing. → Acceptable; renaming the key would require touching all component imports, which is unnecessary churn for a cosmetic change.
- [Hard-coded max guests] `max. 12 osób` is a static string, not driven by CMS/config. If capacity changes it requires a deploy. → Acceptable given the low frequency of capacity changes.
