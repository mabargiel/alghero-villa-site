## ADDED Requirements

### Requirement: Contact form new field translation keys
All 6 locale files SHALL include translation keys for the new contact form fields: arrival date label, departure date label, guests label (with "including children" clarification), and message label/placeholder.

#### Scenario: Italian locale has new contact keys
- **WHEN** the contact form renders with locale `it`
- **THEN** all new field labels display in Italian

### Requirement: Confirmation email translation keys
All 6 locale files SHALL include a `confirmationEmail` namespace with keys for: greeting (with `{firstName}` interpolation), thank-you body text, follow-up promise text, and contact section header.

#### Scenario: German confirmation email uses translations
- **WHEN** a visitor submits from `/de/contact`
- **THEN** the confirmation email uses German translations from the `confirmationEmail` namespace

### Requirement: Owner notification email translation keys
All 6 locale files SHALL include an `ownerEmail` namespace with keys for the email subject line (with `{firstName}` interpolation) and section labels (contact details, stay details, message).

#### Scenario: Owner email subject includes visitor name
- **WHEN** visitor "Marco" submits an enquiry
- **THEN** the owner email subject uses the `ownerEmail.subject` key interpolated with "Marco"

### Requirement: Interiors tile translation keys
All 6 locale files SHALL include `areaInteriorsTitle` and `areaInteriorsDescription` keys in the `home` namespace. Values:
- **pl**: "Wnętrza" / "Sypialnie, salon i kuchnia — przestronne wnętrza zaprojektowane z myślą o komforcie i wspólnych chwilach."
- **en**: "Interiors" / "Bedrooms, living room, and kitchen — spacious interiors designed for comfort and shared moments."
- **it**: "Interni" / "Camere, soggiorno e cucina — interni spaziosi pensati per il comfort e i momenti condivisi."
- **es**: "Interiores" / "Habitaciones, salón y cocina — interiores amplios diseñados para el confort y los momentos compartidos."
- **fr**: "Intérieurs" / "Chambres, salon et cuisine — des intérieurs spacieux conçus pour le confort et les moments partagés."
- **de**: "Innenräume" / "Schlafzimmer, Wohnzimmer und Küche — geräumige Innenräume für Komfort und gemeinsame Momente."

#### Scenario: Polish locale displays Interiors tile
- **WHEN** the home page renders with locale `pl`
- **THEN** the first tile displays "Wnętrza" as title

### Requirement: Verandas tile translation keys
All 6 locale files SHALL include `areaVerandasTitle` and `areaVerandasDescription` keys in the `home` namespace. Values:
- **pl**: "Werandy" / "Zadaszone tarasy z letnią kuchnią i jadalnią — gotowanie i wspólne posiłki na świeżym powietrzu."
- **en**: "Verandas" / "Covered terraces with a summer kitchen and dining area — cooking and shared meals in the open air."
- **it**: "Verande" / "Terrazze coperte con cucina estiva e zona pranzo — cucinare e condividere pasti all'aria aperta."
- **es**: "Porches" / "Terrazas cubiertas con cocina de verano y comedor — cocinar y compartir comidas al aire libre."
- **fr**: "Vérandas" / "Terrasses couvertes avec cuisine d'été et coin repas — cuisiner et partager des repas en plein air."
- **de**: "Veranden" / "Überdachte Terrassen mit Sommerküche und Essbereich — Kochen und gemeinsame Mahlzeiten im Freien."

#### Scenario: English locale displays Verandas tile
- **WHEN** the home page renders with locale `en`
- **THEN** the second tile displays "Verandas" as title

### Requirement: Sports field tile translation keys
All 6 locale files SHALL include `areaSportsFieldTitle` and `areaSportsFieldDescription` keys in the `home` namespace. Values:
- **pl**: "Boisko" / "Prywatne boisko do siatkówki i piłki nożnej — aktywny wypoczynek dla całej rodziny."
- **en**: "Sports field" / "A private volleyball and football pitch — active leisure for the whole family."
- **it**: "Campo sportivo" / "Un campo privato per pallavolo e calcio — svago attivo per tutta la famiglia."
- **es**: "Campo deportivo" / "Un campo privado de voleibol y fútbol — ocio activo para toda la familia."
- **fr**: "Terrain de sport" / "Un terrain privé de volley-ball et de football — loisirs actifs pour toute la famille."
- **de**: "Sportplatz" / "Ein privater Volleyball- und Fußballplatz — aktive Erholung für die ganze Familie."

#### Scenario: Italian locale displays Sports field tile
- **WHEN** the home page renders with locale `it`
- **THEN** the fourth tile displays "Campo sportivo" as title

### Requirement: Success screen translation keys
All 6 locale files SHALL include translation keys in the `contact` namespace for the success screen: `successTitle` (thank-you heading), `successMessage` (we will contact you shortly), `successEmailNote` (confirmation email sent to inbox), and `successCta` (explore the villa button label).

#### Scenario: English locale has success screen keys
- **WHEN** the success screen renders with locale `en`
- **THEN** it displays "Thank you!" as heading, "We will get back to you shortly." as message, "A confirmation email has been sent to your inbox." as email note, and "Explore the villa" as the CTA button

#### Scenario: Italian locale has success screen keys
- **WHEN** the success screen renders with locale `it`
- **THEN** all success screen texts display in Italian

#### Scenario: All 6 locales have success screen keys
- **WHEN** any of the 6 supported locales (en, it, pl, es, fr, de) is active
- **THEN** the success screen renders fully translated content with no missing keys

## REMOVED Requirements

### Requirement: Bedrooms tile translation keys
**Reason**: Bedrooms tile merged into the new Interiors tile
**Migration**: Replace `areaBedroomsTitle` / `areaBedroomsDescription` with `areaInteriorsTitle` / `areaInteriorsDescription`

### Requirement: Salon tile translation keys
**Reason**: Salon tile merged into the new Interiors tile
**Migration**: Replace `areaSalonTitle` / `areaSalonDescription` with `areaInteriorsTitle` / `areaInteriorsDescription`

### Requirement: Veranda (singular) tile translation keys
**Reason**: Renamed to plural "Verandas" with new description
**Migration**: Replace `areaVerandaTitle` / `areaVerandaDescription` with `areaVerandasTitle` / `areaVerandasDescription`
