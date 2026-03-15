"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import {
  beaches,
  towns,
  archaeology,
  nature,
  dayTrips,
  diving,
  SECTION_IDS,
  type LocationItem,
} from "@/data/location-data";
import type { LocationImageSet, MediaImage } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import LocationSectionNav from "./LocationSectionNav";
import LocationHorizontalNav from "./LocationHorizontalNav";
import LocationCard from "./LocationCard";
import FeaturedLocationCard from "./FeaturedLocationCard";
import LocationMap from "./LocationMap";
import BeachTags from "./BeachTags";
import BottomSheet from "./BottomSheet";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LocationPageClientProps = Readonly<{
  imagesByCategory: Record<string, LocationImageSet[] | undefined>;
}>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getFirstImage(
  sets: LocationImageSet[] | undefined,
  locationId: string,
): MediaImage | undefined {
  const set = sets?.find((s) => s.locationKey === locationId);
  return set?.images?.[0];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LocationPageClient({
  imagesByCategory,
}: LocationPageClientProps) {
  const t = useTranslations("location");
  const [sheetItem, setSheetItem] = useState<LocationItem | null>(null);
  const [sheetImage, setSheetImage] = useState<MediaImage | undefined>(
    undefined,
  );

  const openSheet = useCallback((item: LocationItem, image?: MediaImage) => {
    setSheetItem(item);
    setSheetImage(image);
  }, []);
  const closeSheet = useCallback(() => setSheetItem(null), []);

  const navItems = [
    { id: SECTION_IDS.beaches, label: t("sectionBeaches") },
    { id: SECTION_IDS.towns, label: t("sectionTowns") },
    { id: SECTION_IDS.archaeology, label: t("sectionArchaeology") },
    { id: SECTION_IDS.nature, label: t("sectionNature") },
    { id: SECTION_IDS.dayTrips, label: t("sectionDayTrips") },
    { id: SECTION_IDS.diving, label: t("sectionDiving") },
  ];

  // Beach sub-groups
  const algheroBeaches = beaches.filter((b) => b.subgroup === "alghero");
  const southBeaches = beaches.filter((b) => b.subgroup === "south");
  const nearbyBeaches = beaches.filter((b) => b.subgroup === "nearby");

  const featured = beaches.filter((b) => b.featured);
  const algheroRegular = algheroBeaches.filter((b) => !b.featured);
  const nearbyRegular = nearbyBeaches.filter((b) => !b.featured);

  // Split alghero regular into two chunks around featured cards
  const firstChunk = algheroRegular.slice(0, 6);
  const secondChunk = algheroRegular.slice(6);

  // Featured beaches by id for ordering
  const mugoni = featured.find((b) => b.id === "mugoni");
  const leBombarde = featured.find((b) => b.id === "le-bombarde");
  const laPelosa = featured.find((b) => b.id === "la-pelosa");

  // Nature: Grotta di Nettuno featured, rest regular
  const natureFeatured = nature.find((n) => n.featured);
  const natureRegular = nature.filter((n) => !n.featured);

  return (
    <>
      {/* Horizontal nav — visible immediately after SubpageHeader */}
      <LocationHorizontalNav items={navItems} ariaLabel={t("sectionNavAria")} />

      {/* Sticky side nav — appears after scrolling past horizontal nav */}
      <LocationSectionNav
        items={navItems}
        ariaLabel={t("sectionNavAria")}
        hideUntilPastId="location-horizontal-nav"
      />

      {/* ================================================================ */}
      {/* BEACHES */}
      {/* ================================================================ */}
      <section
        id={SECTION_IDS.beaches}
        className="mx-auto max-w-6xl px-6 pt-16 pb-10"
      >
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {t("sectionBeaches")}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            {t("beachesIntro")}
          </p>
        </Reveal>

        {/* Subgroup: Alghero */}
        <Reveal>
          <h3 className="mt-10 mb-5 text-lg font-medium tracking-wide text-[var(--foreground)]/60 uppercase">
            {t("subgroupAlghero")}
          </h3>
        </Reveal>

        {/* Featured: Mugoni */}
        {mugoni && (
          <Reveal>
            <div className="mb-6">
              <FeaturedLocationCard
                item={mugoni}
                image={getFirstImage(imagesByCategory.beaches, mugoni.id)}
              />
            </div>
          </Reveal>
        )}

        {/* First chunk of regular cards */}
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {firstChunk.map((beach) => (
              <LocationCard
                key={beach.id}
                item={beach}
                image={getFirstImage(imagesByCategory.beaches, beach.id)}
                onTap={() =>
                  openSheet(
                    beach,
                    getFirstImage(imagesByCategory.beaches, beach.id),
                  )
                }
              />
            ))}
          </div>
        </Reveal>

        {/* Featured: Le Bombarde */}
        {leBombarde && (
          <Reveal>
            <div className="my-6">
              <FeaturedLocationCard
                item={leBombarde}
                image={getFirstImage(imagesByCategory.beaches, leBombarde.id)}
              />
            </div>
          </Reveal>
        )}

        {/* Second chunk of regular cards */}
        {secondChunk.length > 0 && (
          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {secondChunk.map((beach) => (
                <LocationCard
                  key={beach.id}
                  item={beach}
                  image={getFirstImage(imagesByCategory.beaches, beach.id)}
                  onTap={() =>
                    openSheet(
                      beach,
                      getFirstImage(imagesByCategory.beaches, beach.id),
                    )
                  }
                />
              ))}
            </div>
          </Reveal>
        )}

        {/* Subgroup: South */}
        {southBeaches.length > 0 && (
          <>
            <Reveal>
              <h3 className="mt-12 mb-5 text-lg font-medium tracking-wide text-[var(--foreground)]/60 uppercase">
                {t("subgroupSouth")}
              </h3>
            </Reveal>
            <Reveal>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {southBeaches.map((beach) => (
                  <LocationCard
                    key={beach.id}
                    item={beach}
                    image={getFirstImage(imagesByCategory.beaches, beach.id)}
                    onTap={() =>
                      openSheet(
                        beach,
                        getFirstImage(imagesByCategory.beaches, beach.id),
                      )
                    }
                  />
                ))}
              </div>
            </Reveal>
          </>
        )}

        {/* Subgroup: Nearby */}
        <Reveal>
          <h3 className="mt-12 mb-5 text-lg font-medium tracking-wide text-[var(--foreground)]/60 uppercase">
            {t("subgroupNearby")}
          </h3>
        </Reveal>

        {/* Featured: La Pelosa */}
        {laPelosa && (
          <Reveal>
            <div className="mb-6">
              <FeaturedLocationCard
                item={laPelosa}
                image={getFirstImage(imagesByCategory.beaches, laPelosa.id)}
              />
            </div>
          </Reveal>
        )}

        {nearbyRegular.length > 0 && (
          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {nearbyRegular.map((beach) => (
                <LocationCard
                  key={beach.id}
                  item={beach}
                  image={getFirstImage(imagesByCategory.beaches, beach.id)}
                  onTap={() =>
                    openSheet(
                      beach,
                      getFirstImage(imagesByCategory.beaches, beach.id),
                    )
                  }
                />
              ))}
            </div>
          </Reveal>
        )}
      </section>

      {/* ================================================================ */}
      {/* TOWNS */}
      {/* ================================================================ */}
      <section
        id={SECTION_IDS.towns}
        className="mx-auto max-w-6xl px-6 pt-16 pb-10"
      >
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {t("sectionTowns")}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            {t("townsIntro")}
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {towns.map((town) => (
              <LocationCard
                key={town.id}
                item={town}
                image={getFirstImage(imagesByCategory.towns, town.id)}
                onTap={() =>
                  openSheet(
                    town,
                    getFirstImage(imagesByCategory.towns, town.id),
                  )
                }
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================================================================ */}
      {/* ARCHAEOLOGY */}
      {/* ================================================================ */}
      <section
        id={SECTION_IDS.archaeology}
        className="mx-auto max-w-6xl px-6 pt-16 pb-10"
      >
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {t("sectionArchaeology")}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            {t("archaeologyIntro")}
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {archaeology.map((item) => (
              <LocationCard
                key={item.id}
                item={item}
                image={getFirstImage(imagesByCategory.archaeology, item.id)}
                onTap={() =>
                  openSheet(
                    item,
                    getFirstImage(imagesByCategory.archaeology, item.id),
                  )
                }
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================================================================ */}
      {/* NATURE */}
      {/* ================================================================ */}
      <section
        id={SECTION_IDS.nature}
        className="mx-auto max-w-6xl px-6 pt-16 pb-10"
      >
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {t("sectionNature")}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            {t("natureIntro")}
          </p>
        </Reveal>

        {natureFeatured && (
          <Reveal>
            <div className="mt-8 mb-6">
              <FeaturedLocationCard
                item={natureFeatured}
                image={getFirstImage(
                  imagesByCategory.nature,
                  natureFeatured.id,
                )}
              />
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {natureRegular.map((item) => (
              <LocationCard
                key={item.id}
                item={item}
                image={getFirstImage(imagesByCategory.nature, item.id)}
                onTap={() =>
                  openSheet(
                    item,
                    getFirstImage(imagesByCategory.nature, item.id),
                  )
                }
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================================================================ */}
      {/* DAY TRIPS */}
      {/* ================================================================ */}
      <section
        id={SECTION_IDS.dayTrips}
        className="mx-auto max-w-6xl px-6 pt-16 pb-10"
      >
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {t("sectionDayTrips")}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            {t("dayTripsIntro")}
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {dayTrips.map((item) => (
              <LocationCard
                key={item.id}
                item={item}
                image={getFirstImage(imagesByCategory.dayTrips, item.id)}
                onTap={() =>
                  openSheet(
                    item,
                    getFirstImage(imagesByCategory.dayTrips, item.id),
                  )
                }
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================================================================ */}
      {/* DIVING */}
      {/* ================================================================ */}
      <section
        id={SECTION_IDS.diving}
        className="mx-auto max-w-6xl px-6 pt-16 pb-10"
      >
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {t("sectionDiving")}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            {t("divingIntro")}
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {diving.map((item) => (
              <LocationCard
                key={item.id}
                item={item}
                image={getFirstImage(imagesByCategory.diving, item.id)}
                onTap={() =>
                  openSheet(
                    item,
                    getFirstImage(imagesByCategory.diving, item.id),
                  )
                }
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================================================================ */}
      {/* MAP (placeholder — will be added in task 7) */}
      {/* ================================================================ */}
      <section
        id={SECTION_IDS.map}
        className="mx-auto max-w-6xl px-6 pt-16 pb-10"
      >
        <Reveal>
          <LocationMap />
        </Reveal>
      </section>

      {/* CTA */}
      <CtaSection namespace="location" />

      {/* Bottom Sheet (mobile detail view) */}
      <BottomSheet
        open={!!sheetItem}
        onClose={closeSheet}
        ariaLabel={sheetItem?.name}
      >
        {sheetItem && (
          <div className="flex flex-col gap-4">
            {/* Image */}
            {sheetImage?.image && (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image
                  src={urlFor(sheetImage.image)
                    .width(1000)
                    .quality(80)
                    .auto("format")
                    .url()}
                  alt={sheetImage.altText ?? sheetItem.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            )}

            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold">
                {t(`loc_${sheetItem.id}_name`)}
              </h3>
              <span className="shrink-0 text-sm text-[var(--muted)]">
                🚗 {t("driveTime", { minutes: sheetItem.driveMinutes })}
              </span>
            </div>

            <p className="text-base leading-relaxed text-[var(--foreground)]/80">
              {t(`loc_${sheetItem.id}`)}
            </p>

            {sheetItem.tags && sheetItem.tags.length > 0 && (
              <BeachTags tags={sheetItem.tags} />
            )}

            <a
              href={sheetItem.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[var(--brand)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--brand-hover)]"
            >
              {t("openInMaps")} ↗
            </a>
          </div>
        )}
      </BottomSheet>
    </>
  );
}
