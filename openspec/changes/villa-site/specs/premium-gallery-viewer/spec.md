## ADDED Requirements

### Requirement: Masonry gallery layout
The system SHALL display gallery images in a responsive masonry layout with columns that adapt to viewport width.

#### Scenario: Responsive columns
- **WHEN** the viewport width changes across breakpoints
- **THEN** the masonry layout updates the number of columns accordingly

### Requirement: Layout stability
The system SHALL reserve space for images using their aspect ratios to minimize layout shift during loading.

#### Scenario: Image load without shift
- **WHEN** gallery images load asynchronously
- **THEN** the layout remains stable without visible jumps

### Requirement: Lightbox open and close
The system SHALL open a full-screen lightbox when a gallery image is selected and allow closing via Esc key, close control, or outside click.

#### Scenario: Open and close lightbox
- **WHEN** a user selects an image
- **THEN** the lightbox opens with that image and can be closed via Esc or the close control

### Requirement: Lightbox navigation
The system SHALL support next/previous navigation via keyboard arrows, on-screen controls, and swipe gestures on touch devices.

#### Scenario: Navigate between images
- **WHEN** a user presses the right arrow or swipes left
- **THEN** the next image is displayed in the lightbox

### Requirement: Premium lightbox transitions
The system SHALL use smooth cross-fade transitions between images in the lightbox.

#### Scenario: Transition between images
- **WHEN** a user navigates to a different image
- **THEN** the image change uses a cross-fade transition

### Requirement: Optional captions
The system SHALL display a caption when a gallery image includes a title or caption field.

#### Scenario: Caption rendering
- **WHEN** the current image has a title or caption
- **THEN** the lightbox shows the caption below the image
