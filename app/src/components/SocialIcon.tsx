"use client";

import type { SVGProps } from "react";
import { siFacebook, siInstagram, siGooglemaps } from "simple-icons";

const iconMap = {
  facebook: siFacebook,
  instagram: siInstagram,
  googlemaps: siGooglemaps,
};

export type SocialIconName = keyof typeof iconMap;

type SocialIconProps = {
  name: SocialIconName;
  className?: string;
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox">;

export default function SocialIcon({
  name,
  className,
  title,
  ...svgProps
}: SocialIconProps) {
  const icon = iconMap[name];

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={title ? undefined : "true"}
      {...svgProps}
    >
      {title ? <title>{title}</title> : null}
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
