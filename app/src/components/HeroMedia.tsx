"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";

type HeroImage = {
  altText: string;
  url: string;
};

type HeroMediaProps = {
  images: HeroImage[];
  mobileImage?: HeroImage;
  videoUrl?: string;
  videoUrlLight?: string;
};

const ROTATE_MS = 6000;

function useConnectionAwareVideoUrl(
  videoUrl?: string,
  videoUrlLight?: string,
): string | undefined {
  return useMemo(() => {
    if (typeof navigator === "undefined" || !videoUrlLight) return videoUrl;
    const connection = (
      navigator as Navigator & { connection?: { effectiveType?: string } }
    ).connection;
    if (!connection?.effectiveType) return videoUrl;
    const slow = ["slow-2g", "2g", "3g"].includes(connection.effectiveType);
    return slow ? videoUrlLight : videoUrl;
  }, [videoUrl, videoUrlLight]);
}

export default function HeroMedia({
  images,
  mobileImage,
  videoUrl,
  videoUrlLight,
}: HeroMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const resolvedVideoUrl = useConnectionAwareVideoUrl(videoUrl, videoUrlLight);

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
  const canPlayVideo = Boolean(resolvedVideoUrl) && !prefersReducedMotion;
  const shouldPlayVideo = canPlayVideo && !hasVideoError;

  useEffect(() => {
    if (!canRotate) {
      return;
    }
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeImages.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [canRotate, safeImages.length]);

  if (!fallbackImage && safeImages.length === 0 && !resolvedVideoUrl) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <div className="hidden h-full w-full md:block">
        {shouldPlayVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setHasVideoError(true)}
          >
            <source src={resolvedVideoUrl} type="video/mp4" />
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
          <Image
            src={fallbackImage.url}
            alt={fallbackImage.altText}
            fill
            sizes="100vw"
            className="object-cover"
            loading="eager"
            decoding="async"
          />
        ) : null}
      </div>
    </div>
  );
}
