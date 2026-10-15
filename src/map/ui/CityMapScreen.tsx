"use client";

import { useEffect, useRef, useState } from "react";
import type { Locality } from "@/geography";
import type { Place } from "@/places";
import { getPlaceService } from "@/places";
import { PILOT_CITY } from "@/config/pilot";

interface Props {
  city: Locality | null;
  onBack: () => void;
  onOpenList: () => void;
}

/**
 * Map B1: MapLibre + free OSM raster tiles + Place markers.
 * Not a 3D twin. Attribution required (OSM).
 */
export function CityMapScreen({ city, onBack, onOpenList }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Place | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [ready, setReady] = useState(false);

  const center: [number, number] = city
    ? [city.lon ?? PILOT_CITY.lon, city.lat ?? PILOT_CITY.lat]
    : [PILOT_CITY.lon, PILOT_CITY.lat];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await getPlaceService().search({
        localityId: city?.id ?? PILOT_CITY.localityId,
        limit: 50,
      });
      if (!cancelled) setPlaces(res.items);
    })();
    return () => {
      cancelled = true;
    };
  }, [city?.id]);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    let map: import("maplibre-gl").Map | null = null;

    (async () => {
      try {
        const maplibregl = await import("maplibre-gl");
        await import("maplibre-gl/dist/maplibre-gl.css");
        if (cancelled || !containerRef.current) return;

        map = new maplibregl.Map({
          container: containerRef.current,
          style: {
            version: 8,
            sources: {
              osm: {
                type: "raster",
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution:
                  '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              },
            },
            layers: [
              {
                id: "osm",
                type: "raster",
                source: "osm",
              },
            ],
          },
          center,
          zoom: 12,
        });

        map.addControl(
          new maplibregl.NavigationControl({ showCompass: true }),
          "top-right"
        );
        mapRef.current = map;

        map.on("load", () => {
          if (!cancelled) setReady(true);
        });
      } catch {
        if (!cancelled) setError("Не удалось загрузить карту");
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city?.id]);

  useEffect(() => {
    if (!ready || places.length === 0) return;

    let cancelled = false;
    const markers: import("maplibre-gl").Marker[] = [];

    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !mapRef.current) return;

      for (const p of places) {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "santero-map-marker";
        el.style.cssText =
          "width:28px;height:28px;border-radius:50%;border:2px solid #fff;background:#058BED;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer;padding:0;";
        el.setAttribute("aria-label", p.name);
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setSelected(p);
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([p.geo.lon, p.geo.lat])
          .addTo(mapRef.current!);
        markers.push(marker);
      }
    })();

    return () => {
      cancelled = true;
      markers.forEach((m) => m.remove());
    };
  }, [places, ready]);

  return (
    <div className="relative flex h-full flex-col bg-[#F2F4F7]">
      <header className="relative z-20 flex items-center gap-2 bg-white/95 px-3 py-2.5 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-800 active:bg-gray-200"
          aria-label="Назад"
        >
          ←
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[16px] font-semibold text-gray-900">Карта</h1>
          <p className="truncate text-[11px] text-gray-500">
            {city?.name ?? PILOT_CITY.name} · 2D (B1) · OSM
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenList}
          className="rounded-full bg-gray-100 px-3 py-1.5 text-[12px] font-medium text-gray-800 active:bg-gray-200"
        >
          Список
        </button>
      </header>

      <div className="relative min-h-0 flex-1">
        {error && (
          <p className="absolute inset-0 z-10 flex items-center justify-center bg-white p-6 text-center text-[14px] text-gray-600">
            {error}
          </p>
        )}
        <div ref={containerRef} className="absolute inset-0" />

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10">
          <p className="rounded-lg bg-white/90 px-2 py-1 text-[10px] text-gray-600 shadow">
            Демо-маркеры · не полный каталог · © OpenStreetMap
          </p>
        </div>
      </div>

      {selected && (
        <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-gray-100 bg-white p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="mx-auto max-w-lg">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h2 className="text-[16px] font-semibold text-gray-900">{selected.name}</h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-[13px] text-gray-500"
              >
                Закрыть
              </button>
            </div>
            {selected.addressText && (
              <p className="text-[13px] text-gray-600">{selected.addressText}</p>
            )}
            <p className="mt-2 text-[11px] text-gray-400">
              {selected.category}
              {selected.isDemo ? " · демо" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
