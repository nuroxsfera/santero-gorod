/**
 * Place domain — foundation for map, POI, orgs (MASTER_PLAN module B+).
 * No UI yet; contracts only.
 */

export type PlaceCategory =
  | "poi"
  | "building"
  | "transport_stop"
  | "park"
  | "shop"
  | "food"
  | "health"
  | "education"
  | "sport"
  | "culture"
  | "government"
  | "other";

export interface PlaceGeo {
  lat: number;
  lon: number;
  /** Optional building footprint / alert polygon later */
  geometry?: unknown;
}

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  localityId: string | null;
  regionId: string | null;
  addressText: string | null;
  geo: PlaceGeo;
  organizationId: string | null;
  source: string;
  isDemo: boolean;
  status: "active" | "closed" | "unknown";
}

export interface PlaceSearchQuery {
  localityId?: string | null;
  regionId?: string | null;
  category?: PlaceCategory | "all";
  query?: string;
  limit?: number;
  offset?: number;
}

export interface PlaceSearchResult {
  items: Place[];
  total: number;
  isDemo: boolean;
}
