## 1. Map Screenshot Utility

- [x] 1.1 Create a local Leaflet HTML file (`tools/map-generator.html`) that renders OpenStreetMap tiles centered on the villa's coordinates with appropriate zoom level
- [x] 1.2 Generate the map screenshot and save as a static image asset in `app/public/` (e.g., `map-alghero.jpg`)

## 2. Contact Info Panel Component

- [x] 2.1 Create `ContactInfoPanel` component with the static map section — map image as background, brand-colored SVG pin overlay (centered), and "SPRAWDŹ DOJAZD" CTA button linking to Google Maps directions (new tab)
- [x] 2.2 Add phone number (`tel:` link) and email (`mailto:` link) display below the map
- [x] 2.3 Move the social links (Facebook, Instagram, Google) from the contact page into the info panel

## 3. Contact Page Layout

- [x] 3.1 Restructure `contact/page.tsx` to a two-column grid layout — info panel on left, form on right on `md:+`, stacked (form first, info below) on mobile
- [x] 3.2 Widen page container from `max-w-4xl` to `max-w-6xl` and update header/copy as needed
