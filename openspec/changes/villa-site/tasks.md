## 1. Project setup and foundations

- [x] 1.1 Initialize Next.js App Router project with TypeScript and linting
- [x] 1.2 Configure global layout, metadata, and base typography tokens
- [x] 1.3 Add Tailwind or SCSS setup and base theme variables
- [x] 1.4 Add ESLint, Prettier, and Stylelint with recommended configs

## 2. Sanity CMS (gallery only)

- [x] 2.1 Create Sanity project and dataset for gallery
- [x] 2.2 Define gallery image schema (asset, alt text, optional title, order)
- [x] 2.3 Add GROQ query and client configuration in Next.js
- [x] 2.4 Implement ISR revalidation strategy for gallery updates

## 3. Core pages and content structure

- [x] 3.1 Build Home page section structure per spec (Hero → Highlights → Story → Garden → Interiors → Location → Amenities → CTA)
- [x] 3.2 Map Polish description into section copy and refine for web readability
- [x] 3.3 Assign section imagery from materials (exterior/garden/interiors/location)
- [x] 3.4 Build Gallery page server component with masonry grid shell
- [x] 3.5 Build Contact page with form UI and validation states

## 4. Gallery and premium lightbox

- [x] 4.1 Render CMS gallery data in masonry grid with responsive columns
- [x] 4.2 Reserve space using aspect ratios to avoid layout shift
- [x] 4.3 Implement premium lightbox (open/close, cross-fade, keyboard, swipe)
- [x] 4.4 Add captions when title/caption exists

## 5. Motion and polish

- [x] 5.1 Implement hero motion overlay with reduced-motion fallback
- [x] 5.2 Add section reveal animations with Framer Motion and intersection triggers
- [x] 5.3 Tune spacing, typography scale, and natural color palette

## 6. Contact form delivery

- [x] 6.1 Add serverless route for email delivery (Resend/SendGrid)
- [x] 6.2 Implement honeypot and basic rate limiting
- [x] 6.3 Add success/error messaging and confirmation UX

## 7. Performance, accessibility, SEO

- [x] 7.1 Optimize hero and gallery images with responsive sizes
- [x] 7.2 Add alt text usage, focus states, and keyboard support
- [x] 7.3 Add sitemap/robots and OpenGraph metadata

## 8. Deployment

- [x] 8.1 Configure environment variables for CMS and email provider
- [x] 8.2 Deploy to Vercel and verify builds
- [x] 8.3 Smoke test pages on mobile and desktop
