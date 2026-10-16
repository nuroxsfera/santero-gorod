"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import { PILOT_CITY } from "@/config/pilot";
import type { WeatherSnapshot } from "../domain/types";

interface Props {
  city: Locality | null;
}

export function WeatherCard({ city }: Props) {
  const [data, setData] = useState<WeatherSnapshot | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const lat = city?.lat ?? PILOT_CITY.lat;
    const lon = city?.lon ?? PILOT_CITY.lon;
    const localityId = city?.id ?? PILOT_CITY.localityId;
    const name = city?.name ?? PILOT_CITY.name;

    (async () => {
      setLoading(true);
      setError(false);
      try {
        const sp = new URLSearchParams({
          lat: String(lat),
          lon: String(lon),
          localityId: localityId || "",
          localityName: name || "",
        });
        const res = await fetch(`/api/v1/weather?${sp}`, { cache: "no-store" });
        if (!res.ok) throw new Error("fail");
        const json = (await res.json()) as WeatherSnapshot;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) {
          setError(true);
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [city?.id, city?.lat, city?.lon, city?.name]);

  if (loading) {
    return (
      <div className="rounded-[var(--sg-radius-lg)] bg-white p-4 ring-1 ring-[var(--sg-border)]">
        <p className="text-[15px] font-semibold text-[var(--sg-ink)]">Погода</p>
        <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">Загрузка…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-[var(--sg-radius-lg)] bg-white/70 p-4 ring-1 ring-[var(--sg-border)]">
        <p className="text-[15px] font-semibold text-[var(--sg-ink)]">Погода</p>
        <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">
          Сейчас недоступна. Источник: Open-Meteo.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--sg-radius-lg)] bg-white p-4 shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[15px] font-semibold text-[var(--sg-ink)]">Погода</p>
          <p className="mt-0.5 text-[13px] text-[var(--sg-ink-muted)]">
            {data.localityName ?? "Город"} · {data.weatherLabelRu}
          </p>
        </div>
        <p className="text-[28px] font-semibold tabular-nums tracking-tight text-[var(--sg-ink)]">
          {data.temperatureC > 0 ? `+${data.temperatureC}` : data.temperatureC}°
        </p>
      </div>
      {data.windSpeedMs != null && (
        <p className="mt-2 text-[12px] text-[var(--sg-ink-faint)]">
          Ветер ~{Math.round(data.windSpeedMs)} м/с · Open-Meteo
        </p>
      )}
    </div>
  );
}
