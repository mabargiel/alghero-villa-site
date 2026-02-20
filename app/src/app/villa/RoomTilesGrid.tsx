"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import LucideIcon from "@/components/LucideIcon";

type RoomImage = {
  altText: string;
  url: string;
};

type Room = {
  key: string;
  title: string;
  description: string;
  coverImage: RoomImage | null;
  galleryImages: RoomImage[];
  amenities: string[];
};

const amenityLabels: Record<string, string> = {
  wifi: "WiFi",
  climate: "Klimatyzacja",
  crib: "Łóżeczko",
  "extra-bed": "Dostawka",
  bathroom: "Łazienka",
  lounger: "Leżak",
  kitchen: "Kuchnia",
  parking: "Parking",
  "ice-maker": "Kostkarka",
  "car-rental": "Samochód",
  "garden-furniture": "Meble ogrodowe",
};

type RoomTilesGridProps = Readonly<{
  rooms: Room[];
}>;

export default function RoomTilesGrid({ rooms }: RoomTilesGridProps) {
  // Lightbox state
  const [lightboxRoom, setLightboxRoom] = useState<Room | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const images = useMemo(
    () => lightboxRoom?.galleryImages ?? [],
    [lightboxRoom],
  );
  const activeImage = images[activeIndex] ?? null;
  const nextImage = nextIndex !== null ? (images[nextIndex] ?? null) : null;

  function openLightbox(room: Room) {
    setLightboxRoom(room);
    setActiveIndex(0);
  }

  function closeLightbox() {
    setLightboxRoom(null);
    setActiveIndex(0);
    setNextIndex(null);
    setIsTransitioning(false);
  }

  const showImage = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= images.length || isTransitioning)
        return;
      setNextIndex(targetIndex);
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(targetIndex);
        setNextIndex(null);
        setIsTransitioning(false);
      }, 220);
    },
    [images, isTransitioning],
  );

  const showNext = useCallback(() => {
    showImage((activeIndex + 1) % images.length);
  }, [activeIndex, images, showImage]);

  const showPrev = useCallback(() => {
    showImage((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images, showImage]);

  useEffect(() => {
    if (!lightboxRoom) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxRoom, showNext, showPrev]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {rooms.map((room) => (
          <button
            key={room.key}
            onClick={() => room.galleryImages.length > 0 && openLightbox(room)}
            className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md"
          >
            {/* Cover photo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {room.coverImage ? (
                <Image
                  src={room.coverImage.url}
                  alt={room.coverImage.altText || room.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--surface)]" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <span className="text-xs font-semibold tracking-[0.14em] text-white uppercase drop-shadow-lg sm:text-sm">
                  {room.title}
                </span>
              </div>
            </div>

            {/* Amenity strip */}
            {room.amenities.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2.5 md:px-4">
                {room.amenities.map((key) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 text-[10px] text-[var(--muted)] sm:text-xs"
                    title={amenityLabels[key] ?? key}
                  >
                    <LucideIcon
                      name={key}
                      className="h-3 w-3 text-[var(--accent-strong)] sm:h-3.5 sm:w-3.5"
                    />
                    <span className="hidden sm:inline">
                      {amenityLabels[key] ?? key}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxRoom && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria — ${lightboxRoom.title}`}
          onClick={closeLightbox}
          onTouchStart={(e) => setTouchStartX(e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const dx =
              (e.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
            if (dx > 50) showPrev();
            if (dx < -50) showNext();
            setTouchStartX(null);
          }}
        >
          <div
            className="relative mx-4 max-w-4xl rounded-2xl bg-white/80 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur-sm md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-sm text-[var(--foreground)] transition hover:bg-black/10"
              type="button"
              onClick={closeLightbox}
              aria-label="Zamknij"
            >
              ✕
            </button>

            {/* Room title */}
            <p className="mb-3 text-center text-xs font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
              {lightboxRoom.title}
              <span className="ml-2 font-normal tracking-normal normal-case opacity-60">
                {activeIndex + 1} / {images.length}
              </span>
            </p>

            <div className="relative mx-auto flex max-h-[70vh] items-center justify-center">
              {/* Active image */}
              <div
                className={`transition-opacity duration-200 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage.url}
                  alt={activeImage.altText || lightboxRoom.title}
                  className="max-h-[70vh] w-auto rounded-xl"
                />
              </div>

              {/* Next image for cross-fade */}
              {nextImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={nextImage.url}
                    alt={nextImage.altText || lightboxRoom.title}
                    className={`max-h-[70vh] w-auto rounded-xl transition-opacity duration-200 ${
                      isTransitioning ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              )}
            </div>

            {images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--foreground)] shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                  type="button"
                  onClick={showPrev}
                  aria-label="Poprzednie zdjęcie"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4L6 9l5 5" />
                  </svg>
                </button>
                <button
                  className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--foreground)] shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                  type="button"
                  onClick={showNext}
                  aria-label="Następne zdjęcie"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 4l5 5-5 5" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
