"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import "azure-maps-control/dist/atlas.min.css";
import {
  allLocations,
  CATEGORY_COLORS,
  VILLA_COORDS,
} from "@/data/location-data";
import { MapPin } from "lucide-react";

// ---------------------------------------------------------------------------
// SVG pin generators (using Lucide MapPin path)
// ---------------------------------------------------------------------------

function pinSvg(color: string): string {
  // Wrapper div is 0×0 so Azure Maps anchor is exactly at the coordinate.
  // SVG is positioned absolutely with its tip at (0,0) — no pixelOffset needed.
  return `<div style="position:relative;width:0;height:0;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="4 2 16 20" fill="${color}" stroke="${color}" stroke-width="0" style="position:absolute;bottom:0;left:-12px;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.3));cursor:pointer;transition:transform 0.15s;transform-origin:bottom center;" onmouseenter="this.style.transform='scale(1.25)'" onmouseleave="this.style.transform='scale(1)'"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" fill="white" stroke="none"/></svg></div>`;
}

function villaPinSvg(): string {
  return `<div style="position:relative;width:0;height:0;"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="38" viewBox="4 2 16 20" fill="#dc2626" stroke="#dc2626" stroke-width="0" style="position:absolute;bottom:0;left:-15px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35));cursor:default;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="M12 5.5l-4.5 3.5V14h3v-2.5h3V14h3V9L12 5.5z" fill="white" stroke="none"/></svg></div>`;
}

// ---------------------------------------------------------------------------
// Legend config
// ---------------------------------------------------------------------------

const LEGEND_ITEMS: { key: string; color: string; labelKey: string }[] = [
  {
    key: "beaches",
    color: CATEGORY_COLORS.beaches,
    labelKey: "mapLegendBeaches",
  },
  { key: "towns", color: CATEGORY_COLORS.towns, labelKey: "mapLegendTowns" },
  { key: "nature", color: CATEGORY_COLORS.nature, labelKey: "mapLegendNature" },
  {
    key: "archaeology",
    color: CATEGORY_COLORS.archaeology,
    labelKey: "mapLegendArchaeology",
  },
  { key: "trips", color: CATEGORY_COLORS.dayTrips, labelKey: "mapLegendTrips" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AZURE_KEY = process.env.NEXT_PUBLIC_AZURE_MAPS_KEY;

export default function LocationMap() {
  const t = useTranslations("location");
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Azure Maps instance from dynamic import
  const mapInstanceRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  // Memoize translated drive time strings
  const driveTimeStrings = useRef<Record<string, string>>({});
  useEffect(() => {
    for (const loc of allLocations) {
      driveTimeStrings.current[loc.id] = t("driveTime", {
        minutes: loc.driveMinutes,
      });
    }
  }, [t]);

  useEffect(() => {
    if (!AZURE_KEY || !containerRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function initMap() {
      const atlas = await import("azure-maps-control");
      if (cancelled || !containerRef.current) return;

      const map = new atlas.Map(containerRef.current, {
        center: [8.28, 40.62],
        zoom: 10,
        style: "grayscale_light",
        language: "en-US",
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: AZURE_KEY!,
        },
        showLogo: false,
        showFeedbackLink: false,
      });

      mapInstanceRef.current = map;

      map.events.add("ready", () => {
        if (cancelled) return;
        setLoaded(true);

        // Villa marker — larger pin with house icon
        const villaMarker = new atlas.HtmlMarker({
          position: [VILLA_COORDS[1], VILLA_COORDS[0]],
          htmlContent: villaPinSvg(),
        });
        map.markers.add(villaMarker);

        // Shared popup for all location markers
        const popup = new atlas.Popup({
          pixelOffset: [0, -36],
          closeButton: false,
        });

        // Touch state tracker
        const touchState = new Map<string, boolean>();
        const isTouch = "ontouchstart" in window;

        for (const loc of allLocations) {
          const color = CATEGORY_COLORS[loc.category];
          const driveTime = driveTimeStrings.current[loc.id] || "";

          const marker = new atlas.HtmlMarker({
            position: [loc.coords[1], loc.coords[0]],
            htmlContent: pinSvg(color),
          });

          const popupContent = `<div style="padding:8px 14px;font-family:system-ui,sans-serif;white-space:nowrap;"><strong style="font-size:13px;">${loc.name}</strong><span style="margin-left:8px;color:#888;font-size:12px;">${driveTime}</span></div>`;

          const markerPos = marker.getOptions().position;

          map.events.add("mouseover", marker, () => {
            popup.setOptions({
              content: popupContent,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Azure Maps position type mismatch
              position: markerPos as any,
            });
            popup.open(map);
          });

          map.events.add("mouseout", marker, () => {
            popup.close();
          });

          map.events.add("click", marker, () => {
            if (isTouch) {
              const shown = touchState.get(loc.id);
              if (!shown) {
                popup.setOptions({
                  content: popupContent,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Azure Maps position type mismatch
                  position: markerPos as any,
                });
                popup.open(map);
                touchState.set(loc.id, true);
                setTimeout(() => {
                  touchState.set(loc.id, false);
                  popup.close();
                }, 3000);
                return;
              }
              touchState.set(loc.id, false);
            }
            window.open(loc.googleMapsUrl, "_blank", "noopener,noreferrer");
          });

          map.markers.add(marker);
        }
      });
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current?.dispose) {
        mapInstanceRef.current.dispose();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-semibold md:text-4xl">{t("mapTitle")}</h2>

      {/* Map container */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-md">
        {!AZURE_KEY && (
          <div className="flex h-[400px] items-center justify-center bg-[var(--surface)] text-[var(--muted)]">
            Map unavailable
          </div>
        )}
        <div
          ref={containerRef}
          className={`h-[400px] w-full md:h-[500px] lg:h-[600px] ${!AZURE_KEY ? "hidden" : ""}`}
        />
        {AZURE_KEY && !loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface)]">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--muted)] border-t-[var(--accent-strong)]" />
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.key} className="flex items-center gap-1.5">
            <MapPin
              size={16}
              fill={item.color}
              color={item.color}
              strokeWidth={0}
              aria-hidden="true"
            />
            <span>{t(item.labelKey)}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <MapPin
            size={16}
            fill="#dc2626"
            color="#dc2626"
            strokeWidth={0}
            aria-hidden="true"
          />
          <span>Villa Monte Calvia</span>
        </div>
      </div>
    </div>
  );
}
