import type { EventRepository } from "./types";
import type { CityEvent, EventListResult, EventQuery } from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

const DEMO: CityEvent[] = [
  {
    id: "demo-event-nsk-1",
    title: "Вечер в оперном театре (пример)",
    summary: "Демо-событие для пилота. Не афиша и не продажа билетов.",
    category: "concert",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    placeId: "demo-nsk-opera",
    placeName: "НОБТ",
    startsAt: new Date(Date.now() + 7 * 864e5).toISOString(),
    endsAt: null,
    sourceName: "Santero demo",
    sourceUrl: null,
    isDemo: true,
  },
];

export class InMemoryEventRepository implements EventRepository {
  async list(query: EventQuery): Promise<EventListResult> {
    let items = [...DEMO];
    if (query.localityId) {
      items = items.filter((e) => e.localityId === query.localityId);
    }
    if (query.category && query.category !== "all") {
      items = items.filter((e) => e.category === query.category);
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

  async getById(id: string): Promise<CityEvent | null> {
    return DEMO.find((e) => e.id === id) ?? null;
  }
}
