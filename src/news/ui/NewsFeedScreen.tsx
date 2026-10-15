"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { NewsArticle, NewsCategory, NewsCategoryId } from "../domain/types";
import { NEWS_CATEGORIES } from "../data/demo";
import { fetchNewsFeedFromApi } from "../client/fetchNewsFeed";
import { getNewsService } from "../service/NewsService";
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
  const [liveCount, setLiveCount] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      const baseQuery = {
        localityId: scope === "federal" ? null : city?.id ?? null,
        regionId: scope === "federal" ? null : city?.regionId ?? null,
        feedMode: scope,
        categoryId,
        query: query.trim() || undefined,
        limit: 40,
      };
      try {
        const res = await fetchNewsFeedFromApi(baseQuery);
        if (cancelled) return;
        setItems(res.items);
        setIsDemo(res.isDemo);
        setLiveCount(res.liveCount ?? res.items.filter((a) => !a.isDemo).length);
      } catch {
        try {
          const fallback = await getNewsService().getFeed(baseQuery);
          if (cancelled) return;
          setItems(fallback.items);
          setIsDemo(fallback.isDemo);
          setLiveCount(0);
        } catch {
          if (!cancelled) {
            setError("Не удалось загрузить ленту");
            setItems([]);
          }
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
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <div className="z-10 bg-white/95 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[var(--sg-shadow-sm)] backdrop-blur">
        <div className="mb-3 flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sg-surface)]"
              aria-label="Назад"
            >
              ←
            </button>
          )}
          <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">
            Новости
          </h1>
        </div>

        {liveCount > 0 ? (
          <div className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-blue-soft)] px-3 py-2 text-[12px] text-[var(--sg-blue-deep)]">
            В ленте есть live-материалы (заголовок и ссылка на источник). Полный текст — у
            издателя.
            {isDemo ? " Также могут быть демо-карточки." : ""}
          </div>
        ) : (
          isDemo && (
            <div className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3 py-2 text-[12px] text-[var(--sg-warning-text)]">
              Пока демо или live RSS недоступен. Источники подключаются постепенно.
            </div>
          )
        )}

        <div className="mb-3 flex gap-2 overflow-x-auto">
          {scopes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScope(s.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                scope === s.id
                  ? "bg-[var(--sg-blue)] text-white"
                  : "bg-[var(--sg-surface)] text-[var(--sg-ink-muted)]"
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
          className="mb-2 w-full rounded-[var(--sg-radius-md)] bg-[var(--sg-surface)] px-3 py-2.5 text-[14px] outline-none ring-1 ring-[var(--sg-border)] focus:ring-2 focus:ring-[var(--sg-blue)]/40"
        />

        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setCategoryId("all")}
            className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium ${
              categoryId === "all"
                ? "bg-[var(--sg-blue-soft)] text-[var(--sg-blue)]"
                : "bg-[var(--sg-surface)] text-[var(--sg-ink-muted)]"
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
                categoryId === c.id
                  ? "bg-[var(--sg-blue-soft)] text-[var(--sg-blue)]"
                  : "bg-[var(--sg-surface)] text-[var(--sg-ink-muted)]"
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
          <div className="space-y-2.5">
            {items.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onOpenArticle(a)}
                className="w-full rounded-[var(--sg-radius-lg)] bg-white p-4 text-left shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)] transition active:scale-[0.99]"
              >
                <div className="mb-1 flex flex-wrap items-center gap-2 text-[12px] text-[var(--sg-ink-faint)]">
                  <span className="font-semibold text-[var(--sg-blue)]">
                    {NEWS_CATEGORIES.find((c) => c.id === a.categoryId)?.label ?? a.categoryId}
                  </span>
                  <span>·</span>
                  <span>{formatDate(a.publishedAt)}</span>
                  {!a.isDemo && (
                    <span className="rounded-full bg-[var(--sg-blue-soft)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--sg-blue)]">
                      live
                    </span>
                  )}
                  {a.isDemo && (
                    <span className="rounded-full bg-[var(--sg-warning-bg)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--sg-warning-text)]">
                      демо
                    </span>
                  )}
                </div>
                <h2 className="mb-1 text-[15px] font-semibold leading-snug text-[var(--sg-ink)]">
                  {a.title}
                </h2>
                <p className="line-clamp-2 text-[13px] text-[var(--sg-ink-muted)]">{a.summary}</p>
                <p className="mt-2 text-[12px] text-[var(--sg-ink-faint)]">{a.sourceName}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
