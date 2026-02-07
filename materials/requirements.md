# Requirements — Villa Monte Calvia (Alghero) rental website

## Product goal
Create a beautiful, modern, fast website that presents a **large premium house in Alghero** with a **massive, beautiful private garden** for rent, and converts visitors into inquiries/leads.

The website should feel like a premium hospitality brand (inspiration links below), with a strong hero section (video or image), long-scroll storytelling, and a photo-first experience.

## Target audience
- Families and groups of friends looking for a high-end villa base near Alghero
- Guests who decide primarily based on visuals (garden/outdoor living + interiors)
- International visitors (at minimum: Polish + English; optional Italian later)

## Content you already have
- **Polish description**: `materials/description-polish`
- **Media (images + video)** in `materials/` including:
  - A hero-ready video: `materials/widok z CATLUNYA.MOV`
  - Large image sets by area (exterior, living room, bedrooms, beaches, sunsets)

## MVP scope (must ship in ~2 weeks)
### Pages / information architecture
1. **Home (long scroll)**
   - Hero (video preferred, with image fallback) + clear headline + primary CTA (“Check availability / Contact”)
   - Key highlights (capacity, bedrooms, bathrooms, garden size, privacy, location)
   - “The villa” section (short story + differentiators)
   - “Garden & outdoor living” section (this is a core selling point)
   - “Interiors” teaser (link to Gallery)
   - “Location” teaser (map embed + key distances)
   - “Amenities” (icons + bullets)
   - CTA band + contact teaser
2. **Gallery**
   - Masonry/grid gallery with filtering (at least basic categories: Exterior/Garden, Living room, Bedrooms, Bathrooms, Surroundings/Alghero/Beach)
   - Fullscreen lightbox with keyboard navigation
3. **Contact**
   - Inquiry form (Name, Email, Phone, Message, optional dates + number of guests)
   - Sends email to configured address(es)
   - Success + failure states, spam protection, validation

### Non-content requirements (MVP)
- **Mobile-first responsive design** (excellent experience on phones)
- **Performance**: optimized images, lazy-loading, responsive sizes, caching
- **Accessibility**: semantic HTML, keyboard nav, contrast, focus states, alt text
- **SEO**: basic metadata, OpenGraph, sitemap, robots, clean URLs
- **Analytics**: simple event tracking for CTA + form submit (optional in MVP, recommended)
- **GDPR**: privacy policy + cookie consent if analytics uses cookies (can be minimal)

## Post-MVP (nice-to-have / phase 2)
- Availability calendar (even if “request to book” remains manual)
- Multi-language: add English (and optionally Italian) via i18n with CMS-managed translations
- “Rooms” or “Details” page with per-room photo sets + amenities
- FAQ page (parking, check-in/out, rules, pets, pool/no pool, etc.)
- Reviews/testimonials section
- “Book now” integration (Airbnb/Booking link or direct booking engine)
- Newsletter / lead magnet

## Design direction
### Visual & UX principles
- Premium, calm, Mediterranean feel (white space, elegant typography, warm neutrals, olive/terracotta accents)
- Photo-led storytelling; minimal UI chrome; smooth section transitions
- Clear CTAs at least: hero, mid-page, footer
- Keep forms short; add optional details without blocking submission

### Inspiration
Use as inspiration (not copy):
- `https://villadune.pl/`
- `https://rezydencjawierzchlesie.pl/`
- `https://villagorsky.pl/`
- `https://zdalniezlasu.pl/`
- `https://lhapartamenty.pl/`

## Functional requirements (detailed)
### Gallery
- Masonry/grid layout with responsive columns
- Lightbox:
  - Next/prev arrows + swipe on mobile
  - Keyboard navigation (← →, Esc)
  - Captions (optional) + alt text
- Categories/tags:
  - At minimum: Exterior/Garden, Living room, Bedrooms, Bathrooms, Location/Beach

### Contact form
- Fields:
  - Required: name, email
  - Optional but recommended: phone, message, dates (from/to), number of guests
- Validation:
  - Email format, required fields, sensible max lengths
- Anti-spam:
  - Honeypot + rate limiting; optionally CAPTCHA (only if spam becomes an issue)
- Delivery:
  - Reliable email sending via provider (SendGrid/Mailgun/AWS SES/etc.)
  - Store submissions (optional) in CMS or lightweight DB for audit

### Location
- Map embed and/or static map image
- Distances/time to: airport (~15 min), Alghero old town/port, beaches, shops/restaurants

## Headless CMS requirements
### Admin needs
- Add/change/remove photos, set categories, ordering, and hero media selection
- Edit homepage sections (headlines, paragraphs, highlights, amenities list)
- Manage translations (if i18n enabled)
- Edit contact details (emails, phone, WhatsApp link)

### Suggested content model (CMS)
- **Site settings**
  - brand name, logo, primary/secondary CTA labels, contact email(s), phone, WhatsApp
  - social links, address/coordinates
- **Home sections**
  - hero: title/subtitle, hero media (slideshow now; video later) + CTA
  - highlights (array), amenities (array), location distances (array)
- **Gallery**
  - images: asset + category + alt text + optional caption

## Hero media requirements (MVP: slideshow with motion)
The current `.MOV` in `materials/` is temporary and **should not be used** for the MVP hero.

### Source assets
- Desktop hero images: `materials/dom z zew -najlepsze/`
- Mobile hero images (preferred on phones): `materials/dom z zew -najlepsze/na telefon/`

### Behavior
- Use a **slideshow** (3–7 curated images) with a subtle **Ken Burns effect** (slow zoom/pan) to simulate movement.
- Include cross-fade transitions; avoid aggressive motion.
- Provide controls only if needed (optional): pause/play.
- Respect reduced motion:
  - If user prefers reduced motion, disable zoom/pan and optionally stop auto-advance.

### Performance
- Do not block initial render: show the first hero image immediately, then preload the next 1–2.
- Use responsive images (multiple sizes) + modern formats where possible.
- Keep Largest Contentful Paint low; hero must degrade gracefully on low-power devices.

## Hero media requirements (phase 2: real villa video)
Once you record the real hero footage, swap the hero to video:
- Use MP4/H.264 (optional WebM) + poster image.
- Autoplay rules: muted + loop + playsinline.

## Technical implementation preferences
### Code quality
- Strict linting/formatting (prettier + eslint, consistent imports)
- Type safety where possible (TypeScript recommended)
- Clear separation: CMS vs website (separate project or clear boundary)

### CI/CD
- Automated build + lint + typecheck on PR/main
- Deploy previews for PRs (recommended)
- Production deploy on main

### Hosting
- Static + serverless compatible (e.g., Vercel/Netlify) is fine.
- Ensure media pipeline is compatible with chosen hosting/CDN.

## Acceptance criteria (MVP)
- Home page is a polished long-scroll landing page with strong hero (video or image) and multiple CTAs.
- Gallery page loads fast, is responsive, and supports lightbox.
- Contact form reliably delivers emails and shows clear success/error states.
- Core pages look great on mobile and desktop and pass basic SEO/performance checks.

## Constraints
- Tight deadline: MVP must be ready within ~2 weeks.