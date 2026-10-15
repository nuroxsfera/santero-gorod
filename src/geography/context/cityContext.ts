import type { CityContextState, Locality } from "../domain/types";
import { getGeographicService } from "../service/GeographicService";

const STORAGE_KEY = "santero.geo.cityContext.v1";
const MAX_RECENT = 8;

function emptyState(): CityContextState {
  return {
    selectedLocalityId: null,
    selectedLocality: null,
    deviceLocalityId: null,
    recentLocalityIds: [],
    updatedAt: null,
  };
}

function readStorage(): Partial<CityContextState> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<CityContextState>;
  } catch {
    return null;
  }
}

function writeStorage(state: CityContextState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedLocalityId: state.selectedLocalityId,
        recentLocalityIds: state.recentLocalityIds,
        updatedAt: state.updatedAt,
      })
    );
  } catch {
    /* quota */
  }
}

/**
 * City context: selected city for content ≠ device geo ≠ home city.
 * Changing city never mutates profile/resume/favorites.
 */
export class CityContextManager {
  private state: CityContextState = emptyState();
  private listeners = new Set<(s: CityContextState) => void>();

  getState(): CityContextState {
    return this.state;
  }

  subscribe(fn: (s: CityContextState) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    for (const fn of this.listeners) fn(this.state);
  }

  async hydrate(): Promise<CityContextState> {
    const svc = getGeographicService();
    await svc.ensureLoaded();

    const stored = readStorage();
    if (stored?.selectedLocalityId) {
      const loc = svc.getLocalityById(stored.selectedLocalityId);
      if (loc && loc.status === "active") {
        this.state = {
          selectedLocalityId: loc.id,
          selectedLocality: loc,
          deviceLocalityId: stored.deviceLocalityId ?? null,
          recentLocalityIds: (stored.recentLocalityIds ?? []).filter(
            (id) => !!svc.getLocalityById(id)
          ),
          updatedAt: stored.updatedAt ?? new Date().toISOString(),
        };
        this.emit();
        return this.state;
      }
    }

    const moscow =
      svc.searchCities({ query: "Москва", limit: 1 }).items[0] ??
      svc.getPopularCities(1)[0] ??
      null;

    if (moscow) this.selectLocality(moscow);
    return this.state;
  }

  selectLocality(loc: Locality): CityContextState {
    const recent = [
      loc.id,
      ...this.state.recentLocalityIds.filter((id) => id !== loc.id),
    ].slice(0, MAX_RECENT);

    this.state = {
      ...this.state,
      selectedLocalityId: loc.id,
      selectedLocality: loc,
      recentLocalityIds: recent,
      updatedAt: new Date().toISOString(),
    };
    writeStorage(this.state);
    this.emit();
    return this.state;
  }

  selectById(id: string): CityContextState | null {
    const loc = getGeographicService().getLocalityById(id);
    if (!loc) return null;
    return this.selectLocality(loc);
  }

  clearSelection(): void {
    this.state = {
      ...this.state,
      selectedLocalityId: null,
      selectedLocality: null,
      updatedAt: new Date().toISOString(),
    };
    writeStorage(this.state);
    this.emit();
  }
}

let ctxSingleton: CityContextManager | null = null;

export function getCityContext(): CityContextManager {
  if (!ctxSingleton) ctxSingleton = new CityContextManager();
  return ctxSingleton;
}
