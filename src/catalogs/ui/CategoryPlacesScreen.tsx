"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { Place, PlaceCategory } from "@/places";
import { getPlaceService } from "@/places";
import { LoadingState, EmptyState } from "@/app/ui/states";

interface Props {
  city: Locality | null;
  title: string;
  categories: PlaceCategory[];
  note: string;
  onBack: () => void;
}

export function CategoryPlacesScreen({
  city,
  title,
  categories,
  note,
  onBack,
}: Props) {
  const [items, setItems] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const catKey = categories.join(",");

  useEffect(() => {
    let c = false;
    const cats = catKey.split(",") as PlaceCategory[];
    (async () => {
      setLoading(true);
      const res = await getPlaceService().search({
        localityId: city?.id ?? null,
        limit: 80,
      });
      if (c) return;
      setItems(res.items.filter((p) => cats.includes(p.category)));
      setLoading(false);
    })();
    return () => {
      c = true;
    };
  }, [city?.id, catKey]);

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">{title}</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <p className="mb-3 text-[12px] text-[var(--sg-ink-muted)]">{note}</p>
        {loading && <LoadingState />}
        {!loading && items.length === 0 && (
          <EmptyState
            title="Пусто"
            description="В каталоге пилота пока нет точек этой категории."
          />
        )}
        <ul className="space-y-2">
          {items.map((p) => (
            <li
              key={p.id}
              className="rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]"
            >
              <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{p.name}</p>
              {p.addressText && (
                <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">{p.addressText}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
