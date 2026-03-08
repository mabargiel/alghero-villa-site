"use client";

import { useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LucideIcon from "@/components/LucideIcon";

type ImageData = {
  altText: string;
  url: string;
};

type VillaHeroNavProps = Readonly<{
  interiorsImage: ImageData | null;
  outdoorsImage: ImageData | null;
}>;

export default function VillaHeroNav({
  interiorsImage,
  outdoorsImage,
}: VillaHeroNavProps) {
  const t = useTranslations("villa");

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const cards = [
    {
      label: t("groupInteriors"),
      targetId: "salon",
      image: interiorsImage,
      icon: "living-room",
    },
    {
      label: t("groupOutdoors"),
      targetId: "ext-garden",
      image: outdoorsImage,
      icon: "outdoor",
    },
  ];

  const hasImages = interiorsImage && outdoorsImage;

  return (
    <div id="villa-hero-nav" className="mx-auto max-w-6xl px-6 pb-10">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <button
            key={card.targetId}
            onClick={() => scrollTo(card.targetId)}
            className="group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-strong)]"
            aria-label={card.label}
          >
            {/* Desktop: image card (md+), Mobile: button */}
            {hasImages && card.image ? (
              <div className="relative hidden aspect-[16/9] md:block">
                <Image
                  src={card.image.url}
                  alt={card.image.altText}
                  fill
                  sizes="(min-width: 1024px) 45vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <LucideIcon
                    name={card.icon}
                    className="h-8 w-8 text-white drop-shadow-lg lg:h-10 lg:w-10"
                    strokeWidth={1.4}
                  />
                  <span className="text-xl font-semibold text-white drop-shadow-lg md:text-2xl lg:text-3xl">
                    {card.label}
                  </span>
                </div>
              </div>
            ) : null}

            {/* Mobile fallback (or when no CMS images) */}
            <div
              className={`flex items-center justify-center gap-2 rounded-xl border border-[var(--surface-strong)] bg-white/60 px-4 py-5 transition-colors duration-200 group-hover:bg-white/80 ${hasImages ? "md:hidden" : ""}`}
            >
              <LucideIcon
                name={card.icon}
                className="h-4 w-4 text-[var(--brand)]"
              />
              <span className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
                {card.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
