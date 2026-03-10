import { getTranslations } from "next-intl/server";
import SubpageHeader from "@/components/SubpageHeader";
import { getLocationPage } from "@/lib/sanity/queries";
import LocationPageClient from "./LocationPageClient";

export default async function LocationPage() {
  const t = await getTranslations("location");
  const data = await getLocationPage();

  const imagesByCategory = {
    beaches: data?.beaches,
    towns: data?.towns,
    nature: data?.nature,
    archaeology: data?.archaeology,
    dayTrips: data?.dayTrips,
    diving: data?.diving,
  };

  return (
    <main className="min-h-screen pb-0">
      <SubpageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <LocationPageClient imagesByCategory={imagesByCategory} />
    </main>
  );
}
