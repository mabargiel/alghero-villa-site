"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
type GalleryImageView = {
  key: string;
  altText: string;
  url: string;
  aspectRatio?: number;
};

type Props = {
  images: GalleryImageView[];
};

export default function GalleryClient({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const hasLightbox = activeIndex !== null;
  const activeImage = useMemo(
    () => (activeIndex === null ? null : images[activeIndex]),
    [activeIndex, images],
  );
  const nextImage = useMemo(
    () => (nextIndex === null ? null : images[nextIndex]),
    [nextIndex, images],
  );

  function openLightbox(index: number) {
    setActiveIndex(index);
  }

  function closeLightbox() {
    setActiveIndex(null);
    setNextIndex(null);
    setIsTransitioning(false);
  }

  const showImage = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= images.length || isTransitioning) {
        return;
      }
      setNextIndex(targetIndex);
      setIsTransitioning(true);
      window.setTimeout(() => {
        setActiveIndex(targetIndex);
        setNextIndex(null);
        setIsTransitioning(false);
      }, 220);
    },
    [images, isTransitioning],
  );

  const showNext = useCallback(() => {
    if (activeIndex === null) return;
    showImage((activeIndex + 1) % images.length);
  }, [activeIndex, images, showImage]);

  const showPrev = useCallback(() => {
    if (activeIndex === null) return;
    showImage((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images, showImage]);

  useEffect(() => {
    if (!hasLightbox) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasLightbox, activeIndex, showNext, showPrev]);

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
        {images.map((image, index) => {
          return (
            <figure
              key={image.key}
              className="group mb-3 break-inside-avoid overflow-hidden rounded-xl border border-[var(--surface)] bg-white shadow-sm transition hover:shadow-md"
            >
              <button
                className="block w-full text-left"
                type="button"
                onClick={() => openLightbox(index)}
                aria-label="Open image"
              >
                <div
                  className="w-full bg-[var(--surface)]"
                  style={
                    image.aspectRatio
                      ? { aspectRatio: image.aspectRatio }
                      : undefined
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.altText}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.01]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </button>
            </figure>
          );
        })}
      </div>

      {hasLightbox && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-10 text-white"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          onTouchStart={(event) => {
            setTouchStartX(event.touches[0]?.clientX ?? null);
          }}
          onTouchEnd={(event) => {
            if (touchStartX === null) return;
            const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
            const deltaX = touchEndX - touchStartX;
            if (deltaX > 50) showPrev();
            if (deltaX < -50) showNext();
            setTouchStartX(null);
          }}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative mx-auto flex max-h-[80vh] items-center justify-center">
              {/* Active image */}
              <div
                className={`transition-opacity duration-200 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage.url}
                  alt={activeImage.altText}
                  className="max-h-[80vh] w-auto rounded-2xl"
                />
              </div>

              {/* Next image for cross-fade */}
              {nextImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={nextImage.url}
                    alt={nextImage.altText}
                    className={`max-h-[80vh] w-auto rounded-2xl transition-opacity duration-200 ${
                      isTransitioning ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              )}
            </div>

            <button
              className="absolute top-1/2 left-0 -translate-y-1/2 rounded-lg bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
              type="button"
              onClick={showPrev}
            >
              ←
            </button>
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 rounded-lg bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
              type="button"
              onClick={showNext}
            >
              →
            </button>
            <button
              className="absolute top-0 right-0 rounded-lg bg-white/10 px-3 py-1 text-sm transition hover:bg-white/20"
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
