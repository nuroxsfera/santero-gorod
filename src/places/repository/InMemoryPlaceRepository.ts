import type { PlaceRepository } from "./types";
import type { Place, PlaceSearchQuery, PlaceSearchResult } from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

/** Minimal pilot anchors — not a full POI catalog. isDemo: true. */
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
    addressText: null,
    geo: { lat: 55.0567, lon: 82.889 },
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
