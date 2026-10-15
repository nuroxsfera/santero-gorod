"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import { universalSearch, type SearchHit } from "../universalSearch";
import { EmptyState, LoadingState } from "@/app/ui/states";

interface Props {
  city: Locality | null;
  onBack: () => void;
  onOpenNews: () => void;
  onOpenJobs: () => void;
  onOpenPlaces: () => void;
}

const KIND_LABEL: Record<SearchHit["kind"], string> = {
  news: "Новость",
  job: "Вакансия",
  place: "Место",
};

export function SearchScreen({ city, onBack, onOpenNews, onOpenJobs, onOpenPlaces }: Props) {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [isDemo, setIsDemo] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      (async () => {
        if (!q.trim()) {
          if (!cancelled) setHits([]);
          return;
        }
        if (!cancelled) setLoading(true);
        try {
          const res = await universalSearch({
            query: q,
            localityId: city?.id ?? null,
            regionId: city?.regionId ?? null,
          });
          if (!cancelled) {
            setHits(res.hits);
            setIsDemo(res.isDemo);
          }
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    }, 280);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [q, city?.id, city?.regionId]);

  const openHit = (h: SearchHit) => {
    if (h.kind === "news") onOpenNews();
    else if (h.kind === "job") onOpenJobs();
    else onOpenPlaces();
  };

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="bg-white/90 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[var(--sg-shadow-sm)] backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sg-surface)] text-[var(--sg-ink)]"
            aria-label="Назад"
          >
            ←
          </button>
          <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">Поиск</h1>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Новости, вакансии, места…"
          className="w-full rounded-[var(--sg-radius-md)] border-0 bg-[var(--sg-surface)] px-4 py-3.5 text-[15px] outline-none ring-1 ring-[var(--sg-border)] focus:ring-2 focus:ring-[var(--sg-blue)]/40"
          autoFocus
        />
      </header>

      {isDemo && q.trim() && (
        <p className="mx-4 mt-3 text-[12px] font-medium text-[var(--sg-warning-text)]">
          В результатах могут быть демо-данные
        </p>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading && <LoadingState label="Ищем…" />}
        {!loading && q.trim() && hits.length === 0 && (
          <EmptyState title="Ничего не найдено" description="Попробуйте другой запрос" />
        )}
        {!q.trim() && !loading && (
          <EmptyState
            title="Что ищем?"
            description={`Новости, работа и места · ${city?.name ?? "город"}`}
          />
        )}
        <ul className="space-y-2">
          {hits.map((h) => (
            <li key={`${h.kind}-${h.id}`}>
              <button
                type="button"
                onClick={() => openHit(h)}
                className="w-full rounded-[var(--sg-radius-lg)] bg-white p-4 text-left shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)] transition active:scale-[0.99]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--sg-blue)]">
                  {KIND_LABEL[h.kind]}
                </p>
                <p className="mt-1 text-[15px] font-semibold text-[var(--sg-ink)]">{h.title}</p>
                <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">
                  {h.subtitle}
                  {h.isDemo ? " · демо" : ""}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
