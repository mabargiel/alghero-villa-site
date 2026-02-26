import AreaHighlights from "@/components/AreaHighlights";
import BookingBar from "@/components/BookingBar";
import HeroMedia from "@/components/HeroMedia";
import LucideIcon from "@/components/LucideIcon";
import Reveal from "@/components/Reveal";
import CheckAvailabilityButton from "@/components/CheckAvailabilityButton";
import { urlFor } from "@/lib/sanity/image";
import type { HomeSection } from "@/lib/sanity/queries";
import {
  getAreaHighlights,
  getHero,
  getHomeSections,
  getMiniGallery,
  getPricingConfig,
} from "@/lib/sanity/queries";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const amenityIconKeys = [
  "climate",
  "parking",
  "kitchen",
  "bathroom",
  "car-rental",
  "ice-maker",
];

function SectionImage({
  altText,
  url,
}: Readonly<{ altText: string; url: string }>) {
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
  const [hero, sections, miniGallery, areaHighlights, pricingConfig] =
    await Promise.all([
      getHero(),
      getHomeSections(),
      getMiniGallery(),
      getAreaHighlights(),
      getPricingConfig(),
    ]);
  const t = await getTranslations("home");
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
  const heroVideoUrl = hero?.video?.asset?.url ?? hero?.videoUrl;
  const heroVideoUrlLight = hero?.videoLight?.asset?.url;
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

  const amenityLabels = [
    t("amenity1"),
    t("amenity2"),
    t("amenity3"),
    t("amenity4"),
    t("amenity5"),
    t("amenity6"),
  ];

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="hero-shell relative min-h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[var(--deep-olive)]" />
        <div className="pointer-events-none absolute inset-0">
          <HeroMedia
            images={heroImages}
            mobileImage={heroMobileImage}
            videoUrl={heroVideoUrl}
            videoUrlLight={heroVideoUrlLight}
          />
        </div>
        {heroVideoUrl ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-black/75 md:hidden" />
            <div className="pointer-events-none absolute inset-0 hidden bg-black/40 md:block" />
          </>
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-black/80" />
        )}
        <div
          className="hero-motion pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-28 pb-32 text-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs tracking-[0.3em] text-[var(--foreground)] uppercase shadow-md">
              {t("heroBadge")}
            </div>
            <h1 className="hero-text-shadow mt-6 text-4xl leading-tight font-bold tracking-wide text-white md:text-5xl">
              <span className="md:hidden">{t("heroHeadlineMobile")}</span>
              <span className="hidden md:inline">{t("heroHeadline")}</span>
            </h1>
          </div>
        </div>
        {pricingConfig && (
          <div className="absolute right-0 bottom-[18vh] left-0 z-10 px-6">
            <BookingBar config={pricingConfig} />
          </div>
        )}
        <a
          className="hero-scroll-indicator absolute top-[85vh] right-0 left-0 flex justify-center text-xs tracking-[0.3em] text-white uppercase"
          href="#highlights"
          aria-label={t("scrollAria")}
        >
          <span className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold">
              {t("scrollLabel")}
            </span>
            <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/80 bg-black/30">
              <span className="mt-2 h-2 w-2 rounded-full bg-white" />
            </span>
          </span>
        </a>
      </section>

      <Reveal>
        <div
          id="highlights"
          className="mx-auto max-w-6xl px-6 pt-16 pb-4 text-center"
        >
          <Image
            src="/divider.svg"
            alt=""
            width={480}
            height={88}
            className="mx-auto mb-6 h-12 w-auto fill-[var(--brand)]"
          />
        </div>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Villa Monte Calvia
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[var(--accent-warm)]" />
          <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
            {t("discoverSubtitle")}
          </p>
          <AreaHighlights images={areaHighlightImages} />
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div className="order-1 md:order-none">
              <h2 className="text-2xl font-semibold md:text-3xl">
                {t("villaTitle")}
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent-warm)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
                {t("villaSubtitle")}
              </p>
              <p className="mt-4 text-[var(--muted)]">
                {t("villaDescription")}
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-sky)]"
                href="/villa"
              >
                {t("villaLink")}
              </Link>
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
              <h2 className="text-2xl font-semibold md:text-3xl">
                {t("interiorsTitle")}
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent-warm)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
                {t("interiorsSubtitle")}
              </p>
              <p className="mt-4 text-[var(--muted)]">
                {t("interiorsDescription")}
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-sky)]"
                href="/villa"
              >
                {t("interiorsLink")}
              </Link>
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
                {t("gardenTitle")}
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent-warm)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
                {t("gardenSubtitle")}
              </p>
              <p className="mt-4 text-[var(--muted)]">
                {t("gardenDescription")}
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-sky)]"
                href="/location"
              >
                {t("gardenLink")}
              </Link>
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
                {t("locationTitle")}
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent-warm)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
                {t("locationSubtitle")}
              </p>
              <p className="mt-4 text-[var(--muted)]">
                {t("locationDescription")}
              </p>
              <ul className="mt-5 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
                <li className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                  <LucideIcon
                    name="port"
                    className="h-4 w-4 text-[var(--brand)]"
                  />
                  {t("locationItem1")}
                </li>
                <li className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                  <LucideIcon
                    name="beach"
                    className="h-4 w-4 text-[var(--brand)]"
                  />
                  {t("locationItem2")}
                </li>
                <li className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                  <LucideIcon
                    name="heritage"
                    className="h-4 w-4 text-[var(--brand)]"
                  />
                  {t("locationItem3")}
                </li>
                <li className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                  <LucideIcon
                    name="cafe"
                    className="h-4 w-4 text-[var(--brand)]"
                  />
                  {t("locationItem4")}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-16 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">
            {t("amenitiesTitle")}
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[var(--accent-warm)]" />
          <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
            {t("amenitiesSubtitle")}
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 items-start gap-x-8 gap-y-10 text-center">
            {amenityIconKeys.map((iconKey, index) => (
              <div
                key={iconKey}
                className="amenity-item flex min-w-0 flex-col items-center gap-3"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_var(--shadow-brand),_0_10px_18px_-12px_var(--shadow-brand-strong),_0_20px_40px_-18px_rgba(0,0,0,0.6)]">
                  <LucideIcon
                    name={iconKey}
                    className="h-7 w-7 text-[var(--brand)]"
                  />
                </div>
                <span className="text-xs font-semibold tracking-[0.14em] text-[var(--foreground)] uppercase">
                  {amenityLabels[index]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="bg-surface-strong rounded-xl p-10 text-center shadow-[0_6px_16px_-10px_rgba(20,20,20,0.28),_0_22px_45px_-28px_rgba(20,20,20,0.4)]">
            <h2 className="text-2xl font-semibold md:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
              {t("ctaDescription")}
            </p>
            <CheckAvailabilityButton className="mt-6 inline-flex rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-12px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_22px_50px_-16px_var(--shadow-brand-strong)]" />
          </div>
        </section>
      </Reveal>
    </main>
  );
}
