"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { LocationItem } from "@/data/location-data";
import type { MediaImage } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import BeachTags from "./BeachTags";

type LocationCardProps = Readonly<{
  item: LocationItem;
  image?: MediaImage;
  onTap?: () => void;
}>;

export default function LocationCard({
  item,
  image,
  onTap,
}: LocationCardProps) {
  const t = useTranslations("location");
  const imageUrl = image?.image
    ? urlFor(image.image).width(800).quality(80).auto("format").url()
    : undefined;

  return (
    <button
      type="button"
      onClick={onTap}
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white text-left shadow-sm transition-all duration-300 hover:z-10 hover:scale-[1.08] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-sky)] xl:hover:scale-[1.12]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.altText ?? item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[var(--surface)]">
            <span className="text-3xl opacity-30">🏖</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        <h3 className="text-sm leading-tight font-semibold">
          {t(`loc_${item.id}_name`)}
        </h3>
        <span className="text-xs text-[var(--muted)]">
          🚗 {t("driveTime", { minutes: item.driveMinutes })}
        </span>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-0.5">
            <BeachTags tags={item.tags} compact />
          </div>
        )}
      </div>

      {/* Expanded detail (hover only, desktop) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden translate-y-full opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 xl:block">
        <div className="rounded-b-xl bg-white/95 p-3 pt-0 shadow-inner backdrop-blur-sm">
          <p className="mb-2 text-xs leading-relaxed text-[var(--foreground)]/80">
            {t(`loc_${item.id}`)}
          </p>
          {item.tags && item.tags.length > 0 && <BeachTags tags={item.tags} />}
        </div>
      </div>
    </button>
  );
}
