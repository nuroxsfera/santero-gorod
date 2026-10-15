import type {
  GeographicCatalog,
  Locality,
  Region,
  SearchOptions,
  SearchResult,
} from "../domain/types";
import { SEED_CATALOG } from "../data/seed";
import { matchesQuery, normalizeSearchText } from "../lib/normalize";
import type { GeographicRepository } from "./types";

const CATALOG_URL = "/data/geography/catalog.json";

export class InMemoryGeographicRepository implements GeographicRepository {
  private catalog: GeographicCatalog | null = null;
  private byId = new Map<string, Locality>();
  private regionsById = new Map<string, Region>();
  private loadPromise: Promise<void> | null = null;

  isReady(): boolean {
    return this.catalog !== null;
  }

  async load(): Promise<void> {
    if (this.catalog) return;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      let data: GeographicCatalog = SEED_CATALOG;
      try {
        const res = await fetch(CATALOG_URL, { cache: "force-cache" });
        if (res.ok) {
          data = (await res.json()) as GeographicCatalog;
        }
      } catch {
        // offline / missing file → seed
      }
      this.catalog = data;
      this.byId.clear();
      this.regionsById.clear();
      for (const r of data.regions) this.regionsById.set(r.id, r);
      for (const loc of data.localities) this.byId.set(loc.id, loc);
    })();

    return this.loadPromise;
  }

  getCatalogMeta() {
    return this.catalog?.meta ?? null;
  }

  getCountry() {
    return this.catalog?.country ?? null;
  }

  getRegions(): Region[] {
    return this.catalog?.regions ?? [];
  }

  getRegionById(id: string): Region | null {
    return this.regionsById.get(id) ?? null;
  }

  getLocalityById(id: string): Locality | null {
    return this.byId.get(id) ?? null;
  }

  getLocalitiesByIds(ids: string[]): Locality[] {
    return ids
      .map((id) => this.byId.get(id))
      .filter((x): x is Locality => Boolean(x));
  }

  getPopularLocalities(limit = 20): Locality[] {
    if (!this.catalog) return [];
    return [...this.catalog.localities]
      .sort((a, b) => b.popularity - a.popularity || a.nameNormalized.localeCompare(b.nameNormalized, "ru"))
      .slice(0, limit);
  }

  getAllLocalities(): Locality[] {
    return this.catalog?.localities ?? [];
  }

  search(options: SearchOptions): SearchResult {
    const query = normalizeSearchText(options.query || "");
    const limit = Math.min(Math.max(options.limit ?? 20, 1), 50);
    const offset = Math.max(options.offset ?? 0, 0);

    if (!this.catalog) {
      return { items: [], total: 0, query: options.query };
    }

    let pool = this.catalog.localities;

    if (options.regionId) {
      pool = pool.filter((l) => l.regionId === options.regionId);
    }
    if (options.types?.length) {
      pool = pool.filter((l) => options.types!.includes(l.type));
    }
    if (options.onlyPopular) {
      pool = pool.filter((l) => l.popularity >= 500);
    }

    if (!query) {
      const sorted = [...pool].sort(
        (a, b) => b.popularity - a.popularity || a.nameNormalized.localeCompare(b.nameNormalized, "ru")
      );
      return {
        items: sorted.slice(offset, offset + limit),
        total: sorted.length,
        query: options.query,
      };
    }

    const scored: { loc: Locality; score: number }[] = [];
    for (const loc of pool) {
      const { hit, score } = matchesQuery(loc.nameNormalized, loc.aliases, query);
      if (!hit) continue;
      const finalScore = score + Math.min(loc.popularity / 10, 100);
      scored.push({ loc, score: finalScore });
    }

    scored.sort(
      (a, b) =>
        b.score - a.score ||
        a.loc.nameNormalized.localeCompare(b.loc.nameNormalized, "ru")
    );

    const total = scored.length;
    const items = scored.slice(offset, offset + limit).map((s) => s.loc);
    return { items, total, query: options.query };
  }
}

let singleton: InMemoryGeographicRepository | null = null;

export function getGeographicRepository(): InMemoryGeographicRepository {
  if (!singleton) singleton = new InMemoryGeographicRepository();
  return singleton;
}
