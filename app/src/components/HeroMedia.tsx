"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type HeroImage = {
  altText: string;
  url: string;
};

type HeroMediaProps = {
  images: HeroImage[];
};

const ROTATE_MS = 6000;

export default function HeroMedia({ images }: HeroMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = useMemo(
    () => images.filter((image) => image.url),
    [images],
  );

  useEffect(() => {
    if (prefersReducedMotion || safeImages.length <= 1) {
      return;
    }
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeImages.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, safeImages.length]);

  if (safeImages.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      {safeImages.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image.url})` }}
          aria-hidden={index !== activeIndex}
        />
      ))}
      <span className="sr-only">{safeImages[activeIndex]?.altText}</span>
    </div>
  );
}
