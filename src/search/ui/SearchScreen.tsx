"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import { universalSearch, type SearchHit } from "../universalSearch";

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
    <div className="flex h-full flex-col bg-[#F2F4F7]">
      <header className="bg-white px-4 py-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-800"
            aria-label="Назад"
          >
            ←
          </button>
          <h1 className="text-[17px] font-semibold text-gray-900">Поиск</h1>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Новости, вакансии, места…"
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px] outline-none focus:border-[#058BED]"
          autoFocus
        />
      </header>

      {isDemo && q.trim() && (
        <p className="mx-4 mt-2 text-[12px] text-amber-800">
          Результаты могут включать демо-данные.
        </p>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading && <p className="text-center text-[13px] text-gray-400">Ищем…</p>}
        {!loading && q.trim() && hits.length === 0 && (
          <p className="text-center text-[13px] text-gray-500">Ничего не найдено</p>
        )}
        {!q.trim() && (
          <p className="text-center text-[13px] text-gray-400">
            Введите запрос по городу {city?.name ?? ""}
          </p>
        )}
        <ul className="space-y-2">
          {hits.map((h) => (
            <li key={`${h.kind}-${h.id}`}>
              <button
                type="button"
                onClick={() => openHit(h)}
                className="w-full rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]"
              >
                <p className="text-[11px] font-medium text-[#058BED]">{KIND_LABEL[h.kind]}</p>
                <p className="mt-0.5 text-[15px] font-semibold text-gray-900">{h.title}</p>
                <p className="mt-1 text-[12px] text-gray-500">
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
