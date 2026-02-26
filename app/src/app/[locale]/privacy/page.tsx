import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LegalPageLayout from "@/components/LegalPageLayout";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <LegalPageLayout
      eyebrow={t("eyebrow")}
      title={t("title")}
      lastUpdated={t("lastUpdated")}
      sections={[
        { title: t("controllerTitle"), body: t("controllerBody") },
        { title: t("dataCollectedTitle"), body: t("dataCollectedBody") },
        { title: t("purposeTitle"), body: t("purposeBody") },
        { title: t("cookiesTitle"), body: t("cookiesBody") },
        { title: t("thirdPartiesTitle"), body: t("thirdPartiesBody") },
        { title: t("retentionTitle"), body: t("retentionBody") },
        { title: t("rightsTitle"), body: t("rightsBody") },
        { title: t("contactTitle"), body: t("contactBody") },
      ]}
    />
  );
}
