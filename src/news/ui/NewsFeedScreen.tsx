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

const CATEGORY_COVER: Partial<Record<NewsCategoryId, string>> = {
  city: "linear-gradient(135deg, #7dd3fc 0%, #0a84ff 100%)",
  society: "linear-gradient(135deg, #c4b5fd 0%, #7c3aed 100%)",
  transport: "linear-gradient(135deg, #93c5fd 0%, #0369b1 100%)",
  economy: "linear-gradient(135deg, #6ee7b7 0%, #059669 100%)",
  education: "linear-gradient(135deg, #93c5fd 0%, #2563eb 100%)",
  health: "linear-gradient(135deg, #fda4af 0%, #e11d48 100%)",
  incidents: "linear-gradient(135deg, #fdba74 0%, #ea580c 100%)",
  culture: "linear-gradient(135deg, #f0abfc 0%, #a21caf 100%)",
  sport: "linear-gradient(135deg, #fdba74 0%, #c2410c 100%)",
  other: "linear-gradient(135deg, #cbd5e1 0%, #64748b 100%)",
};

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
    <div className="sg-ambient flex h-full flex-col">
      <div className="sg-glass z-10 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="mb-3 flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80"
              aria-label="Назад"
            >
              ←
            </button>
          )}
          <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">Новости</h1>
        </div>

        {liveCount > 0 ? (
          <div className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-blue-soft)] px-3 py-2 text-[12px] text-[var(--sg-blue-deep)]">
            Live: заголовок и ссылка на источник. Полный текст — у издателя.
            {isDemo ? " Есть и демо-карточки." : ""}
          </div>
        ) : (
          isDemo && (
            <div className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3 py-2 text-[12px] text-[var(--sg-warning-text)]">
              Демо или RSS недоступен. Источники подключаются постепенно.
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
                  ? "bg-[var(--sg-blue)] text-white shadow-[var(--sg-shadow-glow)]"
                  : "bg-white/70 text-[var(--sg-ink-muted)]"
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
          className="mb-2 w-full rounded-[var(--sg-radius-md)] bg-white/80 px-3.5 py-2.5 text-[14px] outline-none ring-1 ring-[var(--sg-border)] focus:ring-2 focus:ring-[var(--sg-blue)]/35"
        />

        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setCategoryId("all")}
            className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium ${
              categoryId === "all"
                ? "bg-[var(--sg-blue-soft)] text-[var(--sg-blue)]"
                : "bg-white/60 text-[var(--sg-ink-muted)]"
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
                  : "bg-white/60 text-[var(--sg-ink-muted)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ paddingBottom: 32 }}>
        {loading && <LoadingState />}
        {!loading && error && (
          <ErrorState
            title={error}
            description="Проверьте соединение и попробуйте снова."
            onRetry={() => setTick((n) => n + 1)}
          />
        )}
        {!loading && !error && items.length === 0 && (
          <EmptyState title="Нет материалов" description="Для выбранных фильтров пока ничего нет." />
        )}
        {!loading && !error && items.length > 0 && (
          <div className="space-y-3">
            {items.map((a, idx) => {
              const catLabel =
                NEWS_CATEGORIES.find((c) => c.id === a.categoryId)?.label ?? a.categoryId;
              const featured = idx === 0 && Boolean(a.imageUrl);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onOpenArticle(a)}
                  className="sg-glass-strong w-full overflow-hidden rounded-[var(--sg-radius-xl)] text-left transition active:scale-[0.99]"
                >
                  {featured ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.imageUrl!} alt="" className="h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-white/85">
                          <span className="font-semibold">{catLabel}</span>
                          <span>·</span>
                          <span>{formatDate(a.publishedAt)}</span>
                          {!a.isDemo && (
                            <span className="rounded-full bg-[var(--sg-blue)] px-1.5 py-0.5 text-[10px] font-bold">
                              live
                            </span>
                          )}
                        </div>
                        <h2 className="text-[17px] font-semibold leading-snug text-white">{a.title}</h2>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-0">
                      <div
                        className="relative h-auto w-[96px] shrink-0 self-stretch min-h-[96px]"
                        style={{
                          background:
                            a.imageUrl
                              ? undefined
                              : CATEGORY_COVER[a.categoryId] ?? CATEGORY_COVER.other,
                        }}
                      >
                        {a.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={a.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                        ) : (
                          <div className="flex h-full min-h-[96px] items-center justify-center px-2">
                            <span className="text-center text-[10px] font-bold uppercase tracking-wide text-white/90">
                              {catLabel.slice(0, 8)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 p-3.5">
                        <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[11px] text-[var(--sg-ink-faint)]">
                          <span className="font-semibold text-[var(--sg-blue)]">{catLabel}</span>
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
                        <h2 className="text-[15px] font-semibold leading-snug text-[var(--sg-ink)]">{a.title}</h2>
                        <p className="mt-1 line-clamp-2 text-[13px] text-[var(--sg-ink-muted)]">{a.summary}</p>
                        <p className="mt-2 text-[11px] text-[var(--sg-ink-faint)]">{a.sourceName}</p>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
