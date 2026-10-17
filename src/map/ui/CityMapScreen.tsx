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

const CATEGORY_RU: Partial<Record<PlaceCategory, string>> = {
  culture: "Культура",
  park: "Парк",
  shop: "Магазин",
  food: "Еда",
  health: "Медицина",
  education: "Образование",
  sport: "Спорт",
  transport_stop: "Транспорт",
  government: "Госучреждение",
  poi: "Место",
};

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
      return "#0a84ff";
  }
}

/** Map B3 chrome 3.0 — glass header + elevated sheet */
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
        el.style.cssText = `width:28px;height:28px;border-radius:50%;border:2.5px solid #fff;background:${markerColor(
          p.category
        )};box-shadow:0 6px 16px rgba(10,14,23,.22);cursor:pointer;padding:0;`;
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
      <header className="sg-glass relative z-20 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80"
            aria-label="Назад"
          >
            ←
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[16px] font-semibold tracking-tight text-[var(--sg-ink)]">
              Карта
            </h1>
            <p className="truncate text-[11px] text-[var(--sg-ink-faint)]">
              {city?.name ?? PILOT_CITY.name} · слои · {visible.length} точек
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPitch3d((v) => !v)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold ${
              pitch3d
                ? "bg-[var(--sg-blue)] text-white shadow-[var(--sg-shadow-glow)]"
                : "bg-white/80 text-[var(--sg-ink)] ring-1 ring-[var(--sg-border)]"
            }`}
          >
            {pitch3d ? "3D" : "2D"}
          </button>
          <button
            type="button"
            onClick={onOpenList}
            className="rounded-full bg-white/80 px-3.5 py-1.5 text-[12px] font-semibold text-[var(--sg-ink)] ring-1 ring-[var(--sg-border)]"
          >
            Список
          </button>
        </div>
        <div className="mt-2.5 flex gap-1.5 overflow-x-auto pb-0.5">
          {LAYER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setLayer(opt.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                layer === opt.id
                  ? "bg-[var(--sg-blue-soft)] text-[var(--sg-blue)]"
                  : "bg-white/70 text-[var(--sg-ink-muted)]"
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
          <p className="rounded-[16px] bg-white/90 px-3 py-2 text-[10px] text-[var(--sg-ink-muted)] shadow-[var(--sg-shadow-md)] backdrop-blur-md">
            © OpenStreetMap · pitch ≠ 3D-twin зданий
          </p>
        </div>
      </div>

      {selected && (
        <div className="absolute bottom-0 left-0 right-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="sg-glass-strong mx-auto max-w-lg overflow-hidden rounded-[var(--sg-radius-xl)] p-4 shadow-[var(--sg-shadow-lg)]">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--sg-blue)]">
                  {CATEGORY_RU[selected.category] ?? selected.category}
                </p>
                <h2 className="mt-0.5 text-[17px] font-semibold tracking-tight text-[var(--sg-ink)]">
                  {selected.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="shrink-0 rounded-full bg-[var(--sg-surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--sg-ink-muted)]"
              >
                Закрыть
              </button>
            </div>
            {selected.addressText && (
              <p className="text-[13px] leading-snug text-[var(--sg-ink-muted)]">
                {selected.addressText}
              </p>
            )}
            {selected.isDemo && (
              <p className="mt-2 text-[11px] text-[var(--sg-ink-faint)]">Демо-точка каталога</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
