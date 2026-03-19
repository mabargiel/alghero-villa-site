## 1. Translations

- [x] 1.1 Add `successTitle`, `successMessage`, `successEmailNote`, `successCta` keys to `contact` namespace in `app/messages/en.json`
- [x] 1.2 Add the same keys to `app/messages/it.json`
- [x] 1.3 Add the same keys to `app/messages/pl.json`
- [x] 1.4 Add the same keys to `app/messages/es.json`
- [x] 1.5 Add the same keys to `app/messages/fr.json`
- [x] 1.6 Add the same keys to `app/messages/de.json`

## 2. Success Screen

- [x] 2.1 In `ContactForm.tsx`, add a success screen view with checkmark SVG icon, heading (`successTitle`), body text (`successMessage`), email note (`successEmailNote`), and CTA link to `/villa` (`successCta`)
- [x] 2.2 Conditionally render the success screen when `state === "success"` instead of the form
- [x] 2.3 Remove the old inline success message `<div>` (keep error message rendering unchanged)
