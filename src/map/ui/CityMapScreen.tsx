"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locality } from "@/geography";
import type { Place, PlaceCategory } from "@/places";
import { getPlaceService } from "@/places";
import { PILOT_CITY } from "@/config/pilot";

interface Props {
  city: Locality | null;
  onBack: () => void;
  onOpenList: () => void;
}

const LAYER_OPTIONS: { id: PlaceCategory | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "transport_stop", label: "Транспорт" },
  { id: "culture", label: "Культура" },
  { id: "park", label: "Парки" },
  { id: "education", label: "Учёба" },
  { id: "health", label: "Медицина" },
  { id: "shop", label: "Магазины" },
  { id: "sport", label: "Спорт" },
];

function markerColor(category: PlaceCategory): string {
  switch (category) {
    case "culture":
      return "#7c3aed";
    case "transport_stop":
      return "#0369b1";
    case "park":
      return "#059669";
    case "shop":
      return "#d97706";
    case "education":
      return "#2563eb";
    case "health":
      return "#e11d48";
    case "government":
      return "#475569";
    case "sport":
      return "#ea580c";
    case "food":
      return "#c2410c";
    default:
      return "#058BED";
  }
}

/** Map B3: layers + pitch (3D camera). Not a mesh twin. */
export function CityMapScreen({ city, onBack, onOpenList }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Place | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [ready, setReady] = useState(false);
  const [layer, setLayer] = useState<PlaceCategory | "all">("all");
  const [pitch3d, setPitch3d] = useState(false);

  const center: [number, number] = city
    ? [city.lon ?? PILOT_CITY.lon, city.lat ?? PILOT_CITY.lat]
    : [PILOT_CITY.lon, PILOT_CITY.lat];

  const visible = useMemo(() => {
    if (layer === "all") return places;
    return places.filter((p) => p.category === layer);
  }, [places, layer]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await getPlaceService().search({
        localityId: city?.id ?? PILOT_CITY.localityId,
        limit: 80,
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
            layers: [{ id: "osm", type: "raster", source: "osm" }],
          },
          center,
          zoom: 12.2,
          pitch: 0,
          maxPitch: 60,
        });

        map.addControl(
          new maplibregl.NavigationControl({
            showCompass: true,
            visualizePitch: true,
          }),
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
    const map = mapRef.current;
    if (!map || !ready) return;
    map.easeTo({ pitch: pitch3d ? 45 : 0, duration: 450 });
  }, [pitch3d, ready]);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    const markers: import("maplibre-gl").Marker[] = [];

    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !mapRef.current) return;

      for (const p of visible) {
        const el = document.createElement("button");
        el.type = "button";
        el.style.cssText = `width:26px;height:26px;border-radius:50%;border:2px solid #fff;background:${markerColor(
          p.category
        )};box-shadow:0 4px 12px rgba(11,18,32,.2);cursor:pointer;padding:0;`;
        el.setAttribute("aria-label", p.name);
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setSelected(p);
        });
        markers.push(
          new maplibregl.Marker({ element: el })
            .setLngLat([p.geo.lon, p.geo.lat])
            .addTo(mapRef.current!)
        );
      }
    })();

    return () => {
      cancelled = true;
      markers.forEach((m) => m.remove());
    };
  }, [visible, ready]);

  return (
    <div className="relative flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="relative z-20 bg-white/90 px-3 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sg-surface)]"
            aria-label="Назад"
          >
            ←
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[16px] font-semibold text-[var(--sg-ink)]">Карта</h1>
            <p className="truncate text-[11px] text-[var(--sg-ink-faint)]">
              {city?.name ?? PILOT_CITY.name} · B3 · слои
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPitch3d((v) => !v)}
            className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
              pitch3d
                ? "bg-[var(--sg-blue)] text-white"
                : "bg-[var(--sg-surface)] text-[var(--sg-ink)]"
            }`}
          >
            {pitch3d ? "3D" : "2D"}
          </button>
          <button
            type="button"
            onClick={onOpenList}
            className="rounded-full bg-[var(--sg-surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--sg-ink)]"
          >
            Список
          </button>
        </div>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5">
          {LAYER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setLayer(opt.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                layer === opt.id
                  ? "bg-[var(--sg-blue-soft)] text-[var(--sg-blue)]"
                  : "bg-[var(--sg-surface)] text-[var(--sg-ink-muted)]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        {error && (
          <p className="absolute inset-0 z-10 flex items-center justify-center bg-white p-6 text-center text-[14px] text-[var(--sg-ink-muted)]">
            {error}
          </p>
        )}
        <div ref={containerRef} className="absolute inset-0" />
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10">
          <p className="rounded-[14px] bg-white/90 px-2.5 py-1.5 text-[10px] text-[var(--sg-ink-muted)] shadow-[var(--sg-shadow-sm)]">
            B3 · слои POI · pitch ≠ 3D-twin зданий · © OpenStreetMap
          </p>
        </div>
      </div>

      {selected && (
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 p-4 shadow-[var(--sg-shadow-lg)] backdrop-blur-md">
          <div className="mx-auto max-w-lg">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h2 className="text-[16px] font-semibold text-[var(--sg-ink)]">{selected.name}</h2>
              <button type="button" onClick={() => setSelected(null)} className="text-[13px] text-[var(--sg-ink-faint)]">
                Закрыть
              </button>
            </div>
            {selected.addressText && (
              <p className="text-[13px] text-[var(--sg-ink-muted)]">{selected.addressText}</p>
            )}
            <p className="mt-2 text-[11px] text-[var(--sg-ink-faint)]">
              {selected.category}
              {selected.isDemo ? " · демо" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
