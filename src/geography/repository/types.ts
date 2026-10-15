import type {
  GeographicCatalog,
  Locality,
  Region,
  SearchOptions,
  SearchResult,
} from "../domain/types";

/**
 * Repository contract — swap InMemoryGeographicRepository
 * for Postgres/Prisma/GAR-backed implementation later without
 * changing services or UI.
 */
export interface GeographicRepository {
  isReady(): boolean;
  load(): Promise<void>;
  getCatalogMeta(): GeographicCatalog["meta"] | null;
  getCountry(): GeographicCatalog["country"] | null;
  getRegions(): Region[];
  getRegionById(id: string): Region | null;
  getLocalityById(id: string): Locality | null;
  getLocalitiesByIds(ids: string[]): Locality[];
  getPopularLocalities(limit?: number): Locality[];
  search(options: SearchOptions): SearchResult;
  getAllLocalities(): Locality[];
}
