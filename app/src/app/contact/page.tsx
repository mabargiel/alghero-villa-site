import SubpageHeader from "@/components/SubpageHeader";
import ContactForm from "@/components/ContactForm";
import ContactInfoPanel from "@/components/ContactInfoPanel";

export default function ContactPage() {
  return (
    <main className="min-h-screen pb-16">
      <SubpageHeader
        eyebrow="Kontakt"
        title="Zapytaj o dostępność"
        description="Napisz do nas, a wrócimy z informacją o dostępności i szczegółach pobytu."
      />
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
          <ContactInfoPanel />
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
