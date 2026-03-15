import {
  Anchor,
  Armchair,
  Baby,
  Bath,
  BedDouble,
  BedSingle,
  Car,
  CarFront,
  Circle,
  Coffee,
  Droplets,
  Fish,
  LandPlot,
  Landmark,
  Leaf,
  MapPin,
  Mountain,
  Sailboat,
  Shell,
  Snowflake,
  Sofa,
  Sun,
  TreePine,
  Trees,
  Umbrella,
  UtensilsCrossed,
  Volleyball,
  Waves,
  Wifi,
  Wind,
  Wine,
} from "lucide-react";

const iconMap = {
  land: LandPlot,
  bedrooms: BedDouble,
  climate: Wind,
  terraces: Sun,
  outdoor: Trees,
  location: MapPin,
  kitchen: UtensilsCrossed,
  veranda: Umbrella,
  sports: Volleyball,
  garden: Trees,
  parking: Car,
  bathroom: Bath,
  "car-rental": CarFront,
  "ice-maker": Snowflake,
  "living-room": Sofa,
  port: Sailboat,
  beach: Sun,
  heritage: Landmark,
  cafe: Coffee,
  wifi: Wifi,
  crib: Baby,
  "extra-bed": BedSingle,
  "twin-double": BedDouble,
  lounger: Armchair,
  "garden-furniture": Umbrella,
  // Beach / location tags
  sandy: Shell,
  rocks: Mountain,
  seaweed: Leaf,
  turquoise: Droplets,
  "kid-friendly": Baby,
  "beach-services": Umbrella,
  bars: Wine,
  snorkeling: Fish,
  waves: Waves,
  "rope-park": TreePine,
  "diving-center": Anchor,
};

export type IconKey = keyof typeof iconMap;

type LucideIconProps = {
  name: string;
  className?: string;
  strokeWidth?: number;
};

export default function LucideIcon({
  name,
  className,
  strokeWidth = 1.6,
}: LucideIconProps) {
  const Icon = iconMap[name as IconKey] ?? Circle;
  return (
    <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />
  );
}
