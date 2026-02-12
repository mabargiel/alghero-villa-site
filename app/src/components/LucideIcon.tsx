import {
  Activity,
  BedDouble,
  Car,
  Circle,
  Coffee,
  LandPlot,
  Landmark,
  MapPin,
  Sailboat,
  Sun,
  Trees,
  Umbrella,
  UtensilsCrossed,
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
  port: Sailboat,
  beach: Sun,
  heritage: Landmark,
  cafe: Coffee,
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
