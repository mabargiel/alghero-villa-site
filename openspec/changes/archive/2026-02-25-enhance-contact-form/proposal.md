## Why

The contact form currently collects only name, email, and phone — missing key booking details (dates, guest count, message). The owner must follow up for basic information on every enquiry. Additionally, visitors receive no confirmation after submitting, leaving them uncertain whether the enquiry was received. Upgrading the form and adding localized email confirmations improves both the visitor experience and owner workflow.

## What Changes

- Add required fields to the contact form: arrive date, leave date, number of guests (including children), and a free-text message
- Extract a reusable date range picker component from the existing `PricingCalendar`, stripped of pricing logic
- Pass the current locale from the client to the `/api/contact` route
- Add a localized HTML confirmation email sent to the visitor (React Email + Resend), thanking them and informing someone will be in touch
- Upgrade the owner notification email from plain text to HTML (React Email), now including all new fields (dates, guests, message)
- Add translation keys for all new form labels, placeholders, and email content across all 6 locales

## Capabilities

### New Capabilities
- `confirmation-email`: Localized HTML confirmation email sent to the visitor after form submission
- `contact-form`: Contact form fields, validation, submission, and locale-aware API integration

### Modified Capabilities
- `contact-info-panel`: Owner notification email upgraded to HTML with new fields (dates, guests, message)
- `i18n-translations`: New translation namespaces for email content and new form fields
- `pricing-calendar`: Date range picker logic extracted into a shared component reusable outside pricing context

## Impact

- **Components**: `ContactForm.tsx` (new fields + layout), new `DateRangePicker.tsx` shared component, `PricingCalendar.tsx` (refactored to use shared component)
- **API**: `/api/contact/route.ts` — accepts new fields + locale, sends two emails instead of one
- **Dependencies**: Add `@react-email/components` for HTML email templates
- **Translations**: All 6 locale files (`messages/*.json`) gain new keys under `contact` and new `confirmationEmail` / `ownerEmail` namespaces
- **Email templates**: Two new React Email components (visitor confirmation, owner notification)
