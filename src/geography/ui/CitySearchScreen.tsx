"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locality } from "../domain/types";
import { getCityContext } from "../context/cityContext";
import { getGeographicService } from "../service/GeographicService";

interface Props {
  onSelect: (loc: Locality) => void;
  onBack?: () => void;
  title?: string;
}

export function CitySearchScreen({ onSelect, onBack, title = "Выбор города" }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Locality[]>([]);
  const [popular, setPopular] = useState<Locality[]>([]);
  const [recent, setRecent] = useState<Locality[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const svc = getGeographicService();
        await svc.ensureLoaded();
        if (cancelled) return;
        setPopular(svc.getPopularCities(16));
        const ctx = getCityContext();
        await ctx.hydrate();
        const state = ctx.getState();
        if (state.recentLocalityIds.length) {
          setRecent(svc.getLocalitiesByIds(state.recentLocalityIds));
        }
      } catch {
        if (!cancelled) setError("Не удалось загрузить справочник городов");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const runSearch = useCallback((q: string) => {
    const svc = getGeographicService();
    if (!svc.isReady()) return;
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setResults(svc.searchCities({ query: q, limit: 30 }).items);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => runSearch(query), 120);
    return () => clearTimeout(t);
  }, [query, runSearch]);

  const showPopular = !query.trim();
  const empty = Boolean(query.trim() && results.length === 0 && !loading);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full active:bg-gray-100"
            aria-label="Назад"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 5L7.5 10l5 5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>

      <div className="px-4 pt-3">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск города"
            autoFocus
            autoComplete="off"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-[16px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#058BED] focus:bg-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-6 pt-2">
        {loading && (
          <p className="px-3 py-8 text-center text-sm text-gray-400">Загрузка справочника…</p>
        )}
        {error && (
          <div className="px-3 py-6 text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && showPopular && recent.length > 0 && (
          <section className="mb-4">
            <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Недавние</p>
            {recent.map((loc) => (
              <CityRow key={`r-${loc.id}`} loc={loc} onSelect={onSelect} />
            ))}
          </section>
        )}

        {!loading && !error && showPopular && (
          <section>
            <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Популярные</p>
            {popular.map((loc) => (
              <CityRow key={loc.id} loc={loc} onSelect={onSelect} />
            ))}
          </section>
        )}

        {!loading && !error && !showPopular &&
          results.map((loc) => <CityRow key={loc.id} loc={loc} onSelect={onSelect} />)}

        {empty && (
          <p className="px-3 py-10 text-center text-sm text-gray-400">
            Ничего не найдено по запросу «{query}»
          </p>
        )}
      </div>
    </div>
  );
}

function CityRow({ loc, onSelect }: { loc: Locality; onSelect: (l: Locality) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(loc)}
      className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left active:bg-gray-50"
    >
      <div className="min-w-0">
        <p className="truncate text-[16px] font-medium text-gray-900">{loc.name}</p>
        <p className="truncate text-[13px] text-gray-500">
          {loc.regionName}
          {loc.federalDistrict ? ` · ${loc.federalDistrict}` : ""}
        </p>
      </div>
    </button>
  );
}
