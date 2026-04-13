## 1. TypeScript Setup

- [x] 1.1 Add a global type declaration for `fbq` (e.g. `app/src/types/fbq.d.ts`) declaring `fbq` on `Window` and as a global function

## 2. Event Tracking

- [x] 2.1 Add `useEffect` in `ContactForm.tsx` to fire `fbq('track', 'ViewContent', { content_name: 'Contact Page' })` on mount, guarded by `typeof fbq !== 'undefined'`
- [x] 2.2 Add `fbq('track', 'Contact')` call in the success path of `handleSubmit` in `ContactForm.tsx`, guarded by `typeof fbq !== 'undefined'`

## 3. Verification

- [x] 3.1 Run `tsc --noEmit` to confirm no type errors
