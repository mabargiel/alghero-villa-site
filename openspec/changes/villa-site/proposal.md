## Why

We need a premium, modern rental website for Villa Monte Calvia that converts visitors into inquiries within a tight MVP timeline. The current materials are rich (photos, Polish copy) but there is no web experience or gallery management, limiting visibility and lead capture for families seeking a warm, nature-forward Mediterranean retreat.

## What Changes

- Deliver a three-page brochure site (Home long-scroll, Gallery, Contact) with premium yet warm, nature-first visual storytelling and rich scroll motion.
- Implement a CMS-backed gallery so admins can add/remove images without code changes.
- Add a high-end lightbox experience and masonry gallery layout optimized for performance.
- Provide an inquiry contact form with validation and reliable email delivery.
- Ship SEO/accessibility/performance baseline for the MVP.
- Use latest stable versions of key libraries and tooling (Next.js, CMS SDK, linting/formatting).

## Capabilities

### New Capabilities
- `villa-site-core`: Brochure website with long-scroll home, gallery, and contact.
- `gallery-management`: CMS-managed image gallery (Sanity) with ordering and alt text.
- `premium-gallery-viewer`: Masonry gallery UI with a premium lightbox experience.
- `contact-inquiry`: Inquiry form with validation, spam protection, and email delivery.

### Modified Capabilities
- None.

## Impact

- New Next.js App Router project with server/client components and motion library.
- Integrations with Sanity (CMS) and an email provider (e.g., Resend/SendGrid).
- Hosting on Vercel (recommended) with image optimization and CDN delivery.
