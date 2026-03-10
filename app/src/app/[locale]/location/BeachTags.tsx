"use client";

import { useTranslations } from "next-intl";
import LucideIcon from "@/components/LucideIcon";
import { LOCATION_TAGS, type LocationTag } from "@/data/location-data";

type BeachTagsProps = Readonly<{
  tags: LocationTag[];
  compact?: boolean;
}>;

export default function BeachTags({ tags, compact }: BeachTagsProps) {
  const t = useTranslations("location");

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const { icon, translationKey } = LOCATION_TAGS[tag];
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-[var(--surface)] px-2.5 py-0.5 text-xs text-[var(--foreground)]/70"
          >
            <LucideIcon name={icon} className="h-3 w-3" strokeWidth={2} />
            {!compact && (
              <span className="leading-tight">{t(translationKey)}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
