"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { CityEvent, EventCategory } from "../domain/types";
import { getEventService } from "../service/EventService";
import { EmptyState, ErrorState, LoadingState } from "@/app/ui/states";

interface Props {
  city: Locality | null;
  onBack: () => void;
}

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ru-RU", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

const CAT_RU: Record<EventCategory, string> = {
  concert: "Концерт",
  exhibition: "Выставка",
  sport: "Спорт",
  family: "Семья",
  community: "Сообщество",
  other: "Событие",
};

export function EventsScreen({ city, onBack }: Props) {
  const [items, setItems] = useState<CityEvent[]>([]);
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
        const res = await getEventService().list({
          localityId: city?.id ?? null,
          limit: 40,
        });
        if (cancelled) return;
        setItems(res.items);
        setIsDemo(res.isDemo);
      } catch {
        if (!cancelled) {
          setError("Не удалось загрузить события");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [city?.id, tick]);

  return (
    <div className="sg-ambient flex h-full flex-col">
      <header className="sg-glass px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="mb-2 flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80"
            aria-label="Назад"
          >
            ←
          </button>
          <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">События</h1>
        </div>
        {isDemo && (
          <p className="text-[12px] leading-relaxed text-[var(--sg-ink-muted)]">
            Демо-афиша с постерами. Не продажа билетов.
          </p>
        )}
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ paddingBottom: 40 }}>
        {loading && <LoadingState />}
        {!loading && error && (
          <ErrorState title={error} onRetry={() => setTick((n) => n + 1)} />
        )}
        {!loading && !error && items.length === 0 && (
          <EmptyState title="Нет событий" description="Для города пока пусто." />
        )}
        {!loading && !error && items.length > 0 && (
          <ul className="space-y-4">
            {items.map((e) => (
              <li key={e.id}>
                <article className="sg-glass-strong overflow-hidden rounded-[var(--sg-radius-xl)]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--sg-surface)]">
                    {e.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={e.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#c4b5fd] to-[#0a84ff]">
                        <span className="text-[13px] font-semibold text-white/90">
                          {CAT_RU[e.category]}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[var(--sg-ink)] backdrop-blur-md">
                      {CAT_RU[e.category]}
                    </span>
                    {e.isDemo && (
                      <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold text-white">
                        Демо
                      </span>
                    )}
                    <p className="absolute bottom-3 left-3 right-3 text-[13px] font-medium text-white/95">
                      {formatWhen(e.startsAt)}
                    </p>
                  </div>
                  <div className="p-4">
                    <h2 className="text-[16px] font-semibold leading-snug tracking-tight text-[var(--sg-ink)]">
                      {e.title}
                    </h2>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--sg-ink-muted)]">
                      {e.summary}
                    </p>
                    {e.placeName && (
                      <p className="mt-3 flex items-center gap-1.5 text-[12px] text-[var(--sg-ink-faint)]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        {e.placeName}
                      </p>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
