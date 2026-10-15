import type { AlertRepository } from "./types";
import type { AlertListResult, AlertQuery, CityAlert } from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

/** Empty-by-default demo: one illustrative planned notice, clearly isDemo. */
const DEMO: CityAlert[] = [
  {
    id: "demo-alert-nsk-1",
    title: "Плановые работы на сетях (пример)",
    summary:
      "Демо-уведомление. Не является официальным сообщением и не привязано к конкретным адресам.",
    category: "utilities",
    severity: "info",
    status: "planned",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    areaText: "Отдельные районы (пример)",
    sourceName: "Santero demo",
    sourceUrl: null,
    startsAt: null,
    endsAt: null,
    publishedAt: new Date().toISOString(),
    isDemo: true,
    isOfficial: false,
  },
];

export class InMemoryAlertRepository implements AlertRepository {
  async list(query: AlertQuery): Promise<AlertListResult> {
    let items = [...DEMO];
    if (query.localityId) {
      items = items.filter(
        (a) => a.localityId === query.localityId || a.localityId === null
      );
    }
    if (query.status && query.status !== "all") {
      items = items.filter((a) => a.status === query.status);
    }
    const total = items.length;
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 20;
    return {
      items: items.slice(offset, offset + limit),
      total,
      isDemo: true,
    };
  }

  async getById(id: string): Promise<CityAlert | null> {
    return DEMO.find((a) => a.id === id) ?? null;
  }
}
