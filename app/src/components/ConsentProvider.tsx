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

// Listeners for same-tab localStorage writes (storage event only fires cross-tab)
let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

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

// Client-only hydration detection (avoids useEffect + setState)
function subscribeNoop() {
  return () => {};
}
function getHydratedTrue() {
  return true;
}
function getHydratedFalse() {
  return false;
}

function subscribe(callback: () => void) {
  listeners.push(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
    window.removeEventListener("storage", callback);
  };
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
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const isHydrated = useSyncExternalStore(
    subscribeNoop,
    getHydratedTrue,
    getHydratedFalse,
  );
  const [bannerForceOpen, setBannerForceOpen] = useState(false);

  const showBanner = isHydrated && (bannerForceOpen || consent === null);

  const setConsent = useCallback((value: "granted" | "denied") => {
    setBannerForceOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage unavailable
    }
    emitChange();
  }, []);

  const setShowBanner = useCallback((show: boolean) => {
    setBannerForceOpen(show);
  }, []);

  return (
    <ConsentContext.Provider
      value={{ consent, setConsent, showBanner, setShowBanner }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
