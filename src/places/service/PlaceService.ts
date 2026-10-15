import type { PlaceRepository } from "../repository/types";
import type { Place, PlaceSearchQuery, PlaceSearchResult } from "../domain/types";
import { InMemoryPlaceRepository } from "../repository/InMemoryPlaceRepository";

export class PlaceService {
  constructor(private readonly repo: PlaceRepository) {}

  search(query: PlaceSearchQuery): Promise<PlaceSearchResult> {
    return this.repo.search(query);
  }

  getById(id: string): Promise<Place | null> {
    return this.repo.getById(id);
  }
}

let singleton: PlaceService | null = null;

export function getPlaceService(): PlaceService {
  if (!singleton) {
    singleton = new PlaceService(new InMemoryPlaceRepository());
  }
  return singleton;
}
