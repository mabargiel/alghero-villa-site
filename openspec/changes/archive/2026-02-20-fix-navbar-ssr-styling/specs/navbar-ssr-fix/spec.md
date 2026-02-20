## ADDED Requirements

### Requirement: Navbar styling driven by CSS custom properties

The navbar SHALL derive all home/subpage visual styling from CSS custom properties defined in `globals.css`. The `:root` block SHALL define subpage defaults. An `html.is-home` selector SHALL override these variables with hero-mode values.

The following CSS custom properties SHALL be defined:
- `--nav-text`, `--nav-text-muted`, `--nav-text-hover`, `--nav-active` (text colors)
- `--nav-logo-bg`, `--nav-logo-shadow` (logo appearance)
- `--nav-border`, `--nav-hamburger` (button/icon colors)
- `--nav-mobile-bg`, `--nav-mobile-text`, `--nav-mobile-border` (mobile nav)
- `--nav-underline` (active link indicator)

#### Scenario: Home page renders hero-mode navbar

- **WHEN** the `<html>` element has the `is-home` class
- **THEN** the navbar text, logo, icons, and mobile menu SHALL use light/white color values suitable for display over a dark hero image

#### Scenario: Subpage renders standard navbar

- **WHEN** the `<html>` element does NOT have the `is-home` class
- **THEN** the navbar text, logo, icons, and mobile menu SHALL use dark brand color values suitable for display over a light background

### Requirement: Inline script sets initial navbar mode before first paint

The root layout SHALL include a blocking inline `<script>` as the first child of `<body>`. The script SHALL read `window.location.pathname` and add the `is-home` class to `document.documentElement` if the pathname is `"/"`.

#### Scenario: Initial load on home page

- **WHEN** a user navigates directly to the home page URL
- **THEN** the `is-home` class SHALL be present on `<html>` before the browser paints the navbar, resulting in hero-mode styling with zero visible flash

#### Scenario: Initial load on a subpage

- **WHEN** a user navigates directly to a subpage URL (e.g., `/gallery`, `/contact`)
- **THEN** the `is-home` class SHALL NOT be present on `<html>`, resulting in standard subpage styling

### Requirement: Client-side navigation syncs navbar mode

The `TopNav` component SHALL use a `useEffect` that toggles the `is-home` class on `document.documentElement` based on the current pathname from `usePathname()`.

#### Scenario: Navigate from home to subpage

- **WHEN** a user performs client-side navigation from `/` to a subpage
- **THEN** the `is-home` class SHALL be removed from `<html>` and the navbar SHALL switch to subpage styling

#### Scenario: Navigate from subpage to home

- **WHEN** a user performs client-side navigation from a subpage to `/`
- **THEN** the `is-home` class SHALL be added to `<html>` and the navbar SHALL switch to hero-mode styling

### Requirement: TopNav has no isHome conditional branching in JSX

The `TopNav` component SHALL NOT use an `isHome` variable or equivalent boolean to conditionally select CSS classes in JSX. All navbar styling differences between home and subpage modes SHALL be expressed through CSS custom properties only.

#### Scenario: Component uses CSS variable references

- **WHEN** inspecting the TopNav component source
- **THEN** all color/appearance classes SHALL reference CSS custom properties (e.g., `text-[var(--nav-text)]`) rather than ternary expressions switching between literal color values
