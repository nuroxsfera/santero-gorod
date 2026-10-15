/**
 * Santero Geographic Module — public API
 *
 * Usage for other modules (News, Jobs, Realty…):
 *
 *   import { getGeographicService, toGeographicReference } from "@/geography";
 *
 *   const svc = getGeographicService();
 *   await svc.ensureLoaded();
 *   const ref = svc.getReference(localityId);
 */

export type {
  Country,
  Region,
  Locality,
  LocalityType,
  GeographicReference,
  GeographicCatalog,
  CatalogMeta,
  CityContextState,
  SearchOptions,
  SearchResult,
} from "./domain/types";

export { toGeographicReference, isValidGeographicReference } from "./domain/reference";
export { getGeographicRepository } from "./repository/InMemoryGeographicRepository";
export type { GeographicRepository } from "./repository/types";
export { GeographicService, getGeographicService } from "./service/GeographicService";
export { CityContextManager, getCityContext } from "./context/cityContext";
export { CitySearchScreen } from "./ui/CitySearchScreen";
export { normalizeSearchText } from "./lib/normalize";
