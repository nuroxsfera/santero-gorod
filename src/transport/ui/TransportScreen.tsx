"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { TransportCatalogResult } from "../domain/types";
import { getTransportService } from "../service/TransportService";
import { EmptyState, ErrorState, LoadingState } from "@/app/ui/states";

interface Props {
  city: Locality | null;
  onBack: () => void;
}

export function TransportScreen({ city, onBack }: Props) {
  const [data, setData] = useState<TransportCatalogResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTransportService().catalog({
          localityId: city?.id ?? null,
          limit: 40,
        });
        if (!cancelled) setData(res);
      } catch {
        if (!cancelled) setError("Не удалось загрузить справочник");
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
            Транспорт
          </h1>
        </div>
        <p className="text-[12px] text-[var(--sg-ink-muted)]">
          Справочник остановок и маршрутов. Без realtime и GTFS live.
        </p>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading && <LoadingState />}
        {!loading && error && (
          <ErrorState title={error} onRetry={() => setTick((n) => n + 1)} />
        )}
        {!loading && !error && data && data.stops.length === 0 && data.routes.length === 0 && (
          <EmptyState title="Пусто" description="Для города пока нет записей." />
        )}
        {!loading && data && (
          <>
            {data.isDemo && (
              <p className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3 py-2 text-[12px] text-[var(--sg-warning-text)]">
                Demo-справочник. Не официальное расписание.
              </p>
            )}
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--sg-ink-faint)]">
              Остановки
            </p>
            <ul className="mb-5 space-y-2">
              {data.stops.map((s) => (
                <li
                  key={s.id}
                  className="rounded-[var(--sg-radius-lg)] bg-white/90 px-4 py-3 ring-1 ring-[var(--sg-border)]"
                >
                  <p className="text-[14px] font-semibold text-[var(--sg-ink)]">{s.name}</p>
                  <p className="text-[12px] text-[var(--sg-ink-faint)]">{s.mode}</p>
                </li>
              ))}
            </ul>
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--sg-ink-faint)]">
              Маршруты
            </p>
            <ul className="space-y-2">
              {data.routes.map((r) => (
                <li
                  key={r.id}
                  className="rounded-[var(--sg-radius-lg)] bg-white/90 px-4 py-3 ring-1 ring-[var(--sg-border)]"
                >
                  <p className="text-[14px] font-semibold text-[var(--sg-ink)]">
                    {r.number !== "—" ? `№ ${r.number} · ` : ""}
                    {r.name}
                  </p>
                  <p className="text-[12px] text-[var(--sg-ink-faint)]">{r.mode}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
