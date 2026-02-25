"use client";

import Script from "next/script";
import { useConsent } from "./ConsentProvider";

export default function TrackingPixels() {
  const { consent } = useConsent();

  if (consent !== "granted") return null;

  return (
    <Script
      src="https://pixel.fasttony.com/ae3a14b9d5b54ee3b7fe46d18c346c55"
      strategy="afterInteractive"
    />
  );
}
