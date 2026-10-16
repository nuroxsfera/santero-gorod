import type { PlaceRepository } from "./types";
import type { Place, PlaceSearchQuery, PlaceSearchResult } from "../domain/types";
import { NSK_PLACE_CATALOG } from "../data/nskCatalog";

export class InMemoryPlaceRepository implements PlaceRepository {
  async search(query: PlaceSearchQuery): Promise<PlaceSearchResult> {
    let items = [...NSK_PLACE_CATALOG];
    if (query.localityId) {
      items = items.filter((p) => p.localityId === query.localityId);
    }
    if (query.category && query.category !== "all") {
      items = items.filter((p) => p.category === query.category);
    }
    if (query.query?.trim()) {
      const q = query.query.trim().toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.addressText?.toLowerCase().includes(q) ?? false)
      );
    }
    const total = items.length;
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 50;
    const page = items.slice(offset, offset + limit);
    const allDemo = page.length === 0 || page.every((p) => p.isDemo);
    return {
      items: page,
      total,
      isDemo: allDemo,
    };
  }

  async getById(id: string): Promise<Place | null> {
    return NSK_PLACE_CATALOG.find((p) => p.id === id) ?? null;
  }
}
