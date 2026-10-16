import type { WeatherSnapshot } from "../domain/types";

/** WMO weather interpretation codes → short RU label */
export function weatherCodeToRu(code: number): string {
  if (code === 0) return "Ясно";
  if (code <= 3) return "Переменная облачность";
  if (code <= 48) return "Туман";
  if (code <= 57) return "Морось";
  if (code <= 67) return "Дождь";
  if (code <= 77) return "Снег";
  if (code <= 82) return "Ливень";
  if (code <= 86) return "Снегопад";
  if (code <= 99) return "Гроза";
  return "Погода";
}

export async function fetchOpenMeteoCurrent(params: {
  lat: number;
  lon: number;
  localityId: string | null;
  localityName: string | null;
}): Promise<WeatherSnapshot> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(params.lat));
  url.searchParams.set("longitude", String(params.lon));
  url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url.toString(), {
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`OPEN_METEO_${res.status}`);
  const data = (await res.json()) as {
    current?: {
      time?: string;
      temperature_2m?: number;
      weather_code?: number;
      wind_speed_10m?: number;
    };
  };
  const cur = data.current;
  if (cur?.temperature_2m == null || cur.weather_code == null) {
    throw new Error("OPEN_METEO_EMPTY");
  }
  const code = Number(cur.weather_code);
  return {
    localityId: params.localityId,
    localityName: params.localityName,
    lat: params.lat,
    lon: params.lon,
    temperatureC: Math.round(Number(cur.temperature_2m)),
    weatherCode: code,
    weatherLabelRu: weatherCodeToRu(code),
    windSpeedMs:
      cur.wind_speed_10m != null ? Number(cur.wind_speed_10m) : null,
    observedAt: cur.time ? new Date(cur.time).toISOString() : new Date().toISOString(),
    source: "open-meteo",
    isLive: true,
  };
}
