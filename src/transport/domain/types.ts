/**
 * Transport reference layer — Horizon 4 foundation.
 * Stops/routes catalog only; no fake realtime arrivals.
 */

export type TransportMode = "bus" | "tram" | "metro" | "train" | "other";

export interface TransportStop {
  id: string;
  name: string;
  mode: TransportMode;
  localityId: string | null;
  lat: number;
  lon: number;
  isDemo: boolean;
}

export interface TransportRoute {
  id: string;
  name: string;
  number: string;
  mode: TransportMode;
  localityId: string | null;
  isDemo: boolean;
}

export interface TransportQuery {
  localityId?: string | null;
  mode?: TransportMode | "all";
  query?: string;
  limit?: number;
}

export interface TransportCatalogResult {
  stops: TransportStop[];
  routes: TransportRoute[];
  isDemo: boolean;
}
