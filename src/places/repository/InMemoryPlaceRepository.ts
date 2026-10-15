import type { PlaceRepository } from "./types";
import type { Place, PlaceSearchQuery, PlaceSearchResult } from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

/** Demo POI for pilot Novosibirsk — not a full catalog. isDemo: true. */
const PILOT_PLACES: Place[] = [
  {
    id: "demo-nsk-opera",
    name: "Новосибирский театр оперы и балета",
    category: "culture",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    addressText: "Красный проспект, 36",
    geo: { lat: 55.0302, lon: 82.9204 },
    organizationId: null,
    source: "santero-demo",
    isDemo: true,
    status: "active",
  },
  {
    id: "demo-nsk-zoo",
    name: "Новосибирский зоопарк",
    category: "poi",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    addressText: "ул. Парковая / зоопарк",
    geo: { lat: 55.0567, lon: 82.889 },
    organizationId: null,
    source: "santero-demo",
    isDemo: true,
    status: "active",
  },
  {
    id: "demo-nsk-glavny",
    name: "Железнодорожный вокзал Новосибирск-Главный",
    category: "transport_stop",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    addressText: "ул. Дмитрия Шамшурина, 43",
    geo: { lat: 55.0355, lon: 82.8964 },
    organizationId: null,
    source: "santero-demo",
    isDemo: true,
    status: "active",
  },
  {
    id: "demo-nsk-akadem",
    name: "Академгородок (НСУ / СО РАН)",
    category: "education",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    addressText: "Новосибирский Академгородок",
    geo: { lat: 54.8431, lon: 83.093 },
    organizationId: null,
    source: "santero-demo",
    isDemo: true,
    status: "active",
  },
  {
    id: "demo-nsk-michurinsky",
    name: "Центральный парк",
    category: "park",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    addressText: "ул. Каинская / Михайловская набережная",
    geo: { lat: 55.0289, lon: 82.9225 },
    organizationId: null,
    source: "santero-demo",
    isDemo: true,
    status: "active",
  },
  {
    id: "demo-nsk-galaxy",
    name: "ТРЦ «Галерея Новосибирск» (ориентир)",
    category: "shop",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    addressText: "ул. Гоголя / центр",
    geo: { lat: 55.0415, lon: 82.917 },
    organizationId: null,
    source: "santero-demo",
    isDemo: true,
    status: "active",
  },
  {
    id: "demo-nsk-museum",
    name: "Краеведческий музей",
    category: "culture",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    addressText: "Красный проспект, 23",
    geo: { lat: 55.026, lon: 82.9208 },
    organizationId: null,
    source: "santero-demo",
    isDemo: true,
    status: "active",
  },
  {
    id: "demo-nsk-airport",
    name: "Аэропорт Толмачёво (ориентир)",
    category: "transport_stop",
    localityId: PILOT_CITY.localityId,
    regionId: PILOT_CITY.regionId,
    addressText: "Обь, Толмачёво",
    geo: { lat: 55.0126, lon: 82.6507 },
    organizationId: null,
    source: "santero-demo",
    isDemo: true,
    status: "active",
  },
];

export class InMemoryPlaceRepository implements PlaceRepository {
  async search(query: PlaceSearchQuery): Promise<PlaceSearchResult> {
    let items = [...PILOT_PLACES];
    if (query.localityId) {
      items = items.filter((p) => p.localityId === query.localityId);
    }
    if (query.category && query.category !== "all") {
      items = items.filter((p) => p.category === query.category);
    }
    if (query.query?.trim()) {
      const q = query.query.trim().toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    const total = items.length;
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 30;
    return {
      items: items.slice(offset, offset + limit),
      total,
      isDemo: true,
    };
  }

  async getById(id: string): Promise<Place | null> {
    return PILOT_PLACES.find((p) => p.id === id) ?? null;
  }
}
