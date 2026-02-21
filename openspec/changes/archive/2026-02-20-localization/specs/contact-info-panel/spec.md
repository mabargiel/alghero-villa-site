## MODIFIED Requirements

### Requirement: Map CTA button links to Google Maps directions
The static map component SHALL include a CTA button with a translated label overlaid on the map. Clicking the button SHALL open Google Maps directions to the villa in a new tab.

#### Scenario: CTA button in English
- **WHEN** the contact page loads in English
- **THEN** the map CTA button displays "Get directions"

#### Scenario: CTA button in Italian
- **WHEN** the contact page loads in Italian
- **THEN** the map CTA button displays "Come raggiungerci"

## ADDED Requirements

### Requirement: Contact page header uses translations
The contact page subpage header (eyebrow, title, description) SHALL come from the translation system.

#### Scenario: Contact header in Spanish
- **WHEN** the contact page renders in Spanish
- **THEN** the eyebrow displays "Contacto", title "Consulta disponibilidad", and description in Spanish

### Requirement: Contact form labels and messages use translations
All form labels (Name, Email, Phone), button text (Send / Sending...), success message, and error messages SHALL come from the translation system.

#### Scenario: Form labels in Italian
- **WHEN** the contact form renders in Italian
- **THEN** labels display as "Nome", "Email", "Telefono" and the button says "Invia richiesta"

#### Scenario: Success message in Polish
- **WHEN** the form submission succeeds in Polish locale
- **THEN** the success message displays "Dziękujemy! Odezwiemy się wkrótce."

#### Scenario: Error message in English
- **WHEN** the form submission fails in English locale
- **THEN** the error message displays "An error occurred while sending."

### Requirement: Map alt text uses translations
The map image alt text SHALL come from the translation system.

#### Scenario: Map alt text in Italian
- **WHEN** the contact page renders in Italian
- **THEN** the map image has alt text "Villa Monte Calvia — posizione sulla mappa"

### Requirement: Gallery page uses translations
The gallery page subpage header and empty-state fallback message SHALL come from the translation system.

#### Scenario: Gallery header in English
- **WHEN** the gallery page renders in English
- **THEN** the eyebrow displays "Gallery", title "Villa Monte Calvia", and description in English

#### Scenario: Gallery empty state in Italian
- **WHEN** the gallery has no images and renders in Italian
- **THEN** the fallback message displays in Italian
