## Why

The current CTA label "Sprawdź dostępność" (and its equivalents) describes an action the user already understands from context — the booking bar is clearly a booking entry point. Replacing it with "Rezerwuj" reduces friction and makes the intent more direct. At the same time, the calendar legend uses season-type labels (Low/Mid/High season) that obscure actual pricing and add no actionable information; showing per-night prices with availability status is more useful and simpler.

## What Changes

- **CTA label**: Change `checkAvailability` translation values to the direct booking verb in all 6 languages (pl, en, it, de, fr, es) — no code changes, translation files only
- **Calendar legend**: Replace "Low/Mid/High season" entries with actual per-night price amounts; add a "Booked" indicator for unavailable dates; keep the Promotion entry
- **Below-legend info row**: Add a subtle line showing `min. 7 nocy · max. 12 osób` (and equivalents in all languages)
- **Minimum nights**: Update `MIN_NIGHTS` constant from 5 to 7

## Capabilities

### New Capabilities
- none

### Modified Capabilities
- `hero-booking-bar`: CTA label changes from "check availability" verb to "book" verb across all locales
- `pricing-calendar`: Legend changes from season-type labels to per-night prices + booked indicator + constraints info row

## Impact

- `app/messages/*.json` — 6 language files: update `checkAvailability` value, add `booked` key, add `minNights` and `maxGuests` keys in `pricing` namespace
- `app/src/components/AvailabilityCalendar.tsx` — legend rendering logic + `MIN_NIGHTS` constant
