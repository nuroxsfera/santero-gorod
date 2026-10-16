import { describe, it, expect } from "vitest";
import { InMemoryPlaceRepository } from "../repository/InMemoryPlaceRepository";
import { PILOT_CITY } from "@/config/pilot";

describe("InMemoryPlaceRepository NSK catalog", () => {
  const repo = new InMemoryPlaceRepository();

  it("returns many places for pilot", async () => {
    const res = await repo.search({ localityId: PILOT_CITY.localityId, limit: 100 });
    expect(res.total).toBeGreaterThanOrEqual(20);
    expect(res.items.some((p) => !p.isDemo)).toBe(true);
  });

  it("finds zoo by query", async () => {
    const res = await repo.search({
      localityId: PILOT_CITY.localityId,
      query: "зоопарк",
    });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].name.toLowerCase()).toContain("зоопарк");
  });
});
