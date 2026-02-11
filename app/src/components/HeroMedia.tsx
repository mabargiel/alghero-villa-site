"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type HeroImage = {
  altText: string;
  url: string;
};

type HeroMediaProps = {
  images: HeroImage[];
  mobileImage?: HeroImage;
  videoUrl?: string;
};

const ROTATE_MS = 6000;

export default function HeroMedia({
  images,
  mobileImage,
  videoUrl,
}: HeroMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = useMemo(
    () => images.filter((image) => image.url),
    [images],
  );

  const fallbackImage = mobileImage?.url
    ? mobileImage
    : safeImages[0]
      ? safeImages[0]
      : undefined;

  const canRotate = !prefersReducedMotion && safeImages.length > 1;
  const canPlayVideo = Boolean(videoUrl) && !prefersReducedMotion;

  useEffect(() => {
    if (!canRotate) {
      return;
    }
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeImages.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [canRotate, safeImages.length]);

  if (!fallbackImage && safeImages.length === 0 && !videoUrl) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <div className="hidden h-full w-full md:block">
        {canPlayVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={mobileImage?.url}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          safeImages.map((image, index) => (
            <div
              key={image.url}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${image.url})` }}
              aria-hidden={index !== activeIndex}
            />
          ))
        )}
        <span className="sr-only">
          {safeImages[activeIndex]?.altText || fallbackImage?.altText}
        </span>
      </div>
      <div className="absolute inset-0 block md:hidden">
        {fallbackImage ? (
          <img
            src={fallbackImage.url}
            alt={fallbackImage.altText}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        ) : null}
      </div>
    </div>
  );
}
