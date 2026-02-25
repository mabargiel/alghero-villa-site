import { getTranslations } from "next-intl/server";
import SubpageHeader from "@/components/SubpageHeader";
import ContactForm from "@/components/ContactForm";
import ContactInfoPanel from "@/components/ContactInfoPanel";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  return (
    <main className="min-h-screen pb-16">
      <SubpageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-stretch">
          <ContactInfoPanel />
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
