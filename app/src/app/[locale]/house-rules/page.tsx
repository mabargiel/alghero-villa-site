import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LegalPageLayout from "@/components/LegalPageLayout";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "houseRules" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function HouseRulesPage() {
  const t = await getTranslations("houseRules");

  return (
    <LegalPageLayout
      eyebrow={t("eyebrow")}
      title={t("title")}
      lastUpdated={t("lastUpdated")}
      sections={[
        { title: t("reservationTitle"), body: t("reservationBody") },
        { title: t("checkInOutTitle"), body: t("checkInOutBody") },
        { title: t("rentalScopeTitle"), body: t("rentalScopeBody") },
        { title: t("guestObligationsTitle"), body: t("guestObligationsBody") },
        { title: t("finalProvisionsTitle"), body: t("finalProvisionsBody") },
      ]}
    />
  );
}
