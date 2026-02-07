import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 pt-28 pb-16">
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

      <div className="mb-6 flex items-center gap-4 text-[var(--accent-strong)]">
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13.5 9.5V7.2c0-.7.4-1.1 1.1-1.1h1.7V4h-2.3C11.8 4 11 5.1 11 6.8v2.7H9v2.6h2v7.9h2.5v-7.9h2.2l.4-2.6h-2.6Z" />
          </svg>
          Facebook
        </a>
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.5 7.5h.01M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm6.5-.6a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z" />
          </svg>
          Instagram
        </a>
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href="https://www.google.com/search?sca_esv=01e84e26bfa42c3c&hl=pl&authuser=0&sxsrf=ANbL-n6NmWfmS8WlWdzEkLpDLwXNZkgpwA:1770480521981&kgmid=/g/11yy4gd_gs&q=Villa+Monte+Calvia&shndl=30&source=sh/x/loc/uni/m1/1&kgs=16a3d798bec3e108&shem=shrtsdl&utm_source=shrtsdl,sh/x/loc/uni/m1/1"
          target="_blank"
          rel="noreferrer"
          aria-label="Google"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 10.2v3.7h5.2c-.5 2.3-2.5 3.7-5.2 3.7a5.9 5.9 0 1 1 0-11.8c1.6 0 2.9.6 3.9 1.5l2.5-2.5A9.3 9.3 0 0 0 12 2.7a9.3 9.3 0 1 0 0 18.6c4.7 0 8.8-3.4 8.8-9.1 0-.6-.1-1.1-.2-2H12Z" />
          </svg>
          Google
        </a>
      </div>

      <ContactForm />
    </main>
  );
}
