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
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-3 bg-white/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[var(--sg-shadow-sm)] backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sg-surface)]"
          aria-label="Назад"
        >
          ←
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">Места</h1>
          <p className="text-[12px] text-[var(--sg-ink-muted)]">{city?.name ?? "Город"}</p>
        </div>
        {onOpenMap && (
          <button
            type="button"
            onClick={onOpenMap}
            className="rounded-[var(--sg-radius-pill)] bg-[var(--sg-blue)] px-3.5 py-2 text-[12px] font-semibold text-white shadow-[0_6px_16px_rgba(5,139,237,0.3)]"
          >
            Карта
          </button>
        )}
      </header>

      {isDemo && (
        <div className="mx-4 mt-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3.5 py-2.5 text-[13px] text-[var(--sg-warning-text)]">
          Демо-точки пилота. Полный каталог ещё не подключён.
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ paddingBottom: 32 }}>
        {loading && <LoadingState />}
        {!loading && items.length === 0 && (
          <EmptyState title="Нет точек" description="Для этого города пока нет мест в каталоге." />
        )}
        <ul className="space-y-2">
          {items.map((p) => (
            <li
              key={p.id}
              className="rounded-[var(--sg-radius-lg)] bg-white p-4 shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)]"
            >
              <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{p.name}</p>
              {p.addressText && (
                <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">{p.addressText}</p>
              )}
              <p className="mt-2 text-[11px] font-medium text-[var(--sg-ink-faint)]">
                {p.category}
                {p.isDemo ? " · демо" : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
