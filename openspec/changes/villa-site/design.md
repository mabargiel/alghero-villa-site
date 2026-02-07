## Context

We are building a premium, photo-led rental website for Villa Monte Calvia with a tight MVP timeline and strong emphasis on visual storytelling. Content exists (Polish copy and large image sets), but there is no site and no way for admins to manage gallery images. The MVP must feel elegant yet warm and nature-forward, perform well on mobile, and convert visitors into inquiries from families and groups.

Constraints and choices confirmed during discovery:
- Next.js App Router (latest)
- Sanity headless CMS for gallery only
- Masonry gallery with a premium lightbox
- Static hero image with motion overlay
- Rich scroll animations with respect for reduced motion
- Vercel hosting for low-ops, low-cost deployment

## Goals / Non-Goals

**Goals:**
- Deliver a three-page brochure site (Home, Gallery, Contact) that feels premium, warm, and nature-forward with rich motion.
- Implement CMS-backed gallery management (add/remove/reorder images with alt text).
- Provide a premium lightbox with smooth transitions and keyboard/swipe support.
- Maintain performance, accessibility, and SEO baselines for MVP.

**Non-Goals:**
- Multi-language support (beyond Polish in MVP).
- Availability calendar or booking engine integration.
- CMS management of general site content beyond the gallery.
- Advanced analytics or personalization.

## Decisions

- **Framework: Next.js App Router (latest)**  
  Chosen for performance, SEO, routing, and image optimization. App Router enables server components for minimal client JS while still supporting client-only lightbox and motion where needed.
  - *Alternative:* Astro. Rejected because the site needs richer client-side interactivity and future expansion.

- **CMS: Sanity for gallery-only content**  
  Sanity offers a strong media pipeline, image CDN, and an admin-friendly UI. Keeping CMS scope limited to the gallery reduces complexity and risk while still enabling image updates.
  - *Alternative:* Contentful or self-hosted Strapi. Rejected due to either tighter free-tier limits or higher ops burden.

- **Gallery layout: Masonry with stable ordering**  
  Use a masonry layout that preserves a curated order from the CMS while minimizing layout shift. Spacing and layout should emphasize a calm, nature-forward aesthetic while keeping DOM order consistent for accessibility and SEO.
  - *Alternative:* Simple grid or justified rows. Rejected for being less premium visually.

- **Lightbox: Premium viewer as client component**  
  A dedicated client component handles image navigation, transitions, and accessibility (focus trap, keyboard). This isolates interactive behavior without forcing the whole page to be client-rendered.
  - *Alternative:* Off-the-shelf gallery plugins with heavy JS. Rejected for performance and design rigidity.

- **Motion: Framer Motion + intersection triggers**  
  Rich but restrained scroll animations for sections, with `prefers-reduced-motion` support. This balances a premium, natural feel with performance.
  - *Alternative:* GSAP. Rejected for heavier footprint and complexity.

- **Contact form: Serverless email delivery**  
  Use a serverless route to send inquiries via a provider (Resend/SendGrid), with basic validation and spam protection.
  - *Alternative:* Third-party form backend. Rejected to keep branding and UX consistent.

- **Hosting: Vercel**  
  Low ops, tight Next.js integration, CDN + image optimization built-in.
  - *Alternative:* Azure Static Web Apps. Rejected for higher setup overhead vs MVP speed.

- **Code quality tooling: ESLint, Prettier, Stylelint (latest)**  
  Use current stable versions and recommended configs to enforce consistent code style across JS/TS, formatting, and styles. This keeps collaboration clean and reduces review friction.
  - *Alternative:* Rely on defaults only. Rejected due to inconsistent styling and harder maintenance.

## Risks / Trade-offs

- **[Performance risk]** Rich motion + large imagery can hurt LCP → Use a single hero image, preload LCP asset, and keep motion minimal above the fold.
- **[Layout shift]** Masonry can reflow on load → Preserve aspect ratios from Sanity metadata and reserve space.
- **[Accessibility]** Lightbox complexity (focus, keyboard, aria) → Implement focus trapping, keyboard shortcuts, and ARIA roles from day one.
- **[CMS dependency]** Gallery availability depends on Sanity uptime → Cache responses and configure ISR revalidation to reduce runtime reliance.
- **[Spam]** Contact form could attract bots → Add honeypot and basic rate limiting.

## Migration Plan

- Create Sanity project and configure gallery schema.
- Build Next.js App Router site with CMS integration and deploy to Vercel.
- Set environment variables (Sanity credentials, email provider).
- Connect domain and verify SEO metadata.
- Rollback strategy: revert to previous deployment if needed (Vercel rollback).

## Open Questions

- Final choice of email provider (Resend vs SendGrid).
- Exact masonry implementation approach/library to guarantee ordering + minimal layout shift.
- Final hero image selection and cropping for desktop/mobile.
- Whether to include captions in the lightbox for MVP.
