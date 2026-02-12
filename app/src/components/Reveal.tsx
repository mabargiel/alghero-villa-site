"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!("matchMedia" in window)) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
