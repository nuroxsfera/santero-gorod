export interface WeatherSnapshot {
  localityId: string | null;
  localityName: string | null;
  lat: number;
  lon: number;
  temperatureC: number;
  weatherCode: number;
  weatherLabelRu: string;
  windSpeedMs: number | null;
  observedAt: string;
  source: "open-meteo";
  isLive: boolean;
}
