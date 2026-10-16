"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { RealtyListing } from "../domain/types";
import { InMemoryRealtyRepository } from "../repository/InMemoryRealtyRepository";

interface Props {
  city: Locality | null;
  onBack: () => void;
}

export function RealtyScreen({ city, onBack }: Props) {
  const [items, setItems] = useState<RealtyListing[]>([]);

  useEffect(() => {
    let c = false;
    new InMemoryRealtyRepository().list(city?.id).then((r) => {
      if (!c) setItems(r.items);
    });
    return () => {
      c = true;
    };
  }, [city?.id]);

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Недвижимость</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <p className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3 py-2 text-[12px] text-[var(--sg-warning-text)]">
          Только демо-карточки. Не объявления и не цены с рынка.
        </p>
        <ul className="space-y-2">
          {items.map((l) => (
            <li key={l.id} className="rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]">
              <p className="text-[11px] font-semibold uppercase text-[var(--sg-blue)]">{l.kind}</p>
              <p className="mt-1 text-[15px] font-semibold text-[var(--sg-ink)]">{l.title}</p>
              <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">
                {l.priceText}
                {l.areaText ? ` · ${l.areaText}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
