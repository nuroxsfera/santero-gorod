import type { EventRepository } from "./types";
import type { CityEvent, EventListResult, EventQuery } from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

const DEMO: CityEvent[] = [
  {
    id: "demo-event-nsk-1",
    title: "Вечер в оперном театре",
    summary: "Демо-афиша для UI. Не продажа билетов.",
    category: "concert",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    placeId: "demo-nsk-opera",
    placeName: "НОБТ",
    startsAt: new Date(Date.now() + 7 * 864e5).toISOString(),
    endsAt: null,
    sourceName: "Santero demo",
    sourceUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a4015?w=800&q=80&auto=format&fit=crop",
    isDemo: true,
  },
  {
    id: "demo-event-nsk-2",
    title: "Выставка современного искусства",
    summary: "Пример карточки с постером. Данные демо.",
    category: "exhibition",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    placeId: null,
    placeName: "ГЦСИ",
    startsAt: new Date(Date.now() + 3 * 864e5).toISOString(),
    endsAt: new Date(Date.now() + 30 * 864e5).toISOString(),
    sourceName: "Santero demo",
    sourceUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80&auto=format&fit=crop",
    isDemo: true,
  },
  {
    id: "demo-event-nsk-3",
    title: "Семейный день в парке",
    summary: "Активности на открытом воздухе · демо",
    category: "family",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    placeId: null,
    placeName: "Заельцовский парк",
    startsAt: new Date(Date.now() + 2 * 864e5).toISOString(),
    endsAt: null,
    sourceName: "Santero demo",
    sourceUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80&auto=format&fit=crop",
    isDemo: true,
  },
  {
    id: "demo-event-nsk-4",
    title: "Городской забег",
    summary: "Спортивное демо-событие",
    category: "sport",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    placeId: null,
    placeName: "Набережная",
    startsAt: new Date(Date.now() + 14 * 864e5).toISOString(),
    endsAt: null,
    sourceName: "Santero demo",
    sourceUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1452626038306-9cf8c1623856?w=800&q=80&auto=format&fit=crop",
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
