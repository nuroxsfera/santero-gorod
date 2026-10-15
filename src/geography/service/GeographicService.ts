import { toGeographicReference } from "../domain/reference";
import type {
  GeographicReference,
  Locality,
  Region,
  SearchOptions,
  SearchResult,
} from "../domain/types";
import type { GeographicRepository } from "../repository/types";
import { getGeographicRepository } from "../repository/InMemoryGeographicRepository";

export class GeographicService {
  constructor(private readonly repo: GeographicRepository = getGeographicRepository()) {}

  async ensureLoaded(): Promise<void> {
    await this.repo.load();
  }

  isReady(): boolean {
    return this.repo.isReady();
  }

  getMeta() {
    return this.repo.getCatalogMeta();
  }

  getRegions(): Region[] {
    return this.repo.getRegions();
  }

  getLocalityById(id: string): Locality | null {
    return this.repo.getLocalityById(id);
  }

  getPopularCities(limit = 20): Locality[] {
    return this.repo.getPopularLocalities(limit);
  }

  searchCities(options: SearchOptions): SearchResult {
    return this.repo.search(options);
  }

  getReference(localityId: string): GeographicReference | null {
    const loc = this.repo.getLocalityById(localityId);
    if (!loc) return null;
    return toGeographicReference(loc);
  }

  validateReference(ref: GeographicReference): {
    valid: boolean;
    locality: Locality | null;
    reason?: string;
  } {
    const loc = this.repo.getLocalityById(ref.localityId);
    if (!loc) {
      return { valid: false, locality: null, reason: "LOCALITY_NOT_FOUND" };
    }
    if (loc.status === "deprecated") {
      return { valid: true, locality: loc, reason: "DEPRECATED" };
    }
    return { valid: true, locality: loc };
  }

  getLocalitiesByIds(ids: string[]): Locality[] {
    return this.repo.getLocalitiesByIds(ids);
  }
}

let serviceSingleton: GeographicService | null = null;

export function getGeographicService(): GeographicService {
  if (!serviceSingleton) serviceSingleton = new GeographicService();
  return serviceSingleton;
}
