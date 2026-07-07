import { getTranslations } from "next-intl/server";
import { urlFor } from "@/lib/sanity/image";
import { getVillaPage } from "@/lib/sanity/queries";
import SubpageHeader from "@/components/SubpageHeader";
import LucideIcon from "@/components/LucideIcon";
import VillaPageClient from "./VillaPageClient";
import VillaHeroNav from "./VillaHeroNav";
import { rooms, exteriorSections } from "./data";

const roomTranslationKeys: Record<
  string,
  { title: string; description: string }
> = {
  "bedroom-1": { title: "bedroom1Title", description: "bedroom1Description" },
  "bedroom-2": { title: "bedroom2Title", description: "bedroom2Description" },
  "bedroom-3": { title: "bedroom3Title", description: "bedroom3Description" },
  "bedroom-4": { title: "bedroom4Title", description: "bedroom4Description" },
  "bedroom-5": { title: "bedroom5Title", description: "bedroom5Description" },
  "bedroom-6": { title: "bedroom6Title", description: "bedroom6Description" },
  salon: { title: "salonTitle", description: "salonDescription" },
};

const exteriorTranslationKeys: Record<
  string,
  { title: string; subtitle: string; description: string }
> = {
  garden: {
    title: "gardenTitle",
    subtitle: "gardenSubtitle",
    description: "gardenDescription",
  },
  "relaxation-zone": {
    title: "relaxationZoneTitle",
    subtitle: "relaxationZoneSubtitle",
    description: "relaxationZoneDescription",
  },
  veranda: {
    title: "verandaTitle",
    subtitle: "verandaSubtitle",
    description: "verandaDescription",
  },
  "sports-court": {
    title: "sportsCourtTitle",
    subtitle: "sportsCourtSubtitle",
    description: "sportsCourtDescription",
  },
  "summer-kitchen": {
    title: "summerKitchenTitle",
    subtitle: "summerKitchenSubtitle",
    description: "summerKitchenDescription",
  },
  parking: {
    title: "parkingTitle",
    subtitle: "parkingSubtitle",
    description: "parkingDescription",
  },
  views: {
    title: "viewsTitle",
    subtitle: "viewsSubtitle",
    description: "viewsDescription",
  },
};

export default async function VillaPage() {
  const t = await getTranslations("villa");
  const villaPage = await getVillaPage();

  const villaStats = [
    { icon: "bedrooms", value: t("stat1Value"), label: t("stat1Label") },
    { icon: "bathroom", value: t("stat2Value"), label: t("stat2Label") },
    { icon: "land", value: t("stat3Value"), label: t("stat3Label") },
    { icon: "climate", value: t("stat4Value"), label: t("stat4Label") },
    { icon: "garden", value: t("stat5Value"), label: t("stat5Label") },
    { icon: "parking", value: t("stat6Value"), label: t("stat6Label") },
  ];

  const roomImageMap = new Map(
    (villaPage?.roomImages ?? []).map((ri) => [ri.roomKey, ri]),
  );
  const exteriorImageMap = new Map(
    (villaPage?.exteriorImages ?? []).map((ei) => [ei.sectionKey, ei]),
  );

  // Merge hardcoded room data with CMS images and translations
  const mergedRooms = rooms.map((room) => {
    const cmsImages = roomImageMap.get(room.key);
    const keys = roomTranslationKeys[room.key];
    return {
      ...room,
      title: keys ? t(keys.title as Parameters<typeof t>[0]) : room.key,
      description: keys ? t(keys.description as Parameters<typeof t>[0]) : "",
      coverImage: cmsImages?.coverImage?.image
        ? {
            altText: cmsImages.coverImage.altText,
            url: urlFor(cmsImages.coverImage.image)
              .width(800)
              .quality(85)
              .auto("format")
              .url(),
          }
        : null,
      galleryImages: (cmsImages?.galleryImages ?? [])
        .filter((img) => img.image)
        .map((img) => ({
          altText: img.altText,
          url: urlFor(img.image).width(1200).quality(85).auto("format").url(),
        })),
    };
  });

  // Merge hardcoded exterior data with CMS images and translations
  const mergedExteriors = exteriorSections.map((section) => {
    const cmsImage = exteriorImageMap.get(section.key);
    const keys = exteriorTranslationKeys[section.key];
    return {
      ...section,
      title: keys ? t(keys.title as Parameters<typeof t>[0]) : section.key,
      subtitle: keys ? t(keys.subtitle as Parameters<typeof t>[0]) : "",
      description: keys ? t(keys.description as Parameters<typeof t>[0]) : "",
      image: cmsImage?.image?.image
        ? {
            altText: cmsImage.image.altText,
            url: urlFor(cmsImage.image.image)
              .width(1400)
              .quality(85)
              .auto("format")
              .url(),
          }
        : null,
    };
  });

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Above-the-fold: fills viewport so content starts below the fold */}
      <div className="flex min-h-screen flex-col">
        <SubpageHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mx-auto max-w-6xl px-6 pt-10 pb-10">
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
            {villaStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-white/60 px-3 py-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] md:gap-2.5 md:rounded-2xl md:px-5 md:py-6"
              >
                <LucideIcon
                  name={stat.icon}
                  className="h-5 w-5 text-[var(--brand)] md:h-7 md:w-7"
                />
                <span className="text-sm leading-tight font-semibold md:text-base">
                  {stat.value}
                </span>
                <span className="text-[10px] leading-tight text-[var(--muted)] md:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <VillaHeroNav
            interiorsImage={
              villaPage?.heroNavInteriorsImage?.image
                ? {
                    altText: villaPage.heroNavInteriorsImage.altText,
                    url: urlFor(villaPage.heroNavInteriorsImage.image)
                      .width(1200)
                      .quality(85)
                      .auto("format")
                      .url(),
                  }
                : null
            }
            outdoorsImage={
              villaPage?.heroNavOutdoorsImage?.image
                ? {
                    altText: villaPage.heroNavOutdoorsImage.altText,
                    url: urlFor(villaPage.heroNavOutdoorsImage.image)
                      .width(1200)
                      .quality(85)
                      .auto("format")
                      .url(),
                  }
                : null
            }
          />
        </div>
      </div>

      <VillaPageClient rooms={mergedRooms} exteriorSections={mergedExteriors} />
    </main>
  );
}
