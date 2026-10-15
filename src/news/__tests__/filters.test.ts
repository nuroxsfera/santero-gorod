import { describe, it, expect } from "vitest";
import { dedupeByHash, matchesGeo, matchesText } from "../service/filters";
import type { NewsArticle } from "../domain/types";

function make(partial: Partial<NewsArticle> & Pick<NewsArticle, "id" | "contentHash">): NewsArticle {
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

describe("dedupeByHash", () => {
  it("removes duplicates by contentHash", () => {
    const a = make({ id: "1", contentHash: "h1" });
    const b = make({ id: "2", contentHash: "h1" });
    const c = make({ id: "3", contentHash: "h2" });
    expect(dedupeByHash([a, b, c])).toHaveLength(2);
  });
});

describe("matchesText", () => {
  it("matches title", () => {
    const a = make({ id: "1", contentHash: "x", title: "Транспорт Москвы" });
    expect(matchesText(a, "транспорт")).toBe(true);
    expect(matchesText(a, "спортзал")).toBe(false);
  });
});

describe("matchesGeo", () => {
  const local = make({
    id: "l",
    contentHash: "l",
    geo: {
      scope: "locality",
      localityId: "msk",
      localityName: "Москва",
      regionId: "RU-MOW",
      regionName: "Москва",
      countryCode: "RU",
    },
  });
  const federal = make({ id: "f", contentHash: "f" });

  it("includes federal in city feed", () => {
    expect(matchesGeo(federal, { localityId: "msk", regionId: "RU-MOW" })).toBe(true);
  });

  it("matches locality id", () => {
    expect(matchesGeo(local, { localityId: "msk" })).toBe(true);
    expect(matchesGeo(local, { localityId: "spb" })).toBe(false);
  });

  it("strict federal scope", () => {
    expect(matchesGeo(federal, { scope: "federal" })).toBe(true);
    expect(matchesGeo(local, { scope: "federal" })).toBe(false);
  });
});
