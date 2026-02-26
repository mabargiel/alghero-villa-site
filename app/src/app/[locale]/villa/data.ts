export type RoomData = {
  key: string;
  amenities: string[];
  isSalon?: boolean;
};

export type ExteriorSectionData = {
  key: string;
};

const STANDARD_AMENITIES = ["wifi", "climate", "bathroom"];

export const rooms: RoomData[] = [
  { key: "bedroom-1", amenities: [...STANDARD_AMENITIES] },
  { key: "bedroom-2", amenities: [...STANDARD_AMENITIES] },
  { key: "bedroom-3", amenities: [...STANDARD_AMENITIES, "crib"] },
  { key: "bedroom-4", amenities: [...STANDARD_AMENITIES, "extra-bed"] },
  { key: "bedroom-5", amenities: ["wifi", "climate", "twin-double"] },
  { key: "bedroom-6", amenities: [...STANDARD_AMENITIES] },
  { key: "salon", amenities: ["wifi", "climate", "kitchen"], isSalon: true },
];

export const exteriorSections: ExteriorSectionData[] = [
  { key: "garden" },
  { key: "relaxation-zone" },
  { key: "veranda" },
  { key: "sports-court" },
  { key: "summer-kitchen" },
  { key: "parking" },
  { key: "views" },
];
