"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { Place, PlaceCategory } from "../domain/types";
import { getPlaceService } from "../service/PlaceService";
import { EmptyState, LoadingState } from "@/app/ui/states";

interface Props {
  city: Locality | null;
  onBack: () => void;
  onOpenMap?: () => void;
}

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
  other: "Другое",
};

/** Soft cover gradients when no photo — structured visual hierarchy */
const CATEGORY_COVER: Partial<Record<PlaceCategory, string>> = {
  culture: "linear-gradient(135deg, #c4b5fd 0%, #7c3aed 100%)",
  park: "linear-gradient(135deg, #6ee7b7 0%, #059669 100%)",
  shop: "linear-gradient(135deg, #fcd34d 0%, #d97706 100%)",
  food: "linear-gradient(135deg, #fdba74 0%, #ea580c 100%)",
  health: "linear-gradient(135deg, #fda4af 0%, #e11d48 100%)",
  education: "linear-gradient(135deg, #93c5fd 0%, #2563eb 100%)",
  sport: "linear-gradient(135deg, #fdba74 0%, #ea580c 100%)",
  transport_stop: "linear-gradient(135deg, #7dd3fc 0%, #0369b1 100%)",
  government: "linear-gradient(135deg, #cbd5e1 0%, #475569 100%)",
  poi: "linear-gradient(135deg, #93c5fd 0%, #0a84ff 100%)",
};

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
    <div className="sg-ambient flex h-full flex-col">
      <header className="sg-glass sticky top-0 z-10 flex items-center gap-3 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80"
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
            className="rounded-[var(--sg-radius-pill)] bg-[var(--sg-blue)] px-3.5 py-2 text-[12px] font-semibold text-white shadow-[var(--sg-shadow-glow)]"
          >
            Карта
          </button>
        )}
      </header>

      {isDemo && (
        <div className="mx-4 mt-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3.5 py-2.5 text-[13px] text-[var(--sg-warning-text)]">
          Каталог пилота. Фото-заглушки по категории — полный media-пайплайн позже.
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ paddingBottom: 40 }}>
        {loading && <LoadingState />}
        {!loading && items.length === 0 && (
          <EmptyState title="Нет точек" description="Для этого города пока нет мест в каталоге." />
        )}
        <ul className="space-y-3">
          {items.map((p) => (
            <li key={p.id}>
              <article className="sg-glass-strong flex overflow-hidden rounded-[var(--sg-radius-lg)] transition active:scale-[0.99]">
                <div
                  className="relative h-[88px] w-[88px] shrink-0"
                  style={{
                    background:
                      CATEGORY_COVER[p.category] ??
                      "linear-gradient(135deg, #c7d2fe 0%, #0a84ff 100%)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-white/90 drop-shadow">
                      {(CATEGORY_RU[p.category] ?? p.category).slice(0, 6)}
                    </span>
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-3">
                  <p className="truncate text-[15px] font-semibold tracking-tight text-[var(--sg-ink)]">
                    {p.name}
                  </p>
                  {p.addressText && (
                    <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-[var(--sg-ink-muted)]">
                      {p.addressText}
                    </p>
                  )}
                  <p className="mt-1.5 text-[11px] font-medium text-[var(--sg-ink-faint)]">
                    {CATEGORY_RU[p.category] ?? p.category}
                    {p.isDemo ? " · демо" : ""}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
