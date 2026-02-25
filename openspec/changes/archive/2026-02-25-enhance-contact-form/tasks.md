## 1. Dependencies & Setup

- [x] 1.1 Install `@react-email/components` package
- [x] 1.2 Add `NEXT_PUBLIC_SITE_URL` environment variable to `.env.example` (for email logo absolute URL)

## 2. Shared Date Range Picker

- [x] 2.1 Extract shared `DateRangePicker` component from `PricingCalendar.tsx` — includes `react-day-picker` in range mode, locale mapping, custom nav buttons, range selection logic, and `onRangeChange` callback
- [x] 2.2 Refactor `PricingCalendar.tsx` to compose the shared `DateRangePicker`, layering pricing-specific modifiers/disabled matchers on top
- [x] 2.3 Verify the pricing modal still works identically after refactor

## 3. Contact Form Fields

- [x] 3.1 Add arrive/leave date fields to `ContactForm.tsx` using the shared `DateRangePicker` with past dates disabled
- [x] 3.2 Add guests numeric input (min 1, required) with "including children" label
- [x] 3.3 Add required message textarea
- [x] 3.4 Include `locale` (from `useLocale()`) in the POST body
- [x] 3.5 Update form layout grid to accommodate new fields

## 4. Translations

- [x] 4.1 Add new contact form field keys (`arriveDate`, `leaveDate`, `guests`, `message`) to `contact` namespace in all 6 locale files
- [x] 4.2 Add `confirmationEmail` namespace (greeting, body, followUp, contactHeader) to all 6 locale files
- [x] 4.3 Add `ownerEmail` namespace (subject, contactSection, staySection, messageSection) to all 6 locale files

## 5. Email Templates

- [x] 5.1 Create React Email component for visitor confirmation email — greeting with `{firstName}`, thank-you text, follow-up promise, villa contact details, favicon header, footer with "Villa Monte Calvia · Alghero, Sardinia"
- [x] 5.2 Create React Email component for owner notification email — favicon header, visitor's name/email/phone, arrival/departure dates, guest count, full message text, `replyTo` set to visitor email

## 6. API Route

- [x] 6.1 Update `/api/contact` route to accept and validate new fields (`arriveDate`, `leaveDate`, `guests`, `message`, `locale`)
- [x] 6.2 Validate `locale` against supported list, fall back to `en`
- [x] 6.3 Validate `arriveDate` is before `leaveDate`
- [x] 6.4 Load translations from `messages/{locale}.json` for email content
- [x] 6.5 Replace plain-text owner email with React Email HTML template
- [x] 6.6 Add visitor confirmation email send (second `resend.emails.send` call)

## 7. Verification

- [x] 7.1 Test form submission end-to-end — verify both emails arrive with correct content
- [x] 7.2 Test with a non-English locale — verify confirmation email is localized
- [x] 7.3 Test validation edge cases (missing fields, invalid dates, unsupported locale)
