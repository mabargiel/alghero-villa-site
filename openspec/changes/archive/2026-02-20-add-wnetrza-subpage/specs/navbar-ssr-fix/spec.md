## MODIFIED Requirements

### Requirement: Navbar styling driven by CSS custom properties

The navbar SHALL derive all home/subpage visual styling from CSS custom properties defined in `globals.css`. The `:root` block SHALL define subpage defaults. An `html.is-home` selector SHALL override these variables with hero-mode values.

The following CSS custom properties SHALL be defined:
- `--nav-text`, `--nav-text-muted`, `--nav-text-hover`, `--nav-active` (text colors)
- `--nav-logo-bg`, `--nav-logo-shadow` (logo appearance)
- `--nav-border`, `--nav-hamburger` (button/icon colors)
- `--nav-mobile-bg`, `--nav-mobile-text`, `--nav-mobile-border` (mobile nav)
- `--nav-underline` (active link indicator)

The navigation items SHALL be, in order: Home, Obiekt (`/villa`), Okolica (`/location`), Galeria (`/gallery`), Kontakt (`/contact`).

#### Scenario: Home page renders hero-mode navbar

- **WHEN** the `<html>` element has the `is-home` class
- **THEN** the navbar text, logo, icons, and mobile menu SHALL use light/white color values suitable for display over a dark hero image

#### Scenario: Subpage renders standard navbar

- **WHEN** the `<html>` element does NOT have the `is-home` class
- **THEN** the navbar text, logo, icons, and mobile menu SHALL use dark brand color values suitable for display over a light background

#### Scenario: Navigation items display in correct order

- **WHEN** the navbar renders on any page
- **THEN** the navigation items appear in order: Home, Obiekt, Okolica, Galeria, Kontakt
