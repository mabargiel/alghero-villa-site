## Context

The contact form in `ContactForm.tsx` uses a `FormState` type (`idle | sending | success | error`) to manage submission flow. On success, a small inline `<div>` with `text-sm` renders the success message within the form. Users on mobile frequently miss this feedback and think nothing happened.

The form already resets fields on success and sends a confirmation email to the visitor via Resend.

## Goals / Non-Goals

**Goals:**
- Make the success state unmissable — especially on mobile
- Communicate that the enquiry was received and a confirmation email was sent
- Provide a natural next action (navigate to villa page)

**Non-Goals:**
- No changes to the error state display (inline message is fine for errors — they need to stay near the form to fix issues)
- No changes to the API, email sending, or form validation logic
- No new dependencies or libraries (no toast library, no animation library)

## Decisions

### 1. Replace form content with success screen (not overlay/modal)

**Decision**: When `state === "success"`, render a success view _instead of_ the form — not as a modal on top.

**Rationale**: Simplest approach. No z-index/scroll-lock concerns. The form is already reset so showing empty fields serves no purpose. A conditional render based on existing `state` variable requires minimal code changes.

**Alternatives considered**:
- Modal/overlay: Adds complexity (backdrop, close handling, scroll lock). Overkill for this case.
- Toast notification: Too small — same problem we're solving.

### 2. Checkmark icon via inline SVG

**Decision**: Use a simple inline SVG circle-check icon.

**Rationale**: No icon library needed. The project doesn't use an icon library for general UI (only specific SVGs). A single SVG keeps the bundle lean.

### 3. Translations in existing `contact` namespace

**Decision**: Add new keys to the existing `contact` namespace in each locale file rather than creating a new namespace.

**Rationale**: The success screen is part of the contact form flow. Keeps related translations together. Keys: `successTitle`, `successMessage`, `successEmailNote`, `successCta`.

### 4. CTA links to villa page

**Decision**: The success screen CTA button links to `/villa` using the existing `Link` component from `@/i18n/navigation`.

**Rationale**: The villa page is the main content page. Users who just sent an enquiry about availability are likely interested in learning more about the property. This keeps them engaged on the site.

## Risks / Trade-offs

- [Form state persists on navigation back] → Not a real issue since the component remounts on navigation. If user navigates back to `/contact`, they get a fresh form.
- [Success screen height may differ from form height] → Accept this; success screen should be vertically centered within its container with enough padding to feel intentional.
