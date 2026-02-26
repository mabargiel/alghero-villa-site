"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import LucideIcon from "@/components/LucideIcon";
import VillaSubNav from "./VillaSubNav";
import RoomTilesGrid from "./RoomTilesGrid";

const amenityTranslationKeys: Record<string, string> = {
  wifi: "amenityWifi",
  climate: "amenityClimate",
  crib: "amenityCrib",
  "extra-bed": "amenityExtraBed",
  "twin-double": "amenityTwinDouble",
  bathroom: "amenityBathroom",
  lounger: "amenityLounger",
  kitchen: "amenityKitchen",
  parking: "amenityParking",
  "ice-maker": "amenityIceMaker",
  "car-rental": "amenityCarRental",
  "garden-furniture": "amenityGardenFurniture",
};

type ImageData = {
  altText: string;
  url: string;
};

type Room = {
  key: string;
  title: string;
  description: string;
  amenities: string[];
  isSalon?: boolean;
  coverImage: ImageData | null;
  galleryImages: ImageData[];
};

type ExteriorSection = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  image: ImageData | null;
};

type VillaPageClientProps = Readonly<{
  rooms: Room[];
  exteriorSections: ExteriorSection[];
}>;

export default function VillaPageClient({
  rooms,
  exteriorSections,
}: VillaPageClientProps) {
  const t = useTranslations("villa");
  const bedrooms = rooms.filter((r) => !r.isSalon);
  const salon = rooms.find((r) => r.isSalon) ?? null;

  // Build sub-nav groups
  const interiorItems: { id: string; label: string }[] = [];
  if (salon) interiorItems.push({ id: "salon", label: t("salonLabel") });
  if (bedrooms.length > 0)
    interiorItems.push({ id: "sypialnie", label: t("bedroomsLabel") });

  const exteriorItems = exteriorSections.map((s) => ({
    id: `ext-${s.key}`,
    label: s.title,
  }));

  const groups = [
    ...(interiorItems.length > 0
      ? [{ label: t("groupInteriors"), items: interiorItems }]
      : []),
    ...(exteriorItems.length > 0
      ? [{ label: t("groupOutdoors"), items: exteriorItems }]
      : []),
  ];

  function getAmenityLabel(key: string): string {
    const translationKey = amenityTranslationKeys[key];
    return translationKey ? t(translationKey as Parameters<typeof t>[0]) : key;
  }

  return (
    <>
      {groups.length > 0 && (
        <VillaSubNav groups={groups} ariaLabel={t("sectionNavAria")} />
      )}

      <div className="mx-auto max-w-6xl px-6">
        {/* === SALON === */}
        {salon && (
          <Reveal>
            <section id="salon" className="pt-12 pb-16">
              <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
                <div>
                  <h2 className="text-2xl font-semibold md:text-3xl">
                    {salon.title}
                  </h2>
                  <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent-warm)]" />
                  <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
                    {t("salonSubtitle")}
                  </p>
                  <p className="mt-4 text-[var(--muted)]">
                    {salon.description}
                  </p>
                  {salon.amenities.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                      {salon.amenities.map((key) => (
                        <span
                          key={key}
                          className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]"
                        >
                          <LucideIcon
                            name={key}
                            className="h-3.5 w-3.5 text-[var(--brand)]"
                          />
                          {getAmenityLabel(key)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <SalonCarousel
                  coverImage={salon.coverImage}
                  galleryImages={salon.galleryImages}
                />
              </div>
            </section>
          </Reveal>
        )}

        {/* === BEDROOMS === */}
        {bedrooms.length > 0 && (
          <section id="sypialnie" className="pb-16">
            <h2 className="text-2xl font-semibold md:text-3xl">
              {t("bedroomsTitle")}
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent-warm)]" />
            <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
              {t("bedroomsSubtitle", { count: bedrooms.length })}
            </p>
            <div className="mt-8">
              <RoomTilesGrid rooms={bedrooms} />
            </div>
          </section>
        )}

        {/* === VISUAL DIVIDER === */}
        {exteriorSections.length > 0 && rooms.length > 0 && (
          <div className="flex items-center gap-4 pb-12">
            <div className="h-px flex-1 bg-[var(--surface)]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">
              {t("groupOutdoors")}
            </span>
            <div className="h-px flex-1 bg-[var(--surface)]" />
          </div>
        )}

        {/* === EXTERIORS === */}
        {exteriorSections.map((section, index) => (
          <Reveal key={section.key}>
            <section id={`ext-${section.key}`} className="pb-16">
              <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
                {index % 2 === 1 && section.image && (
                  <div className="order-2 md:order-none">
                    <ExteriorImage
                      url={section.image.url}
                      altText={section.image.altText}
                    />
                  </div>
                )}
                <div className="order-1 md:order-none">
                  <h2 className="text-2xl font-semibold md:text-3xl">
                    {section.title}
                  </h2>
                  <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent-warm)]" />
                  <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
                    {section.subtitle}
                  </p>
                  <p className="mt-4 text-[var(--muted)]">
                    {section.description}
                  </p>
                </div>
                {index % 2 === 0 && section.image && (
                  <div className="order-2 md:order-none">
                    <ExteriorImage
                      url={section.image.url}
                      altText={section.image.altText}
                    />
                  </div>
                )}
              </div>
            </section>
          </Reveal>
        ))}

        {/* === CTA === */}
        <CtaSection namespace="villa" />
      </div>
    </>
  );
}

function SalonCarousel({
  coverImage,
  galleryImages,
}: Readonly<{
  coverImage: ImageData | null;
  galleryImages: ImageData[];
}>) {
  const t = useTranslations("villa");
  const images = useMemo(() => {
    const all: ImageData[] = [];
    if (coverImage) all.push(coverImage);
    all.push(...galleryImages);
    return all;
  }, [coverImage, galleryImages]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive(index);
    setPaused(true);
  }, []);

  // Auto-advance every 5s, pause after manual interaction for 10s
  useEffect(() => {
    if (images.length <= 1 || paused) {
      if (paused) {
        const resume = setTimeout(() => setPaused(false), 10000);
        return () => clearTimeout(resume);
      }
      return;
    }
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length, paused]);

  if (images.length === 0) return null;

  return (
    <div>
      <div className="group relative h-[260px] overflow-hidden rounded-lg bg-[var(--surface)] shadow-[0_25px_55px_-35px_rgba(20,20,20,0.5)] md:h-[320px] lg:h-[380px]">
        {images.map((img, i) => (
          <Image
            key={img.url}
            src={img.url}
            alt={img.altText}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => goTo(i)}
              aria-label={t("photoAria", { index: i + 1 })}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "h-2.5 w-2.5 bg-[var(--accent-strong)]"
                  : "h-2 w-2 bg-[var(--muted)] opacity-40 hover:opacity-70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ExteriorImage({
  url,
  altText,
}: Readonly<{ url: string; altText: string }>) {
  return (
    <div className="group relative h-[260px] overflow-hidden rounded-lg bg-[var(--surface)] shadow-[0_25px_55px_-35px_rgba(20,20,20,0.5)] md:h-[320px] lg:h-[380px]">
      <Image
        src={url}
        alt={altText}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-[1.02]"
        loading="lazy"
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80 transition duration-700 group-hover:opacity-60" />
    </div>
  );
}
