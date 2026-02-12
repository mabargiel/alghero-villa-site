import ContactForm from "@/components/ContactForm";
import { Facebook, Instagram, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 pt-28 pb-16">
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

      <div className="mb-6 flex items-center gap-4 text-[var(--accent-strong)]">
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <Facebook className="h-5 w-5" strokeWidth={1.6} />
          Facebook
        </a>
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" strokeWidth={1.6} />
          Instagram
        </a>
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href="https://www.google.com/search?sca_esv=01e84e26bfa42c3c&hl=pl&authuser=0&sxsrf=ANbL-n6NmWfmS8WlWdzEkLpDLwXNZkgpwA:1770480521981&kgmid=/g/11yy4gd_gs&q=Villa+Monte+Calvia&shndl=30&source=sh/x/loc/uni/m1/1&kgs=16a3d798bec3e108&shem=shrtsdl&utm_source=shrtsdl,sh/x/loc/uni/m1/1"
          target="_blank"
          rel="noreferrer"
          aria-label="Google"
        >
          <MapPin className="h-5 w-5" strokeWidth={1.6} />
          Google
        </a>
      </div>

      <ContactForm />
    </main>
  );
}
