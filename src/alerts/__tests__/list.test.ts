import { describe, it, expect } from "vitest";
import { InMemoryAlertRepository } from "../repository/InMemoryAlertRepository";
import { PILOT_CITY } from "@/config/pilot";

describe("InMemoryAlertRepository", () => {
  const repo = new InMemoryAlertRepository();

  it("returns demo alerts with isDemo", async () => {
    const res = await repo.list({ localityId: PILOT_CITY.localityId });
    expect(res.isDemo).toBe(true);
    expect(res.items.every((a) => a.isDemo)).toBe(true);
    expect(res.items.every((a) => a.isOfficial === false)).toBe(true);
  });
});
