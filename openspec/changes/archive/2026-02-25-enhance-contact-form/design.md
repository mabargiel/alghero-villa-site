## Context

The contact form (`ContactForm.tsx`) currently collects first name, email, and phone via a client component that POSTs to `/api/contact`. The API route validates fields, checks a honeypot and rate limiter, then sends a plain-text notification to the owner via Resend. No confirmation is sent to the visitor. The form has no locale awareness — the API route receives no language context.

The project already uses `react-day-picker` v9 in `PricingCalendar.tsx` for date range selection, with full locale support. Email is handled by Resend (`resend` v6). Translations use `next-intl` with 6 locales (`en`, `it`, `pl`, `es`, `fr`, `de`) stored in `messages/{locale}.json`.

## Goals / Non-Goals

**Goals:**
- Collect arrival/departure dates, guest count, and message in the contact form
- Send a localized HTML confirmation email to the visitor
- Upgrade the owner notification to HTML with all new fields
- Reuse the existing `react-day-picker` setup via a shared component

**Non-Goals:**
- Availability checking or booking logic (form is purely an enquiry)
- Form validation library (continue with native HTML validation + manual server checks)
- Custom email domain setup (continue using Resend's onboarding domain)
- Logo/branding overhaul for emails (use existing `favicon.png`)

## Decisions

### 1. Date picker: shared `DateRangePicker` component extracted from `PricingCalendar`

**Choice:** Extract the core `react-day-picker` wrapper (locale mapping, range selection logic, navigation buttons, styling) into a new `DateRangePicker.tsx` component. `PricingCalendar` refactors to compose this shared component and layer pricing-specific logic on top (tier modifiers, promotion modifiers, disabled date matchers). The contact form uses the shared component directly with no pricing concerns.

**Why over alternatives:**
- *Two separate `<input type="date">`*: Inconsistent UX across browsers, no locale-aware month/day names, doesn't match the polished calendar feel of the existing pricing picker.
- *Duplicating the calendar code*: Violates DRY, two diverging implementations to maintain.

### 2. Locale passing: client sends locale in POST body

**Choice:** The contact form reads the current locale via `useLocale()` from `next-intl` and includes it in the JSON POST body as `locale`.

**Why over alternatives:**
- *Accept-Language header parsing*: May not match the page locale the visitor is actually viewing.
- *Referer URL parsing*: Fragile, doesn't work for default locale (no prefix in URL).

### 3. Email templates: React Email components

**Choice:** Use `@react-email/components` to build two React component templates — one for visitor confirmation, one for owner notification. Resend natively renders React Email components via its `react` option in `emails.send()`.

**Why over alternatives:**
- *Hand-written HTML strings*: Unmaintainable, hard to test, no component reuse.
- *MJML or other templating*: Adds another paradigm; React Email integrates seamlessly with the existing React/Resend stack.

### 4. Email translations: load from existing `messages/{locale}.json` server-side

**Choice:** In the API route, dynamically import the correct locale file (`messages/${locale}.json`) and read keys from new namespaces (`confirmationEmail`, `ownerEmail`). No need for `next-intl` server utilities in the API route — just plain JSON access.

**Why over alternatives:**
- *Inline translations in email templates*: Duplicates the i18n system, translations scattered across files.
- *`next-intl/server` in API route*: API routes are excluded from locale routing middleware; wiring `next-intl` server context there adds unnecessary complexity.

### 5. Guests field: single numeric input

**Choice:** A `<input type="number" min="1">` with a label like "Number of guests (incl. children)". Free-text was considered but a numeric field is easier to validate, prevents nonsense input, and the label clarifies children are included.

### 6. Email logo: absolute URL to `favicon.png`

**Choice:** Reference `https://{SITE_URL}/favicon.png` in the email `<Img>` tag. The site URL comes from an environment variable (e.g., `NEXT_PUBLIC_SITE_URL` or hardcoded production domain). This avoids CID attachments and works across all email clients.

## Risks / Trade-offs

- **Date picker popover UX on mobile**: A two-month calendar may be tight on small screens. → Mitigate by setting `numberOfMonths` to 1 on mobile viewports (the pricing calendar already handles this via the shared component).
- **Locale mismatch in email**: If someone manually calls the API with a bogus locale, the import will fail. → Validate locale against the supported list before loading translations; fall back to `en`.
- **Resend rate limits**: Sending two emails per submission doubles the Resend API calls. → Current rate limiter (5 per 10 min per IP) keeps volume low. Not a concern at current scale.
- **Email deliverability**: Sending from `onboarding@resend.dev` may land in spam. → Out of scope (non-goal), but worth noting for future custom domain setup.
