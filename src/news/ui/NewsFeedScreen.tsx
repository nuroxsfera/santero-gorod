"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { NewsArticle, NewsCategory, NewsCategoryId } from "../domain/types";
import { getNewsService } from "../service/NewsService";
import { NEWS_CATEGORIES } from "../data/demo";
import { EmptyState, ErrorState, LoadingState } from "@/app/ui/states";

type ScopeTab = "city" | "region" | "federal";

interface Props {
  city: Locality | null;
  onOpenArticle: (article: NewsArticle) => void;
  onBack?: () => void;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return "";
  }
}

export function NewsFeedScreen({ city, onOpenArticle, onBack }: Props) {
  const [scope, setScope] = useState<ScopeTab>("city");
  const [categoryId, setCategoryId] = useState<NewsCategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const svc = getNewsService();
        const res = await svc.getFeed({
          localityId: scope === "federal" ? null : city?.id ?? null,
          regionId: scope === "federal" ? null : city?.regionId ?? null,
          feedMode: scope,
          categoryId,
          query: query.trim() || undefined,
          limit: 40,
        });
        if (cancelled) return;
        setItems(res.items);
        setIsDemo(res.isDemo);
      } catch {
        if (!cancelled) {
          setError("Не удалось загрузить ленту");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [city?.id, city?.regionId, scope, categoryId, query, tick]);

  const scopes: { id: ScopeTab; label: string }[] = [
    { id: "city", label: city?.name ?? "Город" },
    { id: "region", label: "Регион" },
    { id: "federal", label: "Россия" },
  ];

  return (
    <div className="flex h-full flex-col bg-[#F2F4F7]">
      <div className="z-10 bg-white px-4 pb-3 pt-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
              aria-label="Назад"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900">Новости</h1>
        </div>

        {isDemo && (
          <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-[12px] text-amber-800">
            Демо-данные. Реальные источники пока не подключены.
          </div>
        )}

        <div className="mb-3 flex gap-2 overflow-x-auto">
          {scopes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScope(s.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                scope === s.id ? "bg-[#058BED] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по новостям"
          className="mb-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[14px] outline-none focus:border-[#058BED]"
        />

        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setCategoryId("all")}
            className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium ${
              categoryId === "all" ? "bg-[#058BED]/15 text-[#058BED]" : "bg-gray-100 text-gray-600"
            }`}
          >
            Все
          </button>
          {NEWS_CATEGORIES.map((c: NewsCategory) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryId(c.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium ${
                categoryId === c.id ? "bg-[#058BED]/15 text-[#058BED]" : "bg-gray-100 text-gray-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading && <LoadingState />}
        {!loading && error && (
          <ErrorState
            title={error}
            description="Проверьте соединение и попробуйте снова."
            onRetry={() => setTick((n) => n + 1)}
          />
        )}
        {!loading && !error && items.length === 0 && (
          <EmptyState
            title="Нет материалов"
            description="Для выбранных фильтров пока ничего нет."
          />
        )}
        {!loading && !error && items.length > 0 && (
          <div className="space-y-3">
            {items.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onOpenArticle(a)}
                className="w-full rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]"
              >
                <div className="mb-1 flex items-center gap-2 text-[12px] text-gray-500">
                  <span className="font-medium text-[#058BED]">
                    {NEWS_CATEGORIES.find((c) => c.id === a.categoryId)?.label ?? a.categoryId}
                  </span>
                  <span>·</span>
                  <span>{formatDate(a.publishedAt)}</span>
                  {a.geo.localityName && (
                    <>
                      <span>·</span>
                      <span>{a.geo.localityName}</span>
                    </>
                  )}
                </div>
                <h2 className="mb-1 text-[15px] font-semibold leading-snug text-gray-900">
                  {a.title}
                </h2>
                <p className="line-clamp-2 text-[13px] text-gray-500">{a.summary}</p>
                <p className="mt-2 text-[12px] text-gray-400">{a.sourceName}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
