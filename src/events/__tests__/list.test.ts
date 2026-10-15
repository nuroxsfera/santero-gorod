import { describe, it, expect } from "vitest";
import { InMemoryEventRepository } from "../repository/InMemoryEventRepository";
import { PILOT_CITY } from "@/config/pilot";

describe("InMemoryEventRepository", () => {
  it("returns demo events for pilot", async () => {
    const res = await new InMemoryEventRepository().list({
      localityId: PILOT_CITY.localityId,
    });
    expect(res.isDemo).toBe(true);
    expect(res.items.length).toBeGreaterThan(0);
  });
});
