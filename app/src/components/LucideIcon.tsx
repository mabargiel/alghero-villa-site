import {
  Activity,
  Armchair,
  Baby,
  Bath,
  BedDouble,
  BedSingle,
  Car,
  CarFront,
  Circle,
  Coffee,
  LandPlot,
  Landmark,
  MapPin,
  Sailboat,
  Snowflake,
  Sofa,
  Sun,
  Trees,
  Umbrella,
  UtensilsCrossed,
  Wifi,
  Wind,
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
  sports: Activity,
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
  lounger: Armchair,
  "garden-furniture": Umbrella,
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
