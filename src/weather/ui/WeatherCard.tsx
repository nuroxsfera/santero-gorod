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
      <div className="sg-glass-strong animate-pulse rounded-[var(--sg-radius-lg)] p-5">
        <div className="h-4 w-20 rounded bg-[var(--sg-surface)]" />
        <div className="mt-3 h-8 w-16 rounded bg-[var(--sg-surface)]" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="sg-glass rounded-[var(--sg-radius-lg)] p-5">
        <p className="text-[15px] font-semibold text-[var(--sg-ink)]">Погода</p>
        <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">
          Сейчас недоступна · Open-Meteo
        </p>
      </div>
    );
  }

  const temp =
    data.temperatureC > 0 ? `+${data.temperatureC}` : `${data.temperatureC}`;

  return (
    <div className="sg-glass-strong relative overflow-hidden rounded-[var(--sg-radius-lg)] p-5">
      <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-[var(--sg-blue-soft)] blur-2xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sg-ink-faint)]">
            Погода
          </p>
          <p className="mt-1 text-[15px] font-medium text-[var(--sg-ink-muted)]">
            {data.localityName ?? "Город"}
          </p>
          <p className="mt-0.5 text-[14px] text-[var(--sg-ink)]">{data.weatherLabelRu}</p>
        </div>
        <p className="text-[40px] font-semibold tabular-nums tracking-[-0.04em] text-[var(--sg-ink)]">
          {temp}°
        </p>
      </div>
      {data.windSpeedMs != null && (
        <p className="relative mt-3 text-[12px] text-[var(--sg-ink-faint)]">
          Ветер ~{Math.round(data.windSpeedMs)} м/с · Open-Meteo
        </p>
      )}
    </div>
  );
}
