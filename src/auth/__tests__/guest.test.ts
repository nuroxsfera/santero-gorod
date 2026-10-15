import { describe, it, expect, beforeEach } from "vitest";

describe("guest session (node)", () => {
  beforeEach(() => {
    // jsdom may not exist; module returns server stub without window
  });

  it("exports stable API", async () => {
    const { getOrCreateGuestSession } = await import("../guest");
    const s = getOrCreateGuestSession();
    expect(s.id).toBeTruthy();
    expect(s.createdAt).toBeTruthy();
  });
});
