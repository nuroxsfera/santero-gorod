"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { Place } from "../domain/types";
import { getPlaceService } from "../service/PlaceService";
import { EmptyState, LoadingState } from "@/app/ui/states";

interface Props {
  city: Locality | null;
  onBack: () => void;
  onOpenMap?: () => void;
}

export function PlacesListScreen({ city, onBack, onOpenMap }: Props) {
  const [items, setItems] = useState<Place[]>([]);
  const [isDemo, setIsDemo] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await getPlaceService().search({
          localityId: city?.id ?? null,
          limit: 50,
        });
        if (!cancelled) {
          setItems(res.items);
          setIsDemo(res.isDemo);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [city?.id]);

  return (
    <div className="flex h-full flex-col bg-[#F2F4F7]">
      <header className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-800 active:bg-gray-200"
          aria-label="Назад"
        >
          ←
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-[17px] font-semibold text-gray-900">Места</h1>
          <p className="text-[12px] text-gray-500">{city?.name ?? "Город"}</p>
        </div>
        {onOpenMap && (
          <button
            type="button"
            onClick={onOpenMap}
            className="rounded-full bg-[#058BED] px-3 py-1.5 text-[12px] font-medium text-white active:opacity-90"
          >
            Карта
          </button>
        )}
      </header>

      {isDemo && (
        <div className="mx-4 mt-3 rounded-2xl bg-amber-50 px-3 py-2.5 text-[13px] text-amber-900">
          Демо-точки для пилота. Полный каталог не подключён.
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ paddingBottom: 32 }}>
        {loading && <LoadingState />}
        {!loading && items.length === 0 && (
          <EmptyState
            title="Нет точек"
            description="Для этого города пока нет мест в каталоге."
          />
        )}
        <ul className="space-y-2">
          {items.map((p) => (
            <li key={p.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-[15px] font-semibold text-gray-900">{p.name}</p>
              {p.addressText && (
                <p className="mt-1 text-[13px] text-gray-500">{p.addressText}</p>
              )}
              <p className="mt-2 text-[11px] text-gray-400">
                {p.category} · {p.geo.lat.toFixed(4)}, {p.geo.lon.toFixed(4)}
                {p.isDemo ? " · демо" : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
