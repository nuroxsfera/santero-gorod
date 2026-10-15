import type { Place, PlaceSearchQuery, PlaceSearchResult } from "../domain/types";

export interface PlaceRepository {
  search(query: PlaceSearchQuery): Promise<PlaceSearchResult>;
  getById(id: string): Promise<Place | null>;
}
