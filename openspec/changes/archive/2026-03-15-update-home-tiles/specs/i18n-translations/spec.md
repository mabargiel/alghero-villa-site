## ADDED Requirements

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
