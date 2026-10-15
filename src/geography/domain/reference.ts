import type { GeographicReference, Locality } from "./types";

/** Build a stable geographic reference from a locality (for other modules). */
export function toGeographicReference(loc: Locality): GeographicReference {
  return {
    localityId: loc.id,
    localityName: loc.name,
    localityType: loc.type,
    regionId: loc.regionId,
    regionName: loc.regionName,
    countryCode: loc.countryCode,
    lat: loc.lat,
    lon: loc.lon,
  };
}

/** Validate minimal shape of a geographic reference. */
export function isValidGeographicReference(
  ref: unknown
): ref is GeographicReference {
  if (!ref || typeof ref !== "object") return false;
  const r = ref as Record<string, unknown>;
  return (
    typeof r.localityId === "string" &&
    r.localityId.length > 0 &&
    typeof r.localityName === "string" &&
    typeof r.countryCode === "string"
  );
}
