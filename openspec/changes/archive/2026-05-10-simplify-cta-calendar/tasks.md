## 1. CTA Translation Updates

- [x] 1.1 Update `checkAvailability` in `app/messages/pl.json` → "Rezerwuj"
- [x] 1.2 Update `checkAvailability` in `app/messages/en.json` → "Book"
- [x] 1.3 Update `checkAvailability` in `app/messages/it.json` → "Prenota"
- [x] 1.4 Update `checkAvailability` in `app/messages/de.json` → "Buchen"
- [x] 1.5 Update `checkAvailability` in `app/messages/fr.json` → "Réserver"
- [x] 1.6 Update `checkAvailability` in `app/messages/es.json` → "Reservar"

## 2. New Translation Keys (all 6 languages)

- [x] 2.1 Add `booked` key to `pricing` namespace in all 6 language files (pl: "Zajęte", en: "Booked", it: "Occupato", de: "Belegt", fr: "Réservé", es: "Reservado")
- [x] 2.2 Add `minNights` key to `pricing` namespace in all 6 language files (pl: "min. 7 nocy", en: "min. 7 nights", it: "min. 7 notti", de: "min. 7 Nächte", fr: "min. 7 nuits", es: "mín. 7 noches")
- [x] 2.3 Add `maxGuests` key to `pricing` namespace in all 6 language files (pl: "max. 12 osób", en: "max. 12 guests", it: "max. 12 ospiti", de: "max. 12 Gäste", fr: "max. 12 personnes", es: "máx. 12 personas")

## 3. AvailabilityCalendar Component

- [x] 3.1 Update `MIN_NIGHTS` constant from 5 to 7
- [x] 3.2 Replace `tierLabels` array (tierLow/tierMid/tierHigh) with price-based labels: format each tier price as `${price}€`
- [x] 3.3 Add "Booked" legend entry after the price tier entries, using `t("booked")` and a grayed-out dot style (`pricing-legend-booked` class or `opacity-40` inline)
- [x] 3.4 Add constraints info row below the legend `<div>`: `<p>` with `t("minNights")` + ` · ` + `t("maxGuests")` in muted small text
