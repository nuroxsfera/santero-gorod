import { describe, it, expect } from "vitest";
import { InMemoryPlaceRepository } from "../repository/InMemoryPlaceRepository";
import { PILOT_CITY } from "@/config/pilot";

describe("InMemoryPlaceRepository pilot Novosibirsk", () => {
  const repo = new InMemoryPlaceRepository();

  it("returns demo places for pilot locality", async () => {
    const res = await repo.search({ localityId: PILOT_CITY.localityId });
    expect(res.isDemo).toBe(true);
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items.every((p) => p.localityId === PILOT_CITY.localityId)).toBe(
      true
    );
  });

  it("filters by text", async () => {
    const res = await repo.search({
      localityId: PILOT_CITY.localityId,
      query: "зоопарк",
    });
    expect(res.items.some((p) => p.name.includes("зоопарк"))).toBe(true);
  });
});
