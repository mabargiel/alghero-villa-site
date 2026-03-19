## Why

Users report that nothing visibly happens after submitting the contact form. The current confirmation is a small inline `text-sm` green box that appears within the form — easy to miss, especially on mobile. At least 2 users said they thought the form didn't work. This undermines trust and may cause duplicate submissions.

## What Changes

- Replace the inline success message with a full success screen that replaces the entire form content
- Show a large checkmark icon, a clear "Thank you" heading, and a message that someone will be in touch
- Add a note about the confirmation email sent to their inbox
- Include a CTA button to continue exploring the site (e.g., "Explore the villa")
- Add all new translation keys across 6 languages (en, it, pl, es, fr, de)

## Capabilities

### New Capabilities
- `contact-form-success-screen`: Full-screen success state replacing the contact form after successful submission, with icon, messaging, email confirmation note, and navigation CTA

### Modified Capabilities
- `contact-form`: The form component's success state changes from an inline message to rendering a separate success screen
- `i18n-translations`: New translation keys added for the success screen content

## Impact

- `app/src/components/ContactForm.tsx` — conditional rendering of success screen instead of inline message
- `app/messages/{en,it,pl,es,fr,de}.json` — new translation keys for success screen content
- No API changes, no new dependencies
