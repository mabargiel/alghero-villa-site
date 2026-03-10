## 1. CMS schema and content

- [x] 1.1 Add `hero` document type with images, mobileImage, and videoUrl
- [x] 1.2 Add `homeSection` document type with sectionKey and image+alt text
- [x] 1.3 Update `gallery` schema to remove hero images
- [x] 1.4 Deploy schema updates and create/publish hero + section docs
- [x] 1.5 Add `miniGallery` document type with images
- [x] 1.6 Update gallery/mini-gallery to support multi-select image uploads

## 2. Data fetching and media mapping

- [x] 2.1 Add new Sanity queries for hero and homeSection documents
- [x] 2.2 Update Home page to map sectionKey images to the four sections
- [x] 2.3 Update hero rendering to use desktop video or fallback images
- [x] 2.4 Ensure gallery page uses only gallery images
- [x] 2.5 Add mini gallery query and render full-bleed row
- [x] 2.6 Adjust gallery/mini-gallery queries for image-only arrays

## 3. UI polish and animations

- [x] 3.1 Replace placeholders with real image components and responsive sizing
- [x] 3.2 Add scroll-reveal animations using IO + CSS transitions
- [x] 3.3 Add hover micro-interactions for cards and CTAs
- [x] 3.4 Add reduced-motion fallbacks
- [x] 3.5 Improve contrast for footer and CTA backgrounds

## 4. Media prep and verification

- [x] 4.1 Prepare hero/section images from the provided source set
- [x] 4.2 Verify desktop video playback and mobile static fallback
- [x] 4.3 Validate performance (no scroll lock, no hydration delay)
