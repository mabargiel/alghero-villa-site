import HeroMedia from "@/components/HeroMedia";
import Reveal from "@/components/Reveal";
import { urlFor } from "@/lib/sanity/image";
import { getHero, getHomeSections, getMiniGallery } from "@/lib/sanity/queries";

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

function SectionImage({
  altText,
  url,
}: {
  altText: string;
  url: string;
}) {
  return (
    <div className="group relative h-[260px] overflow-hidden rounded-lg bg-[var(--surface)] shadow-[0_25px_55px_-35px_rgba(20,20,20,0.5)] md:h-[320px] lg:h-[380px]">
      <img
        src={url}
        alt={altText}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
        loading="lazy"
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80 transition duration-700 group-hover:opacity-60" />
    </div>
  );
}

export default async function HomePage() {
  const [hero, sections, miniGallery] = await Promise.all([
    getHero(),
    getHomeSections(),
    getMiniGallery(),
  ]);
  const sectionMap = new Map(
    (sections ?? []).map((section) => [section.sectionKey, section.image]),
  );
  const heroImages =
    hero?.images?.map((image) => ({
      altText: image.altText,
      url: urlFor(image.image).width(2200).quality(85).auto("format").url(),
    })) ?? [];
  const heroMobileImage = hero?.mobileImage
    ? {
        altText: hero.mobileImage.altText,
        url: urlFor(hero.mobileImage.image)
          .width(1400)
          .quality(85)
          .auto("format")
          .url(),
      }
    : undefined;
  const sectionImage = (key: string) => {
    const image = sectionMap.get(key);
    if (!image) {
      return null;
    }
    return {
      altText: image.altText,
      url: urlFor(image.image).width(1400).quality(85).auto("format").url(),
    };
  };
  const propertyImage = sectionImage("property");
  const interiorsImage = sectionImage("interiors");
  const gardenImage = sectionImage("garden");
  const locationImage = sectionImage("location");
  const miniGalleryImages =
    miniGallery?.images?.slice(0, 5).map((image) => ({
      key: image._key,
      altText: "",
      url: urlFor(image).width(1200).quality(85).auto("format").url(),
    })) ?? [];
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[var(--surface-strong)]" />
        <div className="pointer-events-none absolute inset-0">
          <HeroMedia
            images={heroImages}
            mobileImage={heroMobileImage}
            videoUrl={hero?.videoUrl}
          />
        </div>
        {hero?.videoUrl ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-black/70 md:hidden" />
            <div className="pointer-events-none absolute inset-0 hidden bg-black/35 md:block" />
          </>
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-black/75" />
        )}
        <div
          className="hero-motion pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-28 pb-20">
          <div className="max-w-2xl text-center md:text-left">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs tracking-[0.3em] text-[var(--foreground)] uppercase md:mx-0">
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
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                className="rounded-xl bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.75)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_55px_-30px_rgba(0,0,0,0.8)]"
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

      {miniGalleryImages.length === 5 ? (
        <Reveal>
          <section className="relative hidden w-screen px-0 pb-16 md:block">
            <div
              className="grid w-full items-center gap-1 px-0"
              style={{
                gridTemplateColumns: "1fr 1fr 1.15fr 1fr 1fr",
              }}
            >
              {miniGalleryImages.map((image, index) => (
                <div
                  key={image.key}
                  className="mini-gallery-item relative"
                  style={{
                    transitionDelay: `${index * 90}ms`,
                  }}
                >
                  <div className="w-full overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.altText}
                      className="aspect-[4/3] h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div className="order-1 md:order-none">
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
            {propertyImage ? (
              <div className="order-2 md:order-none">
                <SectionImage {...propertyImage} />
              </div>
            ) : null}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            {interiorsImage ? (
              <div className="order-2 md:order-none">
                <SectionImage {...interiorsImage} />
              </div>
            ) : null}
            <div className="order-1 md:order-none">
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
            <div className="order-1 md:order-none">
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
            {gardenImage ? (
              <div className="order-2 md:order-none">
                <SectionImage {...gardenImage} />
              </div>
            ) : null}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            {locationImage ? (
              <div className="order-2 md:order-none">
                <SectionImage {...locationImage} />
              </div>
            ) : null}
            <div className="order-1 md:order-none">
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
          <div className="rounded-xl bg-[var(--surface-strong)] p-10 text-center shadow-[0_22px_50px_-32px_rgba(20,20,20,0.5)]">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Zapraszamy do Villa Monte Calvia
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
              Idealny wybór dla rodzin i grup przyjaciół, które cenią
              przestrzeń, prywatność i śródziemnomorski styl życia.
            </p>
            <a
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-22px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-28px_rgba(0,0,0,0.75)]"
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
