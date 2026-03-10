"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { LocationItem } from "@/data/location-data";
import type { MediaImage } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import BeachTags from "./BeachTags";

type FeaturedLocationCardProps = Readonly<{
  item: LocationItem;
  image?: MediaImage;
}>;

export default function FeaturedLocationCard({
  item,
  image,
}: FeaturedLocationCardProps) {
  const t = useTranslations("location");
  const imageUrl = image
    ? urlFor(image.image).width(1400).quality(85).auto("format").url()
    : undefined;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative aspect-[16/10] w-full md:aspect-auto md:w-1/2">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.altText ?? item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex h-full min-h-[240px] items-center justify-center bg-[var(--surface)]">
              <span className="text-5xl opacity-30">🏖</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-3 p-6 md:w-1/2 md:p-8">
          {item.featured && (
            <span className="text-sm font-semibold tracking-wide text-[var(--accent-warm)] uppercase">
              {t(`loc_${item.id}_highlight`)}
            </span>
          )}
          <h3 className="text-2xl font-semibold md:text-3xl">
            {t(`loc_${item.id}_name`)}
          </h3>
          <span className="text-sm text-[var(--muted)]">
            🚗 {t("driveTime", { minutes: item.driveMinutes })}
          </span>
          <p className="text-base leading-relaxed text-[var(--foreground)]/80">
            {t(`loc_${item.id}`)}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div className="mt-1">
              <BeachTags tags={item.tags} />
            </div>
          )}
          <a
            href={item.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)]"
          >
            {t("openInMaps")} ↗
          </a>
        </div>
      </div>
    </div>
  );
}
