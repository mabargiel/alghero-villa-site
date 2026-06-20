## ADDED Requirements

### Requirement: Meta Pixel initializes on every page under consent

The site SHALL load Meta Pixel's `fbevents.js` and call `fbq('init', NEXT_PUBLIC_META_PIXEL_ID)` followed by `fbq('track', 'PageView')` on initial page load, only when the user has granted cookie consent. The pixel SHALL NOT load when consent is denied or undecided.

#### Scenario: Consent granted, pixel loads and fires initial PageView

- **WHEN** a visitor with cookie consent granted loads any page
- **THEN** `fbevents.js` is requested from `connect.facebook.net`
- **AND** `window.fbq` becomes defined
- **AND** an initial `PageView` event is sent to the Pixel ID configured in `NEXT_PUBLIC_META_PIXEL_ID`

#### Scenario: Consent not granted, pixel does not load

- **WHEN** a visitor without cookie consent loads any page
- **THEN** `fbevents.js` is not requested
- **AND** `window.fbq` is undefined
- **AND** no requests to `facebook.com` or `connect.facebook.net` are made

### Requirement: PageView fires on every client-side route change

After the initial page load, the site SHALL fire a `PageView` event on every Next.js App Router pathname change, so that single-page navigations (which do not trigger the Pixel's auto-firing) still register with Meta.

#### Scenario: User navigates via Next.js Link

- **WHEN** a visitor with consent granted navigates from `/` to `/villa` via a `<Link>` (no full page reload)
- **THEN** `fbq('track', 'PageView')` is called exactly once for the `/villa` navigation
- **AND** the PageView event is sent for the new pathname

#### Scenario: Same-page hash navigation does not double-fire

- **WHEN** a visitor with consent granted clicks an in-page anchor link (e.g. `/villa#salon` while already on `/villa`)
- **THEN** no additional `PageView` event fires (the pathname did not change)

### Requirement: Lead event fires on both browser and server with matching event_id

When a visitor submits the contact form (or the inquiry stage of the pricing modal) successfully, the site SHALL fire a `Lead` event from the browser via `fbq('track', 'Lead', payload, {eventID})` AND from the server via the Conversions API to `https://graph.facebook.com/v25.0/{pixel_id}/events`, with both events sharing the same `event_id` for Meta-side deduplication.

#### Scenario: Successful form submission fires deduplicated Lead

- **WHEN** a visitor with consent granted submits the contact form successfully
- **THEN** the browser fires `fbq('track', 'Lead', …, { eventID })` where `eventID` is a freshly generated UUID
- **AND** the request to `/api/contact` includes that same `eventID` in its body
- **AND** the `/api/contact` route POSTs an event to `graph.facebook.com/v25.0/{pixel_id}/events` with `event_id` equal to the same UUID and `event_name: "Lead"`
- **AND** Meta's Events Manager Test Events tool shows one Lead conversion (deduped), not two

#### Scenario: Pricing modal inquiry submission also fires Lead with matching event_id

- **WHEN** a visitor with consent granted submits the inquiry stage of the pricing modal successfully
- **THEN** the same dual-fire (browser + server) pattern occurs with a fresh `eventID`

#### Scenario: Consent denied, neither side fires

- **WHEN** a visitor without consent submits the contact form successfully
- **THEN** no `fbq` call is made (window.fbq is undefined)
- **AND** the request to `/api/contact` indicates consent is not granted
- **AND** the `/api/contact` route does not POST to the Conversions API
- **AND** the form submission still completes successfully (email is sent via Resend)

### Requirement: ViewContent fires on contact page mount

When a visitor with consent granted lands on the contact page, the site SHALL fire `fbq('track', 'ViewContent', { content_name: 'Contact Page' })` once.

#### Scenario: First mount of contact page

- **WHEN** a visitor with consent granted opens `/contact`
- **THEN** `fbq('track', 'ViewContent', { content_name: 'Contact Page' })` is called once

### Requirement: InitiateCheckout fires when pricing modal advances to inquiry stage

When the pricing modal opens AND the visitor advances to the inquiry-form stage, the site SHALL fire `fbq('track', 'InitiateCheckout')` once per advance. Merely opening the modal without advancing to the inquiry stage SHALL NOT fire this event.

#### Scenario: Visitor opens modal and advances to inquiry stage

- **WHEN** a visitor with consent granted opens the pricing modal and advances from the date/guest selection to the inquiry form stage
- **THEN** `fbq('track', 'InitiateCheckout')` is fired once at the moment of stage transition

#### Scenario: Visitor opens modal but closes without advancing

- **WHEN** a visitor with consent granted opens the pricing modal and closes it before advancing past the date/guest selection
- **THEN** no `InitiateCheckout` event fires

### Requirement: Conversions API payload includes hashed PII and raw match identifiers

The Conversions API client SHALL hash PII fields (email, phone, first name) with SHA-256 after normalization, and forward `_fbp`/`_fbc` cookie values plus `client_ip_address` and `client_user_agent` as raw (unhashed) values. Normalization SHALL match Meta's documented rules.

#### Scenario: Email is normalized and hashed

- **WHEN** the CAPI client sends a Lead event for the email `"  Jane.Doe@Example.COM  "`
- **THEN** the `user_data.em` field contains the SHA-256 hash of `"jane.doe@example.com"` (trimmed, lowercased)

#### Scenario: Phone is normalized to digits-only and hashed

- **WHEN** the CAPI client sends a Lead event for the phone `"+48 500-290-390"`
- **THEN** the `user_data.ph` field contains the SHA-256 hash of `"48500290390"` (non-digits stripped, no `+` prefix)

#### Scenario: First name is lowercased and hashed

- **WHEN** the CAPI client sends a Lead event for first name `"Mateusz"`
- **THEN** the `user_data.fn` field contains the SHA-256 hash of `"mateusz"`

#### Scenario: Match identifiers are sent raw

- **WHEN** the CAPI client sends a Lead event from a request with header `User-Agent: Mozilla/5.0`, IP `203.0.113.5`, and cookies `_fbp=fb.1.123.456`, `_fbc=fb.1.789.AAA`
- **THEN** the `user_data` payload contains `client_user_agent: "Mozilla/5.0"`, `client_ip_address: "203.0.113.5"`, `fbp: "fb.1.123.456"`, `fbc: "fb.1.789.AAA"` — none of these values are hashed

### Requirement: Conversions API failures never block the user-facing form

If the Conversions API call fails (network error, 4xx, 5xx, missing access token), the `/api/contact` route SHALL still return a successful response to the user, log the failure server-side, and not surface any error to the form UI.

#### Scenario: CAPI returns 401 (invalid token)

- **WHEN** a visitor submits a contact form successfully
- **AND** the Resend email send succeeds
- **AND** the Conversions API responds 401 (invalid access token)
- **THEN** the `/api/contact` route returns 200 to the client
- **AND** the form UI displays its success state
- **AND** the 401 response body is logged server-side

#### Scenario: CAPI is unreachable

- **WHEN** a visitor submits a contact form successfully
- **AND** `graph.facebook.com` is unreachable (network timeout)
- **THEN** the `/api/contact` route returns 200 to the client
- **AND** the form UI displays its success state
- **AND** the network error is logged server-side

### Requirement: Test event code, when set, routes events to the Test Events tool

When the optional `META_TEST_EVENT_CODE` environment variable is set, the Conversions API client SHALL include it as `test_event_code` in the request body, causing events to appear in Events Manager's Test Events tab. When unset, the field SHALL be omitted from the request body.

#### Scenario: META_TEST_EVENT_CODE set during dev verification

- **WHEN** `META_TEST_EVENT_CODE` is set to `TEST12345`
- **AND** a Lead event is sent via CAPI
- **THEN** the POST body to graph.facebook.com includes `test_event_code: "TEST12345"`
- **AND** the event appears in Events Manager → Test Events tab

#### Scenario: META_TEST_EVENT_CODE unset in production

- **WHEN** `META_TEST_EVENT_CODE` is unset
- **AND** a Lead event is sent via CAPI
- **THEN** the POST body does not include a `test_event_code` field
- **AND** the event flows into normal ad campaign optimization

### Requirement: Environment variables follow public/private split

The Pixel ID SHALL be exposed as `NEXT_PUBLIC_META_PIXEL_ID` (browser-readable). The CAPI access token SHALL be exposed as `META_CAPI_ACCESS_TOKEN` (server-only, no `NEXT_PUBLIC_` prefix). The optional test event code SHALL be exposed as `META_TEST_EVENT_CODE` (server-only).

#### Scenario: Pixel ID is bundled in the client

- **WHEN** the production client bundle is inspected
- **THEN** the Pixel ID is present as a string literal (this is expected and correct)

#### Scenario: Access token never reaches the client

- **WHEN** the production client bundle is inspected
- **THEN** the access token is not present in any client-bundled code
- **AND** `process.env.META_CAPI_ACCESS_TOKEN` is only referenced from server-side code under `src/app/api/` or `src/lib/`
