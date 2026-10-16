"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { CityEvent } from "../domain/types";
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
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="bg-[var(--sg-surface-elevated)]/90 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
            aria-label="Назад"
          >
            ←
          </button>
          <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">
            События
          </h1>
        </div>
        {isDemo && (
          <p className="text-[12px] leading-relaxed text-[var(--sg-ink-muted)]">
            Демо-календарь. Не афиша и не продажа билетов.
          </p>
        )}
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading && <LoadingState />}
        {!loading && error && (
          <ErrorState title={error} onRetry={() => setTick((n) => n + 1)} />
        )}
        {!loading && !error && items.length === 0 && (
          <EmptyState title="Нет событий" description="Для города пока пусто." />
        )}
        {!loading && !error && items.length > 0 && (
          <ul className="space-y-2">
            {items.map((e) => (
              <li
                key={e.id}
                className="rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--sg-blue)]">
                  {e.category}
                  {e.isDemo ? " · демо" : ""}
                </p>
                <h2 className="mt-1 text-[15px] font-semibold text-[var(--sg-ink)]">{e.title}</h2>
                <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">{e.summary}</p>
                <p className="mt-2 text-[12px] text-[var(--sg-ink-faint)]">
                  {formatWhen(e.startsAt)}
                  {e.placeName ? ` · ${e.placeName}` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
