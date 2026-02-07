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

      <form className="grid gap-6 rounded-3xl border border-[var(--surface)] bg-white/70 p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
            Imię i nazwisko *
            <input
              className="rounded-2xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
              name="name"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
            Email *
            <input
              className="rounded-2xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
              name="email"
              type="email"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
            Telefon
            <input
              className="rounded-2xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
              name="phone"
              type="tel"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
            Liczba gości
            <input
              className="rounded-2xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
              name="guests"
              type="number"
              min={1}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
            Data przyjazdu
            <input
              className="rounded-2xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
              name="dateFrom"
              type="date"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
            Data wyjazdu
            <input
              className="rounded-2xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
              name="dateTo"
              type="date"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
          Wiadomość
          <textarea
            className="min-h-[140px] rounded-2xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
            name="message"
          />
        </label>

        <button
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
          type="submit"
        >
          Wyślij zapytanie
        </button>
      </form>
    </main>
  );
}
