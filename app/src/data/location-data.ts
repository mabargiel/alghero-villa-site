export const LOCATION_TAGS = {
  sandy: { icon: "sandy", translationKey: "tagSandy" },
  rocks: { icon: "rocks", translationKey: "tagRocks" },
  seaweed: { icon: "seaweed", translationKey: "tagSeaweed" },
  turquoise: { icon: "turquoise", translationKey: "tagTurquoise" },
  "kid-friendly": { icon: "kid-friendly", translationKey: "tagKidFriendly" },
  "beach-services": {
    icon: "beach-services",
    translationKey: "tagBeachServices",
  },
  bars: { icon: "bars", translationKey: "tagBars" },
  snorkeling: { icon: "snorkeling", translationKey: "tagSnorkeling" },
  waves: { icon: "waves", translationKey: "tagWaves" },
  "rope-park": { icon: "rope-park", translationKey: "tagRopePark" },
  "diving-center": { icon: "diving-center", translationKey: "tagDivingCenter" },
} as const;

export type LocationTag = keyof typeof LOCATION_TAGS;

export type LocationCategory =
  | "beaches"
  | "towns"
  | "archaeology"
  | "nature"
  | "dayTrips"
  | "diving";

export type BeachSubgroup = "alghero" | "south" | "nearby";

export type LocationItem = {
  id: string;
  /** Fallback name (Italian/original). Components should use t(`loc_${id}_name`). */
  name: string;
  driveMinutes: number;
  tags?: LocationTag[];
  coords: [lat: number, lng: number];
  googleMapsUrl: string;
  featured?: boolean;
  category: LocationCategory;
  subgroup?: BeachSubgroup;
};

// Villa coordinates — origin for Google Maps directions links
export const VILLA_COORDS: [number, number] = [
  40.582009416971765, 8.369357493735524,
];

function directionsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/dir/${VILLA_COORDS[0]},${VILLA_COORDS[1]}/${lat},${lng}`;
}

export const beaches: LocationItem[] = [
  // --- Alghero ---
  {
    id: "lido-di-alghero",
    name: "Lido di Alghero",
    driveMinutes: 10,
    tags: ["sandy", "seaweed", "kid-friendly", "beach-services", "bars"],
    coords: [40.569355, 8.318067],
    googleMapsUrl: directionsUrl(40.569355, 8.318067),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "san-giovanni",
    name: "Spiaggia di San Giovanni",
    driveMinutes: 10,
    tags: ["sandy", "kid-friendly", "beach-services", "bars"],
    coords: [40.5736, 8.3167],
    googleMapsUrl: directionsUrl(40.5736, 8.3167),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "baia-dei-venti",
    name: "La Baia dei Venti",
    driveMinutes: 10,
    tags: ["sandy", "kid-friendly", "beach-services", "bars"],
    coords: [40.580525, 8.309997],
    googleMapsUrl: directionsUrl(40.580525, 8.309997),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "maria-pia",
    name: "Spiaggia di Maria Pia",
    driveMinutes: 10,
    tags: ["sandy", "kid-friendly", "beach-services", "bars"],
    coords: [40.586111, 8.306667],
    googleMapsUrl: directionsUrl(40.586111, 8.306667),
    category: "beaches",
    subgroup: "alghero",
    featured: true,
  },
  {
    id: "fertilia",
    name: "Fertilia",
    driveMinutes: 12,
    tags: ["sandy", "seaweed", "kid-friendly", "beach-services", "bars"],
    coords: [40.594652, 8.291099],
    googleMapsUrl: directionsUrl(40.594652, 8.291099),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "punta-negra",
    name: "Punta Negra",
    driveMinutes: 14,
    tags: ["sandy", "rocks", "seaweed"],
    coords: [40.59357, 8.27652],
    googleMapsUrl: directionsUrl(40.59357, 8.27652),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "le-bombarde",
    name: "Le Bombarde",
    driveMinutes: 19,
    tags: ["sandy", "rocks", "turquoise", "kid-friendly", "rope-park", "bars"],
    coords: [40.584444, 8.258056],
    googleMapsUrl: directionsUrl(40.584444, 8.258056),
    category: "beaches",
    subgroup: "alghero",
    featured: true,
  },
  {
    id: "lazzaretto",
    name: "Lazzaretto",
    driveMinutes: 20,
    tags: ["sandy", "rocks", "snorkeling", "turquoise", "bars"],
    coords: [40.5825, 8.246944],
    googleMapsUrl: directionsUrl(40.5825, 8.246944),
    category: "beaches",
    subgroup: "alghero",
    featured: true,
  },
  {
    id: "torre-del-lazzaretto",
    name: "Spiaggia di Torre del Lazzaretto",
    driveMinutes: 20,
    tags: ["rocks"],
    coords: [40.57683, 8.24746],
    googleMapsUrl: directionsUrl(40.57683, 8.24746),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "maristella",
    name: "Spiaggia di Maristella",
    driveMinutes: 20,
    tags: ["sandy"],
    coords: [40.596797, 8.220596],
    googleMapsUrl: directionsUrl(40.596797, 8.220596),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "mugoni",
    name: "Porto Conte / Mugoni",
    driveMinutes: 22,
    tags: [
      "sandy",
      "kid-friendly",
      "beach-services",
      "bars",
      "snorkeling",
      "diving-center",
    ],
    coords: [40.6175, 8.203333],
    googleMapsUrl: directionsUrl(40.6175, 8.203333),
    category: "beaches",
    subgroup: "alghero",
    featured: true,
  },
  {
    id: "tramariglio-beach",
    name: "Tramariglio",
    driveMinutes: 27,
    tags: ["sandy", "rocks", "diving-center"],
    coords: [40.589991, 8.169255],
    googleMapsUrl: directionsUrl(40.589991, 8.169255),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "pischina-salida",
    name: "Pischina Salida",
    driveMinutes: 30,
    tags: ["rocks", "turquoise"],
    coords: [40.58636, 8.16735],
    googleMapsUrl: directionsUrl(40.58636, 8.16735),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "cala-dragunara",
    name: "Cala Dragunara",
    driveMinutes: 30,
    tags: ["rocks", "snorkeling", "turquoise", "bars"],
    coords: [40.5758, 8.1608],
    googleMapsUrl: directionsUrl(40.5758, 8.1608),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "porticciolo",
    name: "Porticciolo",
    driveMinutes: 26,
    tags: ["rocks", "turquoise"],
    coords: [40.6433, 8.1883],
    googleMapsUrl: directionsUrl(40.6433, 8.1883),
    category: "beaches",
    subgroup: "alghero",
  },
  {
    id: "porto-ferro",
    name: "Porto Ferro",
    driveMinutes: 30,
    tags: ["sandy", "waves", "bars"],
    coords: [40.684177, 8.204735],
    googleMapsUrl: directionsUrl(40.684177, 8.204735),
    category: "beaches",
    subgroup: "alghero",
  },
  // --- South coast ---
  {
    id: "calabona",
    name: "Calabona",
    driveMinutes: 14,
    tags: ["sandy", "rocks"],
    coords: [40.546532, 8.3208],
    googleMapsUrl: directionsUrl(40.546532, 8.3208),
    category: "beaches",
    subgroup: "south",
  },
  {
    id: "cala-burantino",
    name: "Cala Burantino",
    driveMinutes: 20,
    tags: ["turquoise", "rocks"],
    coords: [40.508136, 8.339565],
    googleMapsUrl: directionsUrl(40.508136, 8.339565),
    category: "beaches",
    subgroup: "south",
  },
  {
    id: "la-speranza",
    name: "La Speranza",
    driveMinutes: 22,
    tags: ["waves", "sandy"],
    coords: [40.496029, 8.369178],
    googleMapsUrl: directionsUrl(40.496029, 8.369178),
    category: "beaches",
    subgroup: "south",
  },
  // --- Nearby (50+ min) ---
  {
    id: "ezzi-mannu",
    name: "Ezzi Mannu",
    driveMinutes: 50,
    tags: ["sandy", "turquoise"],
    coords: [40.8725, 8.2703],
    googleMapsUrl: directionsUrl(40.8725, 8.2703),
    category: "beaches",
    subgroup: "nearby",
  },
  {
    id: "le-saline",
    name: "Spiaggia Le Saline",
    driveMinutes: 47,
    tags: ["sandy", "turquoise"],
    coords: [40.9067, 8.2356],
    googleMapsUrl: directionsUrl(40.9067, 8.2356),
    category: "beaches",
    subgroup: "nearby",
  },
  {
    id: "la-pelosa",
    name: "La Pelosa",
    driveMinutes: 55,
    tags: ["sandy", "turquoise", "kid-friendly"],
    coords: [40.9661, 8.2089],
    googleMapsUrl: directionsUrl(40.9661, 8.2089),
    category: "beaches",
    subgroup: "nearby",
    featured: true,
  },
];

export const towns: LocationItem[] = [
  {
    id: "alghero",
    name: "Alghero",
    driveMinutes: 15,
    coords: [40.5579, 8.3193],
    googleMapsUrl: directionsUrl(40.5579, 8.3193),
    category: "towns",
  },
  {
    id: "bosa",
    name: "Bosa",
    driveMinutes: 50,
    coords: [40.2952, 8.5037],
    googleMapsUrl: directionsUrl(40.2952, 8.5037),
    category: "towns",
  },
  {
    id: "castelsardo",
    name: "Castelsardo",
    driveMinutes: 60,
    coords: [40.9135, 8.7127],
    googleMapsUrl: directionsUrl(40.9135, 8.7127),
    category: "towns",
  },
  {
    id: "tinnura",
    name: "Tinnura & Orgosolo",
    driveMinutes: 50,
    coords: [40.269293787521136, 8.54836358254349],
    googleMapsUrl: directionsUrl(40.269293787521136, 8.54836358254349),
    category: "towns",
  },
];

export const archaeology: LocationItem[] = [
  {
    id: "nuraghi",
    name: "Nuraghi",
    driveMinutes: 15,
    coords: [40.5951, 8.2428],
    googleMapsUrl: directionsUrl(40.5951, 8.2428),
    category: "archaeology",
  },
  {
    id: "domus-de-janas",
    name: "Domus de Janas",
    driveMinutes: 30,
    coords: [40.6329, 8.3265],
    googleMapsUrl: directionsUrl(40.6329, 8.3265),
    category: "archaeology",
  },
  {
    id: "pozzo-santa-cristina",
    name: "Pozzo Santa Cristina",
    driveMinutes: 90,
    coords: [40.0614, 8.7328],
    googleMapsUrl: directionsUrl(40.0614, 8.7328),
    category: "archaeology",
  },
  {
    id: "piramida",
    name: "Monte d'Accoddi",
    driveMinutes: 30,
    coords: [40.790712, 8.448919],
    googleMapsUrl: directionsUrl(40.790712, 8.448919),
    category: "archaeology",
  },
];

export const nature: LocationItem[] = [
  {
    id: "grotta-di-nettuno",
    name: "Grotta di Nettuno",
    driveMinutes: 35,
    coords: [40.564722, 8.160278],
    googleMapsUrl: directionsUrl(40.564722, 8.160278),
    category: "nature",
    featured: true,
  },
  {
    id: "capo-caccia",
    name: "Capo Caccia",
    driveMinutes: 35,
    coords: [40.5648, 8.1594],
    googleMapsUrl: directionsUrl(40.5648, 8.1594),
    category: "nature",
  },
  {
    id: "grotta-verde",
    name: "Grotta Verde",
    driveMinutes: 35,
    coords: [40.56463, 8.16463],
    googleMapsUrl: directionsUrl(40.56463, 8.16463),
    category: "nature",
  },
  {
    id: "trekking",
    name: "Trekking",
    driveMinutes: 20,
    coords: [40.573208, 8.202472],
    googleMapsUrl: directionsUrl(40.573208, 8.202472),
    category: "nature",
  },
  {
    id: "asinara",
    name: "Asinara",
    driveMinutes: 70,
    coords: [41.055025, 8.279753],
    googleMapsUrl: directionsUrl(41.055025, 8.279753),
    category: "nature",
  },
];

export const dayTrips: LocationItem[] = [
  {
    id: "costa-smeralda",
    name: "Costa Smeralda",
    driveMinutes: 150,
    coords: [41.131898, 9.535365],
    googleMapsUrl: directionsUrl(41.131898, 9.535365),
    category: "dayTrips",
  },
  {
    id: "la-maddalena",
    name: "La Maddalena",
    driveMinutes: 180,
    coords: [41.216942, 9.402571],
    googleMapsUrl: directionsUrl(41.216942, 9.402571),
    category: "dayTrips",
  },
];

export const diving: LocationItem[] = [
  {
    id: "tramariglio-diving",
    name: "Tramariglio",
    driveMinutes: 27,
    coords: [40.5908, 8.169],
    googleMapsUrl: directionsUrl(40.5908, 8.169),
    category: "diving",
  },
  {
    id: "porto-conte-diving",
    name: "Porto Conte",
    driveMinutes: 22,
    coords: [40.594004312896026, 8.204533713733694],
    googleMapsUrl: directionsUrl(40.594004312896026, 8.204533713733694),
    category: "diving",
  },
];

export const allLocations: LocationItem[] = [
  ...beaches,
  ...towns,
  ...archaeology,
  ...nature,
  ...dayTrips,
  ...diving,
];

/** Section IDs used for sticky nav and scroll tracking */
export const SECTION_IDS = {
  beaches: "section-beaches",
  towns: "section-towns",
  archaeology: "section-archaeology",
  nature: "section-nature",
  dayTrips: "section-day-trips",
  diving: "section-diving",
  map: "section-map",
} as const;

/** Map pin color per category */
export const CATEGORY_COLORS: Record<LocationCategory, string> = {
  beaches: "#3b82f6", // blue
  towns: "#f97316", // orange
  archaeology: "#92400e", // brown
  nature: "#16a34a", // green
  dayTrips: "#8b5cf6", // purple
  diving: "#8b5cf6", // purple
};
