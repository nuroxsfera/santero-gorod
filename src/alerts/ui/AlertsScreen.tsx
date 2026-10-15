"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { CityAlert } from "../domain/types";
import { getAlertService } from "../service/AlertService";
import { EmptyState, ErrorState, LoadingState } from "@/app/ui/states";

interface Props {
  city: Locality | null;
  onBack: () => void;
}

function severityLabel(s: CityAlert["severity"]): string {
  if (s === "critical") return "Критично";
  if (s === "warning") return "Внимание";
  return "Инфо";
}

function severityClass(s: CityAlert["severity"]): string {
  if (s === "critical") return "bg-red-50 text-red-800";
  if (s === "warning") return "bg-amber-50 text-amber-900";
  return "bg-[var(--sg-blue-soft)] text-[var(--sg-blue-deep)]";
}

export function AlertsScreen({ city, onBack }: Props) {
  const [items, setItems] = useState<CityAlert[]>([]);
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
        const res = await getAlertService().list({
          localityId: city?.id ?? null,
          regionId: city?.regionId ?? null,
          status: "all",
          limit: 30,
        });
        if (cancelled) return;
        setItems(res.items);
        setIsDemo(res.isDemo);
      } catch {
        if (!cancelled) {
          setError("Не удалось загрузить предупреждения");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [city?.id, city?.regionId, tick]);

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="bg-white/95 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[var(--sg-shadow-sm)] backdrop-blur">
        <div className="mb-2 flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sg-surface)]"
            aria-label="Назад"
          >
            ←
          </button>
          <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">
            Предупреждения
          </h1>
        </div>
        <p className="text-[13px] leading-relaxed text-[var(--sg-ink-muted)]">
          Только проверенные сообщения. Без точных адресов, пока нет официальных данных.
        </p>
        {isDemo && (
          <div className="mt-2 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3 py-2 text-[12px] text-[var(--sg-warning-text)]">
            Сейчас demo-пример. Не официальные отключения и не ЧС.
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading && <LoadingState />}
        {!loading && error && (
          <ErrorState
            title={error}
            description="Попробуйте ещё раз."
            onRetry={() => setTick((n) => n + 1)}
          />
        )}
        {!loading && !error && items.length === 0 && (
          <EmptyState
            title="Нет предупреждений"
            description="Для выбранного города активных сообщений нет."
          />
        )}
        {!loading && !error && items.length > 0 && (
          <ul className="space-y-2.5">
            {items.map((a) => (
              <li
                key={a.id}
                className="rounded-[var(--sg-radius-lg)] bg-white p-4 shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)]"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${severityClass(a.severity)}`}
                  >
                    {severityLabel(a.severity)}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--sg-ink-faint)]">
                    {a.status}
                  </span>
                  {a.isDemo && (
                    <span className="rounded-full bg-[var(--sg-warning-bg)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--sg-warning-text)]">
                      демо
                    </span>
                  )}
                  {!a.isOfficial && (
                    <span className="text-[11px] text-[var(--sg-ink-faint)]">не офиц.</span>
                  )}
                </div>
                <h2 className="text-[15px] font-semibold text-[var(--sg-ink)]">{a.title}</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--sg-ink-muted)]">
                  {a.summary}
                </p>
                {a.areaText && (
                  <p className="mt-2 text-[12px] text-[var(--sg-ink-faint)]">Зона: {a.areaText}</p>
                )}
                <p className="mt-2 text-[12px] text-[var(--sg-ink-faint)]">
                  Источник: {a.sourceName}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
