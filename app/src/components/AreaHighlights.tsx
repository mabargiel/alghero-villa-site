"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LucideIcon from "./LucideIcon";

type AreaImage = {
  altText: string;
  url: string;
};

type Area = {
  titleKey: string;
  descriptionKey: string;
  iconKey: string;
};

const areas: Area[] = [
  {
    titleKey: "areaInteriorsTitle",
    descriptionKey: "areaInteriorsDescription",
    iconKey: "living-room",
  },
  {
    titleKey: "areaVerandasTitle",
    descriptionKey: "areaVerandasDescription",
    iconKey: "veranda",
  },
  {
    titleKey: "areaSummerKitchenTitle",
    descriptionKey: "areaSummerKitchenDescription",
    iconKey: "garden",
  },
  {
    titleKey: "areaSportsFieldTitle",
    descriptionKey: "areaSportsFieldDescription",
    iconKey: "sports",
  },
];

type AreaHighlightsProps = Readonly<{
  images: AreaImage[];
}>;

export default function AreaHighlights({ images }: AreaHighlightsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const t = useTranslations("home");

  return (
    <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-2">
      {areas.map((area, index) => {
        const image = images[index];
        const isExpanded = expandedIndex === index;
        const title = t(area.titleKey);

        return (
          <Link
            key={area.iconKey}
            href="/villa"
            aria-label={title}
            className={`highlight-card-item relative h-[260px] overflow-visible rounded-lg ${
              isExpanded ? "z-10" : "z-0"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setExpandedIndex(index)}
            onMouseLeave={() => setExpandedIndex(null)}
          >
            {/* Card that expands upward without affecting layout */}
            <div
              className={`absolute right-0 bottom-0 left-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-500 ease-out ${
                isExpanded ? "h-[340px]" : "h-[260px]"
              }`}
            >
              {/* Background image */}
              {image ? (
                <Image
                  src={image.url}
                  alt={image.altText}
                  fill
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isExpanded ? "scale-[1.05]" : "scale-100"
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--surface-strong)]" />
              )}

              {/* Dark gradient overlay */}
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                  isExpanded
                    ? "bg-gradient-to-t from-black/80 via-black/50 to-black/30"
                    : "bg-gradient-to-t from-black/70 via-black/35 to-transparent"
                }`}
              />

              {/* Default state: icon + title */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-end gap-3 pb-8 transition-opacity duration-400 ${
                  isExpanded ? "opacity-0" : "opacity-100"
                }`}
              >
                <LucideIcon
                  name={area.iconKey}
                  className="h-8 w-8 text-white drop-shadow-lg md:h-9 md:w-9"
                  strokeWidth={1.4}
                />
                <span className="text-xs font-semibold tracking-[0.18em] text-white uppercase drop-shadow-lg sm:text-sm">
                  {title}
                </span>
              </div>

              {/* Expanded state: title + description */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-end px-4 pb-8 text-center transition-opacity duration-400 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-sm font-semibold tracking-[0.14em] text-white uppercase drop-shadow-lg sm:text-base">
                  {title}
                </span>
                <p className="mt-2 text-xs leading-relaxed text-white/90 drop-shadow-lg sm:text-sm">
                  {t(area.descriptionKey)}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
