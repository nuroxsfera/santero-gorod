import { describe, it, expect } from "vitest";
import { InMemoryTransportRepository } from "../repository/InMemoryTransportRepository";
import { PILOT_CITY } from "@/config/pilot";

describe("InMemoryTransportRepository", () => {
  it("returns demo catalog for pilot", async () => {
    const res = await new InMemoryTransportRepository().catalog({
      localityId: PILOT_CITY.localityId,
    });
    expect(res.isDemo).toBe(true);
    expect(res.stops.length).toBeGreaterThan(0);
  });
});
