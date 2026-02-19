## Why

The contact page currently only has a form and social links. Visitors have no quick way to see the villa's location, phone number, or email — they must fill out the form for any inquiry. Adding a contact info panel with a map, phone, and email gives visitors immediate access to key details and a visual sense of where the villa is.

## What Changes

- Add a **contact info panel** beside the contact form on the `/contact` page, containing:
  - A **static map component** — an OpenStreetMap screenshot with a brand-colored location pin overlay and a "SPRAWDŹ DOJAZD" CTA button that links to Google Maps directions
  - **Phone number** display
  - **Email address** display
- Relocate existing **social links** (Facebook, Instagram, Google) into the info panel
- Change the contact page layout from single-column to **two-column on desktop** (info panel left, form right), stacking vertically on mobile
- Widen the page container from `max-w-4xl` to `max-w-6xl`
- Add a **Leaflet-based HTML utility** to generate the map screenshot (one-time use, not shipped to production)

## Capabilities

### New Capabilities
- `contact-info-panel`: Contact information panel with static map, phone, email, and social links displayed alongside the contact form

### Modified Capabilities

_(none — no existing spec-level requirements are changing)_

## Impact

- `app/src/app/contact/page.tsx` — layout restructure to two-column, social links moved into info panel
- `app/src/components/ContactForm.tsx` — no changes needed
- New component(s) for the contact info panel and map display
- New static asset: map screenshot image (generated via Leaflet utility, committed as a static file)
- No new runtime dependencies — map is a static image, not a live embed
