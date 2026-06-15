"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  // If the URL hash matches this id on initial mount, Reveal starts visible
  // — the user is deep-linking into this section, so skip the fade-in animation
  // that would otherwise fight the anchor scroll.
  anchorId?: string;
};

export default function Reveal({ children, className, anchorId }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!("matchMedia" in window)) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
    if (anchorId && window.location.hash.slice(1) === anchorId) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  const classes = ["reveal", isVisible ? "reveal-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
