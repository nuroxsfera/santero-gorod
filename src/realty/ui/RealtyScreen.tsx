"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Locality } from "@/geography";
import type { RealtyKind, RealtyListing } from "../domain/types";
import { InMemoryRealtyRepository } from "../repository/InMemoryRealtyRepository";

interface Props {
  city: Locality | null;
  onBack: () => void;
}

const KIND_LABEL: Record<RealtyKind, string> = {
  sale: "Продажа",
  rent: "Аренда",
  new_build: "Новостройка",
  other: "Объект",
};

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
          <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">
            Недвижимость
          </h1>
          <p className="text-[12px] text-[var(--sg-ink-muted)]">{city?.name ?? "Город"}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ paddingBottom: 40 }}>
        <p className="mb-4 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3.5 py-2.5 text-[12px] leading-relaxed text-[var(--sg-warning-text)]">
          Демо-карточки для UI. Цены и фото — иллюстрации, не рыночные объявления.
        </p>

        <ul className="space-y-4">
          {items.map((l) => (
            <li key={l.id}>
              <article className="sg-glass-strong overflow-hidden rounded-[var(--sg-radius-xl)] transition active:scale-[0.99]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--sg-surface)]">
                  {l.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={l.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--sg-blue-soft)] to-[#e8e4ff]">
                      <span className="text-[13px] font-medium text-[var(--sg-ink-muted)]">Нет фото</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[var(--sg-ink)] backdrop-blur-md">
                    {KIND_LABEL[l.kind]}
                  </span>
                  {l.isDemo && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                      Демо
                    </span>
                  )}
                  <p className="absolute bottom-3 left-3 right-3 text-[20px] font-semibold tracking-tight text-white drop-shadow">
                    {l.priceText}
                  </p>
                </div>

                <div className="p-4">
                  <h2 className="text-[16px] font-semibold leading-snug tracking-tight text-[var(--sg-ink)]">
                    {l.title}
                  </h2>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {l.roomsText && <MetaChip>{l.roomsText}</MetaChip>}
                    {l.areaText && <MetaChip>{l.areaText}</MetaChip>}
                    {l.floorText && <MetaChip>{l.floorText} эт.</MetaChip>}
                  </div>

                  {(l.addressText || l.districtText) && (
                    <div className="mt-3 flex items-start gap-2">
                      <svg
                        className="mt-0.5 shrink-0 text-[var(--sg-blue)]"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <circle cx="12" cy="10" r="2" fill="currentColor" />
                      </svg>
                      <div className="min-w-0">
                        {l.districtText && (
                          <p className="text-[12px] font-semibold text-[var(--sg-ink-muted)]">
                            {l.districtText}
                          </p>
                        )}
                        {l.addressText && (
                          <p className="text-[13px] leading-snug text-[var(--sg-ink-faint)]">
                            {l.addressText}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MetaChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--sg-surface)] px-2.5 py-1 text-[12px] font-medium text-[var(--sg-ink-muted)]">
      {children}
    </span>
  );
}
