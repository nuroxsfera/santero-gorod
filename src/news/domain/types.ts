/**
 * News domain — Santero Город
 * Geo binding uses Geography v1.0 identifiers only.
 */

export type NewsScope = "locality" | "region" | "federal";

export type NewsCategoryId =
  | "city"
  | "society"
  | "transport"
  | "economy"
  | "education"
  | "health"
  | "incidents"
  | "culture"
  | "sport"
  | "other";

export interface NewsCategory {
  id: NewsCategoryId;
  label: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string | null;
  /** true = demo / synthetic data, not a live feed */
  isDemo: boolean;
}

/** Geographic target — never invent IDs; only Geography v1.0 refs */
export interface NewsGeoTarget {
  scope: NewsScope;
  localityId: string | null;
  localityName: string | null;
  regionId: string | null;
  regionName: string | null;
  countryCode: "RU";
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  body: string;
  categoryId: NewsCategoryId;
  sourceId: string;
  sourceName: string;
  sourceUrl: string | null;
  originalUrl: string | null;
  publishedAt: string; // ISO
  imageUrl: string | null;
  geo: NewsGeoTarget;
  /** content fingerprint for dedup */
  contentHash: string;
  isDemo: boolean;
}

export interface NewsFeedQuery {
  localityId?: string | null;
  regionId?: string | null;
  feedMode?: "city" | "region" | "federal" | "all";
  scope?: NewsScope | "all";
  categoryId?: NewsCategoryId | "all";
  query?: string;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

export interface NewsFeedResult {
  items: NewsArticle[];
  total: number;
  isDemo: boolean;
}
