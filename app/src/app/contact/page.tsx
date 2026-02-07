import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
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

      <ContactForm />
    </main>
  );
}
