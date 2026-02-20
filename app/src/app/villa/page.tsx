import { urlFor } from "@/lib/sanity/image";
import { getVillaPage } from "@/lib/sanity/queries";
import SubpageHeader from "@/components/SubpageHeader";
import LucideIcon from "@/components/LucideIcon";
import VillaPageClient from "./VillaPageClient";
import { rooms, exteriorSections } from "./data";

const villaStats = [
  { icon: "bedrooms", value: "6", label: "sypialni" },
  { icon: "bathroom", value: "6", label: "łazienek" },
  { icon: "land", value: "1 ha", label: "posiadłość" },
  { icon: "climate", value: "A/C", label: "klimatyzacja" },
  { icon: "garden", value: "Ogród", label: "śródziemnomorski" },
  { icon: "parking", value: "Parking", label: "prywatny" },
];

export default async function VillaPage() {
  const villaPage = await getVillaPage();

  // Build image maps keyed by roomKey / sectionKey
  const roomImageMap = new Map(
    (villaPage?.roomImages ?? []).map((ri) => [ri.roomKey, ri]),
  );
  const exteriorImageMap = new Map(
    (villaPage?.exteriorImages ?? []).map((ei) => [ei.sectionKey, ei]),
  );

  // Merge hardcoded room data with CMS images
  const mergedRooms = rooms.map((room) => {
    const cmsImages = roomImageMap.get(room.key);
    return {
      ...room,
      coverImage: cmsImages?.coverImage
        ? {
            altText: cmsImages.coverImage.altText,
            url: urlFor(cmsImages.coverImage.image)
              .width(800)
              .quality(85)
              .auto("format")
              .url(),
          }
        : null,
      galleryImages: (cmsImages?.galleryImages ?? []).map((img) => ({
        altText: img.altText,
        url: urlFor(img.image).width(1200).quality(85).auto("format").url(),
      })),
    };
  });

  // Merge hardcoded exterior data with CMS images
  const mergedExteriors = exteriorSections.map((section) => {
    const cmsImage = exteriorImageMap.get(section.key);
    return {
      ...section,
      image: cmsImage?.image
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
      <SubpageHeader
        eyebrow="Obiekt"
        title="Villa Monte Calvia"
        description="Odkryj wnętrza i otoczenie naszej posiadłości — od komfortowych sypialni po śródziemnomorski ogród u stóp góry Monte Calvia."
      />

      <div className="mx-auto max-w-6xl px-6 pt-10 pb-10">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {villaStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-white/60 px-3 py-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]"
            >
              <LucideIcon
                name={stat.icon}
                className="h-5 w-5 text-[var(--accent-strong)]"
              />
              <span className="text-sm leading-tight font-semibold">
                {stat.value}
              </span>
              <span className="text-[10px] leading-tight text-[var(--muted)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <VillaPageClient rooms={mergedRooms} exteriorSections={mergedExteriors} />
    </main>
  );
}
