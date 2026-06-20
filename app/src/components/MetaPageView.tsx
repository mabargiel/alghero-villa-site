"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import { useConsent } from "./ConsentProvider";

export default function MetaPageView() {
  const { consent } = useConsent();
  const pathname = usePathname();
  const isFirstRun = useRef(true);

  useEffect(() => {
    // The base snippet in TrackingPixels already fires PageView on first
    // load — skip the first effect run to avoid double-firing.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (consent !== "granted") return;
    window.fbq?.("track", "PageView");
  }, [pathname, consent]);

  return null;
}
