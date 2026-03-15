import { urlFor } from "@/lib/sanity/image";
import { getGallery } from "@/lib/sanity/queries";
import { getTranslations } from "next-intl/server";
import SubpageHeader from "@/components/SubpageHeader";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
  const gallery = await getGallery();
  const t = await getTranslations("gallery");
  const images = (gallery?.images ?? [])
    .filter((image) => image.asset)
    .map((image) => ({
      key: image._key,
      altText: "",
      url: urlFor(image).width(1400).quality(80).auto("format").url(),
      aspectRatio: image.asset.metadata?.dimensions?.aspectRatio,
    }));

  return (
    <main className="min-h-screen pb-16">
      <SubpageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <div className="mx-auto max-w-6xl px-6 pt-10">
        {images.length === 0 ? (
          <div className="rounded-3xl border border-[var(--surface)] bg-[var(--surface)] p-10 text-center text-[var(--muted)]">
            {t("emptyState")}
          </div>
        ) : (
          <GalleryClient images={images} />
        )}
      </div>
    </main>
  );
}
