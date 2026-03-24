## Why

Link previews on WhatsApp and social media show the logo instead of an actual villa photo, making the site look generic. Booking inquiry emails lack pricing context, forcing manual price lookups. The pricing modal's additional costs (cleaning, deposit) are listed separately, causing confusion about the actual stay cost.

## What Changes

- Replace the OG image (`og-image.png`) with the villa exterior photo so link previews show the actual property
- Add estimated price breakdown to both the owner notification email and the visitor confirmation email, with a disclaimer that the price is an estimate
- Restructure the price summary in the pricing modal: roll the cleaning fee into the displayed total, show a `?` info icon that reveals cost breakdown (cleaning fee, deposit) on hover
- Deposit remains shown as a separate refundable line but cleaning fee is absorbed into the total
- All new user-facing text (tooltip labels, email pricing section, disclaimer) must be translated across all 6 supported locales (en, it, pl, es, fr, de)

## Capabilities

### New Capabilities

### Modified Capabilities
- `pricing-modal`: Price summary rolls cleaning fee into total; adds info tooltip icon showing cost breakdown on hover
- `confirmation-email`: Include estimated price summary (total, nights, dates) with "estimated price" disclaimer
- `contact-form`: API route calculates and passes estimated price to both email templates

## Impact

- `app/public/og-image.png` — replaced with villa photo (1200x630)
- `app/src/components/PriceSummary.tsx` — restructured extras display, added tooltip
- `app/src/emails/ConfirmationEmail.tsx` — new pricing section
- `app/src/emails/OwnerNotificationEmail.tsx` — new pricing section
- `app/src/app/api/contact/route.ts` — price calculation added to email flow
- `app/messages/*.json` — new translation keys for price estimate disclaimer and tooltip
