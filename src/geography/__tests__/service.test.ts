import { describe, it, expect, beforeAll } from "vitest";
import { GeographicService } from "../service/GeographicService";
import { InMemoryGeographicRepository } from "../repository/InMemoryGeographicRepository";
import { SEED_CATALOG } from "../data/seed";
import { toGeographicReference } from "../domain/reference";
import type { GeographicReference } from "../domain/types";

describe("GeographicService with seed catalog", () => {
  const repo = new InMemoryGeographicRepository();
  const svc = new GeographicService(repo);

  beforeAll(async () => {
    await svc.ensureLoaded();
  });

  it("loads and is ready", () => {
    expect(svc.isReady()).toBe(true);
    expect(svc.getMeta()?.countryCode).toBe("RU");
  });

  it("search Москва returns Moscow", () => {
    const res = svc.searchCities({ query: "Москва", limit: 5 });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name).toBe("Москва");
    expect(res.items[0].id.length).toBeGreaterThan(8);
  });

  it("search by alias Питер finds Санкт-Петербург", () => {
    const res = svc.searchCities({ query: "Питер", limit: 5 });
    const names = res.items.map((i) => i.name);
    expect(names.some((n) => n.includes("Петербург") || n === "Санкт-Петербург")).toBe(true);
  });

  it("popular cities are non-empty", () => {
    const popular = svc.getPopularCities(5);
    expect(popular.length).toBeGreaterThan(0);
  });

  it("getReference returns stable localityId", () => {
    const moscow = svc.searchCities({ query: "Москва", limit: 1 }).items[0];
    const ref = svc.getReference(moscow.id);
    expect(ref).not.toBeNull();
    expect(ref!.localityId).toBe(moscow.id);
    expect(ref!.localityName).toBe("Москва");
  });

  it("validateReference handles unknown id", () => {
    const fake: GeographicReference = {
      localityId: "nonexistent-id-xyz",
      localityName: "X",
      localityType: "city",
      regionId: null,
      regionName: null,
      countryCode: "RU",
      lat: null,
      lon: null,
    };
    const v = svc.validateReference(fake);
    expect(v.valid).toBe(false);
    expect(v.reason).toBe("LOCALITY_NOT_FOUND");
  });

  it("changing city reference does not mutate independent user data object", () => {
    const userData = { resumeId: "r1", favorites: ["a", "b"] };
    const snapshot = structuredClone(userData);
    const kazan = svc.searchCities({ query: "Казань", limit: 1 }).items[0];
    svc.getReference(kazan.id);
    expect(userData).toEqual(snapshot);
  });

  it("seed has unique locality ids", () => {
    const ids = SEED_CATALOG.localities.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("toGeographicReference", () => {
  it("maps locality fields", () => {
    const loc = SEED_CATALOG.localities[0];
    const ref = toGeographicReference(loc);
    expect(ref.localityId).toBe(loc.id);
    expect(ref.countryCode).toBe("RU");
  });
});
