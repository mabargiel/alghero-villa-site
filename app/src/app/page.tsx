import HeroMedia from "@/components/HeroMedia";
import Reveal from "@/components/Reveal";
import { urlFor } from "@/lib/sanity/image";
import { getGallery } from "@/lib/sanity/queries";

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
      <p className="text-sm tracking-[0.2em] text-[var(--muted)] uppercase">
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

export default async function HomePage() {
  const gallery = await getGallery();
  const heroImages =
    gallery?.heroImages?.map((image) => ({
      altText: image.altText,
      url: urlFor(image.image).width(2000).quality(85).auto("format").url(),
    })) ?? [];
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[var(--surface-strong)]" />
        <div className="pointer-events-none absolute inset-0">
          <HeroMedia images={heroImages} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/45" />
        <div
          className="hero-motion pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-28 pb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs tracking-[0.3em] text-[var(--foreground)] uppercase">
              Villa Monte Calvia — Alghero
            </div>
            <h1 className="hero-text-shadow mt-6 text-4xl leading-tight font-semibold text-white md:text-5xl">
              <span className="md:hidden">Prywatny azyl wśród oliwek</span>
              <span className="hidden md:inline">
                Twój prywatny azyl wśród oliwek i śródziemnomorskiej zieleni
              </span>
            </h1>
            <p className="hero-text-shadow mt-4 text-base text-white/90 md:hidden">
              Elegancka willa blisko Alghero, cisza i natura w zasięgu ręki.
            </p>
            <p className="hero-text-shadow mt-4 hidden text-base text-white/90 md:block md:text-lg">
              Przestronna, dwukondygnacyjna rezydencja u podnóża góry Calvia
              łączy elegancję z wygodą nowoczesnego domu. Cisza, przestrzeń i
              klimat Sardynii — zaledwie kilka minut od Alghero.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-xl bg-[var(--accent-strong)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-[var(--accent)] hover:shadow-black/40"
                href="/contact"
              >
                Sprawdź dostępność
              </a>
            </div>
          </div>
        </div>
        <a
          className="hero-scroll-indicator absolute top-[85vh] right-0 left-0 flex justify-center text-xs tracking-[0.3em] text-white uppercase"
          href="#highlights"
          aria-label="Przewiń w dół"
        >
          <span className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold">Przewiń</span>
            <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/80 bg-black/30">
              <span className="mt-2 h-2 w-2 rounded-full bg-white" />
            </span>
          </span>
        </a>
      </section>

      <Reveal>
        <section id="highlights" className="mx-auto max-w-6xl px-6 pt-16 pb-16">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Najważniejsze atuty
          </h2>
          <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
          <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
            Komfort, przestrzeń i śródziemnomorska natura w jednym miejscu
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-[var(--surface)] bg-white px-4 py-3 text-sm text-[var(--muted)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Nieruchomość
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
                Prywatna posiadłość na terenie ok. 1 hektara
              </p>
              <p className="mt-4 text-[var(--muted)]">
                Willa znajduje się na prywatnym, starannie zagospodarowanym
                terenie otoczonym śródziemnomorską roślinnością. To miejsce
                stworzone do wypoczynku w rytmie „slow”: poranna kawa na
                tarasie, długie posiłki w ogrodzie i cisza z dala od tłumów —
                bez rezygnowania z bliskości Alghero.
              </p>
            </div>
            <SectionPlaceholder
              label="Garden images"
              files={sectionImages.garden}
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <SectionPlaceholder
              label="Interiors images"
              files={sectionImages.interiors}
            />
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">Wnętrza</h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
                6 komfortowych sypialni z prywatnymi łazienkami
              </p>
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
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Ogród i tarasy
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
                Zadaszona weranda i strefy relaksu wśród zieleni
              </p>
              <p className="mt-4 text-[var(--muted)]">
                Ogromny ogród jest sercem Villa Monte Calvia. Zadaszona weranda,
                altana z letnią kuchnią, strefy relaksu i wielofunkcyjne boisko
                tworzą przestrzeń na wspólne posiłki, zabawy dzieci i długie
                wieczory na świeżym powietrzu.
              </p>
            </div>
            <SectionPlaceholder
              label="Outdoor images"
              files={sectionImages.garden}
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <SectionPlaceholder
              label="Location images"
              files={sectionImages.location}
            />
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Lokalizacja
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
                15 minut do lotniska, plaż i zabytków Alghero
              </p>
              <p className="mt-4 text-[var(--muted)]">
                Villa Monte Calvia zapewnia spokój i prywatność, a jednocześnie
                pozwala w kilka minut dotrzeć do centrum Alghero, plaż, zatok
                oraz lotniska (ok. 15 minut).
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
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl font-semibold md:text-3xl">Udogodnienia</h2>
          <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
          <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
            Wszystko na miejscu, bez kompromisów
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {amenities.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-[var(--surface)] bg-white px-4 py-3 text-sm text-[var(--muted)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-2xl bg-[var(--surface)] p-10 text-center">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Zapraszamy do Villa Monte Calvia
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
              Idealny wybór dla rodzin i grup przyjaciół, które cenią
              przestrzeń, prywatność i śródziemnomorski styl życia.
            </p>
            <a
              className="mt-6 inline-flex rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
              href="/contact"
            >
              Skontaktuj się z nami
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
