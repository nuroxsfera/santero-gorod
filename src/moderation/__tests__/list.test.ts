import { describe, it, expect } from "vitest";
import { InMemoryModerationRepository } from "../repository/InMemoryModerationRepository";

describe("moderation queue", () => {
  it("returns demo pending items", async () => {
    const res = await new InMemoryModerationRepository().list({ status: "pending" });
    expect(res.isDemo).toBe(true);
    expect(res.items.length).toBeGreaterThan(0);
  });
});
