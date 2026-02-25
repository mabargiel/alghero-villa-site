import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SubpageHeader from "@/components/SubpageHeader";

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

  const sections = [
    { title: t("reservationTitle"), body: t("reservationBody") },
    { title: t("checkInOutTitle"), body: t("checkInOutBody") },
    { title: t("rentalScopeTitle"), body: t("rentalScopeBody") },
    { title: t("guestObligationsTitle"), body: t("guestObligationsBody") },
    { title: t("finalProvisionsTitle"), body: t("finalProvisionsBody") },
  ];

  return (
    <main className="min-h-screen pb-16">
      <SubpageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("lastUpdated")}
      />
      <div className="mx-auto max-w-3xl px-6 pt-10">
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed whitespace-pre-line text-[var(--muted)]">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
