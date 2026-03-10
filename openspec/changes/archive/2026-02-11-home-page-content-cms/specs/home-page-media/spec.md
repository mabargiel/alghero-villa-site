## ADDED Requirements

### Requirement: Desktop hero video support

The system SHALL support an optional desktop hero video URL that replaces rotating hero images when present.

#### Scenario: Desktop uses video when configured

- **WHEN** a hero video URL is provided in CMS and the viewport is desktop
- **THEN** the Home hero renders the video instead of the rotating images

### Requirement: Mobile/static fallback image

The system SHALL require a mobile hero image that is always used on mobile and acts as the video poster/fallback.

#### Scenario: Mobile uses static image

- **WHEN** the viewport is mobile
- **THEN** the Home hero renders the static mobile image and does not render the video

#### Scenario: Video poster uses mobile image

- **WHEN** the hero video is rendered on desktop
- **THEN** the video poster uses the mobile hero image

### Requirement: Hero image rotation fallback

The system SHALL render a rotating set of hero images when no hero video URL is configured.

#### Scenario: Desktop uses rotating images when video missing

- **WHEN** no hero video URL is configured and hero images are present
- **THEN** the Home hero rotates through the hero images on desktop
