import { describe, it, expect } from "vitest";
import { dedupeByHash, matchesGeo, matchesText } from "../service/filters";
import type { NewsArticle } from "../domain/types";

function make(
  partial: Partial<NewsArticle> & Pick<NewsArticle, "id" | "contentHash">
): NewsArticle {
  return {
    title: "t",
    summary: "s",
    body: "b",
    categoryId: "city",
    sourceId: "demo",
    sourceName: "Demo",
    sourceUrl: null,
    originalUrl: null,
    publishedAt: "2026-01-01T00:00:00.000Z",
    imageUrl: null,
    isDemo: true,
    geo: {
      scope: "federal",
      localityId: null,
      localityName: null,
      regionId: null,
      regionName: null,
      countryCode: "RU",
    },
    ...partial,
  };
}

const mskLocal = make({
  id: "l",
  contentHash: "l",
  title: "Транспорт Москвы",
  geo: {
    scope: "locality",
    localityId: "msk",
    localityName: "Москва",
    regionId: "RU-MOW",
    regionName: "Москва",
    countryCode: "RU",
  },
});

const taRegion = make({
  id: "r",
  contentHash: "r",
  geo: {
    scope: "region",
    localityId: null,
    localityName: null,
    regionId: "RU-TA",
    regionName: "Татарстан",
    countryCode: "RU",
  },
});

const federal = make({ id: "f", contentHash: "f" });

describe("dedupeByHash", () => {
  it("removes duplicates by contentHash", () => {
    const a = make({ id: "1", contentHash: "h1" });
    const b = make({ id: "2", contentHash: "h1" });
    const c = make({ id: "3", contentHash: "h2" });
    expect(dedupeByHash([a, b, c])).toHaveLength(2);
  });
});

describe("matchesText", () => {
  it("matches title case-insensitively", () => {
    expect(matchesText(mskLocal, "транспорт")).toBe(true);
    expect(matchesText(mskLocal, "спортзал")).toBe(false);
  });
});

describe("matchesGeo feedMode", () => {
  it("city mode includes federal + locality + region", () => {
    expect(
      matchesGeo(federal, { feedMode: "city", localityId: "msk", regionId: "RU-MOW" })
    ).toBe(true);
    expect(
      matchesGeo(mskLocal, { feedMode: "city", localityId: "msk", regionId: "RU-MOW" })
    ).toBe(true);
    expect(
      matchesGeo(taRegion, { feedMode: "city", localityId: "msk", regionId: "RU-MOW" })
    ).toBe(false);
  });

  it("region mode excludes federal, includes region localities", () => {
    expect(matchesGeo(federal, { feedMode: "region", regionId: "RU-MOW" })).toBe(false);
    expect(matchesGeo(mskLocal, { feedMode: "region", regionId: "RU-MOW" })).toBe(true);
    expect(matchesGeo(taRegion, { feedMode: "region", regionId: "RU-TA" })).toBe(true);
  });

  it("federal mode only federal", () => {
    expect(matchesGeo(federal, { feedMode: "federal" })).toBe(true);
    expect(matchesGeo(mskLocal, { feedMode: "federal" })).toBe(false);
  });
});
