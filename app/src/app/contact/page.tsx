import ContactForm from "@/components/ContactForm";
import ContactInfoPanel from "@/components/ContactInfoPanel";

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 pt-28 pb-16">
      <header className="mb-10">
        <p className="text-sm tracking-[0.2em] text-[var(--muted)] uppercase">
          Kontakt
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">
          Zapytaj o dostępność
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Napisz do nas, a wrócimy z informacją o dostępności i szczegółach
          pobytu.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
        <ContactInfoPanel />
        <ContactForm />
      </div>
    </main>
  );
}
