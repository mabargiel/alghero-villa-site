"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ConsentValue = "granted" | "denied" | null;

type ConsentContextType = {
  consent: ConsentValue;
  setConsent: (value: "granted" | "denied") => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
};

const STORAGE_KEY = "cookie-consent";

function readStoredConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") return stored;
  } catch {
    // localStorage unavailable
  }
  return null;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

export default function ConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsentState] = useState<ConsentValue>(readStoredConsent);
  const [showBanner, setShowBanner] = useState(
    () => readStoredConsent() === null,
  );

  const setConsent = useCallback((value: "granted" | "denied") => {
    setConsentState(value);
    setShowBanner(false);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage unavailable — consent still applies for this session
    }
  }, []);

  return (
    <ConsentContext.Provider
      value={{ consent, setConsent, showBanner, setShowBanner }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
