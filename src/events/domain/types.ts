/**
 * City events / leisure — Horizon 4 foundation.
 * Separate from News. isDemo until real calendar sources exist.
 */

export type EventCategory =
  | "concert"
  | "exhibition"
  | "sport"
  | "family"
  | "community"
  | "other";

export interface CityEvent {
  id: string;
  title: string;
  summary: string;
  category: EventCategory;
  localityId: string | null;
  regionId: string | null;
  placeId: string | null;
  placeName: string | null;
  startsAt: string;
  endsAt: string | null;
  sourceName: string;
  sourceUrl: string | null;
  isDemo: boolean;
}

export interface EventQuery {
  localityId?: string | null;
  regionId?: string | null;
  category?: EventCategory | "all";
  limit?: number;
  offset?: number;
}

export interface EventListResult {
  items: CityEvent[];
  total: number;
  isDemo: boolean;
}
