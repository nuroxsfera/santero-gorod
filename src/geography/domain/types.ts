/**
 * Geographic Domain — core entities for Santero Город
 * Stable identifiers survive name changes and re-imports.
 */

export type CountryCode = "RU";

export type LocalityType =
  | "city"
  | "town"
  | "urban_settlement"
  | "settlement"
  | "village"
  | "other";

export type GeographicObjectStatus = "active" | "deprecated" | "merged";

export interface Country {
  id: string;
  code: CountryCode;
  name: string;
  nameEn?: string;
  iso2?: string;
  iso3?: string;
}

export interface Region {
  id: string;
  code: string;
  name: string;
  federalDistrict?: string | null;
  countryCode: CountryCode;
}

export interface Locality {
  id: string;
  name: string;
  nameNormalized: string;
  type: LocalityType;
  regionId: string | null;
  regionName: string | null;
  federalDistrict?: string | null;
  countryCode: CountryCode;
  lat: number | null;
  lon: number | null;
  population: number | null;
  okato?: string | null;
  oktmo?: string | null;
  kladrId?: string | null;
  fiasId?: string | null;
  aliases: string[];
  source: string;
  status: GeographicObjectStatus;
  popularity: number;
}

/** Unified reference used by News, Jobs, Realty, etc. */
export interface GeographicReference {
  localityId: string;
  localityName: string;
  localityType: LocalityType;
  regionId: string | null;
  regionName: string | null;
  countryCode: CountryCode;
  lat: number | null;
  lon: number | null;
}

export interface SearchOptions {
  query: string;
  limit?: number;
  offset?: number;
  types?: LocalityType[];
  regionId?: string;
  onlyPopular?: boolean;
}

export interface SearchResult {
  items: Locality[];
  total: number;
  query: string;
}

export interface CityContextState {
  /** City selected for browsing content */
  selectedLocalityId: string | null;
  selectedLocality: Locality | null;
  /** Device geolocation (optional, separate) */
  deviceLocalityId: string | null;
  /** Recently selected (session + persisted) */
  recentLocalityIds: string[];
  updatedAt: string | null;
}

export interface CatalogMeta {
  version: string;
  generatedAt: string;
  source: string;
  licenseNote: string;
  countryCode: CountryCode;
  localityCount: number;
  regionCount: number;
  scope: string;
}

export interface GeographicCatalog {
  meta: CatalogMeta;
  country: Country;
  regions: Region[];
  localities: Locality[];
}
