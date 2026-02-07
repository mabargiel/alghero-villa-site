const sectionImages = {
  hero: ["dom z zew -najlepsze/1.png", "dom z zew -najlepsze/4.png"],
  garden: ["dom z zew -najlepsze/16.png", "dom z zew -najlepsze/20.png"],
  interiors: ["salon-najlepsze/17.jpg", "salon-najlepsze/23.jpg"],
  location: ["plaża1.JPG", "zachód słońca2.jpeg", "zatoka1.JPG"],
};

const highlights = [
  "Prywatna posiadłość na terenie ok. 1 hektara",
  "6 sypialni dwuosobowych z prywatnymi łazienkami",
  "Klimatyzacja w całym obiekcie",
  "Tarasy i bezpośrednie wyjścia na zewnątrz",
  "Strefy wypoczynku i biesiadowania na świeżym powietrzu",
  "Blisko miasta, portu, plaż i lotniska",
];

const amenities = [
  "Altana z letnią kuchnią i dużym stołem",
  "Zadaszona weranda z panoramicznym widokiem",
  "Wielofunkcyjne boisko",
  "Rozległe trawniki i śródziemnomorska zieleń",
  "Prywatny parking",
];

function SectionPlaceholder({
  label,
  files,
}: {
  label: string;
  files: string[];
}) {
  return (
    <div className="rounded-2xl border border-[var(--surface)] bg-[var(--surface)] p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
        {label}
      </p>
      <ul className="mt-4 space-y-1 text-sm text-[var(--muted)]">
        {files.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative min-h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[var(--surface-strong)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl items-center px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Villa Monte Calvia — Alghero
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Twój prywatny azyl wśród oliwek i śródziemnomorskiej zieleni
            </h1>
            <p className="mt-4 text-base text-[var(--muted)] md:text-lg">
              Przestronna, dwukondygnacyjna rezydencja u podnóża góry Calvia łączy
              elegancję z wygodą nowoczesnego domu. Cisza, przestrzeń i klimat
              Sardynii — zaledwie kilka minut od Alghero.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
                href="/contact"
              >
                Sprawdź dostępność
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Najważniejsze atuty
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-[var(--surface)] bg-white px-4 py-3 text-sm text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Nieruchomość</h2>
            <p className="mt-4 text-[var(--muted)]">
              Willa znajduje się na prywatnym, starannie zagospodarowanym terenie
              otoczonym śródziemnomorską roślinnością. To miejsce stworzone do
              wypoczynku w rytmie „slow”: poranna kawa na tarasie, długie posiłki
              w ogrodzie i cisza z dala od tłumów — bez rezygnowania z bliskości
              Alghero.
            </p>
          </div>
          <SectionPlaceholder label="Garden images" files={sectionImages.garden} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <SectionPlaceholder
            label="Interiors images"
            files={sectionImages.interiors}
          />
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Wnętrza</h2>
            <p className="mt-4 text-[var(--muted)]">
              Komfortowe, dopracowane wnętrza zapewniają prywatność, wygodę i
              przestrzeń do wspólnego spędzania czasu. Do dyspozycji jest 6
              sypialni z prywatnymi łazienkami, salon z aneksem kuchennym,
              pralnia oraz klimatyzacja w całym obiekcie.
            </p>
            <a
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
              href="/gallery"
            >
              Zobacz wnętrza w galerii →
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Ogród i tarasy</h2>
            <p className="mt-4 text-[var(--muted)]">
              Ogromny ogród jest sercem Villa Monte Calvia. Zadaszona weranda,
              altana z letnią kuchnią, strefy relaksu i wielofunkcyjne boisko
              tworzą przestrzeń na wspólne posiłki, zabawy dzieci i długie
              wieczory na świeżym powietrzu.
            </p>
          </div>
          <SectionPlaceholder label="Outdoor images" files={sectionImages.garden} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <SectionPlaceholder label="Location images" files={sectionImages.location} />
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Lokalizacja</h2>
            <p className="mt-4 text-[var(--muted)]">
              Villa Monte Calvia zapewnia spokój i prywatność, a jednocześnie
              pozwala w kilka minut dotrzeć do centrum Alghero, plaż, zatok oraz
              lotniska (ok. 15 minut).
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>Centrum Alghero i port</li>
              <li>Liczne plaże i malownicze zatoki</li>
              <li>Zabytki i atrakcje archeologiczne</li>
              <li>Sklepy, kawiarnie i restauracje</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Udogodnienia</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {amenities.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-[var(--surface)] bg-white px-4 py-3 text-sm text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl bg-[var(--surface)] p-10 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Zapraszamy do Villa Monte Calvia
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
            Idealny wybór dla rodzin i grup przyjaciół, które cenią przestrzeń,
            prywatność i śródziemnomorski styl życia.
          </p>
          <a
            className="mt-6 inline-flex rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            href="/contact"
          >
            Skontaktuj się z nami
          </a>
        </div>
      </section>
    </main>
  );
}
