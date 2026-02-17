import AreaHighlights from "@/components/AreaHighlights";
import HeroMedia from "@/components/HeroMedia";
import LucideIcon from "@/components/LucideIcon";
import Reveal from "@/components/Reveal";
import { urlFor } from "@/lib/sanity/image";
import type { HomeSection } from "@/lib/sanity/queries";
import {
  getAreaHighlights,
  getHero,
  getHomeSections,
  getMiniGallery,
} from "@/lib/sanity/queries";
import Image from "next/image";

const amenities = [
  { label: "Klimatyzacja w całym domu", iconKey: "climate" },
  { label: "Prywatny parking", iconKey: "parking" },
  { label: "W pełni wyposażona kuchnia", iconKey: "kitchen" },
  { label: "Łazienki en-suite", iconKey: "bathroom" },
  { label: "Samochód do dyspozycji", iconKey: "car-rental" },
  { label: "Kostkarka do lodu", iconKey: "ice-maker" },
];

function SectionImage({ altText, url }: { altText: string; url: string }) {
  return (
    <div className="group relative h-[260px] overflow-hidden rounded-lg bg-[var(--surface)] shadow-[0_25px_55px_-35px_rgba(20,20,20,0.5)] md:h-[320px] lg:h-[380px]">
      <Image
        src={url}
        alt={altText}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-[1.02]"
        loading="lazy"
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80 transition duration-700 group-hover:opacity-60" />
    </div>
  );
}

export default async function HomePage() {
  const [hero, sections, miniGallery, areaHighlights] = await Promise.all([
    getHero(),
    getHomeSections(),
    getMiniGallery(),
    getAreaHighlights(),
  ]);
  const sectionMap = new Map<HomeSection["sectionKey"], HomeSection["image"]>(
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
  const sectionImage = (key: HomeSection["sectionKey"]) => {
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
  const areaHighlightImages =
    areaHighlights?.images?.map((image) => ({
      altText: image.altText,
      url: urlFor(image.image).width(800).quality(85).auto("format").url(),
    })) ?? [];
  const miniGalleryImages =
    miniGallery?.images?.slice(0, 5).map((image) => ({
      key: image._key,
      altText: "",
      url: urlFor(image).width(1200).quality(85).auto("format").url(),
    })) ?? [];
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="hero-shell relative min-h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[var(--deep-olive)]" />
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
        <div id="highlights" className="mx-auto max-w-6xl px-6 pt-16 pb-4 text-center">
          <Image
            src="/divider.svg"
            alt=""
            width={480}
            height={88}
            className="mx-auto mb-6 h-12 w-auto fill-[var(--accent)]"
          />
        </div>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Strefy willi
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
          <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
            Odkryj przestrzenie stworzone do wypoczynku
          </p>
          <AreaHighlights images={areaHighlightImages} />
        </section>
      </Reveal>

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
                Villa Monte Calvia to prywatna rezydencja na rozległym terenie,
                otoczona śródziemnomorską roślinnością. Zapewnia spokój i
                przestrzeń na wypoczynek w rytmie „slow”, a jednocześnie
                pozostaje blisko Alghero.
              </p>
              <a
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
                href="/interiors"
              >
                Zobacz wnętrza →
              </a>
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
                Wnętrza łączą elegancję z wygodą codziennego życia. Znajdziesz
                tu 6 sypialni z łazienkami, przestronny salon z aneksem
                kuchennym i strefy wspólne idealne do odpoczynku.
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
                  className="mini-gallery-item relative aspect-[4/3] w-full overflow-hidden"
                  style={{
                    transitionDelay: `${index * 90}ms`,
                  }}
                >
                  <Image
                    src={image.url}
                    alt={image.altText}
                    fill
                    sizes="20vw"
                    className="object-cover"
                    loading="lazy"
                    decoding="async"
                  />
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
                Ogród i tarasy
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
                Zadaszona weranda i strefy relaksu wśród zieleni
              </p>
              <p className="mt-4 text-[var(--muted)]">
                Ogród to serce posiadłości: zadaszona weranda, altana z letnią
                kuchnią i strefy relaksu pozwalają spędzać całe dnie na
                zewnątrz. Wieczory sprzyjają wspólnym kolacjom i spokojnym
                chwilom wśród zieleni.
              </p>
              <a
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
                href="/location"
              >
                Poznaj okolicę →
              </a>
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
                Willa gwarantuje ciszę, a jednocześnie umożliwia szybki dojazd
                do centrum Alghero, portu, plaż i lotniska (ok. 15 minut). To
                idealny punkt wypadowy do odkrywania zachodniej Sardynii.
              </p>
              <ul className="mt-5 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
                <li className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                  <LucideIcon
                    name="port"
                    className="h-4 w-4 text-[var(--accent)]"
                  />
                  Centrum Alghero i port
                </li>
                <li className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                  <LucideIcon
                    name="beach"
                    className="h-4 w-4 text-[var(--accent)]"
                  />
                  Liczne plaże i malownicze zatoki
                </li>
                <li className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                  <LucideIcon
                    name="heritage"
                    className="h-4 w-4 text-[var(--accent)]"
                  />
                  Zabytki i atrakcje archeologiczne
                </li>
                <li className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                  <LucideIcon
                    name="cafe"
                    className="h-4 w-4 text-[var(--accent)]"
                  />
                  Sklepy, kawiarnie i restauracje
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">Udogodnienia</h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
          <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
            Najważniejsze atuty w jednym miejscu
          </p>
          <div className="mt-10 grid grid-cols-3 items-start gap-6 text-center md:grid-cols-6 md:gap-4">
            {amenities.map((item, index) => (
              <div
                key={item.label}
                className="amenity-item flex min-w-0 flex-col items-center gap-3"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_rgba(72,104,90,0.2),_0_10px_18px_-12px_rgba(72,104,90,0.55),_0_20px_40px_-18px_rgba(0,0,0,0.6)]">
                  <LucideIcon
                    name={item.iconKey}
                    className="h-5 w-5 text-[var(--accent-strong)] md:h-6 md:w-6"
                  />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.14em] text-[var(--foreground)] uppercase sm:text-[11px] md:text-xs">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-xl bg-[#e3d8c8] p-10 text-center shadow-[0_6px_16px_-10px_rgba(20,20,20,0.28),_0_22px_45px_-28px_rgba(20,20,20,0.4)]">
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
