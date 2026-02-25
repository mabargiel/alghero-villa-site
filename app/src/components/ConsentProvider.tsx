"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";

type ConsentValue = "granted" | "denied" | null;

type ConsentContextType = {
  consent: ConsentValue;
  setConsent: (value: "granted" | "denied") => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
};

const STORAGE_KEY = "cookie-consent";

function getSnapshot(): ConsentValue {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") return stored;
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getServerSnapshot(): ConsentValue {
  return null;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
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
  const storedConsent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [consent, setConsentState] = useState<ConsentValue>(storedConsent);
  const [showBanner, setShowBanner] = useState(storedConsent === null);

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
