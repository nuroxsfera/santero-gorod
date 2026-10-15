import type {
  TransportCatalogResult,
  TransportQuery,
  TransportRoute,
  TransportStop,
} from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

const STOPS: TransportStop[] = [
  {
    id: "demo-stop-nsk-main",
    name: "Вокзал Новосибирск-Главный (ориентир)",
    mode: "train",
    localityId: PILOT_CITY.localityId,
    lat: 55.0355,
    lon: 82.8964,
    isDemo: true,
  },
  {
    id: "demo-stop-nsk-ploshad",
    name: "пл. Ленина (ориентир)",
    mode: "metro",
    localityId: PILOT_CITY.localityId,
    lat: 55.0302,
    lon: 82.9204,
    isDemo: true,
  },
];

const ROUTES: TransportRoute[] = [
  {
    id: "demo-route-nsk-1",
    name: "Пример маршрута",
    number: "—",
    mode: "bus",
    localityId: PILOT_CITY.localityId,
    isDemo: true,
  },
];

export class InMemoryTransportRepository {
  async catalog(query: TransportQuery): Promise<TransportCatalogResult> {
    let stops = [...STOPS];
    let routes = [...ROUTES];
    if (query.localityId) {
      stops = stops.filter((s) => s.localityId === query.localityId);
      routes = routes.filter((r) => r.localityId === query.localityId);
    }
    if (query.mode && query.mode !== "all") {
      stops = stops.filter((s) => s.mode === query.mode);
      routes = routes.filter((r) => r.mode === query.mode);
    }
    if (query.query?.trim()) {
      const q = query.query.trim().toLowerCase();
      stops = stops.filter((s) => s.name.toLowerCase().includes(q));
      routes = routes.filter(
        (r) =>
          r.name.toLowerCase().includes(q) || r.number.toLowerCase().includes(q)
      );
    }
    const limit = query.limit ?? 30;
    return {
      stops: stops.slice(0, limit),
      routes: routes.slice(0, limit),
      isDemo: true,
    };
  }
}
